// // "use client";

// // import React, { useState } from "react";
// // import { Loader2, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";
// // import { runFullPipeline } from "@/services/api/pipelineAPI";

// // type Props = {
// //   job: { id: number | string; title: string; location?: string; description?: string };
// //   onPipelineStart?: () => void;
// //   onPipelineComplete?: () => void;
// //   onClose?: () => void;
// // };

// // type State = "loading" | "started" | "already_running" | "rate_limited" | "error";

// // const PipelineRunner: React.FC<Props> = ({ job, onPipelineStart, onPipelineComplete, onClose }) => {
// //   const [state, setState]     = useState<State>("loading");
// //   const [errorMsg, setErrorMsg] = useState<string>("");

// //   React.useEffect(() => {
// //     const run = async () => {
// //       onPipelineStart?.();

// //       const result = await runFullPipeline({
// //         job_id:            job.id,
// //         job_title:         job.title,
// //         job_desc:          job.description || "",
// //         create_assessment: true,
// //       });

// //       if (result.ok) {
// //         setState("started");
// //         setTimeout(() => { onPipelineComplete?.(); onClose?.(); }, 2000);
// //       } else if (result.reason === "already_running") {
// //         setState("already_running");
// //         setTimeout(() => onClose?.(), 3000);
// //       } else if (result.reason === "rate_limited") {
// //         setState("rate_limited");
// //       } else {
// //         setErrorMsg(result.message);
// //         setState("error");
// //       }
// //     };

// //     run();
// //   }, []);

// //   return (
// //     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
// //       <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 text-center">

// //         {state === "loading" && (
// //           <>
// //             <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-3" />
// //             <p className="text-gray-700 font-medium">Starting pipeline for</p>
// //             <p className="text-blue-600 font-semibold mt-1">{job.title}</p>
// //             <p className="text-sm text-gray-400 mt-2">Please wait...</p>
// //           </>
// //         )}

// //         {state === "started" && (
// //           <>
// //             <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
// //               <CheckCircle className="w-6 h-6 text-green-600" />
// //             </div>
// //             <p className="text-gray-900 font-medium">Pipeline started!</p>
// //             <p className="text-blue-600 font-semibold mt-1">{job.title}</p>
// //             <p className="text-sm text-gray-400 mt-2">Running in background...</p>
// //           </>
// //         )}

// //         {state === "already_running" && (
// //           <>
// //             <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3">
// //               <Clock className="w-6 h-6 text-amber-500" />
// //             </div>
// //             <p className="text-gray-900 font-medium">Already running</p>
// //             <p className="text-blue-600 font-semibold mt-1">{job.title}</p>
// //             <p className="text-sm text-gray-500 mt-2">This job's pipeline is already in progress.</p>
// //             <button onClick={onClose} className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 text-sm">
// //               Got it
// //             </button>
// //           </>
// //         )}

// //         {state === "rate_limited" && (
// //           <>
// //             <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
// //               <AlertTriangle className="w-6 h-6 text-orange-500" />
// //             </div>
// //             <p className="text-gray-900 font-medium">Too many requests</p>
// //             <p className="text-sm text-gray-500 mt-2">Please wait a few minutes before starting another pipeline.</p>
// //             <button onClick={onClose} className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm">
// //               OK
// //             </button>
// //           </>
// //         )}

// //         {state === "error" && (
// //           <>
// //             <XCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
// //             <p className="text-gray-900 font-medium">Something went wrong</p>
// //             <p className="text-sm text-red-500 mt-1">{errorMsg}</p>
// //             <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm">
// //               Close
// //             </button>
// //           </>
// //         )}

// //       </div>
// //     </div>
// //   );
// // };

// // export default PipelineRunner;
// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import {
//   CheckCircle,
//   XCircle,
//   Loader2,
//   FileSearch,
//   Brain,
//   ClipboardList,
//   X,
//   AlertTriangle,
// } from "lucide-react";

// // ── Types ─────────────────────────────────────────────────────────────────────
// type StepStatus = "waiting" | "running" | "done" | "error" | "skipped";

// interface Step {
//   id: string;
//   label: string;
//   description: string;
//   icon: React.ReactNode;
//   status: StepStatus;
//   detail?: string;
// }

