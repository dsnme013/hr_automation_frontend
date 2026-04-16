/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useMemo } from "react";
import { Candidate, AssessmentStats } from "@/services/interfaces/CandidateScreening";

interface OverviewTabProps {
  candidates: Candidate[];
  assessmentStats: AssessmentStats;
  onEditSettings?: () => void;
}

/* Score bucket definitions — mirrors HTML dist rows */
const SCORE_BUCKETS = [
  { label: "90–100",   min: 90, max: 100, color: "var(--acc)"    },
  { label: "70–89",    min: 70, max: 89,  color: "var(--blue)"   },
  { label: "50–69",    min: 50, max: 69,  color: "var(--amber)"  },
  { label: "Below 50", min: 0,  max: 49,  color: "var(--red)"    },
];

/* Status-list dot colours — mirrors HTML STAT_DOTS */
const STAT_DOTS: Record<string, string> = {
  "Not sent":    "#4b6080",
  "Sent":        "var(--blue)",
  "In Progress": "var(--purple)",
  "Passed":      "var(--acc)",
  "Failed":      "var(--red)",
};

/* CSS — mirrors HTML .overview-card, .dist-card, .settings-card */
const CSS = `
@keyframes am-ov-fup { to { opacity:1; transform:translateY(0); } }

.am-side-col {
  display: flex; flex-direction: column; gap: 1.1rem;
}

/* Base card */
.am-side-card {
  background: var(--card-bg);
  border: 1px solid var(--card-bd);
  border-radius: 14px;
  backdrop-filter: blur(16px);
  overflow: hidden;
  transition: background .35s, border-color .35s;
  opacity: 0; transform: translateY(14px);
}
.am-side-card-1 { animation: am-ov-fup .4s ease .32s forwards; }
.am-side-card-2 { animation: am-ov-fup .4s ease .38s forwards; }
.am-side-card-3 { animation: am-ov-fup .4s ease .44s forwards; }

.am-side-card-body { padding: 1.2rem; }

/* Card header row */
.am-side-card-hdr {
  display: flex; align-items: center; justify-content: space-between;
  padding: .85rem 1.1rem;
  border-bottom: 1px solid var(--card-bd);
  transition: border-color .35s;
}
.am-side-card-title {
  font-size: .82rem; font-weight: 700;
  color: var(--tx); transition: color .35s;
}
.am-btn-edit {
  font-size: .7rem; font-weight: 600;
  color: var(--acc); background: var(--accs);
  border: 1px solid var(--bd); padding: .2rem .6rem;
  border-radius: 6px; cursor: pointer;
  font-family: var(--sans); transition: all .2s;
}
.am-btn-edit:hover { background: var(--acc); color: var(--btn-text); }

/* ── Completion ring ── */
.am-ring-wrap {
  display: flex; align-items: center; gap: 16px; margin-bottom: 1.1rem;
}
.am-ring-svg { position: relative; width: 68px; height: 68px; flex-shrink: 0; }
.am-ring-svg svg { transform: rotate(-90deg); }
.am-ring-pct-label {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
}
.am-ring-pct {
  font-family: var(--serif); font-size: 1rem; font-weight: 700;
  color: var(--tx); line-height: 1; transition: color .35s;
}
.am-ring-rate-lbl { font-size: .65rem; color: var(--tx3); margin-bottom: .2rem; transition: color .35s; }
.am-ring-rate-val {
  font-family: var(--serif); font-size: 1.4rem; font-weight: 700;
  color: var(--tx); line-height: 1; transition: color .35s;
}
.am-ring-sub { font-size: .62rem; color: var(--tx3); margin-top: .15rem; transition: color .35s; }

/* Status list */
.am-status-list { display: flex; flex-direction: column; gap: .55rem; }
.am-sl-row { display: flex; align-items: center; gap: 8px; }
.am-sl-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.am-sl-nm  { font-size: .73rem; color: var(--tx2); flex: 1; transition: color .35s; }
.am-sl-val { font-size: .73rem; font-weight: 600; color: var(--tx); transition: color .35s; }

/* ── Score distribution ── */
.am-dist-rows { display: flex; flex-direction: column; gap: .6rem; }
.am-dist-row  { display: flex; align-items: center; gap: 10px; }
.am-dist-lbl  { font-size: .7rem; color: var(--tx3); width: 60px; flex-shrink: 0; transition: color .35s; }
.am-dist-bar-bg {
  flex: 1; height: 6px; border-radius: 3px;
  background: var(--dist-bar-bg); overflow: hidden;
}
.am-dist-bar-fill { height: 100%; border-radius: 3px; transition: width 1.2s cubic-bezier(.4,0,.2,1); }
.am-dist-count { font-size: .7rem; font-weight: 600; color: var(--tx); width: 14px; text-align: right; transition: color .35s; }

/* ── Assessment settings rows ── */
.am-set-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: .7rem 1.1rem; border-bottom: 1px solid var(--card-bd);
  font-size: .78rem; transition: border-color .35s;
}
.am-set-row:last-child { border-bottom: none; }
.am-set-key { color: var(--tx3); transition: color .35s; }
.am-set-val { font-weight: 600; color: var(--tx); transition: color .35s; }
`;

