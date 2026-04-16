// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { useRouter } from "next/navigation";
// import { RefreshCw } from "lucide-react";

// import StatsStrip          from "./subComponents/StatsStrip";
// import CandidatesTable     from "./subComponents/CandidatesTable";
// import LiveSessions        from "./subComponents/LiveSessions";
// import CandidateDetailsModal from "./subComponents/CandidateDetailsModal";

// import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
// import {
//   fetchInterviewResults,
//   fetchInterviewStats,
//   exportInterviewCsv,
// } from "@/services/redux/thunk/interviewThunk";

// import type { InterviewRow, Verdict } from "./subComponents/CandidatesTable";

// const AUTO_REFRESH_MS = 30_000;

// /* ─────────────────────────────────────────────────────────────────────────────
//    mapResult — normalises raw API row → InterviewRow
// ───────────────────────────────────────────────────────────────────────────── */
// function mapResult(r: any, i: number): InterviewRow {
//   return {
//     id:          String(r.id ?? i),
//     name:        r.candidate_name ?? r.name ?? "Unknown",
//     email:       r.email ?? "",
//     role:        r.job_title ?? r.role ?? "",
//     dept:        r.department ?? r.dept ?? "",
//     interviewer: r.interviewer ?? r.interviewer_name ?? "—",
//     round:       r.round ?? r.interview_round ?? "R1",
//     date:        r.date ?? r.interview_date ?? r.created_at ?? "",
//     verdict:     (r.verdict ?? r.status ?? "pending") as Verdict,
//     score:       r.score != null ? Number(r.score) : null,
//     duration:    r.duration ?? null,
//     criteria:    r.criteria ?? {},
//     feedback:    r.feedback ?? r.comments ?? "No feedback recorded.",
//   };
// }

// /* demo data when API returns nothing */
// function makeDemoData(): InterviewRow[] {
//   const names = [
//     ["Ankani Sairam", "Product Manager"],
//     ["Sai Nithish Dasari", "Data Science"],
//     ["Ankani Sairam", "Web Developer"],
//     ["Sai Nithish Dasari", "Product Manager"],
//     ["Ankani Sairam", "AI/ML"],
//     ["Sai Nithish Dasari", "Python Developer"],
//     ["Ankani Sairam", "Data Science"],
//     ["Ankani Sairam", "Junior Data Science"],
//     ["Ankani Sairam", "Python Developer"],
//     ["Sai Nithish Dasari", "Web Developer"],
//     ["Sai Nithish Dasari", "AI/ML"],
//     ["Ankani Sairam", "UX Designer"],
//     ["Sai Nithish Dasari", "Web Developer"],
//     ["Sai Nithish Dasari", "UX Designer"],
//     ["Ankani Sairam", "Junior Python Developer"],
//     ["Sai Nithish Dasari", "Python Developer"],
//     ["Sai Nithish Dasari", "Junior Data Science"],
//     ["Sai Nithish Dasari", "Junior Python Developer"],
//     ["Ankani Sairam", "Senior Engineer"],
//     ["Sai Nithish Dasari", "Data Science"],
//   ];
//   const dates = ["—", "3d ago", "2w ago", "2d ago", "4d ago", "Yesterday", "—", "—", "—", "—",
//                  "3d ago", "—", "2w ago", "—", "—", "—", "—", "—", "—", "—"];
//   return names.map(([name, role], i) => ({
//     id:          String(i + 1),
//     name,
//     email:       name.toLowerCase().replace(" ", ".") + "@gmail.com",
//     role,
//     dept:        "",
//     interviewer: "—",
//     round:       "R1",
//     date:        dates[i] ?? "—",
//     verdict:     "pending" as Verdict,
//     score:       null,
//     duration:    null,
//     criteria:    {},
//     feedback:    "No feedback recorded.",
//   }));
// }

// /* ─────────────────────────────────────────────────────────────────────────────
//    GLOBAL CSS  — dark + light theme, mirrors HTML exactly
// ───────────────────────────────────────────────────────────────────────────── */
// const GLOBAL_CSS = `
// @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap');
// :root { --serif:'DM Serif Display',Georgia,serif; --sans:'Inter',system-ui,sans-serif; }

// [data-ir-theme="dark"] {
//   --bg:#040d0a; --glass:rgba(255,255,255,0.04); --glass2:rgba(255,255,255,0.07);
//   --bd:rgba(0,214,143,0.12); --bd2:rgba(0,214,143,0.22);
//   --acc:#00d68f; --acc2:#059669; --acc3:#34d399;
//   --accs:rgba(0,214,143,0.10); --accg:rgba(0,214,143,0.25);
//   --tx:#e2faf1; --tx2:#a7c4b8; --tx3:#5a8a75;
//   --red:#f87171; --amber:#fbbf24; --blue:#60a5fa; --purple:#a78bfa; --orange:#fb923c;
//   --card-bg:rgba(255,255,255,0.04); --card-bd:rgba(0,214,143,0.12);
//   --btn-text:#040d0a;
//   --tog-bg:rgba(0,214,143,0.12); --tog-bd:rgba(0,214,143,0.25); --tog-col:#00d68f;
//   --tab-pill-bg:rgba(0,214,143,0.12); --tab-pill-col:var(--acc);
//   --tab-pill-off:rgba(255,255,255,0.05); --tab-pill-off-col:var(--tx3);
//   --tbl-hdr:rgba(0,214,143,0.03); --tbl-bd:rgba(0,214,143,0.05);
//   --ring-stroke:#00d68f; --ring-bg:rgba(0,214,143,0.08);
//   --bar-bg:rgba(0,214,143,0.08);
//   --verdict-pending-bg:rgba(96,165,250,.1);  --verdict-pending-col:#60a5fa;
//   --verdict-offered-bg:rgba(0,214,143,.1);   --verdict-offered-col:#00d68f;
//   --verdict-rejected-bg:rgba(248,113,113,.1);--verdict-rejected-col:#f87171;
//   --verdict-hold-bg:rgba(251,191,36,.1);     --verdict-hold-col:#fbbf24;
//   --verdict-next-bg:rgba(167,139,250,.1);    --verdict-next-col:#a78bfa;
// }
// [data-ir-theme="light"] {
//   --bg:#f0faf6; --glass:#ffffff; --glass2:#f4faf7;
//   --bd:#c5e8d8; --bd2:#9dd4bb;
//   --acc:#059669; --acc2:#047857; --acc3:#34d399;
//   --accs:rgba(5,150,105,0.08); --accg:rgba(5,150,105,0.2);
//   --tx:#0d2b1e; --tx2:#2d5a42; --tx3:#6b9e85;
//   --red:#dc2626; --amber:#d97706; --blue:#2563eb; --purple:#7c3aed; --orange:#ea580c;
//   --card-bg:#ffffff; --card-bd:#c5e8d8;
//   --btn-text:#ffffff;
//   --tog-bg:rgba(5,150,105,0.1); --tog-bd:rgba(5,150,105,0.25); --tog-col:#059669;
//   --tab-pill-bg:#059669; --tab-pill-col:#ffffff;
//   --tab-pill-off:#ffffff; --tab-pill-off-col:#6b9e85;
//   --tbl-hdr:#f8fafb; --tbl-bd:#e8f5ef;
//   --ring-stroke:#059669; --ring-bg:rgba(5,150,105,0.08);
//   --bar-bg:rgba(5,150,105,0.08);
//   --verdict-pending-bg:rgba(37,99,235,.08);  --verdict-pending-col:#2563eb;
//   --verdict-offered-bg:rgba(5,150,105,.08);  --verdict-offered-col:#059669;
//   --verdict-rejected-bg:rgba(220,38,38,.08); --verdict-rejected-col:#dc2626;
//   --verdict-hold-bg:rgba(217,119,6,.08);     --verdict-hold-col:#d97706;
//   --verdict-next-bg:rgba(124,58,237,.08);    --verdict-next-col:#7c3aed;
// }

