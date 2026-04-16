/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";

export interface AssessmentStats {
  totalSent: number;
  totalPending: number;
  totalCompleted: number;
  passRate: number;
  avgScore: number;
}

interface StatsCardsProps {
  stats: AssessmentStats;
}

/* Mirrors HTML KPI_GLOBAL array — left-border colour changes per light/dark */
const CARDS = [
  { key: "totalSent",      label: "Total Sent",  sub: "Assessments dispatched", darkBar: "#3b82f6", lightBar: "#2563eb" },
  { key: "totalPending",   label: "Pending",     sub: "Awaiting response",       darkBar: "#f59e0b", lightBar: "#d97706" },
  { key: "totalCompleted", label: "Completed",   sub: "Results ready",           darkBar: "#22c55e", lightBar: "#16a34a" },
  { key: "passRate",       label: "Pass Rate",   sub: "of completed",            darkBar: "#a78bfa", lightBar: "#7c3aed" },
  { key: "avgScore",       label: "Avg Score",   sub: "out of 100",              darkBar: "#00d68f", lightBar: "#059669" },
] as const;

const CSS = `
@keyframes am-kpi-fup { to { opacity:1; transform:translateY(0); } }

.am-kpi-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin-bottom: 1.75rem;
}

.am-kpi-card {
  background: var(--card-bg);
  border: 1px solid var(--card-bd);
  border-radius: 14px;
  padding: 1.1rem 1.2rem 1.1rem 1.4rem;
  backdrop-filter: blur(16px);
  position: relative; overflow: hidden;
  border-left-width: 4px; border-left-style: solid;
  opacity: 0; transform: translateY(14px);
  animation: am-kpi-fup .45s ease forwards;
  transition: transform .2s, box-shadow .2s, background .35s, border-color .35s;
}
.am-kpi-card:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 24px rgba(0,0,0,.12);
}
[data-am-theme="dark"] .am-kpi-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, var(--bd2), transparent);
}

.am-kpi-lbl {
  font-size: .58rem; font-weight: 700; letter-spacing: .1em;
  text-transform: uppercase; color: var(--tx3); margin-bottom: .5rem;
  transition: color .35s;
}
.am-kpi-val {
  font-family: var(--serif); font-size: 2rem; line-height: 1;
  color: var(--tx); margin-bottom: .2rem; transition: color .35s;
}
.am-kpi-desc { font-size: .65rem; color: var(--tx3); transition: color .35s; }

@media (max-width: 1100px) { .am-kpi-row { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 700px)  { .am-kpi-row { grid-template-columns: repeat(2, 1fr); } }
`;

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  /* Detect current theme from the nearest [data-am-theme] ancestor */
  const [isDark, setIsDark] = React.useState(true);
  React.useEffect(() => {
    const el = document.querySelector("[data-am-theme]");
    if (el) setIsDark(el.getAttribute("data-am-theme") !== "light");
    const obs = new MutationObserver(() => {
      if (el) setIsDark(el.getAttribute("data-am-theme") !== "light");
    });
    if (el) obs.observe(el, { attributes: true, attributeFilter: ["data-am-theme"] });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="am-kpi-row">
        {CARDS.map(({ key, label, sub, darkBar, lightBar }, i) => {
          const raw   = stats[key as keyof AssessmentStats];
          const value =
            key === "passRate" ? `${Number(raw).toFixed(0)}%`
            : key === "avgScore" ? (raw ? String(Math.round(Number(raw))) : "—")
            : raw;
          const bar = isDark ? darkBar : lightBar;

          return (
            <div
              key={key}
              className="am-kpi-card"
              style={{
                borderLeftColor: bar,
                animationDelay: `${.08 + i * .06}s`,
              }}
            >
              <div className="am-kpi-lbl">{label}</div>
              <div className="am-kpi-val">{value ?? "—"}</div>
              <div className="am-kpi-desc">{sub}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default StatsCards;