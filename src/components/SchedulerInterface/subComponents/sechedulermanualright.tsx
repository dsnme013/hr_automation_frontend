// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // "use client";
// // import React, { useState } from "react";
// // import { avColor, ini, sbColor, fmtDate, fmtTime, fmtDT, typeLabel, scoreCls } from "../SchedulerInterface";
// // import type { Candidate } from "../SchedulerInterface";

// // interface Props {
// //   candidate: Candidate;
// //   candidates: Candidate[];
// //   onSchedule: (id:string)=>void;
// //   onCancel: (id:string)=>void;
// //   onMarkComplete: (id:string)=>void;
// // }

// // const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// // export default function ManualRight({ candidate:c, candidates, onSchedule, onCancel, onMarkComplete }: Props) {
// //   const [calDate, setCalDate] = useState(new Date());
// //   const [bg, fg] = avColor(c.name);
// //   const score = c.ats_score||0, exam = c.exam_percentage||0;
// //   const radius=26, circ=2*Math.PI*radius, dash=(score/100)*circ;
// //   const ringColor = sbColor(score);
// //   const isScheduled = c.interview_status==="scheduled"||c.interview_status==="completed";

// //   const sLbl = c.interview_status==="scheduled"?"Interview Scheduled":c.interview_status==="completed"?"Interview Completed":c.interview_status==="cancelled"?"Cancelled":"Pending Schedule";

// //   // Mini calendar
// //   const renderCal = () => {
// //     const y=calDate.getFullYear(), m=calDate.getMonth();
// //     const ivDates = new Set(candidates.filter(c=>c.interview_date).map(c=>new Date(c.interview_date!).toDateString()));
// //     const first=new Date(y,m,1), last=new Date(y,m+1,0);
// //     const today=new Date().toDateString();
// //     const days:React.ReactNode[] = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d,i)=>(
// //       <div key={"h"+i} className="sch-cal-hdr">{d}</div>
// //     ));
// //     for(let i=0;i<first.getDay();i++) days.push(<div key={"b"+i} className="sch-cal-day disabled" />);
// //     for(let d=1;d<=last.getDate();d++){
// //       const dt=new Date(y,m,d); const ds=dt.toDateString();
// //       let cls="sch-cal-day";
// //       if(ds===today)cls+=" today";
// //       if(ivDates.has(ds))cls+=" has-iv";
// //       if(dt<new Date()&&ds!==today)cls+=" past";
// //       days.push(<div key={"d"+d} className={cls}>{d}</div>);
// //     }
// //     return days;
// //   };

// //   // Upcoming
// //   const upcoming = candidates.filter(c=>c.interview_date&&new Date(c.interview_date)>=new Date()&&c.interview_status==="scheduled").sort((a,b)=>new Date(a.interview_date!).getTime()-new Date(b.interview_date!).getTime()).slice(0,6);

// //   return (
// //     <div style={{padding:20,display:"flex",flexDirection:"column",gap:14}}>

