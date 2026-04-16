// import axiosInstance from "./axiosConfig";

// export type RunPipelinePayload = {
//   job_id: number | string;
//   job_title: string;
//   job_desc?: string;
//   create_assessment: boolean;
// };

// /** POST /api/run_full_pipeline */
// export async function runFullPipeline(payload: RunPipelinePayload) {
//   const { data } = await axiosInstance.post("/api/run_full_pipeline", payload);
//   // expect: { success: boolean, message?: string, pipeline_id?: string, ... }
//   if (data?.success === false) {
//     throw new Error(data?.message || "Pipeline failed");
//   }
//   return data;
// }

// /** (optional) GET /api/pipeline_status/:id — only if your backend has it */
// export async function getPipelineStatus(pipelineId: string) {
//   const { data } = await axiosInstance.get(`/api/pipeline_status/${pipelineId}`);
//   return data;
// }

// // src/services/api/pipelineAPI.ts
// import api from "./axiosConfig";

// export type RunPipelineBody = {
//   job_id: number | string;
//   job_title: string;
//   job_desc?: string;
//   create_assessment: boolean;
//   assessment_provider?: "testlify" | "criteria";
// };

// export async function runFullPipeline(body: RunPipelineBody) {
//   const res = await api.post("/api/run_full_pipeline", body);
//   // backend often returns { message: "...", ... }
//   return res.data ?? { message: "Pipeline started" };
// }
import api from "./axiosConfig";

export type RunPipelineBody = {
  job_id:            number | string;
  job_title:         string;
  job_desc?:         string;
  create_assessment: boolean;
};

export type PipelineResult =
  | { ok: true }
  | { ok: false; reason: "already_running" | "rate_limited" | "error"; message: string };

export async function runFullPipeline(body: RunPipelineBody): Promise<PipelineResult> {
  try {
    await api.post("/api/run_full_pipeline", body);
    return { ok: true };
  } catch (e: unknown) {
    const status = (e as { response?: { status?: number; data?: { message?: string } } })?.response?.status;
    const msg    = (e as { response?: { data?: { message?: string } } })?.response?.data?.message ?? "";

    if (status === 409) return { ok: false, reason: "already_running", message: msg || "Pipeline already running for this job." };
    if (status === 429) return { ok: false, reason: "rate_limited",    message: msg || "Too many requests. Please wait a moment and try again." };

    const fallback = e instanceof Error ? e.message : "Pipeline failed";
    return { ok: false, reason: "error", message: fallback };
  }
}