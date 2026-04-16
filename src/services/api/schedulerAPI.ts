// // import api from "./axiosConfig";

// // /** Raw types returned by backend */
// // export type RawCandidate = {
// //   id: number | string;
// //   name?: string;
// //   email?: string;
// //   job_id?: number | string;
// //   job_title?: string;
// //   role?: string;
// //   resume_path?: string | null;
// //   photo?: string | null;
// //   job_description?: string | null;
// //   interview_scheduled?: boolean;
// // };

// // export type ScheduleResponse = {
// //   success: boolean;
// //   already_scheduled?: boolean;
// //   interview_link?: string;
// //   knowledge_base_id?: string;
// //   resume_extracted?: boolean;
// //   job_description_used?: boolean;
// //   email_sent?: boolean;
// //   message?: string;
// // };

// // export async function fetchCandidatesAPI(jobId?: number | string): Promise<RawCandidate[]> {
// //   const { data } = await api.get("api/candidates", {
// //     params: jobId ? { job_id: jobId } : undefined,
// //     headers: { "Cache-Control": "no-store" },
// //   });
// //   return Array.isArray(data) ? data : [];
// // }

// // export async function scheduleInterviewAPI(payload: {
// //   candidate_id: number | string;
// //   email: string;
// //   date_iso: string;     // ISO string
// //   time_slot: string;    // e.g. "2:30 PM"
// //   job_description?: string | null;
// // }): Promise<ScheduleResponse> {
// //   const { data } = await api.post("api/schedule-interview", {
// //     candidate_id: payload.candidate_id,
// //     email: payload.email,
// //     date: payload.date_iso,
// //     time_slot: payload.time_slot,
// //     job_description: payload.job_description ?? null,
// //   });
// //   return data as ScheduleResponse;
// // }

// // // src/services/api/schedulerAPI.ts
// // import api from "@/services/api/axiosConfig";

// // export interface RawCandidate {
// //   id: number | string;
// //   name: string;
// //   email?: string;
// //   role?: string;
// //   job_id?: string;
// //   job_title?: string;
// //   job_description?: string;
// //   photo?: string | null;
// //   resume_path?: string | null;
// // }

// // export interface SchedulePayload {
// //   candidate_id: number | string;
// //   email: string;
// //   date_iso: string;
// //   time_slot: string;
// //   job_description?: string | null;
// // }

// // export interface ScheduleResponse {
// //   success: boolean;
// //   message?: string;
// //   interview_link?: string;
// //   already_scheduled?: boolean;
// //   knowledge_base_id?: string;
// //   resume_extracted?: boolean;
// //   job_description_used?: boolean;
// //   email_sent?: boolean;
// // }

// // /* ------------------------------------------------------------------ */
// // /*                       FETCH ALL CANDIDATES                         */
// // /* ------------------------------------------------------------------ */
// // /**
// //  * Fetch all candidates or filter by jobId
// //  */
// // export async function fetchCandidates(jobId?: string): Promise<RawCandidate[]> {
// //   try {
// //     const url = jobId
// //       ? `/api/candidates?jobId=${encodeURIComponent(jobId)}`
// //       : `/api/candidates`;

// //     console.log("📡 Fetching candidates from:", url);

// //     const { data } = await api.get(url);

// //     if (!Array.isArray(data)) {
// //       console.warn("⚠️ Unexpected candidate response format:", data);
// //       return [];
// //     }

// //     console.log("✅ Candidates fetched successfully:", data.length);
// //     return data;
// //   } catch (error: any) {
// //     console.error("🚨 Error fetching candidates:", error.message || error);
// //     throw new Error("Unable to fetch candidates from server.");
// //   }
// // }

// // /* ------------------------------------------------------------------ */
// // /*                      FETCH SINGLE CANDIDATE                        */
// // /* ------------------------------------------------------------------ */
// // /**
// //  * Fetch a single candidate by ID
// //  */
// // export async function fetchCandidateById(id: string | number): Promise<RawCandidate | null> {
// //   try {
// //     const { data } = await api.get(`/api/candidates?id=${id}`);
// //     return Array.isArray(data) ? data[0] : data;
// //   } catch (error: any) {
// //     console.error("🚨 Error fetching candidate by ID:", error.message);
// //     return null;
// //   }
// // }

// // /* ------------------------------------------------------------------ */
// // /*                        SCHEDULE INTERVIEW                          */
// // /* ------------------------------------------------------------------ */
// // /**
// //  * Schedule an interview (Flask backend: /api/secure_interview/<token>)
// //  */
// // export async function scheduleInterview(payload: SchedulePayload): Promise<ScheduleResponse> {
// //   try {
// //     const url = `/api/schedule_interview/${payload.candidate_id}`;
// //     console.log("📡 Scheduling interview:", payload);