// //       {/* Hero card */}
// //       <div className="sch-hero">
// //         <div className="sch-hero-top">
// //           <div className="sch-hero-avatar" style={{background:bg,color:fg}}>{ini(c.name)}</div>
// //           <div style={{flex:1,minWidth:0}}>
// //             <div className="sch-hero-name">{c.name}</div>
// //             <div className="sch-hero-role">{c.job_title} · {c.dept} · {c.location}</div>
// //             <div className="sch-hero-badges">
// //               <span className={`sch-pill ${isScheduled?"sch-pill-blue":c.interview_status==="completed"?"sch-pill-green":"sch-pill-amber"}`}>{sLbl}</span>
// //               <span className="sch-pill sch-pill-grey">Exam: {exam.toFixed(0)}%</span>
// //             </div>
// //           </div>
// //           <div style={{display:"flex",gap:8,flexShrink:0}}>
// //             {!isScheduled
// //               ? <button className="sch-btn sch-btn-primary sch-btn-sm" onClick={()=>onSchedule(c.id)}>Schedule Interview →</button>
// //               : <>
// //                   <button className="sch-btn sch-btn-sm" onClick={()=>onSchedule(c.id)}>Reschedule</button>
// //                   {c.interview_status!=="completed"&&<button className="sch-btn sch-btn-danger sch-btn-sm" onClick={()=>onCancel(c.id)}>Cancel</button>}
// //                 </>
// //             }
// //           </div>
// //         </div>
// //         <div className="sch-info-grid">
// //           <div className="sch-info-item"><div className="sch-info-label">Email</div><div className="sch-info-value"><a href={`mailto:${c.email}`}>{c.email||"—"}</a></div></div>
// //           <div className="sch-info-item"><div className="sch-info-label">Phone</div><div className="sch-info-value">{c.phone||"—"}</div></div>
// //           <div className="sch-info-item"><div className="sch-info-label">Applied</div><div className="sch-info-value">{fmtDate(c.processed_date)}</div></div>
// //           <div className="sch-info-item"><div className="sch-info-label">Department</div><div className="sch-info-value">{c.dept||"—"}</div></div>
// //         </div>
// //       </div>

// //       {/* Score ring */}
// //       <div className="sch-card">
// //         <div className="sch-card-head"><span className="sch-card-title">AI Match Score</span></div>
// //         <div className="sch-card-body">
// //           <div className="sch-ring-wrap">
// //             <div className="sch-ring">
// //               <svg width="64" height="64" viewBox="0 0 64 64">
// //                 <circle cx="32" cy="32" r={radius} fill="none" stroke="var(--bg)" strokeWidth="6"/>
// //                 <circle cx="32" cy="32" r={radius} fill="none" stroke={ringColor} strokeWidth="6" strokeDasharray={`${dash.toFixed(1)} ${circ.toFixed(1)}`} strokeLinecap="round"/>
// //               </svg>
// //               <div className="sch-ring-num">{score}</div>
// //             </div>
// //             <div>
// //               <div style={{fontSize:11,color:"var(--t2)",marginBottom:3}}>ATS Score · Exam: {exam.toFixed(0)}%</div>
// //               <div style={{fontSize:20,fontWeight:700,letterSpacing:-1,lineHeight:1,color:ringColor}}>{score}/100</div>
// //               <div style={{fontSize:10,color:"var(--t3)",marginTop:2}}>{score>=80?"Strong":score>=60?"Good":"Below avg"} · {exam>=70?"Exam passed":"Exam: "+exam.toFixed(0)+"%"}</div>
// //             </div>
// //           </div>
// //           <div style={{display:"flex",gap:10}}>
// //             {[["ATS",score],["Exam",exam],["Fit",Math.min(100,Math.round((score+exam)/2))]].map(([l,v])=>(
// //               <div key={l as string} style={{flex:1}}>
// //                 <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--t2)",marginBottom:3}}>
// //                   <span>{l}</span><span style={{fontWeight:600,color:"var(--t1)"}}>{Number(v).toFixed(0)}</span>
// //                 </div>
// //                 <div style={{height:5,background:"var(--bg)",borderRadius:3,overflow:"hidden"}}>
// //                   <div style={{height:"100%",width:`${v}%`,background:sbColor(Number(v)),borderRadius:3}} />
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Interview details */}
// //       <div className={`sch-iv-card ${isScheduled?"scheduled":"pending"}`}>
// //         <div className="sch-iv-status-row">
// //           <div className="sch-iv-dot" style={{background:isScheduled?"var(--green)":"var(--accent)"}} />
// //           <span style={{fontSize:13,fontWeight:600,color:"var(--t1)"}}>{sLbl}</span>
// //         </div>
// //         {c.interview_scheduled&&c.interview_date ? (
// //           <>
// //             <div className="sch-iv-details">
// //               <div><div className="sch-iv-detail-lbl">Date & Time</div><div className="sch-iv-detail-val">{fmtDT(c.interview_date)}</div></div>
// //               <div><div className="sch-iv-detail-lbl">Type</div><div className="sch-iv-detail-val">{typeLabel(c.interview_type)}</div></div>
// //               <div><div className="sch-iv-detail-lbl">Interviewer(s)</div><div className="sch-iv-detail-val">{c.interviewer||"—"}</div></div>
// //               <div><div className="sch-iv-detail-lbl">Duration</div><div className="sch-iv-detail-val">{c.duration||60} min</div></div>
// //               {c.meeting_link&&<div style={{gridColumn:"1/-1"}}><div className="sch-iv-detail-lbl">Link / Location</div><div className="sch-iv-detail-val"><a href={c.meeting_link.startsWith("http")?c.meeting_link:"#"} style={{color:"var(--accent)",textDecoration:"none"}}>{c.meeting_link}</a></div></div>}
// //             </div>
// //             <div style={{marginTop:12,display:"flex",gap:8,flexWrap:"wrap"}}>
// //               {c.meeting_link&&c.meeting_link.startsWith("http")&&<a href={c.meeting_link} target="_blank" rel="noreferrer" className="sch-btn sch-btn-primary sch-btn-sm">Join Meeting</a>}
// //               <button className="sch-btn sch-btn-sm">Send Reminder</button>
// //               <button className="sch-btn sch-btn-sm" onClick={()=>onSchedule(c.id)}>Reschedule</button>
// //               {c.interview_status!=="completed"&&<button className="sch-btn sch-btn-green sch-btn-sm" onClick={()=>onMarkComplete(c.id)}>Mark Complete ✓</button>}
// //             </div>
// //           </>
// //         ) : (
// //           <div style={{textAlign:"center",padding:"14px 0"}}>
// //             <p style={{fontSize:13,color:"var(--t2)",marginBottom:10}}>No interview scheduled. Set one up now.</p>
// //             <button className="sch-btn sch-btn-primary" onClick={()=>onSchedule(c.id)}>+ Schedule Interview</button>
// //           </div>
// //         )}
// //       </div>