// type OverallStatus = "running" | "completed" | "error" | "already_running" | "rate_limited";

// type Props = {
//   job: { id: number | string; title: string; location?: string; description?: string };
//   onPipelineStart?: () => void;
//   onPipelineComplete?: () => void;
//   onClose?: () => void;
// };

// // ── Design tokens ─────────────────────────────────────────────────────────────
// const T = {
//   accent:    "#05977f",
//   accentL:   "#EFF6FF",
//   accentM:   "#BFDBFE",
//   green:     "#059669",
//   greenL:    "#ECFDF5",
//   amber:     "#D97706",
//   amberL:    "#FFFBEB",
//   red:       "#DC2626",
//   redL:      "#FEF2F2",
//   t1:        "#0F172A",
//   t2:        "#64748B",
//   t3:        "#94A3B8",
//   border:    "rgba(0,0,0,0.08)",
//   borderMd:  "rgba(0,0,0,0.14)",
//   bg:        "#F8FAFC",
//   surface:   "#ffffff",
// } as const;

// // ── API base ──────────────────────────────────────────────────────────────────
// const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

// // ── Component ─────────────────────────────────────────────────────────────────
// const PipelineRunner: React.FC<Props> = ({
//   job,
//   onPipelineStart,
//   onPipelineComplete,
//   onClose,
// }) => {
//   const [steps, setSteps] = useState<Step[]>([
//     {
//       id:          "scrape",
//       label:       "Resume Scraping",
//       description: "Downloading resumes from HR dashboard",
//       icon:        <FileSearch size={18} />,
//       status:      "waiting",
//     },
//     {
//       id:          "assessment",
//       label:       "Assessment Creation",
//       description: "Creating exam via assessment platform",
//       icon:        <ClipboardList size={18} />,
//       status:      "waiting",
//     },
//     {
//       id:          "screening",
//       label:       "AI Screening & Scoring",
//       description: "GPT scoring resumes & sending emails",
//       icon:        <Brain size={18} />,
//       status:      "waiting",
//     },
//   ]);

//   const [overallStatus, setOverallStatus] = useState<OverallStatus>("running");
//   const [errorMsg, setErrorMsg]           = useState("");
//   const pollRef    = useRef<ReturnType<typeof setInterval> | null>(null);
//   const startedRef = useRef(false);

//   // ── Helpers ─────────────────────────────────────────────────────────────────
//   const updateStep = (id: string, status: StepStatus, detail?: string) => {
//     setSteps(prev =>
//       prev.map(s => (s.id === id ? { ...s, status, detail: detail ?? s.detail } : s))
//     );
//   };

//   /** Map backend progress % + status → step states (mirrors original logic exactly) */
//   const applyProgress = (progress: number, message: string, status: string) => {
//     const msg = (message || "").toLowerCase();

//     if (status === "completed") {
//       setSteps(prev => prev.map(s => ({ ...s, status: s.status === "error" ? "error" : "done" })));
//       setOverallStatus("completed");
//       return;
//     }
//     if (status === "error") {
//       setOverallStatus("error");
//       setErrorMsg(message);
//       setSteps(prev => prev.map(s => (s.status === "running" ? { ...s, status: "error" } : s)));
//       return;
//     }

//     // Step 1: Scraping  0–40%
//     if (progress <= 10) {
//       updateStep("scrape", "running", "Initializing...");
//     } else if (progress <= 40 || msg.includes("scrap")) {
//       updateStep("scrape", "running", message);
//     }

//     // Step 2: Assessment  40–70%
//     if (progress > 40 && progress <= 45) {
//       updateStep("scrape",     "done",    "Resumes downloaded");
//       updateStep("assessment", "running", "Starting assessment creation...");
//     } else if ((progress > 45 && progress <= 70) || msg.includes("assessment")) {
//       updateStep("scrape",     "done");
//       updateStep("assessment", "running", message);
//     }

//     // Step 3: Screening  70–95%
//     if (progress > 70 && progress <= 75) {
//       updateStep("assessment", "done",    "Assessment link created");
//       updateStep("screening",  "running", "Starting AI screening...");
//     } else if (progress > 75 || msg.includes("screen") || msg.includes("ai")) {
//       updateStep("assessment", "done");
//       updateStep("screening",  "running", message);
//     }
//   };