// //     const { data } = await api.post<ScheduleResponse>(url, payload);

// //     if (!data.success) {
// //       console.error("❌ Failed to schedule interview:", data.message);
// //       throw new Error(data.message || "Failed to schedule interview");
// //     }

// //     console.log("✅ Interview scheduled successfully:", data);
// //     return data;
// //   } catch (error: any) {
// //     console.error("🚨 Error scheduling interview:", error.message || error);
// //     throw new Error("Unable to schedule interview. Please try again later.");
// //   }
// // }

// // /* ------------------------------------------------------------------ */
// // /*                           SEND REMINDER                            */
// // /* ------------------------------------------------------------------ */
// // /**
// //  * Optional: Send a reminder email to a candidate (custom Flask endpoint)
// //  */
// // export async function sendReminder(candidate_id: number | string) {
// //   try {
// //     const { data } = await api.post("/api/reminder", { candidate_id });
// //     console.log("✅ Reminder sent successfully");
// //     return data;
// //   } catch (error: any) {
// //     console.error("🚨 Error sending reminder:", error.message);
// //     throw new Error("Unable to send reminder.");
// //   }
// // }

// // /* ------------------------------------------------------------------ */
// // /*                     HELPER: GET JOBS (OPTIONAL)                     */
// // /* ------------------------------------------------------------------ */
// // export async function fetchJobs() {
// //   try {
// //     const { data } = await api.get("/api/jobs");
// //     console.log("✅ Jobs fetched successfully:", data.length);
// //     return Array.isArray(data) ? data : [];
// //   } catch (error: any) {
// //     console.error("🚨 Error fetching jobs:", error.message);
// //     return [];
// //   }
// // }

// // // ✅ schedulerAPI.ts
// // import api from "@/services/api/axiosConfig";

// // /**
// //  * Types (you can adjust these if your backend sends different fields)
// //  */
// // export interface RawCandidate {
// //   id: string | number;
// //   name: string;
// //   email?: string;
// //   job_id?: string | number;
// //   job_title?: string;
// //   role?: string;
// //   resume_path?: string | null;
// //   photo?: string | null;
// //   job_description?: string | null;
// //   interview_scheduled?: boolean;
// // }
// // export interface SchedulePayload {
// //   candidate_id: string | number;
// //   email: string;
// //   date_iso: string;
// //   time_slot: string;
// //   job_description?: string;
// // }

// // export interface ScheduleResponse {
// //   success: boolean;
// //   message: string;
// //   interview_link?: string;
// //   already_scheduled?: boolean;
// //   knowledge_base_id?: string | null;
// //   resume_extracted?: boolean;
// //   job_description_used?: boolean;
// //   email_sent?: boolean;
// // }

// // /** ✅ Fetch candidates (optionally filter by jobId) */
// // export async function fetchCandidates(jobId?: string | number): Promise<RawCandidate[]> {
// //   try {
// //     const { data } = await api.get("/api/candidates", {
// //       params: jobId != null ? { job_id: jobId } : undefined,
// //       headers: { "Cache-Control": "no-store" },
// //     });
// //     return Array.isArray(data) ? data : [];
// //   } catch (error: any) {
// //     console.error("❌ Error fetching candidates:", error.message || error);
// //     throw new Error("Unable to fetch candidates from server.");
// //   }
// // }

// // /**
// //  * ✅ Schedule an interview (main POST call)
// //  */
// // export async function scheduleInterview(
// //   payload: SchedulePayload
// // ): Promise<ScheduleResponse> {
// //   const url = "/api/schedule-interview";

// //   try {
// //     console.log("🚀 Scheduling interview payload:", payload);

// //     const { data } = await api.post<ScheduleResponse>(url, payload);

// //     console.log("✅ Schedule API response:", data);
// //     return data;
// //   } catch (error: any) {
// //     console.error("❌ Error scheduling interview:", error.message || error);
// //     throw new Error("Unable to schedule interview. Please try again later.");
// //   }
// // }

// // /**
// //  * ✅ Fetch scheduled interviews
// //  */
// // export async function fetchScheduledInterviews() {
// //   try {
// //     const { data } = await api.get("/api/scheduled-interviews");
// //     return Array.isArray(data) ? data : [];
// //   } catch (error: any) {
// //     console.error("❌ Error fetching scheduled interviews:", error.message || error);
// //     throw new Error("Unable to fetch scheduled interviews.");
// //   }
// // }

// // /**
// //  * ✅ Cancel an interview (optional endpoint)
// //  */
// // export async function cancelInterview(interview_id: string | number) {
// //   try {
// //     const { data } = await api.delete(`/api/schedule-interview/${interview_id}`);
// //     console.log("🗑️ Cancel interview:", data);
// //     return data;
// //   } catch (error: any) {
// //     console.error("❌ Error canceling interview:", error.message || error);
// //     throw new Error("Unable to cancel interview. Please try again later.");
// //   }
// // }