// @keyframes ir-fup { to { opacity:1; transform:translateY(0); } }
// @keyframes ir-orb  { from{transform:scale(.9);opacity:.6} to{transform:scale(1.1);opacity:1} }

// /* ── Shell ── */
// .ir-shell {
//   min-height: 100vh; background: var(--bg); color: var(--tx);
//   font-family: var(--sans); position: relative;
//   transition: background .35s, color .35s; overflow-x: hidden;
// }
// [data-ir-theme="dark"] .ir-shell::before {
//   content: ''; position: fixed; inset: 0;
//   background-image:
//     linear-gradient(rgba(0,214,143,.025) 1px, transparent 1px),
//     linear-gradient(90deg, rgba(0,214,143,.025) 1px, transparent 1px);
//   background-size: 48px 48px; pointer-events: none; z-index: 0;
// }
// [data-ir-theme="dark"] .ir-shell::after {
//   content: ''; position: fixed; width: 600px; height: 600px; border-radius: 50%;
//   background: radial-gradient(circle, rgba(0,214,143,.05) 0%, transparent 70%);
//   top: -100px; right: -100px; pointer-events: none; z-index: 0;
//   animation: ir-orb 9s ease-in-out infinite alternate;
// }

// /* ── Content ── */
// .ir-content { position: relative; z-index: 1; padding: 2rem 2.4rem; max-width: 1340px; }

// /* ── Page header ── */
// .ir-pg-hdr {
//   display: flex; align-items: flex-start; justify-content: space-between;
//   margin-bottom: 1.6rem; gap: 1rem; flex-wrap: wrap;
//   opacity: 0; transform: translateY(12px); animation: ir-fup .4s ease .04s forwards;
// }
// .ir-pg-title { font-family: var(--serif); font-size: 1.9rem; color: var(--tx); margin-bottom: .28rem; transition: color .35s; }
// .ir-pg-sub   { font-size: .78rem; color: var(--tx3); transition: color .35s; }
// .ir-hdr-right { display: flex; align-items: center; gap: .6rem; flex-wrap: wrap; }
// .ir-updated  { font-size: .7rem; color: var(--tx3); transition: color .35s; }

// .ir-auto-refresh { display: flex; align-items: center; gap: 5px; font-size: .72rem; color: var(--tx3); cursor: pointer; }
// .ir-auto-refresh input[type=checkbox] { accent-color: var(--acc); cursor: pointer; }

// .ir-btn-ghost {
//   background: var(--glass2); color: var(--tx2); font-family: var(--sans);
//   font-size: .75rem; font-weight: 600; padding: .42rem .85rem; border-radius: 8px;
//   border: 1px solid var(--card-bd); cursor: pointer;
//   display: flex; align-items: center; gap: 5px; transition: all .2s;
// }
// .ir-btn-ghost:hover  { border-color: var(--acc); color: var(--acc); }
// .ir-btn-ghost:disabled { opacity: .5; cursor: not-allowed; }

// .ir-btn-schedule {
//   background: var(--blue); color: #fff; font-family: var(--sans);
//   font-size: .75rem; font-weight: 700; padding: .42rem .95rem; border-radius: 8px;
//   border: none; cursor: pointer; display: flex; align-items: center; gap: 6px;
//   transition: all .2s; box-shadow: 0 0 14px rgba(96,165,250,.3);
// }
// [data-ir-theme="light"] .ir-btn-schedule { box-shadow: 0 0 14px rgba(37,99,235,.2); }
// .ir-btn-schedule:hover { transform: translateY(-1px); box-shadow: 0 0 22px rgba(96,165,250,.45); }

// /* ── Filter row ── */
// .ir-filter-row {
//   display: flex; align-items: center; gap: .5rem; margin-bottom: .85rem;
//   flex-wrap: wrap;
//   opacity: 0; transform: translateY(10px); animation: ir-fup .4s ease .22s forwards;
// }
// .ir-pill-tab {
//   font-size: .76rem; font-weight: 600; padding: .38rem .85rem; border-radius: 999px;
//   cursor: pointer; border: 1px solid var(--card-bd);
//   background: var(--tab-pill-off); color: var(--tab-pill-off-col);
//   font-family: var(--sans); transition: all .15s; white-space: nowrap;
// }
// .ir-pill-tab.on { background: var(--tab-pill-bg); color: var(--tab-pill-col); border-color: transparent; }
// [data-ir-theme="light"] .ir-pill-tab.on { box-shadow: 0 2px 8px rgba(5,150,105,.2); }
// .ir-pill-tab:hover:not(.on) { border-color: var(--acc); color: var(--acc); }

// .ir-search-box {
//   display: flex; align-items: center; gap: 7px;
//   background: var(--glass2); border: 1px solid var(--card-bd);
//   border-radius: 9px; padding: .38rem .8rem; margin-left: auto; transition: border-color .2s;
// }
// .ir-search-box:focus-within { border-color: var(--acc); }
// .ir-search-box input {
//   background: none; border: none; outline: none;
//   font-size: .76rem; color: var(--tx); font-family: var(--sans); width: 180px;
// }
// .ir-search-box input::placeholder { color: var(--tx3); }

// .ir-sort-wrap { position: relative; }
// .ir-sort-sel {
//   background: var(--glass2); border: 1px solid var(--card-bd); color: var(--tx2);
//   font-family: var(--sans); font-size: .75rem;
//   padding: .38rem 1.8rem .38rem .75rem; border-radius: 8px;
//   outline: none; cursor: pointer; appearance: none; -webkit-appearance: none; transition: all .2s;
// }
// .ir-sort-sel:focus { border-color: var(--acc); }
// .ir-sort-chev { position: absolute; right: .55rem; top: 50%; transform: translateY(-50%); color: var(--tx3); pointer-events: none; font-size: .65rem; }

// /* ── Main grid ── */
// .ir-main-grid { display: grid; grid-template-columns: 1fr 320px; gap: 1.2rem; align-items: start; }

