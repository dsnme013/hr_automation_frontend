// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // import { createSlice } from "@reduxjs/toolkit";
// // import {
// //   dashboardFetchJobs,
// //   dashboardFetchCandidates,
// //   dashboardFetchRecruitmentStats,
// //   dashboardRefreshAll,
// // } from "../thunk/dashboardThunk";

// // type DashboardState = {
// //   jobs: any[];
// //   candidates: any[];
// //   recruitmentData: any[];
// //   loading: boolean;
// //   error: string | null;
// //   lastUpdated: number | null;
// // };

// // const initialState: DashboardState = {
// //   jobs: [],
// //   candidates: [],
// //   recruitmentData: [],
// //   loading: false,
// //   error: null,
// //   lastUpdated: null,
// // };

// // const dashboardSlice = createSlice({
// //   name: "dashboard",
// //   initialState,
// //   reducers: {
// //     /** Optional: clear errors manually */
// //     clearDashboardError(state) {
// //       state.error = null;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     // ---- Jobs
// //     builder
// //       .addCase(dashboardFetchJobs.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(dashboardFetchJobs.fulfilled, (state, { payload }) => {
// //         state.loading = false;
// //         state.jobs = payload as any[];
// //         state.lastUpdated = Date.now();
// //       })
// //       .addCase(dashboardFetchJobs.rejected, (state, { payload }) => {
// //         state.loading = false;
// //         state.error = (payload as string) ?? "Failed to load jobs";
// //       });

// //     // ---- Candidates
// //     builder
// //       .addCase(dashboardFetchCandidates.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(dashboardFetchCandidates.fulfilled, (state, { payload }) => {
// //         state.loading = false;
// //         state.candidates = payload as any[];
// //         state.lastUpdated = Date.now();
// //       })
// //       .addCase(dashboardFetchCandidates.rejected, (state, { payload }) => {
// //         state.loading = false;
// //         state.error = (payload as string) ?? "Failed to load candidates";
// //       });

// //     // ---- Recruitment stats
// //     builder
// //       .addCase(dashboardFetchRecruitmentStats.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(dashboardFetchRecruitmentStats.fulfilled, (state, { payload }) => {
// //         state.loading = false;
// //         state.recruitmentData = payload as any[];
// //         state.lastUpdated = Date.now();
// //       })
// //       .addCase(dashboardFetchRecruitmentStats.rejected, (state, { payload }) => {
// //         state.loading = false;
// //         state.error = (payload as string) ?? "Failed to load recruitment stats";
// //       });

// //     // ---- Refresh all
// //     builder
// //       .addCase(dashboardRefreshAll.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(dashboardRefreshAll.fulfilled, (state, { payload }) => {
// //         state.loading = false;
// //         state.jobs = payload.jobs as any[];
// //         state.candidates = payload.candidates as any[];
// //         state.recruitmentData = payload.stats as any[];
// //         state.lastUpdated = payload.at;
// //       })
// //       .addCase(dashboardRefreshAll.rejected, (state, { error }) => {
// //         state.loading = false;
// //         state.error = error.message ?? "Failed to refresh dashboard";
// //       });
// //   },
// // });

// // export const { clearDashboardError } = dashboardSlice.actions;
// // export default dashboardSlice.reducer;

// // /* Selectors */
// // export const selectDashboardJobs = (s: { dashboard: DashboardState }) => s.dashboard.jobs;
// // export const selectDashboardCandidates = (s: { dashboard: DashboardState }) =>
// //   s.dashboard.candidates;
// // export const selectDashboardRecruitmentData = (s: { dashboard: DashboardState }) =>
// //   s.dashboard.recruitmentData;
// // export const selectDashboardLoading = (s: { dashboard: DashboardState }) => s.dashboard.loading;
// // export const selectDashboardError = (s: { dashboard: DashboardState }) => s.dashboard.error;
// // export const selectDashboardLastUpdated = (s: { dashboard: DashboardState }) =>
// //   s.dashboard.lastUpdated;

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { createSlice } from "@reduxjs/toolkit";
// import {
//   dashboardFetchJobs,
//   dashboardFetchCandidates,
//   dashboardFetchRecruitmentStats,
//   dashboardRefreshAll,
// } from "../thunk/dashboardThunk";

// type DashboardState = {
//   jobs: any[];
//   candidates: any[];
//   recruitmentData: any[];
//   loading: boolean;
//   error: string | null;
//   lastUpdated: number | null;
// };

// const initialState: DashboardState = {
//   jobs: [],
//   candidates: [],
//   recruitmentData: [],
//   loading: false,
//   error: null,
//   lastUpdated: null,
// };

// const dashboardSlice = createSlice({
//   name: "dashboard",
//   initialState,
//   reducers: {
//     /** Optional: clear errors manually */
//     clearDashboardError(state) {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     // ---- Jobs
//     builder
//       .addCase(dashboardFetchJobs.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(dashboardFetchJobs.fulfilled, (state, { payload }) => {
//         state.loading = false;
//         state.jobs = payload as any[];
//         state.lastUpdated = Date.now();
//       })
//       .addCase(dashboardFetchJobs.rejected, (state, { payload }) => {
//         state.loading = false;
//         state.error = (payload as string) ?? "Failed to load jobs";
//       });

//     // ---- Candidates
//     builder
//       .addCase(dashboardFetchCandidates.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(dashboardFetchCandidates.fulfilled, (state, { payload }) => {
//         state.loading = false;
//         state.candidates = payload as any[];
//         state.lastUpdated = Date.now();
//       })
//       .addCase(dashboardFetchCandidates.rejected, (state, { payload }) => {
//         state.loading = false;
//         state.error = (payload as string) ?? "Failed to load candidates";
//       });

