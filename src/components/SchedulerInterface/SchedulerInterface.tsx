/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { fetchCandidates, scheduleInterview } from "@/services/api/schedulerAPI";

/* ── Types ─────────────────────────────────────────────────────────────────── */
interface Candidate {
  id: string; name: string; email: string; phone?: string;
  job_title?: string; dept?: string; location?: string;
  processed_date?: string; ats_score?: number;
  exam_percentage?: number; exam_completed?: boolean;
  interview_scheduled?: boolean; interview_date?: string | null;
  interview_type?: string | null; interviewer?: string | null;
  meeting_link?: string | null; duration?: number;
  interview_status?: "pending"|"scheduled"|"completed"|"cancelled";
  resume_path?: string | null; job_description?: string;
}
interface Slot { id: number; time: string; available: boolean; }
interface Interviewer { id: number; name: string; role: string; checked: boolean; }

/* ── Static data ───────────────────────────────────────────────────────────── */
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
const DEFAULT_IVS: Interviewer[] = [
  {id:1,name:"Alex Rodriguez",role:"Engineering Manager",checked:true},
  {id:2,name:"Sarah Kim",role:"Senior Engineer",checked:true},
  {id:3,name:"David Wilson",role:"Product Manager",checked:false},
];
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DOW = ["SU","MO","TU","WE","TH","FR","SA"];
const DOW_LONG = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

/* ── Helpers ────────────────────────────────────────────────────────────────── */
function avColor(n:string):[string,string]{
  const p:any[]=[["#EFF6FF","#2563EB"],["#F0FDF4","#16A34A"],["#FFF7ED","#EA580C"],["#FAF5FF","#7C3AED"],["#FFF1F2","#E11D48"],["#F0FDFA","#0D9488"],["#FFFBEB","#D97706"],["#FDF4FF","#A21CAF"]];
  let h=0;for(let i=0;i<n.length;i++)h=(h*31+n.charCodeAt(i))&0xffffffff;
  return p[Math.abs(h)%p.length];
}
function ini(n:string){return n.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase();}
function slotToDate(date:Date,timeStr:string){
  const[hm,ap]=timeStr.split(" ");const[hS,mS]=hm.split(":");
  let h=parseInt(hS,10);const m=parseInt(mS,10);
  const pm=ap?.toUpperCase().includes("PM");
  if(pm&&h!==12)h+=12;if(!pm&&h===12)h=0;
  const dt=new Date(date);dt.setHours(h,m,0,0);return dt;
}
function fmtDate(s?:string|null){
  if(!s)return"—";const d=new Date(s);
  return isNaN(d.getTime())?s:d.toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});
}

/* ── Global CSS — exact match to HTML <style> block ────────────────────────── */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');
:root{--serif:'DM Serif Display',Georgia,serif;--sans:'Inter',system-ui,sans-serif;}

[data-sch-theme="dark"]{
  --bg:#040d0a;--glass:rgba(255,255,255,0.04);--glass2:rgba(255,255,255,0.07);
  --bd:rgba(0,214,143,0.12);--bd2:rgba(0,214,143,0.22);
  --acc:#00d68f;--acc2:#059669;--acc3:#34d399;
  --accs:rgba(0,214,143,0.10);--accg:rgba(0,214,143,0.25);
  --tx:#e2faf1;--tx2:#a7c4b8;--tx3:#5a8a75;
  --red:#f87171;--amber:#fbbf24;--blue:#60a5fa;--purple:#a78bfa;
  --card-bg:rgba(255,255,255,0.04);--card-bd:rgba(0,214,143,0.12);
  --btn-text:#040d0a;--sb-bg:rgba(4,13,10,0.97);
  --tog-bg:rgba(0,214,143,0.12);--tog-bd:rgba(0,214,143,0.25);--tog-col:#00d68f;
  --step-off:rgba(255,255,255,0.06);--step-off-num:rgba(255,255,255,.3);--step-off-txt:rgba(255,255,255,.4);
  --step-act-bg:rgba(59,130,246,.12);--step-act-bd:rgba(59,130,246,.35);--step-act-num:#3b82f6;--step-act-txt:#e2faf1;
  --step-done-bg:rgba(0,214,143,.1);--step-done-bd:rgba(0,214,143,.3);--step-done-num:#00d68f;
  --cal-today:#3b82f6;--cal-other:rgba(255,255,255,.03);--cal-hov:rgba(0,214,143,.08);
  --cal-dot:#00d68f;--cal-hdr:rgba(0,214,143,.04);
  --slot-avail-bg:var(--glass2);--slot-avail-bd:var(--card-bd);
  --cand-sel-bg:rgba(59,130,246,.1);--cand-sel-bd:rgba(59,130,246,.35);
  --method-sel-bg:rgba(59,130,246,.08);--method-sel-bd:rgba(59,130,246,.3);
  --sched-tag:rgba(0,214,143,.1);--sched-tag-col:#00d68f;
  --pend-tag:rgba(251,191,36,.1);--pend-tag-col:#fbbf24;
  --kpi-bd1:#3b82f6;--kpi-bd2:#22c55e;--kpi-bd3:#a78bfa;--kpi-bd4:#f59e0b;
}
[data-sch-theme="light"]{
  --bg:#f0faf6;--glass:#fff;--glass2:#f4faf7;
  --bd:#c5e8d8;--bd2:#9dd4bb;
  --acc:#059669;--acc2:#047857;--acc3:#34d399;
  --accs:rgba(5,150,105,0.08);--accg:rgba(5,150,105,0.2);
  --tx:#0d2b1e;--tx2:#2d5a42;--tx3:#6b9e85;
  --red:#dc2626;--amber:#d97706;--blue:#2563eb;--purple:#7c3aed;
  --card-bg:#fff;--card-bd:#c5e8d8;--btn-text:#fff;--sb-bg:#fff;
  --tog-bg:rgba(5,150,105,0.1);--tog-bd:rgba(5,150,105,0.25);--tog-col:#059669;
  --step-off:#f4faf7;--step-off-num:#9dd4bb;--step-off-txt:#6b9e85;
  --step-act-bg:#eff6ff;--step-act-bd:#93c5fd;--step-act-num:#2563eb;--step-act-txt:#1e3a5f;
  --step-done-bg:#f0fdf4;--step-done-bd:#86efac;--step-done-num:#059669;
  --cal-today:#2563eb;--cal-other:#fff;--cal-hov:rgba(5,150,105,.06);
  --cal-dot:#059669;--cal-hdr:#f8fafb;
  --slot-avail-bg:#f0faf6;--slot-avail-bd:#c5e8d8;
  --cand-sel-bg:#eff6ff;--cand-sel-bd:#93c5fd;
  --method-sel-bg:#eff6ff;--method-sel-bd:#93c5fd;
  --sched-tag:rgba(5,150,105,.1);--sched-tag-col:#059669;
  --pend-tag:rgba(217,119,6,.08);--pend-tag-col:#d97706;
  --kpi-bd1:#3b82f6;--kpi-bd2:#16a34a;--kpi-bd3:#7c3aed;--kpi-bd4:#d97706;
}