// /* ── Theme toggle bar (fixed bottom-left) ── */
// .ir-theme-bar {
//   position: fixed; bottom: 1.2rem; left: 1.2rem; z-index: 9990;
//   display: flex; align-items: center; gap: 9px;
//   background: var(--card-bg); border: 1px solid var(--card-bd); border-radius: 12px;
//   padding: .6rem .9rem; cursor: pointer; backdrop-filter: blur(16px);
//   transition: all .2s; box-shadow: 0 4px 16px rgba(0,0,0,.2);
// }
// .ir-theme-bar:hover { border-color: var(--acc); }
// .ir-tog-icon  { font-size: .9rem; flex-shrink: 0; }
// .ir-tog-label { font-size: .73rem; font-weight: 600; color: var(--tx2); transition: color .35s; }
// .ir-tog-track {
//   width: 36px; height: 19px; border-radius: 999px;
//   background: var(--tog-bg); border: 1px solid var(--tog-bd); position: relative; flex-shrink: 0; transition: all .35s;
// }
// .ir-tog-thumb {
//   position: absolute; top: 3px; left: 3px; width: 11px; height: 11px; border-radius: 50%;
//   background: var(--tog-col); transition: transform .28s cubic-bezier(.4,0,.2,1), background .35s;
//   box-shadow: 0 0 6px var(--accg);
// }
// [data-ir-theme="light"] .ir-tog-thumb { transform: translateX(17px); }

// @media(max-width:1100px) { .ir-main-grid { grid-template-columns: 1fr; } }
// @media(max-width:700px)  { .ir-content { padding: 1rem; } .ir-hdr-right { gap: .4rem; } }
// `;

// /* ─────────────────────────────────────────────────────────────────────────────
//    COMPONENT
// ───────────────────────────────────────────────────────────────────────────── */
// const InterviewResultsInterface: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const router   = useRouter();
//   const { results: rawResults, loading, exporting, lastCsv, error } =
//     useAppSelector((s: any) => s.interview ?? {});

//   /* ── UI state ── */
//   const [rows,        setRows]        = useState<InterviewRow[]>([]);
//   const [search,      setSearch]      = useState("");
//   const [sortBy,      setSortBy]      = useState("newest");
//   const [verdict,     setVerdict]     = useState("all");
//   const [autoRefresh, setAutoRefresh] = useState(true);
//   const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
//   const [mounted,     setMounted]     = useState(false);
//   const [selectedId,  setSelectedId]  = useState<string | null>(null);
//   const [theme,       setTheme]       = useState<"dark" | "light">("dark");

//   useEffect(() => {
//     setMounted(true);
//     const saved = localStorage.getItem("tf-theme");
//     if (saved === "light") setTheme("light");
//   }, []);

//   const toggleTheme = () => setTheme(t => {
//     const next = t === "dark" ? "light" : "dark";
//     localStorage.setItem("tf-theme", next);
//     return next;
//   });

//   /* ── Data ── */
//   const refreshAll = useCallback(async () => {
//     try {
//       await Promise.all([
//         dispatch(fetchInterviewStats({})).unwrap().catch(() => {}),
//         dispatch(fetchInterviewResults({ page: 1, page_size: 200 })).unwrap().catch(() => {}),
//       ]);
//       setLastRefresh(new Date());
//     } catch {}
//   }, [dispatch]);

//   useEffect(() => { refreshAll(); }, [refreshAll]);

//   useEffect(() => {
//     if (!autoRefresh) return;
//     const id = setInterval(() => refreshAll(), AUTO_REFRESH_MS);
//     return () => clearInterval(id);
//   }, [autoRefresh, refreshAll]);

//   useEffect(() => {
//     if (Array.isArray(rawResults) && rawResults.length > 0) {
//       setRows(rawResults.map(mapResult));
//     } else if (!loading) {
//       setRows(makeDemoData());
//     }
//   }, [rawResults, loading]);

//   useEffect(() => {
//     if (!lastCsv) return;
//     const url = URL.createObjectURL(lastCsv);
//     const a = document.createElement("a");
//     a.href = url; a.download = "interview_results.csv"; a.click();
//     URL.revokeObjectURL(url);
//   }, [lastCsv]);

//   /* ── Live clock ── */
//   const [clock, setClock] = useState("");
//   useEffect(() => {
//     const tick = () => {
//       const n = new Date();
//       setClock(`${String(n.getHours()).padStart(2,"0")}:${String(n.getMinutes()).padStart(2,"0")}:${String(n.getSeconds()).padStart(2,"0")}`);
//     };
//     tick();
//     const id = setInterval(() => { if (autoRefresh) tick(); }, 1000);
//     return () => clearInterval(id);
//   }, [autoRefresh]);

//   /* ── Filtered rows ── */
//   const filtered = useMemo(() => {
//     const q = search.toLowerCase();
//     let list = rows.filter(r =>
//       verdict === "all" || r.verdict === verdict ||
//       (verdict === "offered"  && r.verdict === "offer_extended") ||
//       (verdict === "next"     && r.verdict === "next_round") ||
//       (verdict === "hold"     && r.verdict === "on_hold") ||
//       (verdict === "rejected" && r.verdict === "rejected") ||
//       (verdict === "pending"  && r.verdict === "pending")
//     );
//     if (q) list = list.filter(r =>
//       r.name.toLowerCase().includes(q) ||
//       r.role.toLowerCase().includes(q) ||
//       r.interviewer.toLowerCase().includes(q)
//     );
//     list = [...list].sort((a, b) => {
//       if (sortBy === "score") return (b.score ?? -1) - (a.score ?? -1);
//       return 0;
//     });
//     return list;
//   }, [rows, search, verdict, sortBy]);

//   /* ── Stats ── */
//   const stats = useMemo(() => {
//     const offers    = rows.filter(r => r.verdict === "offer_extended").length;
//     const pending   = rows.filter(r => r.verdict === "pending").length;
//     const scores    = rows.filter(r => r.score != null).map(r => r.score as number);
//     const avg       = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
//     const offerRate = rows.length > 0 ? Math.round((offers / rows.length) * 100) : 0;
//     return { total: rows.length, offerExtended: offers, avgScore: avg,
//              pendingDecision: pending, upcomingToday: 4, offerRate };
//   }, [rows]);

//   const selectedCandidate = useMemo(() => rows.find(r => r.id === selectedId) ?? null, [rows, selectedId]);

//   const updateVerdict = (id: string, v: Verdict) =>
//     setRows(prev => prev.map(r => r.id === id ? { ...r, verdict: v } : r));

//   const VERDICT_TABS = [
//     { key: "all",      label: "All" },
//     { key: "offered",  label: "Offer Extended" },
//     { key: "next",     label: "Next Round" },
//     { key: "hold",     label: "On Hold" },
//     { key: "rejected", label: "Rejected" },
//     { key: "pending",  label: "Pending" },
//   ];

//   return (
//     <div className="ir-shell" data-ir-theme={theme}>
//       <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

//       <div className="ir-content">

//         {/* ── Page header ── */}
//         <div className="ir-pg-hdr">
//           <div>
//             <h1 className="ir-pg-title">Interview Results</h1>
//             <p className="ir-pg-sub">
//               Track all interview outcomes, scores, and hiring decisions across every job position
//             </p>
//           </div>
//           <div className="ir-hdr-right">
//             {mounted && (
//               <span className="ir-updated" suppressHydrationWarning>
//                 Updated: {clock}
//               </span>
//             )}
//             <label className="ir-auto-refresh">
//               <input type="checkbox" checked={autoRefresh}
//                 onChange={e => setAutoRefresh(e.target.checked)} />
//               Auto-refresh
//             </label>
//             <button className="ir-btn-ghost" onClick={() => refreshAll()} disabled={loading}>
//               <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
//               Refresh
//             </button>
//             <button className="ir-btn-ghost" onClick={() => dispatch(exportInterviewCsv({}))} disabled={exporting}>
//               {exporting ? "Exporting…" : "📤 Export Results"}
//             </button>
//             <button className="ir-btn-schedule" onClick={() => router.push("/scheduler")}>
//               + Schedule Interview
//             </button>
//           </div>
//         </div>

