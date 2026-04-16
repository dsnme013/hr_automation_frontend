/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useMemo, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────────────── */
export type Verdict =
  | "offer_extended" | "next_round" | "on_hold" | "rejected" | "pending";

export interface InterviewRow {
  id:          string;
  name:        string;
  email:       string;
  role:        string;
  dept:        string;
  interviewer: string;
  round:       string;
  date:        string;
  verdict:     Verdict;
  score:       number | null;
  duration:    number | null;
  criteria:    Record<string, number>;
  feedback:    string;
}

interface CandidatesTableProps {
  candidates:      InterviewRow[];
  loading:         boolean;
  search:          string;
  setSearch:       (v: string) => void;
  onOpen:          (id: string) => void;
  onExtendOffer?:  (id: string) => void;
  onScheduleNext?: (id: string) => void;
  onAddVerdict?:   (id: string) => void;
  exporting?:      boolean;
  onExport?:       () => void;
  theme?:          "dark" | "light";
}

/* ─────────────────────────────────────────────────────────────────────────────
   Helpers — mirrors HTML getVerdictBadge / getScore / avatarStyle
───────────────────────────────────────────────────────────────────────────── */
const VERDICT_MAP: Record<Verdict, { cls: string; label: string }> = {
  offer_extended: { cls: "offered",  label: "Offer Extended" },
  next_round:     { cls: "next",     label: "Next Round"     },
  on_hold:        { cls: "hold",     label: "On Hold"        },
  rejected:       { cls: "rejected", label: "Rejected"       },
  pending:        { cls: "pending",  label: "Pending"        },
};

function avatarColors(name: string): [string, string] {
  const palettes: [string, string][] = [
    ["rgba(0,214,143,.12)", "#00d68f"],
    ["rgba(96,165,250,.12)", "#60a5fa"],
    ["rgba(251,191,36,.12)", "#fbbf24"],
    ["rgba(167,139,250,.12)", "#a78bfa"],
    ["rgba(248,113,113,.12)", "#f87171"],
    ["rgba(45,212,191,.12)", "#2dd4bf"],
  ];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
  return palettes[Math.abs(h) % palettes.length];
}