// //       {/* Mini calendar */}
// //       <div className="sch-cal">
// //         <div className="sch-cal-head">
// //           <span className="sch-cal-month">{MONTHS[calDate.getMonth()]} {calDate.getFullYear()}</span>
// //           <div className="sch-cal-nav">
// //             <button className="sch-cal-nav-btn" onClick={()=>setCalDate(new Date(calDate.getFullYear(),calDate.getMonth()-1,1))}>‹</button>
// //             <button className="sch-cal-nav-btn" onClick={()=>setCalDate(new Date(calDate.getFullYear(),calDate.getMonth()+1,1))}>›</button>
// //           </div>
// //         </div>
// //         <div className="sch-cal-grid">{renderCal()}</div>
// //         <div className="sch-cal-legend">
// //           <span><span className="sch-cal-dot" style={{background:"var(--accent)"}} />Selected</span>
// //           <span><span className="sch-cal-dot" style={{background:"var(--green)"}} />Has interview</span>
// //         </div>
// //       </div>

// //       {/* Upcoming */}
// //       <div className="sch-card">
// //         <div className="sch-card-head"><span className="sch-card-title">Upcoming Interviews</span></div>
// //         <div>
// //           {upcoming.length===0 ? (
// //             <div style={{padding:20,textAlign:"center",fontSize:12,color:"var(--t2)"}}>No upcoming interviews.</div>
// //           ) : upcoming.map(u=>{
// //             const d=new Date(u.interview_date!);
// //             return (
// //               <div key={u.id} className="sch-upcoming-item">
// //                 <div className="sch-upcoming-date">
// //                   <div className="sch-upcoming-day">{d.getDate()}</div>
// //                   <div className="sch-upcoming-mon">{d.toLocaleDateString("en-IN",{month:"short"})}</div>
// //                 </div>
// //                 <div style={{flex:1,minWidth:0}}>
// //                   <div style={{fontSize:12,fontWeight:600,color:"var(--t1)"}}>{u.name}</div>
// //                   <div style={{fontSize:11,color:"var(--t2)",marginTop:1}}>{u.job_title}</div>
// //                   <div style={{fontSize:10,color:"var(--t3)",marginTop:2}}>🕐 {fmtTime(u.interview_date)} · {typeLabel(u.interview_type)}</div>
// //                 </div>
// //                 <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
// //                   <span className={scoreCls(u.ats_score)}>{u.ats_score}</span>
// //                   <span style={{fontSize:10,color:"var(--t3)"}}>{u.interviewer||""}</span>
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import React, { useState } from "react";
// import { avColor, ini, sbColor, fmtDate, fmtTime, fmtDT, typeLabel, scoreCls } from "@/services/interfaces/sechedulerhelpers";
// import type { Candidate } from "@/services/interfaces/sechedulerhelpers";

