// // "use client";

// // import React from "react";
// // import { Download, Send, Calendar, Eye } from "lucide-react";
// // import { useRouter } from "next/navigation";
// // import { Candidate } from "@/services/interfaces/CandidateScreening";

// // /* ── Helpers ── */
// // function avatarStyle(name: string) {
// //   const p: [string,string][] = [
// //     ["#EFF6FF","#2563EB"],["#F0FDF4","#16A34A"],["#FFF7ED","#EA580C"],
// //     ["#FAF5FF","#7C3AED"],["#FFF1F2","#E11D48"],["#F0FDFA","#0D9488"],
// //     ["#FFFBEB","#D97706"],["#FDF4FF","#A21CAF"],
// //   ];
// //   let h = 0;
// //   for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
// //   const [bg, fg] = p[Math.abs(h) % p.length];
// //   return { bg, fg };
// // }
// // function initials(name: string) {
// //   return name.split(" ").slice(0,2).map((w) => w[0]).join("").toUpperCase();
// // }
// // function fmtDate(str?: string | null) {
// //   if (!str) return "—";
// //   try { return new Date(str).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}); }
// //   catch { return str; }
// // }
// // function scoreBarColor(v: number) {
// //   return v >= 75 ? "var(--acc)" : v >= 60 ? "var(--amber)" : "var(--red)";
// // }
// // function getDisplayStatus(c: Candidate): string {
// //   if (c?.final_status === "Hired")       return "Hired";
// //   if (c?.interview_scheduled)            return "Interview Scheduled";
// //   if (c?.exam_completed)                 return (c?.exam_percentage ?? 0) >= 70 ? "Assessment Passed" : "Assessment Failed";
// //   if (c?.exam_started)                   return "Assessment In Progress";
// //   if (c?.exam_link_sent)                 return c?.link_expired ? "Assessment Expired" : "Assessment Sent";
// //   if (c?.status === "Shortlisted")       return "Shortlisted";
// //   if (c?.status === "Rejected" || c?.final_status === "Rejected After Exam") return "Rejected";
// //   return "Under Review";
// // }

// // function getRejectionPoints(c: Candidate) {
// //   const score = c.ats_score ?? 0, exam = c.exam_percentage ?? 0;
// //   const pts: { headline: string; fb: string[]; journey: boolean }[] = [];
// //   if (!c.exam_link_sent) {
// //     pts.push({ headline: score < 60 ? `Low ATS score: ${score}/100 — minimum threshold is 60` : `ATS score ${score}/100 — below the shortlist cut-off of 70`, fb: [`Score is ${Math.max(70-score,0).toFixed(0)} points below the shortlist threshold of 70`,"Resume keywords and experience don't closely match the job description","Profile filtered out at automated screening before manual review"], journey: false });
// //     return pts;
// //   }
// //   if (score >= 70) pts.push({ headline: `Initially shortlisted — ATS score ${score}/100 met the threshold`, fb: [], journey: true });
// //   else if (score >= 60) pts.push({ headline: `Initially reviewed — ATS score ${score}/100 passed minimum screening`, fb: [], journey: true });
// //   if (c.link_expired && !c.exam_completed) {
// //     pts.push({ headline: "Assessment not completed — invitation link expired", fb: ["Candidate received the link but did not submit the test","Links have a fixed validity window — once expired they cannot be reused","HR can decide whether to resend or close this application"], journey: false });
// //     return pts;
// //   }
// //   if (c.exam_completed && exam < 70) {
// //     const gap = (70 - exam).toFixed(0);
// //     const sev = exam < 40 ? "Very low score — significant gaps in core skills required for this role" : exam < 55 ? "Partial understanding but insufficient depth in key areas" : `Close to pass mark — ${gap}% short of the required threshold`;
// //     pts.push({ headline: `Failed assessment: scored ${exam.toFixed(0)}% — required pass mark is 70%`, fb: [`Achieved ${exam.toFixed(0)}% against the 70% pass mark — ${gap}% below the minimum`, sev,"Strong ATS resume score but technical skills not demonstrated at the required level"], journey: false });
// //   }
// //   if (c.final_status === "Rejected After Exam") {
// //     pts.push({ headline: "Did not meet post-assessment criteria for the next stage", fb: ["Overall evaluation after assessment did not clear the bar for this role","Skills, experience, and assessment result considered holistically","HR review determined candidate is not a strong enough fit at this stage"], journey: false });
// //   }
// //   return pts;
// // }

// // function getShortlistReasons(c: Candidate) {
// //   const score = c.ats_score ?? 0, exam = c.exam_percentage ?? 0;
// //   const r: string[] = [];
// //   if (score >= 85) r.push(`Excellent ATS score of ${score}/100 — top 10% of applicants`);
// //   else if (score >= 70) r.push(`Strong ATS score of ${score}/100 — meets the shortlist threshold`);
// //   else if (score >= 60) r.push(`Acceptable ATS score of ${score}/100 — manually reviewed and approved`);
// //   if (c.exam_completed && exam >= 70) r.push(`Passed assessment with ${exam.toFixed(0)}% — above the 70% pass mark`);
// //   if (c.interview_scheduled) r.push("Interview scheduled — progressed through all screening stages");
// //   if (c.final_status === "Hired") r.push("Offer accepted — candidate successfully hired");
// //   if (!r.length) r.push("Met minimum qualification criteria set for this job role");
// //   return r;
// // }

// // const TL_STAGES = [
// //   { key: "applied",     label: "Application Received", icon: "✓" },
// //   { key: "screened",    label: "Resume Screened",       icon: "📄" },
// //   { key: "shortlisted", label: "Shortlisted",           icon: "★" },
// //   { key: "assessment",  label: "Assessment Sent",       icon: "✉" },
// //   { key: "interview",   label: "Interview Scheduled",   icon: "🗓" },
// //   { key: "offer",       label: "Offer Extended",        icon: "✓" },
// // ];

// // function stageReached(c: Candidate) {
// //   const ds = getDisplayStatus(c);
// //   if (ds === "Hired")                              return (k: string) => true;
// //   if (ds === "Interview Scheduled")                return (k: string) => ["applied","screened","shortlisted","assessment","interview"].includes(k);
// //   if (["Assessment Passed","Assessment Failed"].includes(ds)) return (k: string) => ["applied","screened","shortlisted","assessment"].includes(k);
// //   if (["Assessment In Progress","Assessment Sent","Assessment Expired"].includes(ds)) return (k: string) => ["applied","screened","shortlisted"].includes(k);
// //   if (ds === "Shortlisted")                        return (k: string) => ["applied","screened","shortlisted"].includes(k);
// //   if (ds === "Rejected")                           return (k: string) => ["applied","screened"].includes(k);
// //   return (k: string) => ["applied"].includes(k);
// // }

// // const STATUS_PILL_CLS: Record<string,string> = {
// //   "Hired":"pill-hired","Interview Scheduled":"pill-interview","Shortlisted":"pill-shortlisted",
// //   "Assessment Passed":"pill-assessed","Assessment Failed":"pill-assessed",
// //   "Assessment Sent":"pill-assessment","Assessment In Progress":"pill-assessment","Assessment Expired":"pill-assessment",
// //   "Rejected":"pill-rejected","Under Review":"pill-applied",
// // };
// // const STATUS_LABEL: Record<string,string> = {
// //   "Hired":"Hired","Interview Scheduled":"Interview Scheduled","Shortlisted":"Shortlisted",
// //   "Assessment Passed":"Assessment Done","Assessment Failed":"Assessment Done",
// //   "Assessment Sent":"Assessment Pending","Assessment In Progress":"Assessment Pending","Assessment Expired":"Assessment Pending",
// //   "Rejected":"Rejected","Under Review":"Applied",
// // };

// // /* ── CSS — exactly mirrors HTML .c-hdr, .info-grid, .rej-box, .score-card, etc. ── */
// // const DETAIL_CSS = `
// // @keyframes fup{to{opacity:1;transform:translateY(0);}}
// // @keyframes pdot{0%,100%{opacity:1;}50%{opacity:.4;}}

// // /* ── Candidate header ── */
// // .c-hdr{display:flex;align-items:flex-start;gap:16px;margin-bottom:1.5rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .05s forwards;}
// // .big-av{width:58px;height:58px;border-radius:15px;display:flex;align-items:center;justify-content:center;font-family:var(--serif);font-size:1.1rem;font-weight:700;flex-shrink:0;}
// // .c-hdr-nm{font-family:var(--serif);font-size:1.7rem;line-height:1.1;margin-bottom:.2rem;color:var(--tx);transition:color .35s;}
// // .c-hdr-pos{font-size:.8rem;color:var(--tx2);margin-bottom:.4rem;transition:color .35s;}
// // .c-hdr-meta{display:flex;align-items:center;gap:6px;flex-wrap:wrap;}
// // .status-pill{display:inline-flex;align-items:center;gap:5px;font-size:.67rem;font-weight:700;padding:.2rem .65rem;border-radius:999px;}
// // .status-pill.rej{background:rgba(248,113,113,.1);color:var(--red);border:1px solid rgba(248,113,113,.2);}
// // .status-pill.act{background:var(--accs);color:var(--acc);border:1px solid var(--bd);}
// // .c-hdr-actions{display:flex;gap:.45rem;flex-wrap:wrap;margin-left:auto;flex-shrink:0;}
// // .c-hdr-btn{font-family:var(--sans);font-size:.67rem;font-weight:600;padding:.28rem .68rem;border-radius:7px;cursor:pointer;transition:all .18s;border:1px solid var(--card-bd);background:var(--glass2);color:var(--tx2);}
// // .c-hdr-btn:hover{border-color:var(--acc);color:var(--acc);}
// // .c-hdr-btn--danger{background:rgba(248,113,113,.1);color:var(--red);border-color:rgba(248,113,113,.2);}
// // .c-hdr-btn--danger:hover{background:var(--red);color:#fff;border-color:var(--red);}
// // .c-hdr-btn--success{background:var(--accs);color:var(--acc);border-color:var(--bd);}
// // .c-hdr-btn--success:hover{background:var(--acc);color:var(--btn-text);}
// // .c-hdr-btn--blue{background:rgba(96,165,250,.1);color:var(--blue);border-color:rgba(96,165,250,.2);}

// // /* ── Info grid ── */
// // .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:1.4rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .1s forwards;}
// // .ibox{background:var(--card-bg);border:1px solid var(--card-bd);border-radius:12px;padding:.85rem 1rem;backdrop-filter:blur(12px);transition:background .35s,border-color .35s;}
// // .ilbl{font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--tx3);margin-bottom:.3rem;transition:color .35s;}
// // .ival{font-size:.8rem;color:var(--tx);font-weight:500;transition:color .35s;}
// // .ival a{color:var(--acc);text-decoration:none;}
// // .ival a:hover{text-decoration:underline;}
// // .ival.empty{color:var(--tx3);}

// // /* ── Shortlisted box ── */
// // .short-box{background:var(--short-bg,rgba(0,214,143,.05));border:1px solid var(--short-bd,rgba(0,214,143,.2));border-radius:14px;padding:1.1rem 1.2rem;margin-bottom:1.4rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .12s forwards;transition:all .35s;}
// // .short-hdr{display:flex;align-items:center;gap:8px;font-size:.82rem;font-weight:700;color:var(--acc);margin-bottom:.65rem;}
// // .short-reason{display:flex;align-items:flex-start;gap:6px;font-size:.7rem;margin-bottom:.3rem;line-height:1.45;}
// // [data-cs-theme="dark"] .short-reason{color:#6ee7b7;}
// // [data-cs-theme="light"] .short-reason{color:#065f46;}
// // .short-bar-wrap{margin-top:.65rem;}
// // .short-bar-lbl{display:flex;justify-content:space-between;font-size:.61rem;color:var(--acc);margin-bottom:.25rem;}
// // .short-bar{height:5px;border-radius:3px;background:var(--glass2);overflow:hidden;}
// // .short-bar-fill{height:100%;border-radius:3px;transition:width 1.2s cubic-bezier(.4,0,.2,1);}

