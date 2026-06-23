// "use client";

// import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
// import { createPortal } from "react-dom";
// import { useSearchParams } from "next/navigation";

// import CandidateListSkeleton from "./subComponents/candidates_Skeleton";
// import CandidateDetails      from "./subComponents/Candidate_Details";
// import CandidateCard         from "./subComponents/Candidatecard";

// import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
// import {
//   getJobs,
//   getCandidates,
//   sendAssessmentReminder as sendAssessmentReminderThunk,
// } from "@/services/redux/thunk/candidateThunk";
// import { setSelectedJobId, clearMessage } from "@/services/redux/slice/candidateSlice";

// import type { Candidate, Job } from "@/services/interfaces/CandidateScreening";

// /* ── STATUS_MAP ── */
// export const STATUS_MAP: Record<string, { label: string; cls: string; priority: number; color: string }> = {
//   "Hired":                  { label: "Hired",               cls: "pill-hired",       priority: 9, color: "green"  },
//   "Interview Scheduled":    { label: "Interview Scheduled", cls: "pill-interview",   priority: 8, color: "blue"   },
//   "Shortlisted":            { label: "Shortlisted",         cls: "pill-shortlisted", priority: 7, color: "blue"   },
//   "Assessment Sent":        { label: "Assessment Pending",  cls: "pill-assessment",  priority: 6, color: "yellow" },
//   "Assessment In Progress": { label: "Assessment Pending",  cls: "pill-assessment",  priority: 5, color: "yellow" },
//   "Assessment Passed":      { label: "Assessment Done",     cls: "pill-assessed",    priority: 4, color: "green"  },
//   "Assessment Failed":      { label: "Assessment Done",     cls: "pill-assessed",    priority: 3, color: "green"  },
//   "Assessment Expired":     { label: "Assessment Pending",  cls: "pill-assessment",  priority: 2, color: "yellow" },
//   "Rejected":               { label: "Rejected",            cls: "pill-rejected",    priority: 1, color: "red"    },
//   "Under Review":           { label: "Applied",             cls: "pill-applied",     priority: 0, color: "gray"   },
// };

// export function getDisplayStatus(c: Candidate): string {
//   if (c?.final_status === "Hired")       return "Hired";
//   if (c?.interview_scheduled)            return "Interview Scheduled";
//   if (c?.exam_completed)                 return (c?.exam_percentage ?? 0) >= 70 ? "Assessment Passed" : "Assessment Failed";
//   if (c?.exam_started)                   return "Assessment In Progress";
//   if (c?.exam_link_sent)                 return c?.link_expired ? "Assessment Expired" : "Assessment Sent";
//   if (c?.status === "Shortlisted")       return "Shortlisted";
//   if (c?.status === "Rejected" || c?.final_status === "Rejected After Exam") return "Rejected";
//   return "Under Review";
// }

// export const getCandidateStatusInfo = (c: Candidate) =>
//   STATUS_MAP[getDisplayStatus(c)] ?? STATUS_MAP["Under Review"]!;
// export const getScoreColor = (s = 0) =>
//   s >= 80 ? "#059669" : s >= 70 ? "#d97706" : "#dc2626";

// const FILTER_CHIPS = [
//   { label: "All",                 value: "all"                },
//   { label: "Shortlisted",         value: "shortlisted"        },
//   { label: "Assessment Pending",  value: "assessment_pending" },
//   { label: "Assessment Done",     value: "assessment_done"    },
//   { label: "Interview Scheduled", value: "interview"          },
//   { label: "Hired",               value: "hired"              },
//   { label: "Rejected",            value: "rejected"           },
// ];

// /* ── GLOBAL CSS — exact match to HTML version ── */
// const GLOBAL_CSS = `
// @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap');
// :root{--serif:'DM Serif Display',Georgia,serif;--sans:'Inter',system-ui,sans-serif;}

// [data-cs-theme="dark"]{
//   --bg:#040d0a;--glass:rgba(255,255,255,0.04);--glass2:rgba(255,255,255,0.07);
//   --bd:rgba(0,214,143,0.12);--bd2:rgba(0,214,143,0.22);
//   --acc:#00d68f;--acc2:#059669;--acc3:#34d399;
//   --accs:rgba(0,214,143,0.10);--accg:rgba(0,214,143,0.25);
//   --tx:#e2faf1;--tx2:#a7c4b8;--tx3:#5a8a75;
//   --red:#f87171;--amber:#fbbf24;--blue:#60a5fa;--purple:#a78bfa;
//   --card-bg:rgba(255,255,255,0.04);--card-bd:rgba(0,214,143,0.12);
//   --sb-bg:rgba(4,13,10,0.97);--btn-text:#040d0a;
//   --rej-bg:rgba(248,113,113,0.05);--rej-bd:rgba(248,113,113,0.2);
//   --short-bg:rgba(0,214,143,0.05);--short-bd:rgba(0,214,143,0.2);
//   --tog-bg:rgba(0,214,143,0.12);--tog-bd:rgba(0,214,143,0.25);--tog-col:#00d68f;
//   --score-hi-bg:rgba(0,214,143,.1);--score-hi:#00d68f;
//   --score-mid-bg:rgba(251,191,36,.1);--score-mid:#fbbf24;
//   --score-lo-bg:rgba(248,113,113,.1);--score-lo:#f87171;
//   --skel-a:rgba(255,255,255,.05);--skel-b:rgba(255,255,255,.1);
//   --tl-done-bg:rgba(0,214,143,.1);--tl-done-bd:rgba(0,214,143,.25);--tl-done-col:#00d68f;
//   --tl-pend-bg:rgba(255,255,255,.05);--tl-pend-bd:rgba(255,255,255,.08);
// }
// [data-cs-theme="light"]{
//   --bg:#f0faf6;--glass:#ffffff;--glass2:#f4faf7;
//   --bd:#c5e8d8;--bd2:#9dd4bb;
//   --acc:#059669;--acc2:#047857;--acc3:#34d399;
//   --accs:rgba(5,150,105,0.08);--accg:rgba(5,150,105,0.2);
//   --tx:#0d2b1e;--tx2:#2d5a42;--tx3:#6b9e85;
//   --red:#dc2626;--amber:#d97706;--blue:#2563eb;--purple:#7c3aed;
//   --card-bg:#ffffff;--card-bd:#c5e8d8;
//   --sb-bg:#ffffff;--btn-text:#ffffff;
//   --rej-bg:rgba(220,38,38,0.04);--rej-bd:rgba(220,38,38,0.18);
//   --short-bg:rgba(5,150,105,0.05);--short-bd:rgba(5,150,105,0.2);
//   --tog-bg:rgba(5,150,105,0.1);--tog-bd:rgba(5,150,105,0.25);--tog-col:#059669;
//   --score-hi-bg:#ecfdf5;--score-hi:#059669;
//   --score-mid-bg:#fffbeb;--score-mid:#d97706;
//   --score-lo-bg:#fef2f2;--score-lo:#dc2626;
//   --skel-a:#e2e8f0;--skel-b:#cbd5e1;
//   --tl-done-bg:rgba(5,150,105,.08);--tl-done-bd:rgba(5,150,105,.25);--tl-done-col:#059669;
//   --tl-pend-bg:#f4faf7;--tl-pend-bd:#c5e8d8;
// }

// @keyframes fup{to{opacity:1;transform:translateY(0);}}
// @keyframes pdot{0%,100%{opacity:1;}50%{opacity:.4;}}
// @keyframes spin{to{transform:rotate(360deg);}}
// @keyframes cs-skel-shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}

// .shell{display:flex;height:100vh;position:relative;background:var(--bg);color:var(--tx);font-family:var(--sans);overflow:hidden;transition:background .35s,color .35s;z-index:1;}
// [data-cs-theme="dark"] .shell::before{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(0,214,143,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,214,143,.025) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;z-index:0;}

// /* ── SIDEBAR ── */
// .sb{width:285px;flex-shrink:0;background:var(--sb-bg);border-right:1px solid var(--card-bd);display:flex;flex-direction:column;height:100vh;overflow:hidden;backdrop-filter:blur(20px);transition:background .35s,border-color .35s;box-shadow:2px 0 20px rgba(0,0,0,.15);z-index:1;}
// .sb-hdr{padding:1rem 1rem .75rem;border-bottom:1px solid var(--card-bd);transition:border-color .35s;}
// .sb-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:.75rem;}
// .sb-title{font-family:var(--serif);font-size:1.05rem;color:var(--tx);transition:color .35s;}
// .sb-cnt{font-size:.65rem;font-weight:600;color:var(--tx3);background:var(--glass2);border:1px solid var(--card-bd);padding:.18rem .55rem;border-radius:999px;transition:all .35s;}
// .sb-search{display:flex;align-items:center;gap:6px;background:var(--glass2);border:1px solid var(--card-bd);border-radius:9px;padding:.4rem .78rem;margin-bottom:.55rem;transition:border-color .2s,background .35s;}
// .sb-search:focus-within{border-color:var(--acc);}
// .sb-search svg{width:14px;height:14px;stroke:var(--tx3);fill:none;stroke-width:2;flex-shrink:0;}
// .sb-search input{background:none;border:none;outline:none;font-family:var(--sans);font-size:.72rem;color:var(--tx);width:100%;}
// .sb-search input::placeholder{color:var(--tx3);}
// .sb-job-wrap{margin-bottom:.55rem;position:relative;}
// .sb-job-sel{width:100%;background:var(--glass2);border:1px solid var(--card-bd);color:var(--tx2);font-family:var(--sans);font-size:.72rem;padding:.36rem 2rem .36rem .72rem;border-radius:8px;outline:none;cursor:pointer;appearance:none;-webkit-appearance:none;transition:all .2s;}
// .sb-job-sel:focus{border-color:var(--acc);}
// .sb-job-arrow{position:absolute;right:.58rem;top:50%;transform:translateY(-50%);pointer-events:none;font-size:.58rem;color:var(--tx3);}
// .sb-filter{display:flex;gap:4px;overflow-x:auto;padding-bottom:.5rem;scrollbar-width:none;}
// .sb-filter::-webkit-scrollbar{display:none;}
// .ftab{flex-shrink:0;font-size:.61rem;font-weight:600;padding:.2rem .58rem;border-radius:999px;cursor:pointer;border:1px solid var(--card-bd);background:transparent;color:var(--tx3);font-family:var(--sans);transition:all .13s;white-space:nowrap;}
// .ftab:hover{border-color:var(--acc);color:var(--acc);}
// .ftab.on{background:var(--acc);color:var(--btn-text);border-color:var(--acc);}
// .sb-sort{padding:.45rem 1rem;border-bottom:1px solid var(--card-bd);display:flex;align-items:center;justify-content:space-between;transition:border-color .35s;}
// .sb-sort-wrap{position:relative;}
// .sort-lbl{font-size:.62rem;color:var(--tx3);transition:color .35s;}
// .sort-sel{background:var(--glass2);border:1px solid var(--card-bd);color:var(--tx2);font-family:var(--sans);font-size:.62rem;padding:.28rem 1.8rem .28rem .6rem;border-radius:7px;outline:none;cursor:pointer;appearance:none;-webkit-appearance:none;transition:all .2s;}
// .sort-sel:focus{border-color:var(--acc);}
// .sort-arrow{position:absolute;right:.5rem;top:50%;transform:translateY(-50%);pointer-events:none;font-size:.55rem;color:var(--tx3);}
// .cand-list{flex:1;overflow-y:auto;padding:.35rem .45rem;}
// .cand-list::-webkit-scrollbar{width:3px;}
// .cand-list::-webkit-scrollbar-thumb{background:var(--bd2);border-radius:3px;}
// .sb-notif{padding:.52rem .85rem;border-radius:8px;font-size:.71rem;font-weight:500;margin:6px 10px 0;}
// .sb-notif.info{background:var(--accs);color:var(--acc);border:1px solid var(--bd);}
// .sb-notif.warn{background:var(--rej-bg);color:var(--red);border:1px solid var(--rej-bd);}
// .sb-empty{display:flex;flex-direction:column;align-items:center;gap:8px;padding:2rem;color:var(--tx3);text-align:center;}
// .sb-empty svg{width:28px;height:28px;stroke:var(--tx3);fill:none;stroke-width:2;opacity:.4;}
// .sb-empty-title{font-size:.8rem;font-weight:600;color:var(--tx2);}
// .sb-empty-sub{font-size:.69rem;}
// .sb-theme{padding:.8rem 1rem;border-top:1px solid var(--card-bd);display:flex;align-items:center;gap:9px;cursor:pointer;transition:background .2s,border-color .35s;flex-shrink:0;}
// .sb-theme:hover{background:var(--glass2);}
// .tog-icon{font-size:.95rem;flex-shrink:0;}
// .tog-label-txt{flex:1;font-size:.75rem;font-weight:600;color:var(--tx2);transition:color .35s;}
// .tog-track{width:38px;height:20px;border-radius:999px;background:var(--tog-bg);border:1px solid var(--tog-bd);position:relative;flex-shrink:0;transition:all .35s;}
// .tog-thumb{position:absolute;top:3px;left:3px;width:12px;height:12px;border-radius:50%;background:var(--tog-col);transition:transform .28s cubic-bezier(.4,0,.2,1),background .35s;box-shadow:0 0 6px var(--accg);}
// [data-cs-theme="light"] .tog-thumb{transform:translateX(18px);}