const OverviewTab: React.FC<OverviewTabProps> = ({ candidates, onEditSettings }) => {
  const total     = candidates.length;
  const sent      = candidates.filter(c => c.exam_link_sent).length;
  const completed = candidates.filter(c => c.exam_completed).length;
  const passed    = candidates.filter(c => c.exam_completed && (c.exam_percentage ?? 0) >= 70).length;
  const failed    = candidates.filter(c => c.exam_completed && (c.exam_percentage ?? 0) < 70).length;
  const inProg    = candidates.filter(c => c.exam_started && !c.exam_completed).length;
  const notSent   = candidates.filter(c => !c.exam_link_sent).length;
  const pct       = total > 0 ? Math.round((completed / total) * 100) : 0;

  /* SVG ring */
  const R    = 28;
  const circ = 2 * Math.PI * R;
  const dash = (pct / 100) * circ;

  /* Score buckets */
  const scores = useMemo(
    () => candidates.filter(c => c.exam_percentage != null).map(c => c.exam_percentage as number),
    [candidates]
  );
  const maxBucket = Math.max(
    ...SCORE_BUCKETS.map(b => scores.filter(s => s >= b.min && s <= b.max).length),
    1
  );

  /* Status list rows — mirrors HTML renderRing() statuses array */
  const statusRows = [
    { label: "Not sent",    count: notSent                       },
    { label: "Sent",        count: Math.max(sent - inProg - completed, 0) },
    { label: "In Progress", count: inProg                        },
    { label: "Passed",      count: passed                        },
    { label: "Failed",      count: failed                        },
  ];

  /* Assessment settings — mirrors HTML renderSettings() */
  const settings = [
    ["Title",         "Technical Screening Test"],
    ["Duration",      "30 minutes"],
    ["Passing Score", "70%"],
    ["Deadline",      "7 days after sending"],
    ["Questions",     "8 questions"],
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="am-side-col">

        {/* ── Completion Overview ── */}
        <div className="am-side-card am-side-card-1">
          <div className="am-side-card-hdr">
            <span className="am-side-card-title">Completion Overview</span>
          </div>
          <div className="am-side-card-body">
            {/* Ring + rate */}
            <div className="am-ring-wrap">
              <div className="am-ring-svg">
                <svg width="68" height="68" viewBox="0 0 68 68">
                  <circle
                    cx="34" cy="34" r={R}
                    fill="var(--ring-bg)"
                    stroke="var(--card-bd)"
                    strokeWidth="6"
                  />
                  <circle
                    cx="34" cy="34" r={R}
                    fill="none"
                    stroke="var(--ring-stroke)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${dash.toFixed(1)} ${circ.toFixed(1)}`}
                    style={{ transition: "stroke-dasharray 1.2s cubic-bezier(.4,0,.2,1)" }}
                  />
                </svg>
                <div className="am-ring-pct-label">
                  <span className="am-ring-pct">{pct}%</span>
                </div>
              </div>
              <div>
                <div className="am-ring-rate-lbl">Completion rate</div>
                <div className="am-ring-rate-val">{pct}%</div>
                <div className="am-ring-sub">{completed} of {total} submitted</div>
              </div>
            </div>

            {/* Status list */}
            <div className="am-status-list">
              {statusRows.map(({ label, count }) => (
                <div key={label} className="am-sl-row">
                  <div className="am-sl-dot" style={{ background: STAT_DOTS[label] }} />
                  <span className="am-sl-nm">{label}</span>
                  <span className="am-sl-val">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Score Distribution ── */}
        <div className="am-side-card am-side-card-2">
          <div className="am-side-card-hdr">
            <span className="am-side-card-title">Score Distribution</span>
          </div>
          <div className="am-side-card-body">
            <div className="am-dist-rows">
              {SCORE_BUCKETS.map(b => {
                const cnt = scores.filter(s => s >= b.min && s <= b.max).length;
                const w   = cnt > 0 ? Math.round((cnt / maxBucket) * 100) : 0;
                return (
                  <div key={b.label} className="am-dist-row">
                    <span className="am-dist-lbl">{b.label}</span>
                    <div className="am-dist-bar-bg">
                      <div
                        className="am-dist-bar-fill"
                        style={{ width: `${w}%`, background: b.color }}
                      />
                    </div>
                    <span className="am-dist-count">{cnt}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Assessment Settings ── */}
        <div className="am-side-card am-side-card-3">
          <div className="am-side-card-hdr">
            <span className="am-side-card-title">Assessment Settings</span>
            <button className="am-btn-edit" onClick={onEditSettings}>Edit</button>
          </div>
          {settings.map(([key, val]) => (
            <div key={key} className="am-set-row">
              <span className="am-set-key">{key}</span>
              <span className="am-set-val">{val}</span>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default OverviewTab;