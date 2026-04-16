// import { createSlice } from "@reduxjs/toolkit";
// import {
//   fetchJobsThunk,
//   fetchCandidatesThunk,
//   sendAssessmentThunk,
//   sendReminderThunk,
//   sendBulkRemindersThunk,
//   scrapeAssessmentResultsThunk,
//   scrapeAllPendingResultsThunk,
//   manualProcessCandidateThunk,
// } from "../thunk/assessmentThunk";

// interface AssessmentStats {
//   totalSent: number;
//   totalCompleted: number;
//   avgScore: number;
//   passRate: number;
// }

// interface AssessmentState {
//   jobs: any[];
//   candidates: any[];
//   assessmentStats: AssessmentStats;
//   isLoading: boolean;
//   error: string | null;
//   message: string | null;
//   scrapingStatus: string | null;
// }

// const initialState: AssessmentState = {
//   jobs: [],
//   candidates: [],
//   assessmentStats: { totalSent: 0, totalCompleted: 0, avgScore: 0, passRate: 0 },
//   isLoading: false,
//   error: null,
//   message: null,
//   scrapingStatus: null,
// };

// const assessmentSlice = createSlice({
//   name: "assessment",
//   initialState,
//   reducers: {
//     clearAssessmentMessage: (state) => {
//       state.message = null;
//     },
//     clearAssessmentError: (state) => {
//       state.error = null;
//     },
//     clearScrapingStatus: (state) => {
//       state.scrapingStatus = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // ===== Fetch Jobs =====
//       .addCase(fetchJobsThunk.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchJobsThunk.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.jobs = Array.isArray(action.payload) ? action.payload : [];
//       })
//       .addCase(fetchJobsThunk.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })

//       // ===== Fetch Candidates =====
//       .addCase(fetchCandidatesThunk.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchCandidatesThunk.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.candidates = action.payload;

//         const data = action.payload;
//         const assessmentCandidates = data.filter((c: any) => c.exam_link_sent);
//         const completed = assessmentCandidates.filter((c: any) => c.exam_completed);
//         const totalScore = completed.reduce((sum: number, c: any) => sum + (c.exam_percentage || 0), 0);
//         const passed = completed.filter((c: any) => c.exam_percentage >= 70);

//         state.assessmentStats = {
//           totalSent: assessmentCandidates.length,
//           totalCompleted: completed.length,
//           avgScore: completed.length > 0 ? +(totalScore / completed.length).toFixed(1) : 0,
//           passRate:
//             assessmentCandidates.length > 0
//               ? +((passed.length / assessmentCandidates.length) * 100).toFixed(1)
//               : 0,
//         };
//       })
//       .addCase(fetchCandidatesThunk.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })

//       // ===== Send Assessment =====
//       .addCase(sendAssessmentThunk.fulfilled, (state) => {
//         state.message = "Assessment link sent successfully!";
//       })
//       .addCase(sendAssessmentThunk.rejected, (state, action) => {
//         state.error = action.payload as string;
//       })

//       // ===== Send Reminder =====
//       .addCase(sendReminderThunk.fulfilled, (state) => {
//         state.message = "Reminder sent successfully!";
//       })
//       .addCase(sendReminderThunk.rejected, (state, action) => {
//         state.error = action.payload as string;
//       })

//       // ===== Send Bulk Reminders =====
//       .addCase(sendBulkRemindersThunk.fulfilled, (state) => {
//         state.message = "Bulk reminders sent successfully!";
//       })
//       .addCase(sendBulkRemindersThunk.rejected, (state, action) => {
//         state.error = action.payload as string;
//       })

//       // ===== Scrape Results (One) =====
//       .addCase(scrapeAssessmentResultsThunk.pending, (state) => {
//         state.scrapingStatus = "🔍 Checking assessment results...";
//       })
//       .addCase(scrapeAssessmentResultsThunk.fulfilled, (state, action) => {
//         state.scrapingStatus = `✅ ${action.payload.message || "Assessment results updated!"}`;
//       })
//       .addCase(scrapeAssessmentResultsThunk.rejected, (state, action) => {
//         state.scrapingStatus = `❌ ${action.payload}`;
//       })

//       // ===== Scrape All Pending =====
//       .addCase(scrapeAllPendingResultsThunk.pending, (state) => {
//         state.scrapingStatus = "🔍 Checking all pending results...";
//       })
//       .addCase(scrapeAllPendingResultsThunk.fulfilled, (state, action) => {
//         state.scrapingStatus = `✅ ${action.payload.message || "All pending results updated!"}`;
//       })
//       .addCase(scrapeAllPendingResultsThunk.rejected, (state, action) => {
//         state.scrapingStatus = `❌ ${action.payload}`;
//       })

//       // ===== Manual Process Candidate =====
//       .addCase(manualProcessCandidateThunk.fulfilled, (state, action) => {
//         state.scrapingStatus = `✅ ${action.payload.message || "Candidate processed successfully!"}`;
//       })
//       .addCase(manualProcessCandidateThunk.rejected, (state, action) => {
//         state.scrapingStatus = `❌ ${action.payload}`;
//       });
//   },
// });

