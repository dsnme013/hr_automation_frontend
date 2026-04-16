// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import React, { useState } from "react";
// import { Calendar, ExternalLink, X } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { Candidate, Job } from "@/services/interfaces/CandidateScreening";

// interface CandidatesTableProps {
//   candidates: Candidate[];
//   activeTab: string;
//   selectedJob: Job | null;
//   onSendAssessment?: (id: string | number) => void;
//   onResendAssessment?: (id: string | number) => void;
// }

// /* ── Avatar helpers — deterministic colour from name ── */
// const PALETTES: [string, string][] = [
//   ["#EFF6FF","#2563EB"],["#F0FDF4","#16A34A"],["#FFF7ED","#EA580C"],
//   ["#FAF5FF","#7C3AED"],["#F0FDFA","#0D9488"],["#FFFBEB","#D97706"],
// ];
// function avatarColors(name: string): [string, string] {
//   let h = 0;
//   for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
//   return PALETTES[Math.abs(h) % PALETTES.length];
// }
// function initials(name: string) {
//   return name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
// }
// function relDate(iso?: string | null) {
//   if (!iso) return "—";
//   const d = Math.round((Date.now() - new Date(iso).getTime()) / 86400000);
//   if (d === 0) return "Today";
//   if (d === 1) return "Yesterday";
//   if (d < 7)  return `${d}d ago`;
//   return `${Math.round(d / 7)}w ago`;
// }
// function fmtDate(iso?: string | null) {
//   if (!iso) return "—";
//   try { return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }); }
//   catch { return "—"; }
// }

// /* ── Status variant ── */
// type Variant = "not_sent" | "sent" | "started" | "passed" | "failed" | "expired";

// function getVariant(c: Candidate): Variant {
//   if (c.exam_completed) return (c.exam_percentage ?? 0) >= 70 ? "passed" : "failed";
//   if (c.link_expired)   return "expired";
//   if (c.exam_started)   return "started";
//   if (c.exam_link_sent) return "sent";
//   return "not_sent";
// }

// /* Map variant → HTML CSS-variable tokens (mirrors HTML .status-badge classes) */
// const VARIANT_CLS: Record<Variant, string> = {
//   not_sent: "am-badge-pending",
//   sent:     "am-badge-sent",
//   started:  "am-badge-pending",
//   passed:   "am-badge-passed",
//   failed:   "am-badge-failed",
//   expired:  "am-badge-expired",
// };
// const VARIANT_LABEL: Record<Variant, string> = {
//   not_sent: "Not Sent",
//   sent:     "Sent",
//   started:  "In Progress",
//   passed:   "Passed",
//   failed:   "Failed",
//   expired:  "Expired",
// };

// /* ── CSS — mirrors HTML table, score-chip, status-badge, action-btns ── */
// const CSS = `
// /* Status badges — use HTML CSS-variable tokens */
// .am-badge {
//   display: inline-flex; align-items: center; gap: 4px;
//   font-size: .67rem; font-weight: 600;
//   padding: .22rem .65rem; border-radius: 999px;
// }
// .am-badge-passed  { background: var(--status-passed-bg);  color: var(--status-passed-col);  }
// .am-badge-failed  { background: var(--status-failed-bg);  color: var(--status-failed-col);  }
// .am-badge-expired { background: var(--status-expired-bg); color: var(--status-expired-col); }
// .am-badge-pending { background: var(--status-pending-bg); color: var(--status-pending-col); }
// .am-badge-sent    { background: rgba(96,165,250,.1);       color: var(--blue);               }

// /* Score chip */
// .am-chip {
//   display: inline-flex; align-items: center; justify-content: center;
//   width: 38px; height: 22px; border-radius: 6px;
//   font-size: .73rem; font-weight: 700;
// }
// .am-chip-ok   { background: var(--accs);                  color: var(--acc); }
// .am-chip-bad  { background: rgba(248,113,113,.12);         color: var(--red); }
// .am-chip-none { background: var(--glass2);                 color: var(--tx3); }

// /* Table */
// .am-tbl-wrap { overflow-x: auto; }
// .am-table {
//   width: 100%; border-collapse: collapse;
// }
// .am-table thead tr {
//   background: rgba(0,0,0,.04);
// }
// [data-am-theme="dark"] .am-table thead tr { background: rgba(0,214,143,.03); }
// .am-table th {
//   padding: .6rem 1.1rem;
//   text-align: left; font-size: .6rem; font-weight: 700;
//   letter-spacing: .09em; text-transform: uppercase;
//   color: var(--tx3); border-bottom: 1px solid var(--card-bd);
//   white-space: nowrap; transition: color .35s, border-color .35s;
// }
// .am-table td {
//   padding: .8rem 1.1rem; font-size: .8rem;
//   color: var(--tx2); border-bottom: 1px solid rgba(0,0,0,.04);
//   vertical-align: middle; transition: background .12s;
// }
// [data-am-theme="dark"] .am-table td { border-bottom-color: rgba(0,214,143,.04); }
// .am-table tbody tr:last-child td { border-bottom: none; }
// .am-table tbody tr:hover td { background: var(--accs); cursor: pointer; }

// /* Avatar */
// .am-av {
//   width: 32px; height: 32px; border-radius: 9px;
//   display: flex; align-items: center; justify-content: center;
//   font-size: .6rem; font-weight: 700; flex-shrink: 0;
// }
// .am-cand-nm    { font-weight: 600; font-size: .8rem; color: var(--tx); transition: color .35s; }
// .am-cand-email { font-size: .63rem; color: var(--tx3); margin-top: .1rem; }
// .am-ago        { font-size: .73rem; color: var(--tx3); }
// .am-dash       { font-size: .75rem; color: var(--tx3); }

