// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchJobsThunk, fetchCandidatesThunk } from "@/services/redux/thunk/assessmentThunk";
// import { RootState, AppDispatch } from "@/services/redux/store";
// import { Job, Candidate } from "@/services/interfaces/CandidateScreening";

// import JobSelector     from "./subComponents/JobSelector";
// import StatsCards      from "./subComponents/StatsCards";
// import Tabs            from "./subComponents/Tabs";
// import CandidatesTable from "./subComponents/CandidatesTable";
// import OverviewTab     from "./subComponents/OverviewTab";
// import ResultsManagement from "./subComponents/ResultsManagement";

// /* ─────────────────────────────────────────────────────────────────────────────
//    GLOBAL CSS — exact port of the HTML <style> block
//    Injected once into the document via a <style> tag so all child components
//    can use the CSS custom-property tokens (--acc, --tx, --card-bg, etc.)
// ───────────────────────────────────────────────────────────────────────────── */
// const GLOBAL_CSS = `
// @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');

// :root {
//   --serif: 'DM Serif Display', Georgia, serif;
//   --sans:  'Inter', system-ui, sans-serif;
// }

// /* ── Dark theme ── */
// [data-am-theme="dark"] {
//   --bg:          #040d0a;
//   --glass:       rgba(255,255,255,0.04);
//   --glass2:      rgba(255,255,255,0.07);
//   --bd:          rgba(0,214,143,0.12);
//   --bd2:         rgba(0,214,143,0.22);
//   --acc:         #00d68f;
//   --acc2:        #059669;
//   --acc3:        #34d399;
//   --accs:        rgba(0,214,143,0.10);
//   --accg:        rgba(0,214,143,0.25);
//   --tx:          #e2faf1;
//   --tx2:         #a7c4b8;
//   --tx3:         #5a8a75;
//   --red:         #f87171;
//   --amber:       #fbbf24;
//   --blue:        #60a5fa;
//   --purple:      #a78bfa;
//   --card-bg:     rgba(255,255,255,0.04);
//   --card-bd:     rgba(0,214,143,0.12);
//   --sb-bg:       rgba(4,13,10,0.97);
//   --btn-text:    #040d0a;
//   --tog-bg:      rgba(0,214,143,0.12);
//   --tog-bd:      rgba(0,214,143,0.25);
//   --tog-col:     #00d68f;
//   --select-bg:   #0d1f18;
//   --select-bd:   rgba(0,214,143,0.25);
//   --tab-act-bd:  #00d68f;
//   --tab-act-col: #00d68f;
//   --ring-stroke: #00d68f;
//   --ring-bg:     rgba(0,214,143,0.08);
//   --dist-bar-bg: rgba(0,214,143,0.08);
//   --status-expired-bg:  rgba(251,191,36,.1);  --status-expired-col:  #fbbf24;
//   --status-failed-bg:   rgba(248,113,113,.1); --status-failed-col:   #f87171;
//   --status-passed-bg:   rgba(0,214,143,.1);   --status-passed-col:   #00d68f;
//   --status-pending-bg:  rgba(96,165,250,.1);  --status-pending-col:  #60a5fa;
//   --reject-btn-bg:  rgba(248,113,113,.1);
//   --reject-btn-col: #f87171;
//   --reject-btn-bd:  rgba(248,113,113,.2);
//   --skel-a:      rgba(255,255,255,.05);
//   --skel-b:      rgba(255,255,255,.1);
// }

// /* ── Light theme ── */
// [data-am-theme="light"] {
//   --bg:          #f0faf6;
//   --glass:       #ffffff;
//   --glass2:      #f4faf7;
//   --bd:          #c5e8d8;
//   --bd2:         #9dd4bb;
//   --acc:         #059669;
//   --acc2:        #047857;
//   --acc3:        #34d399;
//   --accs:        rgba(5,150,105,0.08);
//   --accg:        rgba(5,150,105,0.2);
//   --tx:          #0d2b1e;
//   --tx2:         #2d5a42;
//   --tx3:         #6b9e85;
//   --red:         #dc2626;
//   --amber:       #d97706;
//   --blue:        #2563eb;
//   --purple:      #7c3aed;
//   --card-bg:     #ffffff;
//   --card-bd:     #c5e8d8;
//   --sb-bg:       #ffffff;
//   --btn-text:    #ffffff;
//   --tog-bg:      rgba(5,150,105,0.1);
//   --tog-bd:      rgba(5,150,105,0.25);
//   --tog-col:     #059669;
//   --select-bg:   #ffffff;
//   --select-bd:   #9dd4bb;
//   --tab-act-bd:  #059669;
//   --tab-act-col: #059669;
//   --ring-stroke: #059669;
//   --ring-bg:     rgba(5,150,105,0.08);
//   --dist-bar-bg: rgba(5,150,105,0.08);
//   --status-expired-bg:  rgba(217,119,6,.08);  --status-expired-col:  #d97706;
//   --status-failed-bg:   rgba(220,38,38,.08);  --status-failed-col:   #dc2626;
//   --status-passed-bg:   rgba(5,150,105,.08);  --status-passed-col:   #059669;
//   --status-pending-bg:  rgba(37,99,235,.08);  --status-pending-col:  #2563eb;
//   --reject-btn-bg:  rgba(220,38,38,.08);
//   --reject-btn-col: #dc2626;
//   --reject-btn-bd:  rgba(220,38,38,.18);
//   --skel-a:      #e2e8f0;
//   --skel-b:      #cbd5e1;
// }

// /* ── Keyframes ── */
// @keyframes am-orb  { from{transform:scale(.9);opacity:.6;} to{transform:scale(1.1);opacity:1;} }
// @keyframes am-fup  { to { opacity:1; transform:translateY(0); } }
// @keyframes am-pdot { 0%,100%{opacity:1;} 50%{opacity:.4;} }

// /* ── Shell ── */
// .am-shell {
//   min-height: 100vh;
//   background: var(--bg);
//   color: var(--tx);
//   font-family: var(--sans);
//   transition: background .35s, color .35s;
//   position: relative;
// }