// /* ── MAIN ── */
// .main{flex:1;overflow-y:auto;min-width:0;transition:background .35s;}
// .main::-webkit-scrollbar{width:4px;}
// .main::-webkit-scrollbar-thumb{background:var(--bd2);border-radius:4px;}
// .page-topbar{display:flex;align-items:center;justify-content:space-between;padding:1.4rem 2.2rem 0;opacity:0;transform:translateY(10px);animation:fup .4s ease .02s forwards;}
// .page-title{font-family:var(--serif);font-size:1.55rem;color:var(--tx);transition:color .35s;}
// .page-sub{font-size:.72rem;color:var(--tx3);margin-top:.15rem;transition:color .35s;}
// .page-btns{display:flex;align-items:center;gap:.6rem;}
// .btn-export{background:var(--glass2);color:var(--tx2);font-family:var(--sans);font-size:.76rem;font-weight:600;padding:.44rem .9rem;border-radius:8px;border:1px solid var(--card-bd);cursor:pointer;display:flex;align-items:center;gap:6px;transition:all .2s;}
// .btn-export:hover{border-color:var(--acc);color:var(--acc);}
// .btn-add{background:var(--acc);color:var(--btn-text);font-family:var(--sans);font-size:.76rem;font-weight:700;padding:.44rem .9rem;border-radius:8px;border:none;cursor:pointer;display:flex;align-items:center;gap:6px;box-shadow:0 0 14px var(--accg);transition:all .2s;}
// .btn-add:hover{background:var(--acc3);box-shadow:0 0 22px var(--accg);transform:translateY(-1px);}
// .btn-refresh{width:34px;height:34px;border-radius:8px;background:var(--glass2);border:1px solid var(--card-bd);display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--tx3);transition:all .2s;font-size:.85rem;}
// .btn-refresh:hover{border-color:var(--acc);color:var(--acc);}
// .detail{padding:1.8rem 2.2rem;max-width:860px;}
// .main-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;gap:.75rem;color:var(--tx3);text-align:center;padding:3rem;}
// .main-empty svg{width:52px;height:52px;stroke:var(--tx3);fill:none;stroke-width:1.5;opacity:.3;}
// .main-empty-title{font-size:.92rem;font-weight:600;color:var(--tx2);}
// .main-empty-sub{font-size:.73rem;line-height:1.55;max-width:220px;}

// /* ── Status pills ── */
// .cs-pill{display:inline-flex;align-items:center;gap:3px;font-size:.59rem;font-weight:600;padding:.13rem .48rem;border-radius:999px;white-space:nowrap;}
// .pill-shortlisted{background:rgba(59,130,246,.12);color:#60a5fa;}
// .pill-assessment{background:rgba(251,191,36,.1);color:#fbbf24;}
// .pill-assessed{background:rgba(45,212,191,.1);color:#2dd4bf;}
// .pill-interview{background:rgba(167,139,250,.1);color:#a78bfa;}
// .pill-hired{background:rgba(0,214,143,.1);color:#00d68f;}
// .pill-rejected{background:rgba(248,113,113,.1);color:#f87171;}
// .pill-applied{background:rgba(255,255,255,.06);color:#5a8a75;}
// [data-cs-theme="light"] .pill-shortlisted{background:#eff6ff;color:#2563eb;}
// [data-cs-theme="light"] .pill-assessment{background:#fffbeb;color:#d97706;}
// [data-cs-theme="light"] .pill-assessed{background:#f0fdfa;color:#0d9488;}
// [data-cs-theme="light"] .pill-interview{background:#f5f3ff;color:#7c3aed;}
// [data-cs-theme="light"] .pill-hired{background:#f0fdf4;color:#16a34a;}
// [data-cs-theme="light"] .pill-rejected{background:#fef2f2;color:#dc2626;}
// [data-cs-theme="light"] .pill-applied{background:#f1f5f9;color:#64748b;}

// /* ── Skeleton ── */
// .cs-skel{background:linear-gradient(90deg,var(--skel-a) 25%,var(--skel-b) 50%,var(--skel-a) 75%);background-size:400px 100%;animation:cs-skel-shimmer 1.3s infinite linear;border-radius:6px;}
// .cs-skel-item{display:flex;align-items:flex-start;gap:10px;padding:.62rem .68rem;border-radius:10px;background:var(--glass);border:1px solid var(--card-bd);margin-bottom:2px;}

// /* ── CandidateCard ── */
// .cs-cc{display:flex;align-items:flex-start;gap:10px;padding:.62rem .68rem;border-radius:10px;cursor:pointer;transition:background .12s;border:1px solid transparent;margin-bottom:2px;}
// .cs-cc:hover{background:var(--glass2);}
// .cs-cc.cs-cc--on{background:var(--accs);border-color:var(--bd2);}
// .cs-cc__av{width:38px;height:38px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.62rem;font-weight:700;}
// .cs-cc__body{flex:1;min-width:0;}
// .cs-cc__nm{font-size:.77rem;font-weight:600;color:var(--tx);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:color .35s;}
// .cs-cc__email{font-size:.61rem;color:var(--tx3);margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
// .cs-cc__role{font-size:.59rem;color:var(--tx3);margin-top:2px;}
// .cs-cc__meta{display:flex;align-items:center;gap:5px;margin-top:4px;}
// .cs-cc__right{flex-shrink:0;display:flex;flex-direction:column;align-items:flex-end;gap:3px;}
// .cs-cc__score{font-size:.77rem;font-weight:700;padding:.18rem .52rem;border-radius:6px;min-width:34px;text-align:center;}
// .cs-cc__score--hi{background:var(--score-hi-bg);color:var(--score-hi);}
// .cs-cc__score--mid{background:var(--score-mid-bg);color:var(--score-mid);}
// .cs-cc__score--lo{background:var(--score-lo-bg);color:var(--score-lo);}
// .cs-cc__denom{font-size:.58rem;color:var(--tx3);}


// /* ── DRAGGABLE FAB ── */
// .fab{position:fixed;width:46px;height:46px;border-radius:13px;background:var(--fab-bg,#1a2535);border:1px solid rgba(255,255,255,.12);box-shadow:0 6px 24px rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;cursor:grab;z-index:9999;user-select:none;touch-action:none;transition:box-shadow .2s,border-color .2s,background .25s;}
// .fab:active{cursor:grabbing;}
// .fab:hover{border-color:rgba(0,214,143,.4);box-shadow:0 6px 28px rgba(0,0,0,.6),0 0 0 1px rgba(0,214,143,.2);}
// .fab.open{background:var(--fab-open,#00d68f);border-color:var(--fab-open,#00d68f);box-shadow:0 6px 28px var(--accg);}
// .fab svg{pointer-events:none;transition:transform .3s ease;}
// .fab.open svg{transform:rotate(180deg);}
// .fab-tip{position:fixed;background:#0f1f16;border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:.3rem .65rem;font-size:.68rem;font-weight:500;color:rgba(255,255,255,.65);white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .18s;box-shadow:0 4px 14px rgba(0,0,0,.4);z-index:9998;}
// .fab-bd{position:fixed;inset:0;z-index:9996;}
// /* ── NAV PANEL ── */
// .nav-panel{position:fixed;width:262px;background:#0a1810;border:1px solid rgba(0,214,143,.15);border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.65),0 0 0 1px rgba(0,214,143,.04);z-index:9997;overflow:hidden;opacity:0;pointer-events:none;transform:scale(.93);transition:all .26s cubic-bezier(.4,0,.2,1);font-family:var(--sans);}
// .nav-panel.show{opacity:1;pointer-events:all;transform:scale(1);}
// .np-hdr{padding:.85rem 1rem .7rem;border-bottom:1px solid rgba(0,214,143,.08);display:flex;align-items:center;justify-content:space-between;}
// .np-title{font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(0,214,143,.3);}
// .np-x{width:21px;height:21px;border-radius:6px;background:rgba(255,255,255,.05);border:none;color:rgba(255,255,255,.35);font-size:.7rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;font-family:var(--sans);}
// .np-x:hover{background:rgba(255,255,255,.1);color:#fff;}
// .np-curr{margin:.6rem .8rem .35rem;background:rgba(0,214,143,.08);border:1px solid rgba(0,214,143,.18);border-radius:8px;padding:.48rem .72rem;display:flex;align-items:center;justify-content:space-between;}
// .np-cdot{width:7px;height:7px;border-radius:50%;background:#00d68f;animation:pdot 1.5s infinite;flex-shrink:0;}
// .np-clbl{font-size:.6rem;color:rgba(255,255,255,.38);margin-bottom:.08rem;}
// .np-cnm{font-size:.77rem;font-weight:600;color:#00d68f;}
// .np-sec{font-size:.57rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(0,214,143,.22);padding:.6rem .85rem .22rem;}
// .np-item{display:flex;align-items:center;gap:9px;padding:.52rem .85rem;margin:1px .45rem;border-radius:9px;cursor:pointer;transition:all .13s;text-decoration:none;position:relative;}
// .np-item:hover{background:rgba(255,255,255,.06);}
// .np-item.nact{background:rgba(0,214,143,.1);}
// .np-item.nact::before{content:'';position:absolute;left:-1px;top:50%;transform:translateY(-50%);width:3px;height:62%;border-radius:0 2px 2px 0;background:#00d68f;box-shadow:0 0 7px #00d68f;}
// .np-ic{width:29px;height:29px;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.88rem;}
// .np-item.nact .np-ic{background:rgba(0,214,143,.12);}
// .np-item:hover .np-ic{background:rgba(255,255,255,.06);}
// .np-nm{font-size:.77rem;font-weight:500;color:rgba(255,255,255,.65);}
// .np-item.nact .np-nm{color:#e2faf1;font-weight:600;}
// .np-sub{font-size:.62rem;color:rgba(255,255,255,.24);}
// .np-bdg{margin-left:auto;flex-shrink:0;background:#00d68f;color:#040d0a;font-size:.56rem;font-weight:700;padding:.08rem .4rem;border-radius:999px;}
// .np-ai{margin-left:auto;flex-shrink:0;font-size:.52rem;font-weight:700;background:rgba(0,214,143,.1);color:#00d68f;border:1px solid rgba(0,214,143,.2);padding:.08rem .36rem;border-radius:999px;}
// .np-div{height:1px;background:rgba(0,214,143,.08);margin:.38rem .8rem;}
// .np-tog-row{margin:.45rem .8rem .8rem;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:.55rem .72rem;display:flex;align-items:center;justify-content:space-between;cursor:pointer;transition:background .2s;}
// .np-tog-row:hover{background:rgba(255,255,255,.07);}
// .np-tog-lbl{font-size:.7rem;color:rgba(255,255,255,.45);display:flex;align-items:center;gap:6px;}
// .np-tog-switch{display:flex;align-items:center;gap:5px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:999px;padding:.18rem .18rem .18rem .55rem;}
// .np-inner-lbl{font-size:.58rem;font-weight:700;color:rgba(255,255,255,.4);min-width:26px;transition:color .2s;}
// .np-trk{width:26px;height:14px;border-radius:999px;background:rgba(0,214,143,.2);position:relative;}
// .np-thumb{position:absolute;top:2px;left:2px;width:10px;height:10px;border-radius:50%;background:#00d68f;transition:all .25s cubic-bezier(.4,0,.2,1);box-shadow:0 0 5px rgba(0,214,143,.5);}
// .np-tog-row.light .np-thumb{transform:translateX(12px);}
// .np-tog-row.light .np-inner-lbl{color:rgba(255,255,255,.65);}
// @keyframes npii{from{opacity:0;transform:translateX(-8px);}to{opacity:1;transform:translateX(0);}}
// .nav-panel.show .np-item{animation:npii .22s ease both;}
// .nav-panel.show .np-item:nth-child(1){animation-delay:.03s;}
// .nav-panel.show .np-item:nth-child(2){animation-delay:.06s;}
// .nav-panel.show .np-item:nth-child(3){animation-delay:.09s;}
// .nav-panel.show .np-item:nth-child(4){animation-delay:.12s;}
// .nav-panel.show .np-item:nth-child(5){animation-delay:.15s;}
// .nav-panel.show .np-item:nth-child(6){animation-delay:.18s;}
// .nav-panel.show .np-item:nth-child(7){animation-delay:.21s;}
// @media(max-width:900px){.sb{width:240px;}}
// @media(max-width:660px){.shell{flex-direction:column;}.sb{width:100%;height:auto;max-height:280px;}.main{flex:1;overflow-y:auto;}.detail{padding:1rem;}.page-topbar{padding:1rem 1rem 0;}}
// `;

// /* ─────────────────────────────────────────────────────────────────────────────
//    COMPONENT
// ───────────────────────────────────────────────────────────────────────────── */
// export default function CandidateScreeningInterface() {
//   const dispatch     = useAppDispatch();
//   const params       = useSearchParams();
//   const jobIdFromUrl = params.get("job_id");

//   const { jobs, candidates, candidatesLoading, error, selectedJobId, message } =
//     useAppSelector((s) => s.candidate);

//   const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
//   const [searchTerm,   setSearchTerm]   = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [sortBy,       setSortBy]       = useState("score_desc");
//   const [theme,        setTheme]        = useState<"dark" | "light">("dark");

//   useEffect(() => {
//     const saved = localStorage.getItem("tf-theme");
//     if (saved === "light") setTheme("light");
//   }, []);

//   const toggleTheme = useCallback(() => {
//     setTheme((t) => {
//       const next = t === "dark" ? "light" : "dark";
//       localStorage.setItem("tf-theme", next);
//       return next;
//     });
//   }, []);

//   useEffect(() => { dispatch(getJobs()); }, [dispatch]);
//   useEffect(() => {
//     if (jobIdFromUrl && jobs.length) {
//       const found = jobs.find((j) => String(j.id) === String(jobIdFromUrl));
//       if (found) dispatch(setSelectedJobId(found.id));
//     }
//   }, [jobIdFromUrl, jobs, dispatch]);
//   useEffect(() => { dispatch(getCandidates(selectedJobId ?? undefined)); }, [dispatch, selectedJobId]);
//   useEffect(() => {
//     if (candidates.length && !selectedCandidate) setSelectedCandidate(candidates[0]);
//   }, [candidates, selectedCandidate]);

//   const selectedJob = useMemo(
//     () => selectedJobId ? jobs.find((j) => String(j.id) === String(selectedJobId)) ?? null : null,
//     [jobs, selectedJobId],
//   );

//   const processedCandidates = useMemo(
//     () => candidates.map((c) => ({
//       ...c,
//       displayStatus: getDisplayStatus(c),
//       displayScore:  c?.ats_score || 0,
//       scoreColor:    getScoreColor(c?.ats_score || 0),
//       statusInfo:    getCandidateStatusInfo(c),
//     })),
//     [candidates],
//   );

