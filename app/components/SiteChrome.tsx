"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Instagram, Linkedin, Menu, Sprout, X } from "lucide-react";
import { contact } from "../data";

export function Header() {
  const [open,setOpen]=useState(false);
  useEffect(()=>{document.body.style.overflow=open?"hidden":"";return()=>{document.body.style.overflow=""}},[open]);
  const close=()=>setOpen(false);
  return <><header className="header"><Link className="brand" href="/" onClick={close}><span className="brandMark"><Sprout size={19}/></span><span>Dra. Sâmara Bastos<small>Medicina integrativa</small></span></Link><nav aria-label="Navegação principal"><Link href="/sobre">Sobre</Link><Link href="/atendimentos">Atendimentos</Link><Link href="/mentoria">Mentoria</Link><Link href="/artigos">Artigos</Link><Link href="/parcerias">Parcerias</Link><Link href="/links">Links rápidos</Link></nav><Link className="button buttonSmall" href="/agendar">Agendar consulta</Link><button className="mobileMenu" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label={open?"Fechar menu":"Abrir menu"}>{open?<X/>:<Menu/>}</button></header><div className={`mobileNav ${open?"mobileNavOpen":""}`} aria-hidden={!open}><div className="mobileNavLinks"><Link href="/" onClick={close}><span>01</span>Início</Link><Link href="/sobre" onClick={close}><span>02</span>Sobre a Dra. Sâmara</Link><Link href="/atendimentos" onClick={close}><span>03</span>Atendimentos</Link><Link href="/agendar" onClick={close}><span>04</span>Agendar consulta</Link><Link href="/mentoria" onClick={close}><span>05</span>Mentoria para médicos</Link><Link href="/artigos" onClick={close}><span>06</span>Artigos</Link><Link href="/parcerias" onClick={close}><span>07</span>Parcerias</Link><Link href="/links" onClick={close}><span>08</span>Todos os links</Link></div><div className="mobileNavBottom"><a href={contact.instagram} target="_blank">Instagram</a><a href={contact.linkedin} target="_blank">LinkedIn</a><small>CRM-MG 82433 · RQE 58758</small></div></div></>;
}

export function Footer() {
  return <footer><div><div className="brand footerBrand"><span className="brandMark"><Sprout size={19}/></span><span>Dra. Sâmara Bastos<small>CRM-MG 82433 · RQE 58758</small></span></div><p>Informação, escuta e cuidado centrado em cada pessoa.</p></div><div><small className="footerLabel">Mapa do site</small><div className="footerNav"><Link href="/sobre">Sobre</Link><Link href="/atendimentos">Atendimentos</Link><Link href="/agendar">Agendamento</Link><Link href="/mentoria">Mentoria</Link><Link href="/artigos">Artigos</Link><Link href="/parcerias">Parcerias</Link><Link href="/links">Links rápidos</Link></div></div><div><small className="footerLabel">Acompanhe</small><div className="socials"><a href={contact.instagram} target="_blank" aria-label="Instagram"><Instagram/></a><a href={contact.linkedin} target="_blank" aria-label="LinkedIn"><Linkedin/></a></div></div></footer>;
}

export function PageIntro({eyebrow,title,text}:{eyebrow:string,title:string,text:string}) {
  return <section className="pageIntro"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></section>;
}