//   // ── Start pipeline on mount ──────────────────────────────────────────────────
//   useEffect(() => {
//     if (startedRef.current) return;
//     startedRef.current = true;

//     const start = async () => {
//       onPipelineStart?.();
//       updateStep("scrape", "running", "Starting...");

//       try {
//         const res = await fetch(`${API_BASE}/api/run_full_pipeline`, {
//           method:  "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             job_id:            job.id,
//             job_title:         job.title,
//             job_desc:          job.description || "",
//             create_assessment: true,
//           }),
//         });
//         const data = await res.json();

//         if (!res.ok || !data.success) {
//           if (res.status === 409) {
//             setOverallStatus("already_running");
//             setSteps(prev => prev.map(s => ({ ...s, status: "waiting" })));
//             return;
//           }
//           if (res.status === 429) {
//             setOverallStatus("rate_limited");
//             setSteps(prev => prev.map(s => ({ ...s, status: "waiting" })));
//             return;
//           }
//           throw new Error(data.message || "Failed to start pipeline");
//         }

//         // Poll every 3 seconds
//         pollRef.current = setInterval(async () => {
//           try {
//             const sr = await fetch(`${API_BASE}/api/pipeline_status/${job.id}`);
//             const sd = await sr.json();
//             if (!sd.success) return;

//             const { status, message, progress } = sd.status ?? {};
//             applyProgress(progress ?? 0, message ?? "", status ?? "running");

//             if (status === "completed" || status === "error") {
//               if (pollRef.current) clearInterval(pollRef.current);
//               if (status === "completed") {
//                 setTimeout(() => onPipelineComplete?.(), 2500);
//               }
//             }
//           } catch {
//             // silently ignore poll errors
//           }
//         }, 3000);
//       } catch (e: unknown) {
//         const msg = e instanceof Error ? e.message : "Unknown error";
//         setOverallStatus("error");
//         setErrorMsg(msg);
//         setSteps(prev =>
//           prev.map(s => (s.status === "running" ? { ...s, status: "error" } : s))
//         );
//       }
//     };

//     start();

//     return () => {
//       if (pollRef.current) clearInterval(pollRef.current);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // ── Derived values ───────────────────────────────────────────────────────────
//   const completedCount = steps.filter(s => s.status === "done").length;
//   const progressPct    = overallStatus === "completed"
//     ? 100
//     : Math.round((completedCount / steps.length) * 100);

//   // ── Step icon ────────────────────────────────────────────────────────────────
//   const StepIcon = ({ step, idx }: { step: Step; idx: number }) => {
//     const base: React.CSSProperties = {
//       width: 40, height: 40, borderRadius: "50%",
//       flexShrink: 0,
//       display: "flex", alignItems: "center", justifyContent: "center",
//       transition: "all 0.3s",
//     };
//     if (step.status === "done")
//       return (
//         <div style={{ ...base, background: T.greenL, color: T.green }}>
//           <CheckCircle size={18} />
//         </div>
//       );
//     if (step.status === "running")
//       return (
//         <div style={{ ...base, background: "#03633e", color: T.accent }}>
//           <Loader2 size={18} style={{ animation: "spin 0.7s linear infinite" }} />
//         </div>
//       );
//     if (step.status === "error")
//       return (
//         <div style={{ ...base, background: T.redL, color: T.red }}>
//           <XCircle size={18} />
//         </div>
//       );
//     return (
//       <div style={{ ...base, background: "#02584a", color: T.t3 }}>
//         <span style={{ fontSize: 13, fontWeight: 700 }}>{idx + 1}</span>
//       </div>
//     );
//   };

//   // ── Footer content by status ──────────────────────────────────────────────────
//   const Footer = () => {
//     const box: React.CSSProperties = {
//       borderRadius: 10, padding: "12px 16px", textAlign: "center",
//     };

//     if (overallStatus === "running")
//       return (
//         <div style={{ ...box, background: T.accentL }}>
//           <p style={{ fontSize: 13, fontWeight: 600, color: "#072c26" }}>
//             Pipeline running in background
//           </p>
//           <p style={{ fontSize: 11, color: "#04553a", marginTop: 2 }}>
//             You can close this — it will keep running
//           </p>
//           <button
//             onClick={onClose}
//             style={{
//               marginTop: 10, fontSize: 11, color: T.accent,
//               background: "none", border: "none", cursor: "pointer",
//               textDecoration: "underline",
//             }}
//           >
//             Hide and continue
//           </button>
//         </div>
//       );