// /* Action buttons */
// .am-act-btns { display: flex; align-items: center; gap: 6px; }
// .am-act-view {
//   width: 26px; height: 26px; border-radius: 7px;
//   background: var(--glass2); border: 1px solid var(--card-bd);
//   display: flex; align-items: center; justify-content: center;
//   cursor: pointer; font-size: .7rem; color: var(--tx3);
//   transition: all .18s; text-decoration: none;
// }
// .am-act-view:hover { border-color: var(--acc); color: var(--acc); }
// .am-act-reject {
//   font-size: .67rem; font-weight: 600;
//   padding: .2rem .55rem; border-radius: 6px; cursor: pointer;
//   background: var(--reject-btn-bg); color: var(--reject-btn-col);
//   border: 1px solid var(--reject-btn-bd); font-family: var(--sans);
//   transition: all .18s;
// }
// .am-act-reject:hover { background: var(--red); color: #fff; border-color: var(--red); }
// .am-act-schedule {
//   font-size: .67rem; font-weight: 600;
//   padding: .2rem .55rem; border-radius: 6px; cursor: pointer;
//   background: var(--accs); color: var(--acc);
//   border: 1px solid var(--bd); font-family: var(--sans);
//   transition: all .18s; display: flex; align-items: center; gap: 3px;
// }
// .am-act-schedule:hover { background: var(--acc); color: var(--btn-text); }

// /* Empty row */
// .am-empty-row td {
//   text-align: center; color: var(--tx3);
//   font-size: .78rem; padding: 2.5rem 1.1rem;
// }

// /* ── Result modal ── */
// .am-modal-backdrop {
//   position: fixed; inset: 0; z-index: 9000;
//   background: rgba(4,13,10,.55);
//   display: flex; align-items: center; justify-content: center; padding: 1rem;
//   backdrop-filter: blur(4px);
// }
// .am-modal {
//   background: var(--card-bg); border: 1px solid var(--card-bd);
//   border-radius: 16px; width: 100%; max-width: 500px;
//   overflow: hidden; backdrop-filter: blur(20px);
//   box-shadow: 0 24px 60px rgba(0,0,0,.4);
// }
// .am-modal-hdr {
//   display: flex; align-items: center; justify-content: space-between;
//   padding: 1.1rem 1.3rem;
//   border-bottom: 1px solid var(--card-bd); transition: border-color .35s;
// }
// .am-modal-title { font-family: var(--serif); font-size: 1.05rem; color: var(--tx); transition: color .35s; }
// .am-modal-close {
//   width: 26px; height: 26px; border-radius: 7px;
//   background: var(--glass2); border: 1px solid var(--card-bd);
//   cursor: pointer; display: flex; align-items: center; justify-content: center;
//   color: var(--tx3); font-size: .75rem; transition: all .15s;
// }
// .am-modal-close:hover { border-color: var(--acc); color: var(--acc); }
// .am-modal-body { padding: .5rem 1.3rem; }
// .am-modal-row {
//   display: flex; align-items: center; justify-content: space-between;
//   padding: .65rem 0; border-bottom: 1px solid var(--card-bd); font-size: .8rem;
//   transition: border-color .35s;
// }
// .am-modal-row:last-child { border-bottom: none; }
// .am-modal-key { color: var(--tx3); transition: color .35s; }
// .am-modal-val { font-weight: 600; color: var(--tx); transition: color .35s; }
// .am-modal-ftr {
//   display: flex; align-items: center; justify-content: flex-end; gap: .65rem;
//   padding: .9rem 1.3rem; border-top: 1px solid var(--card-bd); transition: border-color .35s;
// }
// .am-modal-cancel {
//   font-family: var(--sans); font-size: .76rem; font-weight: 600;
//   padding: .42rem .9rem; border-radius: 8px; cursor: pointer;
//   background: var(--glass2); color: var(--tx2);
//   border: 1px solid var(--card-bd); transition: all .15s;
// }
// .am-modal-cancel:hover { border-color: var(--acc); color: var(--acc); }
// .am-modal-action {
//   font-family: var(--sans); font-size: .76rem; font-weight: 700;
//   padding: .42rem .9rem; border-radius: 8px; cursor: pointer;
//   background: var(--acc); color: var(--btn-text); border: none;
//   transition: background .15s; box-shadow: 0 0 12px var(--accg);
// }
// .am-modal-action:hover { background: var(--acc3); }

// /* Questions pane */
// .am-q-wrap { padding: 1.2rem; }
// .am-q-hdr {
//   display: flex; align-items: center; justify-content: space-between;
//   margin-bottom: 1rem;
// }
// .am-q-title  { font-size: .82rem; font-weight: 700; color: var(--tx); transition: color .35s; }
// .am-q-sub    { font-size: .62rem; color: var(--tx3); margin-top: .2rem; transition: color .35s; }
// .am-q-ai-btn {
//   font-family: var(--sans); font-size: .7rem; font-weight: 700;
//   padding: .32rem .8rem; border-radius: 8px; cursor: pointer;
//   background: var(--acc); color: var(--btn-text); border: none;
//   transition: background .15s;
// }
// .am-q-ai-btn:hover { background: var(--acc3); }
// .am-q-list { display: flex; flex-direction: column; gap: .55rem; }
// .am-q-item {
//   background: var(--glass2); border: 1px solid var(--card-bd);
//   border-radius: 10px; padding: .75rem 1rem;
//   transition: background .35s, border-color .35s;
// }
// .am-q-row1  { display: flex; align-items: flex-start; gap: 8px; margin-bottom: .4rem; }
// .am-q-num   { font-size: .6rem; font-weight: 700; color: var(--tx3); text-transform: uppercase; flex-shrink: 0; margin-top: 2px; transition: color .35s; }
// .am-q-text  { font-size: .78rem; font-weight: 500; color: var(--tx); flex: 1; line-height: 1.45; transition: color .35s; }
// .am-q-type  { font-size: .6rem; font-weight: 700; padding: .15rem .5rem; border-radius: 999px; white-space: nowrap; }
// .am-q-meta  { display: flex; gap: .75rem; font-size: .65rem; color: var(--tx3); padding-left: 26px; transition: color .35s; }
// `;

