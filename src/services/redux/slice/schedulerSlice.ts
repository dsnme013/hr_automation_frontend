// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { createSlice } from "@reduxjs/toolkit";
// import { schedulerFetchCandidates, schedulerScheduleInterview } from "../thunk/schedulerThunk";
// import type { RawCandidate, ScheduleResponse } from "@/services/api/schedulerAPI";

// export type SchedulerState = {
//   candidates: RawCandidate[];
//   loading: boolean;
//   error: string | null;
//   lastFetchedAt?: number;

//   // Result of schedule action (for toasts / UI)
//   schedule: {
//     pending: boolean;
//     result: ScheduleResponse | null;
//     error: string | null;
//   };
// };

// const initialState: SchedulerState = {
//   candidates: [],
//   loading: false,
//   error: null,
//   lastFetchedAt: undefined,
//   schedule: { pending: false, result: null, error: null },
// };

// const schedulerSlice = createSlice({
//   name: "scheduler",
//   initialState,
//   reducers: {
//     clearScheduleResult(state) {
//       state.schedule.result = null;
//       state.schedule.error = null;
//       state.schedule.pending = false;
//     },
//   },
//   extraReducers: (builder) => {
//     // Fetch candidates
//     builder
//       .addCase(schedulerFetchCandidates.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(schedulerFetchCandidates.fulfilled, (state, action) => {
//         state.loading = false;
//         state.candidates = action.payload ?? [];
//         state.lastFetchedAt = Date.now();
//       })
//       .addCase(schedulerFetchCandidates.rejected, (state, action) => {
//         state.loading = false;
//         state.error = (action.payload as string) || "Failed to load candidates";
//       });

//     // Schedule interview
//     builder
//       .addCase(schedulerScheduleInterview.pending, (state) => {
//         state.schedule.pending = true;
//         state.schedule.error = null;
//         state.schedule.result = null;
//       })
//       .addCase(schedulerScheduleInterview.fulfilled, (state, action) => {
//         state.schedule.pending = false;
//         state.schedule.result = action.payload;
//       })
//       .addCase(schedulerScheduleInterview.rejected, (state, action) => {
//         state.schedule.pending = false;
//         state.schedule.error = (action.payload as string) || "Failed to schedule interview";
//       });
//   },
// });

// export const { clearScheduleResult } = schedulerSlice.actions;
// export default schedulerSlice.reducer;

// /* Selectors */
// export const selectSchedulerCandidates = (s: any) => (s.scheduler as SchedulerState).candidates;
// export const selectSchedulerLoading = (s: any) => (s.scheduler as SchedulerState).loading;
// export const selectSchedulerError = (s: any) => (s.scheduler as SchedulerState).error;
// export const selectSchedulerLastFetchedAt = (s: any) => (s.scheduler as SchedulerState).lastFetchedAt;

// export const selectSchedulePending = (s: any) => (s.scheduler as SchedulerState).schedule.pending;
// export const selectScheduleResult = (s: any) => (s.scheduler as SchedulerState).schedule.result;
// export const selectScheduleError = (s: any) => (s.scheduler as SchedulerState).schedule.error;
import { createSlice } from "@reduxjs/toolkit";
import {
  schedulerFetchCandidates,
  schedulerScheduleInterview,
} from "../thunk/schedulerThunk";
import type { RawCandidate } from "@/services/api/schedulerAPI";

type SchedulerState = {
  loading: boolean;
  error: string | null;
  candidates: RawCandidate[];
  scheduling: boolean;
  statusMsg: string; // for UI banners/toasts
};

const initialState: SchedulerState = {
  loading: false,
  error: null,
  candidates: [],
  scheduling: false,
  statusMsg: "",
};

const schedulerSlice = createSlice({
  name: "scheduler",
  initialState,
  reducers: {
    clearSchedulerStatus(state) {
      state.statusMsg = "";
    },
  },
  extraReducers: (b) => {
    // Fetch candidates
    b.addCase(schedulerFetchCandidates.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(schedulerFetchCandidates.fulfilled, (s, a) => {
      s.loading = false;
      s.candidates = a.payload;
      s.statusMsg = "✅ Candidates loaded";
    });
    b.addCase(schedulerFetchCandidates.rejected, (s, a) => {
      s.loading = false;
      s.error = a.payload ?? "Failed to load candidates";
      s.statusMsg = `❌ ${s.error}`;
    });

    // Schedule interview
    b.addCase(schedulerScheduleInterview.pending, (s) => {
      s.scheduling = true;
      s.error = null;
      s.statusMsg = "🔍 Scheduling...";
    });
    b.addCase(schedulerScheduleInterview.fulfilled, (s, a) => {
      s.scheduling = false;
      s.statusMsg = a.payload?.success
        ? `✅ ${a.payload.message || "Interview scheduled"}`
        : `❌ ${a.payload?.message || "Failed to schedule interview"}`;
    });
    b.addCase(schedulerScheduleInterview.rejected, (s, a) => {
      s.scheduling = false;
      s.error = a.payload ?? "Failed to schedule interview";
      s.statusMsg = `❌ ${s.error}`;
    });
  },
});

export const { clearSchedulerStatus } = schedulerSlice.actions;
export default schedulerSlice.reducer;

/** ------------------------ Selectors ------------------------ */
// export const selectSchedulerLoading = (st: RootState) => st.scheduler.loading;
// export const selectSchedulerScheduling = (st: RootState) => st.scheduler.scheduling;
// export const selectSchedulerStatusMsg = (st: RootState) => st.scheduler.statusMsg;
// export const selectSchedulerError = (st: RootState) => st.scheduler.error;
// export const selectSchedulerCandidates = (st: RootState) => st.scheduler.candidates;