//     if (overallStatus === "completed")
//       return (
//         <div style={{ ...box, background: T.greenL }}>
//           <CheckCircle
//             size={22}
//             color={T.green}
//             style={{ margin: "0 auto 6px", display: "block" }}
//           />
//           <p style={{ fontSize: 13, fontWeight: 600, color: "#065F46" }}>
//             All steps completed!
//           </p>
//           <p style={{ fontSize: 11, color: "#34D399", marginTop: 2 }}>
//             Candidates screened &amp; emails sent
//           </p>
//           <button
//             onClick={() => { onPipelineComplete?.(); onClose?.(); }}
//             style={{
//               marginTop: 12, padding: "8px 20px",
//               background: T.green, color: "#fff",
//               border: "none", borderRadius: 8,
//               fontSize: 13, fontWeight: 500, cursor: "pointer",
//             }}
//           >
//             View Results
//           </button>
//         </div>
//       );

//     if (overallStatus === "error")
//       return (
//         <div style={{ ...box, background: T.redL }}>
//           <XCircle
//             size={22}
//             color={T.red}
//             style={{ margin: "0 auto 6px", display: "block" }}
//           />
//           <p style={{ fontSize: 13, fontWeight: 600, color: "#991B1B" }}>
//             Pipeline encountered an error
//           </p>
//           <p
//             style={{
//               fontSize: 11, color: T.red, marginTop: 3,
//               wordBreak: "break-word",
//             }}
//           >
//             {errorMsg}
//           </p>
//           <button
//             onClick={onClose}
//             style={{
//               marginTop: 10, padding: "7px 18px",
//               background: T.bg, border: `0.5px solid ${T.borderMd}`,
//               borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer",
//               color: T.t1,
//             }}
//           >
//             Close
//           </button>
//         </div>
//       );

//     if (overallStatus === "already_running")
//       return (
//         <div style={{ ...box, background: T.amberL }}>
//           <AlertTriangle
//             size={22}
//             color={T.amber}
//             style={{ margin: "0 auto 6px", display: "block" }}
//           />
//           <p style={{ fontSize: 13, fontWeight: 600, color: "#92400E" }}>
//             Pipeline already running
//           </p>
//           <p style={{ fontSize: 11, color: T.amber, marginTop: 3 }}>
//             This job&apos;s pipeline is already in progress.
//           </p>
//           <button
//             onClick={onClose}
//             style={{
//               marginTop: 10, padding: "7px 18px",
//               background: T.amber, color: "#fff",
//               border: "none", borderRadius: 8,
//               fontSize: 13, fontWeight: 500, cursor: "pointer",
//             }}
//           >
//             Got it
//           </button>
//         </div>
//       );

//     if (overallStatus === "rate_limited")
//       return (
//         <div style={{ ...box, background: T.amberL }}>
//           <AlertTriangle
//             size={22}
//             color={T.amber}
//             style={{ margin: "0 auto 6px", display: "block" }}
//           />
//           <p style={{ fontSize: 13, fontWeight: 600, color: "#92400E" }}>
//             Too many requests
//           </p>
//           <p style={{ fontSize: 11, color: T.amber, marginTop: 3 }}>
//             Please wait a few minutes before starting another pipeline.
//           </p>
//           <button
//             onClick={onClose}
//             style={{
//               marginTop: 10, padding: "7px 18px",
//               background: T.bg, border: `0.5px solid ${T.borderMd}`,
//               borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer",
//               color: T.t1,
//             }}
//           >
//             OK
//           </button>
//         </div>
//       );

//     return null;
//   };

