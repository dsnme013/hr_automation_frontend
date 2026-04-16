// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   fetchCandidatesAPI,
//   scheduleInterviewAPI,
//   type RawCandidate,
//   type ScheduleResponse,
// } from "@/services/api/schedulerAPI";

// /** Load candidates (optionally by job_id) */
// export const schedulerFetchCandidates = createAsyncThunk<
//   RawCandidate[],
//   number | string | undefined,
//   { rejectValue: string }
// >("scheduler/fetchCandidates", async (jobId, { rejectWithValue }) => {
//   try {
//     return await fetchCandidatesAPI(jobId);
//   } catch (err: any) {
//     return rejectWithValue(err?.response?.data?.message || err?.message || "Failed to load candidates");
//   }
// });

// /** Schedule interview for a candidate */
// export const schedulerScheduleInterview = createAsyncThunk<
//   ScheduleResponse,
//   {
//     candidate_id: number | string;
//     email: string;
//     date_iso: string;
//     time_slot: string;
//     job_description?: string | null;
//   },
//   { rejectValue: string }
// >("scheduler/scheduleInterview", async (payload, { rejectWithValue }) => {
//   try {
//     return await scheduleInterviewAPI(payload);
//   } catch (err: any) {
//     return rejectWithValue(err?.response?.data?.message || err?.message || "Failed to schedule interview");
//   }
// });

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   fetchCandidates as fetchCandidatesAPI, // correct export, aliased for clarity
//   scheduleInterview,
//   type RawCandidate,
//   type ScheduleResponse,
// } from "@/services/api/schedulerAPI";

// /** Load candidates (optionally by job_id) */
// export const schedulerFetchCandidates = createAsyncThunk<
//   RawCandidate[],
//   number | string | undefined,
//   { rejectValue: string }
// >("scheduler/fetchCandidates", async (jobId, { rejectWithValue }) => {
//   try {
//     // API expects string | undefined; normalize here
//     const normalized: string | undefined =
//       jobId == null ? undefined : String(jobId);

//     return await fetchCandidatesAPI(normalized);
//   } catch (err: any) {
//     return rejectWithValue(
//       err?.response?.data?.message || err?.message || "Failed to load candidates"
//     );
//   }
// });

// /** Schedule interview for a candidate */
// export const schedulerScheduleInterview = createAsyncThunk<
//   ScheduleResponse,
//   {
//     candidate_id: number | string;
//     email: string;
//     date_iso: string;
//     time_slot: string;
//     job_description?: string | null;
//   },
//   { rejectValue: string }
// >("scheduler/scheduleInterview", async (payload, { rejectWithValue }) => {
//   try {
//     return await scheduleInterview(safepayload);
//   } catch (err: any) {
//     return rejectWithValue(
//       err?.response?.data?.message || err?.message || "Failed to schedule interview"
//     );
//   }
// });

// import { createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   fetchCandidates as fetchCandidatesAPI,
//   scheduleInterview,
//   type RawCandidate,
//   type ScheduleResponse,
//   type SchedulePayload,
// } from "@/services/api/schedulerAPI";

// /** Load candidates (optionally by job_id) */
// export const schedulerFetchCandidates = createAsyncThunk<
//   RawCandidate[],
//   number | string | undefined,
//   { rejectValue: string }
// >("scheduler/fetchCandidates", async (jobId, { rejectWithValue }) => {
//   try {
//     const normalized: string | number | undefined =
//       jobId == null ? undefined : (typeof jobId === "number" ? jobId : String(jobId));
//     return await fetchCandidatesAPI(normalized);
//   } catch (err: any) {
//     return rejectWithValue(
//       err?.response?.data?.message || err?.message || "Failed to load candidates"
//     );
//   }
// });

// /** Schedule interview for a candidate */
// export const schedulerScheduleInterview = createAsyncThunk<
//   ScheduleResponse,
//   {
//     candidate_id: number | string;
//     email: string;
//     date_iso: string;
//     time_slot: string;
//     // UI may pass null; we will normalize before calling API
//     job_description?: string | null;
//   },
//   { rejectValue: string }
// >("scheduler/scheduleInterview", async (payload, { rejectWithValue }) => {
//   try {
//     // Normalize null -> undefined to match SchedulePayload
//     const { job_description, ...rest } = payload;
//     const safePayload: SchedulePayload = {
//       ...rest,
//       ...(job_description != null ? { job_description } : {}), // omit if null/undefined
//     };
//     return await scheduleInterview(safePayload);
//   } catch (err: any) {
//     return rejectWithValue(
//       err?.response?.data?.message || err?.message || "Failed to schedule interview"
//     );
//   }
// });


import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCandidates as fetchCandidatesAPI,
  scheduleInterview,
  type RawCandidate,
  type ScheduleResponse,
  type SchedulePayload,
} from "@/services/api/schedulerAPI";

/** Load candidates (optionally by job_id) */
export const schedulerFetchCandidates = createAsyncThunk<
  RawCandidate[],
  number | string | undefined,
  { rejectValue: string }
>("scheduler/fetchCandidates", async (jobId, { rejectWithValue }) => {
  try {
    const normalized: string | number | undefined =
      jobId == null ? undefined : (typeof jobId === "number" ? jobId : String(jobId));
    return await fetchCandidatesAPI(normalized);
  } catch (err: unknown) {
    const error = err as { response?: { data?: { message?: string } }; message?: string };
    return rejectWithValue(
      error?.response?.data?.message || error?.message || "Failed to load candidates"
    );
  }
});

/** Schedule interview for a candidate */
export const schedulerScheduleInterview = createAsyncThunk<
  ScheduleResponse,
  {
    candidate_id: number | string;
    email: string;
    date_iso: string;
    time_slot: string;
    job_description?: string | null;
  },
  { rejectValue: string }
>("scheduler/scheduleInterview", async (payload, { rejectWithValue }) => {
  try {
    const { job_description, ...rest } = payload;

    const safePayload: SchedulePayload = {
      ...rest,
      ...(job_description != null ? { job_description } : {}),
    };

    return await scheduleInterview(safePayload);
  } catch (err: unknown) {
    const error = err as { response?: { data?: { message?: string } }; message?: string };
    return rejectWithValue(
      error?.response?.data?.message || error?.message || "Failed to schedule interview"
    );
  }
});
