// // // "use client";

// // // import React from "react";
// // // import { Download, Send, Calendar, Eye } from "lucide-react";
// // // import { useRouter } from "next/navigation";
// // // import { Candidate } from "@/services/interfaces/CandidateScreening";

// // // /* ── Helpers ── */
// // // function avatarStyle(name: string) {
// // //   const p: [string,string][] = [
// // //     ["#EFF6FF","#2563EB"],["#F0FDF4","#16A34A"],["#FFF7ED","#EA580C"],
// // //     ["#FAF5FF","#7C3AED"],["#FFF1F2","#E11D48"],["#F0FDFA","#0D9488"],
// // //     ["#FFFBEB","#D97706"],["#FDF4FF","#A21CAF"],
// // //   ];
// // //   let h = 0;
// // //   for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
// // //   const [bg, fg] = p[Math.abs(h) % p.length];
// // //   return { bg, fg };
// // // }
// // // function initials(name: string) {
// // //   return name.split(" ").slice(0,2).map((w) => w[0]).join("").toUpperCase();
// // // }
// // // function fmtDate(str?: string | null) {
// // //   if (!str) return "—";
// // //   try { return new Date(str).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}); }
// // //   catch { return str; }
// // // }
// // // function scoreBarColor(v: number) {
// // //   return v >= 75 ? "var(--acc)" : v >= 60 ? "var(--amber)" : "var(--red)";
// // // }
// // // function getDisplayStatus(c: Candidate): string {
// // //   if (c?.final_status === "Hired")       return "Hired";
// // //   if (c?.interview_scheduled)            return "Interview Scheduled";
// // //   if (c?.exam_completed)                 return (c?.exam_percentage ?? 0) >= 70 ? "Assessment Passed" : "Assessment Failed";
// // //   if (c?.exam_started)                   return "Assessment In Progress";
// // //   if (c?.exam_link_sent)                 return c?.link_expired ? "Assessment Expired" : "Assessment Sent";
// // //   if (c?.status === "Shortlisted")       return "Shortlisted";
// // //   if (c?.status === "Rejected" || c?.final_status === "Rejected After Exam") return "Rejected";
// // //   return "Under Review";
// // // }

// // // function getRejectionPoints(c: Candidate) {
// // //   const score = c.ats_score ?? 0, exam = c.exam_percentage ?? 0;
// // //   const pts: { headline: string; fb: string[]; journey: boolean }[] = [];
// // //   if (!c.exam_link_sent) {
// // //     pts.push({ headline: score < 60 ? `Low ATS score: ${score}/100 — minimum threshold is 60` : `ATS score ${score}/100 — below the shortlist cut-off of 70`, fb: [`Score is ${Math.max(70-score,0).toFixed(0)} points below the shortlist threshold of 70`,"Resume keywords and experience don't closely match the job description","Profile filtered out at automated screening before manual review"], journey: false });
// // //     return pts;
// // //   }
// // //   if (score >= 70) pts.push({ headline: `Initially shortlisted — ATS score ${score}/100 met the threshold`, fb: [], journey: true });
// // //   else if (score >= 60) pts.push({ headline: `Initially reviewed — ATS score ${score}/100 passed minimum screening`, fb: [], journey: true });
// // //   if (c.link_expired && !c.exam_completed) {
// // //     pts.push({ headline: "Assessment not completed — invitation link expired", fb: ["Candidate received the link but did not submit the test","Links have a fixed validity window — once expired they cannot be reused","HR can decide whether to resend or close this application"], journey: false });
// // //     return pts;
// // //   }
// // //   if (c.exam_completed && exam < 70) {
// // //     const gap = (70 - exam).toFixed(0);
// // //     const sev = exam < 40 ? "Very low score — significant gaps in core skills required for this role" : exam < 55 ? "Partial understanding but insufficient depth in key areas" : `Close to pass mark — ${gap}% short of the required threshold`;
// // //     pts.push({ headline: `Failed assessment: scored ${exam.toFixed(0)}% — required pass mark is 70%`, fb: [`Achieved ${exam.toFixed(0)}% against the 70% pass mark — ${gap}% below the minimum`, sev,"Strong ATS resume score but technical skills not demonstrated at the required level"], journey: false });
// // //   }
// // //   if (c.final_status === "Rejected After Exam") {
// // //     pts.push({ headline: "Did not meet post-assessment criteria for the next stage", fb: ["Overall evaluation after assessment did not clear the bar for this role","Skills, experience, and assessment result considered holistically","HR review determined candidate is not a strong enough fit at this stage"], journey: false });
// // //   }
// // //   return pts;
// // // }

// // // function getShortlistReasons(c: Candidate) {
// // //   const score = c.ats_score ?? 0, exam = c.exam_percentage ?? 0;
// // //   const r: string[] = [];
// // //   if (score >= 85) r.push(`Excellent ATS score of ${score}/100 — top 10% of applicants`);
// // //   else if (score >= 70) r.push(`Strong ATS score of ${score}/100 — meets the shortlist threshold`);
// // //   else if (score >= 60) r.push(`Acceptable ATS score of ${score}/100 — manually reviewed and approved`);
// // //   if (c.exam_completed && exam >= 70) r.push(`Passed assessment with ${exam.toFixed(0)}% — above the 70% pass mark`);
// // //   if (c.interview_scheduled) r.push("Interview scheduled — progressed through all screening stages");
// // //   if (c.final_status === "Hired") r.push("Offer accepted — candidate successfully hired");
// // //   if (!r.length) r.push("Met minimum qualification criteria set for this job role");
// // //   return r;
// // // }

// // // const TL_STAGES = [
// // //   { key: "applied",     label: "Application Received", icon: "✓" },
// // //   { key: "screened",    label: "Resume Screened",       icon: "📄" },
// // //   { key: "shortlisted", label: "Shortlisted",           icon: "★" },
// // //   { key: "assessment",  label: "Assessment Sent",       icon: "✉" },
// // //   { key: "interview",   label: "Interview Scheduled",   icon: "🗓" },
// // //   { key: "offer",       label: "Offer Extended",        icon: "✓" },
// // // ];

// // // function stageReached(c: Candidate) {
// // //   const ds = getDisplayStatus(c);
// // //   if (ds === "Hired")                              return (k: string) => true;
// // //   if (ds === "Interview Scheduled")                return (k: string) => ["applied","screened","shortlisted","assessment","interview"].includes(k);
// // //   if (["Assessment Passed","Assessment Failed"].includes(ds)) return (k: string) => ["applied","screened","shortlisted","assessment"].includes(k);
// // //   if (["Assessment In Progress","Assessment Sent","Assessment Expired"].includes(ds)) return (k: string) => ["applied","screened","shortlisted"].includes(k);
// // //   if (ds === "Shortlisted")                        return (k: string) => ["applied","screened","shortlisted"].includes(k);
// // //   if (ds === "Rejected")                           return (k: string) => ["applied","screened"].includes(k);
// // //   return (k: string) => ["applied"].includes(k);
// // // }

// // // const STATUS_PILL_CLS: Record<string,string> = {
// // //   "Hired":"pill-hired","Interview Scheduled":"pill-interview","Shortlisted":"pill-shortlisted",
// // //   "Assessment Passed":"pill-assessed","Assessment Failed":"pill-assessed",
// // //   "Assessment Sent":"pill-assessment","Assessment In Progress":"pill-assessment","Assessment Expired":"pill-assessment",
// // //   "Rejected":"pill-rejected","Under Review":"pill-applied",
// // // };
// // // const STATUS_LABEL: Record<string,string> = {
// // //   "Hired":"Hired","Interview Scheduled":"Interview Scheduled","Shortlisted":"Shortlisted",
// // //   "Assessment Passed":"Assessment Done","Assessment Failed":"Assessment Done",
// // //   "Assessment Sent":"Assessment Pending","Assessment In Progress":"Assessment Pending","Assessment Expired":"Assessment Pending",
// // //   "Rejected":"Rejected","Under Review":"Applied",
// // // };

// // // /* ── CSS — exactly mirrors HTML .c-hdr, .info-grid, .rej-box, .score-card, etc. ── */
// // // const DETAIL_CSS = `
// // // @keyframes fup{to{opacity:1;transform:translateY(0);}}
// // // @keyframes pdot{0%,100%{opacity:1;}50%{opacity:.4;}}

// // // /* ── Candidate header ── */
// // // .c-hdr{display:flex;align-items:flex-start;gap:16px;margin-bottom:1.5rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .05s forwards;}
// // // .big-av{width:58px;height:58px;border-radius:15px;display:flex;align-items:center;justify-content:center;font-family:var(--serif);font-size:1.1rem;font-weight:700;flex-shrink:0;}
// // // .c-hdr-nm{font-family:var(--serif);font-size:1.7rem;line-height:1.1;margin-bottom:.2rem;color:var(--tx);transition:color .35s;}
// // // .c-hdr-pos{font-size:.8rem;color:var(--tx2);margin-bottom:.4rem;transition:color .35s;}
// // // .c-hdr-meta{display:flex;align-items:center;gap:6px;flex-wrap:wrap;}
// // // .status-pill{display:inline-flex;align-items:center;gap:5px;font-size:.67rem;font-weight:700;padding:.2rem .65rem;border-radius:999px;}
// // // .status-pill.rej{background:rgba(248,113,113,.1);color:var(--red);border:1px solid rgba(248,113,113,.2);}
// // // .status-pill.act{background:var(--accs);color:var(--acc);border:1px solid var(--bd);}
// // // .c-hdr-actions{display:flex;gap:.45rem;flex-wrap:wrap;margin-left:auto;flex-shrink:0;}
// // // .c-hdr-btn{font-family:var(--sans);font-size:.67rem;font-weight:600;padding:.28rem .68rem;border-radius:7px;cursor:pointer;transition:all .18s;border:1px solid var(--card-bd);background:var(--glass2);color:var(--tx2);}
// // // .c-hdr-btn:hover{border-color:var(--acc);color:var(--acc);}
// // // .c-hdr-btn--danger{background:rgba(248,113,113,.1);color:var(--red);border-color:rgba(248,113,113,.2);}
// // // .c-hdr-btn--danger:hover{background:var(--red);color:#fff;border-color:var(--red);}
// // // .c-hdr-btn--success{background:var(--accs);color:var(--acc);border-color:var(--bd);}
// // // .c-hdr-btn--success:hover{background:var(--acc);color:var(--btn-text);}
// // // .c-hdr-btn--blue{background:rgba(96,165,250,.1);color:var(--blue);border-color:rgba(96,165,250,.2);}

// // // /* ── Info grid ── */
// // // .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:1.4rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .1s forwards;}
// // // .ibox{background:var(--card-bg);border:1px solid var(--card-bd);border-radius:12px;padding:.85rem 1rem;backdrop-filter:blur(12px);transition:background .35s,border-color .35s;}
// // // .ilbl{font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--tx3);margin-bottom:.3rem;transition:color .35s;}
// // // .ival{font-size:.8rem;color:var(--tx);font-weight:500;transition:color .35s;}
// // // .ival a{color:var(--acc);text-decoration:none;}
// // // .ival a:hover{text-decoration:underline;}
// // // .ival.empty{color:var(--tx3);}

// // // /* ── Shortlisted box ── */
// // // .short-box{background:var(--short-bg,rgba(0,214,143,.05));border:1px solid var(--short-bd,rgba(0,214,143,.2));border-radius:14px;padding:1.1rem 1.2rem;margin-bottom:1.4rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .12s forwards;transition:all .35s;}
// // // .short-hdr{display:flex;align-items:center;gap:8px;font-size:.82rem;font-weight:700;color:var(--acc);margin-bottom:.65rem;}
// // // .short-reason{display:flex;align-items:flex-start;gap:6px;font-size:.7rem;margin-bottom:.3rem;line-height:1.45;}
// // // [data-cs-theme="dark"] .short-reason{color:#6ee7b7;}
// // // [data-cs-theme="light"] .short-reason{color:#065f46;}
// // // .short-bar-wrap{margin-top:.65rem;}
// // // .short-bar-lbl{display:flex;justify-content:space-between;font-size:.61rem;color:var(--acc);margin-bottom:.25rem;}
// // // .short-bar{height:5px;border-radius:3px;background:var(--glass2);overflow:hidden;}
// // // .short-bar-fill{height:100%;border-radius:3px;transition:width 1.2s cubic-bezier(.4,0,.2,1);}

// // // /* ── Rejected box ── */
// // // .rej-box{background:var(--rej-bg);border:1px solid var(--rej-bd);border-radius:14px;padding:1.1rem 1.2rem;margin-bottom:1.4rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .15s forwards;transition:background .35s,border-color .35s;}
// // // .rej-hdr{display:flex;align-items:center;gap:8px;font-size:.82rem;font-weight:700;color:var(--red);margin-bottom:.75rem;}
// // // .rej-main{font-size:.78rem;font-weight:600;color:var(--red);margin-bottom:.55rem;display:flex;align-items:center;gap:7px;}
// // // .rej-journey{font-size:.66rem;color:var(--tx3);font-style:italic;margin-bottom:.45rem;display:flex;align-items:flex-start;gap:5px;}
// // // .rej-point{font-size:.73rem;color:#fca5a5;margin-bottom:.28rem;padding-left:1.1rem;position:relative;}
// // // [data-cs-theme="light"] .rej-point{color:#b91c1c;}
// // // .rej-point::before{content:'•';position:absolute;left:0;color:var(--red);}
// // // .ats-divider{height:1px;background:rgba(248,113,113,.15);margin:.9rem 0 .8rem;}
// // // .ats-row{display:flex;align-items:center;justify-content:space-between;}
// // // .ats-lbl{font-size:.72rem;color:var(--tx3);}
// // // .ats-min{font-size:.65rem;color:var(--amber);margin-top:.2rem;display:flex;align-items:center;gap:5px;}
// // // .ats-val{font-size:.88rem;font-weight:700;color:var(--red);}

// // // /* ── Score card ── */
// // // .score-card{background:var(--card-bg);border:1px solid var(--card-bd);border-radius:14px;padding:1.2rem;margin-bottom:1.4rem;backdrop-filter:blur(12px);opacity:0;transform:translateY(14px);animation:fup .4s ease .2s forwards;transition:background .35s,border-color .35s;}
// // // .score-card-hdr{font-size:.8rem;font-weight:700;color:var(--tx);margin-bottom:.8rem;transition:color .35s;}
// // // .score-ring-wrap{display:flex;align-items:center;gap:13px;margin-bottom:.8rem;}
// // // .score-ring{position:relative;width:62px;height:62px;flex-shrink:0;}
// // // .score-ring svg{transform:rotate(-90deg);}
// // // .score-ring-lbl{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;}
// // // .score-ring-num{font-family:var(--serif);font-size:.9rem;font-weight:700;color:var(--tx);transition:color .35s;}
// // // .score-overall{font-family:var(--serif);font-size:2.1rem;font-weight:700;line-height:1;}
// // // .score-sub{font-size:.65rem;color:var(--tx3);margin-top:.1rem;transition:color .35s;}
// // // .score-dot{width:9px;height:9px;border-radius:50%;animation:pdot 1.5s infinite;flex-shrink:0;}
// // // .score-rows{display:flex;flex-direction:column;gap:.55rem;}
// // // .srow{display:flex;align-items:center;gap:10px;}
// // // .srow-lbl{font-size:.72rem;color:var(--tx2);width:135px;flex-shrink:0;transition:color .35s;}
// // // .srow-bar{flex:1;height:5px;border-radius:3px;background:var(--glass2);overflow:hidden;transition:background .35s;}
// // // .srow-fill{height:100%;border-radius:3px;transition:width 1.2s cubic-bezier(.4,0,.2,1);}
// // // .srow-val{font-size:.7rem;font-weight:600;color:var(--tx3);width:20px;text-align:right;transition:color .35s;}

// // // /* ── Timeline card ── */
// // // .timeline-card{background:var(--card-bg);border:1px solid var(--card-bd);border-radius:14px;padding:1.2rem;margin-bottom:1.4rem;backdrop-filter:blur(12px);opacity:0;transform:translateY(14px);animation:fup .4s ease .25s forwards;transition:background .35s,border-color .35s;}
// // // .tc-hdr{font-size:.8rem;font-weight:700;color:var(--tx);margin-bottom:1.1rem;transition:color .35s;}
// // // .tl-wrap{position:relative;}
// // // .tl-wrap::before{content:'';position:absolute;left:13px;top:10px;bottom:10px;width:1px;background:var(--card-bd);transition:background .35s;}
// // // .tl-item{display:flex;align-items:flex-start;gap:12px;margin-bottom:.85rem;position:relative;}
// // // .tl-item:last-child{margin-bottom:0;}
// // // .tl-dot{width:27px;height:27px;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.7rem;z-index:1;transition:background .35s,border-color .35s;}
// // // .tl-dot.comp{background:var(--tl-done-bg);border:1px solid var(--tl-done-bd);color:var(--tl-done-col);}
// // // .tl-dot.pend{background:var(--tl-pend-bg);border:1px solid var(--tl-pend-bd,var(--card-bd));color:var(--tx3);}
// // // .tl-nm{font-size:.78rem;font-weight:600;color:var(--tx);transition:color .35s;}
// // // .tl-st{font-size:.64rem;font-weight:600;margin-top:.1rem;}
// // // .tl-st.comp{color:var(--acc);}
// // // .tl-st.pend{color:var(--tx3);}
// // // .tl-dt{font-size:.61rem;color:var(--tx3);margin-top:.05rem;transition:color .35s;}

