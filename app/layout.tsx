import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "./globals.css";

export const metadata: Metadata = { title: "Dra. Sâmara Bastos | Medicina de Família e Cannabis Medicinal", description: "Cuidado médico integral, saúde mental e cannabis medicinal." };
export const viewport: Viewport = { width: "device-width", initialScale: 1 };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="pt-BR"><body>{children}</body></html>; }
