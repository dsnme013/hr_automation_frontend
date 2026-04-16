// import { createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   fetchJobsAPI,
//   fetchCandidatesAPI,
//   sendAssessmentAPI,
//   sendReminderAPI,
//   sendBulkRemindersAPI,
//   scrapeAssessmentResultsAPI,
//   scrapeAllPendingResultsAPI,
//   manualProcessCandidateAPI,
// } from "@/services/api/assessmentAPI";

// // Fetch all jobs
// export const fetchJobsThunk = createAsyncThunk("assessment/fetchJobs", async (_, { rejectWithValue }) => {
//   try {
//     const response = await fetchJobsAPI();
//     return response;
//   } catch (error: any) {
//     return rejectWithValue(error.response?.data || "Failed to fetch jobs");
//   }
// });

// // Fetch candidates for a specific job
// export const fetchCandidatesThunk = createAsyncThunk(
//   "assessment/fetchCandidates",
//   async (jobId: number, { rejectWithValue }) => {
//     try {
//       const response = await fetchCandidatesAPI(jobId);
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "Failed to fetch candidates");
//     }
//   }
// );

// // Send assessment link
// export const sendAssessmentThunk = createAsyncThunk(
//   "assessment/sendAssessment",
//   async (candidateId: number, { rejectWithValue }) => {
//     try {
//       const response = await sendAssessmentAPI(candidateId);
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "Failed to send assessment");
//     }
//   }
// );

// // Send reminder
// export const sendReminderThunk = createAsyncThunk(
//   "assessment/sendReminder",
//   async (candidateId: number, { rejectWithValue }) => {
//     try {
//       const response = await sendReminderAPI(candidateId);
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "Failed to send reminder");
//     }
//   }
// );

// // Send bulk reminders
// export const sendBulkRemindersThunk = createAsyncThunk(
//   "assessment/sendBulkReminders",
//   async (candidateIds: number[], { rejectWithValue }) => {
//     try {
//       const response = await sendBulkRemindersAPI(candidateIds);
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "Failed to send bulk reminders");
//     }
//   }
// );

// // Scrape results for specific assessment
// export const scrapeAssessmentResultsThunk = createAsyncThunk(
//   "assessment/scrapeAssessmentResults",
//   async (assessmentName: string, { rejectWithValue }) => {
//     try {
//       const response = await scrapeAssessmentResultsAPI(assessmentName);
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "Failed to scrape assessment results");
//     }
//   }
// );

// // Scrape all pending assessments
// export const scrapeAllPendingResultsThunk = createAsyncThunk(
//   "assessment/scrapeAllPendingResults",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await scrapeAllPendingResultsAPI();
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "Failed to scrape all pending results");
//     }
//   }
// );

// // Manual process candidate
// export const manualProcessCandidateThunk = createAsyncThunk(
//   "assessment/manualProcessCandidate",
//   async (
//     { candidateEmail, score, totalQuestions }: { candidateEmail: string; score: number; totalQuestions: number },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await manualProcessCandidateAPI(candidateEmail, score, totalQuestions);
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "Failed to manually process candidate");
//     }
//   }
// );

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchJobsAPI,
  fetchCandidatesAPI,
  sendAssessmentAPI,
  sendReminderAPI,
  sendBulkRemindersAPI,
  scrapeAssessmentResultsAPI,
  scrapeAllPendingResultsAPI,
  manualProcessCandidateAPI,
} from "@/services/api/assessmentAPI";

// Fetch all jobs
export const fetchJobsThunk = createAsyncThunk("assessment/fetchJobs", async (_, { rejectWithValue }) => {
  try {
    const response = await fetchJobsAPI();
    return response;
  } catch (err: unknown) {
    const error = err as { response?: { data?: unknown } };
    return rejectWithValue(error.response?.data || "Failed to fetch jobs");
  }
});

// Fetch candidates for a specific job
export const fetchCandidatesThunk = createAsyncThunk(
  "assessment/fetchCandidates",
  async (jobId: number, { rejectWithValue }) => {
    try {
      const response = await fetchCandidatesAPI(jobId);
      return response;
    } catch (err: unknown) {
      const error = err as { response?: { data?: unknown } };
      return rejectWithValue(error.response?.data || "Failed to fetch candidates");
    }
  }
);

// Send assessment link
export const sendAssessmentThunk = createAsyncThunk(
  "assessment/sendAssessment",
  async (candidateId: number, { rejectWithValue }) => {
    try {
      const response = await sendAssessmentAPI(candidateId);
      return response;
    } catch (err: unknown) {
      const error = err as { response?: { data?: unknown } };
      return rejectWithValue(error.response?.data || "Failed to send assessment");
    }
  }
);

// Send reminder
export const sendReminderThunk = createAsyncThunk(
  "assessment/sendReminder",
  async (candidateId: number, { rejectWithValue }) => {
    try {
      const response = await sendReminderAPI(candidateId);
      return response;
    } catch (err: unknown) {
      const error = err as { response?: { data?: unknown } };
      return rejectWithValue(error.response?.data || "Failed to send reminder");
    }
  }
);

// Send bulk reminders
export const sendBulkRemindersThunk = createAsyncThunk(
  "assessment/sendBulkReminders",
  async (candidateIds: number[], { rejectWithValue }) => {
    try {
      const response = await sendBulkRemindersAPI(candidateIds);
      return response;
    } catch (err: unknown) {
      const error = err as { response?: { data?: unknown } };
      return rejectWithValue(error.response?.data || "Failed to send bulk reminders");
    }
  }
);

// Scrape results for specific assessment
export const scrapeAssessmentResultsThunk = createAsyncThunk(
  "assessment/scrapeAssessmentResults",
  async (assessmentName: string, { rejectWithValue }) => {
    try {
      const response = await scrapeAssessmentResultsAPI(assessmentName);
      return response;
    } catch (err: unknown) {
      const error = err as { response?: { data?: unknown } };
      return rejectWithValue(error.response?.data || "Failed to scrape assessment results");
    }
  }
);

// Scrape all pending assessments
export const scrapeAllPendingResultsThunk = createAsyncThunk(
  "assessment/scrapeAllPendingResults",
  async (_, { rejectWithValue }) => {
    try {
      const response = await scrapeAllPendingResultsAPI();
      return response;
    } catch (err: unknown) {
      const error = err as { response?: { data?: unknown } };
      return rejectWithValue(error.response?.data || "Failed to scrape all pending results");
    }
  }
);

// Manual process candidate
export const manualProcessCandidateThunk = createAsyncThunk(
  "assessment/manualProcessCandidate",
  async (
    { candidateEmail, score, totalQuestions }: { candidateEmail: string; score: number; totalQuestions: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await manualProcessCandidateAPI(candidateEmail, score, totalQuestions);
      return response;
    } catch (err: unknown) {
      const error = err as { response?: { data?: unknown } };
      return rejectWithValue(error.response?.data || "Failed to manually process candidate");
    }
  }
);