// // // /* ── Notes card ── */
// // // .notes-card{background:var(--card-bg);border:1px solid var(--card-bd);border-radius:14px;padding:1.2rem;margin-bottom:1.4rem;backdrop-filter:blur(12px);opacity:0;transform:translateY(14px);animation:fup .4s ease .3s forwards;transition:background .35s,border-color .35s;}
// // // .notes-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:.9rem;}
// // // .notes-title{font-size:.8rem;font-weight:700;color:var(--tx);transition:color .35s;}
// // // .add-note-btn{font-size:.67rem;font-weight:600;color:var(--acc);background:var(--accs);border:1px solid var(--bd);padding:.22rem .65rem;border-radius:7px;cursor:pointer;font-family:var(--sans);transition:all .2s;}
// // // .add-note-btn:hover{background:var(--acc);color:var(--btn-text);border-color:var(--acc);}
// // // .notes-empty{font-size:.75rem;color:var(--tx3);text-align:center;padding:1rem 0;transition:color .35s;}

// // // /* ── Action row ── */
// // // .action-row{display:flex;gap:.8rem;margin-bottom:1.4rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .35s forwards;}
// // // .btn-dl{flex:1;background:var(--card-bg);border:1px solid var(--card-bd);color:var(--tx2);font-family:var(--sans);font-size:.78rem;font-weight:600;padding:.65rem;border-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:7px;transition:all .2s;}
// // // .btn-dl:hover{border-color:var(--acc);color:var(--acc);}
// // // .btn-profile{flex:2;background:var(--acc);color:var(--btn-text);font-family:var(--sans);font-size:.78rem;font-weight:700;padding:.65rem;border-radius:10px;cursor:pointer;border:none;display:flex;align-items:center;justify-content:center;gap:7px;transition:all .2s;box-shadow:0 0 20px var(--accg);}
// // // .btn-profile:hover{background:var(--acc3);box-shadow:0 0 32px var(--accg);transform:translateY(-1px);}
// // // .btn-send{flex:2;background:rgba(96,165,250,.1);color:var(--blue);font-family:var(--sans);font-size:.78rem;font-weight:700;padding:.65rem;border-radius:10px;cursor:pointer;border:1px solid rgba(96,165,250,.25);display:flex;align-items:center;justify-content:center;gap:7px;transition:all .2s;}
// // // .btn-send:hover{background:var(--blue);color:#fff;}
// // // .btn-sched{flex:2;background:var(--accs);color:var(--acc);font-family:var(--sans);font-size:.78rem;font-weight:700;padding:.65rem;border-radius:10px;cursor:pointer;border:1px solid var(--bd);display:flex;align-items:center;justify-content:center;gap:7px;transition:all .2s;}
// // // .btn-sched:hover{background:var(--acc);color:var(--btn-text);}

// // // /* ── Additional card ── */
// // // .addl-card{background:var(--card-bg);border:1px solid var(--card-bd);border-radius:14px;overflow:hidden;backdrop-filter:blur(12px);margin-bottom:2rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .4s forwards;transition:background .35s,border-color .35s;}
// // // .addl-row{display:flex;align-items:center;justify-content:space-between;padding:.75rem 1.1rem;border-bottom:1px solid var(--bd);font-size:.78rem;transition:border-color .35s;}
// // // .addl-row:last-child{border-bottom:none;}
// // // .addl-key{color:var(--tx3);transition:color .35s;}
// // // .addl-val{font-weight:600;color:var(--tx);transition:color .35s;}
// // // .addl-val.rej{color:var(--red);}

// // // @media(max-width:900px){.info-grid{grid-template-columns:1fr;}}
// // // `;

// // // interface CandidateDetailsProps {
// // //   candidate: Candidate & {
// // //     displayStatus?: string;
// // //     displayScore?:  number;
// // //     scoreColor?:    string;
// // //     statusInfo?:    { label?: string; cls?: string; priority?: number };
// // //     dept?:          string | null;
// // //   };
// // //   onSendReminder?: (id: string | number) => void;
// // // }

// // // const CandidateDetails: React.FC<CandidateDetailsProps> = ({ candidate, onSendReminder }) => {
// // //   const router = useRouter();
// // //   if (!candidate) return null;

// // //   const av    = avatarStyle(candidate.name ?? "");
// // //   const ini   = initials(candidate.name ?? "?");
// // //   const score = candidate.ats_score ?? 0;
// // //   const ds    = getDisplayStatus(candidate);

// // //   const pillCls = STATUS_PILL_CLS[ds] ?? "pill-applied";
// // //   const pillLbl = STATUS_LABEL[ds]    ?? "Applied";
// // //   const isRej   = ds === "Rejected";
// // //   const colAcc  = isRej ? "var(--red)" : "var(--acc)";

// // //   /* Ring SVG */
// // //   const radius = 26, circ = 2 * Math.PI * radius;
// // //   const dash   = (score / 100) * circ;
// // //   const ringColor = score >= 80 ? "#059669" : score >= 70 ? "#d97706" : "#dc2626";

// // //   /* Status flags — isFinallyRejected always wins */
// // //   const isFinallyRejected =
// // //     candidate.status === "Rejected" ||
// // //     candidate.final_status === "Rejected After Exam" ||
// // //     (candidate.exam_completed && (candidate.exam_percentage ?? 0) < 70) ||
// // //     (candidate.link_expired && !candidate.exam_completed);

// // //   const isShortlisted = !isFinallyRejected && (
// // //     candidate.status === "Shortlisted" ||
// // //     candidate.interview_scheduled ||
// // //     candidate.final_status === "Hired"
// // //   );

// // //   const breakdown = [
// // //     { l: "Technical Skills", v: Math.min(100, Math.round(score * 1.05)) },
// // //     { l: "Communication",    v: Math.min(100, Math.round(score * 0.92)) },
// // //     { l: "Problem Solving",  v: Math.min(100, Math.round(score * 0.98)) },
// // //     { l: "Cultural Fit",     v: Math.min(100, Math.round(score * 0.88)) },
// // //     { l: "Experience Match", v: Math.min(100, Math.round(score * 1.02)) },
// // //   ];

// // //   const reached = stageReached(candidate);

// // //   const showReject   = candidate.status !== "Rejected" && candidate.final_status !== "Hired";
// // //   const showSchedule = candidate.status !== "Rejected" && candidate.final_status !== "Hired";
// // //   const showSendAsmt = candidate.status === "Shortlisted" && !candidate.exam_link_sent;

// // //   let primaryBtn: React.ReactNode;
// // //   if (candidate.exam_link_sent && !candidate.exam_completed && !candidate.link_expired) {
// // //     primaryBtn = <button className="btn-send" onClick={() => onSendReminder?.(candidate.id)}><Send size={14}/> Send Assessment Reminder</button>;
// // //   } else if (candidate.exam_completed && (candidate.exam_percentage ?? 0) >= 70 && !candidate.interview_scheduled) {
// // //     primaryBtn = <button className="btn-sched" onClick={() => router.push(`/scheduler?candidate_id=${candidate.id}`)}><Calendar size={14}/> Schedule Interview</button>;
// // //   } else {
// // //     primaryBtn = <button className="btn-profile" onClick={() => router.push(`/candidates/${candidate.id}`)}><Eye size={14}/> View Full Profile</button>;
// // //   }

// // //   return (
// // //     <>
// // //       <style>{DETAIL_CSS}</style>

// // //       {/* ── Candidate header ── */}
// // //       <div className="c-hdr">
// // //         <div className="big-av" style={{ background: av.bg, color: av.fg }}>{ini}</div>
// // //         <div style={{ flex: 1, minWidth: 0 }}>
// // //           <div className="c-hdr-nm">{candidate.name}</div>
// // //           <div className="c-hdr-pos">{candidate.job_title} · {(candidate as any).dept || "—"}</div>
// // //           <div className="c-hdr-meta">
// // //             {isRej
// // //               ? <span className="status-pill rej">⊗ Rejected</span>
// // //               : <span className="status-pill act"><span style={{width:6,height:6,borderRadius:"50%",background:"var(--acc)",animation:"pdot 1.5s infinite",display:"inline-block"}} /> {pillLbl}</span>
// // //             }
// // //             <span className={`cs-pill ${pillCls}`}>{pillLbl}</span>
// // //           </div>
// // //         </div>
// // //         <div className="c-hdr-actions">
// // //           {showReject   && <button className="c-hdr-btn c-hdr-btn--danger">Reject</button>}
// // //           {showSchedule && <button className="c-hdr-btn c-hdr-btn--success">Schedule Interview</button>}
// // //           {showSendAsmt && <button className="c-hdr-btn c-hdr-btn--blue">Send Assessment</button>}
// // //         </div>
// // //       </div>

// // //       {/* ── Info grid ── */}
// // //       <div className="info-grid">
// // //         <div className="ibox"><div className="ilbl">Email</div><div className="ival"><a href={`mailto:${candidate.email}`}>{candidate.email}</a></div></div>
// // //         <div className="ibox"><div className="ilbl">Phone</div><div className={`ival${!candidate.phone ? " empty" : ""}`}>{candidate.phone || "—"}</div></div>
// // //         <div className="ibox"><div className="ilbl">Applied</div><div className="ival">{fmtDate(candidate.processed_date)}</div></div>
// // //         <div className="ibox"><div className="ilbl">Department</div><div className={`ival${!(candidate as any).dept ? " empty" : ""}`}>{(candidate as any).dept || "—"}</div></div>
// // //       </div>

// // //       {/* ── Why Shortlisted ── */}
// // //       {isShortlisted && (
// // //         <div className="short-box">
// // //           <div className="short-hdr">👍 Why Shortlisted</div>
// // //           {getShortlistReasons(candidate).map((r, i) => (
// // //             <div key={i} className="short-reason">✓ {r}</div>
// // //           ))}
// // //           <div className="short-bar-wrap">
// // //             <div className="short-bar-lbl"><span>ATS Score</span><span>{score} / 100</span></div>
// // //             <div className="short-bar"><div className="short-bar-fill" style={{ width: `${Math.min(score,100)}%`, background: "var(--acc)" }} /></div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* ── Why Rejected ── */}
// // //       {isFinallyRejected && (
// // //         <div className="rej-box">
// // //           <div className="rej-hdr">⚠️ Why Rejected</div>
// // //           {getRejectionPoints(candidate).map((pt, i) =>
// // //             pt.journey ? (
// // //               <div key={i} className="rej-journey">ℹ {pt.headline}</div>
// // //             ) : (
// // //               <div key={i}>
// // //                 <div className="rej-main">⊗ {pt.headline}</div>
// // //                 {pt.fb.map((f, j) => <div key={j} className="rej-point">{f}</div>)}
// // //               </div>
// // //             )
// // //           )}
// // //           <div className="ats-divider" />
// // //           <div className="ats-row">
// // //             <div>
// // //               <div className="ats-lbl">ATS Score</div>
// // //               <div className="ats-min">⚠ Minimum required score: 70 / 100</div>
// // //             </div>
// // //             <div className="ats-val">{score} / 100</div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* ── AI Match Score ── */}
// // //       <div className="score-card">
// // //         <div className="score-card-hdr">🎯 AI Match Score</div>
// // //         <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:".7rem" }}>
// // //           <div className="score-dot" style={{ background: colAcc }} />
// // //           <span style={{ fontSize:".7rem", color:"var(--tx3)" }}>Overall match score</span>
// // //         </div>
// // //         <div className="score-ring-wrap">
// // //           <div className="score-ring">
// // //             <svg width="62" height="62" viewBox="0 0 62 62">
// // //               <circle cx="31" cy="31" r={radius} fill="none" stroke="var(--glass2)" strokeWidth="6"/>
// // //               <circle cx="31" cy="31" r={radius} fill="none" stroke={ringColor} strokeWidth="6"
// // //                 strokeDasharray={`${dash.toFixed(1)} ${circ.toFixed(1)}`} strokeLinecap="round"/>
// // //             </svg>
// // //             <div className="score-ring-lbl"><span className="score-ring-num">{score}</span></div>
// // //           </div>
// // //           <div>
// // //             <div className="score-overall" style={{ color: colAcc }}>{score}/100</div>
// // //             <div className="score-sub">{score >= 80 ? "Strong match" : score >= 60 ? "Good match" : "Weak match"}</div>
// // //           </div>
// // //         </div>
// // //         <div className="score-rows">
// // //           {breakdown.map((b) => (
// // //             <div key={b.l} className="srow">
// // //               <span className="srow-lbl">{b.l}</span>
// // //               <div className="srow-bar"><div className="srow-fill" style={{ width:`${b.v}%`, background: scoreBarColor(b.v) }}/></div>
// // //               <span className="srow-val">{b.v}</span>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       {/* ── Recruitment Timeline ── */}
// // //       <div className="timeline-card">
// // //         <div className="tc-hdr">📅 Recruitment Timeline</div>
// // //         <div className="tl-wrap">
// // //           {TL_STAGES.map((s) => {
// // //             const done = reached(s.key);
// // //             return (
// // //               <div key={s.key} className="tl-item">
// // //                 <div className={`tl-dot ${done ? "comp" : "pend"}`}>{s.icon}</div>
// // //                 <div>
// // //                   <div className="tl-nm">{s.label}</div>
// // //                   <div className={`tl-st ${done ? "comp" : "pend"}`}>{done ? "Completed" : "Pending"}</div>
// // //                   {done && <div className="tl-dt">{fmtDate(candidate.processed_date)}</div>}
// // //                 </div>
// // //               </div>
// // //             );
// // //           })}
// // //         </div>
// // //       </div>

// // //       {/* ── Notes & Feedback ── */}
// // //       <div className="notes-card">
// // //         <div className="notes-hdr">
// // //           <span className="notes-title">📝 Notes &amp; Feedback</span>
// // //           <button className="add-note-btn">+ Add Note</button>
// // //         </div>
// // //         <div className="notes-empty">No notes yet</div>
// // //       </div>

// // //       {/* ── Action buttons ── */}
// // //       <div className="action-row">
// // //         <button className="btn-dl"><Download size={14}/> Download Resume</button>
// // //         {primaryBtn}
// // //       </div>

// // //       {/* ── Additional info ── */}
// // //       <div className="addl-card">
// // //         <div className="addl-row"><span className="addl-key">Job ID</span><span className="addl-val">{candidate.job_id}</span></div>
// // //         <div className="addl-row"><span className="addl-key">Candidate ID</span><span className="addl-val">{candidate.id}</span></div>
// // //         <div className="addl-row"><span className="addl-key">Status</span><span className="addl-val">{ds}</span></div>
// // //         <div className="addl-row"><span className="addl-key">Initial Status</span><span className={`addl-val${isRej ? " rej" : ""}`}>{isRej ? "Rejected" : "Active"}</span></div>
// // //         {candidate.exam_completed && (
// // //           <div className="addl-row">
// // //             <span className="addl-key">Assessment Score</span>
// // //             <span className="addl-val" style={{ color: (candidate.exam_percentage ?? 0) >= 70 ? "var(--acc)" : "var(--red)" }}>
// // //               {(candidate.exam_percentage ?? 0).toFixed(0)}%
// // //             </span>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default React.memo(CandidateDetails);
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