// interface Props {
//   candidate: Candidate; candidates: Candidate[];
//   onSchedule: (id: string) => void; onCancel: (id: string) => void; onMarkComplete: (id: string) => void;
// }
// const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// export default function ManualRight({ candidate: c, candidates, onSchedule, onCancel, onMarkComplete }: Props) {
//   const [calDate, setCalDate] = useState(new Date());
//   const [bg, fg] = avColor(c.name);
//   const score = c.ats_score || 0, exam = c.exam_percentage || 0;
//   const radius = 26, circ = 2 * Math.PI * radius, dash = (score / 100) * circ;
//   const ringColor = sbColor(score);
//   const isScheduled = c.interview_status === "scheduled" || c.interview_status === "completed";
//   const sLbl = c.interview_status === "scheduled" ? "Interview Scheduled" : c.interview_status === "completed" ? "Interview Completed" : c.interview_status === "cancelled" ? "Cancelled" : "Pending Schedule";

//   const renderCal = () => {
//     const y = calDate.getFullYear(), m = calDate.getMonth();
//     const ivDates = new Set(candidates.filter(c => c.interview_date).map(c => new Date(c.interview_date!).toDateString()));
//     const first = new Date(y, m, 1), last = new Date(y, m + 1, 0);
//     const today = new Date().toDateString();
//     const days: React.ReactNode[] = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d, i) => <div key={"h" + i} className="sch-cal-hdr">{d}</div>);
//     for (let i = 0; i < first.getDay(); i++) days.push(<div key={"b" + i} className="sch-cal-day disabled" />);
//     for (let d = 1; d <= last.getDate(); d++) {
//       const dt = new Date(y, m, d); const ds = dt.toDateString();
//       let cls = "sch-cal-day";
//       if (ds === today) cls += " today";
//       if (ivDates.has(ds)) cls += " has-iv";
//       if (dt < new Date() && ds !== today) cls += " past";
//       days.push(<div key={"d" + d} className={cls}>{d}</div>);
//     }
//     return days;
//   };

//   const upcoming = candidates.filter(c => c.interview_date && new Date(c.interview_date) >= new Date() && c.interview_status === "scheduled")
//     .sort((a, b) => new Date(a.interview_date!).getTime() - new Date(b.interview_date!).getTime()).slice(0, 6);

//   return (
//     <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
//       <div className="sch-hero">
//         <div className="sch-hero-top">
//           <div className="sch-hero-avatar" style={{ background: bg, color: fg }}>{ini(c.name)}</div>
//           <div style={{ flex: 1, minWidth: 0 }}>
//             <div className="sch-hero-name">{c.name}</div>
//             <div className="sch-hero-role">{c.job_title} · {c.dept} · {c.location}</div>
//             <div className="sch-hero-badges">
//               <span className={`sch-pill ${isScheduled ? "sch-pill-blue" : c.interview_status === "completed" ? "sch-pill-green" : "sch-pill-amber"}`}>{sLbl}</span>
//               <span className="sch-pill sch-pill-grey">Exam: {exam.toFixed(0)}%</span>
//             </div>
//           </div>
//           <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
//             {!isScheduled
//               ? <button className="sch-btn sch-btn-primary sch-btn-sm" onClick={() => onSchedule(c.id)}>Schedule Interview →</button>
//               : <><button className="sch-btn sch-btn-sm" onClick={() => onSchedule(c.id)}>Reschedule</button>{c.interview_status !== "completed" && <button className="sch-btn sch-btn-danger sch-btn-sm" onClick={() => onCancel(c.id)}>Cancel</button>}</>
//             }
//           </div>
//         </div>
//         <div className="sch-info-grid">
//           <div className="sch-info-item"><div className="sch-info-label">Email</div><div className="sch-info-value"><a href={`mailto:${c.email}`}>{c.email || "—"}</a></div></div>
//           <div className="sch-info-item"><div className="sch-info-label">Phone</div><div className="sch-info-value">{c.phone || "—"}</div></div>
//           <div className="sch-info-item"><div className="sch-info-label">Applied</div><div className="sch-info-value">{fmtDate(c.processed_date)}</div></div>
//           <div className="sch-info-item"><div className="sch-info-label">Department</div><div className="sch-info-value">{c.dept || "—"}</div></div>
//         </div>
//       </div>