//   const filteredCandidates = useMemo(() => {
//     let list = processedCandidates;
//     if (searchTerm) {
//       const q = searchTerm.toLowerCase();
//       list = list.filter((c) =>
//         c.name?.toLowerCase().includes(q) ||
//         c.email?.toLowerCase().includes(q) ||
//         c.job_title?.toLowerCase().includes(q),
//       );
//     }
//     if (filterStatus !== "all") {
//       list = list.filter((c) => {
//         const ds = c.displayStatus;
//         switch (filterStatus) {
//           case "shortlisted":        return ds === "Shortlisted";
//           case "assessment_pending": return ["Assessment Sent","Assessment In Progress","Assessment Expired"].includes(ds);
//           case "assessment_done":    return ["Assessment Passed","Assessment Failed"].includes(ds);
//           case "interview":          return ds === "Interview Scheduled";
//           case "hired":              return ds === "Hired";
//           case "rejected":           return ds === "Rejected";
//           default:                   return true;
//         }
//       });
//     }
//     return [...list].sort((a, b) => {
//       switch (sortBy) {
//         case "score_desc": return (b.ats_score ?? 0) - (a.ats_score ?? 0);
//         case "score_asc":  return (a.ats_score ?? 0) - (b.ats_score ?? 0);
//         case "date_desc":  return +new Date(b.processed_date ?? 0) - +new Date(a.processed_date ?? 0);
//         case "date_asc":   return +new Date(a.processed_date ?? 0) - +new Date(b.processed_date ?? 0);
//         case "name_asc":   return (a.name ?? "").localeCompare(b.name ?? "");
//         case "status":     return (b.statusInfo?.priority ?? 0) - (a.statusInfo?.priority ?? 0);
//         default:           return 0;
//       }
//     });
//   }, [processedCandidates, searchTerm, filterStatus, sortBy]);

//   const refreshData = useCallback(async () => {
//     await dispatch(getJobs()).unwrap();
//     await dispatch(getCandidates(selectedJobId ?? undefined)).unwrap();
//   }, [dispatch, selectedJobId]);

//   const sendAssessmentReminder = useCallback(async (id: string | number) => {
//     await dispatch(sendAssessmentReminderThunk(id)).unwrap();
//     setTimeout(() => dispatch(clearMessage()), 3000);
//     dispatch(getCandidates(selectedJobId ?? undefined));
//   }, [dispatch, selectedJobId]);


//   /* ── FAB + Nav Panel state ── */
//   const [fabOpen,   setFabOpen]   = useState(false);
//   const [fabPos,    setFabPos]    = useState({ left: 0, top: 0 });
//   const [panelPos,  setPanelPos]  = useState({ left: 0, top: 0 });
//   const [showTip,   setShowTip]   = useState(false);
//   const [mounted,   setMounted]   = useState(false);
//   const fabRef     = useRef<HTMLDivElement>(null);
//   const dragging   = useRef(false);
//   const startXY    = useRef({ x: 0, y: 0, ox: 0, oy: 0 });

//   useEffect(() => {
//     setMounted(true);
//     setFabPos({ left: window.innerWidth - 64, top: window.innerHeight / 2 - 23 });
//   }, []);

//   const calcPanelPos = useCallback((fabL: number, fabT: number) => {
//     let px = fabL + 56, py = fabT;
//     if (px + 270 > window.innerWidth)  px = fabL - 274;
//     if (py + 470 > window.innerHeight) py = window.innerHeight - 478;
//     if (py < 8) py = 8;
//     if (px < 8) px = 8;
//     return { left: px, top: py };
//   }, []);

//   const openNav = useCallback(() => {
//     setFabOpen(true);
//     setPanelPos(calcPanelPos(fabPos.left, fabPos.top));
//   }, [fabPos, calcPanelPos]);

//   const closeNav = useCallback(() => setFabOpen(false), []);

//   const onFabMouseDown = useCallback((e: React.MouseEvent) => {
//     dragging.current = false;
//     startXY.current = { x: e.clientX, y: e.clientY, ox: fabPos.left, oy: fabPos.top };
//     const move = (ev: MouseEvent) => {
//       const dx = ev.clientX - startXY.current.x;
//       const dy = ev.clientY - startXY.current.y;
//       if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragging.current = true;
//       if (dragging.current) {
//         const nx = Math.max(0, Math.min(window.innerWidth  - 50, startXY.current.ox + dx));
//         const ny = Math.max(0, Math.min(window.innerHeight - 50, startXY.current.oy + dy));
//         setFabPos({ left: nx, top: ny });
//         if (fabOpen) setPanelPos(calcPanelPos(nx, ny));
//       }
//     };
//     const up = () => {
//       if (!dragging.current) fabOpen ? closeNav() : openNav();
//       document.removeEventListener("mousemove", move);
//       document.removeEventListener("mouseup",   up);
//     };
//     document.addEventListener("mousemove", move);
//     document.addEventListener("mouseup",   up);
//     e.preventDefault();
//   }, [fabPos, fabOpen, openNav, closeNav, calcPanelPos]);

//   const isLoading = candidatesLoading === "pending";

//   return (
//     <div className="shell" data-cs-theme={theme}>
//       <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

//       {/* ══ SIDEBAR ══ */}
//       <div className="sb">
//         <div className="sb-hdr">
//           <div className="sb-top">
//             <span className="sb-title">Candidates</span>
//             <span className="sb-cnt">{filteredCandidates.length} of {candidates.length}</span>
//           </div>

//           <div className="sb-search">
//             <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
//             <input
//               type="text"
//               placeholder="Search by name, email, or job title…"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {jobs.length > 0 && (
//             <div className="sb-job-wrap">
//               <select
//                 className="sb-job-sel"
//                 value={selectedJobId ?? ""}
//                 onChange={(e) => {
//                   const job = jobs.find((j) => String(j.id) === e.target.value);
//                   dispatch(setSelectedJobId(job?.id ?? null));
//                 }}
//               >
//                 <option value="">All Jobs</option>
//                 {jobs.map((j) => (
//                   <option key={j.id} value={j.id}>{j.title} ({j.location})</option>
//                 ))}
//               </select>
//               <span className="sb-job-arrow">▾</span>
//             </div>
//           )}

//           <div className="sb-filter">
//             {FILTER_CHIPS.map((chip) => (
//               <button
//                 key={chip.value}
//                 className={`ftab${filterStatus === chip.value ? " on" : ""}`}
//                 onClick={() => setFilterStatus(chip.value)}
//               >
//                 {chip.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="sb-sort">
//           <span className="sort-lbl">Sort by</span>
//           <div className="sb-sort-wrap">
//             <select className="sort-sel" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//               <option value="score_desc">Score (High to Low)</option>
//               <option value="score_asc">Score (Low to High)</option>
//               <option value="date_desc">Date (Newest First)</option>
//               <option value="date_asc">Date (Oldest First)</option>
//               <option value="name_asc">Name (A–Z)</option>
//               <option value="status">Status Priority</option>
//             </select>
//             <span className="sort-arrow">▾</span>
//           </div>
//         </div>

//         {message && <div className="sb-notif info">{message}</div>}
//         {error   && <div className="sb-notif warn">{error}</div>}

//         <div className="cand-list">
//           {isLoading ? (
//             <CandidateListSkeleton />
//           ) : filteredCandidates.length === 0 ? (
//             <div className="sb-empty">
//               <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
//               <div className="sb-empty-title">No candidates found</div>
//               <div className="sb-empty-sub">Try adjusting filters or search.</div>
//             </div>
//           ) : (
//             filteredCandidates.map((c) => (
//               <CandidateCard
//                 key={c.id}
//                 candidate={c as any}
//                 isSelected={selectedCandidate?.id === c.id}
//                 onClick={() => {
//                   const { displayStatus, displayScore, scoreColor, statusInfo, ...base } = c;
//                   setSelectedCandidate(base as Candidate);
//                 }}
//               />
//             ))
//           )}
//         </div>

//         <div className="sb-theme" onClick={toggleTheme}>
//           <span className="tog-icon">{theme === "dark" ? "🌙" : "☀️"}</span>
//           <span className="tog-label-txt">{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
//           <div className="tog-track"><div className="tog-thumb" /></div>
//         </div>
//       </div>

//       {/* ══ MAIN ══ */}
//       <div className="main">
//         <div className="page-topbar">
//           <div>
//             <div className="page-title">Candidate Screening</div>
//             {selectedJob && (
//               <div className="page-sub">
//                 {selectedJob.title} · {selectedJob.location} · {filteredCandidates.length} candidates
//               </div>
//             )}
//           </div>
//           <div className="page-btns">
//             <button className="btn-export">📤 Export CSV</button>
//             <button className="btn-add">+ Add Candidate</button>
//             <button className="btn-refresh" onClick={refreshData} title="Refresh">↻</button>
//           </div>
//         </div>

//         <div className="detail">
//           {selectedCandidate ? (
//             <CandidateDetails
//               candidate={{
//                 ...selectedCandidate,
//                 displayStatus: getDisplayStatus(selectedCandidate),
//                 displayScore:  selectedCandidate.ats_score ?? 0,
//                 scoreColor:    getScoreColor(selectedCandidate.ats_score ?? 0),
//               } as any}
//               onSendReminder={sendAssessmentReminder}
//             />
//           ) : (
//             <div className="main-empty">
//               <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
//               <div className="main-empty-title">Select a candidate</div>
//               <div className="main-empty-sub">Choose a candidate from the list to view their full profile, scores, and recruitment timeline.</div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ══ DRAGGABLE FAB + NAV PANEL (portal) ══ */}
//       {mounted && createPortal(
//         <>
//           {/* Backdrop */}
//           {fabOpen && (
//             <div className="fab-bd" onClick={closeNav} />
//           )}

//           {/* FAB */}
//           <div
//             ref={fabRef}
//             className={`fab${fabOpen ? " open" : ""}`}
//             style={{ left: fabPos.left, top: fabPos.top }}
//             onMouseDown={onFabMouseDown}
//             onMouseEnter={() => { if (!fabOpen) setShowTip(true); }}
//             onMouseLeave={() => setShowTip(false)}
//           >
//             <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <polygon points="12 2 2 7 12 12 22 7 12 2"/>
//               <polyline points="2 17 12 22 22 17"/>
//               <polyline points="2 12 12 17 22 12"/>
//             </svg>
//           </div>

//           {/* Tooltip */}
//           {showTip && !fabOpen && (
//             <div className="fab-tip" style={{ left: fabPos.left + 54, top: fabPos.top + 12, opacity: 1 }}>
//               Pages
//             </div>
//           )}

//           {/* Nav Panel */}
//           <div className={`nav-panel${fabOpen ? " show" : ""}`} style={{ left: panelPos.left, top: panelPos.top }}>
//             <div className="np-hdr">
//               <span className="np-title">Navigation</span>
//               <button className="np-x" onClick={closeNav}>✕</button>
//             </div>
//             <div className="np-curr">
//               <div>
//                 <div className="np-clbl">Current page</div>
//                 <div className="np-cnm">Candidate Screening</div>
//               </div>
//               <div className="np-cdot" />
//             </div>
//             <div className="np-sec">Recruitment</div>
//             <a className="np-item" href="/dashboard"><div className="np-ic">📊</div><div><div className="np-nm">Dashboard</div><div className="np-sub">Recruitment overview</div></div></a>
//             <a className="np-item nact" href="/candidates"><div className="np-ic">👥</div><div><div className="np-nm">Candidates</div><div className="np-sub">Manage applicants</div></div></a>
//             <a className="np-item" href="/scheduler"><div className="np-ic">🗓️</div><div><div className="np-nm">Scheduling</div><div className="np-sub">Interview calendar</div></div></a>
//             <div className="np-div" />
//             <div className="np-sec">Screening</div>
//             <a className="np-item" href="/assessments"><div className="np-ic">📋</div><div><div className="np-nm">Assessments</div><div className="np-sub">Tests &amp; evaluations</div></div></a>
//             <a className="np-item" href="/interview-results"><div className="np-ic">🎯</div><div><div className="np-nm">Interview Results</div><div className="np-sub">Review outcomes</div></div><span className="np-bdg">5</span></a>
//             <div className="np-div" />
//             <div className="np-sec">Tools</div>
//             <a className="np-item" href="#"><div className="np-ic">🤖</div><div><div className="np-nm">ATS Checking</div><div className="np-sub">AI-powered screening</div></div><span className="np-ai">AI</span></a>
//             <a className="np-item" href="#"><div className="np-ic">📈</div><div><div className="np-nm">Reports</div><div className="np-sub">Analytics &amp; insights</div></div></a>
//             <div className="np-div" />
//             <div className={`np-tog-row${theme === "light" ? " light" : ""}`} onClick={toggleTheme}>
//               <span className="np-tog-lbl">{theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}</span>
//               <div className="np-tog-switch">
//                 <span className="np-inner-lbl">{theme === "dark" ? "Dark" : "Light"}</span>
//                 <div className="np-trk"><div className="np-thumb" /></div>
//               </div>
//             </div>
//           </div>
//         </>,
//         document.body
//       )}
//     </div>
//   );
// }
// "use client";

// import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
// import { createPortal } from "react-dom";
// import { useSearchParams } from "next/navigation";

// import CandidateListSkeleton from "./subComponents/candidates_Skeleton";
// import CandidateDetails      from "./subComponents/Candidate_Details";
// import CandidateCard         from "./subComponents/Candidatecard";

// import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
// import {
//   getJobs,
//   getCandidates,
//   sendAssessmentReminder as sendAssessmentReminderThunk,
// } from "@/services/redux/thunk/candidateThunk";
// import { setSelectedJobId, clearMessage } from "@/services/redux/slice/candidateSlice";

// import type { Candidate, Job } from "@/services/interfaces/CandidateScreening";

// /* ── STATUS_MAP ── */
// export const STATUS_MAP: Record<string, { label: string; cls: string; priority: number; color: string }> = {
//   "Hired":                  { label: "Hired",               cls: "pill-hired",       priority: 9, color: "green"  },
//   "Interview Scheduled":    { label: "Interview Scheduled", cls: "pill-interview",   priority: 8, color: "blue"   },
//   "Shortlisted":            { label: "Shortlisted",         cls: "pill-shortlisted", priority: 7, color: "blue"   },
//   "Assessment Sent":        { label: "Assessment Pending",  cls: "pill-assessment",  priority: 6, color: "yellow" },
//   "Assessment In Progress": { label: "Assessment Pending",  cls: "pill-assessment",  priority: 5, color: "yellow" },
//   "Assessment Passed":      { label: "Assessment Done",     cls: "pill-assessed",    priority: 4, color: "green"  },
//   "Assessment Failed":      { label: "Assessment Done",     cls: "pill-assessed",    priority: 3, color: "green"  },
//   "Assessment Expired":     { label: "Assessment Pending",  cls: "pill-assessment",  priority: 2, color: "yellow" },
//   "Rejected":               { label: "Rejected",            cls: "pill-rejected",    priority: 1, color: "red"    },
//   "Under Review":           { label: "Applied",             cls: "pill-applied",     priority: 0, color: "gray"   },
// };

