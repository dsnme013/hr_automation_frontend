// import React from "react";
// import type { LucideIcon } from "lucide-react";
// import { Candidate } from "@/services/interfaces/CandidateScreening";

// /* ── avatar palette — deterministic colour from name (mirrors HTML avatarStyle) ── */
// function avatarStyle(name: string): { bg: string; fg: string } {
//   const p: [string, string][] = [
//     ["#EFF6FF","#2563EB"],["#F0FDF4","#16A34A"],["#FFF7ED","#EA580C"],
//     ["#FAF5FF","#7C3AED"],["#FFF1F2","#E11D48"],["#F0FDFA","#0D9488"],
//     ["#FFFBEB","#D97706"],["#FDF4FF","#A21CAF"],
//   ];
//   let h = 0;
//   for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
//   const [bg, fg] = p[Math.abs(h) % p.length];
//   return { bg, fg };
// }

// /* scoreCls — hi / mid / lo (mirrors HTML scoreCls) */
// function scoreCls(s: number) { return s >= 80 ? "hi" : s >= 60 ? "mid" : "lo"; }

// /* relDate — mirrors HTML relDate() */
// function relDate(str?: string | null): string {
//   if (!str) return "";
//   const d = Math.round((Date.now() - new Date(str).getTime()) / 86_400_000);
//   if (d === 0) return "Today";
//   if (d === 1) return "Yesterday";
//   if (d < 7)  return `${d}d ago`;
//   if (d < 30) return `${Math.round(d / 7)}w ago`;
//   return `${Math.round(d / 30)}mo ago`;
// }

// interface CandidateCardProps {
//   candidate: Candidate & {
//     displayStatus?: string;
//     displayScore?:  number;
//     scoreColor?:    string;
//     statusInfo?:    { label?: string; cls?: string; priority?: number; color?: string; icon?: LucideIcon };
//     dept?:          string | null;
//   };
//   isSelected: boolean;
//   onClick: () => void;
// }

// /* ── CandidateCard — mirrors .cs-cc HTML structure exactly ── */
// const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, isSelected, onClick }) => {
//   if (!candidate) return null;

//   const av  = avatarStyle(candidate.name ?? "");
//   const ini = candidate.name?.split(" ").slice(0,2).map((n) => n[0]).join("").toUpperCase() ?? "??";
//   const sc  = scoreCls(candidate.displayScore ?? 0);
//   const st  = candidate.statusInfo ?? { label: "Applied", cls: "pill-applied", priority: 0 };
//   const sv  = (candidate.displayScore ?? 0) > 0 ? (candidate.displayScore ?? 0).toFixed(0) : "—";

//   return (
//     <div
//       className={`cs-cc${isSelected ? " cs-cc--on" : ""}`}
//       onClick={onClick}
//     >
//       {/* Avatar */}
//       <div className="cs-cc__av" style={{ background: av.bg, color: av.fg }}>
//         {ini}
//       </div>

//       {/* Body */}
//       <div className="cs-cc__body">
//         <div className="cs-cc__nm">{candidate.name}</div>
//         <div className="cs-cc__email">{candidate.email}</div>
//         <div className="cs-cc__role">
//           {candidate.job_title} · Applied {relDate(candidate.processed_date)}
//         </div>
//         <div className="cs-cc__meta">
//           <span className={`cs-pill ${st.cls}`}>{st.label}</span>
//         </div>
//       </div>

//       {/* Score */}
//       <div className="cs-cc__right">
//         <span className={`cs-cc__score cs-cc__score--${sc}`}>{sv}</span>
//         <span className="cs-cc__denom">/100</span>
//       </div>
//     </div>
//   );
// };

// export default React.memo(CandidateCard);
import React from "react";
import type { LucideIcon } from "lucide-react";
import { Candidate } from "@/services/interfaces/CandidateScreening";

function avatarStyle(name: string): { bg: string; fg: string } {
  const p: [string, string][] = [
    ["#EFF6FF","#2563EB"],["#F0FDF4","#16A34A"],["#FFF7ED","#EA580C"],
    ["#FAF5FF","#7C3AED"],["#FFF1F2","#E11D48"],["#F0FDFA","#0D9488"],
    ["#FFFBEB","#D97706"],["#FDF4FF","#A21CAF"],
  ];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
  const [bg, fg] = p[Math.abs(h) % p.length];
  return { bg, fg };
}

function scoreCls(s: number) { return s >= 80 ? "hi" : s >= 60 ? "mid" : "lo"; }

function relDate(str?: string | null): string {
  if (!str) return "";
  const d = Math.round((Date.now() - new Date(str).getTime()) / 86_400_000);
  if (d === 0) return "Today";
  if (d === 1) return "Yesterday";
  if (d < 7)  return `${d}d ago`;
  if (d < 30) return `${Math.round(d / 7)}w ago`;
  return `${Math.round(d / 30)}mo ago`;
}

