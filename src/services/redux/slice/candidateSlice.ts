// // // import { createSlice } from "@reduxjs/toolkit";
// // // import { getCandidates, getJobs, getPipelineStatus, sendAssessmentReminder } from "../thunk/candidateThunk";


// // // interface CandidateState {
// // //   candidates: any[];
// // //   jobs: any[];
// // //   pipelineStatus: Record<string, any>;
// // //   loading: boolean;
// // //   error: string | null;
// // //   message: string | null;
// // // }

// // // const initialState: CandidateState = {
// // //   candidates: [],
// // //   jobs: [],
// // //   pipelineStatus: {},
// // //   loading: false,
// // //   error: null,
// // //   message: null,
// // // };

// // // const candidateSlice = createSlice({
// // //   name: "candidate",
// // //   initialState,
// // //   reducers: {
// // //     clearMessage(state) {
// // //       state.message = null;
// // //     },
// // //   },
// // //   extraReducers: (builder) => {
// // //     builder
// // //       // 🧠 Candidates
// // //       .addCase(getCandidates.pending, (state) => {
// // //         state.loading = true;
// // //         state.error = null;
// // //       })
// // //       .addCase(getCandidates.fulfilled, (state, action) => {
// // //         state.loading = false;
// // //         state.candidates = action.payload;
// // //       })
// // //       .addCase(getCandidates.rejected, (state, action) => {
// // //         state.loading = false;
// // //         state.error = action.payload as string;
// // //       })

// // //       // 🧠 Jobs
// // //       .addCase(getJobs.pending, (state) => {
// // //         state.loading = true;
// // //         state.error = null;
// // //       })
// // //       .addCase(getJobs.fulfilled, (state, action) => {
// // //         state.loading = false;
// // //         state.jobs = action.payload;
// // //       })
// // //       .addCase(getJobs.rejected, (state, action) => {
// // //         state.loading = false;
// // //         state.error = action.payload as string;
// // //       })

// // //       // 🧠 Pipeline status
// // //       .addCase(getPipelineStatus.fulfilled, (state, action) => {
// // //         const { jobId, data } = action.payload;
// // //         state.pipelineStatus[jobId] = data.status;
// // //       })

// // //       // 🧠 Send reminder
// // //       .addCase(sendAssessmentReminder.fulfilled, (state, action) => {
// // //         state.message = action.payload.message;
// // //       })
// // //       .addCase(sendAssessmentReminder.rejected, (state, action) => {
// // //         state.error = action.payload as string;
// // //       });
// // //   },
// // // });

// // // export const { clearMessage } = candidateSlice.actions;
// // // export default candidateSlice.reducer;

// // import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// // import {
// //   getCandidates,
// //   getJobs,
// //   getPipelineStatus,
// //   sendAssessmentReminder,
// // } from "../thunk/candidateThunk";
// // import type { Candidate, Job } from "@/services/interfaces/CandidateScreening";

// // type Loading = "idle" | "pending" | "succeeded" | "failed";

// // interface CandidateState {
// //   jobs: Job[];
// //   candidates: Candidate[];
// //   jobsLoading: Loading;
// //   candidatesLoading: Loading;
// //   error: string | null;
// //   lastFetchTime: string | null;
// //   selectedJobId: string | number | null;
// //   message: string | null;
// //   pipelineByJob: Record<string | number, unknown>;
// // }

// // const initialState: CandidateState = {
// //   jobs: [],
// //   candidates: [],
// //   jobsLoading: "idle",
// //   candidatesLoading: "idle",
// //   error: null,
// //   lastFetchTime: null,
// //   selectedJobId: null,
// //   message: null,
// //   pipelineByJob: {},
// // };

// // const candidateSlice = createSlice({
// //   name: "candidate",
// //   initialState,
// //   reducers: {
// //     setSelectedJobId(state, action: PayloadAction<string | number | null>) {
// //       state.selectedJobId = action.payload ?? null;
// //     },
// //     clearMessage(state) {
// //       state.message = null;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       // Jobs
// //       .addCase(getJobs.pending, (s) => {
// //         s.jobsLoading = "pending";
// //       })
// //       .addCase(getJobs.fulfilled, (s, a) => {
// //         s.jobsLoading = "succeeded";
// //         s.jobs = a.payload ?? [];
// //       })
// //       .addCase(getJobs.rejected, (s, a) => {
// //         s.jobsLoading = "failed";
// //         s.error = (a.payload as string) || a.error.message || "Failed to load jobs";
// //       })

// //       // Candidates
// //       .addCase(getCandidates.pending, (s) => {
// //         s.candidatesLoading = "pending";
// //       })
// //       .addCase(getCandidates.fulfilled, (s, a) => {
// //         s.candidatesLoading = "succeeded";
// //         s.candidates = a.payload ?? [];
// //         s.lastFetchTime = new Date().toISOString();
// //       })
// //       .addCase(getCandidates.rejected, (s, a) => {
// //         s.candidatesLoading = "failed";
// //         s.error =
// //           (a.payload as string) || a.error.message || "Failed to load candidates";
// //       })

