// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import React from "react";

// const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
// const DOW        = ["SU","MO","TU","WE","TH","FR","SA"];
// const DOW_LONG   = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

// interface Slot       { id: number; time: string; available: boolean; }
// interface Interviewer{ id: number; name: string; role: string; checked: boolean; }
// interface Candidate  { id: string; name: string; email?: string; job_title?: string; resume_path?: string|null; ats_score?: number; }

// const MORNING: Slot[] = [
//   {id:1,time:"9:00 AM",available:true},{id:2,time:"9:30 AM",available:true},
//   {id:3,time:"10:00 AM",available:true},{id:4,time:"10:30 AM",available:false},
//   {id:5,time:"11:00 AM",available:true},{id:6,time:"11:30 AM",available:true},
// ];
// const AFTERNOON: Slot[] = [
//   {id:7,time:"1:00 PM",available:true},{id:8,time:"1:30 PM",available:false},
//   {id:9,time:"2:00 PM",available:true},{id:10,time:"2:30 PM",available:true},
//   {id:11,time:"3:00 PM",available:false},{id:12,time:"3:30 PM",available:true},
//   {id:13,time:"4:00 PM",available:true},{id:14,time:"4:30 PM",available:true},
// ];

// const PALETTES: [string, string][] = [
//   ["#EFF6FF","#2563EB"],["#F0FDF4","#16A34A"],["#FFF7ED","#EA580C"],
//   ["#FAF5FF","#7C3AED"],["#FFF1F2","#E11D48"],["#F0FDFA","#0D9488"],
//   ["#FFFBEB","#D97706"],["#FDF4FF","#A21CAF"],
// ];
// function avColor(n:string):[string,string]{let h=0;for(let i=0;i<n.length;i++)h=(h*31+n.charCodeAt(i))&0xffffffff;return PALETTES[Math.abs(h)%PALETTES.length];}
// function ini(n:string){return n.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase();}

// interface Props {
//   candidate:      Candidate;
//   candidates:     Candidate[];
//   step:           1 | 2 | 3;
//   setStep:        (s: 1|2|3) => void;
//   selDate:        { d: number; m: number; y: number } | null;
//   setSelDate:     (d: { d:number; m:number; y:number } | null) => void;
//   calYear:        number;
//   calMonth:       number;
//   setCalYear:     (y: number) => void;
//   setCalMonth:    (m: number) => void;
//   selSlot:        Slot | null;
//   setSelSlot:     (s: Slot | null) => void;
//   interviewers:   Interviewer[];
//   setInterviewers:(ivs: Interviewer[]) => void;
//   selMethod:      number;
//   setSelMethod:   (n: number) => void;
//   jobDesc:        string;
//   onOpenJD:       () => void;
//   scheduling:     boolean;
//   onSubmit:       () => void;
// }

// export default function AutoRight(p: Props) {
//   const {
//     candidate, candidates, step, setStep,
//     selDate, setSelDate, calYear, calMonth, setCalYear, setCalMonth,
//     selSlot, setSelSlot, interviewers, setInterviewers,
//     selMethod, setSelMethod, jobDesc, onOpenJD, scheduling, onSubmit,
//   } = p;

//   /* ── Steps header ─────────────────────────────────────────────── */
//   function StepsHdr() {
//     const s1 = step >= 1 ? (step > 1 ? "done" : "act") : "off";
//     const s2 = step >= 2 ? (step > 2 ? "done" : "act") : "off";
//     const s3 = step >= 3 ? "act" : "off";
//     return (
//       <div className="steps-hdr">
//         {[{cls:s1,n:"1",lbl:"Select Date"},{cls:s2,n:"2",lbl:"Select Time"},{cls:s3,n:"3",lbl:"Confirm"}].map((s,i) => (
//           <div key={i} className={`step-tab ${s.cls}`}>
//             <div className="step-num">{s.cls === "done" ? "✓" : s.n}</div>
//             <span className="step-txt">{s.lbl}</span>
//             {s.cls === "done" && <span className="step-check">✓</span>}
//           </div>
//         ))}
//       </div>
//     );
//   }

