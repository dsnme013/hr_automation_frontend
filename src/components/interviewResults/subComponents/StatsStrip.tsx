/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   StatsStrip  — 5-card KPI row
   Mirrors HTML .kpi-row / .kpi-card exactly, using CSS variables for theming.
───────────────────────────────────────────────────────────────────────────── */

interface StatsStripProps {
  total:           number;
  offerExtended:   number;
  avgScore:        number;
  pendingDecision: number;
  upcomingToday:   number;
  offerRate:       number;
  theme?:          "dark" | "light";
}

const KPI_CSS = `
@keyframes ss-fup { to { opacity:1; transform:translateY(0); } }

.kpi-row {
  display: grid; grid-template-columns: repeat(5, 1fr);
  gap: 1rem; margin-bottom: 1.6rem;
}
.kpi-card {
  background: var(--card-bg); border: 1px solid var(--card-bd);
  border-left-width: 4px; border-left-style: solid;
  border-radius: 14px; padding: 1rem 1.1rem 1rem 1.3rem;
  backdrop-filter: blur(16px); position: relative; overflow: hidden;
  opacity: 0; transform: translateY(14px);
  animation: ss-fup .45s ease forwards;
  transition: background .35s, border-color .35s, transform .2s;
}
[data-ir-theme="dark"] .kpi-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, var(--bd2), transparent);
}
[data-ir-theme="light"] .kpi-card {
  background: #fff; border-color: #e2e8f0; box-shadow: 0 1px 5px rgba(0,0,0,.06);
}
.kpi-card:hover { transform: translateY(-2px) !important; box-shadow: 0 6px 24px rgba(0,0,0,.12); }

.kpi-lbl {
  font-size: .57rem; font-weight: 700; letter-spacing: .1em;
  text-transform: uppercase; color: var(--tx3); margin-bottom: .45rem; transition: color .35s;
}
.kpi-val {
  font-family: var(--serif); font-size: 2rem; line-height: 1;
  color: var(--tx); margin-bottom: .18rem; transition: color .35s;
}
.kpi-desc { font-size: .65rem; color: var(--tx3); transition: color .35s; }
.kpi-desc.green { color: var(--acc); }
.kpi-desc.blue  { color: var(--blue); }

@media(max-width:1100px) { .kpi-row { grid-template-columns: repeat(3,1fr); } }
@media(max-width:700px)  { .kpi-row { grid-template-columns: repeat(2,1fr); } }
`;

const StatsStrip: React.FC<StatsStripProps> = ({
  total, offerExtended, avgScore, pendingDecision, upcomingToday, offerRate,
}) => {
  /* Matches HTML KPI_DATA exactly */
  const cards = [
    {
      lbl:   "Total Interviews",
      val:   String(total),
      desc:  "All rounds combined",
      dCls:  "",
      bdark: "#3b82f6", blight: "#3b82f6",
      delay: ".08s",
    },
    {
      lbl:   "Offer Extended",
      val:   String(offerExtended),
      desc:  `${offerRate}% offer rate`,
      dCls:  "green",
      bdark: "#22c55e", blight: "#16a34a",
      delay: ".14s",
    },
    {
      lbl:   "Avg Score",
      val:   avgScore > 0 ? String(avgScore) : "—",
      desc:  "Out of 100",
      dCls:  "",
      bdark: "#a78bfa", blight: "#7c3aed",
      delay: ".20s",
    },
    {
      lbl:   "Pending Decision",
      val:   String(pendingDecision),
      desc:  pendingDecision > 0 ? "Awaiting verdict" : "All decided",
      dCls:  "",
      bdark: "#f59e0b", blight: "#d97706",
      delay: ".26s",
    },
    {
      lbl:   "Upcoming Today",
      val:   String(upcomingToday),
      desc:  `${upcomingToday} today`,
      dCls:  "blue",
      bdark: "#60a5fa", blight: "#2563eb",
      delay: ".32s",
    },
  ];

  return (
    <>
      <style>{KPI_CSS}</style>
      <div className="kpi-row">
        {cards.map((k, i) => (
          <div
            key={i}
            className="kpi-card"
            style={{
              borderLeftColor: k.bdark,   /* CSS vars handle colours; this gets overridden per theme */
              animationDelay: k.delay,
            }}
          >
            <div className="kpi-lbl">{k.lbl}</div>
            <div className="kpi-val">{k.val}</div>
            <div className={`kpi-desc${k.dCls ? " " + k.dCls : ""}`}>{k.desc}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default StatsStrip;