// // /* ── Rejected box ── */
// // .rej-box{background:var(--rej-bg);border:1px solid var(--rej-bd);border-radius:14px;padding:1.1rem 1.2rem;margin-bottom:1.4rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .15s forwards;transition:background .35s,border-color .35s;}
// // .rej-hdr{display:flex;align-items:center;gap:8px;font-size:.82rem;font-weight:700;color:var(--red);margin-bottom:.75rem;}
// // .rej-main{font-size:.78rem;font-weight:600;color:var(--red);margin-bottom:.55rem;display:flex;align-items:center;gap:7px;}
// // .rej-journey{font-size:.66rem;color:var(--tx3);font-style:italic;margin-bottom:.45rem;display:flex;align-items:flex-start;gap:5px;}
// // .rej-point{font-size:.73rem;color:#fca5a5;margin-bottom:.28rem;padding-left:1.1rem;position:relative;}
// // [data-cs-theme="light"] .rej-point{color:#b91c1c;}
// // .rej-point::before{content:'•';position:absolute;left:0;color:var(--red);}
// // .ats-divider{height:1px;background:rgba(248,113,113,.15);margin:.9rem 0 .8rem;}
// // .ats-row{display:flex;align-items:center;justify-content:space-between;}
// // .ats-lbl{font-size:.72rem;color:var(--tx3);}
// // .ats-min{font-size:.65rem;color:var(--amber);margin-top:.2rem;display:flex;align-items:center;gap:5px;}
// // .ats-val{font-size:.88rem;font-weight:700;color:var(--red);}

// // /* ── Score card ── */
// // .score-card{background:var(--card-bg);border:1px solid var(--card-bd);border-radius:14px;padding:1.2rem;margin-bottom:1.4rem;backdrop-filter:blur(12px);opacity:0;transform:translateY(14px);animation:fup .4s ease .2s forwards;transition:background .35s,border-color .35s;}
// // .score-card-hdr{font-size:.8rem;font-weight:700;color:var(--tx);margin-bottom:.8rem;transition:color .35s;}
// // .score-ring-wrap{display:flex;align-items:center;gap:13px;margin-bottom:.8rem;}
// // .score-ring{position:relative;width:62px;height:62px;flex-shrink:0;}
// // .score-ring svg{transform:rotate(-90deg);}
// // .score-ring-lbl{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;}
// // .score-ring-num{font-family:var(--serif);font-size:.9rem;font-weight:700;color:var(--tx);transition:color .35s;}
// // .score-overall{font-family:var(--serif);font-size:2.1rem;font-weight:700;line-height:1;}
// // .score-sub{font-size:.65rem;color:var(--tx3);margin-top:.1rem;transition:color .35s;}
// // .score-dot{width:9px;height:9px;border-radius:50%;animation:pdot 1.5s infinite;flex-shrink:0;}
// // .score-rows{display:flex;flex-direction:column;gap:.55rem;}
// // .srow{display:flex;align-items:center;gap:10px;}
// // .srow-lbl{font-size:.72rem;color:var(--tx2);width:135px;flex-shrink:0;transition:color .35s;}
// // .srow-bar{flex:1;height:5px;border-radius:3px;background:var(--glass2);overflow:hidden;transition:background .35s;}
// // .srow-fill{height:100%;border-radius:3px;transition:width 1.2s cubic-bezier(.4,0,.2,1);}
// // .srow-val{font-size:.7rem;font-weight:600;color:var(--tx3);width:20px;text-align:right;transition:color .35s;}

// // /* ── Timeline card ── */
// // .timeline-card{background:var(--card-bg);border:1px solid var(--card-bd);border-radius:14px;padding:1.2rem;margin-bottom:1.4rem;backdrop-filter:blur(12px);opacity:0;transform:translateY(14px);animation:fup .4s ease .25s forwards;transition:background .35s,border-color .35s;}
// // .tc-hdr{font-size:.8rem;font-weight:700;color:var(--tx);margin-bottom:1.1rem;transition:color .35s;}
// // .tl-wrap{position:relative;}
// // .tl-wrap::before{content:'';position:absolute;left:13px;top:10px;bottom:10px;width:1px;background:var(--card-bd);transition:background .35s;}
// // .tl-item{display:flex;align-items:flex-start;gap:12px;margin-bottom:.85rem;position:relative;}
// // .tl-item:last-child{margin-bottom:0;}
// // .tl-dot{width:27px;height:27px;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.7rem;z-index:1;transition:background .35s,border-color .35s;}
// // .tl-dot.comp{background:var(--tl-done-bg);border:1px solid var(--tl-done-bd);color:var(--tl-done-col);}
// // .tl-dot.pend{background:var(--tl-pend-bg);border:1px solid var(--tl-pend-bd,var(--card-bd));color:var(--tx3);}
// // .tl-nm{font-size:.78rem;font-weight:600;color:var(--tx);transition:color .35s;}
// // .tl-st{font-size:.64rem;font-weight:600;margin-top:.1rem;}
// // .tl-st.comp{color:var(--acc);}
// // .tl-st.pend{color:var(--tx3);}
// // .tl-dt{font-size:.61rem;color:var(--tx3);margin-top:.05rem;transition:color .35s;}

// // /* ── Notes card ── */
// // .notes-card{background:var(--card-bg);border:1px solid var(--card-bd);border-radius:14px;padding:1.2rem;margin-bottom:1.4rem;backdrop-filter:blur(12px);opacity:0;transform:translateY(14px);animation:fup .4s ease .3s forwards;transition:background .35s,border-color .35s;}
// // .notes-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:.9rem;}
// // .notes-title{font-size:.8rem;font-weight:700;color:var(--tx);transition:color .35s;}
// // .add-note-btn{font-size:.67rem;font-weight:600;color:var(--acc);background:var(--accs);border:1px solid var(--bd);padding:.22rem .65rem;border-radius:7px;cursor:pointer;font-family:var(--sans);transition:all .2s;}
// // .add-note-btn:hover{background:var(--acc);color:var(--btn-text);border-color:var(--acc);}
// // .notes-empty{font-size:.75rem;color:var(--tx3);text-align:center;padding:1rem 0;transition:color .35s;}

// // /* ── Action row ── */
// // .action-row{display:flex;gap:.8rem;margin-bottom:1.4rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .35s forwards;}
// // .btn-dl{flex:1;background:var(--card-bg);border:1px solid var(--card-bd);color:var(--tx2);font-family:var(--sans);font-size:.78rem;font-weight:600;padding:.65rem;border-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:7px;transition:all .2s;}
// // .btn-dl:hover{border-color:var(--acc);color:var(--acc);}
// // .btn-profile{flex:2;background:var(--acc);color:var(--btn-text);font-family:var(--sans);font-size:.78rem;font-weight:700;padding:.65rem;border-radius:10px;cursor:pointer;border:none;display:flex;align-items:center;justify-content:center;gap:7px;transition:all .2s;box-shadow:0 0 20px var(--accg);}
// // .btn-profile:hover{background:var(--acc3);box-shadow:0 0 32px var(--accg);transform:translateY(-1px);}
// // .btn-send{flex:2;background:rgba(96,165,250,.1);color:var(--blue);font-family:var(--sans);font-size:.78rem;font-weight:700;padding:.65rem;border-radius:10px;cursor:pointer;border:1px solid rgba(96,165,250,.25);display:flex;align-items:center;justify-content:center;gap:7px;transition:all .2s;}
// // .btn-send:hover{background:var(--blue);color:#fff;}
// // .btn-sched{flex:2;background:var(--accs);color:var(--acc);font-family:var(--sans);font-size:.78rem;font-weight:700;padding:.65rem;border-radius:10px;cursor:pointer;border:1px solid var(--bd);display:flex;align-items:center;justify-content:center;gap:7px;transition:all .2s;}
// // .btn-sched:hover{background:var(--acc);color:var(--btn-text);}

// // /* ── Additional card ── */
// // .addl-card{background:var(--card-bg);border:1px solid var(--card-bd);border-radius:14px;overflow:hidden;backdrop-filter:blur(12px);margin-bottom:2rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .4s forwards;transition:background .35s,border-color .35s;}
// // .addl-row{display:flex;align-items:center;justify-content:space-between;padding:.75rem 1.1rem;border-bottom:1px solid var(--bd);font-size:.78rem;transition:border-color .35s;}
// // .addl-row:last-child{border-bottom:none;}
// // .addl-key{color:var(--tx3);transition:color .35s;}
// // .addl-val{font-weight:600;color:var(--tx);transition:color .35s;}
// // .addl-val.rej{color:var(--red);}

// // @media(max-width:900px){.info-grid{grid-template-columns:1fr;}}
// // `;

// // interface CandidateDetailsProps {
// //   candidate: Candidate & {
// //     displayStatus?: string;
// //     displayScore?:  number;
// //     scoreColor?:    string;
// //     statusInfo?:    { label?: string; cls?: string; priority?: number };
// //     dept?:          string | null;
// //   };
// //   onSendReminder?: (id: string | number) => void;
// // }

// // const CandidateDetails: React.FC<CandidateDetailsProps> = ({ candidate, onSendReminder }) => {
// //   const router = useRouter();
// //   if (!candidate) return null;

// //   const av    = avatarStyle(candidate.name ?? "");
// //   const ini   = initials(candidate.name ?? "?");
// //   const score = candidate.ats_score ?? 0;
// //   const ds    = getDisplayStatus(candidate);

// //   const pillCls = STATUS_PILL_CLS[ds] ?? "pill-applied";
// //   const pillLbl = STATUS_LABEL[ds]    ?? "Applied";
// //   const isRej   = ds === "Rejected";
// //   const colAcc  = isRej ? "var(--red)" : "var(--acc)";

// //   /* Ring SVG */
// //   const radius = 26, circ = 2 * Math.PI * radius;
// //   const dash   = (score / 100) * circ;
// //   const ringColor = score >= 80 ? "#059669" : score >= 70 ? "#d97706" : "#dc2626";

// //   /* Status flags — isFinallyRejected always wins */
// //   const isFinallyRejected =
// //     candidate.status === "Rejected" ||
// //     candidate.final_status === "Rejected After Exam" ||
// //     (candidate.exam_completed && (candidate.exam_percentage ?? 0) < 70) ||
// //     (candidate.link_expired && !candidate.exam_completed);

// //   const isShortlisted = !isFinallyRejected && (
// //     candidate.status === "Shortlisted" ||
// //     candidate.interview_scheduled ||
// //     candidate.final_status === "Hired"
// //   );

// //   const breakdown = [
// //     { l: "Technical Skills", v: Math.min(100, Math.round(score * 1.05)) },
// //     { l: "Communication",    v: Math.min(100, Math.round(score * 0.92)) },
// //     { l: "Problem Solving",  v: Math.min(100, Math.round(score * 0.98)) },
// //     { l: "Cultural Fit",     v: Math.min(100, Math.round(score * 0.88)) },
// //     { l: "Experience Match", v: Math.min(100, Math.round(score * 1.02)) },
// //   ];

// //   const reached = stageReached(candidate);

// //   const showReject   = candidate.status !== "Rejected" && candidate.final_status !== "Hired";
// //   const showSchedule = candidate.status !== "Rejected" && candidate.final_status !== "Hired";
// //   const showSendAsmt = candidate.status === "Shortlisted" && !candidate.exam_link_sent;

// //   let primaryBtn: React.ReactNode;
// //   if (candidate.exam_link_sent && !candidate.exam_completed && !candidate.link_expired) {
// //     primaryBtn = <button className="btn-send" onClick={() => onSendReminder?.(candidate.id)}><Send size={14}/> Send Assessment Reminder</button>;
// //   } else if (candidate.exam_completed && (candidate.exam_percentage ?? 0) >= 70 && !candidate.interview_scheduled) {
// //     primaryBtn = <button className="btn-sched" onClick={() => router.push(`/scheduler?candidate_id=${candidate.id}`)}><Calendar size={14}/> Schedule Interview</button>;
// //   } else {
// //     primaryBtn = <button className="btn-profile" onClick={() => router.push(`/candidates/${candidate.id}`)}><Eye size={14}/> View Full Profile</button>;
// //   }

// //   return (
// //     <>
// //       <style>{DETAIL_CSS}</style>

// //       {/* ── Candidate header ── */}
// //       <div className="c-hdr">
// //         <div className="big-av" style={{ background: av.bg, color: av.fg }}>{ini}</div>
// //         <div style={{ flex: 1, minWidth: 0 }}>
// //           <div className="c-hdr-nm">{candidate.name}</div>
// //           <div className="c-hdr-pos">{candidate.job_title} · {(candidate as any).dept || "—"}</div>
// //           <div className="c-hdr-meta">
// //             {isRej
// //               ? <span className="status-pill rej">⊗ Rejected</span>
// //               : <span className="status-pill act"><span style={{width:6,height:6,borderRadius:"50%",background:"var(--acc)",animation:"pdot 1.5s infinite",display:"inline-block"}} /> {pillLbl}</span>
// //             }
// //             <span className={`cs-pill ${pillCls}`}>{pillLbl}</span>
// //           </div>
// //         </div>
// //         <div className="c-hdr-actions">
// //           {showReject   && <button className="c-hdr-btn c-hdr-btn--danger">Reject</button>}
// //           {showSchedule && <button className="c-hdr-btn c-hdr-btn--success">Schedule Interview</button>}
// //           {showSendAsmt && <button className="c-hdr-btn c-hdr-btn--blue">Send Assessment</button>}
// //         </div>
// //       </div>

