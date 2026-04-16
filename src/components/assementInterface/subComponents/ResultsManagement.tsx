/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useMemo, useState } from "react";
import { RefreshCw, CheckCircle, AlertCircle, ExternalLink, Calendar, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { Candidate, Job } from "@/services/interfaces/CandidateScreening";

interface ResultsManagementProps {
  selectedJob: Job | null;
  candidates: Candidate[];
  onRefreshCandidates: () => void;
}

/* ── CSS — mirrors HTML card styles, using --card-bg / --card-bd tokens ── */
const CSS = `
/* Status message */
.am-rm-msg {
  display: flex; align-items: center; gap: 8px;
  padding: .6rem 1rem; border-radius: 10px; font-size: .78rem;
  font-weight: 500; margin-bottom: 1.1rem;
  border: 1px solid transparent;
}
.am-rm-msg.info    { background: var(--accs);    color: var(--acc);    border-color: var(--bd);  }
.am-rm-msg.success { background: var(--accs);    color: var(--acc);    border-color: var(--bd);  }
.am-rm-msg.error   { background: var(--rej-bg);  color: var(--red);    border-color: var(--rej-bd);}

/* Mini KPI row */
.am-rm-kpis {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: .75rem; margin-bottom: 1.2rem;
}
.am-rm-kpi {
  background: var(--card-bg); border: 1px solid var(--card-bd);
  border-radius: 12px; padding: .85rem 1rem;
  backdrop-filter: blur(12px); transition: all .35s;
}
.am-rm-kpi-lbl { font-size: .6rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--tx3); transition: color .35s; }
.am-rm-kpi-val { font-family: var(--serif); font-size: 1.6rem; color: var(--tx); line-height: 1.1; margin: .2rem 0 .1rem; transition: color .35s; }
.am-rm-kpi-icon { font-size: .88rem; opacity: .6; }

/* Panel cards */
.am-rm-panel {
  background: var(--card-bg); border: 1px solid var(--card-bd);
  border-radius: 14px; padding: 1.1rem; margin-bottom: 1.1rem;
  backdrop-filter: blur(16px); transition: all .35s;
}
.am-rm-panel-hdr {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 1rem;
}
.am-rm-panel-title {
  font-size: .82rem; font-weight: 700; color: var(--tx);
  display: flex; align-items: center; gap: 7px; transition: color .35s;
}
.am-rm-panel-icon { font-size: .9rem; }
.am-rm-refresh-btn {
  font-family: var(--sans); font-size: .72rem; font-weight: 600;
  padding: .35rem .85rem; border-radius: 8px; cursor: pointer;
  background: var(--acc); color: var(--btn-text); border: none;
  display: flex; align-items: center; gap: 6px;
  transition: background .15s; box-shadow: 0 0 12px var(--accg);
}
.am-rm-refresh-btn:hover:not(:disabled) { background: var(--acc3); }
.am-rm-refresh-btn:disabled { opacity: .5; cursor: not-allowed; }

/* Two-col grid */
.am-rm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }

/* Candidate item rows */
.am-rm-sub-title {
  font-size: .76rem; font-weight: 700; color: var(--tx);
  display: flex; align-items: center; gap: 6px; margin-bottom: .65rem;
  transition: color .35s;
}
.am-rm-items { display: flex; flex-direction: column; gap: .45rem; max-height: 280px; overflow-y: auto; }
.am-rm-items::-webkit-scrollbar { width: 3px; }
.am-rm-items::-webkit-scrollbar-thumb { background: var(--bd2); border-radius: 3px; }

.am-rm-item {
  background: var(--glass2); border: 1px solid var(--card-bd);
  border-radius: 10px; padding: .7rem .9rem;
  transition: background .15s, border-color .35s;
}
.am-rm-item:hover { background: var(--accs); border-color: var(--bd2); }
.am-rm-item-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
.am-rm-item-nm  { font-size: .78rem; font-weight: 600; color: var(--tx); transition: color .35s; }
.am-rm-item-em  { font-size: .63rem; color: var(--tx3); margin-top: 1px; transition: color .35s; }
.am-rm-item-dt  { font-size: .6rem; color: var(--tx3); margin-top: 3px; transition: color .35s; }
.am-rm-item-acts { display: flex; gap: 5px; flex-shrink: 0; margin-top: 2px; }

.am-rm-manual-btn {
  font-size: .62rem; font-weight: 600; padding: .2rem .55rem;
  border-radius: 6px; cursor: pointer;
  background: var(--accs); color: var(--acc); border: 1px solid var(--bd);
  font-family: var(--sans); transition: all .15s;
}
.am-rm-manual-btn:hover { background: var(--acc); color: var(--btn-text); }
.am-rm-ext-link {
  font-size: .62rem; font-weight: 600; padding: .2rem .55rem;
  border-radius: 6px; cursor: pointer;
  background: var(--glass2); color: var(--tx2); border: 1px solid var(--card-bd);
  font-family: var(--sans); transition: all .15s;
  display: flex; align-items: center; gap: 3px; text-decoration: none;
}
.am-rm-ext-link:hover { border-color: var(--acc); color: var(--acc); }

/* Score badge inline */
.am-rm-score-badge {
  display: inline-block; font-size: .72rem; font-weight: 700;
  padding: .15rem .55rem; border-radius: 6px;
}
.am-rm-score-ok  { background: var(--accs);                  color: var(--acc); }
.am-rm-score-bad { background: rgba(248,113,113,.1);          color: var(--red); }

/* Empty state */
.am-rm-empty {
  display: flex; flex-direction: column; align-items: center;
  gap: 6px; padding: 1.5rem 1rem; text-align: center;
  background: var(--glass); border: 1px dashed var(--card-bd);
  border-radius: 10px; font-size: .73rem; color: var(--tx3);
}
.am-rm-empty-icon { font-size: 1.3rem; opacity: .5; }

/* Full results table */
.am-rm-tbl-wrap { overflow-x: auto; }
.am-rm-table { width: 100%; border-collapse: collapse; }
.am-rm-table th {
  padding: .55rem 1rem; text-align: left;
  font-size: .6rem; font-weight: 700; letter-spacing: .09em; text-transform: uppercase;
  color: var(--tx3); border-bottom: 1px solid var(--card-bd);
  white-space: nowrap; background: rgba(0,0,0,.03); transition: all .35s;
}
[data-am-theme="dark"] .am-rm-table th { background: rgba(0,214,143,.03); }
.am-rm-table td {
  padding: .75rem 1rem; font-size: .78rem; color: var(--tx2);
  border-bottom: 1px solid rgba(0,0,0,.04); transition: background .12s;
}
[data-am-theme="dark"] .am-rm-table td { border-bottom-color: rgba(0,214,143,.04); }
.am-rm-table tbody tr:last-child td { border-bottom: none; }
.am-rm-table tbody tr:hover td { background: var(--accs); }

/* Automation settings */
.am-rm-auto-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: .75rem; }
.am-rm-auto-item {
  background: var(--glass2); border: 1px solid var(--card-bd);
  border-radius: 10px; padding: .85rem 1rem;
  display: flex; align-items: center; justify-content: space-between;
  transition: all .35s;
}
.am-rm-auto-item-col { display: flex; flex-direction: column; gap: 2px; }
.am-rm-auto-label { font-size: .76rem; font-weight: 600; color: var(--tx); transition: color .35s; }
.am-rm-auto-sub   { font-size: .62rem; color: var(--tx3); transition: color .35s; }
.am-rm-auto-sel {
  background: var(--select-bg); border: 1px solid var(--select-bd);
  color: var(--tx); font-family: var(--sans); font-size: .72rem;
  padding: .35rem .65rem; border-radius: 8px; outline: none; cursor: pointer;
  transition: all .2s; width: 100%; margin-top: .5rem;
}
.am-rm-auto-sel:focus { border-color: var(--acc); }

/* No-job empty state */
.am-rm-no-job {
  display: flex; flex-direction: column; align-items: center;
  gap: .6rem; padding: 3rem 1rem; text-align: center;
  font-size: .8rem; color: var(--tx3);
}
.am-rm-no-job-icon { font-size: 2rem; opacity: .3; }

@media (max-width: 900px) {
  .am-rm-kpis   { grid-template-columns: repeat(2, 1fr); }
  .am-rm-grid   { grid-template-columns: 1fr; }
  .am-rm-auto-grid { grid-template-columns: 1fr; }
}
`;

/* ── Manual process modal ── */
const ManualModal: React.FC<{
  candidate: Candidate;
  onClose: () => void;
  onProcessed: (msg: string) => void;
}> = ({ candidate, onClose, onProcessed }) => {
  const [score, setScore]   = useState("");
  const [total, setTotal]   = useState("100");
  const pct = score && total ? ((+score / +total) * 100).toFixed(1) : "0";

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9800,
        background: "rgba(4,13,10,.6)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
        backdropFilter: "blur(4px)",
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: "var(--card-bg)", border: "1px solid var(--card-bd)",
        borderRadius: 16, padding: "1.4rem", width: "100%", maxWidth: 460,
        backdropFilter: "blur(20px)", boxShadow: "0 24px 60px rgba(0,0,0,.4)",
      }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: "1.05rem", color: "var(--tx)", marginBottom: ".25rem" }}>
          Manual Process
        </div>
        <div style={{ fontSize: ".72rem", color: "var(--tx3)", marginBottom: "1.1rem" }}>
          {candidate.name} — {candidate.email}
        </div>

        <div style={{ marginBottom: ".85rem" }}>
          <div style={{ fontSize: ".65rem", fontWeight: 700, color: "var(--tx3)", marginBottom: ".3rem", textTransform: "uppercase", letterSpacing: ".08em" }}>
            Score (correct answers)
          </div>
          <input
            type="number" min="0" value={score} onChange={e => setScore(e.target.value)}
            placeholder="e.g. 75"
            style={{
              width: "100%", background: "var(--select-bg)", border: "1px solid var(--select-bd)",
              color: "var(--tx)", fontFamily: "var(--sans)", fontSize: ".82rem",
              padding: ".5rem .8rem", borderRadius: 8, outline: "none",
            }}
          />
        </div>

        <div style={{ marginBottom: ".85rem" }}>
          <div style={{ fontSize: ".65rem", fontWeight: 700, color: "var(--tx3)", marginBottom: ".3rem", textTransform: "uppercase", letterSpacing: ".08em" }}>
            Total Questions
          </div>
          <input
            type="number" min="1" value={total} onChange={e => setTotal(e.target.value)}
            style={{
              width: "100%", background: "var(--select-bg)", border: "1px solid var(--select-bd)",
              color: "var(--tx)", fontFamily: "var(--sans)", fontSize: ".82rem",
              padding: ".5rem .8rem", borderRadius: 8, outline: "none",
            }}
          />
        </div>

        <div style={{
          background: "var(--glass2)", border: "1px solid var(--card-bd)",
          borderRadius: 8, padding: ".65rem .9rem", marginBottom: "1rem",
          fontSize: ".73rem", color: "var(--tx2)",
        }}>
          <strong>Percentage:</strong> {pct}%<br />
          <span style={{ fontSize: ".65rem", color: "var(--tx3)", marginTop: 3, display: "block" }}>
            Candidates scoring ≥70% will be eligible for interview
          </span>
        </div>

        <div style={{ display: "flex", gap: ".6rem" }}>
          <button
            disabled={!score}
            onClick={() => { onProcessed(`✅ Processed ${candidate.name} (${pct}%)`); onClose(); }}
            style={{
              flex: 1, background: "var(--acc)", color: "var(--btn-text)",
              fontFamily: "var(--sans)", fontSize: ".78rem", fontWeight: 700,
              padding: ".55rem", borderRadius: 9, border: "none", cursor: "pointer",
              opacity: !score ? .5 : 1,
            }}
          >
            Process Result
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1, background: "var(--glass2)", color: "var(--tx2)",
              fontFamily: "var(--sans)", fontSize: ".78rem", fontWeight: 600,
              padding: ".55rem", borderRadius: 9, border: "1px solid var(--card-bd)", cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Main ── */