//   /* ── Step 1: Calendar ──────────────────────────────────────────── */
//   function CalendarView() {
//     const firstDay    = new Date(calYear, calMonth, 1).getDay();
//     const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
//     const today       = new Date();
//     const cells: React.ReactNode[] = [];
//     DOW.forEach(d => cells.push(<div key={"h"+d} className="cal-dow">{d}</div>));
//     for (let i = 0; i < firstDay; i++) cells.push(<div key={"b"+i} className="cal-day empty"/>);
//     for (let d = 1; d <= daysInMonth; d++) {
//       const isToday = d === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
//       const isSel   = selDate?.d === d && selDate?.m === calMonth && selDate?.y === calYear;
//       const hasDot  = candidates.some(c => {
//         if (!c.interview_date) return false;
//         const cd = new Date(c.interview_date);
//         return cd.getDate() === d && cd.getMonth() === calMonth && cd.getFullYear() === calYear;
//       });
//       let cls = "cal-day";
//       if (isToday) cls += " today";
//       if (isSel)   cls += " selected";
//       cells.push(
//         <div key={"d"+d} className={cls}
//           onClick={() => { setSelDate({d, m:calMonth, y:calYear}); setStep(2); }}>
//           <div className="cd-num">{d}</div>
//           {hasDot && <div className="cd-dots"><div className="cd-dot"/></div>}
//         </div>
//       );
//     }
//     const prevMonth = () => {
//       const m = calMonth - 1 < 0 ? 11 : calMonth - 1;
//       const y = calMonth - 1 < 0 ? calYear - 1 : calYear;
//       setCalMonth(m); setCalYear(y);
//     };
//     const nextMonth = () => {
//       const m = calMonth + 1 > 11 ? 0 : calMonth + 1;
//       const y = calMonth + 1 > 11 ? calYear + 1 : calYear;
//       setCalMonth(m); setCalYear(y);
//     };
//     return (
//       <>
//         <StepsHdr/>
//         <div className="cal-wrap">
//           <div className="cal-nav">
//             <div className="cal-arrow" onClick={prevMonth}>‹</div>
//             <div className="cal-month">{MONTH_NAMES[calMonth]} {calYear}</div>
//             <div className="cal-arrow" onClick={nextMonth}>›</div>
//           </div>
//           <div className="cal-grid">{cells}</div>
//         </div>
//       </>
//     );
//   }

//   /* ── Step 2: Time slots ────────────────────────────────────────── */
//   function TimeSlotsView() {
//     if (!selDate) return null;
//     const dt    = new Date(selDate.y, selDate.m, selDate.d);
//     const dtStr = `${DOW_LONG[dt.getDay()]}, ${MONTH_NAMES[selDate.m]} ${selDate.d}`;
//     const mkSlot = (s: Slot) => (
//       <div
//         key={s.id}
//         className={`slot ${s.available ? "avail" : "taken"}${selSlot?.id === s.id ? " sel" : ""}`}
//         onClick={() => { if (!s.available) return; setSelSlot(s); setStep(3); }}
//       >
//         <div className="slot-time"><span className="slot-time-icon">🕐</span>{s.time}</div>
//         <span className={`slot-badge ${s.available ? "av" : "tk"}`}>{s.available ? "Available" : "Taken"}</span>
//       </div>
//     );
//     return (
//       <>
//         <StepsHdr/>
//         <div className="time-wrap">
//           <button className="tw-back" onClick={() => setStep(1)}>‹ Back to calendar</button>
//           <div className="tw-title">Select a time on {dtStr}</div>
//           <div className="tw-sections">
//             <div><div className="tw-sec-lbl">Morning</div><div className="slot-list">{MORNING.map(mkSlot)}</div></div>
//             <div><div className="tw-sec-lbl">Afternoon</div><div className="slot-list">{AFTERNOON.map(mkSlot)}</div></div>
//           </div>
//         </div>
//       </>
//     );
//   }