//   // ── Render ───────────────────────────────────────────────────────────────────
//   return (
//     <div
//       style={{
//         position: "fixed", inset: 0,
//         background: "rgba(0,0,0,0.6)",
//         backdropFilter: "blur(2px)",
//         zIndex: 60,
//         display: "flex", alignItems: "center", justifyContent: "center",
//         padding: 24,
//       }}
//       onClick={e => { if (e.target === e.currentTarget) onClose?.(); }}
//     >
//       <div
//         style={{
//           background: T.surface,
//           borderRadius: 20,
//           boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
//           width: "100%",
//           maxWidth: 420,
//           overflow: "hidden",
//           animation: "slideUp 0.22s ease",
//         }}
//       >
//         {/* Header */}
//         <div
//           style={{
//             background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
//             padding: "20px 24px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <div>
//             <h2 style={{ color: "#fff", fontSize: 16, fontWeight: 600, margin: 0 }}>
//               Running Pipeline
//             </h2>
//             <p
//               style={{
//                 color: "#BFDBFE", fontSize: 13, marginTop: 3,
//                 maxWidth: 260, whiteSpace: "nowrap",
//                 overflow: "hidden", textOverflow: "ellipsis",
//               }}
//             >
//               {job.title}
//             </p>
//           </div>
//           {overallStatus !== "running" && (
//             <button
//               onClick={onClose}
//               style={{
//                 width: 28, height: 28, borderRadius: "50%",
//                 background: "rgba(255,255,255,0.15)", border: "none",
//                 cursor: "pointer", color: "rgba(255,255,255,0.8)",
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 transition: "background 0.14s",
//               }}
//               onMouseEnter={e =>
//                 ((e.currentTarget as HTMLButtonElement).style.background =
//                   "rgba(255,255,255,0.25)")
//               }
//               onMouseLeave={e =>
//                 ((e.currentTarget as HTMLButtonElement).style.background =
//                   "rgba(255,255,255,0.15)")
//               }
//             >
//               <X size={16} />
//             </button>
//           )}
//         </div>

//         {/* Progress bar */}
//         <div style={{ height: 4, background: "#E2E8F0" }}>
//           <div
//             style={{
//               height: "100%",
//               width: `${progressPct}%`,
//               background: overallStatus === "error" ? T.red : T.accent,
//               transition: "width 0.5s ease",
//             }}
//           />
//         </div>

//         {/* Steps */}
//         <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
//           {steps.map((step, idx) => (
//             <div key={step.id} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
//               <StepIcon step={step} idx={idx} />

//               <div style={{ flex: 1, paddingTop: 4 }}>
//                 {/* Label + badge */}
//                 <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                   <span
//                     style={{
//                       fontSize: 13,
//                       fontWeight: 600,
//                       color:
//                         step.status === "done"    ? "#065F46"
//                         : step.status === "running" ? "#1D4ED8"
//                         : step.status === "error"   ? T.red
//                         : T.t3,
//                     }}
//                   >
//                     {step.label}
//                   </span>
//                   {step.status === "running" && (
//                     <span
//                       style={{
//                         fontSize: 10, fontWeight: 600,
//                         padding: "2px 8px", borderRadius: 20,
//                         background: "#DBEAFE", color: T.accent,
//                         animation: "pulse 1.5s ease infinite",
//                       }}
//                     >
//                       In progress
//                     </span>
//                   )}
//                   {step.status === "done" && (
//                     <span
//                       style={{
//                         fontSize: 10, fontWeight: 600,
//                         padding: "2px 8px", borderRadius: 20,
//                         background: T.greenL, color: T.green,
//                       }}
//                     >
//                       Done
//                     </span>
//                   )}
//                 </div>

//                 {/* Description / detail */}
//                 <p style={{ fontSize: 11, color: T.t3, marginTop: 2 }}>
//                   {step.status === "running" && step.detail
//                     ? step.detail
//                     : step.description}
//                 </p>
//                 {step.status === "running" && step.detail && (
//                   <p style={{ fontSize: 11, color: T.accent, marginTop: 2 }}>
//                     {step.detail}
//                   </p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Footer */}
//         <div style={{ padding: "0 24px 20px" }}>
//           <Footer />
//         </div>
//       </div>

//       <style>{`
//         @keyframes spin    { to { transform: rotate(360deg); } }
//         @keyframes pulse   { 0%,100% { opacity:1 } 50% { opacity:.6 } }
//         @keyframes slideUp { from { transform:translateY(12px); opacity:0 } to { transform:translateY(0); opacity:1 } }
//       `}</style>
//     </div>
//   );
// };