const ResultsManagement: React.FC<ResultsManagementProps> = ({
  selectedJob, candidates, onRefreshCandidates,
}) => {
  const router = useRouter();
  const [statusMsg,    setStatusMsg]    = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selCandidate, setSelCandidate] = useState<Candidate | null>(null);
  const [showModal,    setShowModal]    = useState(false);
  const [automation,   setAutomation]  = useState({ enabled: false, interval: 30, autoProcess: true });

  /* Metrics */
  const metrics = useMemo(() => {
    const completed = candidates.filter(c => c.exam_completed);
    const passed    = completed.filter(c => (c.exam_percentage ?? 0) >= 70);
    const pending   = candidates.filter(c => c.exam_link_sent && !c.exam_completed && !c.link_expired);
    const avgScore  = completed.length
      ? (completed.reduce((s, c) => s + (c.exam_percentage ?? 0), 0) / completed.length).toFixed(1)
      : "0";
    return {
      pending:   pending.length,
      completed: completed.length,
      passRate:  completed.length ? ((passed.length / completed.length) * 100).toFixed(1) : "0",
      avgScore,
    };
  }, [candidates]);

  const pendingList   = useMemo(() => candidates.filter(c => c.exam_link_sent && !c.exam_completed && !c.link_expired), [candidates]);
  const completedList = useMemo(
    () => [...candidates.filter(c => c.exam_completed)].sort((a, b) =>
      +new Date(b.exam_completed_date ?? 0) - +new Date(a.exam_completed_date ?? 0)
    ),
    [candidates]
  );
  const recentList = completedList.slice(0, 8);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setStatusMsg("🔍 Refreshing results…");
    onRefreshCandidates();
    setTimeout(() => {
      setIsRefreshing(false);
      setStatusMsg("✅ Results refreshed!");
      setTimeout(() => setStatusMsg(""), 4000);
    }, 1500);
  };

  const msgCls = statusMsg.includes("❌") ? "error"
    : statusMsg.includes("✅") ? "success"
    : "info";

  const fmtDate = (iso?: string | null) => {
    if (!iso) return "N/A";
    try { return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }); }
    catch { return "N/A"; }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Status message */}
      {statusMsg && (
        <div className={`am-rm-msg ${msgCls}`}>
          {statusMsg.includes("🔍") && <RefreshCw size={14} style={{ animation: "spin .7s linear infinite" }} />}
          {statusMsg.includes("✅") && <CheckCircle size={14} />}
          {statusMsg.includes("❌") && <AlertCircle size={14} />}
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Mini KPI strip */}
      <div className="am-rm-kpis">
        {[
          { lbl: "Pending",   val: metrics.pending,    icon: "⏱" },
          { lbl: "Completed", val: metrics.completed,  icon: "✓"  },
          { lbl: "Pass Rate", val: `${metrics.passRate}%`, icon: "🎯" },
          { lbl: "Avg Score", val: `${metrics.avgScore}%`, icon: "📊" },
        ].map(({ lbl, val, icon }) => (
          <div key={lbl} className="am-rm-kpi">
            <div className="am-rm-kpi-lbl">{lbl}</div>
            <div className="am-rm-kpi-val">{val}</div>
            <div className="am-rm-kpi-icon">{icon}</div>
          </div>
        ))}
      </div>

      {/* Results management panel */}
      <div className="am-rm-panel">
        <div className="am-rm-panel-hdr">
          <div className="am-rm-panel-title">
            <span className="am-rm-panel-icon">📋</span>
            Results Management
          </div>
          <button
            className="am-rm-refresh-btn"
            onClick={handleRefresh}
            disabled={isRefreshing || !selectedJob}
          >
            <RefreshCw size={13} style={{ animation: isRefreshing ? "spin .7s linear infinite" : "none" }} />
            {isRefreshing ? "Refreshing…" : "Refresh Results"}
          </button>
        </div>

        {!selectedJob ? (
          <div className="am-rm-no-job">
            <div className="am-rm-no-job-icon">👥</div>
            Select a job to manage assessment results
          </div>
        ) : (
          <div className="am-rm-grid">
            {/* Pending */}
            <div>
              <div className="am-rm-sub-title">⏱ Pending ({pendingList.length})</div>
              <div className="am-rm-items">
                {pendingList.length === 0 ? (
                  <div className="am-rm-empty">
                    <div className="am-rm-empty-icon">✓</div>
                    No pending assessments
                  </div>
                ) : pendingList.map(c => (
                  <div key={c.id} className="am-rm-item">
                    <div className="am-rm-item-row">
                      <div>
                        <div className="am-rm-item-nm">{c.name}</div>
                        <div className="am-rm-item-em">{c.email}</div>
                        <div className="am-rm-item-dt">Sent: {fmtDate((c as any).exam_link_sent_date)}</div>
                      </div>
                      <div className="am-rm-item-acts">
                        <button className="am-rm-manual-btn" onClick={() => { setSelCandidate(c); setShowModal(true); }}>
                          Manual
                        </button>
                        {c.assessment_invite_link && (
                          <a
                            className="am-rm-ext-link"
                            href={c.assessment_invite_link}
                            target="_blank" rel="noopener noreferrer"
                          >
                            <ExternalLink size={10} /> View
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent completions */}
            <div>
              <div className="am-rm-sub-title">✓ Recent Completions ({recentList.length})</div>
              <div className="am-rm-items">
                {recentList.length === 0 ? (
                  <div className="am-rm-empty">
                    <div className="am-rm-empty-icon">⏱</div>
                    No completed assessments yet
                  </div>
                ) : recentList.map(c => {
                  const pct    = c.exam_percentage ?? 0;
                  const passed = pct >= 70;
                  return (
                    <div key={c.id} className="am-rm-item">
                      <div className="am-rm-item-row">
                        <div>
                          <div className="am-rm-item-nm">{c.name}</div>
                          <div className="am-rm-item-em">{c.email}</div>
                          <div className="am-rm-item-dt">{fmtDate((c as any).exam_completed_date)}</div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                          <span className={`am-rm-score-badge ${passed ? "am-rm-score-ok" : "am-rm-score-bad"}`}>
                            {pct.toFixed(0)}%
                          </span>
                          <span style={{ fontSize: ".62rem", color: "var(--tx3)" }}>{passed ? "Passed" : "Failed"}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Full results table */}
      {selectedJob && completedList.length > 0 && (
        <div className="am-rm-panel">
          <div className="am-rm-panel-hdr">
            <div className="am-rm-panel-title">📊 All Assessment Results ({completedList.length})</div>
          </div>
          <div className="am-rm-tbl-wrap">
            <table className="am-rm-table">
              <thead>
                <tr>
                  {["Candidate", "Email", "Score", "Completed", "Result", "Actions"].map(h => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {completedList.map(c => {
                  const pct    = c.exam_percentage ?? 0;
                  const passed = pct >= 70;
                  return (
                    <tr key={c.id}>
                      <td style={{ fontWeight: 600, color: "var(--tx)" }}>{c.name}</td>
                      <td style={{ fontSize: ".72rem", color: "var(--tx3)" }}>{c.email}</td>
                      <td>
                        <span style={{ fontWeight: 700, color: passed ? "var(--acc)" : "var(--red)" }}>
                          {pct.toFixed(0)}%
                        </span>
                      </td>
                      <td style={{ fontSize: ".72rem", color: "var(--tx3)" }}>
                        {fmtDate((c as any).exam_completed_date)}
                      </td>
                      <td>
                        <span
                          style={{
                            display: "inline-flex", alignItems: "center",
                            padding: ".15rem .55rem", borderRadius: 999,
                            fontSize: ".65rem", fontWeight: 700,
                            background: passed ? "var(--accs)" : "rgba(248,113,113,.1)",
                            color: passed ? "var(--acc)" : "var(--red)",
                          }}
                        >
                          {passed ? "✓ Passed" : "✗ Failed"}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          {c.assessment_invite_link && (
                            <a
                              href={c.assessment_invite_link}
                              target="_blank" rel="noopener noreferrer"
                              style={{ color: "var(--blue)", transition: "opacity .15s" }}
                            >
                              <ExternalLink size={14} />
                            </a>
                          )}
                          {passed && !c.interview_scheduled && (
                            <button
                              onClick={() => router.push(`/scheduler?candidate_id=${c.id}`)}
                              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--acc)", transition: "opacity .15s" }}
                              title="Schedule Interview"
                            >
                              <Calendar size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Automation settings */}
      <div className="am-rm-panel">
        <div className="am-rm-panel-hdr">
          <div className="am-rm-panel-title">
            <Settings size={14} />
            Automation Settings
          </div>
        </div>
        <div className="am-rm-auto-grid">
          <div className="am-rm-auto-item">
            <div className="am-rm-auto-item-col">
              <span className="am-rm-auto-label">Auto-Check Results</span>
              <span className="am-rm-auto-sub">Automatically check for new results</span>
            </div>
            <input
              type="checkbox"
              checked={automation.enabled}
              onChange={e => setAutomation({ ...automation, enabled: e.target.checked })}
              style={{ width: 16, height: 16, accentColor: "var(--acc)", cursor: "pointer" }}
            />
          </div>
          <div style={{
            background: "var(--glass2)", border: "1px solid var(--card-bd)",
            borderRadius: 10, padding: ".85rem 1rem", transition: "all .35s",
          }}>
            <div className="am-rm-auto-label" style={{ marginBottom: ".45rem" }}>Check Interval</div>
            <select
              className="am-rm-auto-sel"
              value={automation.interval}
              onChange={e => setAutomation({ ...automation, interval: +e.target.value })}
            >
              <option value={15}>Every 15 minutes</option>
              <option value={30}>Every 30 minutes</option>
              <option value={60}>Every hour</option>
              <option value={120}>Every 2 hours</option>
            </select>
          </div>
          <div className="am-rm-auto-item">
            <div className="am-rm-auto-item-col">
              <span className="am-rm-auto-label">Auto-Process</span>
              <span className="am-rm-auto-sub">Send emails automatically</span>
            </div>
            <input
              type="checkbox"
              checked={automation.autoProcess}
              onChange={e => setAutomation({ ...automation, autoProcess: e.target.checked })}
              style={{ width: 16, height: 16, accentColor: "var(--acc)", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>

      {/* Manual process modal */}
      {showModal && selCandidate && (
        <ManualModal
          candidate={selCandidate}
          onClose={() => setShowModal(false)}
          onProcessed={msg => {
            setStatusMsg(msg);
            onRefreshCandidates();
            setTimeout(() => setStatusMsg(""), 5000);
          }}
        />
      )}
    </>
  );
};

export default ResultsManagement;