// //       // Pipeline
// //       .addCase(getPipelineStatus.fulfilled, (s, a) => {
// //         const { jobId, data } = a.payload;
// //         s.pipelineByJob[jobId] = data;
// //       })

// //       // Reminder
// //       .addCase(sendAssessmentReminder.fulfilled, (s, a) => {
// //         s.message = a.payload.message;
// //       });
// //   },
// // });

// // export const { setSelectedJobId, clearMessage } = candidateSlice.actions;
// // export default candidateSlice.reducer;

// // import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// // import {
// //   getCandidates,
// //   getJobs,
// //   getPipelineStatus,
// //   sendAssessmentReminder,
// // } from "../thunk/candidateThunk";
// // import type { Candidate, Job } from "@/services/interfaces/CandidateScreening";

// // type Loading = "idle" | "pending" | "succeeded" | "failed";

// // interface CandidateState {
// //   jobs: Job[];
// //   candidates: Candidate[];
// //   jobsLoading: Loading;
// //   candidatesLoading: Loading;
// //   error: string | null;
// //   lastFetchTime: string | null;
// //   selectedJobId: string | number | null;
// //   message: string | null;
// //   pipelineByJob: Record<string | number, unknown | null>;
// // }

// // const initialState: CandidateState = {
// //   jobs: [],
// //   candidates: [],
// //   jobsLoading: "idle",
// //   candidatesLoading: "idle",
// //   error: null,
// //   lastFetchTime: null,
// //   selectedJobId: null,
// //   message: null,
// //   pipelineByJob: {},
// // };

// // const candidateSlice = createSlice({
// //   name: "candidate",
// //   initialState,
// //   reducers: {
// //     setSelectedJobId(state, action: PayloadAction<string | number | null>) {
// //       state.selectedJobId = action.payload ?? null;
// //     },
// //     clearMessage(state) {
// //       state.message = null;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       // Jobs
// //       .addCase(getJobs.pending, (s) => {
// //         s.jobsLoading = "pending";
// //       })
// //       .addCase(getJobs.fulfilled, (s, a) => {
// //         s.jobsLoading = "succeeded";
// //         s.jobs = a.payload ?? [];
// //       })
// //       .addCase(getJobs.rejected, (s, a) => {
// //         s.jobsLoading = "failed";
// //         s.error = (a.payload as string) || a.error.message || "Failed to load jobs";
// //       })

// //       // Candidates
// //       .addCase(getCandidates.pending, (s) => {
// //         s.candidatesLoading = "pending";
// //       })
// //       .addCase(getCandidates.fulfilled, (s, a) => {
// //         s.candidatesLoading = "succeeded";
// //         s.candidates = a.payload ?? [];
// //         s.lastFetchTime = new Date().toISOString();
// //       })
// //       .addCase(getCandidates.rejected, (s, a) => {
// //         s.candidatesLoading = "failed";
// //         s.error =
// //           (a.payload as string) || a.error.message || "Failed to load candidates";
// //       })

// //       // Pipeline (store even if null)
// //       .addCase(getPipelineStatus.fulfilled, (s, a) => {
// //         const { jobId, data } = a.payload;
// //         s.pipelineByJob[jobId] = data; // may be null when 404
// //       })
// //       .addCase(getPipelineStatus.rejected, (s) => {
// //         // ignore to avoid breaking the screen
// //       })

// //       // Reminder success
// //       .addCase(sendAssessmentReminder.fulfilled, (s, a) => {
// //         s.message = a.payload.message;
// //       });
// //   },
// // });

// // export const { setSelectedJobId, clearMessage } = candidateSlice.actions;
// // export default candidateSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { getCandidates, getJobs, sendAssessmentReminder, getMatchReport} from "../thunk/candidateThunk";
// import type { Candidate, Job } from "@/services/interfaces/CandidateScreening";


// type Loading = "idle" | "pending" | "succeeded" | "failed";

// interface CandidateState {
//   jobs: Job[];
//   candidates: Candidate[];
//   jobsLoading: Loading;
//   candidatesLoading: Loading;
//   error: string | null;
//   lastFetchTime: string | null;
//   selectedJobId: string | number | null;
//   message: string | null;
//   matchReport: Record<string | number, unknown>;   // ← ADD
//   matchReportLoading: boolean;                     // ← ADD
// }

// const initialState: CandidateState = {
//   jobs: [],
//   candidates: [],
//   jobsLoading: "idle",
//   candidatesLoading: "idle",
//   error: null,
//   lastFetchTime: null,
//   selectedJobId: null,
//   message: null,
//   matchReport: {},
//   matchReportLoading: false,
// };