//     // ---- Recruitment stats
//     builder
//       .addCase(dashboardFetchRecruitmentStats.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(dashboardFetchRecruitmentStats.fulfilled, (state, { payload }) => {
//         state.loading = false;
//         state.recruitmentData = payload as any[];
//         state.lastUpdated = Date.now();
//       })
//       .addCase(dashboardFetchRecruitmentStats.rejected, (state, { payload }) => {
//         state.loading = false;
//         state.error = (payload as string) ?? "Failed to load recruitment stats";
//       });

//     // ---- Refresh all (normalize shape: accept either `recruitmentData` or `stats`)
//     builder
//       .addCase(dashboardRefreshAll.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(dashboardRefreshAll.fulfilled, (state, { payload }) => {
//         state.loading = false;
//         const anyPayload = payload as any;
//         state.jobs = anyPayload.jobs as any[];
//         state.candidates = anyPayload.candidates as any[];
//         state.recruitmentData = (anyPayload.recruitmentData ?? anyPayload.stats ?? []) as any[];
//         state.lastUpdated = anyPayload.at ?? Date.now();
//       })
//       .addCase(dashboardRefreshAll.rejected, (state, { error }) => {
//         state.loading = false;
//         state.error = error.message ?? "Failed to refresh dashboard";
//       });
//   },
// });

// export const { clearDashboardError } = dashboardSlice.actions;
// export default dashboardSlice.reducer;

// /* Selectors */
// export const selectDashboardJobs = (s: { dashboard: DashboardState }) => s.dashboard.jobs;
// export const selectDashboardCandidates = (s: { dashboard: DashboardState }) => s.dashboard.candidates;
// export const selectDashboardRecruitmentData = (s: { dashboard: DashboardState }) =>
//   s.dashboard.recruitmentData;
// export const selectDashboardLoading = (s: { dashboard: DashboardState }) => s.dashboard.loading;
// export const selectDashboardError = (s: { dashboard: DashboardState }) => s.dashboard.error;
// export const selectDashboardLastUpdated = (s: { dashboard: DashboardState }) =>
//   s.dashboard.lastUpdated;
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import {
  dashboardFetchJobs,
  dashboardFetchCandidates,
  dashboardFetchRecruitmentStats,
  dashboardRefreshAll,
} from "../thunk/dashboardThunk";

type DashboardState = {
  jobs: any[];
  candidates: any[];
  recruitmentData: any[];
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
};

const initialState: DashboardState = {
  jobs: [],
  candidates: [],
  recruitmentData: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearDashboardError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {

    // ── Jobs ────────────────────────────────────────────────────────────────
    builder
      .addCase(dashboardFetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(dashboardFetchJobs.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.jobs = payload as any[];
        state.lastUpdated = Date.now();
      })
      .addCase(dashboardFetchJobs.rejected, (state, { payload }) => {
        state.loading = false;
        // ✅ FIX: keep existing jobs array, only set error string
        state.error = (payload as string) ?? "Failed to load jobs";
      });

    // ── Candidates ──────────────────────────────────────────────────────────
    builder
      .addCase(dashboardFetchCandidates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(dashboardFetchCandidates.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.candidates = payload as any[];
        state.lastUpdated = Date.now();
      })
      .addCase(dashboardFetchCandidates.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = (payload as string) ?? "Failed to load candidates";
      });

    // ── Recruitment stats ───────────────────────────────────────────────────
    builder
      .addCase(dashboardFetchRecruitmentStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(dashboardFetchRecruitmentStats.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.recruitmentData = payload as any[];
        state.lastUpdated = Date.now();
      })
      .addCase(dashboardFetchRecruitmentStats.rejected, (state, { payload }) => {
        state.loading = false;
        // ✅ FIX: don't crash — just set error, keep recruitmentData as []
        state.error = (payload as string) ?? "Failed to load recruitment stats";
      });

    // ── Refresh all ─────────────────────────────────────────────────────────
    builder
      .addCase(dashboardRefreshAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(dashboardRefreshAll.fulfilled, (state, { payload }) => {
        state.loading = false;
        const p = payload as any;

        state.jobs           = Array.isArray(p.jobs)           ? p.jobs           : [];
        state.candidates     = Array.isArray(p.candidates)     ? p.candidates     : [];
        // ✅ FIX: accept both key names (recruitmentData OR stats), fall back to []
        state.recruitmentData = Array.isArray(p.recruitmentData)
          ? p.recruitmentData
          : Array.isArray(p.stats)
          ? p.stats
          : [];
        state.lastUpdated = p.at ?? Date.now();
      })
      .addCase(dashboardRefreshAll.rejected, (state, { error }) => {
        state.loading = false;
        // ✅ FIX: dashboard stays usable even when refresh fails
        // Keep existing data — only update the error message
        state.error = error.message ?? "Failed to refresh dashboard";
      });
  },
});

export const { clearDashboardError } = dashboardSlice.actions;
export default dashboardSlice.reducer;

// ── Selectors ────────────────────────────────────────────────────────────────
export const selectDashboardJobs           = (s: { dashboard: DashboardState }) => s.dashboard.jobs;
export const selectDashboardCandidates     = (s: { dashboard: DashboardState }) => s.dashboard.candidates;
export const selectDashboardRecruitmentData= (s: { dashboard: DashboardState }) => s.dashboard.recruitmentData;
export const selectDashboardLoading        = (s: { dashboard: DashboardState }) => s.dashboard.loading;
export const selectDashboardError          = (s: { dashboard: DashboardState }) => s.dashboard.error;
export const selectDashboardLastUpdated    = (s: { dashboard: DashboardState }) => s.dashboard.lastUpdated;