/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import type { InterviewRow, Verdict } from "./CandidatesTable";

interface LiveSessionsProps {
  results: InterviewRow[];
  theme?:  "dark" | "light";
}

/* ─────────────────────────────────────────────────────────────────────────────
   CSS — mirrors HTML side-column cards exactly
───────────────────────────────────────────────────────────────────────────── */
const SIDE_CSS = `
@keyframes sc-fup { to { opacity:1; transform:translateY(0); } }

/* ── Shared card shell ── */
.sc-card {
  background: var(--card-bg); border: 1px solid var(--card-bd);
  border-radius: 14px; padding: 1.2rem;
  backdrop-filter: blur(16px); transition: background .35s, border-color .35s;
  opacity: 0; transform: translateY(14px); animation: sc-fup .4s ease forwards;
}
[data-ir-theme="light"] .sc-card { background: #fff; box-shadow: 0 1px 6px rgba(0,0,0,.06); }

.sc-card-hdr {
  display: flex; align-items: center; justify-content: space-between; margin-bottom: .9rem;
}
.sc-title { font-size: .82rem; font-weight: 700; color: var(--tx); transition: color .35s; }
.sc-view-all { font-size: .72rem; color: var(--acc); cursor: pointer; font-weight: 500; transition: color .2s; }
.sc-view-all:hover { color: var(--acc3); }

/* ── Ring ── */
.sc-ring-wrap { display: flex; align-items: center; gap: 14px; margin-bottom: 1rem; }
.sc-ring-svg  { position: relative; width: 64px; height: 64px; flex-shrink: 0; }
.sc-ring-svg svg { transform: rotate(-90deg); }
.sc-ring-lbl  { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.sc-ring-pct  { font-family: var(--serif); font-size: .95rem; font-weight: 700; color: var(--tx); line-height: 1; transition: color .35s; }
.sc-ring-sublbl { font-size: .62rem; color: var(--tx3); margin-bottom: .18rem; transition: color .35s; }
.sc-ring-big    { font-family: var(--serif); font-size: 1.35rem; font-weight: 700; color: var(--tx); line-height: 1; transition: color .35s; }
.sc-ring-tiny   { font-size: .6rem; color: var(--tx3); margin-top: .15rem; transition: color .35s; }

/* ── Verdict list ── */
.sc-vl-row { display: flex; align-items: center; gap: 8px; margin-bottom: .5rem; }
.sc-vl-dot  { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.sc-vl-nm   { font-size: .73rem; color: var(--tx2); flex: 1; transition: color .35s; }
.sc-vl-val  { font-size: .73rem; font-weight: 600; color: var(--tx); transition: color .35s; }

/* ── Criteria bars ── */
.sc-crit-rows { display: flex; flex-direction: column; gap: .55rem; }
.sc-crit-row  { display: flex; align-items: center; gap: 9px; }
.sc-crit-lbl  { font-size: .7rem; color: var(--tx3); width: 118px; flex-shrink: 0; transition: color .35s; }
.sc-crit-bar-wrap { flex: 1; height: 5px; border-radius: 3px; background: var(--bar-bg); overflow: hidden; }
.sc-crit-fill     { height: 100%; border-radius: 3px; background: var(--acc); transition: width 1.2s cubic-bezier(.4,0,.2,1); }
.sc-crit-val  { font-size: .7rem; font-weight: 600; color: var(--tx); width: 16px; text-align: right; transition: color .35s; }

/* ── Upcoming ── */
.sc-upc-item {
  display: flex; align-items: flex-start; gap: 10px; padding: .65rem .75rem;
  background: var(--glass2); border: 1px solid var(--card-bd); border-radius: 10px;
  transition: all .18s; margin-bottom: .65rem;
}
.sc-upc-item:last-child { margin-bottom: 0; }
.sc-upc-item:hover { border-color: var(--acc); background: var(--accs); }
.sc-upc-hr   { font-size: .82rem; font-weight: 700; color: var(--tx); line-height: 1.1; transition: color .35s; }
.sc-upc-ampm { font-size: .58rem; color: var(--tx3); }
.sc-upc-nm   { font-size: .78rem; font-weight: 600; color: var(--tx); transition: color .35s; }
.sc-upc-role { font-size: .63rem; color: var(--tx3); margin-top: .05rem; }
.sc-upc-tag  {
  font-size: .57rem; font-weight: 600; background: var(--accs); color: var(--acc);
  border: 1px solid var(--bd); padding: .1rem .38rem; border-radius: 4px; white-space: nowrap; flex-shrink: 0;
}

/* ── Activity ── */
.sc-act-item { display: flex; align-items: flex-start; gap: 10px; margin-bottom: .6rem; }
.sc-act-item:last-child { margin-bottom: 0; }
.sc-act-icon {
  width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; font-size: .7rem;
}
.sc-act-txt  { font-size: .75rem; color: var(--tx2); line-height: 1.4; transition: color .35s; }
.sc-act-txt strong { color: var(--tx); font-weight: 600; }
.sc-act-ago  { font-size: .62rem; color: var(--tx3); margin-top: .1rem; }
`;