//         {/* ── KPI strip ── */}
//         <StatsStrip {...stats} theme={theme} />

//         {/* ── Filter row ── */}
//         <div className="ir-filter-row">
//           {VERDICT_TABS.map(t => (
//             <button key={t.key} className={`ir-pill-tab${verdict === t.key ? " on" : ""}`}
//               onClick={() => setVerdict(t.key)}>
//               {t.label}
//             </button>
//           ))}
//           <div className="ir-search-box">
//             <span style={{ color: "var(--tx3)", fontSize: ".8rem" }}>🔍</span>
//             <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search candidates…" />
//           </div>
//           <div className="ir-sort-wrap">
//             <select className="ir-sort-sel" value={sortBy} onChange={e => setSortBy(e.target.value)}>
//               <option value="newest">Newest First</option>
//               <option value="oldest">Oldest First</option>
//               <option value="score">Highest Score</option>
//             </select>
//             <span className="ir-sort-chev">▾</span>
//           </div>
//         </div>

//         {/* ── Main grid ── */}
//         <div className="ir-main-grid">
//           <CandidatesTable
//             candidates={filtered}
//             loading={loading && rows.length === 0}
//             search={search}
//             setSearch={setSearch}
//             onOpen={id => setSelectedId(id)}
//             onExtendOffer={id => updateVerdict(id, "offer_extended")}
//             onScheduleNext={() => router.push("/scheduler")}
//             onAddVerdict={id => {
//               const v = prompt("Enter verdict:\n(offer_extended / next_round / on_hold / rejected)");
//               if (v && ["offer_extended","next_round","on_hold","rejected"].includes(v.trim()))
//                 updateVerdict(id, v.trim() as Verdict);
//             }}
//             exporting={exporting}
//             onExport={() => dispatch(exportInterviewCsv({}))}
//             theme={theme}
//           />
//           <LiveSessions results={rows} theme={theme} />
//         </div>
//       </div>

//       {/* ── Theme toggle bar ── */}
//       <div className="ir-theme-bar" onClick={toggleTheme}>
//         <span className="ir-tog-icon">{theme === "dark" ? "🌙" : "☀️"}</span>
//         <span className="ir-tog-label">{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
//         <div className="ir-tog-track"><div className="ir-tog-thumb" /></div>
//       </div>

//       {/* ── Detail modal ── */}
//       <CandidateDetailsModal
//         candidate={selectedCandidate}
//         onClose={() => setSelectedId(null)}
//         onExtendOffer={id => { updateVerdict(id, "offer_extended"); setSelectedId(null); }}
//         onReject={id      => { updateVerdict(id, "rejected");       setSelectedId(null); }}
//         onScheduleNext={id => { setSelectedId(null); router.push("/scheduler"); }}
//         theme={theme}
//       />
//     </div>
//   );
// };

// export default InterviewResultsInterface;
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

import StatsStrip            from "./subComponents/StatsStrip";
import CandidatesTable       from "./subComponents/CandidatesTable";
import LiveSessions          from "./subComponents/LiveSessions";
import CandidateDetailsModal from "./subComponents/CandidateDetailsModal";

import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import {
  fetchInterviewResults,
  fetchInterviewStats,
  exportInterviewCsv,
} from "@/services/redux/thunk/interviewThunk";

import type { InterviewRow, Verdict } from "./subComponents/CandidatesTable";

const AUTO_REFRESH_MS = 30_000;

/* ── mapResult ── */
function mapResult(r: any, i: number): InterviewRow {
  return {
    id:          String(r.id ?? i),
    name:        r.candidate_name ?? r.name ?? "Unknown",
    email:       r.email ?? "",
    role:        r.job_title ?? r.role ?? "",
    dept:        r.department ?? r.dept ?? "",
    interviewer: r.interviewer ?? r.interviewer_name ?? "—",
    round:       r.round ?? r.interview_round ?? "R1",
    date:        r.date ?? r.interview_date ?? r.created_at ?? "",
    verdict:     (r.verdict ?? r.status ?? "pending") as Verdict,
    score:       r.score != null ? Number(r.score) : null,
    duration:    r.duration ?? null,
    criteria:    r.criteria ?? {},
    feedback:    r.feedback ?? r.comments ?? "No feedback recorded.",
  };
}

/* ── Demo data ── */
function makeDemoData(): InterviewRow[] {
  const names = [
    ["Ankani Sairam","Product Manager"],["Sai Nithish Dasari","Data Science"],
    ["Ankani Sairam","Web Developer"],["Sai Nithish Dasari","Product Manager"],
    ["Ankani Sairam","AI/ML"],["Sai Nithish Dasari","Python Developer"],
    ["Ankani Sairam","Data Science"],["Ankani Sairam","Junior Data Science"],
    ["Ankani Sairam","Python Developer"],["Sai Nithish Dasari","Web Developer"],
    ["Sai Nithish Dasari","AI/ML"],["Ankani Sairam","UX Designer"],
    ["Sai Nithish Dasari","Web Developer"],["Sai Nithish Dasari","UX Designer"],
    ["Ankani Sairam","Junior Python Developer"],["Sai Nithish Dasari","Python Developer"],
    ["Sai Nithish Dasari","Junior Data Science"],["Sai Nithish Dasari","Junior Python Developer"],
    ["Ankani Sairam","Senior Engineer"],["Sai Nithish Dasari","Data Science"],
  ];
  const dates = ["—","3d ago","2w ago","2d ago","4d ago","Yesterday","—","—","—","—",
                 "3d ago","—","2w ago","—","—","—","—","—","—","—"];
  return names.map(([name,role],i) => ({
    id: String(i+1), name, email: name.toLowerCase().replace(" ",".")+"@gmail.com",
    role, dept: "", interviewer: "—", round: "R1", date: dates[i]??"—",
    verdict: "pending" as Verdict, score: null, duration: null, criteria: {}, feedback: "No feedback recorded.",
  }));
}