// /* ── Questions pane ── */
// const DEMO_QUESTIONS = [
//   { num: 1, text: "Write a Python function to find the second largest element in a list without sorting.", type: "Coding",    marks: 10, time: "8 min" },
//   { num: 2, text: "What is the difference between a shallow copy and a deep copy? Provide examples.",       type: "Theory",    marks: 5,  time: "5 min" },
//   { num: 3, text: "Explain the concept of decorators and demonstrate their use with a practical example.", type: "Coding",    marks: 8,  time: "7 min" },
//   { num: 4, text: "Given a list, return all pairs that sum to a target value. Optimise for O(n) time.",    type: "Algorithm", marks: 12, time: "10 min" },
//   { num: 5, text: "What are Python generators? When would you use them over a list comprehension?",        type: "Theory",    marks: 5,  time: "4 min" },
// ];
// const TYPE_STYLES: Record<string, { bg: string; col: string }> = {
//   Coding:    { bg: "rgba(96,165,250,.12)",  col: "var(--blue)"   },
//   Theory:    { bg: "rgba(0,214,143,.12)",   col: "var(--acc)"    },
//   Algorithm: { bg: "rgba(167,139,250,.12)", col: "var(--purple)" },
//   SQL:       { bg: "rgba(251,191,36,.12)",  col: "var(--amber)"  },
// };

// function QuestionsPane() {
//   return (
//     <div className="am-q-wrap">
//       <div className="am-q-hdr">
//         <div>
//           <div className="am-q-title">Technical Screening Test</div>
//           <div className="am-q-sub">5 questions · 30 min · 40 marks</div>
//         </div>
//         <button className="am-q-ai-btn">🤖 Regenerate with AI</button>
//       </div>
//       <div className="am-q-list">
//         {DEMO_QUESTIONS.map(q => {
//           const { bg, col } = TYPE_STYLES[q.type] ?? { bg: "var(--glass2)", col: "var(--tx3)" };
//           return (
//             <div key={q.num} className="am-q-item">
//               <div className="am-q-row1">
//                 <span className="am-q-num">Q{q.num}</span>
//                 <span className="am-q-text">{q.text}</span>
//                 <span className="am-q-type" style={{ background: bg, color: col }}>{q.type}</span>
//               </div>
//               <div className="am-q-meta">
//                 <span>{q.marks} marks</span>
//                 <span>{q.time}</span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// /* ── Result modal — mirrors HTML modal in candidates.html ── */
// const ResultModal: React.FC<{ candidate: Candidate; onClose: () => void }> = ({ candidate, onClose }) => {
//   const router  = useRouter();
//   const variant = getVariant(candidate);
//   const passed  = variant === "passed";
//   const pct     = candidate.exam_percentage ?? null;

//   return (
//     <div className="am-modal-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
//       <div className="am-modal">
//         <div className="am-modal-hdr">
//           <div className="am-modal-title">{candidate.name} — Assessment Result</div>
//           <button className="am-modal-close" onClick={onClose}><X size={13} /></button>
//         </div>
//         <div className="am-modal-body">
//           {[
//             {
//               key: "Status",
//               val: <span className={`am-badge ${VARIANT_CLS[variant]}`}>{VARIANT_LABEL[variant]}</span>,
//             },
//             {
//               key: "ATS Score",
//               val: <span style={{ fontWeight: 700, color: (candidate.ats_score ?? 0) >= 70 ? "var(--acc)" : "var(--red)" }}>
//                      {candidate.ats_score ?? "—"} / 100
//                    </span>,
//             },
//             {
//               key: "Time Taken",
//               val: <span className="am-modal-val">
//                      {(candidate as any).exam_time_taken ? `${(candidate as any).exam_time_taken} minutes` : "—"}
//                    </span>,
//             },
//             {
//               key: "Sent On",
//               val: <span className="am-modal-val">{fmtDate((candidate as any).exam_link_sent_date)}</span>,
//             },
//             {
//               key: "Completed On",
//               val: <span className="am-modal-val">{fmtDate((candidate as any).exam_completed_date)}</span>,
//             },
//             {
//               key: "Pass Threshold",
//               val: <span className="am-modal-val">70%</span>,
//             },
//             {
//               key: "Assessment Score",
//               val: <span style={{ fontWeight: 700, color: pct != null ? (pct >= 70 ? "var(--acc)" : "var(--red)") : "var(--tx3)" }}>
//                      {pct != null ? `${pct.toFixed(0)}%` : "—"}
//                    </span>,
//             },
//             {
//               key: "Result",
//               val: <span style={{ fontWeight: 700, color: pct == null ? "var(--tx3)" : pct >= 70 ? "var(--acc)" : "var(--red)" }}>
//                      {pct == null ? "—" : pct >= 70 ? "✓ Pass" : "✗ Fail"}
//                    </span>,
//             },
//           ].map(({ key, val }) => (
//             <div key={key} className="am-modal-row">
//               <span className="am-modal-key">{key}</span>
//               <span>{val}</span>
//             </div>
//           ))}
//         </div>
//         <div className="am-modal-ftr">
//           <button className="am-modal-cancel" onClick={onClose}>Close</button>
//           {passed && !candidate.interview_scheduled && (
//             <button
//               className="am-modal-action"
//               onClick={() => { onClose(); router.push(`/scheduler?candidate_id=${candidate.id}`); }}
//             >
//               🗓 Schedule Interview →
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ── Main component ── */
// const CandidatesTable: React.FC<CandidatesTableProps> = ({
//   candidates, activeTab, onSendAssessment, onResendAssessment,
// }) => {
//   const router = useRouter();
//   const [modalCandidate, setModalCandidate] = useState<Candidate | null>(null);