// /* Dark-mode decorative grid + orb */
// [data-am-theme="dark"] .am-shell::before {
//   content: '';
//   position: fixed; inset: 0;
//   background-image:
//     linear-gradient(rgba(0,214,143,.025) 1px, transparent 1px),
//     linear-gradient(90deg, rgba(0,214,143,.025) 1px, transparent 1px);
//   background-size: 48px 48px;
//   pointer-events: none; z-index: 0;
// }
// [data-am-theme="dark"] .am-shell::after {
//   content: '';
//   position: fixed; width: 600px; height: 600px; border-radius: 50%;
//   background: radial-gradient(circle, rgba(0,214,143,.05) 0%, transparent 70%);
//   top: -100px; right: -100px;
//   pointer-events: none; z-index: 0;
//   animation: am-orb 9s ease-in-out infinite alternate;
// }
// [data-am-theme="light"] .am-shell::before,
// [data-am-theme="light"] .am-shell::after { display: none; }

// /* ── Content wrapper ── */
// .am-content {
//   position: relative; z-index: 1;
//   padding: 2rem 2.4rem;
//   max-width: 1300px;
// }

// /* ── Page header ── */
// .am-pg-hdr {
//   display: flex; align-items: flex-start; justify-content: space-between;
//   margin-bottom: 1.75rem;
//   opacity: 0; transform: translateY(12px);
//   animation: am-fup .4s ease .05s forwards;
// }
// .am-pg-title {
//   font-family: var(--serif); font-size: 1.9rem; line-height: 1.15;
//   color: var(--tx); margin-bottom: .3rem; transition: color .35s;
// }
// .am-pg-sub { font-size: .78rem; color: var(--tx3); transition: color .35s; }

// .am-btn-export {
//   background: var(--glass2); color: var(--tx2);
//   font-family: var(--sans); font-size: .76rem; font-weight: 600;
//   padding: .48rem 1rem; border-radius: 9px;
//   border: 1px solid var(--card-bd); cursor: pointer;
//   display: flex; align-items: center; gap: 7px; transition: all .2s;
// }
// .am-btn-export:hover { border-color: var(--acc); color: var(--acc); }

// /* ── Main two-column grid ── */
// .am-main-grid {
//   display: grid;
//   grid-template-columns: 1fr 340px;
//   gap: 1.2rem;
//   align-items: start;
// }

// /* ── Table card wrapper ── */
// .am-table-card {
//   background: var(--card-bg);
//   border: 1px solid var(--card-bd);
//   border-radius: 14px;
//   backdrop-filter: blur(16px);
//   overflow: hidden;
//   transition: background .35s, border-color .35s;
//   opacity: 0; transform: translateY(14px);
//   animation: am-fup .4s ease .28s forwards;
// }

// /* ── Theme toggle ── */
// .am-theme-bar {
//   position: fixed; bottom: 1.2rem; left: 1.2rem; z-index: 9990;
//   display: flex; align-items: center; gap: 9px;
//   background: var(--card-bg); border: 1px solid var(--card-bd);
//   border-radius: 12px; padding: .6rem .9rem; cursor: pointer;
//   backdrop-filter: blur(16px); transition: all .2s;
//   box-shadow: 0 4px 16px rgba(0,0,0,.2);
// }
// .am-theme-bar:hover { border-color: var(--acc); }
// .am-tog-icon  { font-size: .9rem; flex-shrink: 0; }
// .am-tog-label { font-size: .73rem; font-weight: 600; color: var(--tx2); transition: color .35s; }
// .am-tog-track {
//   width: 36px; height: 19px; border-radius: 999px;
//   background: var(--tog-bg); border: 1px solid var(--tog-bd);
//   position: relative; flex-shrink: 0; transition: all .35s;
// }
// .am-tog-thumb {
//   position: absolute; top: 3px; left: 3px;
//   width: 11px; height: 11px; border-radius: 50%;
//   background: var(--tog-col);
//   transition: transform .28s cubic-bezier(.4,0,.2,1), background .35s;
//   box-shadow: 0 0 6px var(--accg);
// }
// [data-am-theme="light"] .am-tog-thumb { transform: translateX(17px); }

// /* ── Notification bar ── */
// .am-notify {
//   display: flex; align-items: center; gap: 10px;
//   background: var(--accs); border: 1px solid var(--bd);
//   border-radius: 10px; padding: .65rem 1rem; margin-bottom: 1.2rem;
//   font-size: .78rem; color: var(--acc);
//   opacity: 0; transform: translateY(8px);
//   animation: am-fup .35s ease .1s forwards;
// }
// .am-notify-msg { flex: 1; font-weight: 500; }
// .am-notify-btn {
//   font-size: .72rem; font-weight: 700; padding: .3rem .8rem;
//   border-radius: 7px; border: none; cursor: pointer;
//   background: var(--acc); color: var(--btn-text);
//   transition: background .15s;
// }
// .am-notify-btn:hover { background: var(--acc3); }
// .am-notify-dismiss {
//   background: transparent; border: none; cursor: pointer;
//   color: var(--tx3); font-size: .85rem; transition: color .15s;
// }
// .am-notify-dismiss:hover { color: var(--acc); }

// /* ── Success message ── */
// .am-success {
//   display: flex; align-items: center; gap: 8px;
//   background: var(--accs); border: 1px solid var(--bd);
//   border-radius: 10px; padding: .55rem 1rem; margin-bottom: 1rem;
//   font-size: .76rem; color: var(--acc); font-weight: 500;
// }

// /* ── Empty / no-job state ── */
// .am-no-job {
//   background: var(--card-bg); border: 1px solid var(--card-bd);
//   border-radius: 14px; padding: 5rem 2rem;
//   display: flex; flex-direction: column; align-items: center; gap: .75rem;
//   text-align: center; backdrop-filter: blur(16px);
//   transition: background .35s, border-color .35s;
// }
// .am-no-job-icon {
//   width: 52px; height: 52px; border-radius: 14px;
//   background: var(--glass2); display: flex; align-items: center;
//   justify-content: center; font-size: 1.4rem; margin-bottom: .25rem;
// }
// .am-no-job-title { font-family: var(--serif); font-size: 1.1rem; color: var(--tx); transition: color .35s; }
// .am-no-job-sub   { font-size: .78rem; color: var(--tx3); max-width: 280px; line-height: 1.6; transition: color .35s; }