// export default PipelineRunner;
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  CheckCircle,
  XCircle,
  Loader2,
  FileSearch,
  Brain,
  ClipboardList,
  X,
  AlertTriangle,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
type StepStatus    = "waiting" | "running" | "done" | "error" | "skipped";
type OverallStatus = "running" | "completed" | "error" | "already_running" | "rate_limited";

interface Step {
  id:          string;
  label:       string;
  description: string;
  icon:        React.ReactNode;
  status:      StepStatus;
  detail?:     string;
}

// ── EXPORTED — imported by Dashboard.tsx ─────────────────────────────────────
export interface PipelineCompleteData {
  jobId:       number | string;
  jobTitle:    string;
  shortlisted: number;
  rejected:    number;
  total:       number;
}

type Props = {
  job: { id: number | string; title: string; location?: string; description?: string };
  onPipelineStart?:    () => void;
  onPipelineComplete?: (data: PipelineCompleteData) => void;
  onClose?:            () => void;
  theme?:              "dark" | "light";
};

// ── Design tokens ─────────────────────────────────────────────────────────────
const T = {
  accent:    "#05977f",
  accentL:   "#EFF6FF",
  accentM:   "#BFDBFE",
  green:     "#059669",
  greenL:    "#ECFDF5",
  amber:     "#D97706",
  amberL:    "#FFFBEB",
  red:       "#DC2626",
  redL:      "#FEF2F2",
  t1:        "#0F172A",
  t2:        "#64748B",
  t3:        "#94A3B8",
  border:    "rgba(0,0,0,0.08)",
  borderMd:  "rgba(0,0,0,0.14)",
  bg:        "#F8FAFC",
  surface:   "#ffffff",
} as const;

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