//   /* ── Step 3: Confirm ───────────────────────────────────────────── */
//   function ConfirmView() {
//     if (!selDate || !selSlot) return null;
//     const dt    = new Date(selDate.y, selDate.m, selDate.d);
//     const dtStr = `${DOW_LONG[dt.getDay()]}, ${MONTH_NAMES[selDate.m]} ${selDate.d} at ${selSlot.time}`;
//     const [cbg, cfg] = avColor(candidate.name || "?");
//     return (
//       <>
//         <StepsHdr/>
//         <div className="confirm-wrap">
//           {/* Summary */}
//           <div className="int-summary">
//             <span className="int-sum-icon">🗓️</span>
//             <div>
//               <div className="int-sum-dt">{dtStr}</div>
//               <div className="int-sum-meta">
//                 <div><span className="int-sum-lbl">Position: </span><span className="int-sum-val">{candidate.job_title || "—"}</span></div>
//                 <div><span className="int-sum-lbl">Candidate: </span><span className="int-sum-val">{candidate.name}</span></div>
//               </div>
//             </div>
//           </div>

//           {/* Grid: Candidate + Interviewers */}
//           <div className="confirm-grid">
//             <div className="conf-section">
//               <div className="conf-title">Candidate</div>
//               <div className="cand-card sel">
//                 <div className="cc-av" style={{background:cbg,color:cfg,borderColor:cfg+"40"}}>{ini(candidate.name||"?")}</div>
//                 <div style={{flex:1}}>
//                   <div className="cc-nm">{candidate.name}</div>
//                   <div className="cc-role">{candidate.job_title}</div>
//                   <div className="cc-email">{candidate.email}</div>
//                   {candidate.resume_path && <div className="cc-resume">📄 Resume available</div>}
//                 </div>
//                 <div className="cc-check">✓</div>
//               </div>
//             </div>
//             <div className="conf-section">
//               <div className="conf-title">Interviewers</div>
//               {interviewers.map(iv => (
//                 <div key={iv.id} className="int-row">
//                   <div className="int-av">{iv.name.charAt(0)}</div>
//                   <div style={{flex:1}}>
//                     <div className="int-nm">{iv.name}</div>
//                     <div className="int-role">{iv.role}</div>
//                   </div>
//                   <input type="checkbox" className="int-cb" checked={iv.checked}
//                     onChange={() => setInterviewers(interviewers.map(x => x.id===iv.id?{...x,checked:!x.checked}:x))}/>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* JD */}
//           <div className="jd-section">
//             <div className="jd-hdr">
//               <span className="conf-title" style={{margin:0}}>Job Description (Optional)</span>
//               <button className="jd-add" onClick={onOpenJD}>✏️ Add JD</button>
//             </div>
//             <textarea className="jd-textarea" readOnly
//               placeholder="No job description — system will use generic or candidate profile."
//               value={jobDesc || ""}/>
//           </div>

//           {/* Method */}
//           <div className="method-section">
//             <div className="conf-title">Interview Method</div>
//             <div className="method-grid">
//               {[
//                 {icon:"📹",title:"AI-Powered Video Interview",sub:"Secure link sent automatically",
//                  feats:["✓ Knowledge base from resume","✓ JD auto-used","✓ Email confirmation"]},
//                 {icon:"📍",title:"In-Person Interview",sub:"Office location shared",feats:[]},
//               ].map((m,i) => (
//                 <div key={i} className={`method-card${selMethod===i?" sel":""}`} onClick={()=>setSelMethod(i)}>
//                   <div className="mc-icon">{m.icon}</div>
//                   <div className="mc-title">{m.title}</div>
//                   <div className="mc-sub">{m.sub}</div>
//                   {m.feats.map((f,j) => <div key={j} className="mc-feat">{f}</div>)}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="confirm-actions">
//           <button className="btn-cancel" onClick={() => { setStep(1); setSelDate(null); setSelSlot(null); }}>
//             Cancel
//           </button>
//           <button className="btn-confirm" disabled={scheduling} onClick={onSubmit}>
//             {scheduling ? "⏳ Scheduling…" : "⚡ Schedule Interview"}
//           </button>
//         </div>
//       </>
//     );
//   }

