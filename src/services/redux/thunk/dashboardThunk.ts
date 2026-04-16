// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // import { createAsyncThunk } from "@reduxjs/toolkit";
// // import { getJobs, getCandidates, getRecruitmentStats } from "@/services/api/dashboardAPI";

// // /** Jobs */
// // export const dashboardFetchJobs = createAsyncThunk(
// //   "dashboard/fetchJobs",
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       return await getJobs();
// //     } catch (err: any) {
// //       return rejectWithValue(err?.response?.data?.message || err?.message || "Failed to load jobs");
// //     }
// //   }
// // );

// // /** Candidates (optionally by job_id) */
// // export const dashboardFetchCandidates = createAsyncThunk(
// //   "dashboard/fetchCandidates",
// //   async (job_id?: number | string, { rejectWithValue }) => {
// //     try {
// //       return await getCandidates(job_id);
// //     } catch (err: any) {
// //       return rejectWithValue(
// //         err?.response?.data?.message || err?.message || "Failed to load candidates"
// //       );
// //     }
// //   }
// // );

// // /** Recruitment charts/series */
// // export const dashboardFetchRecruitmentStats = createAsyncThunk(
// //   "dashboard/fetchRecruitmentStats",
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       return await getRecruitmentStats();
// //     } catch (err: any) {
// //       return rejectWithValue(
// //         err?.response?.data?.message || err?.message || "Failed to load recruitment stats"
// //       );
// //     }
// //   }
// // );

// // /** Convenience: fetch everything the dashboard needs in parallel */
// // export const dashboardRefreshAll = createAsyncThunk(
// //   "dashboard/refreshAll",
// //   async (_: void, { dispatch }) => {
// //     const [jobs, candidates, stats] = await Promise.all([
// //       dispatch(dashboardFetchJobs()).unwrap(),
// //       dispatch(dashboardFetchCandidates()).unwrap(),
// //       dispatch(dashboardFetchRecruitmentStats()).unwrap(),
// //     ]);
// //     return { jobs, candidates, stats, at: Date.now() };
// //   }
// // );

// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // import { createAsyncThunk } from "@reduxjs/toolkit";
// // import {
// //   getJobs,
// //   getCandidates,
// //   getRecruitmentStats,
// // } from "@/services/api/dashboardAPI";

// // /** Jobs */
// // export const dashboardFetchJobs = createAsyncThunk(
// //   "dashboard/fetchJobs",
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       return await getJobs();
// //     } catch (err: any) {
// //       return rejectWithValue(
// //         err?.response?.data?.message || err?.message || "Failed to load jobs"
// //       );
// //     }
// //   }
// // );

// // /** Candidates (optionally by job_id) */
// // export const dashboardFetchCandidates = createAsyncThunk(
// //   "dashboard/fetchCandidates",
// //   async (job_id?: number | string, { rejectWithValue }) => {
// //     try {
// //       return await getCandidates(job_id);
// //     } catch (err: any) {
// //       return rejectWithValue(
// //         err?.response?.data?.message ||
// //           err?.message ||
// //           "Failed to load candidates"
// //       );
// //     }
// //   }
// // );

// // /** Recruitment charts/series */
// // export const dashboardFetchRecruitmentStats = createAsyncThunk(
// //   "dashboard/fetchRecruitmentStats",
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       return await getRecruitmentStats();
// //     } catch (err: any) {
// //       return rejectWithValue(
// //         err?.response?.data?.message ||
// //           err?.message ||
// //           "Failed to load recruitment stats"
// //       );
// //     }
// //   }
// // );

// // /** Convenience: fetch everything the dashboard needs in parallel */
// // export const dashboardRefreshAll = createAsyncThunk(
// //   "dashboard/refreshAll",
// //   async (_: void, { dispatch }) => {
// //     const [jobs, candidates, recruitmentData] = await Promise.all([
// //       dispatch(dashboardFetchJobs()).unwrap(),
// //       dispatch(dashboardFetchCandidates()).unwrap(),
// //       dispatch(dashboardFetchRecruitmentStats()).unwrap(),
// //     ]);

// //     // Return keys that your slice expects:
// //     // { jobs, candidates, recruitmentData, at }
// //     return { jobs, candidates, recruitmentData, at: Date.now() };
// //   }
// // );