// //       {/* ── Info grid ── */}
// //       <div className="info-grid">
// //         <div className="ibox"><div className="ilbl">Email</div><div className="ival"><a href={`mailto:${candidate.email}`}>{candidate.email}</a></div></div>
// //         <div className="ibox"><div className="ilbl">Phone</div><div className={`ival${!candidate.phone ? " empty" : ""}`}>{candidate.phone || "—"}</div></div>
// //         <div className="ibox"><div className="ilbl">Applied</div><div className="ival">{fmtDate(candidate.processed_date)}</div></div>
// //         <div className="ibox"><div className="ilbl">Department</div><div className={`ival${!(candidate as any).dept ? " empty" : ""}`}>{(candidate as any).dept || "—"}</div></div>
// //       </div>

// //       {/* ── Why Shortlisted ── */}
// //       {isShortlisted && (
// //         <div className="short-box">
// //           <div className="short-hdr">👍 Why Shortlisted</div>
// //           {getShortlistReasons(candidate).map((r, i) => (
// //             <div key={i} className="short-reason">✓ {r}</div>
// //           ))}
// //           <div className="short-bar-wrap">
// //             <div className="short-bar-lbl"><span>ATS Score</span><span>{score} / 100</span></div>
// //             <div className="short-bar"><div className="short-bar-fill" style={{ width: `${Math.min(score,100)}%`, background: "var(--acc)" }} /></div>
// //           </div>
// //         </div>
// //       )}

// //       {/* ── Why Rejected ── */}
// //       {isFinallyRejected && (
// //         <div className="rej-box">
// //           <div className="rej-hdr">⚠️ Why Rejected</div>
// //           {getRejectionPoints(candidate).map((pt, i) =>
// //             pt.journey ? (
// //               <div key={i} className="rej-journey">ℹ {pt.headline}</div>
// //             ) : (
// //               <div key={i}>
// //                 <div className="rej-main">⊗ {pt.headline}</div>
// //                 {pt.fb.map((f, j) => <div key={j} className="rej-point">{f}</div>)}
// //               </div>
// //             )
// //           )}
// //           <div className="ats-divider" />
// //           <div className="ats-row">
// //             <div>
// //               <div className="ats-lbl">ATS Score</div>
// //               <div className="ats-min">⚠ Minimum required score: 70 / 100</div>
// //             </div>
// //             <div className="ats-val">{score} / 100</div>
// //           </div>
// //         </div>
// //       )}

// //       {/* ── AI Match Score ── */}
// //       <div className="score-card">
// //         <div className="score-card-hdr">🎯 AI Match Score</div>
// //         <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:".7rem" }}>
// //           <div className="score-dot" style={{ background: colAcc }} />
// //           <span style={{ fontSize:".7rem", color:"var(--tx3)" }}>Overall match score</span>
// //         </div>
// //         <div className="score-ring-wrap">
// //           <div className="score-ring">
// //             <svg width="62" height="62" viewBox="0 0 62 62">
// //               <circle cx="31" cy="31" r={radius} fill="none" stroke="var(--glass2)" strokeWidth="6"/>
// //               <circle cx="31" cy="31" r={radius} fill="none" stroke={ringColor} strokeWidth="6"
// //                 strokeDasharray={`${dash.toFixed(1)} ${circ.toFixed(1)}`} strokeLinecap="round"/>
// //             </svg>
// //             <div className="score-ring-lbl"><span className="score-ring-num">{score}</span></div>
// //           </div>
// //           <div>
// //             <div className="score-overall" style={{ color: colAcc }}>{score}/100</div>
// //             <div className="score-sub">{score >= 80 ? "Strong match" : score >= 60 ? "Good match" : "Weak match"}</div>
// //           </div>
// //         </div>
// //         <div className="score-rows">
// //           {breakdown.map((b) => (
// //             <div key={b.l} className="srow">
// //               <span className="srow-lbl">{b.l}</span>
// //               <div className="srow-bar"><div className="srow-fill" style={{ width:`${b.v}%`, background: scoreBarColor(b.v) }}/></div>
// //               <span className="srow-val">{b.v}</span>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* ── Recruitment Timeline ── */}
// //       <div className="timeline-card">
// //         <div className="tc-hdr">📅 Recruitment Timeline</div>
// //         <div className="tl-wrap">
// //           {TL_STAGES.map((s) => {
// //             const done = reached(s.key);
// //             return (
// //               <div key={s.key} className="tl-item">
// //                 <div className={`tl-dot ${done ? "comp" : "pend"}`}>{s.icon}</div>
// //                 <div>
// //                   <div className="tl-nm">{s.label}</div>
// //                   <div className={`tl-st ${done ? "comp" : "pend"}`}>{done ? "Completed" : "Pending"}</div>
// //                   {done && <div className="tl-dt">{fmtDate(candidate.processed_date)}</div>}
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </div>

// //       {/* ── Notes & Feedback ── */}
// //       <div className="notes-card">
// //         <div className="notes-hdr">
// //           <span className="notes-title">📝 Notes &amp; Feedback</span>
// //           <button className="add-note-btn">+ Add Note</button>
// //         </div>
// //         <div className="notes-empty">No notes yet</div>
// //       </div>

// //       {/* ── Action buttons ── */}
// //       <div className="action-row">
// //         <button className="btn-dl"><Download size={14}/> Download Resume</button>
// //         {primaryBtn}
// //       </div>

// //       {/* ── Additional info ── */}
// //       <div className="addl-card">
// //         <div className="addl-row"><span className="addl-key">Job ID</span><span className="addl-val">{candidate.job_id}</span></div>
// //         <div className="addl-row"><span className="addl-key">Candidate ID</span><span className="addl-val">{candidate.id}</span></div>
// //         <div className="addl-row"><span className="addl-key">Status</span><span className="addl-val">{ds}</span></div>
// //         <div className="addl-row"><span className="addl-key">Initial Status</span><span className={`addl-val${isRej ? " rej" : ""}`}>{isRej ? "Rejected" : "Active"}</span></div>
// //         {candidate.exam_completed && (
// //           <div className="addl-row">
// //             <span className="addl-key">Assessment Score</span>
// //             <span className="addl-val" style={{ color: (candidate.exam_percentage ?? 0) >= 70 ? "var(--acc)" : "var(--red)" }}>
// //               {(candidate.exam_percentage ?? 0).toFixed(0)}%
// //             </span>
// //           </div>
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default React.memo(CandidateDetails);
// "use client";

// import React from "react";
// import { Download, Send, Calendar, Eye } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { Candidate } from "@/services/interfaces/CandidateScreening";

// /* ── Helpers ── */
// function avatarStyle(name: string) {
//   const p: [string,string][] = [
//     ["#EFF6FF","#2563EB"],["#F0FDF4","#16A34A"],["#FFF7ED","#EA580C"],
//     ["#FAF5FF","#7C3AED"],["#FFF1F2","#E11D48"],["#F0FDFA","#0D9488"],
//     ["#FFFBEB","#D97706"],["#FDF4FF","#A21CAF"],
//   ];
//   let h = 0;
//   for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
//   const [bg, fg] = p[Math.abs(h) % p.length];
//   return { bg, fg };
// }
// function initials(name: string) {
//   return name.split(" ").slice(0,2).map((w) => w[0]).join("").toUpperCase();
// }
// function fmtDate(str?: string | null) {
//   if (!str) return "—";
//   try { return new Date(str).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}); }
//   catch { return str; }
// }
// function scoreBarColor(v: number) {
//   return v >= 75 ? "var(--acc)" : v >= 60 ? "var(--amber)" : "var(--red)";
// }
// function getDisplayStatus(c: Candidate): string {
//   if (c?.final_status === "Hired")       return "Hired";
//   if (c?.interview_scheduled)            return "Interview Scheduled";
//   if (c?.exam_completed)                 return (c?.exam_percentage ?? 0) >= 70 ? "Assessment Passed" : "Assessment Failed";
//   if (c?.exam_started)                   return "Assessment In Progress";
//   if (c?.exam_link_sent)                 return c?.link_expired ? "Assessment Expired" : "Assessment Sent";
//   if (c?.status === "Shortlisted")       return "Shortlisted";
//   if (c?.status === "Rejected" || c?.final_status === "Rejected After Exam") return "Rejected";
//   return "Under Review";
// }

// // function getRejectionPoints(c: Candidate) {
// //   const score = c.ats_score ?? 0, exam = c.exam_percentage ?? 0;
// //   const pts: { headline: string; fb: string[]; journey: boolean }[] = [];
// //   if (!c.exam_link_sent) {
// //     pts.push({ headline: score < 60 ? `Low ATS score: ${score}/100 — minimum threshold is 60` : `ATS score ${score}/100 — below the shortlist cut-off of 70`, fb: [`Score is ${Math.max(70-score,0).toFixed(0)} points below the shortlist threshold of 70`,"Resume keywords and experience don't closely match the job description","Profile filtered out at automated screening before manual review"], journey: false });
// //     return pts;
// //   }
// //   if (score >= 70) pts.push({ headline: `Initially shortlisted — ATS score ${score}/100 met the threshold`, fb: [], journey: true });
// //   else if (score >= 60) pts.push({ headline: `Initially reviewed — ATS score ${score}/100 passed minimum screening`, fb: [], journey: true });
// //   if (c.link_expired && !c.exam_completed) {
// //     pts.push({ headline: "Assessment not completed — invitation link expired", fb: ["Candidate received the link but did not submit the test","Links have a fixed validity window — once expired they cannot be reused","HR can decide whether to resend or close this application"], journey: false });
// //     return pts;
// //   }
// //   if (c.exam_completed && exam < 70) {
// //     const gap = (70 - exam).toFixed(0);
// //     const sev = exam < 40 ? "Very low score — significant gaps in core skills required for this role" : exam < 55 ? "Partial understanding but insufficient depth in key areas" : `Close to pass mark — ${gap}% short of the required threshold`;
// //     pts.push({ headline: `Failed assessment: scored ${exam.toFixed(0)}% — required pass mark is 70%`, fb: [`Achieved ${exam.toFixed(0)}% against the 70% pass mark — ${gap}% below the minimum`, sev,"Strong ATS resume score but technical skills not demonstrated at the required level"], journey: false });
// //   }
// //   if (c.final_status === "Rejected After Exam") {
// //     pts.push({ headline: "Did not meet post-assessment criteria for the next stage", fb: ["Overall evaluation after assessment did not clear the bar for this role","Skills, experience, and assessment result considered holistically","HR review determined candidate is not a strong enough fit at this stage"], journey: false });
// //   }
// //   return pts;
// // }
// function getRejectionPoints(c: Candidate) {
//   const score      = c.ats_score ?? 0;
//   const breakdown  = (c as any).rejection_breakdown as {
//     decision?:       string;
//     reasons?:        string[];
//     missing_skills?: string[];
//     matched_skills?: string[];
//   } | undefined;

//   const pts: { headline: string; fb: string[]; journey: boolean }[] = [];

//   // ── Use actual AI-generated data from pipeline ────────────────────────────
//   if (breakdown?.reasons?.length) {
//     const headline = breakdown.decision
//       ? `${breakdown.decision} — Score ${score}/100 is below the 70 threshold`
//       : `Score ${score}/100 — below the shortlist threshold of 70`;

//     const fb: string[] = [...(breakdown.reasons ?? [])];

//     if (breakdown.missing_skills?.length) {
//       fb.push(`Missing required skills: ${breakdown.missing_skills.join(", ")}`);
//     }
//     if (breakdown.matched_skills?.length) {
//       fb.push(`Matched skills: ${breakdown.matched_skills.join(", ")}`);
//     }

//     pts.push({ headline, fb, journey: false });
//     return pts;
//   }