// const candidateSlice = createSlice({
//   name: "candidate",
//   initialState,
//   reducers: {
//     setSelectedJobId(state, action: PayloadAction<string | number | null>) {
//       state.selectedJobId = action.payload ?? null;
//     },
//     clearMessage(state) {
//       state.message = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Jobs
//       .addCase(getJobs.pending, (s) => { s.jobsLoading = "pending"; })
//       .addCase(getJobs.fulfilled, (s, a) => {
//         s.jobsLoading = "succeeded";
//         s.jobs = a.payload ?? [];
//       })
//       .addCase(getJobs.rejected, (s, a) => {
//         s.jobsLoading = "failed";
//         s.error = (a.payload as string) || a.error.message || "Failed to load jobs";
//       })

//       // Candidates
//       .addCase(getCandidates.pending, (s) => { s.candidatesLoading = "pending"; })
//       .addCase(getCandidates.fulfilled, (s, a) => {
//         s.candidatesLoading = "succeeded";
//         s.candidates = a.payload ?? [];
//         s.lastFetchTime = new Date().toISOString();
//       })
//       .addCase(getCandidates.rejected, (s, a) => {
//         s.candidatesLoading = "failed";
//         s.error = (a.payload as string) || a.error.message || "Failed to load candidates";
//       })

//       // Reminder success
//       .addCase(sendAssessmentReminder.fulfilled, (s, a) => {
//         s.message = a.payload.message;
//       })
//       // Add to extraReducers builder:
//       .addCase(getMatchReport.pending, (s) => {
//         s.matchReportLoading = true;
//       })
//       .addCase(getMatchReport.fulfilled, (s, a) => {
//         s.matchReportLoading = false;
//         const report = a.payload as { candidate_id?: string | number };
//         if (report?.candidate_id) {
//           s.matchReport[report.candidate_id] = report;
//         }
//       })
//       .addCase(getMatchReport.rejected, (s) => {
//         s.matchReportLoading = false;
//       });
//   },
// });

// export const { setSelectedJobId, clearMessage } = candidateSlice.actions;
// export default candidateSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getCandidates,
  getJobs,
  sendAssessmentReminder,
  getMatchReport,
} from "../thunk/candidateThunk";
import type { Candidate, Job } from "@/services/interfaces/CandidateScreening";

type Loading = "idle" | "pending" | "succeeded" | "failed";

interface CandidateState {
  jobs: Job[];
  candidates: Candidate[];
  jobsLoading: Loading;
  candidatesLoading: Loading;
  error: string | null;
  lastFetchTime: string | null;
  selectedJobId: string | number | null;
  message: string | null;
  // Match report — keyed by candidate id, populated by getMatchReport thunk
  matchReport: Record<string | number, unknown>;
  matchReportLoading: boolean;
}

const initialState: CandidateState = {
  jobs: [],
  candidates: [],
  jobsLoading: "idle",
  candidatesLoading: "idle",
  error: null,
  lastFetchTime: null,
  selectedJobId: null,
  message: null,
  matchReport: {},
  matchReportLoading: false,
};

const candidateSlice = createSlice({
  name: "candidate",
  initialState,
  reducers: {
    setSelectedJobId(state, action: PayloadAction<string | number | null>) {
      state.selectedJobId = action.payload ?? null;
    },
    clearMessage(state) {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ── Jobs ──────────────────────────────────────────────────────────────
      .addCase(getJobs.pending, (s) => {
        s.jobsLoading = "pending";
      })
      .addCase(getJobs.fulfilled, (s, a) => {
        s.jobsLoading = "succeeded";
        s.jobs = a.payload ?? [];
      })
      .addCase(getJobs.rejected, (s, a) => {
        s.jobsLoading = "failed";
        s.error =
          (a.payload as string) ||
          a.error.message ||
          "Failed to load jobs";
      })

      // ── Candidates ────────────────────────────────────────────────────────
      .addCase(getCandidates.pending, (s) => {
        s.candidatesLoading = "pending";
      })
      .addCase(getCandidates.fulfilled, (s, a) => {
        s.candidatesLoading = "succeeded";
        s.candidates = a.payload ?? [];
        s.lastFetchTime = new Date().toISOString();
      })
      .addCase(getCandidates.rejected, (s, a) => {
        s.candidatesLoading = "failed";
        s.error =
          (a.payload as string) ||
          a.error.message ||
          "Failed to load candidates";
      })

      // ── Assessment reminder ───────────────────────────────────────────────
      .addCase(sendAssessmentReminder.fulfilled, (s, a) => {
        s.message = a.payload.message;
      })

      // ── Match report ──────────────────────────────────────────────────────
      .addCase(getMatchReport.pending, (s) => {
        s.matchReportLoading = true;
      })
      .addCase(getMatchReport.fulfilled, (s, a) => {
        s.matchReportLoading = false;
        const report = a.payload as { candidate_id?: string | number };
        if (report?.candidate_id) {
          s.matchReport[report.candidate_id] = report;
        }
      })
      .addCase(getMatchReport.rejected, (s) => {
        s.matchReportLoading = false;
      });
  },
});

export const { setSelectedJobId, clearMessage } = candidateSlice.actions;
export default candidateSlice.reducer;