/* ── Verdict config ── */
const VERDICT_DOTS: Record<Verdict, string> = {
  offer_extended: "var(--acc)",
  next_round:     "var(--blue)",
  on_hold:        "var(--amber)",
  rejected:       "var(--red)",
  pending:        "var(--tx3)",
};
const VERDICT_LABEL: Record<Verdict, string> = {
  offer_extended: "Offer Extended",
  next_round:     "Next Round",
  on_hold:        "On Hold",
  rejected:       "Rejected",
  pending:        "Pending",
};

/* ── Static demo data — matches HTML exactly ── */
const UPCOMING = [
  { time: "10:00", ampm: "AM", name: "Riya Kapoor",  role: "ML Engineer · Technical · R2",            tag: "Rahul M"   },
  { time: "11:30", ampm: "AM", name: "Nikhil Gupta", role: "Python Developer · HR Round · Final",      tag: "Preethi S" },
  { time: "2:00",  ampm: "PM", name: "Asha Iyer",    role: "UX Designer · Technical · R1",             tag: "Sanjay N"  },
  { time: "4:30",  ampm: "PM", name: "Kiran Das",    role: "Data Scientist · Technical · R2",          tag: "Deepa K"   },
];

const ACTIVITIES = [
  { icon: "✓",  bg: "rgba(0,214,143,.15)",  col: "#00d68f", txt: <><strong>Lakshmi Nair</strong> received an offer for Senior Software Engineer</>, ago: "2h ago" },
  { icon: "🗓", bg: "rgba(96,165,250,.12)",  col: "#60a5fa", txt: <>Interview scheduled for <strong>Riya Kapoor</strong> — ML Engineer R2</>,         ago: "3h ago" },
  { icon: "✕",  bg: "rgba(248,113,113,.12)", col: "#f87171", txt: <><strong>Rohit Kumar</strong> marked as rejected for Medical Coding</>,             ago: "5h ago" },
  { icon: "★",  bg: "rgba(251,191,36,.12)",  col: "#fbbf24", txt: <><strong>Kiran Mehta</strong> scored 91/100 in Final round interview</>,            ago: "Yesterday" },
  { icon: "⏸", bg: "rgba(167,139,250,.12)", col: "#a78bfa", txt: <><strong>Vikram Singh</strong> moved to On Hold — pending final review</>,          ago: "Yesterday" },
  { icon: "→",  bg: "rgba(0,214,143,.12)",   col: "#00d68f", txt: <><strong>Arjun Sharma</strong> passed R1 — moved to Round 2</>,                    ago: "2d ago" },
];

