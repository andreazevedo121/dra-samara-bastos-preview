import { spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const profile = await mkdtemp(join(tmpdir(), "samara-mobile-"));
const port = 9337;
const child = spawn(chrome, [
  "--headless=new",
  "--disable-gpu",
  "--no-first-run",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let socket;
let nextId = 0;
const pending = new Map();

try {
  let target;
  for (let attempt = 0; attempt < 30; attempt++) {
    try {
      const targets = await fetch(`http://127.0.0.1:${port}/json`).then((response) => response.json());
      target = targets.find((item) => item.type === "page");
      if (target) break;
    } catch {}
    await sleep(200);
  }
  if (!target) throw new Error("Chrome DevTools target unavailable");

  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  });

  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await send("Emulation.setUserAgentOverride", { userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1" });
  await send("Page.navigate", { url: "http://127.0.0.1:3000/" });
  await sleep(2000);

  const before = await send("Runtime.evaluate", { expression: `JSON.stringify({button:!!document.querySelector('.mobileMenu'),width:innerWidth,scrollWidth:document.documentElement.scrollWidth})`, returnByValue: true });
  await send("Runtime.evaluate", { expression: `document.querySelector('.mobileMenu').click()` });
  await sleep(350);
  const after = await send("Runtime.evaluate", { expression: `JSON.stringify({open:document.querySelector('.mobileNav').classList.contains('mobileNavOpen'),links:document.querySelectorAll('.mobileNavLinks a').length,visible:getComputedStyle(document.querySelector('.mobileNav')).visibility,width:innerWidth,scrollWidth:document.documentElement.scrollWidth})`, returnByValue: true });
  const result = { before: JSON.parse(before.result.value), after: JSON.parse(after.result.value) };
  console.log(JSON.stringify(result, null, 2));
  if (!result.before.button || !result.after.open || result.after.links !== 8 || result.after.visible !== "visible" || result.after.scrollWidth > result.after.width) process.exitCode = 1;
} finally {
  socket?.close();
  child.kill();
  await sleep(250);
  await rm(profile, { recursive: true, force: true });
}