//   // ── Fallback: generic reasons when no AI data available ───────────────────
//   if (!c.exam_link_sent) {
//     pts.push({
//       headline: score < 60
//         ? `Low ATS score: ${score}/100 — minimum threshold is 60`
//         : `ATS score ${score}/100 — below the shortlist cut-off of 70`,
//       fb: [
//         `Score is ${Math.max(70 - score, 0).toFixed(0)} points below the shortlist threshold of 70`,
//         "Resume keywords and experience don't closely match the job description",
//         "Profile filtered out at automated screening before manual review",
//       ],
//       journey: false,
//     });
//     return pts;
//   }

//   // ── Assessment failure path ───────────────────────────────────────────────
//   if (c.link_expired && !c.exam_completed) {
//     pts.push({
//       headline: "Assessment not completed — invitation link expired",
//       fb: [
//         "Candidate received the link but did not submit the test",
//         "Links have a fixed validity window — once expired they cannot be reused",
//         "HR can decide whether to resend or close this application",
//       ],
//       journey: false,
//     });
//     return pts;
//   }

//   if (c.exam_completed && (c.exam_percentage ?? 0) < 70) {
//     const exam = c.exam_percentage ?? 0;
//     const gap  = (70 - exam).toFixed(0);
//     pts.push({
//       headline: `Failed assessment: scored ${exam.toFixed(0)}% — required pass mark is 70%`,
//       fb: [
//         `Achieved ${exam.toFixed(0)}% against the 70% pass mark — ${gap}% below the minimum`,
//         exam < 40
//           ? "Very low score — significant gaps in core skills required for this role"
//           : exam < 55
//           ? "Partial understanding but insufficient depth in key areas"
//           : `Close to pass mark — ${gap}% short of the required threshold`,
//         "Strong ATS resume score but technical skills not demonstrated at the required level",
//       ],
//       journey: false,
//     });
//   }

//   return pts;
// }

// function getShortlistReasons(c: Candidate) {
//   const score = c.ats_score ?? 0, exam = c.exam_percentage ?? 0;
//   const r: string[] = [];
//   if (score >= 85) r.push(`Excellent ATS score of ${score}/100 — top 10% of applicants`);
//   else if (score >= 70) r.push(`Strong ATS score of ${score}/100 — meets the shortlist threshold`);
//   else if (score >= 60) r.push(`Acceptable ATS score of ${score}/100 — manually reviewed and approved`);
//   if (c.exam_completed && exam >= 70) r.push(`Passed assessment with ${exam.toFixed(0)}% — above the 70% pass mark`);
//   if (c.interview_scheduled) r.push("Interview scheduled — progressed through all screening stages");
//   if (c.final_status === "Hired") r.push("Offer accepted — candidate successfully hired");
//   if (!r.length) r.push("Met minimum qualification criteria set for this job role");
//   return r;
// }

// const TL_STAGES = [
//   { key: "applied",     label: "Application Received", icon: "✓" },
//   { key: "screened",    label: "Resume Screened",       icon: "📄" },
//   { key: "shortlisted", label: "Shortlisted",           icon: "★" },
//   { key: "assessment",  label: "Assessment Sent",       icon: "✉" },
//   { key: "interview",   label: "Interview Scheduled",   icon: "🗓" },
//   { key: "offer",       label: "Offer Extended",        icon: "✓" },
// ];

// function stageReached(c: Candidate) {
//   const ds = getDisplayStatus(c);
//   if (ds === "Hired")                              return (k: string) => true;
//   if (ds === "Interview Scheduled")                return (k: string) => ["applied","screened","shortlisted","assessment","interview"].includes(k);
//   if (["Assessment Passed","Assessment Failed"].includes(ds)) return (k: string) => ["applied","screened","shortlisted","assessment"].includes(k);
//   if (["Assessment In Progress","Assessment Sent","Assessment Expired"].includes(ds)) return (k: string) => ["applied","screened","shortlisted"].includes(k);
//   if (ds === "Shortlisted")                        return (k: string) => ["applied","screened","shortlisted"].includes(k);
//   if (ds === "Rejected")                           return (k: string) => ["applied","screened"].includes(k);
//   return (k: string) => ["applied"].includes(k);
// }

// const STATUS_PILL_CLS: Record<string,string> = {
//   "Hired":"pill-hired","Interview Scheduled":"pill-interview","Shortlisted":"pill-shortlisted",
//   "Assessment Passed":"pill-assessed","Assessment Failed":"pill-assessed",
//   "Assessment Sent":"pill-assessment","Assessment In Progress":"pill-assessment","Assessment Expired":"pill-assessment",
//   "Rejected":"pill-rejected","Under Review":"pill-applied",
// };
// const STATUS_LABEL: Record<string,string> = {
//   "Hired":"Hired","Interview Scheduled":"Interview Scheduled","Shortlisted":"Shortlisted",
//   "Assessment Passed":"Assessment Done","Assessment Failed":"Assessment Done",
//   "Assessment Sent":"Assessment Pending","Assessment In Progress":"Assessment Pending","Assessment Expired":"Assessment Pending",
//   "Rejected":"Rejected","Under Review":"Applied",
// };

// /* ── CSS — exactly mirrors HTML .c-hdr, .info-grid, .rej-box, .score-card, etc. ── */
// const DETAIL_CSS = `
// @keyframes fup{to{opacity:1;transform:translateY(0);}}
// @keyframes pdot{0%,100%{opacity:1;}50%{opacity:.4;}}

// /* ── Candidate header ── */
// .c-hdr{display:flex;align-items:flex-start;gap:16px;margin-bottom:1.5rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .05s forwards;}
// .big-av{width:58px;height:58px;border-radius:15px;display:flex;align-items:center;justify-content:center;font-family:var(--serif);font-size:1.1rem;font-weight:700;flex-shrink:0;}
// .c-hdr-nm{font-family:var(--serif);font-size:1.7rem;line-height:1.1;margin-bottom:.2rem;color:var(--tx);transition:color .35s;}
// .c-hdr-pos{font-size:.8rem;color:var(--tx2);margin-bottom:.4rem;transition:color .35s;}
// .c-hdr-meta{display:flex;align-items:center;gap:6px;flex-wrap:wrap;}
// .status-pill{display:inline-flex;align-items:center;gap:5px;font-size:.67rem;font-weight:700;padding:.2rem .65rem;border-radius:999px;}
// .status-pill.rej{background:rgba(248,113,113,.1);color:var(--red);border:1px solid rgba(248,113,113,.2);}
// .status-pill.act{background:var(--accs);color:var(--acc);border:1px solid var(--bd);}
// .c-hdr-actions{display:flex;gap:.45rem;flex-wrap:wrap;margin-left:auto;flex-shrink:0;}
// .c-hdr-btn{font-family:var(--sans);font-size:.67rem;font-weight:600;padding:.28rem .68rem;border-radius:7px;cursor:pointer;transition:all .18s;border:1px solid var(--card-bd);background:var(--glass2);color:var(--tx2);}
// .c-hdr-btn:hover{border-color:var(--acc);color:var(--acc);}
// .c-hdr-btn--danger{background:rgba(248,113,113,.1);color:var(--red);border-color:rgba(248,113,113,.2);}
// .c-hdr-btn--danger:hover{background:var(--red);color:#fff;border-color:var(--red);}
// .c-hdr-btn--success{background:var(--accs);color:var(--acc);border-color:var(--bd);}
// .c-hdr-btn--success:hover{background:var(--acc);color:var(--btn-text);}
// .c-hdr-btn--blue{background:rgba(96,165,250,.1);color:var(--blue);border-color:rgba(96,165,250,.2);}

// /* ── Info grid ── */
// .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:1.4rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .1s forwards;}
// .ibox{background:var(--card-bg);border:1px solid var(--card-bd);border-radius:12px;padding:.85rem 1rem;backdrop-filter:blur(12px);transition:background .35s,border-color .35s;}
// .ilbl{font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--tx3);margin-bottom:.3rem;transition:color .35s;}
// .ival{font-size:.8rem;color:var(--tx);font-weight:500;transition:color .35s;}
// .ival a{color:var(--acc);text-decoration:none;}
// .ival a:hover{text-decoration:underline;}
// .ival.empty{color:var(--tx3);}

// /* ── Shortlisted box ── */
// .short-box{background:var(--short-bg,rgba(0,214,143,.05));border:1px solid var(--short-bd,rgba(0,214,143,.2));border-radius:14px;padding:1.1rem 1.2rem;margin-bottom:1.4rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .12s forwards;transition:all .35s;}
// .short-hdr{display:flex;align-items:center;gap:8px;font-size:.82rem;font-weight:700;color:var(--acc);margin-bottom:.65rem;}
// .short-reason{display:flex;align-items:flex-start;gap:6px;font-size:.7rem;margin-bottom:.3rem;line-height:1.45;}
// [data-cs-theme="dark"] .short-reason{color:#6ee7b7;}
// [data-cs-theme="light"] .short-reason{color:#065f46;}
// .short-bar-wrap{margin-top:.65rem;}
// .short-bar-lbl{display:flex;justify-content:space-between;font-size:.61rem;color:var(--acc);margin-bottom:.25rem;}
// .short-bar{height:5px;border-radius:3px;background:var(--glass2);overflow:hidden;}
// .short-bar-fill{height:100%;border-radius:3px;transition:width 1.2s cubic-bezier(.4,0,.2,1);}

// /* ── Rejected box ── */
// .rej-box{background:var(--rej-bg);border:1px solid var(--rej-bd);border-radius:14px;padding:1.1rem 1.2rem;margin-bottom:1.4rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .15s forwards;transition:background .35s,border-color .35s;}
// .rej-hdr{display:flex;align-items:center;gap:8px;font-size:.82rem;font-weight:700;color:var(--red);margin-bottom:.75rem;}
// .rej-main{font-size:.78rem;font-weight:600;color:var(--red);margin-bottom:.55rem;display:flex;align-items:center;gap:7px;}
// .rej-journey{font-size:.66rem;color:var(--tx3);font-style:italic;margin-bottom:.45rem;display:flex;align-items:flex-start;gap:5px;}
// .rej-point{font-size:.73rem;color:#fca5a5;margin-bottom:.28rem;padding-left:1.1rem;position:relative;}
// [data-cs-theme="light"] .rej-point{color:#b91c1c;}
// .rej-point::before{content:'•';position:absolute;left:0;color:var(--red);}
// .ats-divider{height:1px;background:rgba(248,113,113,.15);margin:.9rem 0 .8rem;}
// .ats-row{display:flex;align-items:center;justify-content:space-between;}
// .ats-lbl{font-size:.72rem;color:var(--tx3);}
// .ats-min{font-size:.65rem;color:var(--amber);margin-top:.2rem;display:flex;align-items:center;gap:5px;}
// .ats-val{font-size:.88rem;font-weight:700;color:var(--red);}

// /* ── Score card ── */
// .score-card{background:var(--card-bg);border:1px solid var(--card-bd);border-radius:14px;padding:1.2rem;margin-bottom:1.4rem;backdrop-filter:blur(12px);opacity:0;transform:translateY(14px);animation:fup .4s ease .2s forwards;transition:background .35s,border-color .35s;}
// .score-card-hdr{font-size:.8rem;font-weight:700;color:var(--tx);margin-bottom:.8rem;transition:color .35s;}
// .score-ring-wrap{display:flex;align-items:center;gap:13px;margin-bottom:.8rem;}
// .score-ring{position:relative;width:62px;height:62px;flex-shrink:0;}
// .score-ring svg{transform:rotate(-90deg);}
// .score-ring-lbl{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;}
// .score-ring-num{font-family:var(--serif);font-size:.9rem;font-weight:700;color:var(--tx);transition:color .35s;}
// .score-overall{font-family:var(--serif);font-size:2.1rem;font-weight:700;line-height:1;}
// .score-sub{font-size:.65rem;color:var(--tx3);margin-top:.1rem;transition:color .35s;}
// .score-dot{width:9px;height:9px;border-radius:50%;animation:pdot 1.5s infinite;flex-shrink:0;}
// .score-rows{display:flex;flex-direction:column;gap:.55rem;}
// .srow{display:flex;align-items:center;gap:10px;}
// .srow-lbl{font-size:.72rem;color:var(--tx2);width:135px;flex-shrink:0;transition:color .35s;}
// .srow-bar{flex:1;height:5px;border-radius:3px;background:var(--glass2);overflow:hidden;transition:background .35s;}
// .srow-fill{height:100%;border-radius:3px;transition:width 1.2s cubic-bezier(.4,0,.2,1);}
// .srow-val{font-size:.7rem;font-weight:600;color:var(--tx3);width:20px;text-align:right;transition:color .35s;}

