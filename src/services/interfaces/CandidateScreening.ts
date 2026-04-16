// // Types

// export interface AssessmentResultRow {
//   id?: string | number;
//   type: "testlify" | "criteria" | string;
//   score?: number | null;
//   completed?: boolean;
//   invite_link?: string | null;
//   completed_date?: string | null;
//   feedback?: string | null;
// }

// export interface StatusInfo {
//   color: string;
//   icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
//   priority: number;
// }
// // export interface Candidate {
// //   id: number | string;

// //   // BASIC (backend often missing)
// //   name?: string;
// //   email: string;

// //   job_id: string;
// //   job_title: string;
// //   status: string;

// //   processed_date: string;

// //   assessment_invite_link: string | null;

// //   final_status: string;
// //   ats_score: number;
// //   resume_path: string;

// //   // Assessment states
// //   exam_link_sent: boolean;
// //   exam_started: boolean;
// //   exam_link_sent_date: string | null;
// //   exam_time_taken: number | null;
// //   exam_completed: boolean;
// //   exam_percentage: number;
// //   link_expired: boolean;
// //   interview_scheduled: boolean;

// //   // UI related
// //   displayStatus: string;
// //   displayScore: number;
// //   scoreColor: string;
// //   statusInfo: StatusInfo;

// //   // Legacy Testlify fields
// //   testlify_score: number;
// //   testlify_completed: boolean;
// //   testlify_invite_link: string | null;
// //   testlify_completed_date: string | null;

// //   // Legacy Criteria fields
// //   criteria_score: number;
// //   criteria_completed: boolean;
// //   criteria_invite_link: string | null;
// //   criteria_completed_date: string | null;

// //   // Unified assessment array
// //   assessment_results: AssessmentResultRow[];

// //   // Extra backend info
// //   exam_feedback: string;
// // }

// export interface Candidate {
//   id: number | string;

//   // Basic fields (optional)
//   name?: string;
//   email?: string;

//   // Job info (optional)
//   job_id?: string;
//   job_title?: string;
//   status?: string;
//   processed_date?: string | null;

//   // ATS + resume (optional)
//   final_status?: string;
//   ats_score?: number;
//   resume_path?: string;

//   // Exam fields (optional)
//   exam_link_sent?: boolean;
//   exam_started?: boolean;
//   exam_link_sent_date?: string | null;
//   exam_time_taken?: number | null;
//   exam_completed?: boolean;
//   exam_percentage?: number;
//   link_expired?: boolean;
//   interview_scheduled?: boolean;

//   // UI helpers (optional)
//   displayStatus?: string;
//   displayScore?: number;
//   scoreColor?: string;

//   // Assessment links (optional)
//   assessment_invite_link?: string | null;

//   // Testlify (optional)
//   testlify_score?: number;
//   testlify_completed?: boolean;
//   testlify_invite_link?: string | null;
//   testlify_completed_date?: string | null;

//   // Criteria (optional)
//   criteria_score?: number;
//   criteria_completed?: boolean;
//   criteria_invite_link?: string | null;
//   criteria_completed_date?: string | null;

//   // Multi-assessment (optional)
//   assessment_results?: AssessmentResultRow[];
//   statusInfo?: StatusInfo;

//   // Feedback (optional)
//   exam_feedback?: string;
// }

// export interface AssessmentResultRow {
//   id?: string | number;
//   type: "testlify" | "criteria" | string;
//   score?: number | null;
//   completed?: boolean;
//   invite_link?: string | null;
//   completed_date?: string | null;
//   feedback?: string | null;
// }



// export interface Job {
//   id: string | number;
//   title: string;
//   location: string;
//   description: string;
//   requirements?: string;
//   created_at?: string;
//   status?: string;
// }
// export interface AssessmentStats {
//   totalSent: number;
//   totalCompleted: number;
//   avgScore: number;
//   passRate: number;
// }

// ============================================================
// CandidateScreening.ts
// Auto-generated from candidates.py API response shape
// ============================================================

// ── Job ──────────────────────────────────────────────────────
export interface Job {
  id: string | number;
  title: string;
  location: string;
}