//       <div className="sch-card">
//         <div className="sch-card-head"><span className="sch-card-title">AI Match Score</span></div>
//         <div className="sch-card-body">
//           <div className="sch-ring-wrap">
//             <div className="sch-ring">
//               <svg width="64" height="64" viewBox="0 0 64 64">
//                 <circle cx="32" cy="32" r={radius} fill="none" stroke="var(--bg)" strokeWidth="6" />
//                 <circle cx="32" cy="32" r={radius} fill="none" stroke={ringColor} strokeWidth="6" strokeDasharray={`${dash.toFixed(1)} ${circ.toFixed(1)}`} strokeLinecap="round" />
//               </svg>
//               <div className="sch-ring-num">{score}</div>
//             </div>
//             <div>
//               <div style={{ fontSize: 11, color: "var(--t2)", marginBottom: 3 }}>ATS Score · Exam: {exam.toFixed(0)}%</div>
//               <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: -1, lineHeight: 1, color: ringColor }}>{score}/100</div>
//               <div style={{ fontSize: 10, color: "var(--t3)", marginTop: 2 }}>{score >= 80 ? "Strong" : score >= 60 ? "Good" : "Below avg"} · {exam >= 70 ? "Exam passed" : "Exam: " + exam.toFixed(0) + "%"}</div>
//             </div>
//           </div>
//           <div style={{ display: "flex", gap: 10 }}>
//             {[["ATS", score], ["Exam", exam], ["Fit", Math.min(100, Math.round((score + exam) / 2))]].map(([l, v]) => (
//               <div key={l as string} style={{ flex: 1 }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--t2)", marginBottom: 3 }}>
//                   <span>{l}</span><span style={{ fontWeight: 600, color: "var(--t1)" }}>{Number(v).toFixed(0)}</span>
//                 </div>
//                 <div style={{ height: 5, background: "var(--bg)", borderRadius: 3, overflow: "hidden" }}>
//                   <div style={{ height: "100%", width: `${v}%`, background: sbColor(Number(v)), borderRadius: 3 }} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className={`sch-iv-card ${isScheduled ? "scheduled" : "pending"}`}>
//         <div className="sch-iv-status-row">
//           <div className="sch-iv-dot" style={{ background: isScheduled ? "var(--green)" : "var(--accent)" }} />
//           <span style={{ fontSize: 13, fontWeight: 600, color: "var(--t1)" }}>{sLbl}</span>
//         </div>
//         {c.interview_scheduled && c.interview_date ? (
//           <>
//             <div className="sch-iv-details">
//               <div><div className="sch-iv-detail-lbl">Date & Time</div><div className="sch-iv-detail-val">{fmtDT(c.interview_date)}</div></div>
//               <div><div className="sch-iv-detail-lbl">Type</div><div className="sch-iv-detail-val">{typeLabel(c.interview_type)}</div></div>
//               <div><div className="sch-iv-detail-lbl">Interviewer(s)</div><div className="sch-iv-detail-val">{c.interviewer || "—"}</div></div>
//               <div><div className="sch-iv-detail-lbl">Duration</div><div className="sch-iv-detail-val">{c.duration || 60} min</div></div>
//               {c.meeting_link && <div style={{ gridColumn: "1/-1" }}><div className="sch-iv-detail-lbl">Link / Location</div><div className="sch-iv-detail-val"><a href={c.meeting_link.startsWith("http") ? c.meeting_link : "#"} style={{ color: "var(--accent)", textDecoration: "none" }}>{c.meeting_link}</a></div></div>}
//             </div>
//             <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
//               {c.meeting_link && c.meeting_link.startsWith("http") && <a href={c.meeting_link} target="_blank" rel="noreferrer" className="sch-btn sch-btn-primary sch-btn-sm">Join Meeting</a>}
//               <button className="sch-btn sch-btn-sm">Send Reminder</button>
//               <button className="sch-btn sch-btn-sm" onClick={() => onSchedule(c.id)}>Reschedule</button>
//               {c.interview_status !== "completed" && <button className="sch-btn sch-btn-green sch-btn-sm" onClick={() => onMarkComplete(c.id)}>Mark Complete ✓</button>}
//             </div>
//           </>
//         ) : (
//           <div style={{ textAlign: "center", padding: "14px 0" }}>
//             <p style={{ fontSize: 13, color: "var(--t2)", marginBottom: 10 }}>No interview scheduled. Set one up now.</p>
//             <button className="sch-btn sch-btn-primary" onClick={() => onSchedule(c.id)}>+ Schedule Interview</button>
//           </div>
//         )}
//       </div>

