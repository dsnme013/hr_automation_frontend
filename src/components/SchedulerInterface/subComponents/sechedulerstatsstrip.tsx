/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";

interface Props {
  stats: { total: number; today: number; week: number; pending: number };
}

export default function StatsStrip({ stats }: Props) {
  const cards = [
    { lbl:"Total Scheduled", val:stats.total,   desc:"All time interviews",  bar:"var(--kpi-bd1)" },
    { lbl:"Today",           val:stats.today,   desc:"Interviews today",     bar:"var(--kpi-bd2)" },
    { lbl:"This Week",       val:stats.week,    desc:"Scheduled this week",  bar:"var(--kpi-bd3)" },
    { lbl:"Pending",         val:stats.pending, desc:"Awaiting schedule",    bar:"var(--kpi-bd4)" },
  ];
  return (
    <div className="kpi-strip">
      {cards.map(c => (
        <div key={c.lbl} className="ks-item" style={{ borderBottomColor: c.bar }}>
          <div className="ks-lbl">{c.lbl}</div>
          <div className="ks-val">{c.val}</div>
          <div className="ks-desc">{c.desc}</div>
        </div>
      ))}
    </div>
  );
}