//   if (step === 1) return <CalendarView/>;
//   if (step === 2) return <TimeSlotsView/>;
//   if (step === 3) return <ConfirmView/>;
//   return null;
// }
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DOW        = ["SU","MO","TU","WE","TH","FR","SA"];
const DOW_LONG   = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

interface Slot       { id: number; time: string; available: boolean; }
interface Interviewer{ id: number; name: string; role: string; checked: boolean; }
interface Candidate  { id: string; name: string; email?: string; job_title?: string; resume_path?: string|null; ats_score?: number; interview_date?: string | null; }

const MORNING: Slot[] = [
  {id:1,time:"9:00 AM",available:true},{id:2,time:"9:30 AM",available:true},
  {id:3,time:"10:00 AM",available:true},{id:4,time:"10:30 AM",available:false},
  {id:5,time:"11:00 AM",available:true},{id:6,time:"11:30 AM",available:true},
];
const AFTERNOON: Slot[] = [
  {id:7,time:"1:00 PM",available:true},{id:8,time:"1:30 PM",available:false},
  {id:9,time:"2:00 PM",available:true},{id:10,time:"2:30 PM",available:true},
  {id:11,time:"3:00 PM",available:false},{id:12,time:"3:30 PM",available:true},
  {id:13,time:"4:00 PM",available:true},{id:14,time:"4:30 PM",available:true},
];

const PALETTES: [string, string][] = [
  ["#EFF6FF","#2563EB"],["#F0FDF4","#16A34A"],["#FFF7ED","#EA580C"],
  ["#FAF5FF","#7C3AED"],["#FFF1F2","#E11D48"],["#F0FDFA","#0D9488"],
  ["#FFFBEB","#D97706"],["#FDF4FF","#A21CAF"],
];
function avColor(n:string):[string,string]{let h=0;for(let i=0;i<n.length;i++)h=(h*31+n.charCodeAt(i))&0xffffffff;return PALETTES[Math.abs(h)%PALETTES.length];}
function ini(n:string){return n.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase();}

interface Props {
  candidate:      Candidate;
  candidates:     Candidate[];
  step:           1 | 2 | 3;
  setStep:        (s: 1|2|3) => void;
  selDate:        { d: number; m: number; y: number } | null;
  setSelDate:     (d: { d:number; m:number; y:number } | null) => void;
  calYear:        number;
  calMonth:       number;
  setCalYear:     (y: number) => void;
  setCalMonth:    (m: number) => void;
  selSlot:        Slot | null;
  setSelSlot:     (s: Slot | null) => void;
  interviewers:   Interviewer[];
  setInterviewers:(ivs: Interviewer[]) => void;
  selMethod:      number;
  setSelMethod:   (n: number) => void;
  jobDesc:        string;
  onOpenJD:       () => void;
  scheduling:     boolean;
  onSubmit:       () => void;
}

