/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";

interface Candidate {
  id: string; name?: string; email?: string;
  job_title?: string; role?: string;
  resume_path?: string | null;
}

interface Props {
  items:     Candidate[];
  selected?: Candidate | null;
  onPick:    (c: Candidate) => void;
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

export default function CandidateSelector({ items, selected, onPick }: Props) {
  return (
    <div>
      {items.map(c => {
        const [bg, fg] = avColor(c.name || "?");
        const chosen   = selected?.id === c.id;
        return (
          <div
            key={c.id}
            className={`cand-card${chosen ? " sel" : ""}`}
            onClick={() => onPick(c)}
          >
            <div className="cc-av" style={{ background: bg, color: fg, borderColor: fg + "40" }}>
              {ini(c.name || "?")}
            </div>
            <div style={{ flex: 1 }}>
              <div className="cc-nm">{c.name || "Unknown"}</div>
              <div className="cc-role">{c.job_title || c.role || "—"}</div>
              {c.email && <div className="cc-email">{c.email}</div>}
              {c.resume_path && (
                <div className="cc-resume">📄 Resume available</div>
              )}
            </div>
            {chosen && <div className="cc-check">✓</div>}
          </div>
        );
      })}
    </div>
  );
}