// // import { createAsyncThunk } from "@reduxjs/toolkit";
// // import {
// //   getJobs,
// //   getCandidates,
// //   getRecruitmentStats,
// // } from "@/services/api/dashboardAPI";

// // /** Jobs */
// // export const dashboardFetchJobs = createAsyncThunk(
// //   "dashboard/fetchJobs",
// //   async (_: void, { rejectWithValue}) => {
// //     try {
// //       // Pass AbortSignal if your API adapter supports it
// //       const res = await getJobs(/* optionally: { signal } */);
// //       return res;
// //     } catch (err: any) {
// //       return rejectWithValue(
// //         err?.response?.data?.message || err?.message || "Failed to load jobs"
// //       );
// //     }
// //   }
// // );

// // /** Candidates (optionally by job_id) */
// // export const dashboardFetchCandidates = createAsyncThunk(
// //   "dashboard/fetchCandidates",
// //   // NOTE: first param is typed, not optional; use `undefined` when no job filter
// //   async (job_id: number | string | undefined, { rejectWithValue}) => {
// //     try {
// //       const res = await getCandidates(job_id /*, { signal } */);
// //       return res;
// //     } catch (err: any) {
// //       return rejectWithValue(
// //         err?.response?.data?.message || err?.message || "Failed to load candidates"
// //       );
// //     }
// //   }
// // );

// // /** Recruitment charts/series */
// // export const dashboardFetchRecruitmentStats = createAsyncThunk(
// //   "dashboard/fetchRecruitmentStats",
// //   async (_: void, { rejectWithValue}) => {
// //     try {
// //       const res = await getRecruitmentStats(/* { signal } */);
// //       return res;
// //     } catch (err: any) {
// //       return rejectWithValue(
// //         err?.response?.data?.message || err?.message || "Failed to load recruitment stats"
// //       );
// //     }
// //   }
// // );

// // /** Convenience: fetch everything the dashboard needs in parallel */
// // export const dashboardRefreshAll = createAsyncThunk(
// //   "dashboard/refreshAll",
// //   async (_: void, { dispatch }) => {
// //     const [jobs, candidates, recruitmentData] = await Promise.all([
// //       dispatch(dashboardFetchJobs()).unwrap(),
// //       // Pass `undefined` explicitly since the arg type is `number | string | undefined`
// //       dispatch(dashboardFetchCandidates(undefined)).unwrap(),
// //       dispatch(dashboardFetchRecruitmentStats()).unwrap(),
// //     ]);

// //     // Return keys the slice expects
// //     return { jobs, candidates, recruitmentData, at: Date.now() };
// //   }
// // );

// import { createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   getJobs,
//   getCandidates,
//   getRecruitmentStats,
// } from "@/services/api/dashboardAPI";

// /** Jobs */
// export const dashboardFetchJobs = createAsyncThunk(
//   "dashboard/fetchJobs",
//   async (_: void, { rejectWithValue}) => {
//     try {
//       // Pass AbortSignal if your API adapter supports it
//       const res = await getJobs(/* optionally: { signal } */);
//       return res;
//     } catch (err: unknown) {
//       const error = err as { response?: { data?: { message?: string } }; message?: string };
//       return rejectWithValue(
//         error?.response?.data?.message || error?.message || "Failed to load jobs"
//       );
//     }
//   }
// );

// /** Candidates (optionally by job_id) */
// export const dashboardFetchCandidates = createAsyncThunk(
//   "dashboard/fetchCandidates",
//   // NOTE: first param is typed, not optional; use `undefined` when no job filter
//   async (job_id: number | string | undefined, { rejectWithValue}) => {
//     try {
//       const res = await getCandidates(job_id /*, { signal } */);
//       return res;
//     } catch (err: unknown) {
//       const error = err as { response?: { data?: { message?: string } }; message?: string };
//       return rejectWithValue(
//         error?.response?.data?.message || error?.message || "Failed to load candidates"
//       );
//     }
//   }
// );