export default function AutoRight(p: Props) {
  const {
    candidate, candidates, step, setStep,
    selDate, setSelDate, calYear, calMonth, setCalYear, setCalMonth,
    selSlot, setSelSlot, interviewers, setInterviewers,
    selMethod, setSelMethod, jobDesc, onOpenJD, scheduling, onSubmit,
  } = p;

  /* ── Steps header ─────────────────────────────────────────────── */
  function StepsHdr() {
    const s1 = step >= 1 ? (step > 1 ? "done" : "act") : "off";
    const s2 = step >= 2 ? (step > 2 ? "done" : "act") : "off";
    const s3 = step >= 3 ? "act" : "off";
    return (
      <div className="steps-hdr">
        {[{cls:s1,n:"1",lbl:"Select Date"},{cls:s2,n:"2",lbl:"Select Time"},{cls:s3,n:"3",lbl:"Confirm"}].map((s,i) => (
          <div key={i} className={`step-tab ${s.cls}`}>
            <div className="step-num">{s.cls === "done" ? "✓" : s.n}</div>
            <span className="step-txt">{s.lbl}</span>
            {s.cls === "done" && <span className="step-check">✓</span>}
          </div>
        ))}
      </div>
    );
  }

  /* ── Step 1: Calendar ──────────────────────────────────────────── */
  function CalendarView() {
    const firstDay    = new Date(calYear, calMonth, 1).getDay();
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const today       = new Date();
    const cells: React.ReactNode[] = [];
    DOW.forEach(d => cells.push(<div key={"h"+d} className="cal-dow">{d}</div>));
    for (let i = 0; i < firstDay; i++) cells.push(<div key={"b"+i} className="cal-day empty"/>);
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = d === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
      const isSel   = selDate?.d === d && selDate?.m === calMonth && selDate?.y === calYear;
      const hasDot  = candidates.some(c => {
        if (!c.interview_date) return false;
        const cd = new Date(c.interview_date);
        return cd.getDate() === d && cd.getMonth() === calMonth && cd.getFullYear() === calYear;
      });
      let cls = "cal-day";
      if (isToday) cls += " today";
      if (isSel)   cls += " selected";
      cells.push(
        <div key={"d"+d} className={cls}
          onClick={() => { setSelDate({d, m:calMonth, y:calYear}); setStep(2); }}>
          <div className="cd-num">{d}</div>
          {hasDot && <div className="cd-dots"><div className="cd-dot"/></div>}
        </div>
      );
    }
    const prevMonth = () => {
      const m = calMonth - 1 < 0 ? 11 : calMonth - 1;
      const y = calMonth - 1 < 0 ? calYear - 1 : calYear;
      setCalMonth(m); setCalYear(y);
    };
    const nextMonth = () => {
      const m = calMonth + 1 > 11 ? 0 : calMonth + 1;
      const y = calMonth + 1 > 11 ? calYear + 1 : calYear;
      setCalMonth(m); setCalYear(y);
    };
    return (
      <>
        <StepsHdr/>
        <div className="cal-wrap">
          <div className="cal-nav">
            <div className="cal-arrow" onClick={prevMonth}>‹</div>
            <div className="cal-month">{MONTH_NAMES[calMonth]} {calYear}</div>
            <div className="cal-arrow" onClick={nextMonth}>›</div>
          </div>
          <div className="cal-grid">{cells}</div>
        </div>
      </>
    );
  }

  /* ── Step 2: Time slots ────────────────────────────────────────── */
  function TimeSlotsView() {
    if (!selDate) return null;
    const dt    = new Date(selDate.y, selDate.m, selDate.d);
    const dtStr = `${DOW_LONG[dt.getDay()]}, ${MONTH_NAMES[selDate.m]} ${selDate.d}`;
    const mkSlot = (s: Slot) => (
      <div
        key={s.id}
        className={`slot ${s.available ? "avail" : "taken"}${selSlot?.id === s.id ? " sel" : ""}`}
        onClick={() => { if (!s.available) return; setSelSlot(s); setStep(3); }}
      >
        <div className="slot-time"><span className="slot-time-icon">🕐</span>{s.time}</div>
        <span className={`slot-badge ${s.available ? "av" : "tk"}`}>{s.available ? "Available" : "Taken"}</span>
      </div>
    );
    return (
      <>
        <StepsHdr/>
        <div className="time-wrap">
          <button className="tw-back" onClick={() => setStep(1)}>‹ Back to calendar</button>
          <div className="tw-title">Select a time on {dtStr}</div>
          <div className="tw-sections">
            <div><div className="tw-sec-lbl">Morning</div><div className="slot-list">{MORNING.map(mkSlot)}</div></div>
            <div><div className="tw-sec-lbl">Afternoon</div><div className="slot-list">{AFTERNOON.map(mkSlot)}</div></div>
          </div>
        </div>
      </>
    );
  }

  /* ── Step 3: Confirm ───────────────────────────────────────────── */
  function ConfirmView() {
    if (!selDate || !selSlot) return null;
    const dt    = new Date(selDate.y, selDate.m, selDate.d);
    const dtStr = `${DOW_LONG[dt.getDay()]}, ${MONTH_NAMES[selDate.m]} ${selDate.d} at ${selSlot.time}`;
    const [cbg, cfg] = avColor(candidate.name || "?");
    return (
      <>
        <StepsHdr/>
        <div className="confirm-wrap">
          {/* Summary */}
          <div className="int-summary">
            <span className="int-sum-icon">🗓️</span>
            <div>
              <div className="int-sum-dt">{dtStr}</div>
              <div className="int-sum-meta">
                <div><span className="int-sum-lbl">Position: </span><span className="int-sum-val">{candidate.job_title || "—"}</span></div>
                <div><span className="int-sum-lbl">Candidate: </span><span className="int-sum-val">{candidate.name}</span></div>
              </div>
            </div>
          </div>

          {/* Grid: Candidate + Interviewers */}
          <div className="confirm-grid">
            <div className="conf-section">
              <div className="conf-title">Candidate</div>
              <div className="cand-card sel">
                <div className="cc-av" style={{background:cbg,color:cfg,borderColor:cfg+"40"}}>{ini(candidate.name||"?")}</div>
                <div style={{flex:1}}>
                  <div className="cc-nm">{candidate.name}</div>
                  <div className="cc-role">{candidate.job_title}</div>
                  <div className="cc-email">{candidate.email}</div>
                  {candidate.resume_path && <div className="cc-resume">📄 Resume available</div>}
                </div>
                <div className="cc-check">✓</div>
              </div>
            </div>
            <div className="conf-section">
              <div className="conf-title">Interviewers</div>
              {interviewers.map(iv => (
                <div key={iv.id} className="int-row">
                  <div className="int-av">{iv.name.charAt(0)}</div>
                  <div style={{flex:1}}>
                    <div className="int-nm">{iv.name}</div>
                    <div className="int-role">{iv.role}</div>
                  </div>
                  <input type="checkbox" className="int-cb" checked={iv.checked}
                    onChange={() => setInterviewers(interviewers.map(x => x.id===iv.id?{...x,checked:!x.checked}:x))}/>
                </div>
              ))}
            </div>
          </div>

          {/* JD */}
          <div className="jd-section">
            <div className="jd-hdr">
              <span className="conf-title" style={{margin:0}}>Job Description (Optional)</span>
              <button className="jd-add" onClick={onOpenJD}>✏️ Add JD</button>
            </div>
            <textarea className="jd-textarea" readOnly
              placeholder="No job description — system will use generic or candidate profile."
              value={jobDesc || ""}/>
          </div>

          {/* Method */}
          <div className="method-section">
            <div className="conf-title">Interview Method</div>
            <div className="method-grid">
              {[
                {icon:"📹",title:"AI-Powered Video Interview",sub:"Secure link sent automatically",
                 feats:["✓ Knowledge base from resume","✓ JD auto-used","✓ Email confirmation"]},
                {icon:"📍",title:"In-Person Interview",sub:"Office location shared",feats:[]},
              ].map((m,i) => (
                <div key={i} className={`method-card${selMethod===i?" sel":""}`} onClick={()=>setSelMethod(i)}>
                  <div className="mc-icon">{m.icon}</div>
                  <div className="mc-title">{m.title}</div>
                  <div className="mc-sub">{m.sub}</div>
                  {m.feats.map((f,j) => <div key={j} className="mc-feat">{f}</div>)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="confirm-actions">
          <button className="btn-cancel" onClick={() => { setStep(1); setSelDate(null); setSelSlot(null); }}>
            Cancel
          </button>
          <button className="btn-confirm" disabled={scheduling} onClick={onSubmit}>
            {scheduling ? "⏳ Scheduling…" : "⚡ Schedule Interview"}
          </button>
        </div>
      </>
    );
  }

  if (step === 1) return <CalendarView/>;
  if (step === 2) return <TimeSlotsView/>;
  if (step === 3) return <ConfirmView/>;
  return null;
}