/* ─────────────────────────────────────────────────────────────────────────────
   NAV ITEMS — same as AssessmentInterface
───────────────────────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  {
    section: "RECRUITMENT",
    items: [
      { icon: "📊", label: "Dashboard",        sub: "Recruitment overview",  path: "/dashboard"         },
      { icon: "👥", label: "Candidates",        sub: "Manage applicants",     path: "/candidates"        },
      { icon: "📅", label: "Scheduling",        sub: "Interview calendar",    path: "/scheduler"         },
    ],
  },
  {
    section: "SCREENING",
    items: [
      { icon: "📋", label: "Assessments",       sub: "Tests & evaluations",   path: "/assessments",      badge: null },
      { icon: "🎯", label: "Interview Results", sub: "Review outcomes",       path: "/interview-results", badge: "5", badgeType: "green" },
    ],
  },
  {
    section: "TOOLS",
    items: [
      { icon: "🤖", label: "ATS Checking",      sub: "AI-powered screening",  path: "/ats",               badge: "AI", badgeType: "ai" },
      { icon: "📈", label: "Reports",           sub: "Analytics & insights",  path: "/reports"            },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   GLOBAL CSS
───────────────────────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap');
:root { --serif:'DM Serif Display',Georgia,serif; --sans:'Inter',system-ui,sans-serif; }

[data-ir-theme="dark"] {
  --bg:#040d0a; --glass:rgba(255,255,255,0.04); --glass2:rgba(255,255,255,0.07);
  --bd:rgba(0,214,143,0.12); --bd2:rgba(0,214,143,0.22);
  --acc:#00d68f; --acc2:#059669; --acc3:#34d399;
  --accs:rgba(0,214,143,0.10); --accg:rgba(0,214,143,0.25);
  --tx:#e2faf1; --tx2:#a7c4b8; --tx3:#5a8a75;
  --red:#f87171; --amber:#fbbf24; --blue:#60a5fa; --purple:#a78bfa; --orange:#fb923c;
  --card-bg:rgba(255,255,255,0.04); --card-bd:rgba(0,214,143,0.12);
  --btn-text:#040d0a;
  --tog-bg:rgba(0,214,143,0.12); --tog-bd:rgba(0,214,143,0.25); --tog-col:#00d68f;
  --tab-pill-bg:rgba(0,214,143,0.12); --tab-pill-col:var(--acc);
  --tab-pill-off:rgba(255,255,255,0.05); --tab-pill-off-col:var(--tx3);
  --tbl-hdr:rgba(0,214,143,0.03); --tbl-bd:rgba(0,214,143,0.05);
  --ring-stroke:#00d68f; --ring-bg:rgba(0,214,143,0.08);
  --bar-bg:rgba(0,214,143,0.08);
  --verdict-pending-bg:rgba(96,165,250,.1);  --verdict-pending-col:#60a5fa;
  --verdict-offered-bg:rgba(0,214,143,.1);   --verdict-offered-col:#00d68f;
  --verdict-rejected-bg:rgba(248,113,113,.1);--verdict-rejected-col:#f87171;
  --verdict-hold-bg:rgba(251,191,36,.1);     --verdict-hold-col:#fbbf24;
  --verdict-next-bg:rgba(167,139,250,.1);    --verdict-next-col:#a78bfa;
  --np-bg:rgba(4,13,10,0.97);
}
[data-ir-theme="light"] {
  --bg:#f0faf6; --glass:#ffffff; --glass2:#f4faf7;
  --bd:#c5e8d8; --bd2:#9dd4bb;
  --acc:#059669; --acc2:#047857; --acc3:#34d399;
  --accs:rgba(5,150,105,0.08); --accg:rgba(5,150,105,0.2);
  --tx:#0d2b1e; --tx2:#2d5a42; --tx3:#6b9e85;
  --red:#dc2626; --amber:#d97706; --blue:#2563eb; --purple:#7c3aed; --orange:#ea580c;
  --card-bg:#ffffff; --card-bd:#c5e8d8;
  --btn-text:#ffffff;
  --tog-bg:rgba(5,150,105,0.1); --tog-bd:rgba(5,150,105,0.25); --tog-col:#059669;
  --tab-pill-bg:#059669; --tab-pill-col:#ffffff;
  --tab-pill-off:#ffffff; --tab-pill-off-col:#6b9e85;
  --tbl-hdr:#f8fafb; --tbl-bd:#e8f5ef;
  --ring-stroke:#059669; --ring-bg:rgba(5,150,105,0.08);
  --bar-bg:rgba(5,150,105,0.08);
  --verdict-pending-bg:rgba(37,99,235,.08);  --verdict-pending-col:#2563eb;
  --verdict-offered-bg:rgba(5,150,105,.08);  --verdict-offered-col:#059669;
  --verdict-rejected-bg:rgba(220,38,38,.08); --verdict-rejected-col:#dc2626;
  --verdict-hold-bg:rgba(217,119,6,.08);     --verdict-hold-col:#d97706;
  --verdict-next-bg:rgba(124,58,237,.08);    --verdict-next-col:#7c3aed;
  --np-bg:#ffffff;
}

@keyframes ir-fup  { to { opacity:1; transform:translateY(0); } }
@keyframes ir-orb  { from{transform:scale(.9);opacity:.6} to{transform:scale(1.1);opacity:1} }
@keyframes spin    { to { transform: rotate(360deg); } }
@keyframes ir-npii { from{opacity:0;transform:translateX(-8px);} to{opacity:1;transform:none;} }

/* ── Shell ── */
.ir-shell {
  min-height: 100vh; width: 100%;
  background: var(--bg); color: var(--tx);
  font-family: var(--sans); position: relative;
  transition: background .35s, color .35s; overflow-x: hidden;
}
[data-ir-theme="dark"] .ir-shell::before {
  content:''; position:fixed; inset:0;
  background-image:
    linear-gradient(rgba(0,214,143,.025) 1px,transparent 1px),
    linear-gradient(90deg,rgba(0,214,143,.025) 1px,transparent 1px);
  background-size:48px 48px; pointer-events:none; z-index:0;
}
[data-ir-theme="dark"] .ir-shell::after {
  content:''; position:fixed; width:600px; height:600px; border-radius:50%;
  background:radial-gradient(circle,rgba(0,214,143,.05) 0%,transparent 70%);
  top:-100px; right:-100px; pointer-events:none; z-index:0;
  animation:ir-orb 9s ease-in-out infinite alternate;
}

/* ── Content — FULL WIDTH ── */
.ir-content {
  position:relative; z-index:1;
  width:100%;
  padding: 2rem 2.4rem;
  box-sizing: border-box;
}

/* ── Page header ── */
.ir-pg-hdr {
  display:flex; align-items:flex-start; justify-content:space-between;
  margin-bottom:1.6rem; gap:1rem; flex-wrap:wrap;
  opacity:0; transform:translateY(12px); animation:ir-fup .4s ease .04s forwards;
}
.ir-pg-title { font-family:var(--serif); font-size:1.9rem; color:var(--tx); margin-bottom:.28rem; transition:color .35s; }
.ir-pg-sub   { font-size:.78rem; color:var(--tx3); transition:color .35s; }
.ir-hdr-right { display:flex; align-items:center; gap:.6rem; flex-wrap:wrap; }
.ir-updated  { font-size:.7rem; color:var(--tx3); transition:color .35s; }

.ir-auto-refresh { display:flex; align-items:center; gap:5px; font-size:.72rem; color:var(--tx3); cursor:pointer; }
.ir-auto-refresh input[type=checkbox] { accent-color:var(--acc); cursor:pointer; }

.ir-btn-ghost {
  background:var(--glass2); color:var(--tx2); font-family:var(--sans);
  font-size:.75rem; font-weight:600; padding:.42rem .85rem; border-radius:8px;
  border:1px solid var(--card-bd); cursor:pointer;
  display:flex; align-items:center; gap:5px; transition:all .2s;
}
.ir-btn-ghost:hover  { border-color:var(--acc); color:var(--acc); }
.ir-btn-ghost:disabled { opacity:.5; cursor:not-allowed; }