// /* ── Timeline card ── */
// .timeline-card{background:var(--card-bg);border:1px solid var(--card-bd);border-radius:14px;padding:1.2rem;margin-bottom:1.4rem;backdrop-filter:blur(12px);opacity:0;transform:translateY(14px);animation:fup .4s ease .25s forwards;transition:background .35s,border-color .35s;}
// .tc-hdr{font-size:.8rem;font-weight:700;color:var(--tx);margin-bottom:1.1rem;transition:color .35s;}
// .tl-wrap{position:relative;}
// .tl-wrap::before{content:'';position:absolute;left:13px;top:10px;bottom:10px;width:1px;background:var(--card-bd);transition:background .35s;}
// .tl-item{display:flex;align-items:flex-start;gap:12px;margin-bottom:.85rem;position:relative;}
// .tl-item:last-child{margin-bottom:0;}
// .tl-dot{width:27px;height:27px;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.7rem;z-index:1;transition:background .35s,border-color .35s;}
// .tl-dot.comp{background:var(--tl-done-bg);border:1px solid var(--tl-done-bd);color:var(--tl-done-col);}
// .tl-dot.pend{background:var(--tl-pend-bg);border:1px solid var(--tl-pend-bd,var(--card-bd));color:var(--tx3);}
// .tl-nm{font-size:.78rem;font-weight:600;color:var(--tx);transition:color .35s;}
// .tl-st{font-size:.64rem;font-weight:600;margin-top:.1rem;}
// .tl-st.comp{color:var(--acc);}
// .tl-st.pend{color:var(--tx3);}
// .tl-dt{font-size:.61rem;color:var(--tx3);margin-top:.05rem;transition:color .35s;}

// /* ── Notes card ── */
// .notes-card{background:var(--card-bg);border:1px solid var(--card-bd);border-radius:14px;padding:1.2rem;margin-bottom:1.4rem;backdrop-filter:blur(12px);opacity:0;transform:translateY(14px);animation:fup .4s ease .3s forwards;transition:background .35s,border-color .35s;}
// .notes-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:.9rem;}
// .notes-title{font-size:.8rem;font-weight:700;color:var(--tx);transition:color .35s;}
// .add-note-btn{font-size:.67rem;font-weight:600;color:var(--acc);background:var(--accs);border:1px solid var(--bd);padding:.22rem .65rem;border-radius:7px;cursor:pointer;font-family:var(--sans);transition:all .2s;}
// .add-note-btn:hover{background:var(--acc);color:var(--btn-text);border-color:var(--acc);}
// .notes-empty{font-size:.75rem;color:var(--tx3);text-align:center;padding:1rem 0;transition:color .35s;}

// /* ── Action row ── */
// .action-row{display:flex;gap:.8rem;margin-bottom:1.4rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .35s forwards;}
// .btn-dl{flex:1;background:var(--card-bg);border:1px solid var(--card-bd);color:var(--tx2);font-family:var(--sans);font-size:.78rem;font-weight:600;padding:.65rem;border-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:7px;transition:all .2s;}
// .btn-dl:hover{border-color:var(--acc);color:var(--acc);}
// .btn-profile{flex:2;background:var(--acc);color:var(--btn-text);font-family:var(--sans);font-size:.78rem;font-weight:700;padding:.65rem;border-radius:10px;cursor:pointer;border:none;display:flex;align-items:center;justify-content:center;gap:7px;transition:all .2s;box-shadow:0 0 20px var(--accg);}
// .btn-profile:hover{background:var(--acc3);box-shadow:0 0 32px var(--accg);transform:translateY(-1px);}
// .btn-send{flex:2;background:rgba(96,165,250,.1);color:var(--blue);font-family:var(--sans);font-size:.78rem;font-weight:700;padding:.65rem;border-radius:10px;cursor:pointer;border:1px solid rgba(96,165,250,.25);display:flex;align-items:center;justify-content:center;gap:7px;transition:all .2s;}
// .btn-send:hover{background:var(--blue);color:#fff;}
// .btn-sched{flex:2;background:var(--accs);color:var(--acc);font-family:var(--sans);font-size:.78rem;font-weight:700;padding:.65rem;border-radius:10px;cursor:pointer;border:1px solid var(--bd);display:flex;align-items:center;justify-content:center;gap:7px;transition:all .2s;}
// .btn-sched:hover{background:var(--acc);color:var(--btn-text);}

// /* ── Additional card ── */
// .addl-card{background:var(--card-bg);border:1px solid var(--card-bd);border-radius:14px;overflow:hidden;backdrop-filter:blur(12px);margin-bottom:2rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .4s forwards;transition:background .35s,border-color .35s;}
// .addl-row{display:flex;align-items:center;justify-content:space-between;padding:.75rem 1.1rem;border-bottom:1px solid var(--bd);font-size:.78rem;transition:border-color .35s;}
// .addl-row:last-child{border-bottom:none;}
// .addl-key{color:var(--tx3);transition:color .35s;}
// .addl-val{font-weight:600;color:var(--tx);transition:color .35s;}
// .addl-val.rej{color:var(--red);}

// @media(max-width:900px){.info-grid{grid-template-columns:1fr;}}
// `;

// interface CandidateDetailsProps {
//   candidate: Candidate & {
//     displayStatus?: string;
//     displayScore?:  number;
//     scoreColor?:    string;
//     statusInfo?:    { label?: string; cls?: string; priority?: number };
//     dept?:          string | null;
//   };
//   onSendReminder?: (id: string | number) => void;
// }

// const CandidateDetails: React.FC<CandidateDetailsProps> = ({ candidate, onSendReminder }) => {
//   const router = useRouter();
//   if (!candidate) return null;

//   const av    = avatarStyle(candidate.name ?? "");
//   const ini   = initials(candidate.name ?? "?");
//   const score = candidate.ats_score ?? 0;
//   const ds    = getDisplayStatus(candidate);

//   const pillCls = STATUS_PILL_CLS[ds] ?? "pill-applied";
//   const pillLbl = STATUS_LABEL[ds]    ?? "Applied";
//   const isRej   = ds === "Rejected";
//   const colAcc  = isRej ? "var(--red)" : "var(--acc)";

//   /* Ring SVG */
//   const radius = 26, circ = 2 * Math.PI * radius;
//   const dash   = (score / 100) * circ;
//   const ringColor = score >= 80 ? "#059669" : score >= 70 ? "#d97706" : "#dc2626";

//   /* Status flags — isFinallyRejected always wins */
//   // const isFinallyRejected =
//   //   candidate.status === "Rejected" ||
//   //   candidate.final_status === "Rejected After Exam" ||
//   //   (candidate.exam_completed && (candidate.exam_percentage ?? 0) < 70) ||
//   //   (candidate.link_expired && !candidate.exam_completed);

//   const isFinallyRejected =
//     candidate.status === "Rejected"                                          ||
//     candidate.status === "Pending Review"                                    ||
//     candidate.final_status === "Rejected After Exam"                         ||
//     (candidate.exam_completed && (candidate.exam_percentage ?? 0) < 70)     ||
//     (candidate.link_expired && !candidate.exam_completed)                    ||
//     // Show rejection block for any scored candidate below threshold
//     ((candidate.ats_score ?? 0) > 0 &&
//     (candidate.ats_score ?? 0) < 70 &&
//     !candidate.exam_link_sent);

//   const isShortlisted = !isFinallyRejected && (
//     candidate.status === "Shortlisted" ||
//     candidate.interview_scheduled ||
//     candidate.final_status === "Hired"
//   );

//   const breakdown = [
//     { l: "Technical Skills", v: Math.min(100, Math.round(score * 1.05)) },
//     { l: "Communication",    v: Math.min(100, Math.round(score * 0.92)) },
//     { l: "Problem Solving",  v: Math.min(100, Math.round(score * 0.98)) },
//     { l: "Cultural Fit",     v: Math.min(100, Math.round(score * 0.88)) },
//     { l: "Experience Match", v: Math.min(100, Math.round(score * 1.02)) },
//   ];

//   const reached = stageReached(candidate);

//   const showReject   = candidate.status !== "Rejected" && candidate.final_status !== "Hired";
//   const showSchedule = candidate.status !== "Rejected" && candidate.final_status !== "Hired";
//   const showSendAsmt = candidate.status === "Shortlisted" && !candidate.exam_link_sent;

//   let primaryBtn: React.ReactNode;
//   if (candidate.exam_link_sent && !candidate.exam_completed && !candidate.link_expired) {
//     primaryBtn = <button className="btn-send" onClick={() => onSendReminder?.(candidate.id)}><Send size={14}/> Send Assessment Reminder</button>;
//   } else if (candidate.exam_completed && (candidate.exam_percentage ?? 0) >= 70 && !candidate.interview_scheduled) {
//     primaryBtn = <button className="btn-sched" onClick={() => router.push(`/scheduler?candidate_id=${candidate.id}`)}><Calendar size={14}/> Schedule Interview</button>;
//   } else {
//     primaryBtn = <button className="btn-profile" onClick={() => router.push(`/candidates/${candidate.id}`)}><Eye size={14}/> View Full Profile</button>;
//   }

//   return (
//     <>
//       <style>{DETAIL_CSS}</style>

//       {/* ── Candidate header ── */}
//       <div className="c-hdr">
//         <div className="big-av" style={{ background: av.bg, color: av.fg }}>{ini}</div>
//         <div style={{ flex: 1, minWidth: 0 }}>
//           <div className="c-hdr-nm">{candidate.name}</div>
//           <div className="c-hdr-pos">
//             {candidate.job_title ? candidate.job_title.charAt(0).toUpperCase() + candidate.job_title.slice(1) : "—"}
//             {(candidate as any).dept && (candidate as any).dept !== "—" ? ` · ${(candidate as any).dept}` : ""}
//           </div>
//           <div className="c-hdr-meta">
//             {isRej
//               ? <span className="status-pill rej">⊗ Rejected</span>
//               : <span className="status-pill act">
//                   <span style={{width:6,height:6,borderRadius:"50%",background:"var(--acc)",animation:"pdot 1.5s infinite",display:"inline-block"}} />
//                   {pillLbl}
//                 </span>
//             }
//           </div>
//         </div>
//         <div className="c-hdr-actions">
//           {showReject   && <button className="c-hdr-btn c-hdr-btn--danger">Reject</button>}
//           {showSchedule && <button className="c-hdr-btn c-hdr-btn--success">Schedule Interview</button>}
//           {showSendAsmt && <button className="c-hdr-btn c-hdr-btn--blue">Send Assessment</button>}
//         </div>
//       </div>

//       {/* ── Info grid ── */}
//       <div className="info-grid">
//         <div className="ibox"><div className="ilbl">Email</div><div className="ival"><a href={`mailto:${candidate.email}`}>{candidate.email}</a></div></div>
//         <div className="ibox"><div className="ilbl">Phone</div><div className={`ival${!candidate.phone ? " empty" : ""}`}>{candidate.phone || "—"}</div></div>
//         <div className="ibox"><div className="ilbl">Applied</div><div className="ival">{fmtDate(candidate.processed_date)}</div></div>
//         <div className="ibox"><div className="ilbl">Department</div><div className={`ival${!(candidate as any).dept ? " empty" : ""}`}>{(candidate as any).dept || "—"}</div></div>
//       </div>

//       {/* ── Why Shortlisted ── */}
//       {isShortlisted && (
//         <div className="short-box">
//           <div className="short-hdr">👍 Why Shortlisted</div>
//           {getShortlistReasons(candidate).map((r, i) => (
//             <div key={i} className="short-reason">✓ {r}</div>
//           ))}
//           <div className="short-bar-wrap">
//             <div className="short-bar-lbl"><span>ATS Score</span><span>{score} / 100</span></div>
//             <div className="short-bar"><div className="short-bar-fill" style={{ width: `${Math.min(score,100)}%`, background: "var(--acc)" }} /></div>
//           </div>
//         </div>
//       )}

//       {/* ── Why Rejected ── */}
//       {isFinallyRejected && (
//         <div className="rej-box">
//           <div className="rej-hdr">⚠️ Why Rejected</div>
//           {getRejectionPoints(candidate).map((pt, i) =>
//             pt.journey ? (
//               <div key={i} className="rej-journey">ℹ {pt.headline}</div>
//             ) : (
//               <div key={i}>
//                 <div className="rej-main">⊗ {pt.headline}</div>
//                 {pt.fb.map((f, j) => <div key={j} className="rej-point">{f}</div>)}
//               </div>
//             )
//           )}
//           <div className="ats-divider" />
//           <div className="ats-row">
//             <div>
//               <div className="ats-lbl">ATS Score</div>
//               <div className="ats-min">⚠ Minimum required score: 70 / 100</div>
//             </div>
//             <div className="ats-val">{score} / 100</div>
//           </div>
//         </div>
//       )}