// ── Component ─────────────────────────────────────────────────────────────────
const PipelineRunner: React.FC<Props> = ({
  job,
  onPipelineStart,
  onPipelineComplete,
  onClose,
}) => {
  const [steps, setSteps] = useState<Step[]>([
    { id: "scrape",     label: "Resume Scraping",       description: "Downloading resumes from HR dashboard",     icon: <FileSearch size={18} />,   status: "waiting" },
    { id: "assessment", label: "Assessment Creation",   description: "Creating exam via assessment platform",     icon: <ClipboardList size={18} />, status: "waiting" },
    { id: "screening",  label: "AI Screening & Scoring", description: "GPT scoring resumes & sending emails",     icon: <Brain size={18} />,        status: "waiting" },
  ]);

  const [overallStatus, setOverallStatus] = useState<OverallStatus>("running");
  const [errorMsg,      setErrorMsg]      = useState("");
  const pollRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedRef = useRef(false);

  const updateStep = (id: string, status: StepStatus, detail?: string) =>
    setSteps(prev => prev.map(s => s.id === id ? { ...s, status, detail: detail ?? s.detail } : s));

  const applyProgress = (progress: number, message: string, status: string) => {
    const msg = (message || "").toLowerCase();

    if (status === "completed") {
      setSteps(prev => prev.map(s => ({ ...s, status: s.status === "error" ? "error" : "done" })));
      setOverallStatus("completed");
      return;
    }
    if (status === "error") {
      setOverallStatus("error");
      setErrorMsg(message);
      setSteps(prev => prev.map(s => s.status === "running" ? { ...s, status: "error" } : s));
      return;
    }

    if (progress <= 10)                              updateStep("scrape", "running", "Initializing...");
    else if (progress <= 40 || msg.includes("scrap")) updateStep("scrape", "running", message);

    if (progress > 40 && progress <= 45) {
      updateStep("scrape", "done", "Resumes downloaded");
      updateStep("assessment", "running", "Starting assessment creation...");
    } else if ((progress > 45 && progress <= 70) || msg.includes("assessment")) {
      updateStep("scrape", "done");
      updateStep("assessment", "running", message);
    }

    if (progress > 70 && progress <= 75) {
      updateStep("assessment", "done", "Assessment link created");
      updateStep("screening", "running", "Starting AI screening...");
    } else if (progress > 75 || msg.includes("screen") || msg.includes("ai")) {
      updateStep("assessment", "done");
      updateStep("screening", "running", message);
    }
  };

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const start = async () => {
      onPipelineStart?.();
      updateStep("scrape", "running", "Starting...");

      try {
        const res = await fetch(`${API_BASE}/api/run_full_pipeline`, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            job_id:            job.id,
            job_title:         job.title,
            job_desc:          job.description || "",
            create_assessment: true,
          }),
        });
        const data = await res.json();

        if (!res.ok || !data.success) {
          if (res.status === 409) { setOverallStatus("already_running"); setSteps(prev => prev.map(s => ({ ...s, status: "waiting" }))); return; }
          if (res.status === 429) { setOverallStatus("rate_limited");    setSteps(prev => prev.map(s => ({ ...s, status: "waiting" }))); return; }
          throw new Error(data.message || "Failed to start pipeline");
        }

        pollRef.current = setInterval(async () => {
          try {
            const sr = await fetch(`${API_BASE}/api/pipeline_status/${job.id}`);
            const sd = await sr.json();
            if (!sd.success) return;

            const { status, message, progress } = sd.status ?? {};
            applyProgress(progress ?? 0, message ?? "", status ?? "running");

            if (status === "completed" || status === "error") {
              if (pollRef.current) clearInterval(pollRef.current);
              if (status === "completed") {
                // Build PipelineCompleteData from poll response
                const completeData: PipelineCompleteData = {
                  jobId:       job.id,
                  jobTitle:    job.title,
                  shortlisted: sd.status?.shortlisted ?? sd.shortlisted ?? 0,
                  rejected:    sd.status?.rejected    ?? sd.rejected    ?? 0,
                  total:       sd.status?.total       ?? sd.total       ?? 0,
                };
                setTimeout(() => {
                  onPipelineComplete?.(completeData);
                  onClose?.();
                }, 2500);
              }
            }
          } catch { /* silently ignore poll errors */ }
        }, 3000);

      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        setOverallStatus("error");
        setErrorMsg(msg);
        setSteps(prev => prev.map(s => s.status === "running" ? { ...s, status: "error" } : s));
      }
    };

    start();
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const completedCount = steps.filter(s => s.status === "done").length;
  const progressPct    = overallStatus === "completed" ? 100 : Math.round((completedCount / steps.length) * 100);

  const StepIcon = ({ step, idx }: { step: Step; idx: number }) => {
    const base: React.CSSProperties = { width: 40, height: 40, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" };
    if (step.status === "done")    return <div style={{ ...base, background: T.greenL, color: T.green }}><CheckCircle size={18} /></div>;
    if (step.status === "running") return <div style={{ ...base, background: "#03633e", color: T.accent }}><Loader2 size={18} style={{ animation: "spin 0.7s linear infinite" }} /></div>;
    if (step.status === "error")   return <div style={{ ...base, background: T.redL,   color: T.red   }}><XCircle size={18} /></div>;
    return <div style={{ ...base, background: "#02584a", color: T.t3 }}><span style={{ fontSize: 13, fontWeight: 700 }}>{idx + 1}</span></div>;
  };

  const Footer = () => {
    const box: React.CSSProperties = { borderRadius: 10, padding: "12px 16px", textAlign: "center" };

    if (overallStatus === "running") return (
      <div style={{ ...box, background: T.accentL }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#072c26" }}>Pipeline running in background</p>
        <p style={{ fontSize: 11, color: "#04553a", marginTop: 2 }}>You can close this — it will keep running</p>
        <button onClick={onClose} style={{ marginTop: 10, fontSize: 11, color: T.accent, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Hide and continue</button>
      </div>
    );

    if (overallStatus === "completed") return (
      <div style={{ ...box, background: T.greenL }}>
        <CheckCircle size={22} color={T.green} style={{ margin: "0 auto 6px", display: "block" }} />
        <p style={{ fontSize: 13, fontWeight: 600, color: "#065F46" }}>All steps completed!</p>
        <p style={{ fontSize: 11, color: "#34D399", marginTop: 2 }}>Candidates screened &amp; emails sent</p>
        <button
          onClick={() => {
            const d: PipelineCompleteData = { jobId: job.id, jobTitle: job.title, shortlisted: 0, rejected: 0, total: 0 };
            onPipelineComplete?.(d);
            onClose?.();
          }}
          style={{ marginTop: 12, padding: "8px 20px", background: T.green, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer" }}
        >
          View Results
        </button>
      </div>
    );

    if (overallStatus === "error") return (
      <div style={{ ...box, background: T.redL }}>
        <XCircle size={22} color={T.red} style={{ margin: "0 auto 6px", display: "block" }} />
        <p style={{ fontSize: 13, fontWeight: 600, color: "#991B1B" }}>Pipeline encountered an error</p>
        <p style={{ fontSize: 11, color: T.red, marginTop: 3, wordBreak: "break-word" }}>{errorMsg}</p>
        <button onClick={onClose} style={{ marginTop: 10, padding: "7px 18px", background: T.bg, border: `0.5px solid ${T.borderMd}`, borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", color: T.t1 }}>Close</button>
      </div>
    );

    if (overallStatus === "already_running") return (
      <div style={{ ...box, background: T.amberL }}>
        <AlertTriangle size={22} color={T.amber} style={{ margin: "0 auto 6px", display: "block" }} />
        <p style={{ fontSize: 13, fontWeight: 600, color: "#92400E" }}>Pipeline already running</p>
        <p style={{ fontSize: 11, color: T.amber, marginTop: 3 }}>This job&apos;s pipeline is already in progress.</p>
        <button onClick={onClose} style={{ marginTop: 10, padding: "7px 18px", background: T.amber, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>Got it</button>
      </div>
    );

    if (overallStatus === "rate_limited") return (
      <div style={{ ...box, background: T.amberL }}>
        <AlertTriangle size={22} color={T.amber} style={{ margin: "0 auto 6px", display: "block" }} />
        <p style={{ fontSize: 13, fontWeight: 600, color: "#92400E" }}>Too many requests</p>
        <p style={{ fontSize: 11, color: T.amber, marginTop: 3 }}>Please wait a few minutes before starting another pipeline.</p>
        <button onClick={onClose} style={{ marginTop: 10, padding: "7px 18px", background: T.bg, border: `0.5px solid ${T.borderMd}`, borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", color: T.t1 }}>OK</button>
      </div>
    );

    return null;
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(2px)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
      onClick={e => { if (e.target === e.currentTarget) onClose?.(); }}
    >
      <div style={{ background: T.surface, borderRadius: 20, boxShadow: "0 20px 60px rgba(0,0,0,0.2)", width: "100%", maxWidth: 420, overflow: "hidden", animation: "slideUp 0.22s ease" }}>

        {/* Header */}
        <div style={{ background: "linear-gradient(135deg,#2563EB,#1D4ED8)", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ color: "#fff", fontSize: 16, fontWeight: 600, margin: 0 }}>Running Pipeline</h2>
            <p style={{ color: "#BFDBFE", fontSize: 13, marginTop: 3, maxWidth: 260, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{job.title}</p>
          </div>
          {overallStatus !== "running" && (
            <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.8)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.14s" }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.25)")}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.15)")}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Progress bar */}
        <div style={{ height: 4, background: "#E2E8F0" }}>
          <div style={{ height: "100%", width: `${progressPct}%`, background: overallStatus === "error" ? T.red : T.accent, transition: "width 0.5s ease" }} />
        </div>

        {/* Steps */}
        <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
          {steps.map((step, idx) => (
            <div key={step.id} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <StepIcon step={step} idx={idx} />
              <div style={{ flex: 1, paddingTop: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: step.status === "done" ? "#065F46" : step.status === "running" ? "#1D4ED8" : step.status === "error" ? T.red : T.t3 }}>
                    {step.label}
                  </span>
                  {step.status === "running" && (
                    <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 20, background: "#DBEAFE", color: T.accent, animation: "pulse 1.5s ease infinite" }}>In progress</span>
                  )}
                  {step.status === "done" && (
                    <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 20, background: T.greenL, color: T.green }}>Done</span>
                  )}
                </div>
                <p style={{ fontSize: 11, color: T.t3, marginTop: 2 }}>
                  {step.status === "running" && step.detail ? step.detail : step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding: "0 24px 20px" }}>
          <Footer />
        </div>
      </div>

      <style>{`
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:.6} }
        @keyframes slideUp { from{transform:translateY(12px);opacity:0} to{transform:translateY(0);opacity:1} }
      `}</style>
    </div>
  );
};

export default PipelineRunner;