// // // function getRejectionPoints(c: Candidate) {
// // //   const score = c.ats_score ?? 0, exam = c.exam_percentage ?? 0;
// // //   const pts: { headline: string; fb: string[]; journey: boolean }[] = [];
// // //   if (!c.exam_link_sent) {
// // //     pts.push({ headline: score < 60 ? `Low ATS score: ${score}/100 — minimum threshold is 60` : `ATS score ${score}/100 — below the shortlist cut-off of 70`, fb: [`Score is ${Math.max(70-score,0).toFixed(0)} points below the shortlist threshold of 70`,"Resume keywords and experience don't closely match the job description","Profile filtered out at automated screening before manual review"], journey: false });
// // //     return pts;
// // //   }
// // //   if (score >= 70) pts.push({ headline: `Initially shortlisted — ATS score ${score}/100 met the threshold`, fb: [], journey: true });
// // //   else if (score >= 60) pts.push({ headline: `Initially reviewed — ATS score ${score}/100 passed minimum screening`, fb: [], journey: true });
// // //   if (c.link_expired && !c.exam_completed) {
// // //     pts.push({ headline: "Assessment not completed — invitation link expired", fb: ["Candidate received the link but did not submit the test","Links have a fixed validity window — once expired they cannot be reused","HR can decide whether to resend or close this application"], journey: false });
// // //     return pts;
// // //   }
// // //   if (c.exam_completed && exam < 70) {
// // //     const gap = (70 - exam).toFixed(0);
// // //     const sev = exam < 40 ? "Very low score — significant gaps in core skills required for this role" : exam < 55 ? "Partial understanding but insufficient depth in key areas" : `Close to pass mark — ${gap}% short of the required threshold`;
// // //     pts.push({ headline: `Failed assessment: scored ${exam.toFixed(0)}% — required pass mark is 70%`, fb: [`Achieved ${exam.toFixed(0)}% against the 70% pass mark — ${gap}% below the minimum`, sev,"Strong ATS resume score but technical skills not demonstrated at the required level"], journey: false });
// // //   }
// // //   if (c.final_status === "Rejected After Exam") {
// // //     pts.push({ headline: "Did not meet post-assessment criteria for the next stage", fb: ["Overall evaluation after assessment did not clear the bar for this role","Skills, experience, and assessment result considered holistically","HR review determined candidate is not a strong enough fit at this stage"], journey: false });
// // //   }
// // //   return pts;
// // // }
// // function getRejectionPoints(c: Candidate) {
// //   const score      = c.ats_score ?? 0;
// //   const breakdown  = (c as any).rejection_breakdown as {
// //     decision?:       string;
// //     reasons?:        string[];
// //     missing_skills?: string[];
// //     matched_skills?: string[];
// //   } | undefined;

// //   const pts: { headline: string; fb: string[]; journey: boolean }[] = [];

// //   // ── Use actual AI-generated data from pipeline ────────────────────────────
// //   if (breakdown?.reasons?.length) {
// //     const headline = breakdown.decision
// //       ? `${breakdown.decision} — Score ${score}/100 is below the 70 threshold`
// //       : `Score ${score}/100 — below the shortlist threshold of 70`;

// //     const fb: string[] = [...(breakdown.reasons ?? [])];

// //     if (breakdown.missing_skills?.length) {
// //       fb.push(`Missing required skills: ${breakdown.missing_skills.join(", ")}`);
// //     }
// //     if (breakdown.matched_skills?.length) {
// //       fb.push(`Matched skills: ${breakdown.matched_skills.join(", ")}`);
// //     }

// //     pts.push({ headline, fb, journey: false });
// //     return pts;
// //   }

// //   // ── Fallback: generic reasons when no AI data available ───────────────────
// //   if (!c.exam_link_sent) {
// //     pts.push({
// //       headline: score < 60
// //         ? `Low ATS score: ${score}/100 — minimum threshold is 60`
// //         : `ATS score ${score}/100 — below the shortlist cut-off of 70`,
// //       fb: [
// //         `Score is ${Math.max(70 - score, 0).toFixed(0)} points below the shortlist threshold of 70`,
// //         "Resume keywords and experience don't closely match the job description",
// //         "Profile filtered out at automated screening before manual review",
// //       ],
// //       journey: false,
// //     });
// //     return pts;
// //   }

// //   // ── Assessment failure path ───────────────────────────────────────────────
// //   if (c.link_expired && !c.exam_completed) {
// //     pts.push({
// //       headline: "Assessment not completed — invitation link expired",
// //       fb: [
// //         "Candidate received the link but did not submit the test",
// //         "Links have a fixed validity window — once expired they cannot be reused",
// //         "HR can decide whether to resend or close this application",
// //       ],
// //       journey: false,
// //     });
// //     return pts;
// //   }

// //   if (c.exam_completed && (c.exam_percentage ?? 0) < 70) {
// //     const exam = c.exam_percentage ?? 0;
// //     const gap  = (70 - exam).toFixed(0);
// //     pts.push({
// //       headline: `Failed assessment: scored ${exam.toFixed(0)}% — required pass mark is 70%`,
// //       fb: [
// //         `Achieved ${exam.toFixed(0)}% against the 70% pass mark — ${gap}% below the minimum`,
// //         exam < 40
// //           ? "Very low score — significant gaps in core skills required for this role"
// //           : exam < 55
// //           ? "Partial understanding but insufficient depth in key areas"
// //           : `Close to pass mark — ${gap}% short of the required threshold`,
// //         "Strong ATS resume score but technical skills not demonstrated at the required level",
// //       ],
// //       journey: false,
// //     });
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
// //   // const isFinallyRejected =
// //   //   candidate.status === "Rejected" ||
// //   //   candidate.final_status === "Rejected After Exam" ||
// //   //   (candidate.exam_completed && (candidate.exam_percentage ?? 0) < 70) ||
// //   //   (candidate.link_expired && !candidate.exam_completed);

// //   const isFinallyRejected =
// //     candidate.status === "Rejected"                                          ||
// //     candidate.status === "Pending Review"                                    ||
// //     candidate.final_status === "Rejected After Exam"                         ||
// //     (candidate.exam_completed && (candidate.exam_percentage ?? 0) < 70)     ||
// //     (candidate.link_expired && !candidate.exam_completed)                    ||
// //     // Show rejection block for any scored candidate below threshold
// //     ((candidate.ats_score ?? 0) > 0 &&
// //     (candidate.ats_score ?? 0) < 70 &&
// //     !candidate.exam_link_sent);

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
// //           <div className="c-hdr-pos">
// //             {candidate.job_title ? candidate.job_title.charAt(0).toUpperCase() + candidate.job_title.slice(1) : "—"}
// //             {(candidate as any).dept && (candidate as any).dept !== "—" ? ` · ${(candidate as any).dept}` : ""}
// //           </div>
// //           <div className="c-hdr-meta">
// //             {isRej
// //               ? <span className="status-pill rej">⊗ Rejected</span>
// //               : <span className="status-pill act">
// //                   <span style={{width:6,height:6,borderRadius:"50%",background:"var(--acc)",animation:"pdot 1.5s infinite",display:"inline-block"}} />
// //                   {pillLbl}
// //                 </span>
// //             }
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
// //       {/* <div className="notes-card">
// //         <div className="notes-hdr">
// //           <span className="notes-title">📝 Notes &amp; Feedback</span>
// //           <button className="add-note-btn">+ Add Note</button>
// //         </div>
// //         <div className="notes-empty">No notes yet</div>
// //       </div> */}
      

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

// function getRejectionPoints(c: Candidate) {
//   const score     = c.ats_score ?? 0;
//   const breakdown = (c as any).rejection_breakdown as {
//     decision?:       string;
//     reasons?:        string[];
//     missing_skills?: string[];
//     matched_skills?: string[];
//   } | undefined;

//   const pts: { headline: string; fb: string[]; journey: boolean }[] = [];

//   if (breakdown?.reasons?.length) {
//     const headline = breakdown.decision
//       ? `${breakdown.decision} — Score ${score}/100 is below the 70 threshold`
//       : `Score ${score}/100 — below the shortlist threshold of 70`;

//     const fb: string[] = [...(breakdown.reasons ?? [])];
//     if (breakdown.missing_skills?.length) fb.push(`Missing required skills: ${breakdown.missing_skills.join(", ")}`);
//     if (breakdown.matched_skills?.length) fb.push(`Matched skills: ${breakdown.matched_skills.join(", ")}`);

//     pts.push({ headline, fb, journey: false });
//     return pts;
//   }

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
//   const score = c.ats_score ?? 0;
//   const exam  = c.exam_percentage ?? 0;
//   const r: string[] = [];

//   // Use AI match data if available
//   const matchedSkills = (c as any).matched_skills as string[] | undefined;
//   if (matchedSkills?.length) {
//     r.push(`Matched required skills: ${matchedSkills.slice(0,4).join(", ")}`);
//   } else {
//     if (score >= 85) r.push(`Excellent ATS score of ${score}/100 — top 10% of applicants`);
//     else if (score >= 70) r.push(`Strong ATS score of ${score}/100 — meets the shortlist threshold`);
//     else if (score >= 60) r.push(`Acceptable ATS score of ${score}/100 — manually reviewed and approved`);
//   }

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

// /* ── Match type pill style helper ── */
// function matchTypePillStyle(matchType: string) {
//   if (matchType === "Strong Fit") return {
//     background: "var(--accs)",
//     color: "var(--acc)",
//     border: "1px solid var(--bd-acc, rgba(0,214,143,.25))",
//   };
//   if (matchType === "Partial Fit") return {
//     background: "rgba(251,191,36,.1)",
//     color: "var(--amber)",
//     border: "1px solid rgba(251,191,36,.25)",
//   };
//   return {
//     background: "rgba(248,113,113,.1)",
//     color: "var(--red)",
//     border: "1px solid rgba(248,113,113,.2)",
//   };
// }

// /* ── Recommendation color helper ── */
// function recommendationColor(rec: string) {
//   if (rec === "Proceed")   return "var(--acc)";
//   if (rec === "HR Review") return "var(--amber)";
//   return "var(--red)";
// }

// const DETAIL_CSS = `
// @keyframes fup{to{opacity:1;transform:translateY(0);}}
// @keyframes pdot{0%,100%{opacity:1;}50%{opacity:.4;}}

// .c-hdr{display:flex;align-items:flex-start;gap:16px;margin-bottom:1.5rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .05s forwards;}
// .big-av{width:58px;height:58px;border-radius:15px;display:flex;align-items:center;justify-content:center;font-family:var(--serif);font-size:1.1rem;font-weight:700;flex-shrink:0;}
// .c-hdr-nm{font-family:var(--serif);font-size:1.7rem;line-height:1.1;margin-bottom:.2rem;color:var(--tx);transition:color .35s;}
// .c-hdr-pos{font-size:.8rem;color:var(--tx2);margin-bottom:.4rem;transition:color .35s;}
// .c-hdr-meta{display:flex;align-items:center;gap:6px;flex-wrap:wrap;}
// .status-pill{display:inline-flex;align-items:center;gap:5px;font-size:.67rem;font-weight:700;padding:.2rem .65rem;border-radius:999px;}
// .status-pill.rej{background:rgba(248,113,113,.1);color:var(--red);border:1px solid rgba(248,113,113,.2);}
// .status-pill.act{background:var(--accs);color:var(--acc);border:1px solid var(--bd);}
// .match-type-pill{display:inline-flex;align-items:center;font-size:.62rem;font-weight:700;padding:.2rem .65rem;border-radius:999px;}
// .c-hdr-actions{display:flex;gap:.45rem;flex-wrap:wrap;margin-left:auto;flex-shrink:0;}
// .c-hdr-btn{font-family:var(--sans);font-size:.67rem;font-weight:600;padding:.28rem .68rem;border-radius:7px;cursor:pointer;transition:all .18s;border:1px solid var(--card-bd);background:var(--glass2);color:var(--tx2);}
// .c-hdr-btn:hover{border-color:var(--acc);color:var(--acc);}
// .c-hdr-btn--danger{background:rgba(248,113,113,.1);color:var(--red);border-color:rgba(248,113,113,.2);}
// .c-hdr-btn--danger:hover{background:var(--red);color:#fff;border-color:var(--red);}
// .c-hdr-btn--success{background:var(--accs);color:var(--acc);border-color:var(--bd);}
// .c-hdr-btn--success:hover{background:var(--acc);color:var(--btn-text);}
// .c-hdr-btn--blue{background:rgba(96,165,250,.1);color:var(--blue);border-color:rgba(96,165,250,.2);}

// .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:1.4rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .1s forwards;}
// .ibox{background:var(--card-bg);border:1px solid var(--card-bd);border-radius:12px;padding:.85rem 1rem;backdrop-filter:blur(12px);transition:background .35s,border-color .35s;}
// .ilbl{font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--tx3);margin-bottom:.3rem;transition:color .35s;}
// .ival{font-size:.8rem;color:var(--tx);font-weight:500;transition:color .35s;}
// .ival a{color:var(--acc);text-decoration:none;}
// .ival a:hover{text-decoration:underline;}
// .ival.empty{color:var(--tx3);}

// .short-box{background:var(--short-bg,rgba(0,214,143,.05));border:1px solid var(--short-bd,rgba(0,214,143,.2));border-radius:14px;padding:1.1rem 1.2rem;margin-bottom:1.4rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .12s forwards;transition:all .35s;}
// .short-hdr{display:flex;align-items:center;gap:8px;font-size:.82rem;font-weight:700;color:var(--acc);margin-bottom:.65rem;}
// .short-reason{display:flex;align-items:flex-start;gap:6px;font-size:.7rem;margin-bottom:.3rem;line-height:1.45;}
// [data-cs-theme="dark"] .short-reason{color:#6ee7b7;}
// [data-cs-theme="light"] .short-reason{color:#065f46;}
// .short-bar-wrap{margin-top:.65rem;}
// .short-bar-lbl{display:flex;justify-content:space-between;font-size:.61rem;color:var(--acc);margin-bottom:.25rem;}
// .short-bar{height:5px;border-radius:3px;background:var(--glass2);overflow:hidden;}
// .short-bar-fill{height:100%;border-radius:3px;transition:width 1.2s cubic-bezier(.4,0,.2,1);}

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

// .score-card{background:var(--card-bg);border:1px solid var(--card-bd);border-radius:14px;padding:1.2rem;margin-bottom:1.4rem;backdrop-filter:blur(12px);opacity:0;transform:translateY(14px);animation:fup .4s ease .2s forwards;transition:background .35s,border-color .35s;}
// .score-card-hdr{font-size:.8rem;font-weight:700;color:var(--tx);margin-bottom:.8rem;transition:color .35s;}
// .score-ring-wrap{display:flex;align-items:center;gap:13px;margin-bottom:.8rem;}
// .score-ring{position:relative;width:62px;height:62px;flex-shrink:0;}
// .score-ring svg{transform:rotate(-90deg);}
// .score-ring-lbl{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;}
// .score-ring-num{font-family:var(--serif);font-size:.9rem;font-weight:700;color:var(--tx);transition:color .35s;}
// .score-overall{font-family:var(--serif);font-size:2.1rem;font-weight:700;line-height:1;}
// .score-sub{font-size:.65rem;color:var(--tx3);margin-top:.1rem;transition:color .35s;}
// .score-rec{font-size:.63rem;color:var(--tx3);margin-top:.25rem;}
// .score-dot{width:9px;height:9px;border-radius:50%;animation:pdot 1.5s infinite;flex-shrink:0;}
// .score-rows{display:flex;flex-direction:column;gap:.55rem;}
// .srow{display:flex;align-items:center;gap:10px;}
// .srow-lbl{font-size:.72rem;color:var(--tx2);width:135px;flex-shrink:0;transition:color .35s;}
// .srow-bar{flex:1;height:5px;border-radius:3px;background:var(--glass2);overflow:hidden;transition:background .35s;}
// .srow-fill{height:100%;border-radius:3px;transition:width 1.2s cubic-bezier(.4,0,.2,1);}
// .srow-val{font-size:.7rem;font-weight:600;color:var(--tx3);width:20px;text-align:right;transition:color .35s;}

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

// .notes-card{background:var(--card-bg);border:1px solid var(--card-bd);border-radius:14px;padding:1.2rem;margin-bottom:1.4rem;backdrop-filter:blur(12px);opacity:0;transform:translateY(14px);animation:fup .4s ease .3s forwards;transition:background .35s,border-color .35s;}
// .notes-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:.9rem;}
// .notes-title{font-size:.8rem;font-weight:700;color:var(--tx);transition:color .35s;}
// .add-note-btn{font-size:.67rem;font-weight:600;color:var(--acc);background:var(--accs);border:1px solid var(--bd);padding:.22rem .65rem;border-radius:7px;cursor:pointer;font-family:var(--sans);transition:all .2s;}
// .add-note-btn:hover{background:var(--acc);color:var(--btn-text);border-color:var(--acc);}
// .notes-empty{font-size:.75rem;color:var(--tx3);text-align:center;padding:1rem 0;transition:color .35s;}