const CRITERIA = ["Technical Skills","Communication","Problem Solving","Cultural Fit","Leadership Potential"];

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────────────── */
const LiveSessions: React.FC<LiveSessionsProps> = ({ results }) => {
  const total     = results.length;
  const offers    = results.filter(r => r.verdict === "offer_extended").length;
  const offerRate = total > 0 ? Math.round((offers / total) * 100) : 0;

  /* Ring */
  const R    = 26, circ = 2 * Math.PI * R;
  const dash = (offerRate / 100) * circ;

  /* Verdict counts */
  const counts: Record<Verdict, number> = {
    offer_extended: 0, next_round: 0, on_hold: 0, rejected: 0, pending: 0,
  };
  results.forEach(r => { if (counts[r.verdict] !== undefined) counts[r.verdict]++; });

  /* Criteria averages */
  const criteriaAvgs = CRITERIA.map(k => {
    const vals = results.filter(r => r.criteria?.[k] != null).map(r => r.criteria![k] as number);
    return { key: k, avg: vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0 };
  });

  return (
    <>
      <style>{SIDE_CSS}</style>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>

        {/* ── Verdict Overview ── */}
        <div className="sc-card" style={{ animationDelay: ".3s" }}>
          <div className="sc-title" style={{ marginBottom: "1rem" }}>Verdict Overview</div>
          <div className="sc-ring-wrap">
            <div className="sc-ring-svg">
              <svg width="64" height="64" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r={R} fill="var(--ring-bg)" stroke="var(--card-bd)" strokeWidth="5" />
                <circle cx="32" cy="32" r={R} fill="none" stroke="var(--ring-stroke)" strokeWidth="5"
                  strokeDasharray={`${dash.toFixed(1)} ${circ.toFixed(1)}`}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)" }}
                />
              </svg>
              <div className="sc-ring-lbl">
                <span className="sc-ring-pct">{offerRate}%</span>
              </div>
            </div>
            <div>
              <div className="sc-ring-sublbl">Offer rate</div>
              <div className="sc-ring-big" style={{ color: "var(--ring-stroke)" }}>{offerRate}%</div>
              <div className="sc-ring-tiny">{offers} offers from {total} interviews</div>
            </div>
          </div>
          <div>
            {(["offer_extended","next_round","on_hold","rejected","pending"] as Verdict[]).map(v => (
              <div key={v} className="sc-vl-row">
                <div className="sc-vl-dot" style={{ background: VERDICT_DOTS[v] }} />
                <span className="sc-vl-nm">{VERDICT_LABEL[v]}</span>
                <span className="sc-vl-val">{counts[v]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Avg Score by Criteria ── */}
        <div className="sc-card" style={{ animationDelay: ".36s" }}>
          <div className="sc-title" style={{ marginBottom: "1rem" }}>Avg Score by Criteria</div>
          <div className="sc-crit-rows">
            {criteriaAvgs.map(c => (
              <div key={c.key} className="sc-crit-row">
                <span className="sc-crit-lbl">{c.key}</span>
                <div className="sc-crit-bar-wrap">
                  <div className="sc-crit-fill" style={{ width: `${c.avg}%` }} />
                </div>
                <span className="sc-crit-val">{c.avg}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Upcoming Interviews ── */}
        <div className="sc-card" style={{ animationDelay: ".42s" }}>
          <div className="sc-card-hdr">
            <span className="sc-title">Upcoming Interviews</span>
            <span className="sc-view-all">View all</span>
          </div>
          <div>
            {UPCOMING.map((u, i) => (
              <div key={i} className="sc-upc-item">
                <div style={{ flexShrink: 0, textAlign: "center" }}>
                  <div className="sc-upc-hr">{u.time}</div>
                  <div className="sc-upc-ampm">{u.ampm}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="sc-upc-nm">{u.name}</div>
                  <div className="sc-upc-role">{u.role}</div>
                </div>
                <div className="sc-upc-tag">{u.tag}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Recent Activity ── */}
        <div className="sc-card" style={{ animationDelay: ".48s" }}>
          <div className="sc-card-hdr">
            <span className="sc-title">Recent Activity</span>
          </div>
          <div>
            {ACTIVITIES.map((a, i) => (
              <div key={i} className="sc-act-item">
                <div className="sc-act-icon" style={{ background: a.bg, color: a.col }}>{a.icon}</div>
                <div style={{ flex: 1 }}>
                  <div className="sc-act-txt">{a.txt}</div>
                  <div className="sc-act-ago">{a.ago}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
};

export default LiveSessions;