//   if (activeTab === "questions") return (
//     <>
//       <style dangerouslySetInnerHTML={{ __html: CSS }} />
//       <QuestionsPane />
//     </>
//   );

//   const filtered =
//     activeTab === "all"
//       ? candidates
//       : activeTab === "pending"
//       ? candidates.filter(c => c.exam_link_sent && !c.exam_completed && !c.link_expired)
//       : activeTab === "completed"
//       ? candidates.filter(c => c.exam_completed)
//       : candidates;

//   return (
//     <>
//       <style dangerouslySetInnerHTML={{ __html: CSS }} />
//       <div className="am-tbl-wrap">
//         <table className="am-table">
//           <thead>
//             <tr>
//               {["Candidate", "Status", "Score", "Time Taken", "Last Update", "Action"].map(h => (
//                 <th key={h}>{h}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.length === 0 ? (
//               <tr className="am-empty-row">
//                 <td colSpan={6}>No candidates in this category</td>
//               </tr>
//             ) : (
//               filtered.map(c => {
//                 const variant      = getVariant(c);
//                 const [bg, fg]     = avatarColors(c.name ?? "?");
//                 const showReject   = variant === "failed";
//                 const showSchedule = variant === "passed" && !c.interview_scheduled;

//                 return (
//                   <tr key={c.id} onClick={() => setModalCandidate(c)}>
//                     {/* Candidate */}
//                     <td>
//                       <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
//                         <div className="am-av" style={{ background: bg, color: fg }}>
//                           {initials(c.name ?? "?")}
//                         </div>
//                         <div>
//                           <div className="am-cand-nm">{c.name}</div>
//                           <div className="am-cand-email">{c.email}</div>
//                         </div>
//                       </div>
//                     </td>

//                     {/* Status */}
//                     <td>
//                       <span className={`am-badge ${VARIANT_CLS[variant]}`}>
//                         {VARIANT_LABEL[variant]}
//                       </span>
//                     </td>

//                     {/* Score */}
//                     <td>
//                       {c.ats_score != null
//                         ? <span className={`am-chip ${c.ats_score >= 70 ? "am-chip-ok" : "am-chip-bad"}`}>{c.ats_score}</span>
//                         : <span className="am-chip am-chip-none">—</span>}
//                     </td>

//                     {/* Time taken */}
//                     <td>
//                       <span className="am-ago">
//                         {(c as any).exam_time_taken ? `${(c as any).exam_time_taken}m` : "—"}
//                       </span>
//                     </td>

//                     {/* Last update */}
//                     <td>
//                       <span className="am-ago">
//                         {relDate(c.exam_completed ? (c as any).exam_completed_date : (c as any).exam_link_sent_date)}
//                       </span>
//                     </td>

//                     {/* Actions — stopPropagation so row-click doesn't also open modal */}
//                     <td onClick={e => e.stopPropagation()}>
//                       <div className="am-act-btns">
//                         <a className="am-act-view" title="View profile" onClick={e => { e.preventDefault(); setModalCandidate(c); }}>↗</a>
//                         {showSchedule && (
//                           <button
//                             className="am-act-schedule"
//                             onClick={() => router.push(`/scheduler?candidate_id=${c.id}`)}
//                           >
//                             <Calendar size={11} /> Schedule
//                           </button>
//                         )}
//                         {showReject && (
//                           <button className="am-act-reject">Reject</button>
//                         )}
//                         {c.assessment_invite_link && (
//                           <a
//                             className="am-act-view"
//                             href={c.assessment_invite_link}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             title="View assessment"
//                             onClick={e => e.stopPropagation()}
//                           >
//                             <ExternalLink size={11} />
//                           </a>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Result modal */}
//       {modalCandidate && (
//         <ResultModal candidate={modalCandidate} onClose={() => setModalCandidate(null)} />
//       )}
//     </>
//   );
// };

// export default CandidatesTable;
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Calendar, ExternalLink, X, Award, Clock, Send, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Candidate, Job } from "@/services/interfaces/CandidateScreening";

interface CandidatesTableProps {
  candidates: Candidate[];
  activeTab: string;
  selectedJob: Job | null;
  onSendAssessment?: (id: string | number) => void;
  onResendAssessment?: (id: string | number) => void;
}

/* ── Avatar helpers ── */
const PALETTES: [string, string][] = [
  ["#EFF6FF","#2563EB"],["#F0FDF4","#16A34A"],["#FFF7ED","#EA580C"],
  ["#FAF5FF","#7C3AED"],["#F0FDFA","#0D9488"],["#FFFBEB","#D97706"],
];
function avatarColors(name: string): [string, string] {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
  return PALETTES[Math.abs(h) % PALETTES.length];
}
function initials(name: string) {
  return name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
}
function relDate(iso?: string | null) {
  if (!iso) return "—";
  const d = Math.round((Date.now() - new Date(iso).getTime()) / 86400000);
  if (d === 0) return "Today";
  if (d === 1) return "Yesterday";
  if (d < 7)  return `${d}d ago`;
  return `${Math.round(d / 7)}w ago`;
}
function fmtDate(iso?: string | null) {
  if (!iso) return "—";
  try { return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }); }
  catch { return "—"; }
}

/* ── Status variant ── */
type Variant = "not_sent" | "sent" | "started" | "passed" | "failed" | "expired";

function getVariant(c: Candidate): Variant {
  if (c.exam_completed) return (c.exam_percentage ?? 0) >= 70 ? "passed" : "failed";
  if (c.link_expired)   return "expired";
  if (c.exam_started)   return "started";
  if (c.exam_link_sent) return "sent";
  return "not_sent";
}

