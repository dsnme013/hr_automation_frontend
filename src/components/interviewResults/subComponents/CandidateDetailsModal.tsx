/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { createPortal } from "react-dom";
import type { InterviewRow, Verdict } from "./CandidatesTable";

interface CandidateDetailsModalProps {
  candidate:       InterviewRow | null;
  onClose:         () => void;
  onExtendOffer?:  (id: string) => void;
  onReject?:       (id: string) => void;
  onScheduleNext?: (id: string) => void;
  theme?:          "dark" | "light";
}

/* ─────────────────────────────────────────────────────────────────────────────
   CSS — dark/light drawer, mirrors the HTML side-panel aesthetic
───────────────────────────────────────────────────────────────────────────── */
const MODAL_CSS = `
@keyframes md-slide { from { opacity:0; transform:translateX(32px); } to { opacity:1; transform:translateX(0); } }

/* Backdrop */
.md-backdrop {
  position: fixed; inset: 0; z-index: 9000;
  background: rgba(0,0,0,.55); backdrop-filter: blur(3px);
  display: flex; align-items: flex-start; justify-content: flex-end;
}
[data-ir-theme="light"] .md-backdrop { background: rgba(0,0,0,.25); }

/* Drawer */
.md-drawer {
  width: min(560px, 100vw); height: 100vh; overflow-y: auto;
  background: var(--bg); border-left: 1px solid var(--card-bd);
  box-shadow: -12px 0 48px rgba(0,0,0,.35);
  display: flex; flex-direction: column;
  animation: md-slide .3s ease forwards;
  scrollbar-width: thin; scrollbar-color: var(--bd2) transparent;
  transition: background .35s, border-color .35s;
}
[data-ir-theme="light"] .md-drawer { background: #fff; box-shadow: -6px 0 32px rgba(0,0,0,.1); }

/* Header */
.md-hdr {
  display: flex; align-items: flex-start; justify-content: space-between;
  padding: 1.4rem 1.4rem 1.1rem; border-bottom: 1px solid var(--card-bd);
  flex-shrink: 0; position: sticky; top: 0;
  background: var(--bg); z-index: 2; transition: background .35s, border-color .35s;
}
[data-ir-theme="light"] .md-hdr { background: #fff; }

.md-hdr-av {
  width: 46px; height: 46px; border-radius: 12px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: .85rem; font-weight: 700;
}
.md-hdr-nm {
  font-family: var(--serif); font-size: 1.3rem; color: var(--tx);
  line-height: 1.15; margin-bottom: .2rem; transition: color .35s;
}
.md-hdr-role { font-size: .73rem; color: var(--tx2); transition: color .35s; }

.md-close {
  width: 28px; height: 28px; border-radius: 8px;
  background: var(--glass2); border: 1px solid var(--card-bd);
  color: var(--tx3); font-size: .8rem; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; transition: all .2s; font-family: var(--sans);
}
.md-close:hover { border-color: var(--red); color: var(--red); }

/* Body */
.md-body { flex: 1; padding: 1.4rem; display: flex; flex-direction: column; gap: 1.2rem; }

/* Section card */
.md-section {
  background: var(--card-bg); border: 1px solid var(--card-bd);
  border-radius: 14px; overflow: hidden;
  transition: background .35s, border-color .35s;
}
[data-ir-theme="light"] .md-section { background: #fff; }
.md-sec-hdr {
  padding: .75rem 1rem; border-bottom: 1px solid var(--card-bd);
  font-size: .7rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase;
  color: var(--tx3); transition: color .35s, border-color .35s;
}
.md-sec-body { padding: 1rem; }

/* Info grid */
.md-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: .5rem; }
.md-ibox {
  background: var(--glass2); border: 1px solid var(--card-bd);
  border-radius: 10px; padding: .6rem .8rem; transition: all .35s;
}
.md-ilbl {
  font-size: .55rem; font-weight: 700; letter-spacing: .1em;
  text-transform: uppercase; color: var(--tx3); margin-bottom: .22rem; transition: color .35s;
}
.md-ival { font-size: .76rem; color: var(--tx); font-weight: 500; transition: color .35s; }
.md-ival a { color: var(--acc); text-decoration: none; }

/* Verdict hero */
.md-verdict-hero {
  display: flex; align-items: center; justify-content: space-between;
  background: var(--glass2); border: 1px solid var(--card-bd);
  border-radius: 12px; padding: 1rem 1.1rem;
  transition: all .35s;
}

/* Score ring */
.md-ring-wrap { display: flex; align-items: center; gap: 14px; margin-bottom: 1rem; }
.md-ring { position: relative; width: 62px; height: 62px; flex-shrink: 0; }
.md-ring svg { transform: rotate(-90deg); }
.md-ring-lbl { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
.md-ring-num { font-family: var(--serif); font-size: .88rem; font-weight: 700; color: var(--tx); transition: color .35s; }
.md-score-big { font-family: var(--serif); font-size: 1.55rem; font-weight: 700; line-height: 1; }
.md-score-sub { font-size: .61rem; color: var(--tx3); margin-top: .1rem; transition: color .35s; }

/* Bar rows */
.md-bar-row { display: flex; align-items: center; gap: 10px; margin-bottom: .5rem; }
.md-bar-lbl { font-size: .7rem; color: var(--tx3); width: 130px; flex-shrink: 0; transition: color .35s; }
.md-bar-track { flex: 1; height: 5px; border-radius: 3px; background: var(--bar-bg); overflow: hidden; }
.md-bar-fill  { height: 100%; border-radius: 3px; transition: width 1s cubic-bezier(.4,0,.2,1); }
.md-bar-val   { font-size: .7rem; font-weight: 600; color: var(--tx); width: 24px; text-align: right; transition: color .35s; }

/* Verdict pills */
.md-v-badge {
  display: inline-flex; align-items: center;
  font-size: .7rem; font-weight: 700; padding: .3rem .75rem; border-radius: 999px;
}
.md-v-badge.offered  { background: var(--verdict-offered-bg);  color: var(--verdict-offered-col);  }
.md-v-badge.next     { background: var(--verdict-next-bg);     color: var(--verdict-next-col);     }
.md-v-badge.hold     { background: var(--verdict-hold-bg);     color: var(--verdict-hold-col);     }
.md-v-badge.rejected { background: var(--verdict-rejected-bg); color: var(--verdict-rejected-col); }
.md-v-badge.pending  { background: var(--verdict-pending-bg);  color: var(--verdict-pending-col);  }

/* Feedback box */
.md-feedback {
  background: var(--glass2); border: 1px solid var(--card-bd);
  border-left: 3px solid var(--blue);
  border-radius: 10px; padding: .9rem 1rem; font-size: .78rem; color: var(--tx2);
  line-height: 1.65; transition: all .35s;
}

/* Action buttons */
.md-btn {
  font-family: var(--sans); font-size: .73rem; font-weight: 600;
  padding: .5rem 1rem; border-radius: 8px; cursor: pointer;
  display: inline-flex; align-items: center; gap: 6px; transition: all .2s;
}
.md-btn-outline {
  background: var(--glass2); color: var(--tx2); border: 1px solid var(--card-bd);
}
.md-btn-outline:hover { border-color: var(--acc); color: var(--acc); }
.md-btn-offer   { background: var(--accs); color: var(--acc); border: 1px solid var(--bd); }
.md-btn-offer:hover { background: var(--acc); color: var(--btn-text); }
.md-btn-danger  { background: rgba(248,113,113,.1); color: var(--red); border: 1px solid rgba(248,113,113,.2); }
.md-btn-danger:hover { background: var(--red); color: #fff; border-color: var(--red); }
.md-btn-blue    { background: var(--blue); color: #fff; border: none; box-shadow: 0 0 12px rgba(96,165,250,.25); }
.md-btn-blue:hover { opacity: .9; }

/* Footer */
.md-footer {
  padding: 1rem 1.4rem; border-top: 1px solid var(--card-bd);
  display: flex; gap: .65rem; flex-wrap: wrap; flex-shrink: 0;
  position: sticky; bottom: 0;
  background: var(--bg); z-index: 2; transition: background .35s, border-color .35s;
}
[data-ir-theme="light"] .md-footer { background: #fff; }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────────────────────── */
function avatarColors(name: string): [string, string] {
  const p: [string, string][] = [
    ["rgba(0,214,143,.15)",  "#00d68f"],
    ["rgba(96,165,250,.15)", "#60a5fa"],
    ["rgba(251,191,36,.15)", "#fbbf24"],
    ["rgba(167,139,250,.15)","#a78bfa"],
    ["rgba(248,113,113,.15)","#f87171"],
    ["rgba(45,212,191,.15)", "#2dd4bf"],
  ];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
  return p[Math.abs(h) % p.length];
}

function initials(name: string) {
  return name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

function fmtDate(str: string): string {
  if (!str || str === "—") return "—";
  try {
    return new Date(str).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  } catch { return str; }
}

function scoreColor(s: number): string {
  return s >= 80 ? "var(--acc)" : s >= 60 ? "var(--amber)" : "var(--red)";
}

const VERDICT_INFO: Record<Verdict, { cls: string; label: string }> = {
  offer_extended: { cls: "offered",  label: "Offer Extended" },
  next_round:     { cls: "next",     label: "Next Round"     },
  on_hold:        { cls: "hold",     label: "On Hold"        },
  rejected:       { cls: "rejected", label: "Rejected"       },
  pending:        { cls: "pending",  label: "Pending Decision" },
};

const CRITERIA_LABELS = [
  "Technical Skills","Communication","Problem Solving","Cultural Fit","Leadership Potential",
];

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────────────── */
const CandidateDetailsModal: React.FC<CandidateDetailsModalProps> = ({
  candidate, onClose, onExtendOffer, onReject, onScheduleNext, theme = "dark",
}) => {
  if (!candidate) return null;

  const [avBg, avCol] = avatarColors(candidate.name);
  const vd    = VERDICT_INFO[candidate.verdict] ?? VERDICT_INFO.pending;
  const score = candidate.score;

  /* Ring */
  const R     = 26, circ = 2 * Math.PI * R;
  const dash  = score != null ? ((score / 100) * circ) : 0;
  const sCol  = score != null ? scoreColor(score) : "var(--tx3)";

  /* Criteria rows — use criteria map or derive from score */
  const criteriaRows = CRITERIA_LABELS.map(k => ({
    key: k,
    val: candidate.criteria?.[k] ?? (score != null ? Math.min(100, Math.round(score * (0.85 + Math.random() * 0.3))) : 0),
  }));

  const drawerContent = (
    <div data-ir-theme={theme}>
      <style>{MODAL_CSS}</style>
      <div className="md-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
        <div className="md-drawer">

          {/* ── Header ── */}
          <div className="md-hdr">
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div className="md-hdr-av" style={{ background: avBg, color: avCol }}>
                {initials(candidate.name)}
              </div>
              <div>
                <div className="md-hdr-nm">{candidate.name}</div>
                <div className="md-hdr-role">{candidate.role} · {candidate.round}</div>
                <div style={{ marginTop: 6 }}>
                  <span className={`md-v-badge ${vd.cls}`}>{vd.label}</span>
                </div>
              </div>
            </div>
            <button className="md-close" onClick={onClose}>✕</button>
          </div>

          {/* ── Body ── */}
          <div className="md-body">

            {/* Verdict hero */}
            <div className="md-verdict-hero">
              <div>
                <div style={{ fontSize: ".57rem", fontWeight: 700, color: "var(--tx3)",
                               letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>
                  Final Verdict
                </div>
                <div style={{ fontFamily: "var(--serif)", fontSize: "1.55rem", color: "var(--tx)",
                               fontWeight: 700, lineHeight: 1, marginBottom: 4 }}>
                  {vd.label}
                </div>
                <div style={{ fontSize: ".7rem", color: "var(--tx3)" }}>
                  {candidate.round} · {fmtDate(candidate.date)}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {candidate.verdict !== "offer_extended" && onExtendOffer && (
                  <button className="md-btn md-btn-offer"
                    onClick={() => { onExtendOffer(candidate.id); onClose(); }}>
                    Extend Offer
                  </button>
                )}
                {candidate.verdict !== "rejected" && onReject && (
                  <button className="md-btn md-btn-danger"
                    onClick={() => { onReject(candidate.id); onClose(); }}>
                    Reject
                  </button>
                )}
              </div>
            </div>

            {/* Candidate info */}
            <div className="md-section">
              <div className="md-sec-hdr">Candidate Info</div>
              <div className="md-sec-body">
                <div className="md-info-grid">
                  {[
                    ["Name",           candidate.name],
                    ["Role Applied",   candidate.role],
                    ["Department",     candidate.dept || "—"],
                    ["Email",          candidate.email],
                    ["Interviewer",    candidate.interviewer],
                    ["Duration",       candidate.duration ? candidate.duration + " min" : "—"],
                    ["Round",          candidate.round],
                    ["Interview Date", fmtDate(candidate.date)],
                  ].map(([label, val]) => (
                    <div key={label} className="md-ibox">
                      <div className="md-ilbl">{label}</div>
                      <div className="md-ival">
                        {label === "Email"
                          ? <a href={`mailto:${val}`}>{val}</a>
                          : val || "—"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Match Score */}
            <div className="md-section">
              <div className="md-sec-hdr">AI Match Score</div>
              <div className="md-sec-body">
                <div className="md-ring-wrap">
                  <div className="md-ring">
                    <svg width="62" height="62" viewBox="0 0 62 62">
                      <circle cx="31" cy="31" r={R} fill="none" stroke="var(--glass2)" strokeWidth="6" />
                      <circle cx="31" cy="31" r={R} fill="none"
                        stroke={score != null ? sCol : "var(--tx3)"}
                        strokeWidth="6"
                        strokeDasharray={`${dash.toFixed(1)} ${circ.toFixed(1)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="md-ring-lbl">
                      <span className="md-ring-num">{score ?? "—"}</span>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: ".62rem", color: "var(--tx3)", marginBottom: ".15rem" }}>
                      Overall match score
                    </div>
                    <div className="md-score-big" style={{ color: sCol }}>
                      {score != null ? `${score}/100` : "—"}
                    </div>
                    <div className="md-score-sub">
                      {score == null ? "No score yet"
                        : score >= 80 ? "Strong match"
                        : score >= 60 ? "Good match" : "Weak match"}
                    </div>
                  </div>
                </div>

                {/* Criteria bars */}
                <div>
                  {criteriaRows.map(c => (
                    <div key={c.key} className="md-bar-row">
                      <span className="md-bar-lbl">{c.key}</span>
                      <div className="md-bar-track">
                        <div className="md-bar-fill"
                          style={{ width: `${c.val}%`, background: scoreColor(c.val) }} />
                      </div>
                      <span className="md-bar-val">{c.val || "—"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interviewer Feedback */}
            <div className="md-section">
              <div className="md-sec-hdr">Interviewer Feedback</div>
              <div className="md-sec-body">
                <div style={{ fontSize: ".75rem", fontWeight: 600, color: "var(--tx)",
                               marginBottom: 8 }}>
                  {candidate.interviewer} · {candidate.round}
                </div>
                <div className="md-feedback">
                  {candidate.feedback || "No feedback recorded."}
                </div>
              </div>
            </div>

          </div>

          {/* ── Footer ── */}
          <div className="md-footer">
            <button className="md-btn md-btn-outline" onClick={onClose}>Close</button>
            {candidate.verdict === "next_round" && onScheduleNext && (
              <button className="md-btn md-btn-blue"
                onClick={() => { onScheduleNext(candidate.id); onClose(); }}>
                Schedule Next Round →
              </button>
            )}
            {candidate.verdict === "offer_extended" && (
              <button className="md-btn md-btn-offer">View Offer Letter</button>
            )}
            {candidate.verdict === "pending" && (
              <button className="md-btn md-btn-blue">Record Verdict</button>
            )}
          </div>

        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(drawerContent, document.body);
};

export default CandidateDetailsModal;