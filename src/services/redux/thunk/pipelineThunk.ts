// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { runFullPipeline, RunPipelinePayload } from "@/services/api/pipelineAPI";

// export const runFullPipelineThunk = createAsyncThunk(
//   "pipeline/runFull",
//   async (payload: RunPipelinePayload, { rejectWithValue }) => {
//     try {
//       return await runFullPipeline(payload);
//     } catch (err: any) {
//       return rejectWithValue(err?.response?.data?.message || err?.message || "Pipeline failed");
//     }
//   }
// );

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { runFullPipeline } from "@/services/api/pipelineAPI";
import type { RunPipelineBody as RunPipelinePayload } from "@/services/api/pipelineAPI";

export const runFullPipelineThunk = createAsyncThunk(
  "pipeline/runFull",
  async (payload: RunPipelinePayload, { rejectWithValue }) => {
    try {
      return await runFullPipeline(payload);
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || err?.message || "Pipeline failed"
      );
    }
  }
);