//       {/* ── AI Match Score ── */}
//       <div className="score-card">
//         <div className="score-card-hdr">🎯 AI Match Score</div>
//         <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:".7rem" }}>
//           <div className="score-dot" style={{ background: colAcc }} />
//           <span style={{ fontSize:".7rem", color:"var(--tx3)" }}>Overall match score</span>
//         </div>
//         <div className="score-ring-wrap">
//           <div className="score-ring">
//             <svg width="62" height="62" viewBox="0 0 62 62">
//               <circle cx="31" cy="31" r={radius} fill="none" stroke="var(--glass2)" strokeWidth="6"/>
//               <circle cx="31" cy="31" r={radius} fill="none" stroke={ringColor} strokeWidth="6"
//                 strokeDasharray={`${dash.toFixed(1)} ${circ.toFixed(1)}`} strokeLinecap="round"/>
//             </svg>
//             <div className="score-ring-lbl"><span className="score-ring-num">{score}</span></div>
//           </div>
//           <div>
//             <div className="score-overall" style={{ color: colAcc }}>{score}/100</div>
//             <div className="score-sub">{score >= 80 ? "Strong match" : score >= 60 ? "Good match" : "Weak match"}</div>
//           </div>
//         </div>
//         <div className="score-rows">
//           {breakdown.map((b) => (
//             <div key={b.l} className="srow">
//               <span className="srow-lbl">{b.l}</span>
//               <div className="srow-bar"><div className="srow-fill" style={{ width:`${b.v}%`, background: scoreBarColor(b.v) }}/></div>
//               <span className="srow-val">{b.v}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ── Recruitment Timeline ── */}
//       <div className="timeline-card">
//         <div className="tc-hdr">📅 Recruitment Timeline</div>
//         <div className="tl-wrap">
//           {TL_STAGES.map((s) => {
//             const done = reached(s.key);
//             return (
//               <div key={s.key} className="tl-item">
//                 <div className={`tl-dot ${done ? "comp" : "pend"}`}>{s.icon}</div>
//                 <div>
//                   <div className="tl-nm">{s.label}</div>
//                   <div className={`tl-st ${done ? "comp" : "pend"}`}>{done ? "Completed" : "Pending"}</div>
//                   {done && <div className="tl-dt">{fmtDate(candidate.processed_date)}</div>}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* ── Notes & Feedback ── */}
//       {/* <div className="notes-card">
//         <div className="notes-hdr">
//           <span className="notes-title">📝 Notes &amp; Feedback</span>
//           <button className="add-note-btn">+ Add Note</button>
//         </div>
//         <div className="notes-empty">No notes yet</div>
//       </div> */}
      

//       {/* ── Action buttons ── */}
//       <div className="action-row">
//         <button className="btn-dl"><Download size={14}/> Download Resume</button>
//         {primaryBtn}
//       </div>

//       {/* ── Additional info ── */}
//       <div className="addl-card">
//         <div className="addl-row"><span className="addl-key">Job ID</span><span className="addl-val">{candidate.job_id}</span></div>
//         <div className="addl-row"><span className="addl-key">Candidate ID</span><span className="addl-val">{candidate.id}</span></div>
//         <div className="addl-row"><span className="addl-key">Status</span><span className="addl-val">{ds}</span></div>
//         <div className="addl-row"><span className="addl-key">Initial Status</span><span className={`addl-val${isRej ? " rej" : ""}`}>{isRej ? "Rejected" : "Active"}</span></div>
//         {candidate.exam_completed && (
//           <div className="addl-row">
//             <span className="addl-key">Assessment Score</span>
//             <span className="addl-val" style={{ color: (candidate.exam_percentage ?? 0) >= 70 ? "var(--acc)" : "var(--red)" }}>
//               {(candidate.exam_percentage ?? 0).toFixed(0)}%
//             </span>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default React.memo(CandidateDetails);

"use client";

import React from "react";
import { Download, Send, Calendar, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { Candidate } from "@/services/interfaces/CandidateScreening";

/* ── Helpers ── */
function avatarStyle(name: string) {
  const p: [string,string][] = [
    ["#EFF6FF","#2563EB"],["#F0FDF4","#16A34A"],["#FFF7ED","#EA580C"],
    ["#FAF5FF","#7C3AED"],["#FFF1F2","#E11D48"],["#F0FDFA","#0D9488"],
    ["#FFFBEB","#D97706"],["#FDF4FF","#A21CAF"],
  ];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
  const [bg, fg] = p[Math.abs(h) % p.length];
  return { bg, fg };
}

function initials(name: string) {
  return name.split(" ").slice(0,2).map((w) => w[0]).join("").toUpperCase();
}

function fmtDate(str?: string | null) {
  if (!str) return "—";
  try { return new Date(str).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}); }
  catch { return str; }
}

function scoreBarColor(v: number) {
  return v >= 75 ? "var(--acc)" : v >= 60 ? "var(--amber)" : "var(--red)";
}

function getDisplayStatus(c: Candidate): string {
  if (c?.final_status === "Hired")       return "Hired";
  if (c?.interview_scheduled)            return "Interview Scheduled";
  if (c?.exam_completed)                 return (c?.exam_percentage ?? 0) >= 70 ? "Assessment Passed" : "Assessment Failed";
  if (c?.exam_started)                   return "Assessment In Progress";
  if (c?.exam_link_sent)                 return c?.link_expired ? "Assessment Expired" : "Assessment Sent";
  if (c?.status === "Shortlisted")       return "Shortlisted";
  if (c?.status === "Rejected" || c?.final_status === "Rejected After Exam") return "Rejected";
  return "Under Review";
}

function getRejectionPoints(c: Candidate) {
  const score     = c.ats_score ?? 0;
  const breakdown = (c as any).rejection_breakdown as {
    decision?:       string;
    reasons?:        string[];
    missing_skills?: string[];
    matched_skills?: string[];
  } | undefined;

  const pts: { headline: string; fb: string[]; journey: boolean }[] = [];

  if (breakdown?.reasons?.length) {
    const headline = breakdown.decision
      ? `${breakdown.decision} — Score ${score}/100 is below the 70 threshold`
      : `Score ${score}/100 — below the shortlist threshold of 70`;

    const fb: string[] = [...(breakdown.reasons ?? [])];
    if (breakdown.missing_skills?.length) fb.push(`Missing required skills: ${breakdown.missing_skills.join(", ")}`);
    if (breakdown.matched_skills?.length) fb.push(`Matched skills: ${breakdown.matched_skills.join(", ")}`);

    pts.push({ headline, fb, journey: false });
    return pts;
  }

  if (!c.exam_link_sent) {
    pts.push({
      headline: score < 60
        ? `Low ATS score: ${score}/100 — minimum threshold is 60`
        : `ATS score ${score}/100 — below the shortlist cut-off of 70`,
      fb: [
        `Score is ${Math.max(70 - score, 0).toFixed(0)} points below the shortlist threshold of 70`,
        "Resume keywords and experience don't closely match the job description",
        "Profile filtered out at automated screening before manual review",
      ],
      journey: false,
    });
    return pts;
  }

  if (c.link_expired && !c.exam_completed) {
    pts.push({
      headline: "Assessment not completed — invitation link expired",
      fb: [
        "Candidate received the link but did not submit the test",
        "Links have a fixed validity window — once expired they cannot be reused",
        "HR can decide whether to resend or close this application",
      ],
      journey: false,
    });
    return pts;
  }

  if (c.exam_completed && (c.exam_percentage ?? 0) < 70) {
    const exam = c.exam_percentage ?? 0;
    const gap  = (70 - exam).toFixed(0);
    pts.push({
      headline: `Failed assessment: scored ${exam.toFixed(0)}% — required pass mark is 70%`,
      fb: [
        `Achieved ${exam.toFixed(0)}% against the 70% pass mark — ${gap}% below the minimum`,
        exam < 40
          ? "Very low score — significant gaps in core skills required for this role"
          : exam < 55
          ? "Partial understanding but insufficient depth in key areas"
          : `Close to pass mark — ${gap}% short of the required threshold`,
        "Strong ATS resume score but technical skills not demonstrated at the required level",
      ],
      journey: false,
    });
  }

  return pts;
}

function getShortlistReasons(c: Candidate) {
  const score = c.ats_score ?? 0;
  const exam  = c.exam_percentage ?? 0;
  const r: string[] = [];

  // Use AI match data if available
  const matchedSkills = (c as any).matched_skills as string[] | undefined;
  if (matchedSkills?.length) {
    r.push(`Matched required skills: ${matchedSkills.slice(0,4).join(", ")}`);
  } else {
    if (score >= 85) r.push(`Excellent ATS score of ${score}/100 — top 10% of applicants`);
    else if (score >= 70) r.push(`Strong ATS score of ${score}/100 — meets the shortlist threshold`);
    else if (score >= 60) r.push(`Acceptable ATS score of ${score}/100 — manually reviewed and approved`);
  }

  if (c.exam_completed && exam >= 70) r.push(`Passed assessment with ${exam.toFixed(0)}% — above the 70% pass mark`);
  if (c.interview_scheduled) r.push("Interview scheduled — progressed through all screening stages");
  if (c.final_status === "Hired") r.push("Offer accepted — candidate successfully hired");
  if (!r.length) r.push("Met minimum qualification criteria set for this job role");
  return r;
}

const TL_STAGES = [
  { key: "applied",     label: "Application Received", icon: "✓" },
  { key: "screened",    label: "Resume Screened",       icon: "📄" },
  { key: "shortlisted", label: "Shortlisted",           icon: "★" },
  { key: "assessment",  label: "Assessment Sent",       icon: "✉" },
  { key: "interview",   label: "Interview Scheduled",   icon: "🗓" },
  { key: "offer",       label: "Offer Extended",        icon: "✓" },
];

function stageReached(c: Candidate) {
  const ds = getDisplayStatus(c);
  if (ds === "Hired")                              return (k: string) => true;
  if (ds === "Interview Scheduled")                return (k: string) => ["applied","screened","shortlisted","assessment","interview"].includes(k);
  if (["Assessment Passed","Assessment Failed"].includes(ds)) return (k: string) => ["applied","screened","shortlisted","assessment"].includes(k);
  if (["Assessment In Progress","Assessment Sent","Assessment Expired"].includes(ds)) return (k: string) => ["applied","screened","shortlisted"].includes(k);
  if (ds === "Shortlisted")                        return (k: string) => ["applied","screened","shortlisted"].includes(k);
  if (ds === "Rejected")                           return (k: string) => ["applied","screened"].includes(k);
  return (k: string) => ["applied"].includes(k);
}

const STATUS_PILL_CLS: Record<string,string> = {
  "Hired":"pill-hired","Interview Scheduled":"pill-interview","Shortlisted":"pill-shortlisted",
  "Assessment Passed":"pill-assessed","Assessment Failed":"pill-assessed",
  "Assessment Sent":"pill-assessment","Assessment In Progress":"pill-assessment","Assessment Expired":"pill-assessment",
  "Rejected":"pill-rejected","Under Review":"pill-applied",
};
const STATUS_LABEL: Record<string,string> = {
  "Hired":"Hired","Interview Scheduled":"Interview Scheduled","Shortlisted":"Shortlisted",
  "Assessment Passed":"Assessment Done","Assessment Failed":"Assessment Done",
  "Assessment Sent":"Assessment Pending","Assessment In Progress":"Assessment Pending","Assessment Expired":"Assessment Pending",
  "Rejected":"Rejected","Under Review":"Applied",
};

/* ── Match type pill style helper ── */
function matchTypePillStyle(matchType: string) {
  if (matchType === "Strong Fit") return {
    background: "var(--accs)",
    color: "var(--acc)",
    border: "1px solid var(--bd-acc, rgba(0,214,143,.25))",
  };
  if (matchType === "Partial Fit") return {
    background: "rgba(251,191,36,.1)",
    color: "var(--amber)",
    border: "1px solid rgba(251,191,36,.25)",
  };
  return {
    background: "rgba(248,113,113,.1)",
    color: "var(--red)",
    border: "1px solid rgba(248,113,113,.2)",
  };
}