//       <div className="sch-cal">
//         <div className="sch-cal-head">
//           <span className="sch-cal-month">{MONTHS[calDate.getMonth()]} {calDate.getFullYear()}</span>
//           <div className="sch-cal-nav">
//             <button className="sch-cal-nav-btn" onClick={() => setCalDate(new Date(calDate.getFullYear(), calDate.getMonth() - 1, 1))}>‹</button>
//             <button className="sch-cal-nav-btn" onClick={() => setCalDate(new Date(calDate.getFullYear(), calDate.getMonth() + 1, 1))}>›</button>
//           </div>
//         </div>
//         <div className="sch-cal-grid">{renderCal()}</div>
//         <div className="sch-cal-legend">
//           <span><span className="sch-cal-dot" style={{ background: "var(--accent)" }} />Selected</span>
//           <span><span className="sch-cal-dot" style={{ background: "var(--green)" }} />Has interview</span>
//         </div>
//       </div>

//       <div className="sch-card">
//         <div className="sch-card-head"><span className="sch-card-title">Upcoming Interviews</span></div>
//         <div>
//           {upcoming.length === 0 ? (
//             <div style={{ padding: 20, textAlign: "center", fontSize: 12, color: "var(--t2)" }}>No upcoming interviews.</div>
//           ) : upcoming.map(u => {
//             const d = new Date(u.interview_date!);
//             return (
//               <div key={u.id} className="sch-upcoming-item">
//                 <div className="sch-upcoming-date">
//                   <div className="sch-upcoming-day">{d.getDate()}</div>
//                   <div className="sch-upcoming-mon">{d.toLocaleDateString("en-IN", { month: "short" })}</div>
//                 </div>
//                 <div style={{ flex: 1, minWidth: 0 }}>
//                   <div style={{ fontSize: 12, fontWeight: 600, color: "var(--t1)" }}>{u.name}</div>
//                   <div style={{ fontSize: 11, color: "var(--t2)", marginTop: 1 }}>{u.job_title}</div>
//                   <div style={{ fontSize: 10, color: "var(--t3)", marginTop: 2 }}>🕐 {fmtTime(u.interview_date)} · {typeLabel(u.interview_type)}</div>
//                 </div>
//                 <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
//                   <span className={`sc ${scoreCls(u.ats_score)}`}>{u.ats_score}</span>
//                   <span style={{ fontSize: 10, color: "var(--t3)" }}>{u.interviewer || ""}</span>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }