/**
 * src/components/SchedulerInterface/schedulerHelpers.ts
 *
 * Shared helpers, types and constants for all SchedulerInterface subcomponents.
 *
 * WHY THIS FILE EXISTS:
 *   These functions were defined as private (non-exported) in SchedulerInterface.tsx.
 *   All subcomponents tried to import them with:
 *     import { avColor, ini, ... } from "../SchedulerInterface"
 *   That caused:
 *     "Module has no exported member 'avColor'"
 *
 *   Fix: extract everything into this shared file and import from here instead.
 */

// ── Types ─────────────────────────────────────────────────────────────────────
export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  job_title: string;
  dept: string;
  location: string;
  processed_date: string;
  ats_score: number;
  exam_percentage: number;
  exam_completed: boolean;
  interview_scheduled: boolean;
  interview_date: string | null;
  interview_type: string | null;
  interviewer: string | null;
  meeting_link: string | null;
  duration: number;
  interview_status: "pending" | "scheduled" | "completed" | "cancelled";
  resume_path: string | null;
  job_description: string;
}

export interface Interviewer {
  id: number;
  name: string;
  role: string;
  checked: boolean;
}

export interface Slot {
  id: number;
  time: string;
  available: boolean;
}

// ── Time slot constants ───────────────────────────────────────────────────────
export const MORNING: Slot[] = [
  { id: 1,  time: "9:00 AM",  available: true  },
  { id: 2,  time: "9:30 AM",  available: true  },
  { id: 3,  time: "10:00 AM", available: true  },
  { id: 4,  time: "10:30 AM", available: false },
  { id: 5,  time: "11:00 AM", available: true  },
  { id: 6,  time: "11:30 AM", available: true  },
];

export const AFTERNOON: Slot[] = [
  { id: 7,  time: "1:00 PM",  available: true  },
  { id: 8,  time: "1:30 PM",  available: false },
  { id: 9,  time: "2:00 PM",  available: true  },
  { id: 10, time: "2:30 PM",  available: true  },
  { id: 11, time: "3:00 PM",  available: false },
  { id: 12, time: "3:30 PM",  available: true  },
  { id: 13, time: "4:00 PM",  available: true  },
  { id: 14, time: "4:30 PM",  available: true  },
];

// ── Helper functions ──────────────────────────────────────────────────────────

/** Returns [bgColor, fgColor] for an avatar based on the candidate's name */
export function avColor(n: string): [string, string] {
  const p: [string, string][] = [
    ["#EFF6FF", "#2563EB"], ["#F0FDF4", "#16A34A"], ["#FFF7ED", "#EA580C"],
    ["#FAF5FF", "#7C3AED"], ["#FFF1F2", "#E11D48"], ["#F0FDFA", "#0D9488"],
    ["#FFFBEB", "#D97706"], ["#FDF4FF", "#A21CAF"],
  ];
  let h = 0;
  for (let i = 0; i < n.length; i++) h = (h * 31 + n.charCodeAt(i)) & 0xffffffff;
  return p[Math.abs(h) % p.length];
}

/** Returns initials (up to 2 chars) from a full name */
export function ini(n: string): string {
  return n.trim().split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

/** Returns a score bar / ring color: green ≥80, amber ≥60, red otherwise */
export function sbColor(s: number): string {
  return s >= 80 ? "#059669" : s >= 60 ? "#D97706" : "#DC2626";
}

/** Returns a CSS class for score badges */
export function scoreCls(s: number): string {
  return s >= 80 ? "sc-hi" : s >= 60 ? "sc-mid" : "sc-lo";
}

/** Formats an ISO date string as "9 Apr 2025" */
export function fmtDate(s?: string | null): string {
  if (!s) return "—";
  const d = new Date(s);
  return isNaN(d.getTime()) ? s : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/** Formats an ISO date string as "10:30 AM" */
export function fmtTime(s?: string | null): string {
  if (!s) return "—";
  const d = new Date(s);
  return isNaN(d.getTime()) ? s : d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/** Formats an ISO date string as "9 Apr 2025 at 10:30 AM" */
export function fmtDT(s?: string | null): string {
  return s ? `${fmtDate(s)} at ${fmtTime(s)}` : "—";
}

/** Returns a human-readable interview type label */
export function typeLabel(t?: string | null): string {
  const map: Record<string, string> = {
    video:     "Video Call",
    phone:     "Phone Interview",
    onsite:    "On-site",
    technical: "Technical Round",
    hr:        "HR Round",
    final:     "Final Round",
  };
  return (t && map[t]) ? map[t] : t || "—";
}

/** Returns a friendly date string like "Monday, April 7" */
export function friendlyDate(d: Date): string {
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

/** Converts a Date + time string like "2:30 PM" into a full Date object */
export function slotToDate(date: Date, timeStr: string): Date {
  const [hm, ap] = timeStr.split(" ");
  const [hS, mS] = hm.split(":");
  let h = parseInt(hS, 10);
  const m = parseInt(mS, 10);
  const pm = ap?.toUpperCase().includes("PM");
  if (pm && h !== 12) h += 12;
  if (!pm && h === 12) h = 0;
  const dt = new Date(date);
  dt.setHours(h, m, 0, 0);
  return dt;
}