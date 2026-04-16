import axiosInstance from "@/services/api/axiosConfig";

const BASE_URL = "/api";

// =========================
//  📘 Job & Candidate APIs
// =========================

// Fetch all job positions
export const fetchJobsAPI = async () => {
  const response = await axiosInstance.get(`${BASE_URL}/jobs`);
  return response.data;
};

// Fetch candidates for a given job
export const fetchCandidatesAPI = async (jobId: number) => {
  const response = await axiosInstance.get(`${BASE_URL}/candidates?job_id=${jobId}`);
  return response.data;
};

// Send assessment link to one candidate
export const sendAssessmentAPI = async (candidateId: number) => {
  const response = await axiosInstance.post(`${BASE_URL}/send_assessment`, {
    candidate_id: candidateId,
  });
  return response.data;
};

// Send reminder to a single candidate
export const sendReminderAPI = async (candidateId: number) => {
  const response = await axiosInstance.post(`${BASE_URL}/send_reminders`, {
    candidate_ids: [candidateId],
  });
  return response.data;
};

// Send bulk reminders to multiple candidates
export const sendBulkRemindersAPI = async (candidateIds: number[]) => {
  const response = await axiosInstance.post(`${BASE_URL}/send_reminders`, {
    candidate_ids: candidateIds,
  });
  return response.data;
};

// =========================
//  📊 Results Management APIs
// =========================

// Scrape results for a specific assessment (by job title)
export const scrapeAssessmentResultsAPI = async (assessmentName: string) => {
  const response = await axiosInstance.post(`${BASE_URL}/scrape_assessment_results`, {
    assessment_name: assessmentName,
  });
  return response.data;
};

// Scrape all pending assessment results
export const scrapeAllPendingResultsAPI = async () => {
  const response = await axiosInstance.post(`${BASE_URL}/scrape_all_pending_results`);
  return response.data;
};

// Manually process a candidate result
export const manualProcessCandidateAPI = async (
  candidateEmail: string,
  score: number,
  totalQuestions: number
) => {
  const response = await axiosInstance.post(`${BASE_URL}/manual_process_candidate`, {
    candidate_email: candidateEmail,
    exam_score: score,
    total_questions: totalQuestions,
    time_taken: 0,
  });
  return response.data;
};