@keyframes orb{from{transform:scale(.9);opacity:.6;}to{transform:scale(1.1);opacity:1;}}
@keyframes pdot{0%,100%{opacity:1;}50%{opacity:.4;}}
@keyframes fup{to{opacity:1;transform:translateY(0);}}

/* ── Shell ── */
.page{position:relative;z-index:1;min-height:100vh;background:var(--bg);color:var(--tx);font-family:var(--sans);transition:background .35s,color .35s;}
[data-sch-theme="dark"] .page::before{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(0,214,143,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,214,143,.025) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;z-index:0;}
[data-sch-theme="dark"] .page::after{content:'';position:fixed;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(0,214,143,.05) 0%,transparent 70%);top:-100px;right:-100px;pointer-events:none;z-index:0;animation:orb 9s ease-in-out infinite alternate;}
[data-sch-theme="light"] .page::before,[data-sch-theme="light"] .page::after{display:none;}

/* ── KPI Strip ── */
.kpi-strip{display:grid;grid-template-columns:repeat(4,1fr);opacity:0;transform:translateY(10px);animation:fup .4s ease .04s forwards;position:relative;z-index:1;}
.ks-item{padding:1rem 1.4rem;border-bottom:3px solid transparent;transition:all .35s;}
.ks-item:not(:last-child){border-right:1px solid var(--card-bd);}
[data-sch-theme="light"] .ks-item{background:#fff;box-shadow:0 1px 4px rgba(0,0,0,.05);}
[data-sch-theme="dark"] .ks-item{background:var(--card-bg);}
.ks-lbl{font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--tx3);margin-bottom:.4rem;transition:color .35s;}
.ks-val{font-family:var(--serif);font-size:1.85rem;line-height:1;color:var(--tx);margin-bottom:.18rem;transition:color .35s;}
.ks-desc{font-size:.65rem;color:var(--tx3);transition:color .35s;}

/* ── AI Banner ── */
.ai-banner{font-size:.75rem;color:var(--tx3);padding:.55rem 1.4rem;background:var(--glass2);border-bottom:1px solid var(--card-bd);display:flex;align-items:center;gap:6px;transition:all .35s;position:relative;z-index:1;}
.ai-banner strong{color:var(--acc);}

/* ── Main layout ── */
.main{display:flex;height:calc(100vh - 116px);overflow:hidden;position:relative;z-index:1;}

/* ── Sidebar ── */
.sb{width:300px;flex-shrink:0;background:var(--sb-bg);border-right:1px solid var(--card-bd);display:flex;flex-direction:column;overflow:hidden;transition:background .35s,border-color .35s;}
.sb-hdr{padding:.9rem 1rem .7rem;border-bottom:1px solid var(--card-bd);transition:border-color .35s;}
.sb-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:.65rem;}
.sb-title{font-family:var(--serif);font-size:1rem;color:var(--tx);transition:color .35s;}
.sb-cnt{font-size:.63rem;font-weight:600;color:var(--tx3);background:var(--glass2);border:1px solid var(--card-bd);padding:.15rem .5rem;border-radius:999px;transition:all .35s;}
.sb-search{display:flex;align-items:center;gap:6px;background:var(--glass2);border:1px solid var(--card-bd);border-radius:8px;padding:.4rem .75rem;margin-bottom:.6rem;transition:border-color .2s,background .35s;}
.sb-search:focus-within{border-color:var(--acc);}
.sb-search input{background:none;border:none;outline:none;font-size:.75rem;color:var(--tx);font-family:var(--sans);width:100%;}
.sb-search input::placeholder{color:var(--tx3);}
.sb-filters{display:flex;gap:4px;flex-wrap:wrap;}
.sf{font-size:.62rem;font-weight:600;padding:.22rem .6rem;border-radius:999px;cursor:pointer;border:1px solid var(--card-bd);background:transparent;color:var(--tx3);font-family:var(--sans);transition:all .15s;}
.sf.on{background:var(--acc);color:var(--btn-text);border-color:var(--acc);}
.sf:hover:not(.on){border-color:var(--acc);color:var(--acc);}
.sb-sort{padding:.38rem 1rem;border-bottom:1px solid var(--card-bd);display:flex;align-items:center;justify-content:space-between;transition:border-color .35s;}
.sort-lbl{font-size:.62rem;color:var(--tx3);}
.sort-btn{display:flex;align-items:center;gap:4px;font-size:.62rem;font-weight:600;color:var(--acc);cursor:pointer;background:none;border:none;font-family:var(--sans);}
.cand-list{flex:1;overflow-y:auto;}
.cand-list::-webkit-scrollbar{width:3px;}
.cand-list::-webkit-scrollbar-thumb{background:var(--bd2);border-radius:3px;}

/* ── Candidate item (.ci) ── */
.ci{display:flex;align-items:center;gap:9px;padding:.6rem 1rem;cursor:pointer;border-left:2px solid transparent;transition:background .12s;}
.ci:hover{background:var(--glass2);}
.ci.on{background:var(--accs);border-left-color:var(--acc);}
.c-av{width:32px;height:32px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:.6rem;font-weight:700;flex-shrink:0;border:1px solid transparent;}
.c-info{flex:1;min-width:0;}
.c-nm{font-size:.78rem;font-weight:600;color:var(--tx);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:color .35s;}
.c-role{font-size:.62rem;color:var(--tx3);}
.c-meta{display:flex;align-items:center;gap:6px;margin-top:3px;}
.c-tag{font-size:.57rem;font-weight:600;padding:.1rem .38rem;border-radius:4px;}
.c-tag.sched{background:var(--sched-tag);color:var(--sched-tag-col);}
.c-tag.pend{background:var(--pend-tag);color:var(--pend-tag-col);}
.c-date{font-size:.57rem;color:var(--tx3);}
.c-score{margin-left:auto;font-family:var(--serif);font-size:.92rem;font-weight:700;color:var(--amber);flex-shrink:0;}