interface CandidateCardProps {
  candidate: Candidate & {
    displayStatus?: string;
    displayScore?:  number;
    scoreColor?:    string;
    statusInfo?:    { label?: string; cls?: string; priority?: number; color?: string; icon?: LucideIcon };
    dept?:          string | null;
  };
  isSelected: boolean;
  onClick:    () => void;
  rank?:      number;   // passed when shown in Top 10 view
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, isSelected, onClick, rank }) => {
  if (!candidate) return null;

  const av       = avatarStyle(candidate.name ?? "");
  const ini      = candidate.name?.split(" ").slice(0,2).map((n) => n[0]).join("").toUpperCase() ?? "??";
  const sc       = scoreCls(candidate.displayScore ?? 0);
  const st       = candidate.statusInfo ?? { label: "Applied", cls: "pill-applied", priority: 0 };
  const sv       = (candidate.displayScore ?? 0) > 0 ? (candidate.displayScore ?? 0).toFixed(0) : "—";
  const redFlags = (candidate as any).red_flags as string[] | undefined;
  const hasFlags = redFlags && redFlags.length > 0;
  const matchType = (candidate as any).match_type as string | undefined;

  return (
    <div
      className={`cs-cc${isSelected ? " cs-cc--on" : ""}${hasFlags ? " cs-cc--flagged" : ""}`}
      onClick={onClick}
    >
      {/* Avatar */}
      <div className="cs-cc__av" style={{ background: av.bg, color: av.fg }}>
        {ini}
      </div>

      {/* Body */}
      <div className="cs-cc__body">
        <div className="cs-cc__nm-row">
          <span className="cs-cc__nm">{candidate.name}</span>
          {/* ── Red flag icon ── */}
          {hasFlags && (
            <span
              className="cs-cc__flag"
              title={redFlags!.join(", ")}
            >
              🚩
            </span>
          )}
          {/* ── Top 10 rank badge ── */}
          {rank && (
            <span className="cs-cc__rank">#{rank}</span>
          )}
        </div>

        <div className="cs-cc__email">{candidate.email}</div>
        <div className="cs-cc__role">
          {candidate.job_title} · Applied {relDate(candidate.processed_date)}
        </div>

        <div className="cs-cc__meta">
          <span className={`cs-pill ${st.cls}`}>{st.label}</span>
          {/* ── Match type mini pill ── */}
          {matchType && (
            <span className={`cs-pill cs-cc__match-pill ${
              matchType === "Strong Fit" ? "cs-cc__match--strong"
              : matchType === "Partial Fit" ? "cs-cc__match--partial"
              : "cs-cc__match--weak"
            }`}>
              {matchType === "Strong Fit" ? "✦ Strong" : matchType === "Partial Fit" ? "◑ Partial" : "✕ Weak"}
            </span>
          )}
        </div>

        {/* Red flag detail row */}
        {hasFlags && (
          <div className="cs-cc__flags-row">
            {redFlags!.slice(0, 2).map((f) => (
              <span key={f} className="cs-cc__flag-tag">{f}</span>
            ))}
            {redFlags!.length > 2 && (
              <span className="cs-cc__flag-tag">+{redFlags!.length - 2} more</span>
            )}
          </div>
        )}
      </div>

      {/* Score */}
      <div className="cs-cc__right">
        <span className={`cs-cc__score cs-cc__score--${sc}`}>{sv}</span>
        <span className="cs-cc__denom">/100</span>
      </div>
    </div>
  );
};

export default React.memo(CandidateCard);

/*
─────────────────────────────────────────────
ADD THESE CSS RULES to your GLOBAL_CSS string
in CandidateScreeningInterface.tsx:
─────────────────────────────────────────────

.cs-cc--flagged{border-color:rgba(248,113,113,.25) !important;}
.cs-cc--flagged:hover{background:rgba(248,113,113,.05);}
.cs-cc__nm-row{display:flex;align-items:center;gap:4px;}
.cs-cc__flag{font-size:.7rem;flex-shrink:0;cursor:help;}
.cs-cc__rank{font-size:.55rem;font-weight:700;background:rgba(251,191,36,.15);color:var(--amber);border:1px solid rgba(251,191,36,.3);padding:.08rem .38rem;border-radius:999px;flex-shrink:0;}
.cs-cc__match-pill{font-size:.55rem !important;padding:.08rem .38rem !important;}
.cs-cc__match--strong{background:rgba(0,214,143,.1);color:var(--acc);border:1px solid rgba(0,214,143,.2);}
.cs-cc__match--partial{background:rgba(251,191,36,.1);color:var(--amber);border:1px solid rgba(251,191,36,.2);}
.cs-cc__match--weak{background:rgba(248,113,113,.1);color:var(--red);border:1px solid rgba(248,113,113,.2);}
.cs-cc__flags-row{display:flex;flex-wrap:wrap;gap:3px;margin-top:3px;}
.cs-cc__flag-tag{font-size:.54rem;font-weight:600;background:rgba(248,113,113,.1);color:var(--red);border:1px solid rgba(248,113,113,.2);padding:.06rem .35rem;border-radius:5px;}
.ftab--danger.on{background:var(--red) !important;border-color:var(--red) !important;}
.ftab--danger:hover{border-color:var(--red) !important;color:var(--red) !important;}
.ftab--star.on{background:var(--amber) !important;border-color:var(--amber) !important;color:#0a2e1e !important;}
.ftab--star:hover{border-color:var(--amber) !important;color:var(--amber) !important;}
*/