.ir-btn-schedule {
  background:var(--blue); color:#fff; font-family:var(--sans);
  font-size:.75rem; font-weight:700; padding:.42rem .95rem; border-radius:8px;
  border:none; cursor:pointer; display:flex; align-items:center; gap:6px;
  transition:all .2s; box-shadow:0 0 14px rgba(96,165,250,.3);
}
[data-ir-theme="light"] .ir-btn-schedule { box-shadow:0 0 14px rgba(37,99,235,.2); }
.ir-btn-schedule:hover { transform:translateY(-1px); box-shadow:0 0 22px rgba(96,165,250,.45); }

/* ── Filter row ── */
.ir-filter-row {
  display:flex; align-items:center; gap:.5rem; margin-bottom:.85rem;
  flex-wrap:wrap;
  opacity:0; transform:translateY(10px); animation:ir-fup .4s ease .22s forwards;
}
.ir-pill-tab {
  font-size:.76rem; font-weight:600; padding:.38rem .85rem; border-radius:999px;
  cursor:pointer; border:1px solid var(--card-bd);
  background:var(--tab-pill-off); color:var(--tab-pill-off-col);
  font-family:var(--sans); transition:all .15s; white-space:nowrap;
}
.ir-pill-tab.on { background:var(--tab-pill-bg); color:var(--tab-pill-col); border-color:transparent; }
[data-ir-theme="light"] .ir-pill-tab.on { box-shadow:0 2px 8px rgba(5,150,105,.2); }
.ir-pill-tab:hover:not(.on) { border-color:var(--acc); color:var(--acc); }

.ir-search-box {
  display:flex; align-items:center; gap:7px;
  background:var(--glass2); border:1px solid var(--card-bd);
  border-radius:9px; padding:.38rem .8rem; margin-left:auto; transition:border-color .2s;
}
.ir-search-box:focus-within { border-color:var(--acc); }
.ir-search-box input {
  background:none; border:none; outline:none;
  font-size:.76rem; color:var(--tx); font-family:var(--sans); width:180px;
}
.ir-search-box input::placeholder { color:var(--tx3); }

.ir-sort-wrap { position:relative; }
.ir-sort-sel {
  background:var(--glass2); border:1px solid var(--card-bd); color:var(--tx2);
  font-family:var(--sans); font-size:.75rem;
  padding:.38rem 1.8rem .38rem .75rem; border-radius:8px;
  outline:none; cursor:pointer; appearance:none; -webkit-appearance:none; transition:all .2s;
}
.ir-sort-sel:focus { border-color:var(--acc); }
.ir-sort-chev { position:absolute; right:.55rem; top:50%; transform:translateY(-50%); color:var(--tx3); pointer-events:none; font-size:.65rem; }

/* ── Main grid — full width, sidebar fixed width ── */
.ir-main-grid {
  display:grid;
  grid-template-columns: 1fr 320px;
  gap:1.2rem;
  align-items:start;
  width:100%;
}

/* ════════════════════════════════════════════════
   FAB — bottom-left draggable navigation button
════════════════════════════════════════════════ */
.ir-fab {
  position:fixed; z-index:9995;
  width:46px; height:46px; border-radius:14px;
  background:var(--glass2); border:1px solid var(--card-bd);
  display:flex; align-items:center; justify-content:center;
  cursor:pointer; backdrop-filter:blur(16px);
  box-shadow:0 4px 20px rgba(0,0,0,.3);
  transition:border-color .2s, box-shadow .2s, background .35s;
  user-select:none;
}
.ir-fab:hover, .ir-fab.open {
  border-color:var(--acc);
  background:var(--acc);
  box-shadow:0 4px 24px var(--accg);
}
[data-ir-theme="light"] .ir-fab { box-shadow:0 4px 16px rgba(0,0,0,.12); }

/* ════════════════════════════════════════════════
   NAV PANEL
════════════════════════════════════════════════ */
@keyframes ir-np-in { from{opacity:0;transform:translateY(8px) scale(.97);} to{opacity:1;transform:none;} }

.ir-nav-panel {
  position:fixed; z-index:9994;
  width:260px;
  background:var(--np-bg);
  border:1px solid var(--card-bd);
  border-radius:16px;
  box-shadow:0 16px 48px rgba(0,0,0,.35);
  backdrop-filter:blur(20px);
  overflow:hidden;
  pointer-events:none; opacity:0;
  transition:opacity .18s, transform .18s;
  transform:translateY(8px) scale(.97);
}
.ir-nav-panel.show {
  pointer-events:all; opacity:1;
  transform:none;
  animation:ir-np-in .2s cubic-bezier(.34,1.3,.64,1) forwards;
}

/* Panel header */
.ir-np-hdr {
  display:flex; align-items:center; justify-content:space-between;
  padding:.85rem 1rem .65rem;
  border-bottom:1px solid var(--card-bd);
}
.ir-np-title {
  font-size:.6rem; font-weight:700; letter-spacing:.12em;
  text-transform:uppercase; color:var(--tx3);
}
.ir-np-x {
  width:22px; height:22px; border-radius:6px;
  background:var(--glass2); border:1px solid var(--card-bd);
  cursor:pointer; display:flex; align-items:center; justify-content:center;
  color:var(--tx3); font-size:.6rem; transition:all .15s;
}
.ir-np-x:hover { border-color:var(--acc); color:var(--acc); }

/* Current page chip */
.ir-np-curr {
  margin:.65rem .8rem;
  background:var(--accs); border:1px solid var(--bd);
  border-radius:10px; padding:.6rem .75rem;
  display:flex; align-items:center; justify-content:space-between;
}
.ir-np-clbl { font-size:.58rem; color:var(--tx3); margin-bottom:.15rem; }
.ir-np-cnm  { font-size:.82rem; font-weight:700; color:var(--acc); }
.ir-np-cdot {
  width:8px; height:8px; border-radius:50%;
  background:var(--acc); box-shadow:0 0 8px var(--acc); flex-shrink:0;
}

/* Section label */
.ir-np-sec {
  font-size:.58rem; font-weight:700; letter-spacing:.1em;
  text-transform:uppercase; color:var(--tx3);
  padding:.55rem 1rem .2rem;
}

/* Nav item */
.ir-np-item {
  display:flex; align-items:center; gap:10px;
  padding:.55rem .85rem; margin:0 .45rem;
  border-radius:10px; cursor:pointer;
  transition:background .14s;
  animation:ir-npii .22s ease forwards;
}
.ir-np-item:hover    { background:var(--glass2); }
.ir-np-item.nact     { background:var(--accs); border:1px solid var(--bd); }
.ir-np-ic {
  width:30px; height:30px; border-radius:8px;
  background:var(--glass2); border:1px solid var(--card-bd);
  display:flex; align-items:center; justify-content:center;
  font-size:.82rem; flex-shrink:0;
}
.ir-np-item.nact .ir-np-ic { background:var(--accs); border-color:var(--bd); }
.ir-np-nm  { font-size:.78rem; font-weight:600; color:var(--tx); }
.ir-np-sub { font-size:.62rem; color:var(--tx3); margin-top:.06rem; }
.ir-np-bdg {
  font-size:.58rem; font-weight:700; padding:.1rem .38rem;
  border-radius:999px; background:var(--accs); color:var(--acc);
  border:1px solid var(--bd); margin-left:auto; flex-shrink:0;
}
.ir-np-ai {
  font-size:.58rem; font-weight:700; padding:.1rem .38rem;
  border-radius:999px; background:rgba(167,139,250,.15); color:var(--purple);
  border:1px solid rgba(167,139,250,.25); margin-left:auto; flex-shrink:0;
}