// /* ── Responsive ── */
// @media (max-width: 1100px) {
//   .am-main-grid { grid-template-columns: 1fr; }
//   .am-content   { padding: 1.2rem; }
// }
// @media (max-width: 700px) {
//   .am-pg-hdr  { flex-wrap: wrap; gap: .75rem; }
//   .am-content { padding: 1rem; }
// }
// `;

// /* ─────────────────────────────────────────────────────────────────────────────
//    Notification bar — exact match to HTML blue info bar
// ───────────────────────────────────────────────────────────────────────────── */
// const NotifyBar: React.FC<{
//   count: number;
//   onSendAll: () => void;
//   onDismiss: () => void;
// }> = ({ count, onSendAll, onDismiss }) => (
//   <div className="am-notify">
//     <span style={{ fontSize: "1rem" }}>ℹ</span>
//     <p className="am-notify-msg">
//       {count} candidate{count > 1 ? "s have" : " has"} not yet received the assessment.{" "}
//       <span style={{ fontWeight: 400, opacity: .85 }}>Send now to avoid delays.</span>
//     </p>
//     <button className="am-notify-btn" onClick={onSendAll}>Send Now</button>
//     <button className="am-notify-dismiss" onClick={onDismiss}>✕</button>
//   </div>
// );

// /* ─────────────────────────────────────────────────────────────────────────────
//    MAIN COMPONENT
// ───────────────────────────────────────────────────────────────────────────── */
// const AssessmentInterface: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   const { jobs, candidates, assessmentStats, isLoading, message } = useSelector(
//     (state: RootState) => ({
//       jobs:            state.assessment.jobs as Job[],
//       candidates:      state.assessment.candidates,
//       assessmentStats: state.assessment.assessmentStats,
//       isLoading:       state.assessment.isLoading,
//       message:         state.assessment.message,
//     })
//   );

//   const [selectedJob,       setSelectedJob]       = useState<Job | null>(null);
//   const [activeTab,         setActiveTab]          = useState("all");
//   const [theme,             setTheme]              = useState<"dark" | "light">("dark");
//   const [notifyDismissed,   setNotifyDismissed]   = useState(false);
//   const lastFetchedJobRef                          = useRef<string | null>(null);

//   const typedCandidates = candidates as unknown as Candidate[];

//   /* ── Derived stats ── */
//   const pendingCount = typedCandidates.filter(c => !c.exam_link_sent).length;
//   const showNotify   = !notifyDismissed && !!selectedJob && pendingCount > 0;

//   const statsForCards = {
//     totalSent:      typedCandidates.filter(c => c.exam_link_sent).length,
//     totalPending:   pendingCount,
//     totalCompleted: typedCandidates.filter(c => c.exam_completed).length,
//     passRate: (() => {
//       const comp   = typedCandidates.filter(c => c.exam_completed).length;
//       const passed = typedCandidates.filter(c => c.exam_completed && (c.exam_percentage ?? 0) >= 70).length;
//       return comp > 0 ? (passed / comp) * 100 : 0;
//     })(),
//     avgScore: (() => {
//       const scores = typedCandidates.filter(c => c.exam_completed).map(c => c.exam_percentage ?? 0);
//       return scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
//     })(),
//   };

//   /* ── Theme persistence ── */
//   useEffect(() => {
//     const saved = localStorage.getItem("tf-theme");
//     if (saved === "light") setTheme("light");
//   }, []);

//   const toggleTheme = useCallback(() => {
//     setTheme(t => {
//       const next = t === "dark" ? "light" : "dark";
//       localStorage.setItem("tf-theme", next);
//       return next;
//     });
//   }, []);

//   /* ── Data fetching ── */
//   useEffect(() => { dispatch(fetchJobsThunk()); }, [dispatch]);

//   useEffect(() => {
//     if (!selectedJob) return;
//     const key = String(selectedJob.id);
//     if (lastFetchedJobRef.current === key) return;
//     lastFetchedJobRef.current = key;
//     dispatch(fetchCandidatesThunk(Number(selectedJob.id)));
//   }, [selectedJob, dispatch]);

//   const handleRefresh = useCallback(() => {
//     if (!selectedJob) return;
//     lastFetchedJobRef.current = null;
//     dispatch(fetchCandidatesThunk(Number(selectedJob.id)));
//     lastFetchedJobRef.current = String(selectedJob.id);
//   }, [selectedJob, dispatch]);

//   const handleJobChange = useCallback((job: Job | null) => {
//     lastFetchedJobRef.current = null;
//     setSelectedJob(job);
//     setActiveTab("all");
//     setNotifyDismissed(false);
//   }, []);

//   return (
//     <div className="am-shell" data-am-theme={theme}>
//       {/* Inject global CSS once */}
//       <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

//       <div className="am-content">

//         {/* ── Page header ── */}
//         <div className="am-pg-hdr">
//           <div>
//             <h1 className="am-pg-title">Assessment Management</h1>
//             <p className="am-pg-sub">
//               Manage screening tests, track submissions and review results by job position
//             </p>
//           </div>
//           <button className="am-btn-export">📤 Export Results</button>
//         </div>

//         {/* ── KPI strip ── */}
//         <StatsCards stats={statsForCards} />

//         {/* ── Notification bar ── */}
//         {showNotify && (
//           <NotifyBar
//             count={pendingCount}
//             onSendAll={() => setNotifyDismissed(true)}
//             onDismiss={() => setNotifyDismissed(true)}
//           />
//         )}

//         {/* ── Success/error message ── */}
//         {message && (
//           <div className="am-success">✓ {message}</div>
//         )}

//         {/* ── Job selector + per-job stats ── */}
//         <JobSelector
//           jobs={jobs}
//           selectedJob={selectedJob}
//           setSelectedJob={handleJobChange}
//           candidates={typedCandidates}
//         />