// ── Assessment Stats (used by StatsCards / OverviewTab) ──────
export interface AssessmentStats {
  totalSent: number;
  totalCompleted: number;
  avgScore: number;
  passRate: number;
}

export interface AssessmentState {
  jobs: Job[];
  candidates: Candidate[];
  assessmentStats: AssessmentStats;
  isLoading: boolean;
  message: string;
}

const initialState: AssessmentState = {
  jobs: [],
  candidates: [],
  assessmentStats: {
    totalSent: 0,
    totalCompleted: 0,
    avgScore: 0,
    passRate: 0,
  },
  isLoading: false,
  message: "",
};
// ── Status badge info (used by CandidateCard / Details) ──────
export interface StatusInfo {
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  priority: number;
}

// ── Assessment Result Row (legacy two-domain support) ────────
export interface AssessmentResultRow {
  type: string;                   // "testlify" | "criteria" | etc.
  score?: number;
  completed: boolean;
  invite_link: string | null;
  completed_date: string | null;
  feedback: string | null;
}

// ── Main Candidate interface ──────────────────────────────────
// Every field maps 1-to-1 with the JSON returned by
// GET /api/candidates  (see candidates.py get_cached_candidates)
export interface Candidate {
  // ── Core identity ─────────────────────────────────────────
  id: number;
  name: string;
  email: string;
  job_id: string;
  job_title: string;
  status: string;                         // "Shortlisted" | "Rejected" | ...

  // ── ATS scoring ───────────────────────────────────────────
  ats_score: number;                      // 0–100
  score_reasoning: string | null;

  // ── Contact / profile ─────────────────────────────────────
  phone: string | null;
  linkedin: string | null;
  github: string | null;
  resume_path: string | null;
  resume_url: string | null;              // same as resume_path (compat alias)
  processed_date: string | null;          // ISO datetime string

  // ── Assessment invite ─────────────────────────────────────
  assessment_invite_link: string | null;
  exam_link_sent: boolean;
  exam_link_sent_date: string | null;     // ISO datetime string
  exam_started: boolean;
  exam_completed: boolean;
  exam_completed_date: string | null;     // ISO datetime string
  link_expired: boolean;
  time_remaining_hours: number | null;    // hours until link expires
  exam_percentage: number | null;         // 0–100
  exam_time_taken: number | null;         // minutes (from DB, used in table)
  exam_feedback: string | null;

  // ── Interview scheduling ──────────────────────────────────
  interview_scheduled: boolean;
  interview_date: string | null;          // ISO datetime string
  interview_link: string | null;
  interview_token: string | null;

  // ── Interview progress ────────────────────────────────────
  interview_started_at: string | null;    // ISO datetime string
  interview_completed_at: string | null;  // ISO datetime string
  interview_duration: number;             // seconds or minutes
  interview_progress: number;             // 0–100 percentage
  interview_questions_answered: number;
  interview_total_questions: number;

  // ── Interview AI scores ───────────────────────────────────
  interview_ai_score: number | null;
  interview_ai_technical_score: number | null;
  interview_ai_communication_score: number | null;
  interview_ai_problem_solving_score: number | null;
  interview_ai_cultural_fit_score: number | null;
  interview_ai_overall_feedback: string | null;
  interview_ai_analysis_status: string | null;
  interview_final_status: string | null;

  // ── Interview insights ────────────────────────────────────
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];

  // ── Interview recording ───────────────────────────────────
  interview_recording_url: string | null;

  // ── Final status ──────────────────────────────────────────
  final_status: string | null;            // "Hired" | "Rejected After Exam" | null

  // ── Legacy two-domain assessment support (optional) ───────
  assessment_results?: AssessmentResultRow[];
  testlify_score?: number;
  testlify_completed?: boolean;
  testlify_invite_link?: string | null;
  testlify_completed_date?: string | null;
  criteria_score?: number;
  criteria_completed?: boolean;
  criteria_invite_link?: string | null;
  criteria_completed_date?: string | null;

  // ── UI-computed fields (added by processedCandidates memo) ─
  // These are NOT from the API — they are added in the frontend
  displayStatus?: string;
  displayScore?: number;
  scoreColor?: string;
  statusInfo?: StatusInfo;
}