/* Divider */
.ir-np-div { height:1px; background:var(--card-bd); margin:.45rem .8rem; }

/* Theme toggle row inside panel */
.ir-np-tog-row {
  display:flex; align-items:center; justify-content:space-between;
  padding:.7rem 1rem .9rem;
  cursor:pointer;
}
.ir-np-tog-lbl { font-size:.76rem; font-weight:600; color:var(--tx2); }
.ir-np-tog-switch { display:flex; align-items:center; gap:6px; }
.ir-np-inner-lbl  { font-size:.65rem; color:var(--tx3); }
.ir-np-trk {
  width:32px; height:17px; border-radius:999px;
  background:var(--tog-bg); border:1px solid var(--tog-bd);
  position:relative; flex-shrink:0; transition:all .35s;
}
.ir-np-thumb {
  position:absolute; top:3px; left:3px;
  width:9px; height:9px; border-radius:50%;
  background:var(--tog-col);
  transition:transform .28s cubic-bezier(.4,0,.2,1);
  box-shadow:0 0 5px var(--accg);
}
[data-ir-theme="light"] .ir-np-thumb { transform:translateX(15px); }

/* Backdrop */
.ir-nav-bd {
  position:fixed; inset:0; z-index:9993;
  pointer-events:none; background:transparent;
}
.ir-nav-bd.show { pointer-events:all; }