// export function getDisplayStatus(c: Candidate): string {
//   if (c?.final_status === "Hired")       return "Hired";
//   if (c?.interview_scheduled)            return "Interview Scheduled";
//   if (c?.exam_completed)                 return (c?.exam_percentage ?? 0) >= 70 ? "Assessment Passed" : "Assessment Failed";
//   if (c?.exam_started)                   return "Assessment In Progress";
//   if (c?.exam_link_sent)                 return c?.link_expired ? "Assessment Expired" : "Assessment Sent";
//   if (c?.status === "Shortlisted")       return "Shortlisted";
//   if (c?.status === "Rejected" || c?.final_status === "Rejected After Exam") return "Rejected";
//   return "Under Review";
// }

// export const getCandidateStatusInfo = (c: Candidate) =>
//   STATUS_MAP[getDisplayStatus(c)] ?? STATUS_MAP["Under Review"]!;
// export const getScoreColor = (s = 0) =>
//   s >= 80 ? "#059669" : s >= 70 ? "#d97706" : "#dc2626";

// const FILTER_CHIPS = [
//   { label: "All",                 value: "all"                },
//   { label: "Shortlisted",         value: "shortlisted"        },
//   { label: "Assessment Pending",  value: "assessment_pending" },
//   { label: "Assessment Done",     value: "assessment_done"    },
//   { label: "Interview Scheduled", value: "interview"          },
//   { label: "Hired",               value: "hired"              },
//   { label: "Rejected",            value: "rejected"           },
// ];

// /* ── GLOBAL CSS — exact match to HTML version ── */
// const GLOBAL_CSS = `
// @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap');
// :root{--serif:'DM Serif Display',Georgia,serif;--sans:'Inter',system-ui,sans-serif;}

// [data-cs-theme="dark"]{
//   --bg:#040d0a;--glass:rgba(255,255,255,0.04);--glass2:rgba(255,255,255,0.07);
//   --bd:rgba(0,214,143,0.12);--bd2:rgba(0,214,143,0.22);
//   --acc:#00d68f;--acc2:#059669;--acc3:#34d399;
//   --accs:rgba(0,214,143,0.10);--accg:rgba(0,214,143,0.25);
//   --tx:#e2faf1;--tx2:#a7c4b8;--tx3:#5a8a75;
//   --red:#f87171;--amber:#fbbf24;--blue:#60a5fa;--purple:#a78bfa;
//   --card-bg:rgba(255,255,255,0.04);--card-bd:rgba(0,214,143,0.12);
//   --sb-bg:rgba(4,13,10,0.97);--btn-text:#040d0a;
//   --rej-bg:rgba(248,113,113,0.05);--rej-bd:rgba(248,113,113,0.2);
//   --short-bg:rgba(0,214,143,0.05);--short-bd:rgba(0,214,143,0.2);
//   --tog-bg:rgba(0,214,143,0.12);--tog-bd:rgba(0,214,143,0.25);--tog-col:#00d68f;
//   --score-hi-bg:rgba(0,214,143,.1);--score-hi:#00d68f;
//   --score-mid-bg:rgba(251,191,36,.1);--score-mid:#fbbf24;
//   --score-lo-bg:rgba(248,113,113,.1);--score-lo:#f87171;
//   --skel-a:rgba(255,255,255,.05);--skel-b:rgba(255,255,255,.1);
//   --tl-done-bg:rgba(0,214,143,.1);--tl-done-bd:rgba(0,214,143,.25);--tl-done-col:#00d68f;
//   --tl-pend-bg:rgba(255,255,255,.05);--tl-pend-bd:rgba(255,255,255,.08);
// }
// [data-cs-theme="light"]{
//   --bg:#f0faf6;--glass:#ffffff;--glass2:#f4faf7;
//   --bd:#c5e8d8;--bd2:#9dd4bb;
//   --acc:#059669;--acc2:#047857;--acc3:#34d399;
//   --accs:rgba(5,150,105,0.08);--accg:rgba(5,150,105,0.2);
//   --tx:#0d2b1e;--tx2:#2d5a42;--tx3:#6b9e85;
//   --red:#dc2626;--amber:#d97706;--blue:#2563eb;--purple:#7c3aed;
//   --card-bg:#ffffff;--card-bd:#c5e8d8;
//   --sb-bg:#ffffff;--btn-text:#ffffff;
//   --rej-bg:rgba(220,38,38,0.04);--rej-bd:rgba(220,38,38,0.18);
//   --short-bg:rgba(5,150,105,0.05);--short-bd:rgba(5,150,105,0.2);
//   --tog-bg:rgba(5,150,105,0.1);--tog-bd:rgba(5,150,105,0.25);--tog-col:#059669;
//   --score-hi-bg:#ecfdf5;--score-hi:#059669;
//   --score-mid-bg:#fffbeb;--score-mid:#d97706;
//   --score-lo-bg:#fef2f2;--score-lo:#dc2626;
//   --skel-a:#e2e8f0;--skel-b:#cbd5e1;
//   --tl-done-bg:rgba(5,150,105,.08);--tl-done-bd:rgba(5,150,105,.25);--tl-done-col:#059669;
//   --tl-pend-bg:#f4faf7;--tl-pend-bd:#c5e8d8;
// }

// @keyframes fup{to{opacity:1;transform:translateY(0);}}
// @keyframes pdot{0%,100%{opacity:1;}50%{opacity:.4;}}
// @keyframes spin{to{transform:rotate(360deg);}}
// @keyframes cs-skel-shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}

// .shell{display:flex;height:calc(100vh - 56px);position:relative;background:var(--bg);color:var(--tx);font-family:var(--sans);overflow:hidden;transition:background .35s,color .35s;z-index:1;}
// [data-cs-theme="dark"] .shell::before{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(0,214,143,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,214,143,.025) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;z-index:0;}

// /* ── SIDEBAR ── */
// .sb{width:285px;flex-shrink:0;background:var(--sb-bg);border-right:1px solid var(--card-bd);display:flex;flex-direction:column;height:calc(100vh - 56px);overflow:hidden;backdrop-filter:blur(20px);transition:background .35s,border-color .35s;box-shadow:2px 0 20px rgba(0,0,0,.15);z-index:1;}
// .sb-hdr{padding:1rem 1rem .75rem;border-bottom:1px solid var(--card-bd);transition:border-color .35s;}
// .sb-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:.75rem;}
// .sb-title{font-family:var(--serif);font-size:1.05rem;color:var(--tx);transition:color .35s;}
// .sb-cnt{font-size:.65rem;font-weight:600;color:var(--tx3);background:var(--glass2);border:1px solid var(--card-bd);padding:.18rem .55rem;border-radius:999px;transition:all .35s;}
// .sb-search{display:flex;align-items:center;gap:6px;background:var(--glass2);border:1px solid var(--card-bd);border-radius:9px;padding:.4rem .78rem;margin-bottom:.55rem;transition:border-color .2s,background .35s;}
// .sb-search:focus-within{border-color:var(--acc);}
// .sb-search svg{width:14px;height:14px;stroke:var(--tx3);fill:none;stroke-width:2;flex-shrink:0;}
// .sb-search input{background:none;border:none;outline:none;font-family:var(--sans);font-size:.72rem;color:var(--tx);width:100%;}
// .sb-search input::placeholder{color:var(--tx3);}
// .sb-job-wrap{margin-bottom:.55rem;position:relative;}
// .sb-job-sel{width:100%;background:var(--glass2);border:1px solid var(--card-bd);color:var(--tx2);font-family:var(--sans);font-size:.72rem;padding:.36rem 2rem .36rem .72rem;border-radius:8px;outline:none;cursor:pointer;appearance:none;-webkit-appearance:none;transition:all .2s;}
// .sb-job-sel:focus{border-color:var(--acc);}
// .sb-job-arrow{position:absolute;right:.58rem;top:50%;transform:translateY(-50%);pointer-events:none;font-size:.58rem;color:var(--tx3);}
// .sb-filter{display:flex;gap:4px;overflow-x:auto;padding-bottom:.5rem;scrollbar-width:none;}
// .sb-filter::-webkit-scrollbar{display:none;}
// .ftab{flex-shrink:0;font-size:.61rem;font-weight:600;padding:.2rem .58rem;border-radius:999px;cursor:pointer;border:1px solid var(--card-bd);background:transparent;color:var(--tx3);font-family:var(--sans);transition:all .13s;white-space:nowrap;}
// .ftab:hover{border-color:var(--acc);color:var(--acc);}
// .ftab.on{background:var(--acc);color:var(--btn-text);border-color:var(--acc);}
// .sb-sort{padding:.45rem 1rem;border-bottom:1px solid var(--card-bd);display:flex;align-items:center;justify-content:space-between;transition:border-color .35s;}
// .sb-sort-wrap{position:relative;}
// .sort-lbl{font-size:.62rem;color:var(--tx3);transition:color .35s;}
// .sort-sel{background:var(--glass2);border:1px solid var(--card-bd);color:var(--tx2);font-family:var(--sans);font-size:.62rem;padding:.28rem 1.8rem .28rem .6rem;border-radius:7px;outline:none;cursor:pointer;appearance:none;-webkit-appearance:none;transition:all .2s;}
// .sort-sel:focus{border-color:var(--acc);}
// .sort-arrow{position:absolute;right:.5rem;top:50%;transform:translateY(-50%);pointer-events:none;font-size:.55rem;color:var(--tx3);}
// .cand-list{flex:1;overflow-y:auto;padding:.35rem .45rem;}
// .cand-list::-webkit-scrollbar{width:3px;}
// .cand-list::-webkit-scrollbar-thumb{background:var(--bd2);border-radius:3px;}
// .sb-notif{padding:.52rem .85rem;border-radius:8px;font-size:.71rem;font-weight:500;margin:6px 10px 0;}
// .sb-notif.info{background:var(--accs);color:var(--acc);border:1px solid var(--bd);}
// .sb-notif.warn{background:var(--rej-bg);color:var(--red);border:1px solid var(--rej-bd);}
// .sb-empty{display:flex;flex-direction:column;align-items:center;gap:8px;padding:2rem;color:var(--tx3);text-align:center;}
// .sb-empty svg{width:28px;height:28px;stroke:var(--tx3);fill:none;stroke-width:2;opacity:.4;}
// .sb-empty-title{font-size:.8rem;font-weight:600;color:var(--tx2);}
// .sb-empty-sub{font-size:.69rem;}
// .sb-theme{padding:.8rem 1rem;border-top:1px solid var(--card-bd);display:flex;align-items:center;gap:9px;cursor:pointer;transition:background .2s,border-color .35s;flex-shrink:0;}
// .sb-theme:hover{background:var(--glass2);}
// .tog-icon{font-size:.95rem;flex-shrink:0;}
// .tog-label-txt{flex:1;font-size:.75rem;font-weight:600;color:var(--tx2);transition:color .35s;}
// .tog-track{width:38px;height:20px;border-radius:999px;background:var(--tog-bg);border:1px solid var(--tog-bd);position:relative;flex-shrink:0;transition:all .35s;}
// .tog-thumb{position:absolute;top:3px;left:3px;width:12px;height:12px;border-radius:50%;background:var(--tog-col);transition:transform .28s cubic-bezier(.4,0,.2,1),background .35s;box-shadow:0 0 6px var(--accg);}
// [data-cs-theme="light"] .tog-thumb{transform:translateX(18px);}

// /* ── MAIN ── */
// .main{flex:1;overflow-y:auto;min-width:0;width:0;display:flex;flex-direction:column;transition:background .35s;}
// .main::-webkit-scrollbar{width:4px;}
// .main::-webkit-scrollbar-thumb{background:var(--bd2);border-radius:4px;}
// .page-topbar{display:flex;align-items:center;justify-content:space-between;padding:1.4rem 2.2rem 0;opacity:0;transform:translateY(10px);animation:fup .4s ease .02s forwards;}
// .page-title{font-family:var(--serif);font-size:1.55rem;color:var(--tx);transition:color .35s;}
// .page-sub{font-size:.72rem;color:var(--tx3);margin-top:.15rem;transition:color .35s;}
// .page-btns{display:flex;align-items:center;gap:.6rem;}
// .btn-export{background:var(--glass2);color:var(--tx2);font-family:var(--sans);font-size:.76rem;font-weight:600;padding:.44rem .9rem;border-radius:8px;border:1px solid var(--card-bd);cursor:pointer;display:flex;align-items:center;gap:6px;transition:all .2s;}
// .btn-export:hover{border-color:var(--acc);color:var(--acc);}
// .btn-add{background:var(--acc);color:var(--btn-text);font-family:var(--sans);font-size:.76rem;font-weight:700;padding:.44rem .9rem;border-radius:8px;border:none;cursor:pointer;display:flex;align-items:center;gap:6px;box-shadow:0 0 14px var(--accg);transition:all .2s;}
// .btn-add:hover{background:var(--acc3);box-shadow:0 0 22px var(--accg);transform:translateY(-1px);}
// .btn-refresh{width:34px;height:34px;border-radius:8px;background:var(--glass2);border:1px solid var(--card-bd);display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--tx3);transition:all .2s;font-size:.85rem;}
// .btn-refresh:hover{border-color:var(--acc);color:var(--acc);}
// .detail{padding:1.8rem 2.5rem;width:100%;box-sizing:border-box;}
// .main-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;gap:.75rem;color:var(--tx3);text-align:center;padding:3rem;}
// .main-empty svg{width:52px;height:52px;stroke:var(--tx3);fill:none;stroke-width:1.5;opacity:.3;}
// .main-empty-title{font-size:.92rem;font-weight:600;color:var(--tx2);}
// .main-empty-sub{font-size:.73rem;line-height:1.55;max-width:220px;}

// /* ── Status pills ── */
// .cs-pill{display:inline-flex;align-items:center;gap:3px;font-size:.59rem;font-weight:600;padding:.13rem .48rem;border-radius:999px;white-space:nowrap;}
// .pill-shortlisted{background:rgba(59,130,246,.12);color:#60a5fa;}
// .pill-assessment{background:rgba(251,191,36,.1);color:#fbbf24;}
// .pill-assessed{background:rgba(45,212,191,.1);color:#2dd4bf;}
// .pill-interview{background:rgba(167,139,250,.1);color:#a78bfa;}
// .pill-hired{background:rgba(0,214,143,.1);color:#00d68f;}
// .pill-rejected{background:rgba(248,113,113,.1);color:#f87171;}
// .pill-applied{background:rgba(255,255,255,.06);color:#5a8a75;}
// [data-cs-theme="light"] .pill-shortlisted{background:#eff6ff;color:#2563eb;}
// [data-cs-theme="light"] .pill-assessment{background:#fffbeb;color:#d97706;}
// [data-cs-theme="light"] .pill-assessed{background:#f0fdfa;color:#0d9488;}
// [data-cs-theme="light"] .pill-interview{background:#f5f3ff;color:#7c3aed;}
// [data-cs-theme="light"] .pill-hired{background:#f0fdf4;color:#16a34a;}
// [data-cs-theme="light"] .pill-rejected{background:#fef2f2;color:#dc2626;}
// [data-cs-theme="light"] .pill-applied{background:#f1f5f9;color:#64748b;}