// // import api from "@/services/api/axiosConfig";

// // /** ------------------------ Types ------------------------ */
// // export interface RawCandidate {
// //   id: string | number;
// //   name: string;
// //   email?: string;
// //   job_id?: string | number;
// //   job_title?: string;
// //   role?: string;
// //   resume_path?: string | null;
// //   photo?: string | null;
// //   job_description?: string | null;
// //   interview_scheduled?: boolean;
// // }

// // export interface SchedulePayload {
// //   candidate_id: string | number;
// //   email: string;
// //   date_iso: string;   // ISO date string
// //   time_slot: string;  // e.g. "2:30 PM"
// //   // IMPORTANT: we keep this strict (string or omitted, not null)
// //   job_description?: string;
// // }

// // export interface ScheduleResponse {
// //   success: boolean;
// //   message: string;
// //   interview_link?: string;
// //   already_scheduled?: boolean;
// //   knowledge_base_id?: string | null;
// //   resume_extracted?: boolean;
// //   job_description_used?: boolean;
// //   email_sent?: boolean;
// // }

// // /** --------------------- API Functions ------------------- */

// // /** Fetch candidates (optionally filter by jobId) */
// // export async function fetchCandidates(jobId?: string | number): Promise<RawCandidate[]> {
// //   try {
// //     const { data } = await api.get("/api/candidates", {
// //       params: jobId != null ? { job_id: jobId } : undefined,
// //       headers: { "Cache-Control": "no-store" },
// //     });
// //     return Array.isArray(data) ? data : [];
// //   } catch (error: any) {
// //     console.error("❌ Error fetching candidates:", error.message || error);
// //     throw new Error("Unable to fetch candidates from server.");
// //   }
// // }

// // /** Schedule an interview */
// // export async function scheduleInterview(payload: SchedulePayload): Promise<ScheduleResponse> {
// //   try {
// //     const { data } = await api.post<ScheduleResponse>("/api/schedule-interview", payload);
// //     return data;
// //   } catch (error: any) {
// //     console.error("❌ Error scheduling interview:", error.message || error);
// //     throw new Error("Unable to schedule interview. Please try again later.");
// //   }
// // }

// // /** Fetch scheduled interviews */
// // export async function fetchScheduledInterviews() {
// //   try {
// //     const { data } = await api.get("/api/scheduled-interviews");
// //     return Array.isArray(data) ? data : [];
// //   } catch (error: any) {
// //     console.error("❌ Error fetching scheduled interviews:", error.message || error);
// //     throw new Error("Unable to fetch scheduled interviews.");
// //   }
// // }

// // /** Cancel an interview */
// // export async function cancelInterview(interview_id: string | number) {
// //   try {
// //     const { data } = await api.delete(`/api/schedule-interview/${interview_id}`);
// //     return data;
// //   } catch (error: any) {
// //     console.error("❌ Error canceling interview:", error.message || error);
// //     throw new Error("Unable to cancel interview. Please try again later.");
// //   }
// // }

// import api from "@/services/api/axiosConfig";

// /** ------------------------ Types ------------------------ */
// export interface RawCandidate {
//   id: string | number;
//   name: string;
//   email?: string;
//   job_id?: string | number;
//   job_title?: string;
//   role?: string;
//   resume_path?: string | null;
//   photo?: string | null;
//   job_description?: string | null;
//   interview_scheduled?: boolean;
// }

// export interface SchedulePayload {
//   candidate_id: string | number;
//   email: string;
//   date_iso: string;   // ISO date string
//   time_slot: string;  // e.g. "2:30 PM"
//   // IMPORTANT: we keep this strict (string or omitted, not null)
//   job_description?: string;
// }

// export interface ScheduleResponse {
//   success: boolean;
//   message: string;
//   interview_link?: string;
//   already_scheduled?: boolean;
//   knowledge_base_id?: string | null;
//   resume_extracted?: boolean;
//   job_description_used?: boolean;
//   email_sent?: boolean;
// }

// /** --------------------- API Functions ------------------- */

// /** Fetch candidates (optionally filter by jobId) */
// export async function fetchCandidates(jobId?: string | number): Promise<RawCandidate[]> {
//   try {
//     const { data } = await api.get("/api/candidates", {
//       params: jobId != null ? { job_id: jobId } : undefined,
//       headers: { "Cache-Control": "no-store" },
//     });
//     return Array.isArray(data) ? data : [];
//   } catch (err: unknown) {
//     const error = err as { message?: string };
//     console.error("❌ Error fetching candidates:", error.message || err);
//     throw new Error("Unable to fetch candidates from server.");
//   }
// }

