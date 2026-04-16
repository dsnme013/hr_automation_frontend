/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Job, Candidate } from "@/services/interfaces/CandidateScreening";

interface JobSelectorProps {
  jobs: Job[];
  selectedJob: Job | null;
  setSelectedJob: (job: Job | null) => void;
  candidates: Candidate[];
}

const CSS = `
@keyframes am-pos-fup { to { opacity:1; transform:translateY(0); } }

.am-pos-row {
  display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
  margin-bottom: 1.4rem;
  opacity: 0; transform: translateY(12px);
  animation: am-pos-fup .4s ease .22s forwards;
}

.am-pos-label {
  font-size: .8rem; font-weight: 600; color: var(--tx2);
  white-space: nowrap; flex-shrink: 0; transition: color .35s;
}

.am-pos-select-wrap { position: relative; flex: 1; min-width: 220px; max-width: 480px; }

.am-pos-select {
  width: 100%;
  background: var(--select-bg);
  border: 1px solid var(--select-bd);
  color: var(--tx);
  font-family: var(--sans); font-size: .82rem;
  padding: .55rem 2rem .55rem .9rem;
  border-radius: 9px; outline: none; cursor: pointer;
  appearance: none; -webkit-appearance: none;
  transition: all .2s;
}
.am-pos-select:focus { border-color: var(--acc); box-shadow: 0 0 0 3px var(--accs); }

.am-pos-chevron {
  position: absolute; right: .75rem; top: 50%;
  transform: translateY(-50%);
  color: var(--tx3); pointer-events: none; font-size: .7rem;
}

/* Per-job stats row */
.am-pos-stats { display: flex; align-items: center; gap: 1.4rem; margin-left: auto; }
.am-ps-item   { text-align: center; }
.am-ps-val    {
  font-family: var(--serif); font-size: 1.35rem; font-weight: 700;
  color: var(--tx); line-height: 1; transition: color .35s;
}
.am-ps-lbl {
  font-size: .58rem; font-weight: 700; letter-spacing: .09em;
  text-transform: uppercase; color: var(--tx3); margin-top: .18rem; transition: color .35s;
}
.am-ps-sep { width: 1px; height: 32px; background: var(--card-bd); }

@media (max-width: 700px) { .am-pos-stats { display: none; } }
`;

const JobSelector: React.FC<JobSelectorProps> = ({
  jobs, selectedJob, setSelectedJob, candidates,
}) => {
  /* Compute per-job stats from the live candidates array */
  const sent      = candidates.filter(c => c.exam_link_sent).length;
  const completed = candidates.filter(c => c.exam_completed).length;
  const passed    = candidates.filter(c => c.exam_completed && (c.exam_percentage ?? 0) >= 70).length;
  const passRate  = completed > 0 ? Math.round((passed / completed) * 100) : null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="am-pos-row">
        <span className="am-pos-label">Job Position</span>

        {/* Select */}
        <div className="am-pos-select-wrap">
          <select
            className="am-pos-select"
            value={selectedJob?.id ?? ""}
            onChange={e => {
              const job = jobs.find(j => String(j.id) === e.target.value);
              setSelectedJob(job ?? null);
            }}
          >
            <option value="">— Select a job position —</option>
            {jobs.map(j => (
              <option key={j.id} value={j.id}>
                {j.title}{j.location ? ` (${j.location})` : ""}
              </option>
            ))}
          </select>
          <span className="am-pos-chevron">▾</span>
        </div>

        {/* Per-job stats — only shown once a job is selected */}
        {selectedJob && (
          <div className="am-pos-stats">
            {[
              { val: candidates.length,                          lbl: "Applied"   },
              { val: sent,                                       lbl: "Sent"      },
              { val: completed,                                  lbl: "Done"      },
              { val: passRate != null ? `${passRate}%` : "—",   lbl: "Pass Rate" },
            ].map(({ val, lbl }, i, arr) => (
              <React.Fragment key={lbl}>
                <div className="am-ps-item">
                  <div className="am-ps-val">{val}</div>
                  <div className="am-ps-lbl">{lbl}</div>
                </div>
                {i < arr.length - 1 && <div className="am-ps-sep" />}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default JobSelector;