const VARIANT_CLS: Record<Variant, string> = {
  not_sent: "am-badge-pending",
  sent:     "am-badge-sent",
  started:  "am-badge-pending",
  passed:   "am-badge-passed",
  failed:   "am-badge-failed",
  expired:  "am-badge-expired",
};
const VARIANT_LABEL: Record<Variant, string> = {
  not_sent: "Not Sent",
  sent:     "Sent",
  started:  "In Progress",
  passed:   "Passed",
  failed:   "Failed",
  expired:  "Expired",
};

/* ── CSS ── */
const CSS = `
/* Status badges */
.am-badge {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: .67rem; font-weight: 600;
  padding: .22rem .65rem; border-radius: 999px;
}
.am-badge-passed  { background: var(--status-passed-bg);  color: var(--status-passed-col);  }
.am-badge-failed  { background: var(--status-failed-bg);  color: var(--status-failed-col);  }
.am-badge-expired { background: var(--status-expired-bg); color: var(--status-expired-col); }
.am-badge-pending { background: var(--status-pending-bg); color: var(--status-pending-col); }
.am-badge-sent    { background: rgba(96,165,250,.1);       color: var(--blue);               }

/* Score chip */
.am-chip {
  display: inline-flex; align-items: center; justify-content: center;
  width: 38px; height: 22px; border-radius: 6px;
  font-size: .73rem; font-weight: 700;
}
.am-chip-ok   { background: var(--accs);              color: var(--acc); }
.am-chip-bad  { background: rgba(248,113,113,.12);    color: var(--red); }
.am-chip-none { background: var(--glass2);            color: var(--tx3); }

/* Table */
.am-tbl-wrap { overflow-x: auto; }
.am-table { width: 100%; border-collapse: collapse; }
.am-table thead tr { background: rgba(0,0,0,.04); }
[data-am-theme="dark"] .am-table thead tr { background: rgba(0,214,143,.03); }
.am-table th {
  padding: .6rem 1.1rem;
  text-align: left; font-size: .6rem; font-weight: 700;
  letter-spacing: .09em; text-transform: uppercase;
  color: var(--tx3); border-bottom: 1px solid var(--card-bd);
  white-space: nowrap; transition: color .35s, border-color .35s;
}
.am-table td {
  padding: .8rem 1.1rem; font-size: .8rem;
  color: var(--tx2); border-bottom: 1px solid rgba(0,0,0,.04);
  vertical-align: middle; transition: background .12s;
}
[data-am-theme="dark"] .am-table td { border-bottom-color: rgba(0,214,143,.04); }
.am-table tbody tr:last-child td { border-bottom: none; }
.am-table tbody tr:hover td { background: var(--accs); cursor: pointer; }

/* Avatar */
.am-av {
  width: 32px; height: 32px; border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  font-size: .6rem; font-weight: 700; flex-shrink: 0;
}
.am-cand-nm    { font-weight: 600; font-size: .8rem; color: var(--tx); transition: color .35s; }
.am-cand-email { font-size: .63rem; color: var(--tx3); margin-top: .1rem; }
.am-ago  { font-size: .73rem; color: var(--tx3); }
.am-dash { font-size: .75rem; color: var(--tx3); }

/* Action buttons */
.am-act-btns { display: flex; align-items: center; gap: 6px; }
.am-act-view {
  width: 26px; height: 26px; border-radius: 7px;
  background: var(--glass2); border: 1px solid var(--card-bd);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; font-size: .7rem; color: var(--tx3);
  transition: all .18s; text-decoration: none;
}
.am-act-view:hover { border-color: var(--acc); color: var(--acc); }
.am-act-reject {
  font-size: .67rem; font-weight: 600;
  padding: .2rem .55rem; border-radius: 6px; cursor: pointer;
  background: var(--reject-btn-bg); color: var(--reject-btn-col);
  border: 1px solid var(--reject-btn-bd); font-family: var(--sans);
  transition: all .18s;
}
.am-act-reject:hover { background: var(--red); color: #fff; border-color: var(--red); }
.am-act-schedule {
  font-size: .67rem; font-weight: 600;
  padding: .2rem .55rem; border-radius: 6px; cursor: pointer;
  background: var(--accs); color: var(--acc);
  border: 1px solid var(--bd); font-family: var(--sans);
  transition: all .18s; display: flex; align-items: center; gap: 3px;
}
.am-act-schedule:hover { background: var(--acc); color: var(--btn-text); }

/* Empty row */
.am-empty-row td {
  text-align: center; color: var(--tx3);
  font-size: .78rem; padding: 2.5rem 1.1rem;
}

/* ══════════════════════════════════════════════════════
   CANDIDATE DETAIL MODAL
   Rendered via React portal → escapes overflow:hidden
   and backdrop-filter stacking contexts on am-table-card
   ══════════════════════════════════════════════════════ */
@keyframes am-modal-in {
  from { opacity: 0; transform: scale(.96) translateY(10px); }
  to   { opacity: 1; transform: scale(1)   translateY(0);    }
}
@keyframes am-backdrop-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.am-modal-backdrop {
  position: fixed; inset: 0; z-index: 99999;
  background: rgba(4,13,10,.65);
  display: flex; align-items: center; justify-content: center;
  padding: 1rem;
  backdrop-filter: blur(6px);
  animation: am-backdrop-in .18s ease forwards;
}

.am-modal {
  background: var(--card-bg, #0d1f18);
  border: 1px solid var(--card-bd, rgba(0,214,143,.18));
  border-radius: 18px;
  width: 100%; max-width: 520px;
  overflow: hidden;
  box-shadow: 0 32px 80px rgba(0,0,0,.55), 0 0 0 1px rgba(0,214,143,.06);
  animation: am-modal-in .22s cubic-bezier(.34,1.56,.64,1) forwards;
}

/* ── Modal hero header ── */
.am-modal-hero {
  padding: 1.4rem 1.4rem 1.1rem;
  border-bottom: 1px solid var(--card-bd, rgba(0,214,143,.12));
  display: flex; align-items: flex-start; gap: 14px;
  position: relative;
}
.am-modal-hero-av {
  width: 48px; height: 48px; border-radius: 13px;
  display: flex; align-items: center; justify-content: center;
  font-size: .85rem; font-weight: 800; flex-shrink: 0;
  box-shadow: 0 4px 14px rgba(0,0,0,.25);
}
.am-modal-hero-info { flex: 1; min-width: 0; }
.am-modal-hero-name {
  font-family: var(--serif, Georgia, serif);
  font-size: 1.1rem; font-weight: 700;
  color: var(--tx, #e2faf1); line-height: 1.2;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  transition: color .35s;
}
.am-modal-hero-email {
  font-size: .72rem; color: var(--tx3, #5a8a75);
  margin-top: .2rem; transition: color .35s;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.am-modal-hero-badge { margin-top: .5rem; }
.am-modal-close-btn {
  position: absolute; top: 1rem; right: 1rem;
  width: 28px; height: 28px; border-radius: 8px;
  background: var(--glass2, rgba(255,255,255,.07));
  border: 1px solid var(--card-bd, rgba(0,214,143,.12));
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  color: var(--tx3, #5a8a75); transition: all .15s;
}
.am-modal-close-btn:hover { border-color: var(--acc, #00d68f); color: var(--acc, #00d68f); }

/* ── Score spotlight (shown when completed) ── */
.am-modal-score-bar {
  display: flex; align-items: center; gap: 1rem;
  padding: .9rem 1.4rem;
  background: var(--glass2, rgba(255,255,255,.04));
  border-bottom: 1px solid var(--card-bd, rgba(0,214,143,.12));
}
.am-modal-score-big {
  font-family: var(--serif, Georgia, serif);
  font-size: 2.2rem; font-weight: 700; line-height: 1;
  transition: color .35s;
}
.am-modal-score-meta { flex: 1; }
.am-modal-score-label {
  font-size: .62rem; font-weight: 700; letter-spacing: .09em;
  text-transform: uppercase; color: var(--tx3, #5a8a75);
  margin-bottom: .25rem; transition: color .35s;
}
.am-modal-score-bar-track {
  height: 5px; border-radius: 3px;
  background: var(--dist-bar-bg, rgba(0,214,143,.08));
  overflow: hidden; width: 100%;
}
.am-modal-score-bar-fill {
  height: 100%; border-radius: 3px;
  transition: width 1s cubic-bezier(.4,0,.2,1) .2s;
}
.am-modal-score-result {
  font-size: .8rem; font-weight: 700;
  padding: .3rem .75rem; border-radius: 8px;
}

/* ── Detail rows ── */
.am-modal-body { padding: .3rem 0; }
.am-modal-section-title {
  font-size: .6rem; font-weight: 700; letter-spacing: .1em;
  text-transform: uppercase; color: var(--tx3, #5a8a75);
  padding: .7rem 1.4rem .3rem; transition: color .35s;
}
.am-modal-row {
  display: flex; align-items: center;
  padding: .6rem 1.4rem;
  border-bottom: 1px solid var(--card-bd, rgba(0,214,143,.08));
  transition: border-color .35s;
}
.am-modal-row:last-child { border-bottom: none; }
.am-modal-row-icon {
  width: 28px; height: 28px; border-radius: 8px;
  background: var(--glass2, rgba(255,255,255,.05));
  display: flex; align-items: center; justify-content: center;
  margin-right: 10px; flex-shrink: 0; color: var(--tx3, #5a8a75);
}
.am-modal-key {
  flex: 1; font-size: .78rem;
  color: var(--tx2, #a7c4b8); transition: color .35s;
}
.am-modal-val {
  font-size: .78rem; font-weight: 600;
  color: var(--tx, #e2faf1); text-align: right;
  transition: color .35s;
}

/* ── Footer ── */
.am-modal-ftr {
  display: flex; align-items: center; justify-content: flex-end; gap: .65rem;
  padding: .9rem 1.4rem;
  border-top: 1px solid var(--card-bd, rgba(0,214,143,.12));
  transition: border-color .35s;
}
.am-modal-cancel {
  font-family: var(--sans, system-ui); font-size: .76rem; font-weight: 600;
  padding: .45rem .95rem; border-radius: 9px; cursor: pointer;
  background: var(--glass2, rgba(255,255,255,.05));
  color: var(--tx2, #a7c4b8);
  border: 1px solid var(--card-bd, rgba(0,214,143,.12));
  transition: all .15s;
}
.am-modal-cancel:hover { border-color: var(--acc, #00d68f); color: var(--acc, #00d68f); }
.am-modal-action {
  font-family: var(--sans, system-ui); font-size: .76rem; font-weight: 700;
  padding: .45rem .95rem; border-radius: 9px; cursor: pointer;
  background: var(--acc, #00d68f); color: var(--btn-text, #040d0a);
  border: none; transition: background .15s;
  box-shadow: 0 0 16px var(--accg, rgba(0,214,143,.25));
  display: flex; align-items: center; gap: 5px;
}
.am-modal-action:hover { background: var(--acc3, #34d399); }

/* Questions pane */
.am-q-wrap { padding: 1.2rem; }
.am-q-hdr { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
.am-q-title { font-size: .82rem; font-weight: 700; color: var(--tx); transition: color .35s; }
.am-q-sub   { font-size: .62rem; color: var(--tx3); margin-top: .2rem; transition: color .35s; }
.am-q-ai-btn {
  font-family: var(--sans); font-size: .7rem; font-weight: 700;
  padding: .32rem .8rem; border-radius: 8px; cursor: pointer;
  background: var(--acc); color: var(--btn-text); border: none; transition: background .15s;
}
.am-q-ai-btn:hover { background: var(--acc3); }
.am-q-list { display: flex; flex-direction: column; gap: .55rem; }
.am-q-item {
  background: var(--glass2); border: 1px solid var(--card-bd);
  border-radius: 10px; padding: .75rem 1rem;
  transition: background .35s, border-color .35s;
}
.am-q-row1 { display: flex; align-items: flex-start; gap: 8px; margin-bottom: .4rem; }
.am-q-num  { font-size: .6rem; font-weight: 700; color: var(--tx3); text-transform: uppercase; flex-shrink: 0; margin-top: 2px; transition: color .35s; }
.am-q-text { font-size: .78rem; font-weight: 500; color: var(--tx); flex: 1; line-height: 1.45; transition: color .35s; }
.am-q-type { font-size: .6rem; font-weight: 700; padding: .15rem .5rem; border-radius: 999px; white-space: nowrap; }
.am-q-meta { display: flex; gap: .75rem; font-size: .65rem; color: var(--tx3); padding-left: 26px; transition: color .35s; }
`;