/* ── Recommendation color helper ── */
function recommendationColor(rec: string) {
  if (rec === "Proceed")   return "var(--acc)";
  if (rec === "HR Review") return "var(--amber)";
  return "var(--red)";
}

const DETAIL_CSS = `
@keyframes fup{to{opacity:1;transform:translateY(0);}}
@keyframes pdot{0%,100%{opacity:1;}50%{opacity:.4;}}

.c-hdr{display:flex;align-items:flex-start;gap:16px;margin-bottom:1.5rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .05s forwards;}
.big-av{width:58px;height:58px;border-radius:15px;display:flex;align-items:center;justify-content:center;font-family:var(--serif);font-size:1.1rem;font-weight:700;flex-shrink:0;}
.c-hdr-nm{font-family:var(--serif);font-size:1.7rem;line-height:1.1;margin-bottom:.2rem;color:var(--tx);transition:color .35s;}
.c-hdr-pos{font-size:.8rem;color:var(--tx2);margin-bottom:.4rem;transition:color .35s;}
.c-hdr-meta{display:flex;align-items:center;gap:6px;flex-wrap:wrap;}
.status-pill{display:inline-flex;align-items:center;gap:5px;font-size:.67rem;font-weight:700;padding:.2rem .65rem;border-radius:999px;}
.status-pill.rej{background:rgba(248,113,113,.1);color:var(--red);border:1px solid rgba(248,113,113,.2);}
.status-pill.act{background:var(--accs);color:var(--acc);border:1px solid var(--bd);}
.match-type-pill{display:inline-flex;align-items:center;font-size:.62rem;font-weight:700;padding:.2rem .65rem;border-radius:999px;}
.c-hdr-actions{display:flex;gap:.45rem;flex-wrap:wrap;margin-left:auto;flex-shrink:0;}
.c-hdr-btn{font-family:var(--sans);font-size:.67rem;font-weight:600;padding:.28rem .68rem;border-radius:7px;cursor:pointer;transition:all .18s;border:1px solid var(--card-bd);background:var(--glass2);color:var(--tx2);}
.c-hdr-btn:hover{border-color:var(--acc);color:var(--acc);}
.c-hdr-btn--danger{background:rgba(248,113,113,.1);color:var(--red);border-color:rgba(248,113,113,.2);}
.c-hdr-btn--danger:hover{background:var(--red);color:#fff;border-color:var(--red);}
.c-hdr-btn--success{background:var(--accs);color:var(--acc);border-color:var(--bd);}
.c-hdr-btn--success:hover{background:var(--acc);color:var(--btn-text);}
.c-hdr-btn--blue{background:rgba(96,165,250,.1);color:var(--blue);border-color:rgba(96,165,250,.2);}

.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:1.4rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .1s forwards;}
.ibox{background:var(--card-bg);border:1px solid var(--card-bd);border-radius:12px;padding:.85rem 1rem;backdrop-filter:blur(12px);transition:background .35s,border-color .35s;}
.ilbl{font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--tx3);margin-bottom:.3rem;transition:color .35s;}
.ival{font-size:.8rem;color:var(--tx);font-weight:500;transition:color .35s;}
.ival a{color:var(--acc);text-decoration:none;}
.ival a:hover{text-decoration:underline;}
.ival.empty{color:var(--tx3);}

.short-box{background:var(--short-bg,rgba(0,214,143,.05));border:1px solid var(--short-bd,rgba(0,214,143,.2));border-radius:14px;padding:1.1rem 1.2rem;margin-bottom:1.4rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .12s forwards;transition:all .35s;}
.short-hdr{display:flex;align-items:center;gap:8px;font-size:.82rem;font-weight:700;color:var(--acc);margin-bottom:.65rem;}
.short-reason{display:flex;align-items:flex-start;gap:6px;font-size:.7rem;margin-bottom:.3rem;line-height:1.45;}
[data-cs-theme="dark"] .short-reason{color:#6ee7b7;}
[data-cs-theme="light"] .short-reason{color:#065f46;}
.short-bar-wrap{margin-top:.65rem;}
.short-bar-lbl{display:flex;justify-content:space-between;font-size:.61rem;color:var(--acc);margin-bottom:.25rem;}
.short-bar{height:5px;border-radius:3px;background:var(--glass2);overflow:hidden;}
.short-bar-fill{height:100%;border-radius:3px;transition:width 1.2s cubic-bezier(.4,0,.2,1);}

.rej-box{background:var(--rej-bg);border:1px solid var(--rej-bd);border-radius:14px;padding:1.1rem 1.2rem;margin-bottom:1.4rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .15s forwards;transition:background .35s,border-color .35s;}
.rej-hdr{display:flex;align-items:center;gap:8px;font-size:.82rem;font-weight:700;color:var(--red);margin-bottom:.75rem;}
.rej-main{font-size:.78rem;font-weight:600;color:var(--red);margin-bottom:.55rem;display:flex;align-items:center;gap:7px;}
.rej-journey{font-size:.66rem;color:var(--tx3);font-style:italic;margin-bottom:.45rem;display:flex;align-items:flex-start;gap:5px;}
.rej-point{font-size:.73rem;color:#fca5a5;margin-bottom:.28rem;padding-left:1.1rem;position:relative;}
[data-cs-theme="light"] .rej-point{color:#b91c1c;}
.rej-point::before{content:'•';position:absolute;left:0;color:var(--red);}
.ats-divider{height:1px;background:rgba(248,113,113,.15);margin:.9rem 0 .8rem;}
.ats-row{display:flex;align-items:center;justify-content:space-between;}
.ats-lbl{font-size:.72rem;color:var(--tx3);}
.ats-min{font-size:.65rem;color:var(--amber);margin-top:.2rem;display:flex;align-items:center;gap:5px;}
.ats-val{font-size:.88rem;font-weight:700;color:var(--red);}

.score-card{background:var(--card-bg);border:1px solid var(--card-bd);border-radius:14px;padding:1.2rem;margin-bottom:1.4rem;backdrop-filter:blur(12px);opacity:0;transform:translateY(14px);animation:fup .4s ease .2s forwards;transition:background .35s,border-color .35s;}
.score-card-hdr{font-size:.8rem;font-weight:700;color:var(--tx);margin-bottom:.8rem;transition:color .35s;}
.score-ring-wrap{display:flex;align-items:center;gap:13px;margin-bottom:.8rem;}
.score-ring{position:relative;width:62px;height:62px;flex-shrink:0;}
.score-ring svg{transform:rotate(-90deg);}
.score-ring-lbl{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;}
.score-ring-num{font-family:var(--serif);font-size:.9rem;font-weight:700;color:var(--tx);transition:color .35s;}
.score-overall{font-family:var(--serif);font-size:2.1rem;font-weight:700;line-height:1;}
.score-sub{font-size:.65rem;color:var(--tx3);margin-top:.1rem;transition:color .35s;}
.score-rec{font-size:.63rem;color:var(--tx3);margin-top:.25rem;}
.score-dot{width:9px;height:9px;border-radius:50%;animation:pdot 1.5s infinite;flex-shrink:0;}
.score-rows{display:flex;flex-direction:column;gap:.55rem;}
.srow{display:flex;align-items:center;gap:10px;}
.srow-lbl{font-size:.72rem;color:var(--tx2);width:135px;flex-shrink:0;transition:color .35s;}
.srow-bar{flex:1;height:5px;border-radius:3px;background:var(--glass2);overflow:hidden;transition:background .35s;}
.srow-fill{height:100%;border-radius:3px;transition:width 1.2s cubic-bezier(.4,0,.2,1);}
.srow-val{font-size:.7rem;font-weight:600;color:var(--tx3);width:20px;text-align:right;transition:color .35s;}

.timeline-card{background:var(--card-bg);border:1px solid var(--card-bd);border-radius:14px;padding:1.2rem;margin-bottom:1.4rem;backdrop-filter:blur(12px);opacity:0;transform:translateY(14px);animation:fup .4s ease .25s forwards;transition:background .35s,border-color .35s;}
.tc-hdr{font-size:.8rem;font-weight:700;color:var(--tx);margin-bottom:1.1rem;transition:color .35s;}
.tl-wrap{position:relative;}
.tl-wrap::before{content:'';position:absolute;left:13px;top:10px;bottom:10px;width:1px;background:var(--card-bd);transition:background .35s;}
.tl-item{display:flex;align-items:flex-start;gap:12px;margin-bottom:.85rem;position:relative;}
.tl-item:last-child{margin-bottom:0;}
.tl-dot{width:27px;height:27px;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.7rem;z-index:1;transition:background .35s,border-color .35s;}
.tl-dot.comp{background:var(--tl-done-bg);border:1px solid var(--tl-done-bd);color:var(--tl-done-col);}
.tl-dot.pend{background:var(--tl-pend-bg);border:1px solid var(--tl-pend-bd,var(--card-bd));color:var(--tx3);}
.tl-nm{font-size:.78rem;font-weight:600;color:var(--tx);transition:color .35s;}
.tl-st{font-size:.64rem;font-weight:600;margin-top:.1rem;}
.tl-st.comp{color:var(--acc);}
.tl-st.pend{color:var(--tx3);}
.tl-dt{font-size:.61rem;color:var(--tx3);margin-top:.05rem;transition:color .35s;}

.notes-card{background:var(--card-bg);border:1px solid var(--card-bd);border-radius:14px;padding:1.2rem;margin-bottom:1.4rem;backdrop-filter:blur(12px);opacity:0;transform:translateY(14px);animation:fup .4s ease .3s forwards;transition:background .35s,border-color .35s;}
.notes-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:.9rem;}
.notes-title{font-size:.8rem;font-weight:700;color:var(--tx);transition:color .35s;}
.add-note-btn{font-size:.67rem;font-weight:600;color:var(--acc);background:var(--accs);border:1px solid var(--bd);padding:.22rem .65rem;border-radius:7px;cursor:pointer;font-family:var(--sans);transition:all .2s;}
.add-note-btn:hover{background:var(--acc);color:var(--btn-text);border-color:var(--acc);}
.notes-empty{font-size:.75rem;color:var(--tx3);text-align:center;padding:1rem 0;transition:color .35s;}

.action-row{display:flex;gap:.8rem;margin-bottom:1.4rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .35s forwards;}
.btn-dl{flex:1;background:var(--card-bg);border:1px solid var(--card-bd);color:var(--tx2);font-family:var(--sans);font-size:.78rem;font-weight:600;padding:.65rem;border-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:7px;transition:all .2s;}
.btn-dl:hover{border-color:var(--acc);color:var(--acc);}
.btn-profile{flex:2;background:var(--acc);color:var(--btn-text);font-family:var(--sans);font-size:.78rem;font-weight:700;padding:.65rem;border-radius:10px;cursor:pointer;border:none;display:flex;align-items:center;justify-content:center;gap:7px;transition:all .2s;box-shadow:0 0 20px var(--accg);}
.btn-profile:hover{background:var(--acc3);box-shadow:0 0 32px var(--accg);transform:translateY(-1px);}
.btn-send{flex:2;background:rgba(96,165,250,.1);color:var(--blue);font-family:var(--sans);font-size:.78rem;font-weight:700;padding:.65rem;border-radius:10px;cursor:pointer;border:1px solid rgba(96,165,250,.25);display:flex;align-items:center;justify-content:center;gap:7px;transition:all .2s;}
.btn-send:hover{background:var(--blue);color:#fff;}
.btn-sched{flex:2;background:var(--accs);color:var(--acc);font-family:var(--sans);font-size:.78rem;font-weight:700;padding:.65rem;border-radius:10px;cursor:pointer;border:1px solid var(--bd);display:flex;align-items:center;justify-content:center;gap:7px;transition:all .2s;}
.btn-sched:hover{background:var(--acc);color:var(--btn-text);}

.addl-card{background:var(--card-bg);border:1px solid var(--card-bd);border-radius:14px;overflow:hidden;backdrop-filter:blur(12px);margin-bottom:2rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .4s forwards;transition:background .35s,border-color .35s;}
.addl-row{display:flex;align-items:center;justify-content:space-between;padding:.75rem 1.1rem;border-bottom:1px solid var(--bd);font-size:.78rem;transition:border-color .35s;}
.addl-row:last-child{border-bottom:none;}
.addl-key{color:var(--tx3);transition:color .35s;}
.addl-val{font-weight:600;color:var(--tx);transition:color .35s;}
.addl-val.rej{color:var(--red);}

@media(max-width:900px){.info-grid{grid-template-columns:1fr;}}
`;