// /** Recruitment charts/series */
// export const dashboardFetchRecruitmentStats = createAsyncThunk(
//   "dashboard/fetchRecruitmentStats",
//   async (_: void, { rejectWithValue}) => {
//     try {
//       const res = await getRecruitmentStats(/* { signal } */);
//       return res;
//     } catch (err: unknown) {
//       const error = err as { response?: { data?: { message?: string } }; message?: string };
//       return rejectWithValue(
//         error?.response?.data?.message || error?.message || "Failed to load recruitment stats"
//       );
//     }
//   }
// );

// /** Convenience: fetch everything the dashboard needs in parallel */
// export const dashboardRefreshAll = createAsyncThunk(
//   "dashboard/refreshAll",
//   async (_: void, { dispatch }) => {
//     const [jobs, candidates, recruitmentData] = await Promise.all([
//       dispatch(dashboardFetchJobs()).unwrap(),
//       // Pass `undefined` explicitly since the arg type is `number | string | undefined`
//       dispatch(dashboardFetchCandidates(undefined)).unwrap(),
//       dispatch(dashboardFetchRecruitmentStats()).unwrap(),
//     ]);

//     // Return keys the slice expects
//     return { jobs, candidates, recruitmentData, at: Date.now() };
//   }
// );
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getJobs,
  getCandidates,
  getRecruitmentStats,
} from "@/services/api/dashboardAPI";

/** Jobs */
export const dashboardFetchJobs = createAsyncThunk(
  "dashboard/fetchJobs",
  async (_: void, { rejectWithValue }) => {
    try {
      return await getJobs();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      return rejectWithValue(
        error?.response?.data?.message || error?.message || "Failed to load jobs"
      );
    }
  }
);

/** Candidates (optionally by job_id) */
export const dashboardFetchCandidates = createAsyncThunk(
  "dashboard/fetchCandidates",
  async (job_id: number | string | undefined, { rejectWithValue }) => {
    try {
      return await getCandidates(job_id);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      return rejectWithValue(
        error?.response?.data?.message || error?.message || "Failed to load candidates"
      );
    }
  }
);

/** Recruitment charts/series */
export const dashboardFetchRecruitmentStats = createAsyncThunk(
  "dashboard/fetchRecruitmentStats",
  async (_: void, { rejectWithValue }) => {
    try {
      return await getRecruitmentStats(); // already safe — returns [] on network error
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      return rejectWithValue(
        error?.response?.data?.message || error?.message || "Failed to load recruitment stats"
      );
    }
  }
);

/**
 * ✅ FIX: Changed from Promise.all → Promise.allSettled
 *
 * OLD (broken):
 *   Promise.all([...unwrap(), ...unwrap(), ...unwrap()])
 *   → If ANY one fails, the entire dashboardRefreshAll crashes
 *   → This caused [object Object] Runtime Error (Error 2 in screenshots)
 *
 * NEW (fixed):
 *   Promise.allSettled([...])
 *   → Each call resolves independently — one failure never kills the others
 *   → Failed calls return [] instead of crashing the whole dashboard
 */
export const dashboardRefreshAll = createAsyncThunk(
  "dashboard/refreshAll",
  async (_: void, { dispatch }) => {
    const [jobsResult, candidatesResult, statsResult] = await Promise.allSettled([
      dispatch(dashboardFetchJobs()).unwrap(),
      dispatch(dashboardFetchCandidates(undefined)).unwrap(),
      dispatch(dashboardFetchRecruitmentStats()).unwrap(),
    ]);

    const jobs           = jobsResult.status       === "fulfilled" ? jobsResult.value       : [];
    const candidates     = candidatesResult.status === "fulfilled" ? candidatesResult.value : [];
    const recruitmentData = statsResult.status     === "fulfilled" ? statsResult.value      : [];

    // Log any partial failures for debugging (won't crash the dashboard)
    if (jobsResult.status === "rejected")
      console.warn("[Dashboard] Jobs fetch failed:", jobsResult.reason);
    if (candidatesResult.status === "rejected")
      console.warn("[Dashboard] Candidates fetch failed:", candidatesResult.reason);
    if (statsResult.status === "rejected")
      console.warn("[Dashboard] Recruitment stats fetch failed:", statsResult.reason);

    return { jobs, candidates, recruitmentData, at: Date.now() };
  }
);