// .action-row{display:flex;gap:.8rem;margin-bottom:1.4rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .35s forwards;}
// .btn-dl{flex:1;background:var(--card-bg);border:1px solid var(--card-bd);color:var(--tx2);font-family:var(--sans);font-size:.78rem;font-weight:600;padding:.65rem;border-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:7px;transition:all .2s;}
// .btn-dl:hover{border-color:var(--acc);color:var(--acc);}
// .btn-profile{flex:2;background:var(--acc);color:var(--btn-text);font-family:var(--sans);font-size:.78rem;font-weight:700;padding:.65rem;border-radius:10px;cursor:pointer;border:none;display:flex;align-items:center;justify-content:center;gap:7px;transition:all .2s;box-shadow:0 0 20px var(--accg);}
// .btn-profile:hover{background:var(--acc3);box-shadow:0 0 32px var(--accg);transform:translateY(-1px);}
// .btn-send{flex:2;background:rgba(96,165,250,.1);color:var(--blue);font-family:var(--sans);font-size:.78rem;font-weight:700;padding:.65rem;border-radius:10px;cursor:pointer;border:1px solid rgba(96,165,250,.25);display:flex;align-items:center;justify-content:center;gap:7px;transition:all .2s;}
// .btn-send:hover{background:var(--blue);color:#fff;}
// .btn-sched{flex:2;background:var(--accs);color:var(--acc);font-family:var(--sans);font-size:.78rem;font-weight:700;padding:.65rem;border-radius:10px;cursor:pointer;border:1px solid var(--bd);display:flex;align-items:center;justify-content:center;gap:7px;transition:all .2s;}
// .btn-sched:hover{background:var(--acc);color:var(--btn-text);}

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

//   const av       = avatarStyle(candidate.name ?? "");
//   const ini      = initials(candidate.name ?? "?");
//   const score    = candidate.ats_score ?? 0;
//   const ds       = getDisplayStatus(candidate);
//   const matchType    = (candidate as any).match_type as string | undefined;
//   const recommendation = (candidate as any).recommendation as string | undefined;

//   const pillCls = STATUS_PILL_CLS[ds] ?? "pill-applied";
//   const pillLbl = STATUS_LABEL[ds]    ?? "Applied";
//   const isRej   = ds === "Rejected";
//   const colAcc  = isRej ? "var(--red)" : "var(--acc)";

//   /* Ring SVG */
//   const radius = 26, circ = 2 * Math.PI * radius;
//   const dash   = (score / 100) * circ;
//   const ringColor = score >= 80 ? "#059669" : score >= 70 ? "#d97706" : "#dc2626";

//   /* ── isFinallyRejected — drives Why Rejected block ── */
//   const isFinallyRejected =
//     candidate.status === "Rejected"                                      ||
//     candidate.status === "Pending Review"                                ||
//     candidate.final_status === "Rejected After Exam"                     ||
//     (candidate.exam_completed && (candidate.exam_percentage ?? 0) < 70) ||
//     (candidate.link_expired && !candidate.exam_completed)                ||
//     ((candidate.ats_score ?? 0) > 0 &&
//      (candidate.ats_score ?? 0) < 70 &&
//      !candidate.exam_link_sent);

//   const isShortlisted = !isFinallyRejected && (
//     candidate.status === "Shortlisted" ||
//     candidate.interview_scheduled      ||
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
//     primaryBtn = (
//       <button className="btn-send" onClick={() => onSendReminder?.(candidate.id)}>
//         <Send size={14}/> Send Assessment Reminder
//       </button>
//     );
//   } else if (candidate.exam_completed && (candidate.exam_percentage ?? 0) >= 70 && !candidate.interview_scheduled) {
//     primaryBtn = (
//       <button className="btn-sched" onClick={() => router.push(`/scheduler?candidate_id=${candidate.id}`)}>
//         <Calendar size={14}/> Schedule Interview
//       </button>
//     );
//   } else {
//     primaryBtn = (
//       <button className="btn-profile" onClick={() => router.push(`/candidates/${candidate.id}`)}>
//         <Eye size={14}/> View Full Profile
//       </button>
//     );
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
//             {candidate.job_title
//               ? candidate.job_title.charAt(0).toUpperCase() + candidate.job_title.slice(1)
//               : "—"}
//             {(candidate as any).dept && (candidate as any).dept !== "—"
//               ? ` · ${(candidate as any).dept}`
//               : ""}
//           </div>

//           {/* Status + Match Type pills */}
//           <div className="c-hdr-meta">
//             {isRej
//               ? <span className="status-pill rej">⊗ Rejected</span>
//               : <span className="status-pill act">
//                   <span style={{width:6,height:6,borderRadius:"50%",background:"var(--acc)",animation:"pdot 1.5s infinite",display:"inline-block"}} />
//                   {pillLbl}
//                 </span>
//             }

//             {/* ── match_type pill — NEW ── */}
//             {matchType && (
//               <span className="match-type-pill" style={matchTypePillStyle(matchType)}>
//                 {matchType}
//               </span>
//             )}
//           </div>
//         </div>

//         <div className="c-hdr-actions">
//           {showReject   && <button className="c-hdr-btn c-hdr-btn--danger">Reject</button>}
//           {/* {showSchedule && <button className="c-hdr-btn c-hdr-btn--success">Schedule Interview</button>} */}
//           {/* REPLACE WITH THIS */}
//           {showSchedule && (
//             <a
//               href="http://localhost:8080/scheduler"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="c-hdr-btn c-hdr-btn--success"
//               style={{ textDecoration: "none" }}
//             >
//               Schedule Interview
//             </a>
//           )}
//           {showSendAsmt && <button className="c-hdr-btn c-hdr-btn--blue">Send Assessment</button>}
//         </div>
//       </div>

//       {/* ── Info grid ── */}
//       <div className="info-grid">
//         <div className="ibox">
//           <div className="ilbl">Email</div>
//           <div className="ival"><a href={`mailto:${candidate.email}`}>{candidate.email}</a></div>
//         </div>
//         <div className="ibox">
//           <div className="ilbl">Phone</div>
//           <div className={`ival${!candidate.phone ? " empty" : ""}`}>{candidate.phone || "—"}</div>
//         </div>
//         <div className="ibox">
//           <div className="ilbl">Applied</div>
//           <div className="ival">{fmtDate(candidate.processed_date)}</div>
//         </div>
//         <div className="ibox">
//           <div className="ilbl">Department</div>
//           <div className={`ival${!(candidate as any).dept ? " empty" : ""}`}>
//             {(candidate as any).dept || "—"}
//           </div>
//         </div>
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
//             <div className="short-bar">
//               <div className="short-bar-fill" style={{ width: `${Math.min(score,100)}%`, background: "var(--acc)" }} />
//             </div>
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
//             <div className="score-ring-lbl">
//               <span className="score-ring-num">{score}</span>
//             </div>
//           </div>
//           <div>
//             <div className="score-overall" style={{ color: colAcc }}>{score}/100</div>

//             {/* Match quality label */}
//             <div className="score-sub">
//               {score >= 80 ? "Strong match" : score >= 60 ? "Good match" : "Weak match"}
//             </div>

//             {/* ── AI Recommendation — NEW ── */}
//             {recommendation && (
//               <div className="score-rec">
//                 AI Recommendation:{" "}
//                 <span style={{ fontWeight: 700, color: recommendationColor(recommendation) }}>
//                   {recommendation}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="score-rows">
//           {breakdown.map((b) => (
//             <div key={b.l} className="srow">
//               <span className="srow-lbl">{b.l}</span>
//               <div className="srow-bar">
//                 <div className="srow-fill" style={{ width:`${b.v}%`, background: scoreBarColor(b.v) }}/>
//               </div>
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

//       {/* ── Notes & Feedback — HR notes only, no AI duplication ── */}
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
//         <div className="addl-row">
//           <span className="addl-key">Job ID</span>
//           <span className="addl-val">{candidate.job_id}</span>
//         </div>
//         <div className="addl-row">
//           <span className="addl-key">Candidate ID</span>
//           <span className="addl-val">{candidate.id}</span>
//         </div>
//         <div className="addl-row">
//           <span className="addl-key">Status</span>
//           <span className="addl-val">{ds}</span>
//         </div>
//         <div className="addl-row">
//           <span className="addl-key">Match Type</span>
//           <span className="addl-val" style={{
//             color: matchType === "Strong Fit"
//               ? "var(--acc)" : matchType === "Partial Fit"
//               ? "var(--amber)" : matchType === "Weak Fit"
//               ? "var(--red)" : "var(--tx)"
//           }}>
//             {matchType || "—"}
//           </span>
//         </div>
//         <div className="addl-row">
//           <span className="addl-key">AI Recommendation</span>
//           <span className="addl-val" style={{
//             color: recommendation ? recommendationColor(recommendation) : "var(--tx)"
//           }}>
//             {recommendation || "—"}
//           </span>
//         </div>
//         <div className="addl-row">
//           <span className="addl-key">Initial Status</span>
//           <span className={`addl-val${isRej ? " rej" : ""}`}>{isRej ? "Rejected" : "Active"}</span>
//         </div>
//         {candidate.exam_completed && (
//           <div className="addl-row">
//             <span className="addl-key">Assessment Score</span>
//             <span className="addl-val" style={{
//               color: (candidate.exam_percentage ?? 0) >= 70 ? "var(--acc)" : "var(--red)"
//             }}>
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
import { Download } from "lucide-react";
import { Candidate } from "@/services/interfaces/CandidateScreening";

/* ══════════════════════════════════════════════════════════════════════
   HELPERS
════════════════════════════════════════════════════════════════════════ */
function avatarStyle(name: string) {
  const p: [string, string][] = [
    ["#EFF6FF","#2563EB"],["#F0FDF4","#16A34A"],["#FFF7ED","#EA580C"],
    ["#FAF5FF","#7C3AED"],["#FFF1F2","#E11D48"],["#F0FDFA","#0D9488"],
    ["#FFFBEB","#D97706"],["#FDF4FF","#A21CAF"],
  ];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
  const [bg, fg] = p[Math.abs(h) % p.length];
  return { bg, fg };
}