/* ── Questions pane ── */
const DEMO_QUESTIONS = [
  { num: 1, text: "Write a Python function to find the second largest element in a list without sorting.", type: "Coding",    marks: 10, time: "8 min" },
  { num: 2, text: "What is the difference between a shallow copy and a deep copy? Provide examples.",       type: "Theory",    marks: 5,  time: "5 min" },
  { num: 3, text: "Explain the concept of decorators and demonstrate their use with a practical example.", type: "Coding",    marks: 8,  time: "7 min" },
  { num: 4, text: "Given a list, return all pairs that sum to a target value. Optimise for O(n) time.",    type: "Algorithm", marks: 12, time: "10 min" },
  { num: 5, text: "What are Python generators? When would you use them over a list comprehension?",        type: "Theory",    marks: 5,  time: "4 min" },
];
const TYPE_STYLES: Record<string, { bg: string; col: string }> = {
  Coding:    { bg: "rgba(96,165,250,.12)",  col: "var(--blue)"   },
  Theory:    { bg: "rgba(0,214,143,.12)",   col: "var(--acc)"    },
  Algorithm: { bg: "rgba(167,139,250,.12)", col: "var(--purple)" },
  SQL:       { bg: "rgba(251,191,36,.12)",  col: "var(--amber)"  },
};