// /** Schedule an interview */
// export async function scheduleInterview(payload: SchedulePayload): Promise<ScheduleResponse> {
//   try {
//     const { data } = await api.post<ScheduleResponse>("/api/schedule-interview", payload);
//     return data;
//   } catch (err: unknown) {
//     const error = err as { message?: string };
//     console.error("❌ Error scheduling interview:", error.message || err);
//     throw new Error("Unable to schedule interview. Please try again later.");
//   }
// }

// /** Fetch scheduled interviews */
// export async function fetchScheduledInterviews() {
//   try {
//     const { data } = await api.get("/api/scheduled-interviews");
//     return Array.isArray(data) ? data : [];
//   } catch (err: unknown) {
//     const error = err as { message?: string };
//     console.error("❌ Error fetching scheduled interviews:", error.message || err);
//     throw new Error("Unable to fetch scheduled interviews.");
//   }
// }

// /** Cancel an interview */
// export async function cancelInterview(interview_id: string | number) {
//   try {
//     const { data } = await api.delete(`/api/schedule-interview/${interview_id}`);
//     return data;
//   } catch (err: unknown) {
//     const error = err as { message?: string };
//     console.error("❌ Error canceling interview:", error.message || err);
//     throw new Error("Unable to cancel interview. Please try again later.");
//   }
// }
import api from "@/services/api/axiosConfig";

/** ------------------------ Types ------------------------ */
export interface RawCandidate {
  id: string | number;
  name: string;
  email?: string;
  job_id?: string | number;
  job_title?: string;
  role?: string;
  resume_path?: string | null;
  photo?: string | null;
  job_description?: string | null;
  interview_scheduled?: boolean;
}

export interface SchedulePayload {
  candidate_id: string | number;
  email: string;
  date_iso: string;   // ISO date string
  time_slot: string;  // e.g. "2:30 PM"
  job_description?: string;
}

export interface ScheduleResponse {
  success: boolean;
  message: string;
  interview_link?: string;
  already_scheduled?: boolean;
  knowledge_base_id?: string | null;
  resume_extracted?: boolean;
  job_description_used?: boolean;
  email_sent?: boolean;
}

/** --------------------- API Functions ------------------- */

/** Fetch candidates (optionally filter by jobId) */
export async function fetchCandidates(jobId?: string | number): Promise<RawCandidate[]> {
  try {
    const { data } = await api.get("/api/candidates", {
      params: jobId != null ? { job_id: jobId } : undefined,
      headers: { "Cache-Control": "no-store" },
    });
    return Array.isArray(data) ? data : [];
  } catch (err: unknown) {
    const error = err as { message?: string };
    console.error("❌ Error fetching candidates:", error.message || err);
    throw new Error("Unable to fetch candidates from server.");
  }
}

/**
 * Schedule an interview.
 *
 * FIX 1 — URL: was "/api/schedule-interview" (hyphen).
 *           Backend Flask route is "/api/schedule_interview" (underscore) → was causing 500.
 *
 * FIX 2 — Error handling: was re-throwing, which crashed submitAuto in SchedulerInterface.tsx.
 *           Now returns { success: false, message } so the UI can show a graceful fallback
 *           instead of an unhandled exception overlay.
 */
export async function scheduleInterview(payload: SchedulePayload): Promise<ScheduleResponse> {
  try {
    const { data } = await api.post<ScheduleResponse>("/api/schedule_interview", payload);
    return data;
  } catch (err: unknown) {
    const axiosErr = err as {
      response?: { status?: number; data?: { message?: string; detail?: string } };
      message?: string;
    };

    const status = axiosErr?.response?.status;
    const detail =
      axiosErr?.response?.data?.message ||
      axiosErr?.response?.data?.detail ||
      axiosErr?.message ||
      "Unknown error";

    console.warn(`[Scheduler] API ${status ?? "network"} error:`, detail);

    // Return structured failure — never throw — so submitAuto can handle it gracefully
    return {
      success: false,
      message:
        status === 500
          ? "The scheduling server is temporarily unavailable. Interview saved locally."
          : `Network error: ${detail}`,
    };
  }
}

/** Fetch scheduled interviews */
export async function fetchScheduledInterviews() {
  try {
    const { data } = await api.get("/api/scheduled_interviews");
    return Array.isArray(data) ? data : [];
  } catch (err: unknown) {
    const error = err as { message?: string };
    console.error("❌ Error fetching scheduled interviews:", error.message || err);
    throw new Error("Unable to fetch scheduled interviews.");
  }
}

/** Cancel an interview */
export async function cancelInterview(interview_id: string | number) {
  try {
    const { data } = await api.delete(`/api/schedule_interview/${interview_id}`);
    return data;
  } catch (err: unknown) {
    const error = err as { message?: string };
    console.error("❌ Error canceling interview:", error.message || err);
    throw new Error("Unable to cancel interview. Please try again later.");
  }
}