// /* ── Skeleton ── */
// .cs-skel{background:linear-gradient(90deg,var(--skel-a) 25%,var(--skel-b) 50%,var(--skel-a) 75%);background-size:400px 100%;animation:cs-skel-shimmer 1.3s infinite linear;border-radius:6px;}
// .cs-skel-item{display:flex;align-items:flex-start;gap:10px;padding:.62rem .68rem;border-radius:10px;background:var(--glass);border:1px solid var(--card-bd);margin-bottom:2px;}

// /* ── CandidateCard ── */
// .cs-cc{display:flex;align-items:flex-start;gap:10px;padding:.62rem .68rem;border-radius:10px;cursor:pointer;transition:background .12s;border:1px solid transparent;margin-bottom:2px;}
// .cs-cc:hover{background:var(--glass2);}
// .cs-cc.cs-cc--on{background:var(--accs);border-color:var(--bd2);}
// .cs-cc__av{width:38px;height:38px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.62rem;font-weight:700;}
// .cs-cc__body{flex:1;min-width:0;}
// .cs-cc__nm{font-size:.77rem;font-weight:600;color:var(--tx);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:color .35s;}
// .cs-cc__email{font-size:.61rem;color:var(--tx3);margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
// .cs-cc__role{font-size:.59rem;color:var(--tx3);margin-top:2px;}
// .cs-cc__meta{display:flex;align-items:center;gap:5px;margin-top:4px;}
// .cs-cc__right{flex-shrink:0;display:flex;flex-direction:column;align-items:flex-end;gap:3px;}
// .cs-cc__score{font-size:.77rem;font-weight:700;padding:.18rem .52rem;border-radius:6px;min-width:34px;text-align:center;}
// .cs-cc__score--hi{background:var(--score-hi-bg);color:var(--score-hi);}
// .cs-cc__score--mid{background:var(--score-mid-bg);color:var(--score-mid);}
// .cs-cc__score--lo{background:var(--score-lo-bg);color:var(--score-lo);}
// .cs-cc__denom{font-size:.58rem;color:var(--tx3);}


// /* ── DRAGGABLE FAB ── */
// .fab{position:fixed;width:46px;height:46px;border-radius:13px;background:var(--fab-bg,#1a2535);border:1px solid rgba(255,255,255,.12);box-shadow:0 6px 24px rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;cursor:grab;z-index:9999;user-select:none;touch-action:none;transition:box-shadow .2s,border-color .2s,background .25s;}
// .fab:active{cursor:grabbing;}
// .fab:hover{border-color:rgba(0,214,143,.4);box-shadow:0 6px 28px rgba(0,0,0,.6),0 0 0 1px rgba(0,214,143,.2);}
// .fab.open{background:var(--fab-open,#00d68f);border-color:var(--fab-open,#00d68f);box-shadow:0 6px 28px var(--accg);}
// .fab svg{pointer-events:none;transition:transform .3s ease;}
// .fab.open svg{transform:rotate(180deg);}
// .fab-tip{position:fixed;background:#0f1f16;border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:.3rem .65rem;font-size:.68rem;font-weight:500;color:rgba(255,255,255,.65);white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .18s;box-shadow:0 4px 14px rgba(0,0,0,.4);z-index:9998;}
// .fab-bd{position:fixed;inset:0;z-index:9996;}
// /* ── NAV PANEL ── */
// .nav-panel{position:fixed;width:262px;background:#0a1810;border:1px solid rgba(0,214,143,.15);border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.65),0 0 0 1px rgba(0,214,143,.04);z-index:9997;overflow:hidden;opacity:0;pointer-events:none;transform:scale(.93);transition:all .26s cubic-bezier(.4,0,.2,1);font-family:var(--sans);}
// .nav-panel.show{opacity:1;pointer-events:all;transform:scale(1);}
// .np-hdr{padding:.85rem 1rem .7rem;border-bottom:1px solid rgba(0,214,143,.08);display:flex;align-items:center;justify-content:space-between;}
// .np-title{font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(0,214,143,.3);}
// .np-x{width:21px;height:21px;border-radius:6px;background:rgba(255,255,255,.05);border:none;color:rgba(255,255,255,.35);font-size:.7rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;font-family:var(--sans);}
// .np-x:hover{background:rgba(255,255,255,.1);color:#fff;}
// .np-curr{margin:.6rem .8rem .35rem;background:rgba(0,214,143,.08);border:1px solid rgba(0,214,143,.18);border-radius:8px;padding:.48rem .72rem;display:flex;align-items:center;justify-content:space-between;}
// .np-cdot{width:7px;height:7px;border-radius:50%;background:#00d68f;animation:pdot 1.5s infinite;flex-shrink:0;}
// .np-clbl{font-size:.6rem;color:rgba(255,255,255,.38);margin-bottom:.08rem;}
// .np-cnm{font-size:.77rem;font-weight:600;color:#00d68f;}
// .np-sec{font-size:.57rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(0,214,143,.22);padding:.6rem .85rem .22rem;}
// .np-item{display:flex;align-items:center;gap:9px;padding:.52rem .85rem;margin:1px .45rem;border-radius:9px;cursor:pointer;transition:all .13s;text-decoration:none;position:relative;}
// .np-item:hover{background:rgba(255,255,255,.06);}
// .np-item.nact{background:rgba(0,214,143,.1);}
// .np-item.nact::before{content:'';position:absolute;left:-1px;top:50%;transform:translateY(-50%);width:3px;height:62%;border-radius:0 2px 2px 0;background:#00d68f;box-shadow:0 0 7px #00d68f;}
// .np-ic{width:29px;height:29px;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.88rem;}
// .np-item.nact .np-ic{background:rgba(0,214,143,.12);}
// .np-item:hover .np-ic{background:rgba(255,255,255,.06);}
// .np-nm{font-size:.77rem;font-weight:500;color:rgba(255,255,255,.65);}
// .np-item.nact .np-nm{color:#e2faf1;font-weight:600;}
// .np-sub{font-size:.62rem;color:rgba(255,255,255,.24);}
// .np-bdg{margin-left:auto;flex-shrink:0;background:#00d68f;color:#040d0a;font-size:.56rem;font-weight:700;padding:.08rem .4rem;border-radius:999px;}
// .np-ai{margin-left:auto;flex-shrink:0;font-size:.52rem;font-weight:700;background:rgba(0,214,143,.1);color:#00d68f;border:1px solid rgba(0,214,143,.2);padding:.08rem .36rem;border-radius:999px;}
// .np-div{height:1px;background:rgba(0,214,143,.08);margin:.38rem .8rem;}
// .np-tog-row{margin:.45rem .8rem .8rem;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:.55rem .72rem;display:flex;align-items:center;justify-content:space-between;cursor:pointer;transition:background .2s;}
// .np-tog-row:hover{background:rgba(255,255,255,.07);}
// .np-tog-lbl{font-size:.7rem;color:rgba(255,255,255,.45);display:flex;align-items:center;gap:6px;}
// .np-tog-switch{display:flex;align-items:center;gap:5px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:999px;padding:.18rem .18rem .18rem .55rem;}
// .np-inner-lbl{font-size:.58rem;font-weight:700;color:rgba(255,255,255,.4);min-width:26px;transition:color .2s;}
// .np-trk{width:26px;height:14px;border-radius:999px;background:rgba(0,214,143,.2);position:relative;}
// .np-thumb{position:absolute;top:2px;left:2px;width:10px;height:10px;border-radius:50%;background:#00d68f;transition:all .25s cubic-bezier(.4,0,.2,1);box-shadow:0 0 5px rgba(0,214,143,.5);}
// .np-tog-row.light .np-thumb{transform:translateX(12px);}
// .np-tog-row.light .np-inner-lbl{color:rgba(255,255,255,.65);}
// @keyframes npii{from{opacity:0;transform:translateX(-8px);}to{opacity:1;transform:translateX(0);}}
// .nav-panel.show .np-item{animation:npii .22s ease both;}
// .nav-panel.show .np-item:nth-child(1){animation-delay:.03s;}
// .nav-panel.show .np-item:nth-child(2){animation-delay:.06s;}
// .nav-panel.show .np-item:nth-child(3){animation-delay:.09s;}
// .nav-panel.show .np-item:nth-child(4){animation-delay:.12s;}
// .nav-panel.show .np-item:nth-child(5){animation-delay:.15s;}
// .nav-panel.show .np-item:nth-child(6){animation-delay:.18s;}
// .nav-panel.show .np-item:nth-child(7){animation-delay:.21s;}
// @media(max-width:900px){.sb{width:240px;}}
// @media(max-width:660px){.shell{flex-direction:column;}.sb{width:100%;height:auto;max-height:280px;}.main{flex:1;overflow-y:auto;}.detail{padding:1rem;}.page-topbar{padding:1rem 1rem 0;}}
// `;

// /* ─────────────────────────────────────────────────────────────────────────────
//    COMPONENT
// ───────────────────────────────────────────────────────────────────────────── */
// export default function CandidateScreeningInterface() {
//   const dispatch     = useAppDispatch();
//   const params       = useSearchParams();
//   const jobIdFromUrl = params.get("job_id");

//   const { jobs, candidates, candidatesLoading, error, selectedJobId, message } =
//     useAppSelector((s) => s.candidate);

//   const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
//   const [searchTerm,   setSearchTerm]   = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [sortBy,       setSortBy]       = useState("score_desc");
//   const [theme,        setTheme]        = useState<"dark" | "light">("dark");

//   useEffect(() => {
//     const saved = localStorage.getItem("tf-theme");
//     if (saved === "light") setTheme("light");
//   }, []);

//   const toggleTheme = useCallback(() => {
//     setTheme((t) => {
//       const next = t === "dark" ? "light" : "dark";
//       localStorage.setItem("tf-theme", next);
//       return next;
//     });
//   }, []);

//   useEffect(() => { dispatch(getJobs()); }, [dispatch]);
//   useEffect(() => {
//     if (jobIdFromUrl && jobs.length) {
//       const found = jobs.find((j) => String(j.id) === String(jobIdFromUrl));
//       if (found) dispatch(setSelectedJobId(found.id));
//     }
//   }, [jobIdFromUrl, jobs, dispatch]);
//   useEffect(() => { dispatch(getCandidates(selectedJobId ?? undefined)); }, [dispatch, selectedJobId]);
//   useEffect(() => {
//     if (candidates.length && !selectedCandidate) setSelectedCandidate(candidates[0]);
//   }, [candidates, selectedCandidate]);

//   const selectedJob = useMemo(
//     () => selectedJobId ? jobs.find((j) => String(j.id) === String(selectedJobId)) ?? null : null,
//     [jobs, selectedJobId],
//   );

//   const processedCandidates = useMemo(
//     () => candidates.map((c) => ({
//       ...c,
//       dept:          (c as any).department || null, 
//       displayStatus: getDisplayStatus(c),
//       displayScore:  c?.ats_score || 0,
//       scoreColor:    getScoreColor(c?.ats_score || 0),
//       statusInfo:    getCandidateStatusInfo(c),
//     })),
//     [candidates],
//   );

//   const filteredCandidates = useMemo(() => {
//     let list = processedCandidates;
//     if (searchTerm) {
//       const q = searchTerm.toLowerCase();
//       list = list.filter((c) =>
//         c.name?.toLowerCase().includes(q) ||
//         c.email?.toLowerCase().includes(q) ||
//         c.job_title?.toLowerCase().includes(q),
//       );
//     }
//     if (filterStatus !== "all") {
//       list = list.filter((c) => {
//         const ds = c.displayStatus;
//         switch (filterStatus) {
//           case "shortlisted":        return ds === "Shortlisted";
//           case "assessment_pending": return ["Assessment Sent","Assessment In Progress","Assessment Expired"].includes(ds);
//           case "assessment_done":    return ["Assessment Passed","Assessment Failed"].includes(ds);
//           case "interview":          return ds === "Interview Scheduled";
//           case "hired":              return ds === "Hired";
//           case "rejected":           return ds === "Rejected";
//           default:                   return true;
//         }
//       });
//     }
//     return [...list].sort((a, b) => {
//       switch (sortBy) {
//         case "score_desc": return (b.ats_score ?? 0) - (a.ats_score ?? 0);
//         case "score_asc":  return (a.ats_score ?? 0) - (b.ats_score ?? 0);
//         case "date_desc":  return +new Date(b.processed_date ?? 0) - +new Date(a.processed_date ?? 0);
//         case "date_asc":   return +new Date(a.processed_date ?? 0) - +new Date(b.processed_date ?? 0);
//         case "name_asc":   return (a.name ?? "").localeCompare(b.name ?? "");
//         case "status":     return (b.statusInfo?.priority ?? 0) - (a.statusInfo?.priority ?? 0);
//         default:           return 0;
//       }
//     });
//   }, [processedCandidates, searchTerm, filterStatus, sortBy]);

//   const refreshData = useCallback(async () => {
//     await dispatch(getJobs()).unwrap();
//     await dispatch(getCandidates(selectedJobId ?? undefined)).unwrap();
//   }, [dispatch, selectedJobId]);

//   const sendAssessmentReminder = useCallback(async (id: string | number) => {
//     await dispatch(sendAssessmentReminderThunk(id)).unwrap();
//     setTimeout(() => dispatch(clearMessage()), 3000);
//     dispatch(getCandidates(selectedJobId ?? undefined));
//   }, [dispatch, selectedJobId]);


//   /* ── FAB + Nav Panel state ── */
//   const [fabOpen,   setFabOpen]   = useState(false);
//   const [fabPos,    setFabPos]    = useState({ left: 0, top: 0 });
//   const [panelPos,  setPanelPos]  = useState({ left: 0, top: 0 });
//   const [showTip,   setShowTip]   = useState(false);
//   const [mounted,   setMounted]   = useState(false);
//   const fabRef     = useRef<HTMLDivElement>(null);
//   const dragging   = useRef(false);
//   const startXY    = useRef({ x: 0, y: 0, ox: 0, oy: 0 });