function QuestionsPane() {
  return (
    <div className="am-q-wrap">
      <div className="am-q-hdr">
        <div>
          <div className="am-q-title">Technical Screening Test</div>
          <div className="am-q-sub">5 questions · 30 min · 40 marks</div>
        </div>
        <button className="am-q-ai-btn">🤖 Regenerate with AI</button>
      </div>
      <div className="am-q-list">
        {DEMO_QUESTIONS.map(q => {
          const { bg, col } = TYPE_STYLES[q.type] ?? { bg: "var(--glass2)", col: "var(--tx3)" };
          return (
            <div key={q.num} className="am-q-item">
              <div className="am-q-row1">
                <span className="am-q-num">Q{q.num}</span>
                <span className="am-q-text">{q.text}</span>
                <span className="am-q-type" style={{ background: bg, color: col }}>{q.type}</span>
              </div>
              <div className="am-q-meta">
                <span>{q.marks} marks</span>
                <span>{q.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   RESULT MODAL — portal-rendered to escape stacking ctx
   ══════════════════════════════════════════════════════ */
const ResultModal: React.FC<{ candidate: Candidate; onClose: () => void }> = ({ candidate, onClose }) => {
  const router  = useRouter();
  const variant = getVariant(candidate);
  const passed  = variant === "passed";
  const pct     = candidate.exam_percentage ?? null;
  const [avBg, avFg] = avatarColors(candidate.name ?? "?");

  /* Close on Escape key */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  /* Lock body scroll while modal is open */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const scoreColor = pct == null
    ? "var(--tx3)"
    : pct >= 70 ? "var(--acc)" : "var(--red)";

  const detailRows: { icon: React.ReactNode; key: string; val: React.ReactNode }[] = [
    {
      icon: <Award size={13} />,
      key: "ATS Score",
      val: <span style={{ fontWeight: 700, color: (candidate.ats_score ?? 0) >= 70 ? "var(--acc)" : "var(--red)" }}>
             {candidate.ats_score != null ? `${candidate.ats_score} / 100` : "—"}
           </span>,
    },
    {
      icon: <Clock size={13} />,
      key: "Time Taken",
      val: <span className="am-modal-val">
             {(candidate as any).exam_time_taken ? `${(candidate as any).exam_time_taken} min` : "—"}
           </span>,
    },
    {
      icon: <Send size={13} />,
      key: "Sent On",
      val: <span className="am-modal-val">{fmtDate((candidate as any).exam_link_sent_date)}</span>,
    },
    {
      icon: <CheckCircle size={13} />,
      key: "Completed On",
      val: <span className="am-modal-val">{fmtDate((candidate as any).exam_completed_date)}</span>,
    },
    {
      icon: <span style={{ fontSize: ".75rem" }}>🎯</span>,
      key: "Pass Threshold",
      val: <span className="am-modal-val">70%</span>,
    },
    {
      icon: <span style={{ fontSize: ".75rem" }}>📊</span>,
      key: "Result",
      val: <span style={{ fontWeight: 700, color: pct == null ? "var(--tx3)" : pct >= 70 ? "var(--acc)" : "var(--red)" }}>
             {pct == null ? "—" : pct >= 70 ? "✓ Pass" : "✗ Fail"}
           </span>,
    },
  ];

  const modal = (
    <div
      className="am-modal-backdrop"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Inject CSS inside portal too so it's always present */}
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="am-modal" onClick={e => e.stopPropagation()}>

        {/* ── Hero header ── */}
        <div className="am-modal-hero">
          <div className="am-modal-hero-av" style={{ background: avBg, color: avFg }}>
            {initials(candidate.name ?? "?")}
          </div>
          <div className="am-modal-hero-info">
            <div className="am-modal-hero-name">{candidate.name}</div>
            <div className="am-modal-hero-email">{candidate.email}</div>
            <div className="am-modal-hero-badge">
              <span className={`am-badge ${VARIANT_CLS[variant]}`}>
                {VARIANT_LABEL[variant]}
              </span>
            </div>
          </div>
          <button className="am-modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={13} />
          </button>
        </div>

        {/* ── Score spotlight — shown only when exam completed ── */}
        {pct != null && (
          <div className="am-modal-score-bar">
            <div className="am-modal-score-big" style={{ color: scoreColor }}>
              {pct.toFixed(0)}%
            </div>
            <div className="am-modal-score-meta">
              <div className="am-modal-score-label">Assessment Score</div>
              <div className="am-modal-score-bar-track">
                <div
                  className="am-modal-score-bar-fill"
                  style={{ width: `${pct}%`, background: scoreColor }}
                />
              </div>
            </div>
            <div
              className="am-modal-score-result"
              style={{
                background: passed ? "var(--status-passed-bg)" : "var(--status-failed-bg)",
                color:       passed ? "var(--status-passed-col)" : "var(--status-failed-col)",
              }}
            >
              {passed ? "✓ Passed" : "✗ Failed"}
            </div>
          </div>
        )}

        {/* ── Detail rows ── */}
        <div className="am-modal-body">
          <div className="am-modal-section-title">Assessment Details</div>
          {detailRows.map(({ icon, key, val }) => (
            <div key={key} className="am-modal-row">
              <div className="am-modal-row-icon">{icon}</div>
              <span className="am-modal-key">{key}</span>
              <span>{val}</span>
            </div>
          ))}
        </div>

        {/* ── Footer ── */}
        <div className="am-modal-ftr">
          <button className="am-modal-cancel" onClick={onClose}>Close</button>
          {passed && !candidate.interview_scheduled && (
            <button
              className="am-modal-action"
              onClick={() => { onClose(); router.push(`/scheduler?candidate_id=${candidate.id}`); }}
            >
              <Calendar size={13} /> Schedule Interview →
            </button>
          )}
        </div>
      </div>
    </div>
  );

  /* ── Portal: renders to document.body, bypasses all stacking contexts ── */
  if (typeof document === "undefined") return null;
  return ReactDOM.createPortal(modal, document.body);
};

/* ── Main component ── */
const CandidatesTable: React.FC<CandidatesTableProps> = ({
  candidates, activeTab, onSendAssessment, onResendAssessment,
}) => {
  const router = useRouter();
  const [modalCandidate, setModalCandidate] = useState<Candidate | null>(null);

  if (activeTab === "questions") return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <QuestionsPane />
    </>
  );

  const filtered =
    activeTab === "all"       ? candidates
    : activeTab === "pending" ? candidates.filter(c => c.exam_link_sent && !c.exam_completed && !c.link_expired)
    : activeTab === "completed" ? candidates.filter(c => c.exam_completed)
    : candidates;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="am-tbl-wrap">
        <table className="am-table">
          <thead>
            <tr>
              {["Candidate", "Status", "Score", "Time Taken", "Last Update", "Action"].map(h => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr className="am-empty-row">
                <td colSpan={6}>No candidates in this category</td>
              </tr>
            ) : (
              filtered.map(c => {
                const variant      = getVariant(c);
                const [bg, fg]     = avatarColors(c.name ?? "?");
                const showReject   = variant === "failed";
                const showSchedule = variant === "passed" && !c.interview_scheduled;

                return (
                  <tr key={c.id} onClick={() => setModalCandidate(c)}>
                    {/* Candidate */}
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                        <div className="am-av" style={{ background: bg, color: fg }}>
                          {initials(c.name ?? "?")}
                        </div>
                        <div>
                          <div className="am-cand-nm">{c.name}</div>
                          <div className="am-cand-email">{c.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td>
                      <span className={`am-badge ${VARIANT_CLS[variant]}`}>
                        {VARIANT_LABEL[variant]}
                      </span>
                    </td>

                    {/* Score */}
                    <td>
                      {c.ats_score != null
                        ? <span className={`am-chip ${c.ats_score >= 70 ? "am-chip-ok" : "am-chip-bad"}`}>{c.ats_score}</span>
                        : <span className="am-chip am-chip-none">—</span>}
                    </td>

                    {/* Time taken */}
                    <td>
                      <span className="am-ago">
                        {(c as any).exam_time_taken ? `${(c as any).exam_time_taken}m` : "—"}
                      </span>
                    </td>

                    {/* Last update */}
                    <td>
                      <span className="am-ago">
                        {relDate(c.exam_completed ? (c as any).exam_completed_date : (c as any).exam_link_sent_date)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td onClick={e => e.stopPropagation()}>
                      <div className="am-act-btns">
                        <a
                          className="am-act-view"
                          title="View details"
                          onClick={e => { e.preventDefault(); setModalCandidate(c); }}
                        >↗</a>
                        {showSchedule && (
                          <button
                            className="am-act-schedule"
                            onClick={() => router.push(`/scheduler?candidate_id=${c.id}`)}
                          >
                            <Calendar size={11} /> Schedule
                          </button>
                        )}
                        {showReject && (
                          <button className="am-act-reject">Reject</button>
                        )}
                        {c.assessment_invite_link && (
                          <a
                            className="am-act-view"
                            href={c.assessment_invite_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="View assessment"
                            onClick={e => e.stopPropagation()}
                          >
                            <ExternalLink size={11} />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Portal modal — rendered at document.body level */}
      {modalCandidate && (
        <ResultModal candidate={modalCandidate} onClose={() => setModalCandidate(null)} />
      )}
    </>
  );
};

export default CandidatesTable;