/* ── Content Panel ── */
.panel{flex:1;overflow-y:auto;background:var(--bg);transition:background .35s;}
.panel::-webkit-scrollbar{width:4px;}
.panel::-webkit-scrollbar-thumb{background:var(--bd2);border-radius:4px;}

/* ── Empty state ── */
.empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:1rem;color:var(--tx3);}
.empty-icon{font-size:3.5rem;opacity:.35;}
.empty-title{font-size:1rem;font-weight:600;color:var(--tx2);transition:color .35s;}
.empty-sub{font-size:.78rem;text-align:center;max-width:220px;line-height:1.5;}

/* ── Steps header ── */
.steps-hdr{display:grid;grid-template-columns:1fr 1fr 1fr;gap:0;border-bottom:1px solid var(--card-bd);transition:border-color .35s;}
.step-tab{display:flex;align-items:center;gap:8px;padding:.85rem 1.2rem;cursor:pointer;border-bottom:2px solid transparent;transition:all .2s;}
.step-tab:not(:last-child){border-right:1px solid var(--card-bd);}
.step-num{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.65rem;font-weight:700;flex-shrink:0;transition:all .25s;}
.step-tab.off .step-num{background:var(--step-off);color:var(--step-off-num);}
.step-tab.off .step-txt{color:var(--step-off-txt);}
.step-tab.act{background:var(--step-act-bg);border-color:var(--step-act-num);}
.step-tab.act .step-num{background:var(--step-act-num);color:#fff;}
.step-tab.act .step-txt{color:var(--step-act-txt);font-weight:600;}
.step-tab.done{background:var(--step-done-bg);}
.step-tab.done .step-num{background:var(--step-done-num);color:#fff;}
.step-tab.done .step-txt{color:var(--step-done-num);font-weight:600;}
.step-txt{font-size:.8rem;transition:color .25s;}
.step-check{font-size:.8rem;margin-left:auto;}

/* ── Calendar ── */
.cal-wrap{padding:1.2rem 1.5rem;}
.cal-nav{display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;}
.cal-month{font-family:var(--serif);font-size:1.15rem;color:var(--tx);transition:color .35s;}
.cal-arrow{width:28px;height:28px;border-radius:8px;background:var(--glass2);border:1px solid var(--card-bd);display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--tx3);font-size:.8rem;transition:all .18s;}
.cal-arrow:hover{border-color:var(--acc);color:var(--acc);}
.cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:0;}
.cal-dow{text-align:center;font-size:.6rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--tx3);padding:.5rem 0;background:var(--cal-hdr);transition:color .35s,background .35s;}
.cal-day{min-height:72px;border:1px solid var(--card-bd);padding:.4rem .5rem;cursor:pointer;transition:background .15s,border-color .15s;position:relative;}
.cal-day:hover{background:var(--cal-hov);}
.cal-day.empty{cursor:default;background:transparent;}
.cal-day.today{background:var(--cal-today);border-color:var(--cal-today);}
.cal-day.selected{background:var(--cal-today);border-color:var(--cal-today);}
.cd-num{font-size:.78rem;font-weight:600;color:var(--tx2);transition:color .35s;}
.cal-day.today .cd-num,.cal-day.selected .cd-num{color:#fff;font-weight:700;}
.cd-dots{display:flex;gap:2px;margin-top:3px;flex-wrap:wrap;}
.cd-dot{width:5px;height:5px;border-radius:50%;background:var(--cal-dot);}
.cal-day.today .cd-dot,.cal-day.selected .cd-dot{background:rgba(255,255,255,.7);}

/* ── Time Slots ── */
.time-wrap{padding:1.2rem 1.5rem;}
.tw-back{display:flex;align-items:center;gap:6px;font-size:.76rem;color:var(--acc);cursor:pointer;margin-bottom:1rem;font-weight:500;background:none;border:none;font-family:var(--sans);}
.tw-back:hover{color:var(--acc3);}
.tw-title{font-size:.9rem;font-weight:600;color:var(--tx);margin-bottom:1.2rem;transition:color .35s;}
.tw-sections{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;}
.tw-sec-lbl{font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--tx3);margin-bottom:.75rem;transition:color .35s;}
.slot-list{display:flex;flex-direction:column;gap:.5rem;}
.slot{display:flex;align-items:center;justify-content:space-between;padding:.55rem .85rem;border-radius:9px;cursor:pointer;border:1px solid transparent;transition:all .18s;}
.slot.avail{background:var(--slot-avail-bg);border-color:var(--slot-avail-bd);}
.slot.avail:hover{border-color:var(--acc);background:var(--accs);}
.slot.avail.sel{background:var(--accs);border-color:var(--acc);}
.slot.taken{opacity:.5;cursor:not-allowed;}
.slot-time{display:flex;align-items:center;gap:7px;font-size:.78rem;color:var(--tx2);transition:color .35s;}
.slot-time-icon{font-size:.72rem;color:var(--tx3);}
.slot-badge{font-size:.62rem;font-weight:600;padding:.14rem .45rem;border-radius:5px;}
.slot-badge.av{background:var(--accs);color:var(--acc);}
.slot-badge.tk{color:var(--tx3);background:transparent;}

