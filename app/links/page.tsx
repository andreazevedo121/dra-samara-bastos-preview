import Link from "next/link";
import { ArrowUpRight, BookOpen, CalendarDays, GraduationCap, Handshake, Home, Instagram, Linkedin } from "lucide-react";
import { contact } from "../data";

const items = [
  { href: "/agendar", icon: <CalendarDays/>, title: "Agende sua consulta", text: "Escolha uma data e um horário", primary: true },
  { href: "/inicio", icon: <Home/>, title: "Início", text: "Acesse o site completo" },
  { href: "/sobre", icon: <BookOpen/>, title: "Conheça a Dra. Sâmara", text: "Trajetória e forma de cuidar" },
  { href: "/mentoria", icon: <GraduationCap/>, title: "Cannabis Além da Receita", text: "Mentoria para médicos" },
  { href: "/parcerias", icon: <Handshake/>, title: "Parcerias e eventos", text: "Convites profissionais" },
  { href: "/artigos", icon: <BookOpen/>, title: "Artigos e conteúdos", text: "Informação baseada em evidências" },
];

export default function Links(){return <main className="linkPage"><div className="linkGlow"/><div className="linkProfile"><div className="linkAvatar"/><span className="eyebrow light">Médica & Mentora</span><h1>Dra. Sâmara Bastos</h1><p>Medicina de Família, saúde mental e cannabis medicinal</p><small>CRM-MG 82433 · RQE 58758</small></div><div className="linkList">{items.map(item=><Link className={item.primary?"linkPrimary":undefined} href={item.href} key={item.title}><span className="linkIcon">{item.icon}</span><span><b>{item.title}</b><small>{item.text}</small></span><ArrowUpRight/></Link>)}</div><div className="linkSocials"><a href={contact.instagram} target="_blank"><Instagram/>Instagram</a><a href={contact.linkedin} target="_blank"><Linkedin/>LinkedIn</a></div></main>}