//         {/* ── No job selected ── */}
//         {!selectedJob ? (
//           <div className="am-no-job">
//             <div className="am-no-job-icon">📋</div>
//             <div className="am-no-job-title">Select a job position</div>
//             <div className="am-no-job-sub">
//               Choose a position above to view candidates, send assessments, and review results.
//             </div>
//           </div>
//         ) : (
//           /* ── Two-column layout: table + sidebar ── */
//           <div className="am-main-grid">

//             {/* LEFT: candidates table with tabs */}
//             <div className="am-table-card">
//               <Tabs
//                 candidates={typedCandidates}
//                 activeTab={activeTab}
//                 setActiveTab={setActiveTab}
//                 loading={isLoading}
//               />

//               {activeTab === "results" ? (
//                 <div style={{ padding: "1.2rem" }}>
//                   <ResultsManagement
//                     candidates={typedCandidates}
//                     selectedJob={selectedJob}
//                     onRefreshCandidates={handleRefresh}
//                   />
//                 </div>
//               ) : (
//                 <CandidatesTable
//                   candidates={typedCandidates}
//                   activeTab={activeTab}
//                   selectedJob={selectedJob}
//                 />
//               )}
//             </div>

//             {/* RIGHT: overview sidebar (ring + dist + settings) */}
//             <OverviewTab
//               candidates={typedCandidates}
//               assessmentStats={assessmentStats}
//             />
//           </div>
//         )}
//       </div>

//       {/* ── Theme toggle bar (bottom-left, fixed) ── */}
//       <div className="am-theme-bar" onClick={toggleTheme}>
//         <span className="am-tog-icon">{theme === "dark" ? "🌙" : "☀️"}</span>
//         <span className="am-tog-label">{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
//         <div className="am-tog-track"><div className="am-tog-thumb" /></div>
//       </div>
//     </div>
//   );
// };

// export default AssessmentInterface;
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchJobsThunk, fetchCandidatesThunk } from "@/services/redux/thunk/assessmentThunk";
import { RootState, AppDispatch } from "@/services/redux/store";
import { Job, Candidate } from "@/services/interfaces/CandidateScreening";

import JobSelector      from "./subComponents/JobSelector";
import StatsCards       from "./subComponents/StatsCards";
import Tabs             from "./subComponents/Tabs";
import CandidatesTable  from "./subComponents/CandidatesTable";
import OverviewTab      from "./subComponents/OverviewTab";
import ResultsManagement from "./subComponents/ResultsManagement";

/* ─── Global CSS ─────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');

:root {
  --serif: 'DM Serif Display', Georgia, serif;
  --sans:  'Inter', system-ui, sans-serif;
}

[data-am-theme="dark"] {
  --bg:        #040d0a;
  --glass:     rgba(255,255,255,0.04);
  --glass2:    rgba(255,255,255,0.07);
  --bd:        rgba(0,214,143,0.12);
  --bd2:       rgba(0,214,143,0.22);
  --acc:       #00d68f;  --acc2: #059669; --acc3: #34d399;
  --accs:      rgba(0,214,143,0.10);
  --accg:      rgba(0,214,143,0.25);
  --tx:        #e2faf1; --tx2: #a7c4b8; --tx3: #5a8a75;
  --red:       #f87171; --amber: #fbbf24; --blue: #60a5fa; --purple: #a78bfa;
  --card-bg:   rgba(255,255,255,0.04);
  --card-bd:   rgba(0,214,143,0.12);
  --sb-bg:     rgba(4,13,10,0.97);
  --btn-text:  #040d0a;
  --tog-bg:    rgba(0,214,143,0.12);
  --tog-bd:    rgba(0,214,143,0.25);
  --tog-col:   #00d68f;
  --select-bg: #0d1f18;
  --select-bd: rgba(0,214,143,0.25);
  --tab-act-bd:  #00d68f;
  --tab-act-col: #00d68f;
  --ring-stroke: #00d68f;
  --ring-bg:   rgba(0,214,143,0.08);
  --dist-bar-bg: rgba(0,214,143,0.08);
  --status-expired-bg:rgba(251,191,36,.1);  --status-expired-col:#fbbf24;
  --status-failed-bg: rgba(248,113,113,.1); --status-failed-col: #f87171;
  --status-passed-bg: rgba(0,214,143,.1);   --status-passed-col: #00d68f;
  --status-pending-bg:rgba(96,165,250,.1);  --status-pending-col:#60a5fa;
  --reject-btn-bg: rgba(248,113,113,.1);
  --reject-btn-col:#f87171;
  --reject-btn-bd: rgba(248,113,113,.2);
  --skel-a:    rgba(255,255,255,.05);
  --skel-b:    rgba(255,255,255,.1);
}

[data-am-theme="light"] {
  --bg:        #f0faf6;
  --glass:     #ffffff; --glass2: #f4faf7;
  --bd:        #c5e8d8; --bd2: #9dd4bb;
  --acc:       #059669; --acc2: #047857; --acc3: #34d399;
  --accs:      rgba(5,150,105,0.08);
  --accg:      rgba(5,150,105,0.2);
  --tx:        #0d2b1e; --tx2: #2d5a42; --tx3: #6b9e85;
  --red:       #dc2626; --amber: #d97706; --blue: #2563eb; --purple: #7c3aed;
  --card-bg:   #ffffff;
  --card-bd:   #c5e8d8;
  --sb-bg:     #ffffff;
  --btn-text:  #ffffff;
  --tog-bg:    rgba(5,150,105,0.1);
  --tog-bd:    rgba(5,150,105,0.25);
  --tog-col:   #059669;
  --select-bg: #ffffff;
  --select-bd: #9dd4bb;
  --tab-act-bd:  #059669;
  --tab-act-col: #059669;
  --ring-stroke: #059669;
  --ring-bg:   rgba(5,150,105,0.08);
  --dist-bar-bg: rgba(5,150,105,0.08);
  --status-expired-bg:rgba(217,119,6,.08);  --status-expired-col:#d97706;
  --status-failed-bg: rgba(220,38,38,.08);  --status-failed-col: #dc2626;
  --status-passed-bg: rgba(5,150,105,.08);  --status-passed-col: #059669;
  --status-pending-bg:rgba(37,99,235,.08);  --status-pending-col:#2563eb;
  --reject-btn-bg: rgba(220,38,38,.08);
  --reject-btn-col:#dc2626;
  --reject-btn-bd: rgba(220,38,38,.18);
  --skel-a:    #e2e8f0;
  --skel-b:    #cbd5e1;
}

@keyframes am-orb  { from{transform:scale(.9);opacity:.6;} to{transform:scale(1.1);opacity:1;} }
@keyframes am-fup  { to { opacity:1; transform:translateY(0); } }
@keyframes am-pdot { 0%,100%{opacity:1;} 50%{opacity:.4;} }
@keyframes am-npii { from{opacity:0;transform:translateX(-8px);} to{opacity:1;transform:translateX(0);} }
@keyframes am-fadeSlide { from{opacity:0;transform:translateY(-6px);} to{opacity:1;transform:translateY(0);} }

.am-shell {
  min-height: 100vh;
  background: var(--bg);
  color: var(--tx);
  font-family: var(--sans);
  transition: background .35s, color .35s;
  position: relative;
}

[data-am-theme="dark"] .am-shell::before {
  content: '';
  position: fixed; inset: 0;
  background-image:
    linear-gradient(rgba(0,214,143,.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,214,143,.025) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none; z-index: 0;
}
[data-am-theme="dark"] .am-shell::after {
  content: '';
  position: fixed; width: 600px; height: 600px; border-radius: 50%;
  background: radial-gradient(circle, rgba(0,214,143,.05) 0%, transparent 70%);
  top: -100px; right: -100px;
  pointer-events: none; z-index: 0;
  animation: am-orb 9s ease-in-out infinite alternate;
}
[data-am-theme="light"] .am-shell::before,
[data-am-theme="light"] .am-shell::after { display: none; }

/* ── Content: full width, no max-width cap, proper padding ── */
.am-content {
  position: relative; z-index: 1;
  padding: 2rem 2rem 2rem 2rem;
  width: 100%;
  box-sizing: border-box;
}

