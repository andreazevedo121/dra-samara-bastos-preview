"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Clock } from "lucide-react";
import { contact } from "../data";

const times = ["09:00", "10:30", "14:00", "15:30", "17:00"];
const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildMonth(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDayOffset = (new Date(year, month, 1).getDay() + 6) % 7;
  const numberOfDays = new Date(year, month + 1, 0).getDate();
  return [
    ...Array.from({ length: firstDayOffset }, () => null),
    ...Array.from({ length: numberOfDays }, (_, index) => new Date(year, month, index + 1)),
  ];
}

export function BookingForm(){
  const [visibleMonth,setVisibleMonth]=useState(new Date(2026,9,1));
  const [selectedDate,setSelectedDate]=useState(new Date(2026,9,22));
  const [time,setTime]=useState("10:30");
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const calendarDays=useMemo(()=>buildMonth(visibleMonth),[visibleMonth]);
  const rawMonthLabel=new Intl.DateTimeFormat("pt-BR",{month:"long",year:"numeric"}).format(visibleMonth);
  const monthLabel=rawMonthLabel.charAt(0).toUpperCase()+rawMonthLabel.slice(1);
  const selectedLabel=new Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"long",year:"numeric"}).format(selectedDate);
  const message=useMemo(()=>encodeURIComponent(`Olá! Meu nome é ${name||"[nome]"}. Gostaria de confirmar uma consulta demonstrativa para ${selectedLabel}, às ${time}. Meu e-mail é ${email||"[e-mail]"}.`),[name,email,selectedLabel,time]);
  const changeMonth=(offset:number)=>setVisibleMonth(current=>{
    const nextMonth=new Date(current.getFullYear(),current.getMonth()+offset,1);
    const firstAvailable=[...buildMonth(nextMonth)].find(date=>date&&![0,6].includes(date.getDay()));
    if(firstAvailable) setSelectedDate(firstAvailable);
    return nextMonth;
  });

  return <div className="bookingShell"><div className="bookingPanel"><div className="bookingTop"><button type="button" onClick={()=>changeMonth(-1)} aria-label="Mês anterior"><ArrowLeft/></button><b>{monthLabel}</b><button type="button" onClick={()=>changeMonth(1)} aria-label="Próximo mês"><ArrowRight/></button></div><div className="calendarWeekdays">{weekDays.map(day=><span key={day}>{day}</span>)}</div><div className="monthGrid">{calendarDays.map((date,index)=>date?<button type="button" key={dateKey(date)} disabled={[0,6].includes(date.getDay())} onClick={()=>setSelectedDate(date)} className={dateKey(date)===dateKey(selectedDate)?"selected":""} aria-label={`Selecionar ${date.toLocaleDateString("pt-BR")}`}><b>{date.getDate()}</b></button>:<span className="emptyDay" key={`empty-${index}`}/>)}</div><h3>Horários disponíveis</h3><div className="timeGrid">{times.map(option=><button type="button" key={option} onClick={()=>setTime(option)} className={time===option?"selected":""}><Clock size={15}/>{option}</button>)}</div><p className="demoLabel">Agenda demonstrativa para visualização da experiência.</p></div><form className="detailsPanel" onSubmit={event=>event.preventDefault()}><span className="eyebrow">Seus dados</span><h2>Quase lá.</h2><label>Nome completo<input value={name} onChange={event=>setName(event.target.value)} placeholder="Como podemos chamar você?"/></label><label>E-mail<input value={email} onChange={event=>setEmail(event.target.value)} type="email" placeholder="seuemail@exemplo.com"/></label><div className="summary"><Check/><span><b>{selectedLabel}, às {time}</b><small>Consulta online</small></span></div><a className="button fullButton" href={`${contact.consultation}?text=${message}`} target="_blank">Continuar pelo WhatsApp <ArrowRight size={17}/></a><small className="privacy">Ao continuar, você será direcionado ao WhatsApp para confirmar o atendimento.</small></form></div>
}