// export const { clearAssessmentMessage, clearAssessmentError, clearScrapingStatus } = assessmentSlice.actions;
// export default assessmentSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  fetchJobsThunk,
  fetchCandidatesThunk,
  sendAssessmentThunk,
  sendReminderThunk,
  sendBulkRemindersThunk,
  scrapeAssessmentResultsThunk,
  scrapeAllPendingResultsThunk,
  manualProcessCandidateThunk,
} from "../thunk/assessmentThunk";
import { Job } from "@/services/interfaces/CandidateScreening";

// Define proper type for Candidate

interface Candidate {
  id: string | number;
  name?: string;
  email?: string;
  exam_link_sent?: boolean;
  exam_completed?: boolean;
  exam_percentage?: number;
  [key: string]: unknown; // Allow additional properties
}

interface AssessmentStats {
  totalSent: number;
  totalCompleted: number;
  avgScore: number;
  passRate: number;
}

interface AssessmentState {
  jobs: Job[];
  candidates: Candidate[];
  assessmentStats: AssessmentStats;
  isLoading: boolean;
  error: string | null;
  message: string | null;
  scrapingStatus: string | null;
}

const initialState: AssessmentState = {
  jobs: [],
  candidates: [],
  assessmentStats: { totalSent: 0, totalCompleted: 0, avgScore: 0, passRate: 0 },
  isLoading: false,
  error: null,
  message: null,
  scrapingStatus: null,
};

const assessmentSlice = createSlice({
  name: "assessment",
  initialState,
  reducers: {
    clearAssessmentMessage: (state) => {
      state.message = null;
    },
    clearAssessmentError: (state) => {
      state.error = null;
    },
    clearScrapingStatus: (state) => {
      state.scrapingStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== Fetch Jobs =====
      .addCase(fetchJobsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchJobsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchJobsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // ===== Fetch Candidates =====
      .addCase(fetchCandidatesThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCandidatesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.candidates = action.payload;

        const data = action.payload as Candidate[];
        const assessmentCandidates = data.filter((c: Candidate) => c.exam_link_sent);
        const completed = assessmentCandidates.filter((c: Candidate) => c.exam_completed);
        const totalScore = completed.reduce((sum: number, c: Candidate) => sum + (c.exam_percentage || 0), 0);
        const passed = completed.filter((c: Candidate) => (c.exam_percentage ?? 0) >= 70);

        state.assessmentStats = {
          totalSent: assessmentCandidates.length,
          totalCompleted: completed.length,
          avgScore: completed.length > 0 ? +(totalScore / completed.length).toFixed(1) : 0,
          passRate:
            assessmentCandidates.length > 0
              ? +((passed.length / assessmentCandidates.length) * 100).toFixed(1)
              : 0,
        };
      })
      .addCase(fetchCandidatesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // ===== Send Assessment =====
      .addCase(sendAssessmentThunk.fulfilled, (state) => {
        state.message = "Assessment link sent successfully!";
      })
      .addCase(sendAssessmentThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // ===== Send Reminder =====
      .addCase(sendReminderThunk.fulfilled, (state) => {
        state.message = "Reminder sent successfully!";
      })
      .addCase(sendReminderThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // ===== Send Bulk Reminders =====
      .addCase(sendBulkRemindersThunk.fulfilled, (state) => {
        state.message = "Bulk reminders sent successfully!";
      })
      .addCase(sendBulkRemindersThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // ===== Scrape Results (One) =====
      .addCase(scrapeAssessmentResultsThunk.pending, (state) => {
        state.scrapingStatus = "🔍 Checking assessment results...";
      })
      .addCase(scrapeAssessmentResultsThunk.fulfilled, (state, action) => {
        state.scrapingStatus = `✅ ${action.payload.message || "Assessment results updated!"}`;
      })
      .addCase(scrapeAssessmentResultsThunk.rejected, (state, action) => {
        state.scrapingStatus = `❌ ${action.payload}`;
      })

      // ===== Scrape All Pending =====
      .addCase(scrapeAllPendingResultsThunk.pending, (state) => {
        state.scrapingStatus = "🔍 Checking all pending results...";
      })
      .addCase(scrapeAllPendingResultsThunk.fulfilled, (state, action) => {
        state.scrapingStatus = `✅ ${action.payload.message || "All pending results updated!"}`;
      })
      .addCase(scrapeAllPendingResultsThunk.rejected, (state, action) => {
        state.scrapingStatus = `❌ ${action.payload}`;
      })

      // ===== Manual Process Candidate =====
      .addCase(manualProcessCandidateThunk.fulfilled, (state, action) => {
        state.scrapingStatus = `✅ ${action.payload.message || "Candidate processed successfully!"}`;
      })
      .addCase(manualProcessCandidateThunk.rejected, (state, action) => {
        state.scrapingStatus = `❌ ${action.payload}`;
      });
  },
});

export const { clearAssessmentMessage, clearAssessmentError, clearScrapingStatus } = assessmentSlice.actions;
export default assessmentSlice.reducer;