@media(max-width:1100px) { .ir-main-grid { grid-template-columns:1fr; } }
@media(max-width:700px)  { .ir-content { padding:1rem; } .ir-hdr-right { gap:.4rem; } }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────────────── */
const InterviewResultsInterface: React.FC = () => {
  const dispatch = useAppDispatch();
  const router   = useRouter();
  const { results: rawResults, loading, exporting, lastCsv } =
    useAppSelector((s: any) => s.interview ?? {});

  /* ── UI state ── */
  const [rows,        setRows]        = useState<InterviewRow[]>([]);
  const [search,      setSearch]      = useState("");
  const [sortBy,      setSortBy]      = useState("newest");
  const [verdict,     setVerdict]     = useState("all");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [mounted,     setMounted]     = useState(false);
  const [selectedId,  setSelectedId]  = useState<string | null>(null);
  const [theme,       setTheme]       = useState<"dark" | "light">("dark");

  /* ── FAB nav state ── */
  const [navOpen,  setNavOpen]  = useState(false);
  const [fabPos,   setFabPos]   = useState({ left: 20, bottom: 20 });
  const fabRef                  = useRef<HTMLDivElement>(null);
  const panelRef                = useRef<HTMLDivElement>(null);
  const dragStart               = useRef({ x: 0, y: 0, left: 20, bottom: 20 });
  const dragging                = useRef(false);

  /* ── Mount / theme ── */
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("tf-theme");
    if (saved === "light") setTheme("light");
  }, []);

  const toggleTheme = () => setTheme(t => {
    const next = t === "dark" ? "light" : "dark";
    localStorage.setItem("tf-theme", next);
    return next;
  });

  /* ── FAB drag ── */
  const onFabMouseDown = (e: React.MouseEvent) => {
    dragging.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY, left: fabPos.left, bottom: fabPos.bottom };
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

  /* Position panel above/beside FAB, staying on screen */
  const getPanelStyle = (): React.CSSProperties => {
    const panelW = 268, panelH = 500;
    let left   = fabPos.left + 54;
    let bottom = fabPos.bottom;
    if (left + panelW > window.innerWidth  - 8) left   = fabPos.left - panelW - 8;
    if (bottom + panelH > window.innerHeight - 8) bottom = window.innerHeight - panelH - 8;
    return { left, bottom: Math.max(8, bottom) };
  };

  /* ── Data fetching ── */
  const refreshAll = useCallback(async () => {
    try {
      await Promise.all([
        dispatch(fetchInterviewStats({})).unwrap().catch(() => {}),
        dispatch(fetchInterviewResults({ page: 1, page_size: 200 })).unwrap().catch(() => {}),
      ]);
    } catch {}
  }, [dispatch]);

  useEffect(() => { refreshAll(); }, [refreshAll]);
  useEffect(() => {
    if (!autoRefresh) return;
    const id = setInterval(() => refreshAll(), AUTO_REFRESH_MS);
    return () => clearInterval(id);
  }, [autoRefresh, refreshAll]);

  /* ── Map raw results ── */
  useEffect(() => {
    if (Array.isArray(rawResults) && rawResults.length > 0) {
      setRows(rawResults.map(mapResult));
    } else if (!loading) {
      setRows(makeDemoData());
    }
  }, [rawResults, loading]);

  /* ── CSV download ── */
  useEffect(() => {
    if (!lastCsv) return;
    const url = URL.createObjectURL(lastCsv);
    const a = document.createElement("a");
    a.href = url; a.download = "interview_results.csv"; a.click();
    URL.revokeObjectURL(url);
  }, [lastCsv]);

  /* ── Live clock ── */
  const [clock, setClock] = useState("");
  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setClock(`${String(n.getHours()).padStart(2,"0")}:${String(n.getMinutes()).padStart(2,"0")}:${String(n.getSeconds()).padStart(2,"0")}`);
    };
    tick();
    const id = setInterval(() => { if (autoRefresh) tick(); }, 1000);
    return () => clearInterval(id);
  }, [autoRefresh]);

  /* ── Filtered rows ── */
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    let list = rows.filter(r =>
      verdict === "all" || r.verdict === verdict ||
      (verdict === "offered"  && r.verdict === "offer_extended") ||
      (verdict === "next"     && r.verdict === "next_round")     ||
      (verdict === "hold"     && r.verdict === "on_hold")        ||
      (verdict === "rejected" && r.verdict === "rejected")       ||
      (verdict === "pending"  && r.verdict === "pending")
    );
    if (q) list = list.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.role.toLowerCase().includes(q) ||
      r.interviewer.toLowerCase().includes(q)
    );
    if (sortBy === "score") list = [...list].sort((a,b) => (b.score ?? -1) - (a.score ?? -1));
    return list;
  }, [rows, search, verdict, sortBy]);

  /* ── Stats ── */
  const stats = useMemo(() => {
    const offers    = rows.filter(r => r.verdict === "offer_extended").length;
    const pending   = rows.filter(r => r.verdict === "pending").length;
    const scores    = rows.filter(r => r.score != null).map(r => r.score as number);
    const avg       = scores.length ? Math.round(scores.reduce((a,b) => a+b, 0) / scores.length) : 0;
    const offerRate = rows.length > 0 ? Math.round((offers / rows.length) * 100) : 0;
    return { total: rows.length, offerExtended: offers, avgScore: avg,
             pendingDecision: pending, upcomingToday: 4, offerRate };
  }, [rows]);

  const selectedCandidate = useMemo(
    () => rows.find(r => r.id === selectedId) ?? null,
    [rows, selectedId]
  );

  const updateVerdict = (id: string, v: Verdict) =>
    setRows(prev => prev.map(r => r.id === id ? { ...r, verdict: v } : r));

  const VERDICT_TABS = [
    { key: "all",      label: "All"            },
    { key: "offered",  label: "Offer Extended" },
    { key: "next",     label: "Next Round"     },
    { key: "hold",     label: "On Hold"        },
    { key: "rejected", label: "Rejected"       },
    { key: "pending",  label: "Pending"        },
  ];

  const currentPath = "/interview-results";

  return (
    <div className="ir-shell" data-ir-theme={theme}>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      {/* ── Full-width content ── */}
      <div className="ir-content">

        {/* Page header */}
        <div className="ir-pg-hdr">
          <div>
            <h1 className="ir-pg-title">Interview Results</h1>
            <p className="ir-pg-sub">
              Track all interview outcomes, scores, and hiring decisions across every job position
            </p>
          </div>
          <div className="ir-hdr-right">
            {mounted && (
              <span className="ir-updated" suppressHydrationWarning>
                Updated: {clock}
              </span>
            )}
            <label className="ir-auto-refresh">
              <input type="checkbox" checked={autoRefresh}
                onChange={e => setAutoRefresh(e.target.checked)} />
              Auto-refresh
            </label>
            <button className="ir-btn-ghost" onClick={() => refreshAll()} disabled={loading}>
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
            <button className="ir-btn-ghost"
              onClick={() => dispatch(exportInterviewCsv({}))} disabled={exporting}>
              {exporting ? "Exporting…" : "📤 Export Results"}
            </button>
            <button className="ir-btn-schedule" onClick={() => router.push("/scheduler")}>
              + Schedule Interview
            </button>
          </div>
        </div>

        {/* KPI strip */}
        <StatsStrip {...stats} theme={theme} />

        {/* Filter row */}
        <div className="ir-filter-row">
          {VERDICT_TABS.map(t => (
            <button key={t.key}
              className={`ir-pill-tab${verdict === t.key ? " on" : ""}`}
              onClick={() => setVerdict(t.key)}>
              {t.label}
            </button>
          ))}
          <div className="ir-search-box">
            <span style={{ color: "var(--tx3)", fontSize: ".8rem" }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search candidates…" />
          </div>
          <div className="ir-sort-wrap">
            <select className="ir-sort-sel" value={sortBy}
              onChange={e => setSortBy(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="score">Highest Score</option>
            </select>
            <span className="ir-sort-chev">▾</span>
          </div>
        </div>

        {/* Main grid — full width */}
        <div className="ir-main-grid">
          <CandidatesTable
            candidates={filtered}
            loading={loading && rows.length === 0}
            search={search}
            setSearch={setSearch}
            onOpen={id => setSelectedId(id)}
            onExtendOffer={id => updateVerdict(id, "offer_extended")}
            onScheduleNext={() => router.push("/scheduler")}
            onAddVerdict={id => {
              const v = prompt("Enter verdict:\n(offer_extended / next_round / on_hold / rejected)");
              if (v && ["offer_extended","next_round","on_hold","rejected"].includes(v.trim()))
                updateVerdict(id, v.trim() as Verdict);
            }}
            exporting={exporting}
            onExport={() => dispatch(exportInterviewCsv({}))}
            theme={theme}
          />
          <LiveSessions results={rows} theme={theme} />
        </div>
      </div>

      {/* ════ FAB — bottom-left, draggable ════ */}
      <div
        ref={fabRef}
        className={`ir-fab${navOpen ? " open" : ""}`}
        style={{ bottom: fabPos.bottom, left: fabPos.left }}
        onMouseDown={onFabMouseDown}
        title="Navigation"
      >
        {/* Hamburger / layers icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke={navOpen ? "#040d0a" : "currentColor"} strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
          style={{
            pointerEvents: "none",
            color: navOpen ? "#040d0a" : "var(--tx2)",
            transition: "transform .3s ease",
            transform: navOpen ? "rotate(180deg)" : "none",
          }}
        >
          <polygon points="12 2 2 7 12 12 22 7 12 2"/>
          <polyline points="2 17 12 22 22 17"/>
          <polyline points="2 12 12 17 22 12"/>
        </svg>
      </div>

      {/* ════ NAV PANEL ════ */}
      <div
        ref={panelRef}
        className={`ir-nav-panel${navOpen ? " show" : ""}`}
        style={navOpen ? getPanelStyle() : { left: -9999, bottom: -9999 }}
      >
        {/* Header */}
        <div className="ir-np-hdr">
          <span className="ir-np-title">Navigation</span>
          <button className="ir-np-x" onClick={() => setNavOpen(false)}>✕</button>
        </div>

        {/* Current page indicator */}
        <div className="ir-np-curr">
          <div>
            <div className="ir-np-clbl">Current page</div>
            <div className="ir-np-cnm">Interview Results</div>
          </div>
          <div className="ir-np-cdot" />
        </div>

        {/* Nav sections */}
        {NAV_ITEMS.map(group => (
          <div key={group.section}>
            <div className="ir-np-sec">{group.section}</div>
            {group.items.map(item => (
              <div
                key={item.path + item.label}
                className={`ir-np-item${item.path === currentPath ? " nact" : ""}`}
                onClick={() => { setNavOpen(false); router.push(item.path); }}
              >
                <div className="ir-np-ic">{item.icon}</div>
                <div>
                  <div className="ir-np-nm">{item.label}</div>
                  <div className="ir-np-sub">{item.sub}</div>
                </div>
                {"badge" in item && item.badge && item.badgeType === "green" && (
                  <span className="ir-np-bdg">{item.badge}</span>
                )}
                {"badge" in item && item.badge && item.badgeType === "ai" && (
                  <span className="ir-np-ai">{item.badge}</span>
                )}
              </div>
            ))}
            <div className="ir-np-div" />
          </div>
        ))}

        {/* Theme toggle inside panel */}
        <div className="ir-np-tog-row" onClick={toggleTheme}>
          <span className="ir-np-tog-lbl">
            {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </span>
          <div className="ir-np-tog-switch">
            <span className="ir-np-inner-lbl">{theme === "dark" ? "Dark" : "Light"}</span>
            <div className="ir-np-trk">
              <div className="ir-np-thumb" />
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop — closes panel on outside click */}
      <div
        className={`ir-nav-bd${navOpen ? " show" : ""}`}
        onClick={() => setNavOpen(false)}
      />

      {/* Detail modal */}
      <CandidateDetailsModal
        candidate={selectedCandidate}
        onClose={() => setSelectedId(null)}
        onExtendOffer={id => { updateVerdict(id, "offer_extended"); setSelectedId(null); }}
        onReject={id      => { updateVerdict(id, "rejected");       setSelectedId(null); }}
        onScheduleNext={id => { setSelectedId(null); router.push("/scheduler"); }}
        theme={theme}
      />
    </div>
  );
};

export default InterviewResultsInterface;