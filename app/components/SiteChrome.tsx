import Link from "next/link";
import { Instagram, Linkedin, Menu, Sprout } from "lucide-react";
import { contact } from "../data";

export function Header() {
  return <header className="header"><Link className="brand" href="/"><span className="brandMark"><Sprout size={19}/></span><span>Dra. Sâmara Bastos<small>Medicina integrativa</small></span></Link><nav><Link href="/sobre">Sobre</Link><Link href="/#cuidado">Atendimentos</Link><Link href="/mentoria">Mentoria</Link><Link href="/artigos">Artigos</Link><Link href="/links">Links</Link></nav><Link className="button buttonSmall" href="/agendar">Agendar consulta</Link><Menu className="mobileMenu"/></header>;
}

export function Footer() {
  return <footer><div><div className="brand footerBrand"><span className="brandMark"><Sprout size={19}/></span><span>Dra. Sâmara Bastos<small>CRM-MG 82433 · RQE 58758</small></span></div><p>Informação, escuta e cuidado centrado em cada pessoa.</p></div><div className="footerNav"><Link href="/sobre">Sobre</Link><Link href="/agendar">Agendamento</Link><Link href="/mentoria">Mentoria</Link><Link href="/parcerias">Parcerias</Link></div><div className="socials"><a href={contact.instagram} target="_blank" aria-label="Instagram"><Instagram/></a><a href={contact.linkedin} target="_blank" aria-label="LinkedIn"><Linkedin/></a></div></footer>;
}

export function PageIntro({eyebrow,title,text}:{eyebrow:string,title:string,text:string}) {
  return <section className="pageIntro"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></section>;
}