.am-pg-hdr {
  display: flex; align-items: flex-start; justify-content: space-between;
  margin-bottom: 1.75rem;
  opacity: 0; transform: translateY(12px);
  animation: am-fup .4s ease .05s forwards;
}
.am-pg-title {
  font-family: var(--serif); font-size: 1.9rem; line-height: 1.15;
  color: var(--tx); margin-bottom: .3rem; transition: color .35s;
}
.am-pg-sub { font-size: .78rem; color: var(--tx3); transition: color .35s; }

.am-btn-export {
  background: var(--glass2); color: var(--tx2);
  font-family: var(--sans); font-size: .76rem; font-weight: 600;
  padding: .48rem 1rem; border-radius: 9px;
  border: 1px solid var(--card-bd); cursor: pointer;
  display: flex; align-items: center; gap: 7px; transition: all .2s;
}
.am-btn-export:hover { border-color: var(--acc); color: var(--acc); }

/* ── Main two-column grid ── */
.am-main-grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 1.2rem;
  align-items: start;
}

.am-table-card {
  background: var(--card-bg);
  border: 1px solid var(--card-bd);
  border-radius: 14px;
  backdrop-filter: blur(16px);
  overflow: hidden;
  transition: background .35s, border-color .35s;
  opacity: 0; transform: translateY(14px);
  animation: am-fup .4s ease .28s forwards;
}

/* Notify bar */
.am-notify {
  display: flex; align-items: center; gap: 10px;
  background: rgba(96,165,250,.1); border: 1px solid rgba(96,165,250,.2);
  border-radius: 10px; padding: .7rem 1rem; margin-bottom: 1.2rem;
  font-size: .78rem; color: var(--blue); flex-wrap: wrap;
}
.am-notify-msg  { flex: 1; min-width: 0; }
.am-notify-btn  {
  background: var(--blue); color: #fff; border: none;
  border-radius: 7px; padding: .3rem .8rem;
  font-family: var(--sans); font-size: .73rem; font-weight: 600;
  cursor: pointer; white-space: nowrap;
}
.am-notify-dismiss {
  background: none; border: none; color: var(--blue);
  cursor: pointer; font-size: .85rem; font-family: var(--sans);
}

.am-success {
  background: rgba(0,214,143,.1); border: 1px solid rgba(0,214,143,.2);
  border-radius: 10px; padding: .7rem 1rem; margin-bottom: 1.2rem;
  font-size: .78rem; color: var(--acc);
}

.am-no-job {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  min-height: 280px; text-align: center; gap: .8rem;
}
.am-no-job-icon  { font-size: 2.8rem; }
.am-no-job-title { font-family: var(--serif); font-size: 1.1rem; color: var(--tx); transition: color .35s; }
.am-no-job-sub   { font-size: .78rem; color: var(--tx3); max-width: 280px; line-height: 1.6; transition: color .35s; }

@media (max-width: 1100px) {
  .am-main-grid { grid-template-columns: 1fr; }
  .am-content   { padding: 1.2rem; }
}
@media (max-width: 700px) {
  .am-pg-hdr  { flex-wrap: wrap; gap: .75rem; }
  .am-content { padding: 1rem; }
}

/* ══ FAB NAV BUTTON ══════════════════════════════════════════════════════════ */
.am-fab {
  position: fixed;
  width: 44px; height: 44px;
  border-radius: 13px;
  background: #1a2535;
  border: 1px solid rgba(255,255,255,.12);
  box-shadow: 0 6px 24px rgba(0,0,0,.5);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; z-index: 9999;
  user-select: none;
  transition: box-shadow .2s, border-color .2s;
}
.am-fab:hover { border-color: rgba(0,214,143,.4); }
.am-fab.open  {
  background: var(--acc);
  border-color: var(--acc);
  box-shadow: 0 6px 28px var(--accg);
}