interface CandidateDetailsProps {
  candidate: Candidate & {
    displayStatus?: string;
    displayScore?:  number;
    scoreColor?:    string;
    statusInfo?:    { label?: string; cls?: string; priority?: number };
    dept?:          string | null;
  };
  onSendReminder?: (id: string | number) => void;
}

const CandidateDetails: React.FC<CandidateDetailsProps> = ({ candidate, onSendReminder }) => {
  const router = useRouter();
  if (!candidate) return null;

  const av       = avatarStyle(candidate.name ?? "");
  const ini      = initials(candidate.name ?? "?");
  const score    = candidate.ats_score ?? 0;
  const ds       = getDisplayStatus(candidate);
  const matchType    = (candidate as any).match_type as string | undefined;
  const recommendation = (candidate as any).recommendation as string | undefined;

  const pillCls = STATUS_PILL_CLS[ds] ?? "pill-applied";
  const pillLbl = STATUS_LABEL[ds]    ?? "Applied";
  const isRej   = ds === "Rejected";
  const colAcc  = isRej ? "var(--red)" : "var(--acc)";

  /* Ring SVG */
  const radius = 26, circ = 2 * Math.PI * radius;
  const dash   = (score / 100) * circ;
  const ringColor = score >= 80 ? "#059669" : score >= 70 ? "#d97706" : "#dc2626";

  /* ── isFinallyRejected — drives Why Rejected block ── */
  const isFinallyRejected =
    candidate.status === "Rejected"                                      ||
    candidate.status === "Pending Review"                                ||
    candidate.final_status === "Rejected After Exam"                     ||
    (candidate.exam_completed && (candidate.exam_percentage ?? 0) < 70) ||
    (candidate.link_expired && !candidate.exam_completed)                ||
    ((candidate.ats_score ?? 0) > 0 &&
     (candidate.ats_score ?? 0) < 70 &&
     !candidate.exam_link_sent);

  const isShortlisted = !isFinallyRejected && (
    candidate.status === "Shortlisted" ||
    candidate.interview_scheduled      ||
    candidate.final_status === "Hired"
  );

  const breakdown = [
    { l: "Technical Skills", v: Math.min(100, Math.round(score * 1.05)) },
    { l: "Communication",    v: Math.min(100, Math.round(score * 0.92)) },
    { l: "Problem Solving",  v: Math.min(100, Math.round(score * 0.98)) },
    { l: "Cultural Fit",     v: Math.min(100, Math.round(score * 0.88)) },
    { l: "Experience Match", v: Math.min(100, Math.round(score * 1.02)) },
  ];

  const reached = stageReached(candidate);

  const showReject   = candidate.status !== "Rejected" && candidate.final_status !== "Hired";
  const showSchedule = candidate.status !== "Rejected" && candidate.final_status !== "Hired";
  const showSendAsmt = candidate.status === "Shortlisted" && !candidate.exam_link_sent;

  let primaryBtn: React.ReactNode;
  if (candidate.exam_link_sent && !candidate.exam_completed && !candidate.link_expired) {
    primaryBtn = (
      <button className="btn-send" onClick={() => onSendReminder?.(candidate.id)}>
        <Send size={14}/> Send Assessment Reminder
      </button>
    );
  } else if (candidate.exam_completed && (candidate.exam_percentage ?? 0) >= 70 && !candidate.interview_scheduled) {
    primaryBtn = (
      <button className="btn-sched" onClick={() => router.push(`/scheduler?candidate_id=${candidate.id}`)}>
        <Calendar size={14}/> Schedule Interview
      </button>
    );
  } else {
    primaryBtn = (
      <button className="btn-profile" onClick={() => router.push(`/candidates/${candidate.id}`)}>
        <Eye size={14}/> View Full Profile
      </button>
    );
  }

  return (
    <>
      <style>{DETAIL_CSS}</style>

      {/* ── Candidate header ── */}
      <div className="c-hdr">
        <div className="big-av" style={{ background: av.bg, color: av.fg }}>{ini}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="c-hdr-nm">{candidate.name}</div>
          <div className="c-hdr-pos">
            {candidate.job_title
              ? candidate.job_title.charAt(0).toUpperCase() + candidate.job_title.slice(1)
              : "—"}
            {(candidate as any).dept && (candidate as any).dept !== "—"
              ? ` · ${(candidate as any).dept}`
              : ""}
          </div>

          {/* Status + Match Type pills */}
          <div className="c-hdr-meta">
            {isRej
              ? <span className="status-pill rej">⊗ Rejected</span>
              : <span className="status-pill act">
                  <span style={{width:6,height:6,borderRadius:"50%",background:"var(--acc)",animation:"pdot 1.5s infinite",display:"inline-block"}} />
                  {pillLbl}
                </span>
            }

            {/* ── match_type pill — NEW ── */}
            {matchType && (
              <span className="match-type-pill" style={matchTypePillStyle(matchType)}>
                {matchType}
              </span>
            )}
          </div>
        </div>

        <div className="c-hdr-actions">
          {showReject   && <button className="c-hdr-btn c-hdr-btn--danger">Reject</button>}
          {/* {showSchedule && <button className="c-hdr-btn c-hdr-btn--success">Schedule Interview</button>} */}
          {/* REPLACE WITH THIS */}
          {showSchedule && (
            <a
              href="http://localhost:8080/scheduler"
              target="_blank"
              rel="noopener noreferrer"
              className="c-hdr-btn c-hdr-btn--success"
              style={{ textDecoration: "none" }}
            >
              Schedule Interview
            </a>
          )}
          {showSendAsmt && <button className="c-hdr-btn c-hdr-btn--blue">Send Assessment</button>}
        </div>
      </div>

      {/* ── Info grid ── */}
      <div className="info-grid">
        <div className="ibox">
          <div className="ilbl">Email</div>
          <div className="ival"><a href={`mailto:${candidate.email}`}>{candidate.email}</a></div>
        </div>
        <div className="ibox">
          <div className="ilbl">Phone</div>
          <div className={`ival${!candidate.phone ? " empty" : ""}`}>{candidate.phone || "—"}</div>
        </div>
        <div className="ibox">
          <div className="ilbl">Applied</div>
          <div className="ival">{fmtDate(candidate.processed_date)}</div>
        </div>
        <div className="ibox">
          <div className="ilbl">Department</div>
          <div className={`ival${!(candidate as any).dept ? " empty" : ""}`}>
            {(candidate as any).dept || "—"}
          </div>
        </div>
      </div>

      {/* ── Why Shortlisted ── */}
      {isShortlisted && (
        <div className="short-box">
          <div className="short-hdr">👍 Why Shortlisted</div>
          {getShortlistReasons(candidate).map((r, i) => (
            <div key={i} className="short-reason">✓ {r}</div>
          ))}
          <div className="short-bar-wrap">
            <div className="short-bar-lbl"><span>ATS Score</span><span>{score} / 100</span></div>
            <div className="short-bar">
              <div className="short-bar-fill" style={{ width: `${Math.min(score,100)}%`, background: "var(--acc)" }} />
            </div>
          </div>
        </div>
      )}

      {/* ── Why Rejected ── */}
      {isFinallyRejected && (
        <div className="rej-box">
          <div className="rej-hdr">⚠️ Why Rejected</div>
          {getRejectionPoints(candidate).map((pt, i) =>
            pt.journey ? (
              <div key={i} className="rej-journey">ℹ {pt.headline}</div>
            ) : (
              <div key={i}>
                <div className="rej-main">⊗ {pt.headline}</div>
                {pt.fb.map((f, j) => <div key={j} className="rej-point">{f}</div>)}
              </div>
            )
          )}
          <div className="ats-divider" />
          <div className="ats-row">
            <div>
              <div className="ats-lbl">ATS Score</div>
              <div className="ats-min">⚠ Minimum required score: 70 / 100</div>
            </div>
            <div className="ats-val">{score} / 100</div>
          </div>
        </div>
      )}

      {/* ── AI Match Score ── */}
      <div className="score-card">
        <div className="score-card-hdr">🎯 AI Match Score</div>
        <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:".7rem" }}>
          <div className="score-dot" style={{ background: colAcc }} />
          <span style={{ fontSize:".7rem", color:"var(--tx3)" }}>Overall match score</span>
        </div>
        <div className="score-ring-wrap">
          <div className="score-ring">
            <svg width="62" height="62" viewBox="0 0 62 62">
              <circle cx="31" cy="31" r={radius} fill="none" stroke="var(--glass2)" strokeWidth="6"/>
              <circle cx="31" cy="31" r={radius} fill="none" stroke={ringColor} strokeWidth="6"
                strokeDasharray={`${dash.toFixed(1)} ${circ.toFixed(1)}`} strokeLinecap="round"/>
            </svg>
            <div className="score-ring-lbl">
              <span className="score-ring-num">{score}</span>
            </div>
          </div>
          <div>
            <div className="score-overall" style={{ color: colAcc }}>{score}/100</div>

            {/* Match quality label */}
            <div className="score-sub">
              {score >= 80 ? "Strong match" : score >= 60 ? "Good match" : "Weak match"}
            </div>

            {/* ── AI Recommendation — NEW ── */}
            {recommendation && (
              <div className="score-rec">
                AI Recommendation:{" "}
                <span style={{ fontWeight: 700, color: recommendationColor(recommendation) }}>
                  {recommendation}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="score-rows">
          {breakdown.map((b) => (
            <div key={b.l} className="srow">
              <span className="srow-lbl">{b.l}</span>
              <div className="srow-bar">
                <div className="srow-fill" style={{ width:`${b.v}%`, background: scoreBarColor(b.v) }}/>
              </div>
              <span className="srow-val">{b.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Recruitment Timeline ── */}
      <div className="timeline-card">
        <div className="tc-hdr">📅 Recruitment Timeline</div>
        <div className="tl-wrap">
          {TL_STAGES.map((s) => {
            const done = reached(s.key);
            return (
              <div key={s.key} className="tl-item">
                <div className={`tl-dot ${done ? "comp" : "pend"}`}>{s.icon}</div>
                <div>
                  <div className="tl-nm">{s.label}</div>
                  <div className={`tl-st ${done ? "comp" : "pend"}`}>{done ? "Completed" : "Pending"}</div>
                  {done && <div className="tl-dt">{fmtDate(candidate.processed_date)}</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Notes & Feedback — HR notes only, no AI duplication ── */}
      {/* <div className="notes-card">
        <div className="notes-hdr">
          <span className="notes-title">📝 Notes &amp; Feedback</span>
          <button className="add-note-btn">+ Add Note</button>
        </div>
        <div className="notes-empty">No notes yet</div>
      </div> */}

      {/* ── Action buttons ── */}
      <div className="action-row">
        <button className="btn-dl"><Download size={14}/> Download Resume</button>
        {primaryBtn}
      </div>

      {/* ── Additional info ── */}
      <div className="addl-card">
        <div className="addl-row">
          <span className="addl-key">Job ID</span>
          <span className="addl-val">{candidate.job_id}</span>
        </div>
        <div className="addl-row">
          <span className="addl-key">Candidate ID</span>
          <span className="addl-val">{candidate.id}</span>
        </div>
        <div className="addl-row">
          <span className="addl-key">Status</span>
          <span className="addl-val">{ds}</span>
        </div>
        <div className="addl-row">
          <span className="addl-key">Match Type</span>
          <span className="addl-val" style={{
            color: matchType === "Strong Fit"
              ? "var(--acc)" : matchType === "Partial Fit"
              ? "var(--amber)" : matchType === "Weak Fit"
              ? "var(--red)" : "var(--tx)"
          }}>
            {matchType || "—"}
          </span>
        </div>
        <div className="addl-row">
          <span className="addl-key">AI Recommendation</span>
          <span className="addl-val" style={{
            color: recommendation ? recommendationColor(recommendation) : "var(--tx)"
          }}>
            {recommendation || "—"}
          </span>
        </div>
        <div className="addl-row">
          <span className="addl-key">Initial Status</span>
          <span className={`addl-val${isRej ? " rej" : ""}`}>{isRej ? "Rejected" : "Active"}</span>
        </div>
        {candidate.exam_completed && (
          <div className="addl-row">
            <span className="addl-key">Assessment Score</span>
            <span className="addl-val" style={{
              color: (candidate.exam_percentage ?? 0) >= 70 ? "var(--acc)" : "var(--red)"
            }}>
              {(candidate.exam_percentage ?? 0).toFixed(0)}%
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default React.memo(CandidateDetails);