//   useEffect(() => {
//     setMounted(true);
//     setFabPos({ left: window.innerWidth - 64, top: window.innerHeight / 2 - 23 });
//   }, []);

//   const calcPanelPos = useCallback((fabL: number, fabT: number) => {
//     let px = fabL + 56, py = fabT;
//     if (px + 270 > window.innerWidth)  px = fabL - 274;
//     if (py + 470 > window.innerHeight) py = window.innerHeight - 478;
//     if (py < 8) py = 8;
//     if (px < 8) px = 8;
//     return { left: px, top: py };
//   }, []);

//   const openNav = useCallback(() => {
//     setFabOpen(true);
//     setPanelPos(calcPanelPos(fabPos.left, fabPos.top));
//   }, [fabPos, calcPanelPos]);

//   const closeNav = useCallback(() => setFabOpen(false), []);

//   const onFabMouseDown = useCallback((e: React.MouseEvent) => {
//     dragging.current = false;
//     startXY.current = { x: e.clientX, y: e.clientY, ox: fabPos.left, oy: fabPos.top };
//     const move = (ev: MouseEvent) => {
//       const dx = ev.clientX - startXY.current.x;
//       const dy = ev.clientY - startXY.current.y;
//       if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragging.current = true;
//       if (dragging.current) {
//         const nx = Math.max(0, Math.min(window.innerWidth  - 50, startXY.current.ox + dx));
//         const ny = Math.max(0, Math.min(window.innerHeight - 50, startXY.current.oy + dy));
//         setFabPos({ left: nx, top: ny });
//         if (fabOpen) setPanelPos(calcPanelPos(nx, ny));
//       }
//     };
//     const up = () => {
//       if (!dragging.current) fabOpen ? closeNav() : openNav();
//       document.removeEventListener("mousemove", move);
//       document.removeEventListener("mouseup",   up);
//     };
//     document.addEventListener("mousemove", move);
//     document.addEventListener("mouseup",   up);
//     e.preventDefault();
//   }, [fabPos, fabOpen, openNav, closeNav, calcPanelPos]);

//   const isLoading = candidatesLoading === "pending";

//   return (
//     <div className="shell" data-cs-theme={theme}>
//       <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

//       {/* ══ SIDEBAR ══ */}
//       <div className="sb">
//         <div className="sb-hdr">
//           <div className="sb-top">
//             <span className="sb-title">Candidates</span>
//             <span className="sb-cnt">{filteredCandidates.length} of {candidates.length}</span>
//           </div>

//           <div className="sb-search">
//             <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
//             <input
//               type="text"
//               placeholder="Search by name, email, or job title…"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {jobs.length > 0 && (
//             <div className="sb-job-wrap">
//               <select
//                 className="sb-job-sel"
//                 value={selectedJobId ?? ""}
//                 onChange={(e) => {
//                   const job = jobs.find((j) => String(j.id) === e.target.value);
//                   dispatch(setSelectedJobId(job?.id ?? null));
//                 }}
//               >
//                 <option value="">All Jobs</option>
//                 {jobs.map((j) => (
//                   <option key={j.id} value={j.id}>{j.title} ({j.location})</option>
//                 ))}
//               </select>
//               <span className="sb-job-arrow">▾</span>
//             </div>
//           )}

//           <div className="sb-filter">
//             {FILTER_CHIPS.map((chip) => (
//               <button
//                 key={chip.value}
//                 className={`ftab${filterStatus === chip.value ? " on" : ""}`}
//                 onClick={() => setFilterStatus(chip.value)}
//               >
//                 {chip.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="sb-sort">
//           <span className="sort-lbl">Sort by</span>
//           <div className="sb-sort-wrap">
//             <select className="sort-sel" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//               <option value="score_desc">Score (High to Low)</option>
//               <option value="score_asc">Score (Low to High)</option>
//               <option value="date_desc">Date (Newest First)</option>
//               <option value="date_asc">Date (Oldest First)</option>
//               <option value="name_asc">Name (A–Z)</option>
//               <option value="status">Status Priority</option>
//             </select>
//             <span className="sort-arrow">▾</span>
//           </div>
//         </div>

//         {message && <div className="sb-notif info">{message}</div>}
//         {error   && <div className="sb-notif warn">{error}</div>}

//         <div className="cand-list">
//           {isLoading ? (
//             <CandidateListSkeleton />
//           ) : filteredCandidates.length === 0 ? (
//             <div className="sb-empty">
//               <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
//               <div className="sb-empty-title">No candidates found</div>
//               <div className="sb-empty-sub">Try adjusting filters or search.</div>
//             </div>
//           ) : (
//             filteredCandidates.map((c) => (
//               <CandidateCard
//                 key={c.id}
//                 candidate={c as any}
//                 isSelected={selectedCandidate?.id === c.id}
//                 onClick={() => {
//                   const { displayStatus, displayScore, scoreColor, statusInfo, ...base } = c;
//                   setSelectedCandidate(base as Candidate);
//                 }}
//               />
//             ))
//           )}
//         </div>

//         <div className="sb-theme" onClick={toggleTheme}>
//           <span className="tog-icon">{theme === "dark" ? "🌙" : "☀️"}</span>
//           <span className="tog-label-txt">{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
//           <div className="tog-track"><div className="tog-thumb" /></div>
//         </div>
//       </div>

//       {/* ══ MAIN ══ */}
//       <div className="main">
//         <div className="page-topbar">
//           <div>
//             <div className="page-title">Candidate Screening</div>
//             {selectedJob && (
//               <div className="page-sub">
//                 {selectedJob.title} · {selectedJob.location} · {filteredCandidates.length} candidates
//               </div>
//             )}
//           </div>
//           <div className="page-btns">
//             <button className="btn-export">📤 Export CSV</button>
//             <button className="btn-add">+ Add Candidate</button>
//             <button className="btn-refresh" onClick={refreshData} title="Refresh">↻</button>
//           </div>
//         </div>

//         <div className="detail">
//           {selectedCandidate ? (
//             <CandidateDetails
//               candidate={{
//                 ...selectedCandidate,
//                 displayStatus: getDisplayStatus(selectedCandidate),
//                 displayScore:  selectedCandidate.ats_score ?? 0,
//                 scoreColor:    getScoreColor(selectedCandidate.ats_score ?? 0),
//               } as any}
//               onSendReminder={sendAssessmentReminder}
//             />
//           ) : (
//             <div className="main-empty">
//               <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
//               <div className="main-empty-title">Select a candidate</div>
//               <div className="main-empty-sub">Choose a candidate from the list to view their full profile, scores, and recruitment timeline.</div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ══ DRAGGABLE FAB + NAV PANEL (portal) ══ */}
//       {mounted && createPortal(
//         <>
//           {/* Backdrop */}
//           {fabOpen && (
//             <div className="fab-bd" onClick={closeNav} />
//           )}

//           {/* FAB */}
//           <div
//             ref={fabRef}
//             className={`fab${fabOpen ? " open" : ""}`}
//             style={{ left: fabPos.left, top: fabPos.top }}
//             onMouseDown={onFabMouseDown}
//             onMouseEnter={() => { if (!fabOpen) setShowTip(true); }}
//             onMouseLeave={() => setShowTip(false)}
//           >
//             <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <polygon points="12 2 2 7 12 12 22 7 12 2"/>
//               <polyline points="2 17 12 22 22 17"/>
//               <polyline points="2 12 12 17 22 12"/>
//             </svg>
//           </div>

//           {/* Tooltip */}
//           {showTip && !fabOpen && (
//             <div className="fab-tip" style={{ left: fabPos.left + 54, top: fabPos.top + 12, opacity: 1 }}>
//               Pages
//             </div>
//           )}

//           {/* Nav Panel */}
//           <div className={`nav-panel${fabOpen ? " show" : ""}`} style={{ left: panelPos.left, top: panelPos.top }}>
//             <div className="np-hdr">
//               <span className="np-title">Navigation</span>
//               <button className="np-x" onClick={closeNav}>✕</button>
//             </div>
//             <div className="np-curr">
//               <div>
//                 <div className="np-clbl">Current page</div>
//                 <div className="np-cnm">Candidate Screening</div>
//               </div>
//               <div className="np-cdot" />
//             </div>
//             <div className="np-sec">Recruitment</div>
//             <a className="np-item" href="/dashboard"><div className="np-ic">📊</div><div><div className="np-nm">Dashboard</div><div className="np-sub">Recruitment overview</div></div></a>
//             <a className="np-item nact" href="/candidates"><div className="np-ic">👥</div><div><div className="np-nm">Candidates</div><div className="np-sub">Manage applicants</div></div></a>
//             <a className="np-item" href="/scheduler"><div className="np-ic">🗓️</div><div><div className="np-nm">Scheduling</div><div className="np-sub">Interview calendar</div></div></a>
//             <div className="np-div" />
//             <div className="np-sec">Screening</div>
//             <a className="np-item" href="/assessments"><div className="np-ic">📋</div><div><div className="np-nm">Assessments</div><div className="np-sub">Tests &amp; evaluations</div></div></a>
//             <a className="np-item" href="/interview-results"><div className="np-ic">🎯</div><div><div className="np-nm">Interview Results</div><div className="np-sub">Review outcomes</div></div><span className="np-bdg">5</span></a>
//             <div className="np-div" />
//             <div className="np-sec">Tools</div>
//             <a className="np-item" href="#"><div className="np-ic">🤖</div><div><div className="np-nm">ATS Checking</div><div className="np-sub">AI-powered screening</div></div><span className="np-ai">AI</span></a>
//             <a className="np-item" href="#"><div className="np-ic">📈</div><div><div className="np-nm">Reports</div><div className="np-sub">Analytics &amp; insights</div></div></a>
//             <div className="np-div" />
//             <div className={`np-tog-row${theme === "light" ? " light" : ""}`} onClick={toggleTheme}>
//               <span className="np-tog-lbl">{theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}</span>
//               <div className="np-tog-switch">
//                 <span className="np-inner-lbl">{theme === "dark" ? "Dark" : "Light"}</span>
//                 <div className="np-trk"><div className="np-thumb" /></div>
//               </div>
//             </div>
//           </div>
//         </>,
//         document.body
//       )}
//     </div>
//   );
// }

"use client";

import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "next/navigation";

import CandidateListSkeleton from "./subComponents/candidates_Skeleton";
import CandidateDetails      from "./subComponents/Candidate_Details";
import CandidateCard         from "./subComponents/Candidatecard";

import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import {
  getJobs,
  getCandidates,
  sendAssessmentReminder as sendAssessmentReminderThunk,
} from "@/services/redux/thunk/candidateThunk";
import { setSelectedJobId, clearMessage } from "@/services/redux/slice/candidateSlice";

import type { Candidate, Job } from "@/services/interfaces/CandidateScreening";

/* ── STATUS_MAP ── */
export const STATUS_MAP: Record<string, { label: string; cls: string; priority: number; color: string }> = {
  "Hired":                  { label: "Hired",               cls: "pill-hired",       priority: 9, color: "green"  },
  "Interview Scheduled":    { label: "Interview Scheduled", cls: "pill-interview",   priority: 8, color: "blue"   },
  "Shortlisted":            { label: "Shortlisted",         cls: "pill-shortlisted", priority: 7, color: "blue"   },
  "Assessment Sent":        { label: "Assessment Pending",  cls: "pill-assessment",  priority: 6, color: "yellow" },
  "Assessment In Progress": { label: "Assessment Pending",  cls: "pill-assessment",  priority: 5, color: "yellow" },
  "Assessment Passed":      { label: "Assessment Done",     cls: "pill-assessed",    priority: 4, color: "green"  },
  "Assessment Failed":      { label: "Assessment Done",     cls: "pill-assessed",    priority: 3, color: "green"  },
  "Assessment Expired":     { label: "Assessment Pending",  cls: "pill-assessment",  priority: 2, color: "yellow" },
  "Rejected":               { label: "Rejected",            cls: "pill-rejected",    priority: 1, color: "red"    },
  "Under Review":           { label: "Applied",             cls: "pill-applied",     priority: 0, color: "gray"   },
};

export function getDisplayStatus(c: Candidate): string {
  if (c?.final_status === "Hired")       return "Hired";
  if (c?.interview_scheduled)            return "Interview Scheduled";
  if (c?.exam_completed)                 return (c?.exam_percentage ?? 0) >= 70 ? "Assessment Passed" : "Assessment Failed";
  if (c?.exam_started)                   return "Assessment In Progress";
  if (c?.exam_link_sent)                 return c?.link_expired ? "Assessment Expired" : "Assessment Sent";
  if (c?.status === "Shortlisted")       return "Shortlisted";
  if (c?.status === "Rejected" || c?.final_status === "Rejected After Exam") return "Rejected";
  return "Under Review";
}

export const getCandidateStatusInfo = (c: Candidate) =>
  STATUS_MAP[getDisplayStatus(c)] ?? STATUS_MAP["Under Review"]!;
export const getScoreColor = (s = 0) =>
  s >= 80 ? "#059669" : s >= 70 ? "#d97706" : "#dc2626";

/* ── FILTER CHIPS — Red Flags + Top 10 added ── */
const FILTER_CHIPS = [
  { label: "All",                 value: "all"                },
  { label: "Shortlisted",         value: "shortlisted"        },
  { label: "Assessment Pending",  value: "assessment_pending" },
  { label: "Assessment Done",     value: "assessment_done"    },
  { label: "Interview Scheduled", value: "interview"          },
  { label: "Hired",               value: "hired"              },
  { label: "Rejected",            value: "rejected"           },
  { label: "🚩 Red Flags",        value: "red_flags"          },
  { label: "⭐ Top 10",           value: "top_10"             },
];

/* ── GLOBAL CSS ── */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap');
:root{--serif:'DM Serif Display',Georgia,serif;--sans:'Inter',system-ui,sans-serif;}

