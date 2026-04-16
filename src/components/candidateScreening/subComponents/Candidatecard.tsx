import React from "react";
import type { LucideIcon } from "lucide-react";
import { Candidate } from "@/services/interfaces/CandidateScreening";

/* ── avatar palette — deterministic colour from name (mirrors HTML avatarStyle) ── */
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

/* scoreCls — hi / mid / lo (mirrors HTML scoreCls) */
function scoreCls(s: number) { return s >= 80 ? "hi" : s >= 60 ? "mid" : "lo"; }

/* relDate — mirrors HTML relDate() */
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
  onClick: () => void;
}

/* ── CandidateCard — mirrors .cs-cc HTML structure exactly ── */
const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, isSelected, onClick }) => {
  if (!candidate) return null;

  const av  = avatarStyle(candidate.name ?? "");
  const ini = candidate.name?.split(" ").slice(0,2).map((n) => n[0]).join("").toUpperCase() ?? "??";
  const sc  = scoreCls(candidate.displayScore ?? 0);
  const st  = candidate.statusInfo ?? { label: "Applied", cls: "pill-applied", priority: 0 };
  const sv  = (candidate.displayScore ?? 0) > 0 ? (candidate.displayScore ?? 0).toFixed(0) : "—";

  return (
    <div
      className={`cs-cc${isSelected ? " cs-cc--on" : ""}`}
      onClick={onClick}
    >
      {/* Avatar */}
      <div className="cs-cc__av" style={{ background: av.bg, color: av.fg }}>
        {ini}
      </div>

      {/* Body */}
      <div className="cs-cc__body">
        <div className="cs-cc__nm">{candidate.name}</div>
        <div className="cs-cc__email">{candidate.email}</div>
        <div className="cs-cc__role">
          {candidate.job_title} · Applied {relDate(candidate.processed_date)}
        </div>
        <div className="cs-cc__meta">
          <span className={`cs-pill ${st.cls}`}>{st.label}</span>
        </div>
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