/* ── Confirm ── */
.confirm-wrap{padding:1.2rem 1.5rem;}
.int-summary{background:var(--glass2);border:1px solid var(--card-bd);border-radius:12px;padding:.9rem 1.1rem;margin-bottom:1.3rem;display:flex;align-items:flex-start;gap:10px;transition:all .35s;}
.int-sum-icon{font-size:.9rem;flex-shrink:0;margin-top:.05rem;}
.int-sum-dt{font-size:.9rem;font-weight:700;color:var(--tx);margin-bottom:.25rem;transition:color .35s;}
.int-sum-meta{display:flex;align-items:center;gap:1.4rem;}
.int-sum-lbl{font-size:.7rem;color:var(--tx3);}
.int-sum-val{font-size:.7rem;font-weight:600;color:var(--tx2);transition:color .35s;}
.confirm-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.2rem;margin-bottom:1.2rem;}
.conf-title{font-size:.78rem;font-weight:700;color:var(--tx);margin-bottom:.75rem;transition:color .35s;}
.cand-card{display:flex;align-items:flex-start;gap:10px;padding:.7rem .85rem;border-radius:10px;border:1px solid var(--card-bd);background:var(--glass2);margin-bottom:.5rem;cursor:pointer;transition:all .18s;}
.cand-card:hover{border-color:var(--acc);}
.cand-card.sel{background:var(--cand-sel-bg);border-color:var(--cand-sel-bd);}
.cc-av{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:.58rem;font-weight:700;flex-shrink:0;border:1px solid transparent;}
.cc-nm{font-size:.78rem;font-weight:600;color:var(--tx);transition:color .35s;}
.cc-role{font-size:.63rem;color:var(--tx3);}
.cc-email{font-size:.6rem;color:var(--tx3);margin-top:.1rem;}
.cc-resume{font-size:.6rem;color:var(--acc);margin-top:.18rem;display:flex;align-items:center;gap:3px;}
.cc-check{margin-left:auto;color:var(--acc);font-size:.85rem;}
.int-row{display:flex;align-items:center;gap:10px;padding:.6rem .85rem;border-radius:10px;border:1px solid var(--card-bd);background:var(--glass2);margin-bottom:.5rem;transition:all .18s;}
.int-av{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.6rem;font-weight:700;flex-shrink:0;background:var(--accs);color:var(--acc);border:1px solid var(--bd);}
.int-nm{font-size:.78rem;font-weight:600;color:var(--tx);flex:1;transition:color .35s;}
.int-role{font-size:.62rem;color:var(--tx3);}
.int-cb{width:16px;height:16px;border-radius:4px;border:1.5px solid var(--card-bd);background:transparent;cursor:pointer;appearance:none;-webkit-appearance:none;flex-shrink:0;transition:all .15s;position:relative;accent-color:var(--acc);}
.int-cb:checked{background:var(--acc);border-color:var(--acc);}
.jd-section{margin-bottom:1.2rem;}
.jd-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:.5rem;}
.jd-add{font-size:.7rem;font-weight:600;color:var(--blue);cursor:pointer;display:flex;align-items:center;gap:4px;background:none;border:none;font-family:var(--sans);}
.jd-textarea{width:100%;background:var(--glass2);border:1px solid var(--card-bd);border-radius:9px;padding:.65rem .85rem;font-size:.75rem;color:var(--tx3);font-family:var(--sans);min-height:58px;resize:none;outline:none;transition:all .35s;}
.jd-textarea:focus{border-color:var(--acc);}
.method-section{margin-bottom:1.5rem;}
.method-grid{display:grid;grid-template-columns:1fr 1fr;gap:.75rem;}
.method-card{padding:.85rem 1rem;border-radius:12px;border:1px solid var(--card-bd);background:var(--glass2);cursor:pointer;transition:all .18s;}
.method-card:hover{border-color:var(--acc);}
.method-card.sel{background:var(--method-sel-bg);border-color:var(--method-sel-bd);}
.mc-icon{font-size:1.1rem;margin-bottom:.45rem;}
.mc-title{font-size:.78rem;font-weight:700;color:var(--tx);margin-bottom:.28rem;transition:color .35s;}
.mc-sub{font-size:.65rem;color:var(--tx3);margin-bottom:.5rem;transition:color .35s;}
.mc-feat{font-size:.62rem;color:var(--acc);display:flex;align-items:center;gap:4px;margin-bottom:.15rem;}
.confirm-actions{display:flex;align-items:center;justify-content:flex-end;gap:.75rem;padding:1rem 1.5rem;border-top:1px solid var(--card-bd);background:var(--bg);position:sticky;bottom:0;transition:all .35s;}
.btn-cancel{background:var(--glass2);color:var(--tx2);font-family:var(--sans);font-size:.78rem;font-weight:600;padding:.5rem 1.1rem;border-radius:8px;border:1px solid var(--card-bd);cursor:pointer;transition:all .2s;}
.btn-cancel:hover{border-color:var(--red);color:var(--red);}
.btn-confirm{background:var(--blue);color:#fff;font-family:var(--sans);font-size:.78rem;font-weight:700;padding:.5rem 1.2rem;border-radius:8px;border:none;cursor:pointer;display:flex;align-items:center;gap:6px;box-shadow:0 0 16px rgba(59,130,246,.3);transition:all .2s;}
.btn-confirm:hover{transform:translateY(-1px);box-shadow:0 0 24px rgba(59,130,246,.45);}

/* ── Result card ── */
.result-card{background:var(--glass2);border:1px solid var(--acc);border-radius:14px;padding:1.5rem;margin:1.2rem 1.5rem;text-align:center;}
.result-icon{font-size:2.2rem;margin-bottom:.5rem;}
.result-title{font-family:var(--serif);font-size:1.2rem;color:var(--acc);margin-bottom:.4rem;}
.result-link{font-size:.78rem;color:var(--blue);word-break:break-all;padding:.5rem .85rem;background:var(--glass);border:1px solid var(--card-bd);border-radius:8px;display:block;margin-bottom:.8rem;}
.result-meta{font-size:.72rem;color:var(--tx3);display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center;}

/* ── Theme toggle ── */
.theme-toggle-bar{position:fixed;bottom:1.2rem;left:1.2rem;z-index:9990;display:flex;align-items:center;gap:9px;background:var(--card-bg);border:1px solid var(--card-bd);border-radius:12px;padding:.6rem .9rem;cursor:pointer;backdrop-filter:blur(16px);transition:all .2s;box-shadow:0 4px 16px rgba(0,0,0,.2);}
.theme-toggle-bar:hover{border-color:var(--acc);}
.tog-icon{font-size:.9rem;flex-shrink:0;}
.tog-label-txt{font-size:.73rem;font-weight:600;color:var(--tx2);transition:color .35s;}
.tog-track{width:36px;height:19px;border-radius:999px;background:var(--tog-bg);border:1px solid var(--tog-bd);position:relative;flex-shrink:0;transition:all .35s;}
.tog-thumb{position:absolute;top:3px;left:3px;width:11px;height:11px;border-radius:50%;background:var(--tog-col);transition:transform .28s cubic-bezier(.4,0,.2,1),background .35s;box-shadow:0 0 6px var(--accg);}
[data-sch-theme="light"] .tog-thumb{transform:translateX(17px);}

/* ── FAB ── */
.fab{position:fixed;width:46px;height:46px;border-radius:13px;background:#1a2535;border:1px solid rgba(255,255,255,.12);box-shadow:0 6px 24px rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;cursor:grab;z-index:9999;user-select:none;touch-action:none;transition:box-shadow .2s,border-color .2s;}
.fab:active{cursor:grabbing;}
.fab:hover{border-color:rgba(0,214,143,.4);}
.fab.open{background:var(--acc);border-color:var(--acc);box-shadow:0 6px 28px var(--accg);}
.fab svg{pointer-events:none;transition:transform .3s ease;}
.fab.open svg{transform:rotate(180deg);}
.fab-tip{position:fixed;background:#0f1f16;border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:.3rem .65rem;font-size:.68rem;font-weight:500;color:rgba(255,255,255,.65);white-space:nowrap;pointer-events:none;z-index:9998;}

/* ── Nav Panel ── */
.nav-panel{position:fixed;width:262px;background:#0a1810;border:1px solid rgba(0,214,143,.15);border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.65);z-index:9997;overflow:hidden;opacity:0;pointer-events:none;transform:scale(.93);transition:all .26s cubic-bezier(.4,0,.2,1);}
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
.np-item.nact::before{content:'';position:absolute;left:-1px;top:50%;transform:translateY(-50%);width:3px;height:62%;border-radius:0 2px 2px 0;background:#00d68f;}
.np-ic{width:29px;height:29px;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.88rem;}
.np-item.nact .np-ic{background:rgba(0,214,143,.12);}
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
.np-thumb{position:absolute;top:2px;left:2px;width:10px;height:10px;border-radius:50%;background:#00d68f;transition:all .25s cubic-bezier(.4,0,.2,1);}
.np-tog-row.light .np-thumb{transform:translateX(12px);}
.np-tog-row.light .np-inner-lbl{color:rgba(255,255,255,.65);}

@media(max-width:900px){.sb{width:250px;}.kpi-strip{grid-template-columns:repeat(2,1fr);}}
@media(max-width:640px){.main{flex-direction:column;height:auto;}.sb{width:100%;height:auto;}}
`;

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────── */
export default function SchedulerInterface() {
  /* State */
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selIdx,      setSelIdx]     = useState<number>(-1);
  const [sfFilter,    setSfFilter]   = useState("all");
  const [searchQ,     setSearchQ]    = useState("");
  const [step,        setStep]       = useState(0); // 0=empty, 1=cal, 2=time, 3=confirm
  const [selDate,     setSelDate]    = useState<{d:number;m:number;y:number}|null>(null);
  const [selSlot,     setSelSlot]    = useState<Slot|null>(null);
  const [selMethod,   setSelMethod]  = useState(0);
  const [jobDesc,     setJobDesc]    = useState("");
  const [showJD,      setShowJD]     = useState(false);
  const [interviewers,setInterviewers] = useState<Interviewer[]>(DEFAULT_IVS);
  const [calYear,     setCalYear]    = useState(new Date().getFullYear());
  const [calMonth,    setCalMonth]   = useState(new Date().getMonth());
  const [result,      setResult]     = useState<any>(null);
  const [scheduling,  setScheduling] = useState(false);
  const [theme,       setTheme]      = useState<"dark"|"light">("dark");
  const [mounted,     setMounted]    = useState(false);
  const [fabOpen,     setFabOpen]    = useState(false);
  const [fabPos,      setFabPos]     = useState({left:0,top:0});
  const [panelPos,    setPanelPos]   = useState({left:0,top:0});
  const dragging = useRef(false);
  const startXY  = useRef({x:0,y:0,ox:0,oy:0});

  useEffect(()=>{
    setMounted(true);
    const saved = localStorage.getItem("tf-theme");
    if(saved==="light") setTheme("light");
    setFabPos({left:window.innerWidth-64, top:window.innerHeight-80});
    // Load candidates
    fetchCandidates().then(list=>{
      if(Array.isArray(list)&&list.length>0) setCandidates(list as any);
    }).catch(()=>{});
  },[]);

  const toggleTheme = useCallback(()=>{
    setTheme(t=>{const n=t==="dark"?"light":"dark";localStorage.setItem("tf-theme",n);return n;});
  },[]);

  /* FAB drag */
  const calcPanel = useCallback((l:number,t:number)=>{
    let px=l-276, py=t;
    if(px<8) px=l+56;
    if(py+500>window.innerHeight) py=window.innerHeight-508;
    if(py<8) py=8;
    return{left:px,top:py};
  },[]);

  const onFabDown = useCallback((e:React.MouseEvent)=>{
    dragging.current=false;
    startXY.current={x:e.clientX,y:e.clientY,ox:fabPos.left,oy:fabPos.top};
    const move=(ev:MouseEvent)=>{
      const dx=ev.clientX-startXY.current.x, dy=ev.clientY-startXY.current.y;
      if(Math.abs(dx)>3||Math.abs(dy)>3) dragging.current=true;
      if(dragging.current){
        const nx=Math.max(0,Math.min(window.innerWidth-50,startXY.current.ox+dx));
        const ny=Math.max(0,Math.min(window.innerHeight-50,startXY.current.oy+dy));
        setFabPos({left:nx,top:ny});
        if(fabOpen) setPanelPos(calcPanel(nx,ny));
      }
    };
    const up=()=>{
      if(!dragging.current){ fabOpen?setFabOpen(false):(()=>{setFabOpen(true);setPanelPos(calcPanel(fabPos.left,fabPos.top));})(); }
      document.removeEventListener("mousemove",move);
      document.removeEventListener("mouseup",up);
    };
    document.addEventListener("mousemove",move);
    document.addEventListener("mouseup",up);
    e.preventDefault();
  },[fabPos,fabOpen,calcPanel]);

  /* Computed */
  const stats = {
    total:   candidates.filter(c=>c.interview_scheduled).length,
    today:   0,
    week:    candidates.filter(c=>c.interview_status==="scheduled").length,
    pending: candidates.filter(c=>c.interview_status==="pending"||!c.interview_scheduled).length,
  };

  const filtered = candidates.filter(c=>{
    const q = !searchQ||c.name?.toLowerCase().includes(searchQ)||c.job_title?.toLowerCase().includes(searchQ);
    const f = sfFilter==="all"||c.interview_status===sfFilter;
    return q&&f;
  });

  const selCand = selIdx>=0 ? filtered[selIdx] : null;

  /* Steps header */
  function StepsHdr(){
    const s1=step>=1?(step>1?"done":"act"):"off";
    const s2=step>=2?(step>2?"done":"act"):"off";
    const s3=step>=3?"act":"off";
    return(
      <div className="steps-hdr">
        {[{cls:s1,n:"1",lbl:"Select Date"},{cls:s2,n:"2",lbl:"Select Time"},{cls:s3,n:"3",lbl:"Confirm"}].map((s,i)=>(
          <div key={i} className={`step-tab ${s.cls}`}>
            <div className="step-num">{s.cls==="done"?"✓":s.n}</div>
            <span className="step-txt">{s.lbl}</span>
            {s.cls==="done"&&<span className="step-check">✓</span>}
          </div>
        ))}
      </div>
    );
  }

  /* Calendar */
  function CalendarView(){
    const firstDay=new Date(calYear,calMonth,1).getDay();
    const days=new Date(calYear,calMonth+1,0).getDate();
    const today=new Date();
    const cells=[];
    for(let i=0;i<firstDay;i++) cells.push(<div key={"b"+i} className="cal-day empty"/>);
    for(let d=1;d<=days;d++){
      const isToday=d===today.getDate()&&calMonth===today.getMonth()&&calYear===today.getFullYear();
      const isSel=selDate?.d===d&&selDate?.m===calMonth&&selDate?.y===calYear;
      const hasDot=d===7||d===10||d===14;
      cells.push(
        <div key={"d"+d} className={`cal-day${isToday?" today":""}${isSel?" selected":""}`} onClick={()=>{setSelDate({d,m:calMonth,y:calYear});setStep(2);}}>
          <div className="cd-num">{d}</div>
          {hasDot&&<div className="cd-dots"><div className="cd-dot"/></div>}
        </div>
      );
    }
    return(
      <>
        <StepsHdr/>
        <div className="cal-wrap">
          <div className="cal-nav">
            <div className="cal-arrow" onClick={()=>{let m=calMonth-1,y=calYear;if(m<0){m=11;y--;}setCalMonth(m);setCalYear(y);}}>‹</div>
            <div className="cal-month">{MONTH_NAMES[calMonth]} {calYear}</div>
            <div className="cal-arrow" onClick={()=>{let m=calMonth+1,y=calYear;if(m>11){m=0;y++;}setCalMonth(m);setCalYear(y);}}>›</div>
          </div>
          <div className="cal-grid">
            {DOW.map(d=><div key={d} className="cal-dow">{d}</div>)}
            {cells}
          </div>
        </div>
      </>
    );
  }

  /* Time Slots */
  function TimeSlotsView(){
    if(!selDate) return null;
    const dt=new Date(selDate.y,selDate.m,selDate.d);
    const dtStr=`${DOW_LONG[dt.getDay()]}, ${MONTH_NAMES[selDate.m]} ${selDate.d}`;
    const mkSlot=(s:Slot)=>(
      <div key={s.id} className={`slot ${s.available?"avail":"taken"}${selSlot?.id===s.id?" sel":""}`}
        onClick={()=>{ if(!s.available) return; setSelSlot(s); setStep(3); }}>
        <div className="slot-time"><span className="slot-time-icon">🕐</span>{s.time}</div>
        <span className={`slot-badge ${s.available?"av":"tk"}`}>{s.available?"Available":"Taken"}</span>
      </div>
    );
    return(
      <>
        <StepsHdr/>
        <div className="time-wrap">
          <button className="tw-back" onClick={()=>setStep(1)}>‹ Back to calendar</button>
          <div className="tw-title">Select a time on {dtStr}</div>
          <div className="tw-sections">
            <div><div className="tw-sec-lbl">Morning</div><div className="slot-list">{MORNING.map(mkSlot)}</div></div>
            <div><div className="tw-sec-lbl">Afternoon</div><div className="slot-list">{AFTERNOON.map(mkSlot)}</div></div>
          </div>
        </div>
      </>
    );
  }

  /* Confirm */
  function ConfirmView(){
    if(!selDate||!selSlot||!selCand) return null;
    const dt=new Date(selDate.y,selDate.m,selDate.d);
    const dtStr=`${DOW_LONG[dt.getDay()]}, ${MONTH_NAMES[selDate.m]} ${selDate.d} at ${selSlot.time}`;
    const [bg,fg]=avColor(selCand.name||"?");

    return(
      <>
        <StepsHdr/>
        <div className="confirm-wrap">
          <div className="int-summary">
            <span className="int-sum-icon">🗓️</span>
            <div>
              <div className="int-sum-dt">{dtStr}</div>
              <div className="int-sum-meta">
                <div><span className="int-sum-lbl">Position: </span><span className="int-sum-val">{selCand.job_title||"—"}</span></div>
                <div><span className="int-sum-lbl">Candidate: </span><span className="int-sum-val">{selCand.name}</span></div>
              </div>
            </div>
          </div>

          <div className="confirm-grid">
            {/* Candidates column */}
            <div>
              <div className="conf-title">Candidate</div>
              {[selCand].map((c,i)=>{
                const[cbg,cfg]=avColor(c.name||"?");
                return(
                  <div key={i} className="cand-card sel">
                    <div className="cc-av" style={{background:cbg,color:cfg}}>{ini(c.name||"?")}</div>
                    <div style={{flex:1}}>
                      <div className="cc-nm">{c.name}</div>
                      <div className="cc-role">{c.job_title}</div>
                      <div className="cc-email">{c.email}</div>
                      {c.resume_path&&<div className="cc-resume">📄 Resume available</div>}
                    </div>
                    <div className="cc-check">✓</div>
                  </div>
                );
              })}
            </div>

            {/* Interviewers column */}
            <div>
              <div className="conf-title">Interviewers</div>
              {interviewers.map(iv=>(
                <div key={iv.id} className="int-row">
                  <div className="int-av">{iv.name.charAt(0)}</div>
                  <div style={{flex:1}}>
                    <div className="int-nm">{iv.name}</div>
                    <div className="int-role">{iv.role}</div>
                  </div>
                  <input type="checkbox" className="int-cb" checked={iv.checked}
                    onChange={()=>setInterviewers(ivs=>ivs.map(x=>x.id===iv.id?{...x,checked:!x.checked}:x))}/>
                </div>
              ))}
            </div>
          </div>

          {/* JD Section */}
          <div className="jd-section">
            <div className="jd-hdr">
              <span className="conf-title" style={{margin:0}}>Job Description (Optional)</span>
              <button className="jd-add" onClick={()=>setShowJD(true)}>✏️ Add JD</button>
            </div>
            <textarea className="jd-textarea" readOnly placeholder="No job description — system will use generic or candidate profile."
              value={jobDesc||""}/>
          </div>

          {/* Method */}
          <div className="method-section">
            <div className="conf-title">Interview Method</div>
            <div className="method-grid">
              {[
                {icon:"📹",title:"AI-Powered Video Interview",sub:"Secure link sent automatically",
                 feats:["✓ Knowledge base from resume","✓ JD auto-used","✓ Email confirmation"]},
                {icon:"📍",title:"In-Person Interview",sub:"Office location shared",feats:[]},
              ].map((m,i)=>(
                <div key={i} className={`method-card${selMethod===i?" sel":""}`} onClick={()=>setSelMethod(i)}>
                  <div className="mc-icon">{m.icon}</div>
                  <div className="mc-title">{m.title}</div>
                  <div className="mc-sub">{m.sub}</div>
                  {m.feats.map((f,j)=><div key={j} className="mc-feat">{f}</div>)}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="confirm-actions">
          <button className="btn-cancel" onClick={()=>{setStep(1);setSelDate(null);setSelSlot(null);}}>Cancel</button>
          <button className="btn-confirm" disabled={scheduling} onClick={async()=>{
            if(!selCand||!selDate||!selSlot) return;
            setScheduling(true);
            const dtISO=slotToDate(new Date(selDate.y,selDate.m,selDate.d),selSlot.time).toISOString();
            const res=await scheduleInterview({
              candidate_id:selCand.id,email:selCand.email,
              date_iso:dtISO,time_slot:selSlot.time,
              ...(jobDesc?{job_description:jobDesc}:{})
            });
            setResult(res);setScheduling(false);setStep(0);
            setCandidates(cs=>cs.map(c=>c.id===selCand.id?{...c,interview_scheduled:true,interview_status:"scheduled"}:c));
          }}>
            {scheduling?"⏳ Scheduling…":"⚡ Schedule Interview"}
          </button>
        </div>
      </>
    );
  }

  /* Panel content */
  function PanelContent(){
    if(result){
      return(
        <div className="result-card">
          <div className="result-icon">{result.success?"🎉":"⚠️"}</div>
          <div className="result-title">{result.success?"Interview Scheduled!":result.message||"Scheduled locally"}</div>
          {result.interview_link&&<a className="result-link" href={result.interview_link} target="_blank">{result.interview_link}</a>}
          <div className="result-meta">
            {result.email_sent&&<span>✅ Email sent</span>}
            {result.resume_extracted&&<span>📄 Resume extracted</span>}
            {result.knowledge_base_id&&<span>🧠 KB: {result.knowledge_base_id}</span>}
          </div>
          <button className="btn-cancel" style={{marginTop:14}} onClick={()=>setResult(null)}>
            Schedule Another
          </button>
        </div>
      );
    }
    if(selIdx<0) return(
      <div className="empty-state">
        <div className="empty-icon">🗓️</div>
        <div className="empty-title">Select a candidate</div>
        <div className="empty-sub">Choose from the queue to schedule or view interview details.</div>
      </div>
    );
    if(step===1) return <CalendarView/>;
    if(step===2) return <TimeSlotsView/>;
    if(step===3) return <ConfirmView/>;
    return(
      <div className="empty-state">
        <div className="empty-icon">🗓️</div>
        <div className="empty-title">Select a candidate</div>
        <div className="empty-sub">Choose from the queue to schedule or view interview details.</div>
      </div>
    );
  }

  /* JD Modal */
  function JDModal(){
    if(!showJD) return null;
    const content=(
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.55)",zIndex:9996,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}
        onClick={e=>{if(e.target===e.currentTarget)setShowJD(false);}}>
        <div style={{background:"var(--card-bg)",border:"1px solid var(--card-bd)",borderRadius:16,width:"100%",maxWidth:560,padding:"1.4rem",backdropFilter:"blur(20px)"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1rem"}}>
            <span style={{fontFamily:"var(--serif)",fontSize:"1rem",color:"var(--tx)"}}>Add / Edit Job Description</span>
            <button style={{background:"var(--glass2)",border:"1px solid var(--card-bd)",borderRadius:8,color:"var(--tx3)",cursor:"pointer",width:26,height:26,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={()=>setShowJD(false)}>×</button>
          </div>
          <textarea
            style={{width:"100%",minHeight:180,background:"var(--glass2)",border:"1px solid var(--card-bd)",borderRadius:9,padding:".65rem .85rem",fontSize:".78rem",color:"var(--tx)",fontFamily:"var(--sans)",resize:"none",outline:"none"}}
            placeholder="Enter detailed job description…"
            value={jobDesc} onChange={e=>setJobDesc(e.target.value)}/>
          <div style={{display:"flex",gap:".7rem",marginTop:"1rem",justifyContent:"flex-end"}}>
            <button className="btn-cancel" onClick={()=>setShowJD(false)}>Cancel</button>
            <button className="btn-confirm" onClick={()=>setShowJD(false)}>Save Job Description</button>
          </div>
        </div>
      </div>
    );
    return mounted?createPortal(content,document.body):null;
  }

  /* Nav Panel portal */
  function NavPortal(){
    if(!mounted) return null;
    const content=(
      <>
        {fabOpen&&<div style={{position:"fixed",inset:0,zIndex:9996}} onClick={()=>setFabOpen(false)}/>}
        <div
          className={`fab${fabOpen?" open":""}`}
          style={{left:fabPos.left,top:fabPos.top}}
          onMouseDown={onFabDown}
        >
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2"/>
            <polyline points="2 17 12 22 22 17"/>
            <polyline points="2 12 12 17 22 12"/>
          </svg>
        </div>

        <div className={`nav-panel${fabOpen?" show":""}`} style={{left:panelPos.left,top:panelPos.top}}>
          <div className="np-hdr"><span className="np-title">Navigation</span><button className="np-x" onClick={()=>setFabOpen(false)}>✕</button></div>
          <div className="np-curr"><div><div className="np-clbl">Current page</div><div className="np-cnm">Scheduling</div></div><div className="np-cdot"/></div>
          <div className="np-sec">Recruitment</div>
          <a className="np-item" href="/dashboard"><div className="np-ic">📊</div><div><div className="np-nm">Dashboard</div><div className="np-sub">Recruitment overview</div></div></a>
          <a className="np-item" href="/candidates"><div className="np-ic">👥</div><div><div className="np-nm">Candidates</div><div className="np-sub">Manage applicants</div></div></a>
          <a className="np-item nact" href="/scheduler"><div className="np-ic">🗓️</div><div><div className="np-nm">Scheduling</div><div className="np-sub">Interview calendar</div></div></a>
          <div className="np-div"/>
          <div className="np-sec">Screening</div>
          <a className="np-item" href="/assessments"><div className="np-ic">📋</div><div><div className="np-nm">Assessments</div><div className="np-sub">Tests &amp; evaluations</div></div></a>
          <a className="np-item" href="/interview-results"><div className="np-ic">🎯</div><div><div className="np-nm">Interview Results</div><div className="np-sub">Review outcomes</div></div><span className="np-bdg">5</span></a>
          <div className="np-div"/>
          <div className="np-sec">Tools</div>
          <a className="np-item" href="#"><div className="np-ic">🤖</div><div><div className="np-nm">ATS Checking</div><div className="np-sub">AI-powered screening</div></div><span className="np-ai">AI</span></a>
          <a className="np-item" href="#"><div className="np-ic">📈</div><div><div className="np-nm">Reports</div><div className="np-sub">Analytics &amp; insights</div></div></a>
          <div className="np-div"/>
          <div className={`np-tog-row${theme==="light"?" light":""}`} onClick={toggleTheme}>
            <span className="np-tog-lbl">{theme==="dark"?"🌙 Dark Mode":"☀️ Light Mode"}</span>
            <div className="np-tog-switch">
              <span className="np-inner-lbl">{theme==="dark"?"Dark":"Light"}</span>
              <div className="np-trk"><div className="np-thumb"/></div>
            </div>
          </div>
        </div>
      </>
    );
    return createPortal(content,document.body);
  }

  return(
    <div className="page" data-sch-theme={theme}>
      <style dangerouslySetInnerHTML={{__html:GLOBAL_CSS}}/>

      {/* KPI Strip */}
      <div className="kpi-strip">
        {[
          {lbl:"Total Scheduled",val:stats.total,  desc:"All time interviews",   bar:"var(--kpi-bd1)"},
          {lbl:"Today",          val:stats.today,  desc:"Interviews today",      bar:"var(--kpi-bd2)"},
          {lbl:"This Week",      val:stats.week,   desc:"Scheduled this week",   bar:"var(--kpi-bd3)"},
          {lbl:"Pending",        val:stats.pending,desc:"Awaiting schedule",     bar:"var(--kpi-bd4)"},
        ].map(k=>(
          <div key={k.lbl} className="ks-item" style={{borderBottomColor:k.bar}}>
            <div className="ks-lbl">{k.lbl}</div>
            <div className="ks-val">{k.val}</div>
            <div className="ks-desc">{k.desc}</div>
          </div>
        ))}
      </div>

      {/* AI Banner */}
      <div className="ai-banner">
        ⚡ <strong>AI Auto mode:</strong> calendar → time slot → auto-generate link &amp; send email
      </div>

      {/* Main */}
      <div className="main">
        {/* Sidebar */}
        <div className="sb">
          <div className="sb-hdr">
            <div className="sb-top">
              <span className="sb-title">Select Candidate</span>
              <span className="sb-cnt">{filtered.length} of {candidates.length}</span>
            </div>
            <div className="sb-search">
              <span style={{color:"var(--tx3)",fontSize:".8rem"}}>🔍</span>
              <input placeholder="Search candidates…" value={searchQ} onChange={e=>setSearchQ(e.target.value)}/>
            </div>
            <div className="sb-filters">
              {["all","pending","scheduled","completed","cancelled"].map(f=>(
                <button key={f} className={`sf${sfFilter===f?" on":""}`} onClick={()=>setSfFilter(f)}>
                  {f.charAt(0).toUpperCase()+f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="sb-sort">
            <span className="sort-lbl">Sort by</span>
            <button className="sort-btn">Score ↓</button>
          </div>

          <div className="cand-list">
            {filtered.map((c,i)=>{
              const[bg,fg]=avColor(c.name||"?");
              const isScheduled=c.interview_status==="scheduled"||c.interview_scheduled;
              return(
                <div key={c.id} className={`ci${selIdx===i?" on":""}`} onClick={()=>{setSelIdx(i);setStep(1);setSelDate(null);setSelSlot(null);setResult(null);}}>
                  <div className="c-av" style={{background:bg,color:fg,borderColor:fg+"40"}}>{ini(c.name||"?")}</div>
                  <div className="c-info">
                    <div className="c-nm">{c.name}</div>
                    <div className="c-role">{c.job_title}</div>
                    <div className="c-meta">
                      <span className={`c-tag ${isScheduled?"sched":"pend"}`}>{isScheduled?"Scheduled":"Pending"}</span>
                      <span className="c-date">{c.interview_date?fmtDate(c.interview_date):"No date"}</span>
                    </div>
                  </div>
                  <div className="c-score">{c.ats_score||"—"}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Panel */}
        <div className="panel">
          <PanelContent/>
        </div>
      </div>

      {/* Theme toggle */}
      <div className="theme-toggle-bar" onClick={toggleTheme}>
        <span className="tog-icon">{theme==="dark"?"🌙":"☀️"}</span>
        <span className="tog-label-txt">{theme==="dark"?"Dark Mode":"Light Mode"}</span>
        <div className="tog-track"><div className="tog-thumb"/></div>
      </div>

      <JDModal/>
      <NavPortal/>
    </div>
  );
}