function fmtDate(str?: string | null) {
  if (!str) return "—";
  try { return new Date(str).toLocaleDateString("en-IN",{ day:"numeric", month:"short", year:"numeric" }); }
  catch { return str; }
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

/* ══════════════════════════════════════════════════════════════════════
   LAYER 2 — JOB UNDERSTANDING ENGINE (keyed by job title substring)
   Works with BOTH mock IDs (2-7) AND real backend job IDs.
   Falls back to title-based lookup so real candidates get proper JD.
════════════════════════════════════════════════════════════════════════ */
interface JDProfile {
  title: string;
  must_have: string[];
  good_to_have: string[];
  exp_range: [number, number];
  domain: string;
}

const JOB_PROFILES_BY_ID: Record<number, JDProfile> = {
  2: { title:"AI/ML Engineer",   must_have:["Python","Machine Learning","Deep Learning","TensorFlow"], good_to_have:["PyTorch","Kubernetes","MLOps","AWS"],    exp_range:[2,5], domain:"AI/ML"       },
  3: { title:"Data Scientist",   must_have:["Python","SQL","Statistics","Data Analysis"],              good_to_have:["ML","Tableau","Spark","R"],             exp_range:[1,4], domain:"Data"        },
  4: { title:"Python Developer", must_have:["Python","REST APIs","Git","SQL"],                         good_to_have:["Django","FastAPI","Docker","AWS"],       exp_range:[1,4], domain:"Engineering" },
  5: { title:"Web Developer",    must_have:["HTML","CSS","JavaScript","React"],                        good_to_have:["TypeScript","Node.js","GraphQL","Git"],  exp_range:[1,3], domain:"Engineering" },
  6: { title:"UX Designer",      must_have:["Figma","User Research","Wireframing","Prototyping"],      good_to_have:["Adobe XD","HTML","CSS","A/B Testing"],  exp_range:[2,5], domain:"Design"      },
  7: { title:"Product Manager",  must_have:["Product Strategy","Roadmapping","Stakeholders","Agile"], good_to_have:["SQL","Analytics","Jira","B2B SaaS"],    exp_range:[3,7], domain:"Product"     },
};

const JOB_PROFILES_BY_TITLE: { keywords: string[]; profile: JDProfile }[] = [
  { keywords:["ai","ml","machine learning","deep learning"],
    profile:{ title:"AI/ML Engineer",   must_have:["Python","Machine Learning","Deep Learning","TensorFlow"], good_to_have:["PyTorch","MLOps","AWS","Kubernetes"],   exp_range:[2,5], domain:"AI/ML"       } },
  { keywords:["data sci","data science"],
    profile:{ title:"Data Scientist",   must_have:["Python","SQL","Statistics","Data Analysis"],              good_to_have:["ML","Tableau","Spark","R"],             exp_range:[1,4], domain:"Data"        } },
  { keywords:["python dev","python developer"],
    profile:{ title:"Python Developer", must_have:["Python","REST APIs","Git","SQL"],                         good_to_have:["Django","FastAPI","Docker","AWS"],       exp_range:[1,4], domain:"Engineering" } },
  { keywords:["web dev","web developer","frontend","front-end"],
    profile:{ title:"Web Developer",    must_have:["HTML","CSS","JavaScript","React"],                        good_to_have:["TypeScript","Node.js","GraphQL","Git"],  exp_range:[1,3], domain:"Engineering" } },
  { keywords:["ux","ui","designer","design"],
    profile:{ title:"UX Designer",      must_have:["Figma","User Research","Wireframing","Prototyping"],      good_to_have:["Adobe XD","HTML","CSS","A/B Testing"],  exp_range:[2,5], domain:"Design"      } },
  { keywords:["product manager","product management","pm"],
    profile:{ title:"Product Manager",  must_have:["Product Strategy","Roadmapping","Stakeholders","Agile"], good_to_have:["SQL","Analytics","Jira","B2B SaaS"],    exp_range:[3,7], domain:"Product"     } },
];

function getJobProfile(jobId: number, jobTitle?: string): JDProfile | null {
  // Try exact ID match first (mock data)
  if (JOB_PROFILES_BY_ID[jobId]) return JOB_PROFILES_BY_ID[jobId];
  // Fall back to title-based lookup (real backend)
  if (jobTitle) {
    const t = jobTitle.toLowerCase();
    for (const entry of JOB_PROFILES_BY_TITLE) {
      if (entry.keywords.some((k) => t.includes(k))) return entry.profile;
    }
  }
  return null;
}

/* ══════════════════════════════════════════════════════════════════════
   LAYER 3 — HYBRID SCORING ENGINE
   Works entirely from backend Candidate fields — no static CAND_PROFILES.
   Extracts skills from: matched_skills, skills, job_title context
   final_score = 0.4×skill + 0.3×semantic + 0.2×exp + 0.1×signal
════════════════════════════════════════════════════════════════════════ */
interface HybridResult {
  total: number;
  skill: number;
  semantic: number;
  exp: number;
  signal: number;
  mustMatched: string[];
  mustMissed: string[];
  goodMatched: string[];
  kwScore: number;
  fmtScore: number;
  projScore: number;
  atsTotal: number;
}

function computeHybridFromCandidate(c: Candidate, jd: JDProfile | null): HybridResult {
  const raw = c as any;

  // Extract available skills from backend fields
  const skills: string[] = [
    ...(raw.matched_skills ?? []),
    ...(raw.skills ?? []),
    ...(typeof raw.skill_tags === "string" ? raw.skill_tags.split(",").map((s: string) => s.trim()) : raw.skill_tags ?? []),
  ].filter(Boolean);

  const expYears: number = raw.experience_years ?? raw.exp_years ?? raw.years_of_experience ?? 0;

  const match = (a: string, b: string) =>
    a.toLowerCase().includes(b.toLowerCase()) || b.toLowerCase().includes(a.toLowerCase());

  // Skill score (40%)
  let skillScore = 0;
  let mustMatched: string[] = [];
  let mustMissed: string[] = [];
  let goodMatched: string[] = [];

  if (jd && skills.length > 0) {
    mustMatched = jd.must_have.filter((s) => skills.some((cs) => match(cs, s)));
    mustMissed  = jd.must_have.filter((s) => !mustMatched.includes(s));
    goodMatched = jd.good_to_have.filter((s) => skills.some((cs) => match(cs, s)));
    skillScore  = Math.min(100, Math.round(
      (mustMatched.length / jd.must_have.length) * 75 +
      (goodMatched.length / jd.good_to_have.length) * 25
    ));
  } else if (raw.ats_score && raw.ats_score > 0) {
    // Fallback: use raw ATS score as proxy
    skillScore = Math.min(100, Math.round(raw.ats_score * 0.75));
  }

  // Semantic score (30%) — proxied from backend fields
  const semanticScore: number = raw.semantic_score ?? raw.domain_match_score ?? (
    skills.length >= 4 ? Math.min(100, 40 + (skills.length >= 6 ? 35 : 20) + 25) : 30
  );

  // Experience score (20%)
  let expScore = 50; // neutral default
  if (jd && expYears > 0) {
    const [minExp, maxExp] = jd.exp_range;
    expScore = expYears < minExp
      ? Math.round((expYears / minExp) * 70)
      : expYears <= maxExp ? 100
      : Math.max(60, 100 - (expYears - maxExp) * 8);
  } else if (expYears > 0) {
    expScore = Math.min(100, expYears * 20); // rough proxy
  }

  // Signal score (10%)
  const careerGrowth: boolean = raw.career_growth ?? raw.signals?.career_growth ?? false;
  const jobHopping:   boolean = raw.job_hopping   ?? raw.signals?.job_hopping   ?? false;
  const signalScore   = (careerGrowth ? 60 : 30) + (jobHopping ? 0 : 40);

  const total = Math.round(0.4 * skillScore + 0.3 * semanticScore + 0.2 * expScore + 0.1 * signalScore);

  // ATS panel sub-scores
  const kwPct    = raw.keyword_match_pct ?? Math.round(skillScore * 0.9);
  const fmtRaw   = raw.resume_format;
  const fmtScore = fmtRaw === "good" ? 90 : fmtRaw === "average" ? 60 : fmtRaw === "poor" ? 30 :
                   (raw.ats_score >= 70 ? 60 : 40); // fallback
  const projLen  = (raw.projects ?? []).length;
  const projScore = projLen > 0 ? Math.min(100, 60 + projLen * 15) : 15;
  const atsTotal  = Math.round(0.35 * kwPct + 0.20 * expScore + 0.20 * fmtScore + 0.15 * projScore + 0.10 * signalScore);

  return {
    total: total || (raw.ats_score ?? 0),
    skill: skillScore, semantic: semanticScore, exp: expScore, signal: signalScore,
    mustMatched, mustMissed, goodMatched,
    kwScore: kwPct, fmtScore, projScore, atsTotal,
  };
}

/* ══════════════════════════════════════════════════════════════════════
   LAYER 4 — REASONING ENGINE (from backend data)
════════════════════════════════════════════════════════════════════════ */
function buildReasoning(c: Candidate, jd: JDProfile | null, hybrid: HybridResult) {
  const raw = c as any;
  const why:   string[] = [];
  const risks: string[] = [];

  // Use backend breakdown if available
  if (raw.rejection_breakdown?.reasons?.length) {
    risks.push(...raw.rejection_breakdown.reasons.slice(0, 3));
  }
  if (raw.rejection_breakdown?.matched_skills?.length) {
    why.push("Matched skills: " + raw.rejection_breakdown.matched_skills.join(", "));
  }
  if (raw.rejection_breakdown?.missing_skills?.length) {
    risks.push("Missing required: " + raw.rejection_breakdown.missing_skills.join(", "));
  }

  // Supplement with computed data
  if (hybrid.mustMatched.length && !why.length)
    why.push("Matches required skills: " + hybrid.mustMatched.join(", "));
  if (hybrid.goodMatched.length)
    why.push("Bonus skills present: " + hybrid.goodMatched.join(", "));
  if ((raw.projects ?? []).length)
    why.push(...(raw.projects as any[]).map((p: any) => `${p.title ?? p.name} — ${p.impact ?? p.description ?? ""}`).slice(0,2));
  if (raw.experience_years >= (jd?.exp_range[0] ?? 0) && jd)
    why.push(`${raw.experience_years}yr experience meets ${jd.exp_range[0]}–${jd.exp_range[1]}yr requirement`);
  if (raw.career_growth)
    why.push("Clear career growth trajectory visible");

  if (hybrid.mustMissed.length && !risks.some(r => r.includes("required")))
    risks.push("Missing required: " + hybrid.mustMissed.join(", "));
  if ((raw.missing_skills ?? []).length)
    risks.push("No evidence of: " + (raw.missing_skills as string[]).slice(0,3).join(", "));
  if ((raw.experience_years ?? 0) < (jd?.exp_range[0] ?? 0) && jd)
    risks.push(`Under-experienced: ${raw.experience_years ?? 0}yr vs ${jd.exp_range[0]}yr minimum`);
  if (!(raw.projects ?? []).length && !risks.some(r => r.includes("project")))
    risks.push("No relevant projects or portfolio evidence");

  const decision   = hybrid.total >= 80 ? "Strong Fit" : hybrid.total >= 60 ? "Partial Fit" : "Weak Fit";
  const confidence = Math.min(95, Math.max(45,
    hybrid.total + (raw.projects?.length ?? 0) * 5 - hybrid.mustMissed.length * 8
  ));

  return {
    decision,
    why:   why.filter(Boolean).slice(0, 4),
    risks: risks.filter(Boolean).slice(0, 3),
    confidence,
  };
}

/* ══════════════════════════════════════════════════════════════════════
   LAYER 6 — DECISION BAND (adaptive top-N, not static threshold)
════════════════════════════════════════════════════════════════════════ */
function getDecisionBand(score: number, rank: number, total: number) {
  const pct = rank / Math.max(total, 1);
  if (pct <= 0.2 && score >= 65) return { band:"Top Candidate", color:"var(--acc)",  bg:"var(--accs)",            icon:"⭐" };
  if (pct <= 0.5 && score >= 55) return { band:"Consider",      color:"var(--blue)", bg:"rgba(96,165,250,.1)",    icon:"◑" };
  return                               { band:"Below Threshold", color:"var(--red)",  bg:"rgba(248,113,113,.08)", icon:"✕" };
}

/* ══════════════════════════════════════════════════════════════════════
   LAYER 7 — FEEDBACK HINTS
════════════════════════════════════════════════════════════════════════ */
function getFeedbackHint(skill: string): string {
  const h: Record<string, string> = {
    "Python":          "Complete Python for Data Science (Coursera / fast.ai)",
    "SQL":             "Practice LeetCode SQL problems, build a portfolio project",
    "Machine Learning":"Andrew Ng ML course → build 2 real projects",
    "Deep Learning":   "fast.ai Practical Deep Learning (free, hands-on)",
    "Docker":          "Docker Getting Started tutorial → containerize one project",
    "AWS":             "AWS Cloud Practitioner → then Solutions Architect Associate",
    "Statistics":      "Khan Academy Statistics → apply to a real dataset",
    "Tableau":         "Tableau Public free training + publish 3 dashboards",
    "MLOps":           "Learn MLflow + deploy one model to production",
    "React":           "Build 3 React projects: todo, weather app, portfolio",
    "System Design":   "Read Designing Data-Intensive Applications + 10 system design videos",
  };
  return h[skill] ?? "Study fundamentals → build a portfolio project demonstrating this skill";
}

function mCol(v: number) {
  return v >= 70 ? "var(--acc)" : v >= 50 ? "var(--amber)" : "var(--red)";
}

/* ══════════════════════════════════════════════════════════════════════
   GLOBAL CSS — injected once, mirrors document 17 exactly
════════════════════════════════════════════════════════════════════════ */
const PANEL_CSS = `
*{box-sizing:border-box;margin:0;padding:0;}

[data-theme="dark"]{
  --bg:#040d0a;--glass:rgba(255,255,255,0.04);--glass2:rgba(255,255,255,0.07);
  --bd:rgba(0,214,143,0.12);--bd2:rgba(0,214,143,0.22);
  --acc:#00d68f;--acc2:#059669;--acc3:#34d399;
  --accs:rgba(0,214,143,0.10);--accg:rgba(0,214,143,0.25);
  --tx:#e2faf1;--tx2:#a7c4b8;--tx3:#5a8a75;
  --red:#f87171;--amber:#fbbf24;--blue:#60a5fa;--purple:#a78bfa;
  --card-bg:rgba(255,255,255,0.04);--card-bd:rgba(0,214,143,0.12);
  --sb-bg:rgba(4,13,10,0.97);--btn-text:#040d0a;
  --rej-bg:rgba(248,113,113,0.05);--rej-bd:rgba(248,113,113,0.2);
  --tog-bg:rgba(0,214,143,0.12);--tog-bd:rgba(0,214,143,0.25);--tog-col:#00d68f;
  --fab-bg:#1a2535;--fab-open:#00d68f;
  --score-hi-bg:rgba(0,214,143,.1);--score-hi:#00d68f;
  --score-mid-bg:rgba(251,191,36,.1);--score-mid:#fbbf24;
  --score-lo-bg:rgba(248,113,113,.1);--score-lo:#f87171;
  --skel-a:rgba(255,255,255,.05);--skel-b:rgba(255,255,255,.1);
}
[data-theme="light"]{
  --bg:#f0faf6;--glass:#ffffff;--glass2:#f4faf7;
  --bd:#c5e8d8;--bd2:#9dd4bb;
  --acc:#059669;--acc2:#047857;--acc3:#34d399;
  --accs:rgba(5,150,105,0.08);--accg:rgba(5,150,105,0.2);
  --tx:#0d2b1e;--tx2:#2d5a42;--tx3:#6b9e85;
  --red:#dc2626;--amber:#d97706;--blue:#2563eb;--purple:#7c3aed;
  --card-bg:#ffffff;--card-bd:#c5e8d8;
  --sb-bg:#ffffff;--btn-text:#ffffff;
  --rej-bg:rgba(220,38,38,0.04);--rej-bd:rgba(220,38,38,0.18);
  --tog-bg:rgba(5,150,105,0.1);--tog-bd:rgba(5,150,105,0.25);--tog-col:#059669;
  --fab-bg:#1a2535;--fab-open:#059669;
  --score-hi-bg:#ecfdf5;--score-hi:#059669;
  --score-mid-bg:#fffbeb;--score-mid:#d97706;
  --score-lo-bg:#fef2f2;--score-lo:#dc2626;
  --skel-a:#e2e8f0;--skel-b:#cbd5e1;
}
:root{--serif:'DM Serif Display',Georgia,serif;--sans:'Inter',system-ui,sans-serif;}

html,body{height:100%;background:var(--bg);color:var(--tx);font-family:var(--sans);overflow:hidden;transition:background .35s,color .35s;}

[data-theme="dark"] body::before{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(0,214,143,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,214,143,.025) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;z-index:0;}
[data-theme="dark"] body::after{content:'';position:fixed;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(0,214,143,.05) 0%,transparent 70%);top:-100px;right:-100px;pointer-events:none;z-index:0;animation:orb 9s ease-in-out infinite alternate;}
[data-theme="light"] body::before,[data-theme="light"] body::after{display:none;}
@keyframes orb{from{transform:scale(.9);opacity:.6;}to{transform:scale(1.1);opacity:1;}}
@keyframes pdot{0%,100%{opacity:1;}50%{opacity:.4;}}
@keyframes fup{to{opacity:1;transform:translateY(0);}}
@keyframes npii{from{opacity:0;transform:translateX(-8px);}to{opacity:1;transform:translateX(0);}}
@keyframes cs-skel-shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}

.shell{display:flex;height:100vh;position:relative;z-index:1;}

/* ── SIDEBAR ── */
.sb{width:285px;flex-shrink:0;background:var(--sb-bg);border-right:1px solid var(--card-bd);display:flex;flex-direction:column;height:100vh;overflow:hidden;backdrop-filter:blur(20px);transition:background .35s,border-color .35s;box-shadow:2px 0 20px rgba(0,0,0,.15);}
.sb-hdr{padding:1rem 1rem .75rem;border-bottom:1px solid var(--card-bd);transition:border-color .35s;}
.sb-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:.75rem;}
.sb-title{font-family:var(--serif);font-size:1.05rem;color:var(--tx);transition:color .35s;}
.sb-cnt{font-size:.65rem;font-weight:600;color:var(--tx3);background:var(--glass2);border:1px solid var(--card-bd);padding:.18rem .55rem;border-radius:999px;transition:all .35s;}
.sb-search{display:flex;align-items:center;gap:6px;background:var(--glass2);border:1px solid var(--card-bd);border-radius:9px;padding:.4rem .78rem;margin-bottom:.55rem;transition:border-color .2s,background .35s;}
.sb-search:focus-within{border-color:var(--acc);}
.sb-search svg{width:14px;height:14px;stroke:var(--tx3);fill:none;stroke-width:2;flex-shrink:0;}
.sb-search input{background:none;border:none;outline:none;font-family:var(--sans);font-size:.72rem;color:var(--tx);width:100%;}
.sb-search input::placeholder{color:var(--tx3);}
.sb-job-wrap{margin-bottom:.55rem;position:relative;}
.sb-job-sel{width:100%;background:var(--glass2);border:1px solid var(--card-bd);color:var(--tx2);font-family:var(--sans);font-size:.72rem;padding:.36rem 2rem .36rem .72rem;border-radius:8px;outline:none;cursor:pointer;appearance:none;-webkit-appearance:none;transition:all .2s;}
.sb-job-sel:focus{border-color:var(--acc);}
.sb-job-arrow{position:absolute;right:.58rem;top:50%;transform:translateY(-50%);pointer-events:none;font-size:.58rem;color:var(--tx3);}
.sb-filter{display:flex;gap:4px;overflow-x:auto;padding-bottom:.5rem;scrollbar-width:none;}
.sb-filter::-webkit-scrollbar{display:none;}
.ftab{flex-shrink:0;font-size:.61rem;font-weight:600;padding:.2rem .58rem;border-radius:999px;cursor:pointer;border:1px solid var(--card-bd);background:transparent;color:var(--tx3);transition:all .13s;font-family:var(--sans);white-space:nowrap;}
.ftab:hover{border-color:var(--acc);color:var(--acc);}
.ftab.on{background:var(--acc);color:var(--btn-text);border-color:var(--acc);}
.sb-sort{padding:.45rem 1rem;border-bottom:1px solid var(--card-bd);display:flex;align-items:center;justify-content:space-between;transition:border-color .35s;}
.sb-sort-wrap{position:relative;}
.sort-lbl{font-size:.62rem;color:var(--tx3);transition:color .35s;}
.sort-sel{background:var(--glass2);border:1px solid var(--card-bd);color:var(--tx2);font-family:var(--sans);font-size:.62rem;padding:.28rem 1.8rem .28rem .6rem;border-radius:7px;outline:none;cursor:pointer;appearance:none;-webkit-appearance:none;transition:all .2s;}
.sort-sel:focus{border-color:var(--acc);}
.sort-arrow{position:absolute;right:.5rem;top:50%;transform:translateY(-50%);pointer-events:none;font-size:.55rem;color:var(--tx3);}
.cand-list{flex:1;overflow-y:auto;padding:.35rem .45rem;}
.cand-list::-webkit-scrollbar{width:3px;}
.cand-list::-webkit-scrollbar-thumb{background:var(--bd2);border-radius:3px;}
/* CandidateCard (Candidatecard.tsx) */
.cs-cc{display:flex;align-items:flex-start;gap:10px;padding:.62rem .68rem;border-radius:10px;cursor:pointer;transition:background .12s;border:1px solid transparent;margin-bottom:2px;}
.cs-cc:hover{background:var(--glass2);}
.cs-cc.cs-cc--on{background:var(--accs);border-color:var(--bd2);}
.cs-cc__av{width:38px;height:38px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.62rem;font-weight:700;}
.cs-cc__body{flex:1;min-width:0;}
.cs-cc__nm{font-size:.77rem;font-weight:600;color:var(--tx);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:color .35s;}
.cs-cc__email{font-size:.61rem;color:var(--tx3);margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.cs-cc__role{font-size:.59rem;color:var(--tx3);margin-top:2px;}
.cs-cc__meta{display:flex;align-items:center;gap:5px;margin-top:4px;}
.cs-cc__right{flex-shrink:0;display:flex;flex-direction:column;align-items:flex-end;gap:3px;}
.cs-cc__score{font-size:.77rem;font-weight:700;padding:.18rem .52rem;border-radius:6px;min-width:34px;text-align:center;}
.cs-cc__score--hi{background:var(--score-hi-bg);color:var(--score-hi);}
.cs-cc__score--mid{background:var(--score-mid-bg);color:var(--score-mid);}
.cs-cc__score--lo{background:var(--score-lo-bg);color:var(--score-lo);}
.cs-cc__denom{font-size:.58rem;color:var(--tx3);}
/* Status pills (STATUS_MAP) */
.cs-pill{display:inline-flex;align-items:center;gap:3px;font-size:.59rem;font-weight:600;padding:.13rem .48rem;border-radius:999px;white-space:nowrap;}
.pill-shortlisted{background:rgba(59,130,246,.12);color:#60a5fa;}
[data-theme="light"] .pill-shortlisted{background:#eff6ff;color:#2563eb;}
.pill-assessment{background:rgba(251,191,36,.1);color:#fbbf24;}
[data-theme="light"] .pill-assessment{background:#fffbeb;color:#d97706;}
.pill-assessed{background:rgba(45,212,191,.1);color:#2dd4bf;}
[data-theme="light"] .pill-assessed{background:#f0fdfa;color:#0d9488;}
.pill-interview{background:rgba(167,139,250,.1);color:#a78bfa;}
[data-theme="light"] .pill-interview{background:#f5f3ff;color:#7c3aed;}
.pill-hired{background:rgba(0,214,143,.1);color:#00d68f;}
[data-theme="light"] .pill-hired{background:#f0fdf4;color:#16a34a;}
.pill-rejected{background:rgba(248,113,113,.1);color:#f87171;}
[data-theme="light"] .pill-rejected{background:#fef2f2;color:#dc2626;}
.pill-applied{background:rgba(255,255,255,.06);color:#5a8a75;}
[data-theme="light"] .pill-applied{background:#f1f5f9;color:#64748b;}
/* CandidateListSkeleton (candidates_Skeleton.tsx) */
.cs-skel{background:linear-gradient(90deg,var(--skel-a) 25%,var(--skel-b) 50%,var(--skel-a) 75%);background-size:400px 100%;animation:cs-skel-shimmer 1.3s infinite linear;border-radius:6px;}
.cs-skel-item{display:flex;align-items:flex-start;gap:10px;padding:.62rem .68rem;border-radius:10px;background:var(--glass);border:1px solid var(--card-bd);margin-bottom:2px;}

/* ── THEME TOGGLE (sidebar bottom) ── */
.sb-theme{padding:.8rem 1rem;border-top:1px solid var(--card-bd);display:flex;align-items:center;gap:9px;cursor:pointer;transition:background .2s,border-color .35s;flex-shrink:0;}
.sb-theme:hover{background:var(--glass2);}
.tog-icon{font-size:.95rem;flex-shrink:0;transition:transform .4s;}
.tog-label-txt{flex:1;font-size:.75rem;font-weight:600;color:var(--tx2);transition:color .35s;}
.tog-track{width:38px;height:20px;border-radius:999px;background:var(--tog-bg);border:1px solid var(--tog-bd);position:relative;flex-shrink:0;transition:background .35s,border-color .35s;}
.tog-thumb{position:absolute;top:3px;left:3px;width:12px;height:12px;border-radius:50%;background:var(--tog-col);transition:transform .28s cubic-bezier(.4,0,.2,1),background .35s;box-shadow:0 0 6px var(--accg);}
[data-theme="light"] .tog-thumb{transform:translateX(18px);}

/* ── MAIN ── */
.main{flex:1;overflow-y:auto;min-width:0;transition:background .35s;}
.main::-webkit-scrollbar{width:4px;}
.main::-webkit-scrollbar-thumb{background:var(--bd2);border-radius:4px;}
.detail{padding:2rem 2.2rem;max-width:860px;}

.page-topbar{display:flex;align-items:center;justify-content:space-between;padding:1.4rem 2.2rem 0;opacity:0;transform:translateY(10px);animation:fup .4s ease .02s forwards;}
.page-title{font-family:var(--serif);font-size:1.55rem;color:var(--tx);transition:color .35s;}
.page-btns{display:flex;align-items:center;gap:.6rem;}
.btn-export{background:var(--glass2);color:var(--tx2);font-family:var(--sans);font-size:.76rem;font-weight:600;padding:.44rem .9rem;border-radius:8px;border:1px solid var(--card-bd);cursor:pointer;display:flex;align-items:center;gap:6px;transition:all .2s;}
.btn-export:hover{border-color:var(--acc);color:var(--acc);}
.btn-add{background:var(--acc);color:var(--btn-text);font-family:var(--sans);font-size:.76rem;font-weight:700;padding:.44rem .9rem;border-radius:8px;border:none;cursor:pointer;display:flex;align-items:center;gap:6px;box-shadow:0 0 14px var(--accg);transition:all .2s;}
.btn-add:hover{background:var(--acc3);box-shadow:0 0 22px var(--accg);transform:translateY(-1px);}
.btn-refresh{width:34px;height:34px;border-radius:8px;background:var(--glass2);border:1px solid var(--card-bd);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:.85rem;color:var(--tx3);transition:all .2s;}
.btn-refresh:hover{border-color:var(--acc);color:var(--acc);}

/* ── DETAIL SECTIONS ── */
.c-hdr{display:flex;align-items:flex-start;gap:16px;margin-bottom:1.5rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .05s forwards;}
.big-av{width:58px;height:58px;border-radius:15px;display:flex;align-items:center;justify-content:center;font-family:var(--serif);font-size:1.1rem;font-weight:700;flex-shrink:0;}
.c-hdr-nm{font-family:var(--serif);font-size:1.7rem;line-height:1.1;margin-bottom:.2rem;color:var(--tx);transition:color .35s;}
.c-hdr-pos{font-size:.8rem;color:var(--tx2);margin-bottom:.4rem;transition:color .35s;}
.status-pill{display:inline-flex;align-items:center;gap:5px;font-size:.67rem;font-weight:700;padding:.2rem .65rem;border-radius:999px;}
.status-pill.rej{background:rgba(248,113,113,.1);color:var(--red);border:1px solid rgba(248,113,113,.2);}
.status-pill.act{background:var(--accs);color:var(--acc);border:1px solid var(--bd);}

.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:1.4rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .1s forwards;}
.ibox{background:var(--card-bg);border:1px solid var(--card-bd);border-radius:12px;padding:.85rem 1rem;backdrop-filter:blur(12px);transition:background .35s,border-color .35s;}
.ilbl{font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--tx3);margin-bottom:.3rem;transition:color .35s;}
.ival{font-size:.8rem;color:var(--tx);font-weight:500;transition:color .35s;}
.ival a{color:var(--acc);text-decoration:none;}
.ival a:hover{text-decoration:underline;}
.ival.empty{color:var(--tx3);}

.rej-box{background:var(--rej-bg);border:1px solid var(--rej-bd);border-radius:14px;padding:1.1rem 1.2rem;margin-bottom:1.4rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .15s forwards;transition:background .35s,border-color .35s;}
.rej-hdr{display:flex;align-items:center;gap:8px;font-size:.82rem;font-weight:700;color:var(--red);margin-bottom:.75rem;}
.rej-main{font-size:.78rem;font-weight:600;color:var(--red);margin-bottom:.55rem;display:flex;align-items:center;gap:7px;}
.rej-point{font-size:.73rem;color:#fca5a5;margin-bottom:.28rem;padding-left:1.1rem;position:relative;}
[data-theme="light"] .rej-point{color:#b91c1c;}
.rej-point::before{content:'•';position:absolute;left:0;color:var(--red);}
.ats-divider{height:1px;background:rgba(248,113,113,.15);margin:.9rem 0 .8rem;}
.ats-row{display:flex;align-items:center;justify-content:space-between;}
.ats-lbl{font-size:.72rem;color:var(--tx3);}
.ats-min{font-size:.65rem;color:var(--amber);margin-top:.2rem;display:flex;align-items:center;gap:5px;}
.ats-val{font-size:.88rem;font-weight:700;color:var(--red);}

.score-card{background:var(--card-bg);border:1px solid var(--card-bd);border-radius:14px;padding:1.2rem;margin-bottom:1.4rem;backdrop-filter:blur(12px);opacity:0;transform:translateY(14px);animation:fup .4s ease .2s forwards;transition:background .35s,border-color .35s;}
.score-card-hdr{font-size:.8rem;font-weight:700;color:var(--tx);margin-bottom:1rem;transition:color .35s;}
.score-dot{width:9px;height:9px;border-radius:50%;animation:pdot 1.5s infinite;flex-shrink:0;}
.score-overall{font-family:var(--serif);font-size:2.4rem;font-weight:700;line-height:1;}
.score-sub{font-size:.88rem;font-weight:700;margin-top:.3rem;letter-spacing:.01em;transition:color .35s;}
.score-rows{display:flex;flex-direction:column;gap:.55rem;}
.srow{display:flex;align-items:center;gap:10px;}
.srow-lbl{font-size:.76rem;font-weight:500;color:var(--tx2);width:140px;flex-shrink:0;transition:color .35s;}
.srow-bar{flex:1;height:5px;border-radius:3px;background:var(--glass2);overflow:hidden;transition:background .35s;}
.srow-fill{height:100%;border-radius:3px;transition:width 1.2s cubic-bezier(.4,0,.2,1);}
.srow-val{font-size:.75rem;font-weight:700;color:var(--tx);width:28px;text-align:right;transition:color .35s;}

.timeline-card{background:var(--card-bg);border:1px solid var(--card-bd);border-radius:14px;padding:1.2rem;margin-bottom:1.4rem;backdrop-filter:blur(12px);opacity:0;transform:translateY(14px);animation:fup .4s ease .25s forwards;transition:background .35s,border-color .35s;}
.tc-hdr{font-size:.8rem;font-weight:700;color:var(--tx);margin-bottom:1.1rem;transition:color .35s;}
.tl-wrap{position:relative;}
.tl-wrap::before{content:'';position:absolute;left:13px;top:10px;bottom:10px;width:1px;background:var(--card-bd);transition:background .35s;}
.tl-item{display:flex;align-items:flex-start;gap:12px;margin-bottom:.85rem;position:relative;}
.tl-item:last-child{margin-bottom:0;}
.tl-dot{width:27px;height:27px;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.7rem;z-index:1;transition:background .35s,border-color .35s;}
.tl-dot.comp{background:rgba(0,214,143,.1);border:1px solid rgba(0,214,143,.25);color:var(--acc);}
.tl-dot.pend{background:var(--glass2);border:1px solid var(--card-bd);color:var(--tx3);}
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

.addl-card{background:var(--card-bg);border:1px solid var(--card-bd);border-radius:14px;overflow:hidden;backdrop-filter:blur(12px);margin-bottom:2rem;opacity:0;transform:translateY(14px);animation:fup .4s ease .4s forwards;transition:background .35s,border-color .35s;}
.addl-row{display:flex;align-items:center;justify-content:space-between;padding:.75rem 1.1rem;border-bottom:1px solid var(--bd);font-size:.78rem;transition:border-color .35s;}
.addl-row:last-child{border-bottom:none;}
.addl-key{color:var(--tx3);transition:color .35s;}
.addl-val{font-weight:600;color:var(--tx);transition:color .35s;}
.addl-val.rej{color:var(--red);}

/* ── DRAGGABLE FAB ── */
.fab{position:fixed;width:46px;height:46px;border-radius:13px;background:var(--fab-bg);border:1px solid rgba(255,255,255,.12);box-shadow:0 6px 24px rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;cursor:grab;z-index:9999;user-select:none;touch-action:none;transition:box-shadow .2s,border-color .2s,background .25s;}
.fab:active{cursor:grabbing;}
.fab:hover{border-color:rgba(0,214,143,.4);box-shadow:0 6px 28px rgba(0,0,0,.6),0 0 0 1px rgba(0,214,143,.2);}
.fab.open{background:var(--fab-open);border-color:var(--fab-open);box-shadow:0 6px 28px var(--accg);}
.fab svg{pointer-events:none;transition:transform .3s ease;}
.fab.open svg{transform:rotate(180deg);}
.fab-tip{position:fixed;background:#0f1f16;border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:.3rem .65rem;font-size:.68rem;font-weight:500;color:rgba(255,255,255,.65);white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .18s;box-shadow:0 4px 14px rgba(0,0,0,.4);z-index:9998;}
.fab:hover:not(.open) ~ .fab-tip{opacity:1;}
.fab-bd{position:fixed;inset:0;z-index:9996;display:none;}
.fab-bd.show{display:block;}

/* ── NAV PANEL (always dark style) ── */
.nav-panel{position:fixed;width:262px;background:#0a1810;border:1px solid rgba(0,214,143,.15);border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.65),0 0 0 1px rgba(0,214,143,.04);z-index:9997;overflow:hidden;opacity:0;pointer-events:none;transform:scale(.93);transition:all .26s cubic-bezier(.4,0,.2,1);font-family:var(--sans);}
.nav-panel.show{opacity:1;pointer-events:all;transform:scale(1);}
.np-hdr{padding:.85rem 1rem .7rem;border-bottom:1px solid rgba(0,214,143,.08);display:flex;align-items:center;justify-content:space-between;}
.np-title{font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(0,214,143,.3);}
.np-x{width:21px;height:21px;border-radius:6px;background:rgba(255,255,255,.05);border:none;color:rgba(255,255,255,.35);font-size:.7rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;font-family:var(--sans);}
.np-x:hover{background:rgba(255,255,255,.1);color:#fff;}
.np-curr{margin:.6rem .8rem .35rem;background:rgba(0,214,143,.08);border:1px solid rgba(0,214,143,.18);border-radius:8px;padding:.48rem .72rem;display:flex;align-items:center;justify-content:space-between;}
.np-cdot{width:7px;height:7px;border-radius:50%;background:#00d68f;animation:pdot 1.5s infinite;flex-shrink:0;}
.np-clbl{font-size:.6rem;color:rgba(255,255,255,.38);margin-bottom:.08rem;}
.np-cnm{font-size:.77rem;font-weight:600;color:#00d68f;}
.np-sec{font-size:.57rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(0,214,143,.22);padding:.6rem .85rem .22rem;}
.np-item{display:flex;align-items:center;gap:9px;padding:.52rem .85rem;margin:1px .45rem;border-radius:9px;cursor:pointer;transition:all .13s;text-decoration:none;position:relative;}
.np-item:hover{background:rgba(255,255,255,.06);}
.np-item.nact{background:rgba(0,214,143,.1);}
.np-item.nact::before{content:'';position:absolute;left:-1px;top:50%;transform:translateY(-50%);width:3px;height:62%;border-radius:0 2px 2px 0;background:#00d68f;box-shadow:0 0 7px #00d68f;}
.np-ic{width:29px;height:29px;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.88rem;transition:background .15s;}
.np-item.nact .np-ic{background:rgba(0,214,143,.12);}
.np-item:hover .np-ic{background:rgba(255,255,255,.06);}
.np-nm{font-size:.77rem;font-weight:500;color:rgba(255,255,255,.65);}
.np-item.nact .np-nm{color:#e2faf1;font-weight:600;}
.np-sub{font-size:.62rem;color:rgba(255,255,255,.24);}
.np-bdg{margin-left:auto;flex-shrink:0;background:#00d68f;color:#040d0a;font-size:.56rem;font-weight:700;padding:.08rem .4rem;border-radius:999px;}
.np-ai{margin-left:auto;flex-shrink:0;font-size:.52rem;font-weight:700;background:rgba(0,214,143,.1);color:#00d68f;border:1px solid rgba(0,214,143,.2);padding:.08rem .36rem;border-radius:999px;}
.np-div{height:1px;background:rgba(0,214,143,.08);margin:.38rem .8rem;}

/* Theme toggle row inside nav panel */
.np-tog-row{margin:.45rem .8rem .8rem;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:.55rem .72rem;display:flex;align-items:center;justify-content:space-between;cursor:pointer;transition:background .2s;}
.np-tog-row:hover{background:rgba(255,255,255,.07);}
.np-tog-lbl{font-size:.7rem;color:rgba(255,255,255,.45);display:flex;align-items:center;gap:6px;}
.np-tog-switch{display:flex;align-items:center;gap:5px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:999px;padding:.18rem .18rem .18rem .55rem;}
.np-inner-lbl{font-size:.58rem;font-weight:700;color:rgba(255,255,255,.4);min-width:26px;transition:color .2s;}
.np-trk{width:26px;height:14px;border-radius:999px;background:rgba(0,214,143,.2);position:relative;}
.np-thumb{position:absolute;top:2px;left:2px;width:10px;height:10px;border-radius:50%;background:#00d68f;transition:all .25s cubic-bezier(.4,0,.2,1);box-shadow:0 0 5px rgba(0,214,143,.5);}
.np-tog-row.light .np-thumb{transform:translateX(12px);}
.np-tog-row.light .np-inner-lbl{color:rgba(255,255,255,.65);}

.nav-panel.show .np-item{animation:npii .22s ease both;}
.nav-panel.show .np-item:nth-child(1){animation-delay:.03s;}
.nav-panel.show .np-item:nth-child(2){animation-delay:.06s;}
.nav-panel.show .np-item:nth-child(3){animation-delay:.09s;}
.nav-panel.show .np-item:nth-child(4){animation-delay:.12s;}
.nav-panel.show .np-item:nth-child(5){animation-delay:.15s;}
.nav-panel.show .np-item:nth-child(6){animation-delay:.18s;}
.nav-panel.show .np-item:nth-child(7){animation-delay:.21s;}

@media(max-width:900px){.sb{width:240px;}.info-grid{grid-template-columns:1fr;}}
@media(max-width:660px){.shell{flex-direction:column;}.sb{width:100%;height:auto;max-height:280px;}.main{flex:1;overflow-y:auto;}.detail{padding:1rem;}.page-topbar{padding:1rem 1rem 0;}}

/* ══ FilterBar.tsx — Red Flags + Top 10 filter chips ══ */
.cs-cc--flagged{border-color:rgba(248,113,113,.25) !important;}
.cs-cc--flagged:hover{background:rgba(248,113,113,.05);}
.cs-cc__nm-row{display:flex;align-items:center;gap:4px;}
.cs-cc__flag{font-size:.7rem;flex-shrink:0;cursor:help;}
.cs-cc__rank{font-size:.55rem;font-weight:700;background:rgba(251,191,36,.15);color:var(--amber);border:1px solid rgba(251,191,36,.3);padding:.08rem .38rem;border-radius:999px;flex-shrink:0;}
.cs-cc__match-pill{font-size:.55rem !important;padding:.08rem .38rem !important;}
.cs-cc__match--strong{background:rgba(0,214,143,.1);color:var(--acc);border:1px solid rgba(0,214,143,.2);}
.cs-cc__match--partial{background:rgba(251,191,36,.1);color:var(--amber);border:1px solid rgba(251,191,36,.2);}
.cs-cc__match--weak{background:rgba(248,113,113,.1);color:var(--red);border:1px solid rgba(248,113,113,.2);}
.cs-cc__flags-row{display:flex;flex-wrap:wrap;gap:3px;margin-top:3px;}
.cs-cc__flag-tag{font-size:.54rem;font-weight:600;background:rgba(248,113,113,.1);color:var(--red);border:1px solid rgba(248,113,113,.2);padding:.06rem .35rem;border-radius:5px;}
.ftab--danger.on{background:var(--red) !important;border-color:var(--red) !important;color:#fff !important;}
.ftab--danger:hover{border-color:var(--red) !important;color:var(--red) !important;}
.ftab--star.on{background:var(--amber) !important;border-color:var(--amber) !important;color:#0a2e1e !important;}
.ftab--star:hover{border-color:var(--amber) !important;color:var(--amber) !important;}

/* ══ CONTEXTUAL FILTER BANNERS (Top 10 / Red Flags) ══ */
.filter-banner{
  display:flex;align-items:flex-start;gap:8px;
  padding:.6rem .8rem;margin:.3rem .45rem .35rem;
  border-radius:9px;font-size:.68rem;
}
.filter-banner--gold{
  background:rgba(251,191,36,.08);
  border:1px solid rgba(251,191,36,.25);
}
.filter-banner--red{
  background:rgba(248,113,113,.07);
  border:1px solid rgba(248,113,113,.22);
}
.fb-title{font-weight:700;color:var(--tx);font-size:.72rem;margin-bottom:.1rem;transition:color .35s;}
.fb-sub{font-size:.6rem;color:var(--tx3);transition:color .35s;}

/* ATS Matrix panel */
.ats-matrix{background:var(--rej-bg);border:1px solid var(--rej-bd);border-radius:14px;padding:1.15rem 1.2rem;margin-bottom:1.4rem;transition:background .35s,border-color .35s;}
.ats-mx-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:.9rem;}
.ats-mx-title{font-size:.82rem;font-weight:700;color:var(--red);}
.ats-mx-score{font-family:var(--serif);font-size:1.9rem;font-weight:700;color:var(--red);}
.ats-mx-sub{font-size:.58rem;color:var(--tx3);text-align:right;margin-top:.1rem;transition:color .35s;}
.ats-row-item{display:flex;align-items:center;gap:8px;margin-bottom:.48rem;}
.ats-row-label{font-size:.71rem;color:var(--tx2);width:130px;flex-shrink:0;transition:color .35s;}
.ats-row-bar-wrap{flex:1;height:7px;background:rgba(248,113,113,.12);border-radius:4px;overflow:hidden;}
.ats-row-bar-fill{height:100%;border-radius:4px;transition:width 1.1s cubic-bezier(.4,0,.2,1);}
.ats-row-val{font-size:.71rem;font-weight:700;width:26px;text-align:right;flex-shrink:0;}
.ats-row-wt{font-size:.58rem;color:var(--tx3);width:40px;text-align:right;flex-shrink:0;transition:color .35s;}
/* keyword tags */
.kw-sec{margin-bottom:.75rem;}
.kw-sec-lbl{font-size:.62rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.4rem;}
.kw-sec-lbl.miss{color:var(--red);}
.kw-sec-lbl.has{color:var(--acc);}
.kw-tags{display:flex;flex-wrap:wrap;gap:5px;}
.kw-tag{font-size:.65rem;font-weight:600;padding:.2rem .52rem;border-radius:5px;}
.kw-tag-miss{background:rgba(248,113,113,.1);color:var(--red);border:1px solid rgba(248,113,113,.22);}
.kw-tag-has{background:var(--accs);color:var(--acc);border:1px solid rgba(0,214,143,.2);}
[data-theme="light"] .kw-tag-miss{background:#fef2f2;color:#dc2626;border-color:#fecaca;}
[data-theme="light"] .kw-tag-has{background:#ecfdf5;color:#059669;border-color:#bbf7d0;}
/* format issues */
.fmt-issue{display:flex;align-items:flex-start;gap:7px;font-size:.72rem;color:var(--tx2);margin-bottom:.3rem;padding:.26rem .5rem;background:rgba(248,113,113,.06);border-radius:6px;border-left:2px solid var(--red);transition:color .35s;}
/* selection box */
.sel-box{background:rgba(0,214,143,.05);border:1px solid rgba(0,214,143,.2);border-radius:14px;padding:1.15rem 1.2rem;margin-bottom:1.4rem;transition:all .35s;}
[data-theme="light"] .sel-box{background:#f0fdf4;border-color:#bbf7d0;}
.sel-box-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:.85rem;}
.sel-box-title{font-size:.82rem;font-weight:700;color:var(--acc);}
.sel-score-badge{font-size:.7rem;font-weight:700;background:var(--accs);color:var(--acc);border:1px solid rgba(0,214,143,.3);padding:.22rem .65rem;border-radius:999px;}
.sel-point{display:flex;align-items:flex-start;gap:7px;font-size:.74rem;color:var(--tx2);margin-bottom:.3rem;padding:.28rem .52rem;background:rgba(0,214,143,.06);border-radius:6px;border-left:2px solid var(--acc);line-height:1.45;transition:color .35s;}

/* ══ LAYER 4: REASONING PANEL ══ */
.intel-band{border:1px solid;border-radius:11px;padding:.8rem 1rem;margin-bottom:1.2rem;display:flex;align-items:center;justify-content:space-between;}
.reason-card{background:var(--card-bg);border:1px solid var(--card-bd);border-radius:14px;padding:1.1rem 1.2rem;margin-bottom:1.4rem;backdrop-filter:blur(12px);transition:background .35s,border-color .35s;}
[data-theme="light"] .reason-card{background:#fff;}
.reason-hdr{display:flex;align-items:center;justify-content:space-between;font-size:.82rem;font-weight:700;color:var(--tx);margin-bottom:.9rem;transition:color .35s;}
.reason-conf-badge{font-size:.62rem;font-weight:700;padding:.2rem .58rem;border-radius:999px;}
.reason-section{margin-bottom:.75rem;}
.reason-section-lbl{font-size:.63rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.4rem;}
.reason-section-lbl--good{color:var(--acc);}
.reason-section-lbl--risk{color:var(--red);}
.reason-item{font-size:.74rem;padding:.28rem .6rem;border-radius:6px;margin-bottom:.25rem;display:flex;align-items:flex-start;gap:5px;line-height:1.45;}
.reason-item--good{background:var(--accs);color:var(--tx2);border-left:2px solid var(--acc);}
.reason-item--risk{background:rgba(248,113,113,.06);color:var(--tx2);border-left:2px solid var(--red);}

/* ══ SKILL TAGS ══ */
.sk-tag{font-size:.64rem;font-weight:600;padding:.2rem .55rem;border-radius:6px;display:inline-flex;align-items:center;}
.sk-tag--match{background:var(--accs);color:var(--acc);border:1px solid rgba(0,214,143,.25);}
.sk-tag--miss{background:rgba(248,113,113,.08);color:var(--red);border:1px solid rgba(248,113,113,.2);}
.sk-tag--bonus{background:rgba(96,165,250,.08);color:var(--blue);border:1px solid rgba(96,165,250,.2);}

/* ══ LAYER 5: RANKING PANEL ══ */
.rank-card{background:var(--card-bg);border:1px solid var(--card-bd);border-radius:14px;padding:1.1rem 1.2rem;margin-bottom:1.4rem;backdrop-filter:blur(12px);transition:background .35s,border-color .35s;}
[data-theme="light"] .rank-card{background:#fff;}
.rank-hdr{font-size:.82rem;font-weight:700;color:var(--tx);margin-bottom:.85rem;transition:color .35s;}
.rank-row{display:flex;align-items:center;gap:8px;padding:.38rem .5rem;border-radius:7px;margin-bottom:.25rem;transition:background .15s;}
.rank-row:hover{background:var(--glass2);}
.rank-row--this{background:var(--accs);border:1px solid var(--bd);}
.rank-pos{font-size:.72rem;font-weight:800;width:24px;text-align:center;flex-shrink:0;}
.rank-av{width:24px;height:24px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:.55rem;font-weight:700;flex-shrink:0;}
.rank-nm{font-size:.74rem;font-weight:500;color:var(--tx2);width:130px;flex-shrink:0;transition:color .35s;}
.rank-nm--this{font-weight:700;color:var(--acc);}
.rank-bar-wrap{flex:1;height:5px;background:var(--glass2);border-radius:3px;overflow:hidden;}
.rank-bar-fill{height:100%;border-radius:3px;transition:width 1s ease .2s;}
.rank-sc{font-size:.7rem;font-weight:700;color:var(--tx);width:24px;text-align:right;flex-shrink:0;transition:color .35s;}

/* ══ LAYER 7: FEEDBACK PANEL ══ */
.feedback-card{background:var(--card-bg);border:1px solid var(--card-bd);border-radius:14px;padding:1.1rem 1.2rem;margin-bottom:1.4rem;backdrop-filter:blur(12px);transition:background .35s,border-color .35s;}
[data-theme="light"] .feedback-card{background:#fff;}
.feedback-hdr{font-size:.82rem;font-weight:700;color:var(--tx);margin-bottom:.5rem;transition:color .35s;}
.feedback-item{display:flex;align-items:flex-start;gap:9px;padding:.55rem 0;border-bottom:1px solid var(--card-bd);transition:border-color .35s;}
.feedback-item:last-child{border-bottom:none;}
.feedback-num{width:20px;height:20px;border-radius:50%;background:rgba(251,191,36,.15);color:var(--amber);font-size:.62rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:.12rem;}
.feedback-skill{font-size:.76rem;font-weight:600;color:var(--tx);margin-bottom:.18rem;transition:color .35s;}
.feedback-hint{font-size:.66rem;color:var(--tx3);line-height:1.45;transition:color .35s;}
`;

/* ══════════════════════════════════════════════════════════════════════
   CandidateDetails — Production-grade 8-Layer Intelligence Panel
   Works with REAL backend data — no static candidate ID dependency.
════════════════════════════════════════════════════════════════════════ */
interface Props {
  candidate: Candidate;
  /** All candidates for the same job — needed for Layer 5 ranking */
  allCandidates?: Candidate[];
  onSendAssessment?: (id: number | string) => void;
  onReject?:         (id: number | string) => void;
}

const CandidateDetails: React.FC<Props> = ({
  candidate: c,
  allCandidates = [],
  onSendAssessment,
  onReject,
}) => {
  if (!c) return null;

  const raw      = c as any;
  const ds       = getDisplayStatus(c);
  const isRej    = ds === "Rejected";
  const rawSc    = raw.ats_score ?? 0;
  const candId   = raw.id;
  const jobId    = Number(raw.job_id ?? 0);
  const jobTitle = raw.job_title ?? "";

  // Get job profile (works with both mock IDs and real backend)
  const jd = getJobProfile(jobId, jobTitle);

  // Layer 3 — Hybrid score
  const hybrid = computeHybridFromCandidate(c, jd);
  const sc     = hybrid.total || rawSc;

  // Layer 4 — Reasoning
  const reason = buildReasoning(c, jd, hybrid);

  // Layer 5 — Ranking (rank within same job)
  const jobCands = allCandidates.filter((x) => String((x as any).job_id) === String(jobId));
  type Ranked = { id: any; score: number; name: string; initials: string; bg: string; col: string };
  const scored: Ranked[] = jobCands
    .map((x) => {
      const xRaw = x as any;
      const av2  = avatarStyle(x.name ?? "");
      return {
        id:       xRaw.id,
        score:    computeHybridFromCandidate(x, jd).total || (xRaw.ats_score ?? 0),
        name:     x.name ?? "—",
        initials: (x.name ?? "?").split(" ").slice(0,2).map((n: string) => n[0]).join("").toUpperCase(),
        bg:       xRaw.bg ?? av2.bg,
        col:      xRaw.col ?? av2.fg,
      };
    })
    .sort((a, b) => b.score - a.score);

  // Ensure current candidate is in list (even if allCandidates empty)
  const myInList = scored.some((s) => String(s.id) === String(candId));
  if (!myInList) {
    const av0 = avatarStyle(c.name ?? "");
    scored.push({ id: candId, score: sc, name: c.name ?? "—",
      initials: (c.name ?? "?").split(" ").slice(0,2).map((n: string) => n[0]).join("").toUpperCase(),
      bg: raw.bg ?? av0.bg, col: raw.col ?? av0.fg });
    scored.sort((a, b) => b.score - a.score);
  }

  const myRank    = scored.findIndex((s) => String(s.id) === String(candId)) + 1;
  const rankTotal = scored.length;

  // Layer 6 — Decision band
  const band = getDecisionBand(sc, myRank, rankTotal);

  // ATS panel data
  const missKws    = raw.missing_keywords ?? raw.missing_skills ?? hybrid.mustMissed ?? [];
  const hasKws     = hybrid.mustMatched.length > 0
    ? hybrid.mustMatched
    : (raw.matched_skills ?? []);
  const fmtRaw     = raw.resume_format;
  const fmtLabel   = fmtRaw === "good" ? "Well formatted" : fmtRaw === "average" ? "Needs improvement" : fmtRaw === "poor" ? "Poorly formatted" : "Format not assessed";
  const fmtColor   = fmtRaw === "good" ? "var(--acc)" : fmtRaw === "average" ? "var(--amber)" : "var(--red)";
  const fmtIssues: string[] = raw.format_issues ?? [];

  const metrics = [
    { lbl:"Keyword Match",     val: hybrid.kwScore,    wt:"35%" },
    { lbl:"Experience Fit",    val: hybrid.exp,        wt:"20%" },
    { lbl:"Resume Format",     val: hybrid.fmtScore,   wt:"20%" },
    { lbl:"Project Relevance", val: hybrid.projScore,  wt:"15%" },
    { lbl:"Career Signal",     val: hybrid.signal,     wt:"10%" },
  ];

  const colAcc   = isRej ? "var(--red)" : sc >= 80 ? "var(--acc)" : sc >= 60 ? "var(--amber)" : "var(--red)";
  const expYears = raw.experience_years ?? raw.exp_years ?? raw.years_of_experience ?? null;

  const stagesDone = {
    applied:     true,
    screened:    true,
    shortlisted: !["Under Review","Rejected"].includes(ds) || ["Shortlisted","Assessment Sent","Assessment In Progress","Assessment Passed","Assessment Failed","Interview Scheduled","Hired"].includes(ds),
    assessment:  ["Assessment Passed","Assessment Failed","Interview Scheduled","Hired"].includes(ds),
    interview:   ["Interview Scheduled","Hired"].includes(ds),
    offer:       ds === "Hired",
  };

  const av  = avatarStyle(c.name ?? "");
  const ini = raw.init ?? (c.name ?? "").split(" ").slice(0,2).map((n: string) => n[0]).join("").toUpperCase();

  // Missing skills for feedback
  const missingForFeedback: string[] = raw.missing_skills ?? hybrid.mustMissed ?? [];

  return (
    <>
      {/* Inject panel CSS once */}
      <style>{PANEL_CSS}</style>

      <div className="c-hdr">
        {/* Avatar */}
        <div
          className="big-av"
          style={{ background: raw.bg ?? av.bg, color: raw.col ?? av.fg, border:`2px solid ${raw.bd ?? "var(--bd)"}` }}
        >
          {ini}
        </div>

        {/* Name + role + badges */}
        <div style={{ flex:1 }}>
          <div className="c-hdr-nm">{c.name}</div>
          <div className="c-hdr-pos">
            {jobTitle
              ? jobTitle.charAt(0).toUpperCase() + jobTitle.slice(1)
              : jd?.title ?? "—"}
            {raw.dept && raw.dept !== "—" ? ` · ${raw.dept}` : ""}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:".4rem", flexWrap:"wrap" }}>
            {isRej
              ? <span className="status-pill rej">⊗ Rejected</span>
              : <span className="status-pill act">
                  <span style={{ width:6, height:6, borderRadius:"50%", background:"var(--acc)", animation:"pdot 1.5s infinite", display:"inline-block" }} />
                  {ds}
                </span>
            }
            <span style={{ fontSize:".64rem", fontWeight:700, padding:".18rem .6rem", borderRadius:999, background:band.bg, color:band.color, border:`1px solid ${band.color}40` }}>
              {band.icon} {band.band}
            </span>
            {reason.confidence > 0 && (
              <span style={{ fontSize:".62rem", color:"var(--tx3)" }}>
                AI confidence:{" "}
                <strong style={{ color: reason.confidence >= 75 ? "var(--acc)" : reason.confidence >= 55 ? "var(--amber)" : "var(--red)" }}>
                  {reason.confidence}%
                </strong>
              </span>
            )}
          </div>
        </div>

        {/* Rank badge */}
        <div style={{ textAlign:"center", flexShrink:0 }}>
          <div style={{ fontFamily:"var(--serif)", fontSize:"1.8rem", fontWeight:700, color: myRank === 1 ? "var(--amber)" : myRank <= 3 ? "var(--acc)" : "var(--tx3)", lineHeight:1 }}>
            #{myRank}
          </div>
          <div style={{ fontSize:".58rem", color:"var(--tx3)", marginTop:".12rem" }}>
            of {rankTotal} for this role
          </div>
        </div>
      </div>

      {/* ── INFO GRID ── */}
      <div className="info-grid">
        <div className="ibox"><div className="ilbl">Email</div><div className="ival"><a href={`mailto:${c.email}`}>{c.email}</a></div></div>
        <div className="ibox"><div className="ilbl">Phone</div><div className={`ival${!raw.phone ? " empty" : ""}`}>{raw.phone || "—"}</div></div>
        <div className="ibox"><div className="ilbl">Applied</div><div className="ival">{fmtDate(raw.processed_date)}</div></div>
        <div className="ibox">
          <div className="ilbl">Experience</div>
          <div className="ival">
            {expYears != null ? `${expYears} year${expYears !== 1 ? "s" : ""}` : "—"}
          </div>
        </div>
      </div>

      {/* ── LAYER 6: DECISION BAND ── */}
      <div className="intel-band" style={{ background:band.bg, borderColor:`${band.color}40` }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:"1.2rem" }}>{band.icon}</span>
          <div>
            <div style={{ fontSize:".82rem", fontWeight:700, color:band.color }}>
              {band.band} — {reason.decision}
            </div>
            <div style={{ fontSize:".65rem", color:"var(--tx3)", marginTop:".1rem" }}>
              Rank #{myRank} of {rankTotal} candidates · {jd?.title ?? jobTitle}
            </div>
          </div>
        </div>
      </div>

      {/* ── ATS SCORE MATRIX (buildATSPanel) ── */}
      {isRej ? (
        /* RED — Why Rejected */
        <div className="ats-matrix">
          <div className="ats-mx-hdr">
            <div className="ats-mx-title">⚠️ Why Rejected — ATS Score Breakdown</div>
            <div style={{ textAlign:"right" }}>
              <div className="ats-mx-score">{hybrid.atsTotal}/100</div>
              <div className="ats-mx-sub">Min. to shortlist: 70 / 100</div>
            </div>
          </div>

          {metrics.map((m) => (
            <div key={m.lbl} className="ats-row-item">
              <span className="ats-row-label">{m.lbl}</span>
              <div className="ats-row-bar-wrap">
                <div className="ats-row-bar-fill" style={{ width:`${m.val}%`, background:mCol(m.val) }} />
              </div>
              <span className="ats-row-val" style={{ color:mCol(m.val) }}>{m.val}</span>
              <span className="ats-row-wt">{m.wt}</span>
            </div>
          ))}

          <div className="ats-divider" />

          {missKws.length > 0 && (
            <div className="kw-sec">
              <div className="kw-sec-lbl miss">✕ Keywords Missing from Resume</div>
              <div className="kw-tags">
                {(missKws as string[]).map((k) => <span key={k} className="kw-tag kw-tag-miss">{k}</span>)}
              </div>
            </div>
          )}
          {hasKws.length > 0 && (
            <div className="kw-sec">
              <div className="kw-sec-lbl has">✓ Keywords Found in Resume</div>
              <div className="kw-tags">
                {(hasKws as string[]).map((k) => <span key={k} className="kw-tag kw-tag-has">{k}</span>)}
              </div>
            </div>
          )}

          <div className="ats-divider" />
          <div className="kw-sec">
            <div className="kw-sec-lbl miss" style={{ marginBottom:".4rem" }}>
              📄 Resume Format: <span style={{ color:fmtColor, fontSize:".7rem" }}>{fmtLabel}</span>
            </div>
            {fmtIssues.length > 0
              ? fmtIssues.map((fi, i) => <div key={i} className="fmt-issue"><span>⚠</span>{fi}</div>)
              : <div className="fmt-issue"><span>ℹ</span>Resume format details not available from backend</div>
            }
          </div>

          <div className="ats-divider" />
          <div className="ats-row">
            <div>
              <div className="ats-lbl">ATS Score</div>
              <div className="ats-min">⚠ Minimum required: 70 / 100 — this candidate scored {hybrid.atsTotal}</div>
            </div>
            <div className="ats-val">{hybrid.atsTotal} / 100</div>
          </div>
        </div>
      ) : (
        /* GREEN — Why Shortlisted */
        <div className="sel-box">
          <div className="sel-box-hdr">
            <div className="sel-box-title">✅ Why Shortlisted — ATS Score Matrix</div>
            <span className="sel-score-badge">{hybrid.atsTotal} / 100</span>
          </div>
          {hasKws.length >= 2 && <div className="sel-point">✓ Required keywords present: {(hasKws as string[]).slice(0,4).join(", ")}</div>}
          {hybrid.exp >= 80 && jd && <div className="sel-point">✓ Experience meets {jd.exp_range[0]}–{jd.exp_range[1]}yr requirement</div>}
          {hybrid.fmtScore >= 70 && <div className="sel-point">✓ Resume format: {fmtLabel} — ATS can parse correctly</div>}
          {(raw.projects ?? []).length > 0 && <div className="sel-point">✓ Projects show applied work: {(raw.projects as any[]).map((p:any) => p.title ?? p.name).join(", ")}</div>}
          {raw.career_growth && <div className="sel-point">✓ Career growth visible — consistent role progression</div>}
          {hybrid.kwScore >= 65 && <div className="sel-point">✓ {hybrid.kwScore}% keyword match with job description</div>}

          <div style={{ marginTop:".8rem" }}>
            <div className="kw-sec-lbl has" style={{ marginBottom:".45rem" }}>📊 Score Breakdown</div>
            {metrics.map((m) => (
              <div key={m.lbl} className="ats-row-item">
                <span className="ats-row-label">{m.lbl}</span>
                <div className="ats-row-bar-wrap" style={{ background:"rgba(0,214,143,.12)" }}>
                  <div className="ats-row-bar-fill" style={{ width:`${m.val}%`, background:mCol(m.val) }} />
                </div>
                <span className="ats-row-val" style={{ color:mCol(m.val) }}>{m.val}</span>
                <span className="ats-row-wt">{m.wt}</span>
              </div>
            ))}
          </div>

          {(missKws as string[]).slice(0,4).length > 0 && (
            <div style={{ marginTop:".7rem" }}>
              <div className="kw-sec-lbl" style={{ color:"var(--amber)", marginBottom:".38rem" }}>⚠ Skill Gaps (manageable — candidate still qualifies)</div>
              <div className="kw-tags">
                {(missKws as string[]).slice(0,4).map((k) => <span key={k} className="kw-tag kw-tag-miss">{k}</span>)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── LAYER 3: HYBRID SCORE BREAKDOWN ── */}
      <div className="score-card">
        <div className="score-card-hdr">🎯 AI Match Score — Hybrid Intelligence</div>
        <div style={{ display:"flex", alignItems:"flex-start", gap:"1.2rem", marginBottom:"1rem", flexWrap:"wrap" }}>
          <div>
            <div className="score-overall" style={{ color:colAcc }}>
              {sc}<span style={{ fontSize:"1rem", fontWeight:400, color:"var(--tx3)" }}>/100</span>
            </div>
            <div className="score-sub" style={{ color: sc >= 80 ? "var(--acc)" : sc >= 60 ? "var(--amber)" : "var(--red)" }}>
              {sc >= 80 ? "✓ Strong Match" : sc >= 60 ? "◑ Good Match" : "✕ Weak Match"}
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:".55rem", flex:1, minWidth:180 }}>
            {([
              ["Skill Match",   hybrid.skill,    "40% weight"],
              ["Semantic Fit",  hybrid.semantic, "30% weight"],
              ["Experience",    hybrid.exp,      "20% weight"],
              ["Career Signal", hybrid.signal,   "10% weight"],
            ] as [string, number, string][]).map(([lbl, val, wt]) => (
              <div key={lbl} style={{ background:"var(--glass2)", border:"1px solid var(--card-bd)", borderRadius:8, padding:".5rem .65rem" }}>
                <div style={{ fontSize:".58rem", fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"var(--tx3)", marginBottom:".2rem" }}>{lbl}</div>
                <div style={{ fontSize:"1.1rem", fontWeight:700, fontFamily:"var(--serif)", color: val >= 75 ? "var(--acc)" : val >= 55 ? "var(--amber)" : "var(--red)" }}>{val}</div>
                <div style={{ fontSize:".55rem", color:"var(--tx3)" }}>{wt}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="score-rows">
          {([
            ["Technical Skills",     Math.min(100, Math.round(hybrid.skill * 1.05))],
            ["Domain Knowledge",     Math.min(100, Math.round(hybrid.semantic * 0.95))],
            ["Project Relevance",    Math.min(100, hybrid.semantic)],
            ["Experience Alignment", Math.min(100, hybrid.exp)],
            ["Growth Trajectory",    Math.min(100, hybrid.signal)],
          ] as [string, number][]).map(([l, v]) => (
            <div key={l} className="srow">
              <span className="srow-lbl">{l}</span>
              <div className="srow-bar">
                <div className="srow-fill" style={{ width:`${v}%`, background: v >= 75 ? "var(--acc)" : v >= 55 ? "var(--amber)" : "var(--red)" }} />
              </div>
              <span className="srow-val">{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── LAYER 4: REASONING PANEL ── */}
      {(reason.why.length > 0 || reason.risks.length > 0) && (
        <div className="reason-card">
          <div className="reason-hdr">
            <span>🧠 AI Reasoning Engine</span>
            <span className="reason-conf-badge" style={{
              background: reason.confidence >= 75 ? "rgba(0,214,143,.1)" : reason.confidence >= 55 ? "rgba(251,191,36,.1)" : "rgba(248,113,113,.1)",
              color:      reason.confidence >= 75 ? "var(--acc)" : reason.confidence >= 55 ? "var(--amber)" : "var(--red)",
            }}>
              {reason.confidence}% confidence
            </span>
          </div>
          {reason.why.length > 0 && (
            <div className="reason-section">
              <div className="reason-section-lbl reason-section-lbl--good">✔ Why This Candidate</div>
              {reason.why.map((w, i) => <div key={i} className="reason-item reason-item--good">{w}</div>)}
            </div>
          )}
          {reason.risks.length > 0 && (
            <div className="reason-section">
              <div className="reason-section-lbl reason-section-lbl--risk">⚠ Risks &amp; Gaps</div>
              {reason.risks.map((r, i) => <div key={i} className="reason-item reason-item--risk">{r}</div>)}
            </div>
          )}
          {(hybrid.mustMatched.length > 0 || hybrid.mustMissed.length > 0 || hybrid.goodMatched.length > 0) && (
            <div className="reason-section">
              <div className="reason-section-lbl" style={{ color:"var(--tx3)" }}>Skill Coverage</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginTop:".4rem" }}>
                {hybrid.mustMatched.map((s) => <span key={s} className="sk-tag sk-tag--match">✓ {s}</span>)}
                {hybrid.mustMissed.map((s)  => <span key={s} className="sk-tag sk-tag--miss">✕ {s}</span>)}
                {hybrid.goodMatched.map((s) => <span key={s} className="sk-tag sk-tag--bonus">+ {s}</span>)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── LAYER 5: CANDIDATE RANKING ── */}
      {scored.length > 0 && (
        <div className="rank-card">
          <div className="rank-hdr">🏆 Candidate Ranking — {jd?.title ?? jobTitle}</div>
          {scored.slice(0, 5).map((s, i) => (
            <div key={String(s.id)} className={`rank-row${String(s.id) === String(candId) ? " rank-row--this" : ""}`}>
              <span className="rank-pos" style={{ color: i === 0 ? "var(--amber)" : i < 3 ? "var(--acc)" : "var(--tx3)" }}>#{i + 1}</span>
              <div className="rank-av" style={{ background: s.bg, color: s.col }}>{s.initials}</div>
              <span className={`rank-nm${String(s.id) === String(candId) ? " rank-nm--this" : ""}`}>
                {s.name}{String(s.id) === String(candId) ? " (you)" : ""}
              </span>
              <div className="rank-bar-wrap">
                <div className="rank-bar-fill" style={{ width:`${s.score}%`, background: i === 0 ? "var(--amber)" : i < 3 ? "var(--acc)" : "var(--blue)" }} />
              </div>
              <span className="rank-sc">{s.score}</span>
            </div>
          ))}
          {scored.length > 5 && (
            <div style={{ fontSize:".62rem", color:"var(--tx3)", padding:".35rem 0 0 1.8rem" }}>
              +{scored.length - 5} more candidates not shown
            </div>
          )}
        </div>
      )}

      {/* ── LAYER 7: FEEDBACK / IMPROVEMENT ROADMAP ── */}
      {missingForFeedback.length > 0 && (
        <div className="feedback-card">
          <div className="feedback-hdr">📋 Improvement Roadmap</div>
          <div style={{ fontSize:".72rem", color:"var(--tx3)", marginBottom:".65rem" }}>
            Skills to develop for stronger fit with{" "}
            <strong style={{ color:"var(--tx2)" }}>{jd?.title ?? jobTitle}</strong>
          </div>
          {missingForFeedback.map((m, i) => (
            <div key={m} className="feedback-item">
              <span className="feedback-num">{i + 1}</span>
              <div>
                <div className="feedback-skill">{m}</div>
                <div className="feedback-hint">{getFeedbackHint(m)}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── RECRUITMENT TIMELINE ── */}
      <div className="timeline-card">
        <div className="tc-hdr">📅 Recruitment Timeline</div>
        <div className="tl-wrap">
          {([
            { key:"applied",     ic:"✓", nm:"Application Received",  dt: fmtDate(raw.processed_date) },
            { key:"screened",    ic:"📄", nm:"Resume Screened",       dt: "" },
            { key:"shortlisted", ic:"★", nm:"Shortlisted",            dt: "" },
            { key:"assessment",  ic:"✉", nm:"Assessment Sent",        dt: "" },
            { key:"interview",   ic:"🗓", nm:"Interview Scheduled",    dt: "" },
            { key:"offer",       ic:"✓", nm:"Offer Extended",         dt: "" },
          ] as { key: keyof typeof stagesDone; ic: string; nm: string; dt: string }[]).map((t) => {
            const done = stagesDone[t.key];
            return (
              <div key={t.key} className="tl-item">
                <div className={`tl-dot ${done ? "comp" : "pend"}`}>{t.ic}</div>
                <div>
                  <div className="tl-nm">{t.nm}</div>
                  <div className={`tl-st ${done ? "comp" : "pend"}`}>{done ? "Completed" : "Pending"}</div>
                  {done && t.dt && <div className="tl-dt">{t.dt}</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── NOTES ── */}
      <div className="notes-card">
        <div className="notes-hdr">
          <span className="notes-title">📝 Notes &amp; Feedback</span>
          <button className="add-note-btn">+ Add Note</button>
        </div>
        <div className="notes-empty">No notes yet</div>
      </div>

      {/* ── ACTIONS ── */}
      <div className="action-row">
        <button className="btn-dl"><Download size={14} /> Download Resume</button>
        <button className="btn-profile">👁 View Full Profile</button>
      </div>

      {/* ── SYSTEM META ── */}
      <div className="addl-card">
        <div className="addl-row"><span className="addl-key">Job Role</span><span className="addl-val">{jd?.title ?? jobTitle}</span></div>
        <div className="addl-row"><span className="addl-key">Hybrid Score</span><span className="addl-val">{sc}/100 (Skill:{hybrid.skill} · Sem:{hybrid.semantic} · Exp:{hybrid.exp} · Sig:{hybrid.signal})</span></div>
        <div className="addl-row"><span className="addl-key">Role Rank</span><span className="addl-val">#{myRank} of {rankTotal}</span></div>
        <div className="addl-row"><span className="addl-key">Decision</span><span className="addl-val" style={{ color:band.color }}>{band.band} — {reason.decision}</span></div>
        <div className="addl-row"><span className="addl-key">Candidate ID</span><span className="addl-val">{candId}</span></div>
      </div>
    </>
  );
};

export default CandidateDetails;