[data-cs-theme="dark"]{
  --bg:#040d0a;--glass:rgba(255,255,255,0.04);--glass2:rgba(255,255,255,0.07);
  --bd:rgba(0,214,143,0.12);--bd2:rgba(0,214,143,0.22);
  --acc:#00d68f;--acc2:#059669;--acc3:#34d399;
  --accs:rgba(0,214,143,0.10);--accg:rgba(0,214,143,0.25);
  --tx:#e2faf1;--tx2:#a7c4b8;--tx3:#5a8a75;
  --red:#f87171;--amber:#fbbf24;--blue:#60a5fa;--purple:#a78bfa;
  --card-bg:rgba(255,255,255,0.04);--card-bd:rgba(0,214,143,0.12);
  --sb-bg:rgba(4,13,10,0.97);--btn-text:#040d0a;
  --rej-bg:rgba(248,113,113,0.05);--rej-bd:rgba(248,113,113,0.2);
  --short-bg:rgba(0,214,143,0.05);--short-bd:rgba(0,214,143,0.2);
  --tog-bg:rgba(0,214,143,0.12);--tog-bd:rgba(0,214,143,0.25);--tog-col:#00d68f;
  --score-hi-bg:rgba(0,214,143,.1);--score-hi:#00d68f;
  --score-mid-bg:rgba(251,191,36,.1);--score-mid:#fbbf24;
  --score-lo-bg:rgba(248,113,113,.1);--score-lo:#f87171;
  --skel-a:rgba(255,255,255,.05);--skel-b:rgba(255,255,255,.1);
  --tl-done-bg:rgba(0,214,143,.1);--tl-done-bd:rgba(0,214,143,.25);--tl-done-col:#00d68f;
  --tl-pend-bg:rgba(255,255,255,.05);--tl-pend-bd:rgba(255,255,255,.08);
}
[data-cs-theme="light"]{
  --bg:#f0faf6;--glass:#ffffff;--glass2:#f4faf7;
  --bd:#c5e8d8;--bd2:#9dd4bb;
  --acc:#059669;--acc2:#047857;--acc3:#34d399;
  --accs:rgba(5,150,105,0.08);--accg:rgba(5,150,105,0.2);
  --tx:#0d2b1e;--tx2:#2d5a42;--tx3:#6b9e85;
  --red:#dc2626;--amber:#d97706;--blue:#2563eb;--purple:#7c3aed;
  --card-bg:#ffffff;--card-bd:#c5e8d8;
  --sb-bg:#ffffff;--btn-text:#ffffff;
  --rej-bg:rgba(220,38,38,0.04);--rej-bd:rgba(220,38,38,0.18);
  --short-bg:rgba(5,150,105,0.05);--short-bd:rgba(5,150,105,0.2);
  --tog-bg:rgba(5,150,105,0.1);--tog-bd:rgba(5,150,105,0.25);--tog-col:#059669;
  --score-hi-bg:#ecfdf5;--score-hi:#059669;
  --score-mid-bg:#fffbeb;--score-mid:#d97706;
  --score-lo-bg:#fef2f2;--score-lo:#dc2626;
  --skel-a:#e2e8f0;--skel-b:#cbd5e1;
  --tl-done-bg:rgba(5,150,105,.08);--tl-done-bd:rgba(5,150,105,.25);--tl-done-col:#059669;
  --tl-pend-bg:#f4faf7;--tl-pend-bd:#c5e8d8;
}

@keyframes fup{to{opacity:1;transform:translateY(0);}}
@keyframes pdot{0%,100%{opacity:1;}50%{opacity:.4;}}
@keyframes spin{to{transform:rotate(360deg);}}
@keyframes cs-skel-shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}

.shell{display:flex;height:calc(100vh - 56px);position:relative;background:var(--bg);color:var(--tx);font-family:var(--sans);overflow:hidden;transition:background .35s,color .35s;z-index:1;}
[data-cs-theme="dark"] .shell::before{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(0,214,143,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,214,143,.025) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;z-index:0;}

.sb{width:285px;flex-shrink:0;background:var(--sb-bg);border-right:1px solid var(--card-bd);display:flex;flex-direction:column;height:calc(100vh - 56px);overflow:hidden;backdrop-filter:blur(20px);transition:background .35s,border-color .35s;box-shadow:2px 0 20px rgba(0,0,0,.15);z-index:1;}
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
.ftab{flex-shrink:0;font-size:.61rem;font-weight:600;padding:.2rem .58rem;border-radius:999px;cursor:pointer;border:1px solid var(--card-bd);background:transparent;color:var(--tx3);font-family:var(--sans);transition:all .13s;white-space:nowrap;}
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
.sb-notif{padding:.52rem .85rem;border-radius:8px;font-size:.71rem;font-weight:500;margin:6px 10px 0;}
.sb-notif.info{background:var(--accs);color:var(--acc);border:1px solid var(--bd);}
.sb-notif.warn{background:var(--rej-bg);color:var(--red);border:1px solid var(--rej-bd);}
.sb-empty{display:flex;flex-direction:column;align-items:center;gap:8px;padding:2rem;color:var(--tx3);text-align:center;}
.sb-empty svg{width:28px;height:28px;stroke:var(--tx3);fill:none;stroke-width:2;opacity:.4;}
.sb-empty-title{font-size:.8rem;font-weight:600;color:var(--tx2);}
.sb-empty-sub{font-size:.69rem;}
.sb-theme{padding:.8rem 1rem;border-top:1px solid var(--card-bd);display:flex;align-items:center;gap:9px;cursor:pointer;transition:background .2s,border-color .35s;flex-shrink:0;}
.sb-theme:hover{background:var(--glass2);}
.tog-icon{font-size:.95rem;flex-shrink:0;}
.tog-label-txt{flex:1;font-size:.75rem;font-weight:600;color:var(--tx2);transition:color .35s;}
.tog-track{width:38px;height:20px;border-radius:999px;background:var(--tog-bg);border:1px solid var(--tog-bd);position:relative;flex-shrink:0;transition:all .35s;}
.tog-thumb{position:absolute;top:3px;left:3px;width:12px;height:12px;border-radius:50%;background:var(--tog-col);transition:transform .28s cubic-bezier(.4,0,.2,1),background .35s;box-shadow:0 0 6px var(--accg);}
[data-cs-theme="light"] .tog-thumb{transform:translateX(18px);}

.main{flex:1;overflow-y:auto;min-width:0;width:0;display:flex;flex-direction:column;transition:background .35s;}
.main::-webkit-scrollbar{width:4px;}
.main::-webkit-scrollbar-thumb{background:var(--bd2);border-radius:4px;}
.page-topbar{display:flex;align-items:center;justify-content:space-between;padding:1.4rem 2.2rem 0;opacity:0;transform:translateY(10px);animation:fup .4s ease .02s forwards;}
.page-title{font-family:var(--serif);font-size:1.55rem;color:var(--tx);transition:color .35s;}
.page-sub{font-size:.72rem;color:var(--tx3);margin-top:.15rem;transition:color .35s;}
.page-btns{display:flex;align-items:center;gap:.6rem;}
.btn-export{background:var(--glass2);color:var(--tx2);font-family:var(--sans);font-size:.76rem;font-weight:600;padding:.44rem .9rem;border-radius:8px;border:1px solid var(--card-bd);cursor:pointer;display:flex;align-items:center;gap:6px;transition:all .2s;}
.btn-export:hover{border-color:var(--acc);color:var(--acc);}
.btn-add{background:var(--acc);color:var(--btn-text);font-family:var(--sans);font-size:.76rem;font-weight:700;padding:.44rem .9rem;border-radius:8px;border:none;cursor:pointer;display:flex;align-items:center;gap:6px;box-shadow:0 0 14px var(--accg);transition:all .2s;}
.btn-add:hover{background:var(--acc3);box-shadow:0 0 22px var(--accg);transform:translateY(-1px);}
.btn-refresh{width:34px;height:34px;border-radius:8px;background:var(--glass2);border:1px solid var(--card-bd);display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--tx3);transition:all .2s;font-size:.85rem;}
.btn-refresh:hover{border-color:var(--acc);color:var(--acc);}
.detail{padding:1.8rem 2.5rem;width:100%;box-sizing:border-box;}
.main-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;gap:.75rem;color:var(--tx3);text-align:center;padding:3rem;}
.main-empty svg{width:52px;height:52px;stroke:var(--tx3);fill:none;stroke-width:1.5;opacity:.3;}
.main-empty-title{font-size:.92rem;font-weight:600;color:var(--tx2);}
.main-empty-sub{font-size:.73rem;line-height:1.55;max-width:220px;}