function initials(name: string) {
  return name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

function relDate(str: string): string {
  if (!str || str === "—") return "—";
  try {
    const d = Math.round((Date.now() - new Date(str).getTime()) / 86_400_000);
    if (d === 0) return "Today";
    if (d === 1) return "Yesterday";
    if (d < 7)  return `${d}d ago`;
    if (d < 30) return `${Math.round(d / 7)}w ago`;
    return `${Math.round(d / 30)}mo ago`;
  } catch { return str; }
}

const ROUND_BTNS = [
  { key: "all",   label: "All Rounds" },
  { key: "r1",    label: "Round 1"    },
  { key: "r2",    label: "Round 2"    },
  { key: "final", label: "Final"      },
];

/* ─────────────────────────────────────────────────────────────────────────────
   TABLE CSS — mirrors HTML .table-card section
───────────────────────────────────────────────────────────────────────────── */
const TABLE_CSS = `
@keyframes tbl-fup { to { opacity:1; transform:translateY(0); } }

.tbl-card {
  background: var(--card-bg); border: 1px solid var(--card-bd);
  border-radius: 14px; backdrop-filter: blur(16px); overflow: hidden;
  transition: background .35s, border-color .35s;
  opacity: 0; transform: translateY(14px); animation: tbl-fup .4s ease .26s forwards;
}
[data-ir-theme="light"] .tbl-card { background: #fff; box-shadow: 0 1px 6px rgba(0,0,0,.06); }

/* ── Sub-header ── */
.tbl-subhdr {
  display: flex; align-items: center; justify-content: space-between;
  padding: .85rem 1.2rem; border-bottom: 1px solid var(--card-bd);
  flex-wrap: wrap; gap: 8px; transition: border-color .35s;
}
.tbl-title { font-size: .85rem; font-weight: 700; color: var(--tx); transition: color .35s; }
.tbl-count { font-size: .7rem; color: var(--tx3); margin-top: .1rem; transition: color .35s; }

/* Round tabs */
.round-tabs { display: flex; align-items: center; gap: .4rem; }
.rtab {
  font-size: .7rem; font-weight: 600; padding: .28rem .7rem; border-radius: 7px;
  cursor: pointer; border: 1px solid var(--card-bd); background: transparent;
  color: var(--tx3); font-family: var(--sans); transition: all .14s;
}
.rtab.on { background: var(--acc); color: var(--btn-text); border-color: var(--acc); }
[data-ir-theme="light"] .rtab.on { color: #fff; }
.rtab:hover:not(.on) { border-color: var(--acc); color: var(--acc); }
.btn-export-sm {
  font-size: .7rem; font-weight: 600; padding: .28rem .7rem; border-radius: 7px;
  cursor: pointer; border: 1px solid var(--card-bd); background: var(--glass2);
  color: var(--tx3); font-family: var(--sans); transition: all .18s;
}
.btn-export-sm:hover { border-color: var(--acc); color: var(--acc); }
.btn-export-sm:disabled { opacity: .5; cursor: not-allowed; }

/* ── Table ── */
.tbl-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
thead tr { background: var(--tbl-hdr); }
th {
  padding: .55rem 1rem; text-align: left;
  font-size: .58rem; font-weight: 700; letter-spacing: .09em; text-transform: uppercase;
  color: var(--tx3); border-bottom: 1px solid var(--card-bd); white-space: nowrap;
  transition: color .35s, border-color .35s;
}
td {
  padding: .75rem 1rem; font-size: .8rem; color: var(--tx2);
  border-bottom: 1px solid var(--tbl-bd); vertical-align: middle; transition: background .12s;
}
tr:last-child td { border-bottom: none; }
tbody tr:hover td { background: var(--accs); cursor: pointer; }

/* Candidate avatar */
.c-av {
  width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: .58rem; font-weight: 700; border: 1px solid transparent;
}
.c-nm  { font-weight: 600; font-size: .8rem; color: var(--tx); transition: color .35s; }
.role-txt { font-size: .76rem; color: var(--tx2); transition: color .35s; }
.round-lbl { font-size: .62rem; color: var(--tx3); margin-top: .08rem; }

/* Score chip */
.score-dash { font-size: .75rem; color: var(--tx3); }
.score-val {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 36px; height: 20px; border-radius: 5px; font-size: .72rem; font-weight: 700;
}
.score-val.good { background: var(--accs); color: var(--acc); }
.score-val.mid  { background: rgba(251,191,36,.1); color: var(--amber); }
.score-val.bad  { background: rgba(248,113,113,.1); color: var(--red); }

/* Verdict badge */
.verdict-badge {
  display: inline-flex; align-items: center; gap: 3px;
  font-size: .65rem; font-weight: 600; padding: .18rem .58rem; border-radius: 999px;
}
.verdict-badge.pending  { background: var(--verdict-pending-bg);  color: var(--verdict-pending-col);  }
.verdict-badge.offered  { background: var(--verdict-offered-bg);  color: var(--verdict-offered-col);  }
.verdict-badge.rejected { background: var(--verdict-rejected-bg); color: var(--verdict-rejected-col); }
.verdict-badge.hold     { background: var(--verdict-hold-bg);     color: var(--verdict-hold-col);     }
.verdict-badge.next     { background: var(--verdict-next-bg);     color: var(--verdict-next-col);     }

.ago-txt { font-size: .72rem; color: var(--tx3); }
.tbl-empty { text-align: center; padding: 2rem; color: var(--tx3); font-size: .78rem; }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────────────── */
const CandidatesTable: React.FC<CandidatesTableProps> = ({
  candidates, loading, search, setSearch,
  onOpen, onExtendOffer, onScheduleNext, onAddVerdict,
  exporting, onExport,
}) => {
  const [activeRound, setActiveRound] = useState("all");

  const filtered = useMemo(() => {
    if (activeRound === "all") return candidates;
    return candidates.filter(r => r.round.toLowerCase() === activeRound);
  }, [candidates, activeRound]);

  return (
    <>
      <style>{TABLE_CSS}</style>
      <div className="tbl-card">

        {/* ── Sub-header ── */}
        <div className="tbl-subhdr">
          <div>
            <div className="tbl-title">Interview Results</div>
            <div className="tbl-count">{filtered.length} results</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: ".45rem", flexWrap: "wrap" }}>
            <div className="round-tabs">
              {ROUND_BTNS.map(b => (
                <button key={b.key}
                  className={`rtab${activeRound === b.key ? " on" : ""}`}
                  onClick={() => setActiveRound(b.key)}>
                  {b.label}
                </button>
              ))}
            </div>
            {onExport && (
              <button className="btn-export-sm" onClick={onExport} disabled={exporting}>
                {exporting ? "Exporting…" : "Export"}
              </button>
            )}
          </div>
        </div>

        {/* ── Table ── */}
        <div className="tbl-wrap">
          {loading ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center",
                          gap: 10, padding: "2rem", color: "var(--tx3)", fontSize: ".78rem" }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%",
                             border: "2px solid var(--glass2)", borderTopColor: "var(--acc)",
                             animation: "spin .7s linear infinite" }} />
              Loading interview results…
            </div>
          ) : filtered.length === 0 ? (
            <div className="tbl-empty">No results found — try adjusting filters or search.</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Role · Round</th>
                  <th>Score</th>
                  <th>Verdict</th>
                  <th>Interviewer</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => {
                  const [bg, col] = avatarColors(r.name);
                  const vm   = VERDICT_MAP[r.verdict] ?? VERDICT_MAP.pending;
                  const sCls = r.score == null ? "" : r.score >= 80 ? "good" : r.score >= 60 ? "mid" : "bad";

                  return (
                    <tr key={r.id} onClick={() => onOpen(r.id)}>
                      {/* Candidate */}
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div className="c-av" style={{ background: bg, color: col }}>{initials(r.name)}</div>
                          <span className="c-nm">{r.name}</span>
                        </div>
                      </td>

                      {/* Role · Round */}
                      <td>
                        <div className="role-txt">{r.role}</div>
                        <div className="round-lbl">{r.round}</div>
                      </td>

                      {/* Score */}
                      <td>
                        {r.score == null
                          ? <span className="score-dash">—</span>
                          : <span className={`score-val ${sCls}`}>{r.score}</span>
                        }
                      </td>

                      {/* Verdict */}
                      <td>
                        <span className={`verdict-badge ${vm.cls}`}>{vm.label}</span>
                      </td>

                      {/* Interviewer */}
                      <td><span className="ago-txt">{r.interviewer}</span></td>

                      {/* Date */}
                      <td><span className="ago-txt">{relDate(r.date)}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default CandidatesTable;