/* ══ NAV PANEL ═══════════════════════════════════════════════════════════════ */
.am-nav-panel {
  position: fixed;
  width: 258px;
  background: #0a1810;
  border: 1px solid rgba(0,214,143,.15);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,.65);
  z-index: 9997;
  overflow: hidden;
  opacity: 0; pointer-events: none;
  transform: scale(.93);
  transition: all .26s cubic-bezier(.4,0,.2,1);
  font-family: var(--sans);
}
.am-nav-panel.show {
  opacity: 1; pointer-events: all;
  transform: scale(1);
}

.am-np-hdr {
  padding: .82rem 1rem .7rem;
  border-bottom: 1px solid rgba(0,214,143,.08);
  display: flex; align-items: center; justify-content: space-between;
}
.am-np-title {
  font-size: .58rem; font-weight: 700;
  letter-spacing: .12em; text-transform: uppercase;
  color: rgba(0,214,143,.3);
}
.am-np-x {
  width: 20px; height: 20px; border-radius: 5px;
  background: rgba(255,255,255,.05); border: none;
  color: rgba(255,255,255,.35); font-size: .68rem;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all .15s; font-family: var(--sans);
}
.am-np-x:hover { background: rgba(255,255,255,.1); color: #fff; }

.am-np-curr {
  margin: .55rem .75rem .3rem;
  background: rgba(0,214,143,.08);
  border: 1px solid rgba(0,214,143,.18);
  border-radius: 8px; padding: .45rem .7rem;
  display: flex; align-items: center; justify-content: space-between;
}
.am-np-cdot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #00d68f; animation: am-pdot 1.5s infinite; flex-shrink: 0;
}
.am-np-clbl { font-size: .58rem; color: rgba(255,255,255,.38); margin-bottom: .07rem; }
.am-np-cnm  { font-size: .75rem; font-weight: 600; color: #00d68f; }

.am-np-sec {
  font-size: .55rem; font-weight: 700; letter-spacing: .12em;
  text-transform: uppercase; color: rgba(0,214,143,.22);
  padding: .58rem .82rem .2rem;
}

.am-np-item {
  display: flex; align-items: center; gap: 9px;
  padding: .5rem .82rem; margin: 1px .42rem;
  border-radius: 9px; cursor: pointer; transition: all .13s;
  text-decoration: none; position: relative;
}
.am-np-item:hover { background: rgba(255,255,255,.06); }
.am-np-item.nact  { background: rgba(0,214,143,.1); }
.am-np-item.nact::before {
  content: ''; position: absolute; left: -1px; top: 50%;
  transform: translateY(-50%);
  width: 3px; height: 62%; border-radius: 0 2px 2px 0;
  background: #00d68f; box-shadow: 0 0 7px #00d68f;
}

.am-np-ic {
  width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; font-size: .85rem;
}
.am-np-item.nact .am-np-ic { background: rgba(0,214,143,.12); }

.am-np-nm  { font-size: .75rem; font-weight: 500; color: rgba(255,255,255,.65); }
.am-np-sub { font-size: .6rem; color: rgba(255,255,255,.24); }
.am-np-item.nact .am-np-nm { color: #e2faf1; font-weight: 600; }

.am-np-bdg {
  margin-left: auto; flex-shrink: 0;
  background: #00d68f; color: #040d0a;
  font-size: .54rem; font-weight: 700;
  padding: .07rem .38rem; border-radius: 999px;
}
.am-np-ai {
  margin-left: auto; flex-shrink: 0;
  font-size: .5rem; font-weight: 700;
  background: rgba(0,214,143,.1); color: #00d68f;
  border: 1px solid rgba(0,214,143,.2);
  padding: .07rem .34rem; border-radius: 999px;
}

.am-np-div {
  height: 1px; background: rgba(0,214,143,.08);
  margin: .35rem .75rem;
}

/* Theme toggle row inside nav panel */
.am-np-tog-row {
  margin: .42rem .75rem .75rem;
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 10px; padding: .52rem .7rem;
  display: flex; align-items: center; justify-content: space-between;
  cursor: pointer; transition: background .2s;
}
.am-np-tog-row:hover { background: rgba(255,255,255,.07); }
.am-np-tog-lbl { font-size: .68rem; color: rgba(255,255,255,.45); }
.am-np-tog-switch {
  display: flex; align-items: center; gap: 5px;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 999px; padding: .16rem .16rem .16rem .52rem;
}
.am-np-inner-lbl { font-size: .56rem; font-weight: 700; color: rgba(255,255,255,.4); min-width: 24px; }
.am-np-trk {
  width: 25px; height: 13px; border-radius: 999px;
  background: rgba(0,214,143,.2); position: relative;
}
.am-np-thumb {
  position: absolute; top: 2px; left: 2px;
  width: 9px; height: 9px; border-radius: 50%;
  background: #00d68f;
  transition: all .25s cubic-bezier(.4,0,.2,1);
}
.am-np-tog-row.light-mode .am-np-thumb { transform: translateX(12px); }
.am-np-tog-row.light-mode .am-np-inner-lbl { color: rgba(255,255,255,.65); }

/* Nav panel item entrance animation */
.am-nav-panel.show .am-np-item { animation: am-npii .22s ease both; }
.am-nav-panel.show .am-np-item:nth-child(1){animation-delay:.03s}
.am-nav-panel.show .am-np-item:nth-child(2){animation-delay:.06s}
.am-nav-panel.show .am-np-item:nth-child(3){animation-delay:.09s}
.am-nav-panel.show .am-np-item:nth-child(4){animation-delay:.12s}
.am-nav-panel.show .am-np-item:nth-child(5){animation-delay:.15s}
.am-nav-panel.show .am-np-item:nth-child(6){animation-delay:.18s}
.am-nav-panel.show .am-np-item:nth-child(7){animation-delay:.21s}

/* Backdrop */
.am-nav-bd { position: fixed; inset: 0; z-index: 9996; display: none; }
.am-nav-bd.show { display: block; }
`;

/* ─── Nav items config ───────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { section: "Recruitment", items: [
    { path: "/dashboard",          label: "Dashboard",        sub: "Recruitment overview",  icon: "📊", badge: null,  badgeType: null  },
    { path: "/candidates",         label: "Candidates",       sub: "Manage applicants",     icon: "👥", badge: null,  badgeType: null  },
    { path: "/scheduler",          label: "Scheduling",       sub: "Interview calendar",    icon: "🗓", badge: null,  badgeType: null  },
  ]},
  { section: "Screening", items: [
    { path: "/assessments",        label: "Assessments",      sub: "Tests & evaluations",   icon: "📋", badge: null,  badgeType: null  },
    { path: "/interview-results",  label: "Interview Results",sub: "Review outcomes",       icon: "🎯", badge: "5",   badgeType: "green"},
  ]},
  { section: "Tools", items: [
    { path: "/candidates",         label: "ATS Checking",     sub: "AI-powered screening",  icon: "🤖", badge: "AI",  badgeType: "ai"  },
    { path: "/reports",            label: "Reports",          sub: "Analytics & insights",  icon: "📈", badge: null,  badgeType: null  },
  ]},
];

/* ─── Notification bar ───────────────────────────────────────────────────── */
const NotifyBar: React.FC<{ count: number; onSendAll: () => void; onDismiss: () => void }> = ({
  count, onSendAll, onDismiss,
}) => (
  <div className="am-notify">
    <span style={{ fontSize: "1rem" }}>ℹ</span>
    <p className="am-notify-msg">
      {count} candidate{count > 1 ? "s have" : " has"} not yet received the assessment.{" "}
      <span style={{ fontWeight: 400, opacity: 0.85 }}>Send now to avoid delays.</span>
    </p>
    <button className="am-notify-btn" onClick={onSendAll}>Send Now</button>
    <button className="am-notify-dismiss" onClick={onDismiss}>✕</button>
  </div>
);

/* ─── Main component ─────────────────────────────────────────────────────── */
const AssessmentInterface: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router   = useRouter();

  const { jobs, candidates, assessmentStats, isLoading, message } = useSelector(
    (state: RootState) => ({
      jobs:            state.assessment.jobs as Job[],
      candidates:      state.assessment.candidates,
      assessmentStats: state.assessment.assessmentStats,
      isLoading:       state.assessment.isLoading,
      message:         state.assessment.message,
    })
  );

  const [selectedJob,     setSelectedJob]     = useState<Job | null>(null);
  const [activeTab,       setActiveTab]        = useState("all");
  const [theme,           setTheme]            = useState<"dark" | "light">("dark");
  const [notifyDismissed, setNotifyDismissed]  = useState(false);

  // FAB / nav panel state
  const [navOpen,  setNavOpen]  = useState(false);
  // FAB position — bottom-left, draggable
  const [fabPos,   setFabPos]   = useState({ bottom: 22, left: 22 });
  const fabRef     = useRef<HTMLDivElement>(null);
  const panelRef   = useRef<HTMLDivElement>(null);
  const dragging   = useRef(false);
  const dragStart  = useRef({ x: 0, y: 0, bottom: 22, left: 22 });

  const lastFetchedJobRef = useRef<string | null>(null);
  const typedCandidates   = candidates as unknown as Candidate[];

  /* Derived stats */
  const pendingCount = typedCandidates.filter(c => !c.exam_link_sent).length;
  const showNotify   = !notifyDismissed && !!selectedJob && pendingCount > 0;

  const statsForCards = {
    totalSent:      typedCandidates.filter(c => c.exam_link_sent).length,
    totalPending:   pendingCount,
    totalCompleted: typedCandidates.filter(c => c.exam_completed).length,
    passRate: (() => {
      const comp   = typedCandidates.filter(c => c.exam_completed).length;
      const passed = typedCandidates.filter(c => c.exam_completed && (c.exam_percentage ?? 0) >= 70).length;
      return comp > 0 ? (passed / comp) * 100 : 0;
    })(),
    avgScore: (() => {
      const scores = typedCandidates.filter(c => c.exam_completed).map(c => c.exam_percentage ?? 0);
      return scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    })(),
  };

  /* Theme persistence */
  useEffect(() => {
    const saved = localStorage.getItem("tf-theme");
    if (saved === "light") setTheme("light");
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(t => {
      const next = t === "dark" ? "light" : "dark";
      localStorage.setItem("tf-theme", next);
      return next;
    });
  }, []);

  /* Data fetching */
  useEffect(() => { dispatch(fetchJobsThunk()); }, [dispatch]);

  useEffect(() => {
    if (!selectedJob) return;
    const key = String(selectedJob.id);
    if (lastFetchedJobRef.current === key) return;
    lastFetchedJobRef.current = key;
    dispatch(fetchCandidatesThunk(Number(selectedJob.id)));
  }, [selectedJob, dispatch]);

  const handleRefresh = useCallback(() => {
    if (!selectedJob) return;
    lastFetchedJobRef.current = null;
    dispatch(fetchCandidatesThunk(Number(selectedJob.id)));
    lastFetchedJobRef.current = String(selectedJob.id);
  }, [selectedJob, dispatch]);

  const handleJobChange = useCallback((job: Job | null) => {
    lastFetchedJobRef.current = null;
    setSelectedJob(job);
    setActiveTab("all");
    setNotifyDismissed(false);
  }, []);

  /* Close nav on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        navOpen &&
        panelRef.current && !panelRef.current.contains(e.target as Node) &&
        fabRef.current   && !fabRef.current.contains(e.target as Node)
      ) setNavOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [navOpen]);

  /* Escape closes panel */
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setNavOpen(false); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, []);

  /* Draggable FAB */
  const onFabMouseDown = (e: React.MouseEvent) => {
    dragging.current = false;
    dragStart.current = {
      x: e.clientX, y: e.clientY,
      bottom: fabPos.bottom, left: fabPos.left,
    };
    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - dragStart.current.x;
      const dy = ev.clientY - dragStart.current.y;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragging.current = true;
      if (dragging.current) {
        const newLeft   = Math.max(0, Math.min(window.innerWidth  - 50, dragStart.current.left   + dx));
        const newBottom = Math.max(0, Math.min(window.innerHeight - 50, dragStart.current.bottom - dy));
        setFabPos({ left: newLeft, bottom: newBottom });
      }
    };
    const onUp = () => {
      if (!dragging.current) setNavOpen(o => !o);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup",   onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup",   onUp);
    e.preventDefault();
  };

  /* Position nav panel above/beside FAB */
  const getPanelStyle = (): React.CSSProperties => {
    const panelW = 258, panelH = 490;
    let left   = fabPos.left + 54;
    let bottom = fabPos.bottom;
    if (left + panelW > window.innerWidth  - 8) left   = fabPos.left - panelW - 8;
    if (bottom + panelH > window.innerHeight - 8) bottom = window.innerHeight - panelH - 8;
    return { left, bottom: Math.max(8, bottom) };
  };

  const currentPath = "/assessments";

  return (
    <div className="am-shell" data-am-theme={theme}>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      {/* ── Content (full width) ── */}
      <div className="am-content">

        {/* Page header */}
        <div className="am-pg-hdr">
          <div>
            <h1 className="am-pg-title">Assessment Management</h1>
            <p className="am-pg-sub">
              Manage screening tests, track submissions and review results by job position
            </p>
          </div>
          <button className="am-btn-export">📤 Export Results</button>
        </div>

        {/* KPI strip */}
        <StatsCards stats={statsForCards} />

        {/* Notification bar */}
        {showNotify && (
          <NotifyBar
            count={pendingCount}
            onSendAll={() => setNotifyDismissed(true)}
            onDismiss={() => setNotifyDismissed(true)}
          />
        )}

        {/* Success/error message */}
        {message && <div className="am-success">✓ {message}</div>}

        {/* Job selector */}
        <JobSelector
          jobs={jobs}
          selectedJob={selectedJob}
          setSelectedJob={handleJobChange}
          candidates={typedCandidates}
        />

        {/* No job selected */}
        {!selectedJob ? (
          <div className="am-no-job">
            <div className="am-no-job-icon">📋</div>
            <div className="am-no-job-title">Select a job position</div>
            <div className="am-no-job-sub">
              Choose a position above to view candidates, send assessments, and review results.
            </div>
          </div>
        ) : (
          <div className="am-main-grid">
            {/* LEFT: candidates table */}
            <div className="am-table-card">
              <Tabs
                candidates={typedCandidates}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                loading={isLoading}
              />
              {activeTab === "results" ? (
                <div style={{ padding: "1.2rem" }}>
                  <ResultsManagement
                    candidates={typedCandidates}
                    selectedJob={selectedJob}
                    onRefreshCandidates={handleRefresh}
                  />
                </div>
              ) : (
                <CandidatesTable
                  candidates={typedCandidates}
                  activeTab={activeTab}
                  selectedJob={selectedJob}
                />
              )}
            </div>

            {/* RIGHT: overview sidebar */}
            <OverviewTab
              candidates={typedCandidates}
              assessmentStats={assessmentStats}
            />
          </div>
        )}
      </div>

      {/* ════ FAB NAV BUTTON (draggable, bottom-left) ════ */}
      <div
        ref={fabRef}
        className={`am-fab${navOpen ? " open" : ""}`}
        style={{ bottom: fabPos.bottom, left: fabPos.left }}
        onMouseDown={onFabMouseDown}
        title="Navigation"
      >
        {/* Layers icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke={navOpen ? "#040d0a" : "white"} strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
          style={{ pointerEvents: "none", transition: "transform .3s ease", transform: navOpen ? "rotate(180deg)" : "none" }}
        >
          <polygon points="12 2 2 7 12 12 22 7 12 2"/>
          <polyline points="2 17 12 22 22 17"/>
          <polyline points="2 12 12 17 22 12"/>
        </svg>
      </div>

      {/* ════ NAV PANEL ════ */}
      <div
        ref={panelRef}
        className={`am-nav-panel${navOpen ? " show" : ""}`}
        style={navOpen ? getPanelStyle() : { left: -9999, bottom: -9999 }}
      >
        {/* Header */}
        <div className="am-np-hdr">
          <span className="am-np-title">Navigation</span>
          <button className="am-np-x" onClick={() => setNavOpen(false)}>✕</button>
        </div>

        {/* Current page indicator */}
        <div className="am-np-curr">
          <div>
            <div className="am-np-clbl">Current page</div>
            <div className="am-np-cnm">Assessments</div>
          </div>
          <div className="am-np-cdot" />
        </div>

        {/* Nav sections */}
        {NAV_ITEMS.map(group => (
          <div key={group.section}>
            <div className="am-np-sec">{group.section}</div>
            {group.items.map(item => (
              <div
                key={item.path + item.label}
                className={`am-np-item${item.path === currentPath && item.label === "Assessments" ? " nact" : ""}`}
                onClick={() => { setNavOpen(false); router.push(item.path); }}
              >
                <div className="am-np-ic">{item.icon}</div>
                <div>
                  <div className="am-np-nm">{item.label}</div>
                  <div className="am-np-sub">{item.sub}</div>
                </div>
                {item.badge && item.badgeType === "green" && (
                  <span className="am-np-bdg">{item.badge}</span>
                )}
                {item.badge && item.badgeType === "ai" && (
                  <span className="am-np-ai">{item.badge}</span>
                )}
              </div>
            ))}
            <div className="am-np-div" />
          </div>
        ))}

        {/* Theme toggle inside panel */}
        <div
          className={`am-np-tog-row${theme === "light" ? " light-mode" : ""}`}
          onClick={toggleTheme}
        >
          <span className="am-np-tog-lbl">
            {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </span>
          <div className="am-np-tog-switch">
            <span className="am-np-inner-lbl">{theme === "dark" ? "Dark" : "Light"}</span>
            <div className="am-np-trk">
              <div className="am-np-thumb" />
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className={`am-nav-bd${navOpen ? " show" : ""}`}
        onClick={() => setNavOpen(false)}
      />
    </div>
  );
};

export default AssessmentInterface;