.cs-pill{display:inline-flex;align-items:center;gap:3px;font-size:.59rem;font-weight:600;padding:.13rem .48rem;border-radius:999px;white-space:nowrap;}
.pill-shortlisted{background:rgba(59,130,246,.12);color:#60a5fa;}
.pill-assessment{background:rgba(251,191,36,.1);color:#fbbf24;}
.pill-assessed{background:rgba(45,212,191,.1);color:#2dd4bf;}
.pill-interview{background:rgba(167,139,250,.1);color:#a78bfa;}
.pill-hired{background:rgba(0,214,143,.1);color:#00d68f;}
.pill-rejected{background:rgba(248,113,113,.1);color:#f87171;}
.pill-applied{background:rgba(255,255,255,.06);color:#5a8a75;}
[data-cs-theme="light"] .pill-shortlisted{background:#eff6ff;color:#2563eb;}
[data-cs-theme="light"] .pill-assessment{background:#fffbeb;color:#d97706;}
[data-cs-theme="light"] .pill-assessed{background:#f0fdfa;color:#0d9488;}
[data-cs-theme="light"] .pill-interview{background:#f5f3ff;color:#7c3aed;}
[data-cs-theme="light"] .pill-hired{background:#f0fdf4;color:#16a34a;}
[data-cs-theme="light"] .pill-rejected{background:#fef2f2;color:#dc2626;}
[data-cs-theme="light"] .pill-applied{background:#f1f5f9;color:#64748b;}

.cs-skel{background:linear-gradient(90deg,var(--skel-a) 25%,var(--skel-b) 50%,var(--skel-a) 75%);background-size:400px 100%;animation:cs-skel-shimmer 1.3s infinite linear;border-radius:6px;}
.cs-skel-item{display:flex;align-items:flex-start;gap:10px;padding:.62rem .68rem;border-radius:10px;background:var(--glass);border:1px solid var(--card-bd);margin-bottom:2px;}

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

/* ── NEW: Red flag + Top 10 + Match pill styles ── */
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
.ftab--danger.on{background:var(--red) !important;border-color:var(--red) !important;}
.ftab--danger:hover{border-color:var(--red) !important;color:var(--red) !important;}
.ftab--star.on{background:var(--amber) !important;border-color:var(--amber) !important;color:#0a2e1e !important;}
.ftab--star:hover{border-color:var(--amber) !important;color:var(--amber) !important;}

.fab{position:fixed;width:46px;height:46px;border-radius:13px;background:var(--fab-bg,#1a2535);border:1px solid rgba(255,255,255,.12);box-shadow:0 6px 24px rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;cursor:grab;z-index:9999;user-select:none;touch-action:none;transition:box-shadow .2s,border-color .2s,background .25s;}
.fab:active{cursor:grabbing;}
.fab:hover{border-color:rgba(0,214,143,.4);box-shadow:0 6px 28px rgba(0,0,0,.6),0 0 0 1px rgba(0,214,143,.2);}
.fab.open{background:var(--fab-open,#00d68f);border-color:var(--fab-open,#00d68f);box-shadow:0 6px 28px var(--accg);}
.fab svg{pointer-events:none;transition:transform .3s ease;}
.fab.open svg{transform:rotate(180deg);}
.fab-tip{position:fixed;background:#0f1f16;border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:.3rem .65rem;font-size:.68rem;font-weight:500;color:rgba(255,255,255,.65);white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .18s;box-shadow:0 4px 14px rgba(0,0,0,.4);z-index:9998;}
.fab-bd{position:fixed;inset:0;z-index:9996;}
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
.np-ic{width:29px;height:29px;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.88rem;}
.np-item.nact .np-ic{background:rgba(0,214,143,.12);}
.np-item:hover .np-ic{background:rgba(255,255,255,.06);}
.np-nm{font-size:.77rem;font-weight:500;color:rgba(255,255,255,.65);}
.np-item.nact .np-nm{color:#e2faf1;font-weight:600;}
.np-sub{font-size:.62rem;color:rgba(255,255,255,.24);}
.np-bdg{margin-left:auto;flex-shrink:0;background:#00d68f;color:#040d0a;font-size:.56rem;font-weight:700;padding:.08rem .4rem;border-radius:999px;}
.np-ai{margin-left:auto;flex-shrink:0;font-size:.52rem;font-weight:700;background:rgba(0,214,143,.1);color:#00d68f;border:1px solid rgba(0,214,143,.2);padding:.08rem .36rem;border-radius:999px;}
.np-div{height:1px;background:rgba(0,214,143,.08);margin:.38rem .8rem;}
.np-tog-row{margin:.45rem .8rem .8rem;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:.55rem .72rem;display:flex;align-items:center;justify-content:space-between;cursor:pointer;transition:background .2s;}
.np-tog-row:hover{background:rgba(255,255,255,.07);}
.np-tog-lbl{font-size:.7rem;color:rgba(255,255,255,.45);display:flex;align-items:center;gap:6px;}
.np-tog-switch{display:flex;align-items:center;gap:5px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:999px;padding:.18rem .18rem .18rem .55rem;}
.np-inner-lbl{font-size:.58rem;font-weight:700;color:rgba(255,255,255,.4);min-width:26px;transition:color .2s;}
.np-trk{width:26px;height:14px;border-radius:999px;background:rgba(0,214,143,.2);position:relative;}
.np-thumb{position:absolute;top:2px;left:2px;width:10px;height:10px;border-radius:50%;background:#00d68f;transition:all .25s cubic-bezier(.4,0,.2,1);box-shadow:0 0 5px rgba(0,214,143,.5);}
.np-tog-row.light .np-thumb{transform:translateX(12px);}
.np-tog-row.light .np-inner-lbl{color:rgba(255,255,255,.65);}
@keyframes npii{from{opacity:0;transform:translateX(-8px);}to{opacity:1;transform:translateX(0);}}
.nav-panel.show .np-item{animation:npii .22s ease both;}
.nav-panel.show .np-item:nth-child(1){animation-delay:.03s;}
.nav-panel.show .np-item:nth-child(2){animation-delay:.06s;}
.nav-panel.show .np-item:nth-child(3){animation-delay:.09s;}
.nav-panel.show .np-item:nth-child(4){animation-delay:.12s;}
.nav-panel.show .np-item:nth-child(5){animation-delay:.15s;}
.nav-panel.show .np-item:nth-child(6){animation-delay:.18s;}
.nav-panel.show .np-item:nth-child(7){animation-delay:.21s;}
@media(max-width:900px){.sb{width:240px;}}
@media(max-width:660px){.shell{flex-direction:column;}.sb{width:100%;height:auto;max-height:280px;}.main{flex:1;overflow-y:auto;}.detail{padding:1rem;}.page-topbar{padding:1rem 1rem 0;}}
`;

export default function CandidateScreeningInterface() {
  const dispatch     = useAppDispatch();
  const params       = useSearchParams();
  const jobIdFromUrl = params.get("job_id");

  const { jobs, candidates, candidatesLoading, error, selectedJobId, message } =
    useAppSelector((s) => s.candidate);

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [searchTerm,   setSearchTerm]   = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy,       setSortBy]       = useState("score_desc");
  const [theme,        setTheme]        = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("tf-theme");
    if (saved === "light") setTheme("light");
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      localStorage.setItem("tf-theme", next);
      return next;
    });
  }, []);

  useEffect(() => { dispatch(getJobs()); }, [dispatch]);
  useEffect(() => {
    if (jobIdFromUrl && jobs.length) {
      const found = jobs.find((j) => String(j.id) === String(jobIdFromUrl));
      if (found) dispatch(setSelectedJobId(found.id));
    }
  }, [jobIdFromUrl, jobs, dispatch]);
  useEffect(() => { dispatch(getCandidates(selectedJobId ?? undefined)); }, [dispatch, selectedJobId]);
  useEffect(() => {
    if (candidates.length && !selectedCandidate) setSelectedCandidate(candidates[0]);
  }, [candidates, selectedCandidate]);

  const selectedJob = useMemo(
    () => selectedJobId ? jobs.find((j) => String(j.id) === String(selectedJobId)) ?? null : null,
    [jobs, selectedJobId],
  );

  const processedCandidates = useMemo(
    () => candidates.map((c) => ({
      ...c,
      dept:          (c as any).department || null,
      displayStatus: getDisplayStatus(c),
      displayScore:  c?.ats_score || 0,
      scoreColor:    getScoreColor(c?.ats_score || 0),
      statusInfo:    getCandidateStatusInfo(c),
    })),
    [candidates],
  );

  /* ── filteredCandidates — includes red_flags + top_10 ── */
  const filteredCandidates = useMemo(() => {
    let list = processedCandidates;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter((c) =>
        c.name?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.job_title?.toLowerCase().includes(q),
      );
    }

    if (filterStatus !== "all") {
      list = list.filter((c) => {
        const ds = c.displayStatus;
        switch (filterStatus) {
          case "shortlisted":        return ds === "Shortlisted";
          case "assessment_pending": return ["Assessment Sent","Assessment In Progress","Assessment Expired"].includes(ds);
          case "assessment_done":    return ["Assessment Passed","Assessment Failed"].includes(ds);
          case "interview":          return ds === "Interview Scheduled";
          case "hired":              return ds === "Hired";
          case "rejected":           return ds === "Rejected";
          case "red_flags":
            return (c as any).has_red_flags === true ||
                   (((c as any).red_flags as string[] | undefined)?.length ?? 0) > 0;
          case "top_10":
            return true;
          default: return true;
        }
      });
    }

    const sorted = [...list].sort((a, b) => {
      if (filterStatus === "top_10") {
        const distA = (a as any).knn_distance ?? (1 - (a.displayScore ?? 0) / 100);
        const distB = (b as any).knn_distance ?? (1 - (b.displayScore ?? 0) / 100);
        return distA - distB;
      }
      switch (sortBy) {
        case "score_desc": return (b.ats_score ?? 0) - (a.ats_score ?? 0);
        case "score_asc":  return (a.ats_score ?? 0) - (b.ats_score ?? 0);
        case "date_desc":  return +new Date(b.processed_date ?? 0) - +new Date(a.processed_date ?? 0);
        case "date_asc":   return +new Date(a.processed_date ?? 0) - +new Date(b.processed_date ?? 0);
        case "name_asc":   return (a.name ?? "").localeCompare(b.name ?? "");
        case "status":     return (b.statusInfo?.priority ?? 0) - (a.statusInfo?.priority ?? 0);
        default:           return 0;
      }
    });

    if (filterStatus === "top_10") return sorted.slice(0, 10);
    return sorted;
  }, [processedCandidates, searchTerm, filterStatus, sortBy]);

  const refreshData = useCallback(async () => {
    await dispatch(getJobs()).unwrap();
    await dispatch(getCandidates(selectedJobId ?? undefined)).unwrap();
  }, [dispatch, selectedJobId]);

  const sendAssessmentReminder = useCallback(async (id: string | number) => {
    await dispatch(sendAssessmentReminderThunk(id)).unwrap();
    setTimeout(() => dispatch(clearMessage()), 3000);
    dispatch(getCandidates(selectedJobId ?? undefined));
  }, [dispatch, selectedJobId]);

  const [fabOpen,  setFabOpen]  = useState(false);
  const [fabPos,   setFabPos]   = useState({ left: 0, top: 0 });
  const [panelPos, setPanelPos] = useState({ left: 0, top: 0 });
  const [showTip,  setShowTip]  = useState(false);
  const [mounted,  setMounted]  = useState(false);
  const fabRef   = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startXY  = useRef({ x: 0, y: 0, ox: 0, oy: 0 });

  useEffect(() => {
    setMounted(true);
    setFabPos({ left: window.innerWidth - 64, top: window.innerHeight / 2 - 23 });
  }, []);

  const calcPanelPos = useCallback((fabL: number, fabT: number) => {
    let px = fabL + 56, py = fabT;
    if (px + 270 > window.innerWidth)  px = fabL - 274;
    if (py + 470 > window.innerHeight) py = window.innerHeight - 478;
    if (py < 8) py = 8;
    if (px < 8) px = 8;
    return { left: px, top: py };
  }, []);

  const openNav  = useCallback(() => { setFabOpen(true); setPanelPos(calcPanelPos(fabPos.left, fabPos.top)); }, [fabPos, calcPanelPos]);
  const closeNav = useCallback(() => setFabOpen(false), []);

  const onFabMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = false;
    startXY.current = { x: e.clientX, y: e.clientY, ox: fabPos.left, oy: fabPos.top };
    const move = (ev: MouseEvent) => {
      const dx = ev.clientX - startXY.current.x, dy = ev.clientY - startXY.current.y;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragging.current = true;
      if (dragging.current) {
        const nx = Math.max(0, Math.min(window.innerWidth  - 50, startXY.current.ox + dx));
        const ny = Math.max(0, Math.min(window.innerHeight - 50, startXY.current.oy + dy));
        setFabPos({ left: nx, top: ny });
        if (fabOpen) setPanelPos(calcPanelPos(nx, ny));
      }
    };
    const up = () => {
      if (!dragging.current) fabOpen ? closeNav() : openNav();
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
    e.preventDefault();
  }, [fabPos, fabOpen, openNav, closeNav, calcPanelPos]);

  const isLoading = candidatesLoading === "pending";

  return (
    <div className="shell" data-cs-theme={theme}>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      {/* ══ SIDEBAR ══ */}
      <div className="sb">
        <div className="sb-hdr">
          <div className="sb-top">
            <span className="sb-title">Candidates</span>
            <span className="sb-cnt">{filteredCandidates.length} of {candidates.length}</span>
          </div>

          <div className="sb-search">
            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              type="text"
              placeholder="Search by name, email, or job title…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {jobs.length > 0 && (
            <div className="sb-job-wrap">
              <select
                className="sb-job-sel"
                value={selectedJobId ?? ""}
                onChange={(e) => {
                  const job = jobs.find((j) => String(j.id) === e.target.value);
                  dispatch(setSelectedJobId(job?.id ?? null));
                }}
              >
                <option value="">All Jobs</option>
                {jobs.map((j) => (
                  <option key={j.id} value={j.id}>{j.title} ({j.location})</option>
                ))}
              </select>
              <span className="sb-job-arrow">▾</span>
            </div>
          )}

          {/* ── Filter chips with Red Flags + Top 10 ── */}
          <div className="sb-filter">
            {FILTER_CHIPS.map((chip) => (
              <button
                key={chip.value}
                className={`ftab${filterStatus === chip.value ? " on" : ""}${
                  chip.value === "red_flags" ? " ftab--danger" : ""
                }${
                  chip.value === "top_10" ? " ftab--star" : ""
                }`}
                onClick={() => setFilterStatus(chip.value)}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        <div className="sb-sort">
          <span className="sort-lbl">Sort by</span>
          <div className="sb-sort-wrap">
            <select className="sort-sel" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="score_desc">Score (High to Low)</option>
              <option value="score_asc">Score (Low to High)</option>
              <option value="date_desc">Date (Newest First)</option>
              <option value="date_asc">Date (Oldest First)</option>
              <option value="name_asc">Name (A–Z)</option>
              <option value="status">Status Priority</option>
            </select>
            <span className="sort-arrow">▾</span>
          </div>
        </div>

        {message && <div className="sb-notif info">{message}</div>}
        {error   && <div className="sb-notif warn">{error}</div>}

        <div className="cand-list">
          {isLoading ? (
            <CandidateListSkeleton />
          ) : filteredCandidates.length === 0 ? (
            <div className="sb-empty">
              <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <div className="sb-empty-title">No candidates found</div>
              <div className="sb-empty-sub">Try adjusting filters or search.</div>
            </div>
          ) : (
            /* ── rank prop passed in Top 10 view ── */
            filteredCandidates.map((c, index) => (
              <CandidateCard
                key={c.id}
                candidate={c as any}
                isSelected={selectedCandidate?.id === c.id}
                rank={filterStatus === "top_10" ? index + 1 : undefined}
                onClick={() => {
                  const { displayStatus, displayScore, scoreColor, statusInfo, ...base } = c;
                  setSelectedCandidate(base as Candidate);
                }}
              />
            ))
          )}
        </div>

        <div className="sb-theme" onClick={toggleTheme}>
          <span className="tog-icon">{theme === "dark" ? "🌙" : "☀️"}</span>
          <span className="tog-label-txt">{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
          <div className="tog-track"><div className="tog-thumb" /></div>
        </div>
      </div>

      {/* ══ MAIN ══ */}
      <div className="main">
        <div className="page-topbar">
          <div>
            <div className="page-title">Candidate Screening</div>
            {selectedJob && (
              <div className="page-sub">
                {selectedJob.title} · {selectedJob.location} · {filteredCandidates.length} candidates
              </div>
            )}
          </div>
          <div className="page-btns">
            <button className="btn-export">📤 Export CSV</button>
            {/* <button className="btn-add">+ Add Candidate</button> */}
            {/* BEFORE — plain button doing nothing */}
            {/* <button className="btn-add">+ Add Candidate</button> */}

            {/* AFTER — opens localhost:3000/admin */}
            <a
              href="https://hrmgcvclone-production.up.railway.app"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-add"
              style={{ textDecoration: "none" }}
            >
              + Add Candidate
            </a>
            <button className="btn-refresh" onClick={refreshData} title="Refresh">↻</button>
          </div>
        </div>

        <div className="detail">
          {selectedCandidate ? (
            <CandidateDetails
              candidate={{
                ...selectedCandidate,
                displayStatus: getDisplayStatus(selectedCandidate),
                displayScore:  selectedCandidate.ats_score ?? 0,
                scoreColor:    getScoreColor(selectedCandidate.ats_score ?? 0),
              } as any}
              onSendReminder={sendAssessmentReminder}
            />
          ) : (
            <div className="main-empty">
              <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <div className="main-empty-title">Select a candidate</div>
              <div className="main-empty-sub">Choose a candidate from the list to view their full profile, scores, and recruitment timeline.</div>
            </div>
          )}
        </div>
      </div>

      {/* ══ DRAGGABLE FAB + NAV PANEL ══ */}
      {mounted && createPortal(
        <>
          {fabOpen && <div className="fab-bd" onClick={closeNav} />}
          <div
            ref={fabRef}
            className={`fab${fabOpen ? " open" : ""}`}
            style={{ left: fabPos.left, top: fabPos.top }}
            onMouseDown={onFabMouseDown}
            onMouseEnter={() => { if (!fabOpen) setShowTip(true); }}
            onMouseLeave={() => setShowTip(false)}
          >
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2"/>
              <polyline points="2 17 12 22 22 17"/>
              <polyline points="2 12 12 17 22 12"/>
            </svg>
          </div>
          {showTip && !fabOpen && (
            <div className="fab-tip" style={{ left: fabPos.left + 54, top: fabPos.top + 12, opacity: 1 }}>Pages</div>
          )}
          <div className={`nav-panel${fabOpen ? " show" : ""}`} style={{ left: panelPos.left, top: panelPos.top }}>
            <div className="np-hdr">
              <span className="np-title">Navigation</span>
              <button className="np-x" onClick={closeNav}>✕</button>
            </div>
            <div className="np-curr">
              <div><div className="np-clbl">Current page</div><div className="np-cnm">Candidate Screening</div></div>
              <div className="np-cdot" />
            </div>
            <div className="np-sec">Recruitment</div>
            <a className="np-item" href="/dashboard"><div className="np-ic">📊</div><div><div className="np-nm">Dashboard</div><div className="np-sub">Recruitment overview</div></div></a>
            <a className="np-item nact" href="/candidates"><div className="np-ic">👥</div><div><div className="np-nm">Candidates</div><div className="np-sub">Manage applicants</div></div></a>
            <a className="np-item" href="/scheduler"><div className="np-ic">🗓️</div><div><div className="np-nm">Scheduling</div><div className="np-sub">Interview calendar</div></div></a>
            <div className="np-div" />
            <div className="np-sec">Screening</div>
            <a className="np-item" href="/assessments"><div className="np-ic">📋</div><div><div className="np-nm">Assessments</div><div className="np-sub">Tests &amp; evaluations</div></div></a>
            <a className="np-item" href="/interview-results"><div className="np-ic">🎯</div><div><div className="np-nm">Interview Results</div><div className="np-sub">Review outcomes</div></div><span className="np-bdg">5</span></a>
            <div className="np-div" />
            <div className="np-sec">Tools</div>
            <a className="np-item" href="#"><div className="np-ic">🤖</div><div><div className="np-nm">ATS Checking</div><div className="np-sub">AI-powered screening</div></div><span className="np-ai">AI</span></a>
            <a className="np-item" href="#"><div className="np-ic">📈</div><div><div className="np-nm">Reports</div><div className="np-sub">Analytics &amp; insights</div></div></a>
            <div className="np-div" />
            <div className={`np-tog-row${theme === "light" ? " light" : ""}`} onClick={toggleTheme}>
              <span className="np-tog-lbl">{theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}</span>
              <div className="np-tog-switch">
                <span className="np-inner-lbl">{theme === "dark" ? "Dark" : "Light"}</span>
                <div className="np-trk"><div className="np-thumb" /></div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  );
}
