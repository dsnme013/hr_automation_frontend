// import React from "react";
// import type { Job } from "@/services/interfaces/CandidateScreening";

// /* ── Filterbar is now a lightweight wrapper — all CSS lives in CandidateScreeningInterface ── */
// const STATUS_CHIPS = [
//   { label:"All",                 value:"all"                },
//   { label:"Shortlisted",         value:"shortlisted"        },
//   { label:"Assessment Pending",  value:"assessment_pending" },
//   { label:"Assessment Done",     value:"assessment_done"    },
//   { label:"Interview Scheduled", value:"interview"          },
//   { label:"Hired",               value:"hired"              },
//   { label:"Rejected",            value:"rejected"           },
// ];

// interface FilterBarProps {
//   jobs:                 Job[];
//   selectedJob:          Job | null;
//   onJobChange:          (job: Job | null) => void;
//   searchTerm:           string;
//   onSearchChange:       (v: string) => void;
//   filterStatus:         string;
//   onFilterStatusChange: (v: string) => void;
//   sortBy:               string;
//   onSortChange:         (v: string) => void;
// }

// const FilterBar: React.FC<FilterBarProps> = ({
//   jobs, selectedJob, onJobChange,
//   searchTerm, onSearchChange,
//   filterStatus, onFilterStatusChange,
//   sortBy, onSortChange,
// }) => (
//   <>
//     {/* ── Search ── */}
//     <div className="sb-search">
//       <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
//       <input
//         type="text"
//         placeholder="Search by name, email, or job title…"
//         value={searchTerm}
//         onChange={(e) => onSearchChange(e.target.value)}
//       />
//     </div>

//     {/* ── Job selector ── */}
//     {jobs.length > 0 && (
//       <div className="sb-job-wrap">
//         <select
//           className="sb-job-sel"
//           value={selectedJob?.id ?? ""}
//           onChange={(e) => {
//             const job = jobs.find((j) => String(j.id) === e.target.value);
//             onJobChange(job ?? null);
//           }}
//         >
//           <option value="">All Jobs</option>
//           {jobs.map((job) => (
//             <option key={job.id} value={job.id}>{job.title} ({job.location})</option>
//           ))}
//         </select>
//         <span className="sb-job-arrow">▾</span>
//       </div>
//     )}

//     {/* ── Filter chips ── */}
//     <div className="sb-filter">
//       {STATUS_CHIPS.map((chip) => (
//         <button
//           key={chip.value}
//           className={`ftab${filterStatus === chip.value ? " on" : ""}`}
//           onClick={() => onFilterStatusChange(chip.value)}
//         >
//           {chip.label}
//         </button>
//       ))}
//     </div>

//     {/* ── Sort ── */}
//     <div className="sb-sort" style={{ padding:"0 0 .45rem", border:"none", marginTop:".45rem" }}>
//       <span className="sort-lbl">Sort by</span>
//       <div className="sb-sort-wrap">
//         <select className="sort-sel" value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
//           <option value="score_desc">Score (High to Low)</option>
//           <option value="score_asc">Score (Low to High)</option>
//           <option value="date_desc">Date (Newest First)</option>
//           <option value="date_asc">Date (Oldest First)</option>
//           <option value="name_asc">Name (A–Z)</option>
//           <option value="status">Status Priority</option>
//         </select>
//         <span className="sort-arrow">▾</span>
//       </div>
//     </div>
//   </>
// );

// export default React.memo(FilterBar);
import React from "react";
import type { Job } from "@/services/interfaces/CandidateScreening";

const STATUS_CHIPS = [
  { label: "All",                 value: "all"                },
  { label: "Shortlisted",         value: "shortlisted"        },
  { label: "Assessment Pending",  value: "assessment_pending" },
  { label: "Assessment Done",     value: "assessment_done"    },
  { label: "Interview Scheduled", value: "interview"          },
  { label: "Hired",               value: "hired"              },
  { label: "Rejected",            value: "rejected"           },
  { label: "🚩 Red Flags",        value: "red_flags"          },
  { label: "⭐ Top 10",           value: "top_10"             },
];

interface FilterBarProps {
  jobs:                 Job[];
  selectedJob:          Job | null;
  onJobChange:          (job: Job | null) => void;
  searchTerm:           string;
  onSearchChange:       (v: string) => void;
  filterStatus:         string;
  onFilterStatusChange: (v: string) => void;
  sortBy:               string;
  onSortChange:         (v: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  jobs, selectedJob, onJobChange,
  searchTerm, onSearchChange,
  filterStatus, onFilterStatusChange,
  sortBy, onSortChange,
}) => (
  <>
    {/* ── Search ── */}
    <div className="sb-search">
      <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input
        type="text"
        placeholder="Search by name, email, or job title…"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>

    {/* ── Job selector ── */}
    {jobs.length > 0 && (
      <div className="sb-job-wrap">
        <select
          className="sb-job-sel"
          value={selectedJob?.id ?? ""}
          onChange={(e) => {
            const job = jobs.find((j) => String(j.id) === e.target.value);
            onJobChange(job ?? null);
          }}
        >
          <option value="">All Jobs</option>
          {jobs.map((job) => (
            <option key={job.id} value={job.id}>{job.title} ({job.location})</option>
          ))}
        </select>
        <span className="sb-job-arrow">▾</span>
      </div>
    )}

    {/* ── Filter chips ── */}
    <div className="sb-filter">
      {STATUS_CHIPS.map((chip) => (
        <button
          key={chip.value}
          className={`ftab${filterStatus === chip.value ? " on" : ""}${
            chip.value === "red_flags" ? " ftab--danger" : ""
          }${
            chip.value === "top_10" ? " ftab--star" : ""
          }`}
          onClick={() => onFilterStatusChange(chip.value)}
        >
          {chip.label}
        </button>
      ))}
    </div>

    {/* ── Sort ── */}
    <div className="sb-sort" style={{ padding:"0 0 .45rem", border:"none", marginTop:".45rem" }}>
      <span className="sort-lbl">Sort by</span>
      <div className="sb-sort-wrap">
        <select className="sort-sel" value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="score_desc">Score (High to Low)</option>
          <option value="score_asc">Score (Low to High)</option>
          <option value="date_desc">Date (Newest First)</option>
          <option value="date_asc">Date (Oldest First)</option>
          <option value="name_asc">Name (A–Z)</option>
          <option value="status">Status Priority</option>
        </select>
        <span className="sort-arrow">▾</span>
      </div>
    </div>
  </>
);

export default React.memo(FilterBar);