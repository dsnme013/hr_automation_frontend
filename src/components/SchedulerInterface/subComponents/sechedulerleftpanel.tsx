/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";

interface Candidate {
  id: string; name: string; email: string; job_title?: string;
  interview_scheduled?: boolean; interview_date?: string | null;
  interview_status?: string; ats_score?: number;
}

interface Props {
  candidates:    Candidate[];
  total:         number;
  selectedId:    string | null;
  search:        string;
  setSearch:     (v: string) => void;
  sfFilter:      string;
  setSfFilter:   (v: string) => void;
  onSelect:      (c: Candidate) => void;
}

const PALETTES: [string, string][] = [
  ["#EFF6FF","#2563EB"],["#F0FDF4","#16A34A"],["#FFF7ED","#EA580C"],
  ["#FAF5FF","#7C3AED"],["#FFF1F2","#E11D48"],["#F0FDFA","#0D9488"],
  ["#FFFBEB","#D97706"],["#FDF4FF","#A21CAF"],
];
function avColor(n: string): [string, string] {
  let h = 0;
  for (let i = 0; i < n.length; i++) h = (h * 31 + n.charCodeAt(i)) & 0xffffffff;
  return PALETTES[Math.abs(h) % PALETTES.length];
}
function ini(n: string) { return n.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase(); }
function fmtDate(s?: string | null) {
  if (!s) return "—";
  const d = new Date(s);
  return isNaN(d.getTime()) ? s : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

const FILTERS = ["all","pending","scheduled","completed","cancelled"];

export default function LeftPanel({
  candidates, total, selectedId, search, setSearch, sfFilter, setSfFilter, onSelect,
}: Props) {
  return (
    <div className="sb">
      <div className="sb-hdr">
        <div className="sb-top">
          <span className="sb-title">Select Candidate</span>
          <span className="sb-cnt">{candidates.length} of {total}</span>
        </div>
        <div className="sb-search">
          <span style={{ color: "var(--tx3)", fontSize: ".8rem" }}>🔍</span>
          <input
            placeholder="Search candidates…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="sb-filters">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`sf${sfFilter === f ? " on" : ""}`}
              onClick={() => setSfFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="sb-sort">
        <span className="sort-lbl">Sort by</span>
        <button className="sort-btn">Score ↓</button>
      </div>

      <div className="cand-list">
        {candidates.map(c => {
          const [bg, fg] = avColor(c.name || "?");
          const isScheduled = c.interview_status === "scheduled" || c.interview_scheduled;
          return (
            <div
              key={c.id}
              className={`ci${selectedId === c.id ? " on" : ""}`}
              onClick={() => onSelect(c)}
            >
              <div className="c-av" style={{ background: bg, color: fg, borderColor: fg + "40" }}>
                {ini(c.name || "?")}
              </div>
              <div className="c-info">
                <div className="c-nm">{c.name}</div>
                <div className="c-role">{c.job_title}</div>
                <div className="c-meta">
                  <span className={`c-tag ${isScheduled ? "sched" : "pend"}`}>
                    {isScheduled ? "Scheduled" : "Pending"}
                  </span>
                  <span className="c-date">
                    {c.interview_date ? fmtDate(c.interview_date) : "No date"}
                  </span>
                </div>
              </div>
              <div className="c-score">{c.ats_score || "—"}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}