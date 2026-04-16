// // // /* eslint-disable @typescript-eslint/no-explicit-any */
// // // "use client";

// // // import React, {
// // //   useCallback,
// // //   useEffect,
// // //   useMemo,
// // //   useRef,
// // //   useState,
// // // } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
// // // import {
// // //   RefreshCw,
// // //   Users,
// // //   Target,
// // //   Clock,
// // //   Bell,
// // //   CheckCircle,
// // //   X,
// // //   Download,
// // //   Settings,
// // //   Search,
// // //   PlayCircle,
// // //   CalendarDays,
// // // } from "lucide-react";
// // // import {
// // //   ResponsiveContainer,
// // //   CartesianGrid,
// // //   Tooltip,
// // //   XAxis,
// // //   YAxis,
// // //   BarChart,
// // //   Bar,
// // //   LineChart,
// // //   Line,
// // //   Cell,
// // // } from "recharts";
// // // import { dashboardRefreshAll } from "@/services/redux/thunk/dashboardThunk";

// // // import StatCard from "./subComponents/StatCard";
// // // import PipelineRunner from "./subComponents/PipelineRunner";
// // // import RecruitmentJourney from "./subComponents/RecruitmentJourney";

// // // // ── Theme ─────────────────────────────────────────────────────────────────────
// // // type Theme = "dark" | "light";

// // // const TOKENS = {
// // //   dark: {
// // //     bg:        "#040d0a",
// // //     surface:   "rgba(255,255,255,0.035)",
// // //     surface2:  "rgba(255,255,255,0.06)",
// // //     sidebarBg: "rgba(4,13,10,0.97)",
// // //     topbarBg:  "rgba(4,13,10,0.95)",
// // //     border:    "rgba(0,214,143,0.11)",
// // //     borderMd:  "rgba(0,214,143,0.22)",
// // //     acc:       "#00d68f",
// // //     acc3:      "#34d399",
// // //     accg:      "rgba(0,214,143,0.25)",
// // //     accs:      "rgba(0,214,143,0.10)",
// // //     tx:        "#e2faf1",
// // //     tx2:       "#a7c4b8",
// // //     tx3:       "#5a8a75",
// // //     red:       "#f87171",
// // //     amber:     "#fbbf24",
// // //     blue:      "#60a5fa",
// // //     purple:    "#a78bfa",
// // //     btnText:   "#040d0a",
// // //     barTrack:  "rgba(0,214,143,0.1)",
// // //     rowHover:  "rgba(0,214,143,0.035)",
// // //     selectBg:  "#0d1f18",
// // //     badgeBg:   "rgba(0,214,143,0.1)",
// // //     badgeCol:  "#00d68f",
// // //     rl:        14,
// // //   },
// // //   light: {
// // //     bg:        "#f0faf6",
// // //     surface:   "#ffffff",
// // //     surface2:  "#f4faf7",
// // //     sidebarBg: "#ffffff",
// // //     topbarBg:  "#ffffff",
// // //     border:    "#c5e8d8",
// // //     borderMd:  "#9dd4bb",
// // //     acc:       "#059669",
// // //     acc3:      "#34d399",
// // //     accg:      "rgba(5,150,105,0.2)",
// // //     accs:      "rgba(5,150,105,0.08)",
// // //     tx:        "#0d2b1e",
// // //     tx2:       "#2d5a42",
// // //     tx3:       "#6b9e85",
// // //     red:       "#dc2626",
// // //     amber:     "#d97706",
// // //     blue:      "#2563eb",
// // //     purple:    "#7c3aed",
// // //     btnText:   "#ffffff",
// // //     barTrack:  "rgba(5,150,105,0.1)",
// // //     rowHover:  "#f0fdf4",
// // //     selectBg:  "#ffffff",
// // //     badgeBg:   "rgba(5,150,105,0.1)",
// // //     badgeCol:  "#059669",
// // //     rl:        14,
// // //   },
// // // } as const;

// // // // ── Pipeline alert ────────────────────────────────────────────────────────────
// // // interface PipelineAlert {
// // //   id:             number;
// // //   jobTitle:       string;
// // //   candidateCount: number;
// // //   rejected:       number;
// // //   time:           string;
// // //   read:           boolean;
// // // }

// // // // ── Result toast ─────────────────────────────────────────────────────────────
// // // interface ResultToast {
// // //   id:             number;
// // //   jobTitle:       string;
// // //   shortlisted:    number;
// // //   rejected:       number;
// // // }

// // // // ── Bell dropdown ─────────────────────────────────────────────────────────────
// // // const BellDropdown: React.FC<{
// // //   alerts:     PipelineAlert[];
// // //   onClearAll: () => void;
// // //   onClose:    () => void;
// // //   theme:      Theme;
// // // }> = ({ alerts, onClearAll, onClose, theme }) => {
// // //   const T = TOKENS[theme];
// // //   return (
// // //     <div
// // //       style={{
// // //         position:   "absolute",
// // //         right:      0,
// // //         top:        44,
// // //         zIndex:     200,
// // //         width:      310,
// // //         background: T.surface,
// // //         border:     `1px solid ${T.border}`,
// // //         borderRadius: 14,
// // //         boxShadow:  "0 16px 48px rgba(0,0,0,0.25)",
// // //         overflow:   "hidden",
// // //         animation:  "tfFadeSlide 0.18s ease",
// // //       }}
// // //     >
// // //       <div
// // //         style={{
// // //           display:        "flex",
// // //           alignItems:     "center",
// // //           justifyContent: "space-between",
// // //           padding:        "12px 16px",
// // //           borderBottom:   `1px solid ${T.border}`,
// // //         }}
// // //       >
// // //         <span style={{ fontSize: 13, fontWeight: 700, color: T.tx }}>Pipeline Alerts</span>
// // //         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
// // //           {alerts.length > 0 && (
// // //             <button
// // //               onClick={onClearAll}
// // //               style={{ background: "none", border: "none", fontSize: 12, fontWeight: 600, color: T.acc, cursor: "pointer" }}
// // //             >
// // //               Clear all
// // //             </button>
// // //           )}
// // //           <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: T.tx3, display: "flex" }}>
// // //             <X size={14} color={T.tx3} />
// // //           </button>
// // //         </div>
// // //       </div>
// // //       <div style={{ maxHeight: 280, overflowY: "auto" }}>
// // //         {alerts.length === 0 ? (
// // //           <div style={{ padding: "32px 16px", textAlign: "center" }}>
// // //             <Bell size={28} color={T.tx3} style={{ margin: "0 auto 8px", display: "block" }} />
// // //             <p style={{ fontSize: 13, color: T.tx3 }}>No alerts yet.</p>
// // //             <p style={{ fontSize: 11, color: T.tx3, marginTop: 3 }}>Run a pipeline to see results here.</p>
// // //           </div>
// // //         ) : (
// // //           alerts.map(alert => (
// // //             <div
// // //               key={alert.id}
// // //               style={{
// // //                 display:       "flex",
// // //                 alignItems:    "flex-start",
// // //                 gap:           10,
// // //                 padding:       "12px 16px",
// // //                 borderBottom:  `1px solid ${T.border}`,
// // //                 transition:    "background 0.12s",
// // //               }}
// // //               onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = T.rowHover)}
// // //               onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = "transparent")}
// // //             >
// // //               <div
// // //                 style={{
// // //                   width:          32,
// // //                   height:         32,
// // //                   borderRadius:   "50%",
// // //                   background:     T.accs,
// // //                   display:        "flex",
// // //                   alignItems:     "center",
// // //                   justifyContent: "center",
// // //                   flexShrink:     0,
// // //                 }}
// // //               >
// // //                 <CheckCircle size={16} color={T.acc} />
// // //               </div>
// // //               <div style={{ flex: 1 }}>
// // //                 <p style={{ fontSize: 13, fontWeight: 600, color: T.tx }}>Pipeline completed</p>
// // //                 <p style={{ fontSize: 11, color: T.acc, marginTop: 1 }}>{alert.jobTitle}</p>
// // //                 <p style={{ fontSize: 11, color: T.tx3, marginTop: 2 }}>
// // //                   <strong style={{ color: T.tx }}>{alert.candidateCount}</strong> candidates · <strong style={{ color: T.tx }}>{alert.rejected}</strong> not shortlisted
// // //                 </p>
// // //                 <p style={{ fontSize: 10, color: T.tx3, marginTop: 3 }}>{alert.time}</p>
// // //               </div>
// // //               {!alert.read && (
// // //                 <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.blue, flexShrink: 0, marginTop: 6 }} />
// // //               )}
// // //             </div>
// // //           ))
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // ── Result toast strip ────────────────────────────────────────────────────────
// // // const PipelineResultToast: React.FC<{
// // //   toasts:    ResultToast[];
// // //   onDismiss: (id: number) => void;
// // //   theme:     Theme;
// // // }> = ({ toasts, onDismiss, theme }) => {
// // //   const T = TOKENS[theme];
// // //   if (!toasts.length) return null;
// // //   return (
// // //     <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 300, display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
// // //       {toasts.map(t => (
// // //         <div
// // //           key={t.id}
// // //           style={{
// // //             background:   T.surface,
// // //             border:       `1px solid ${T.acc}`,
// // //             borderRadius: 12,
// // //             padding:      "10px 18px",
// // //             display:      "flex",
// // //             alignItems:   "center",
// // //             gap:          12,
// // //             boxShadow:    `0 8px 28px rgba(0,0,0,0.18)`,
// // //             animation:    "tfFadeSlide 0.22s ease",
// // //             minWidth:     280,
// // //           }}
// // //         >
// // //           <CheckCircle size={18} color={T.acc} />
// // //           <div style={{ flex: 1 }}>
// // //             <p style={{ fontSize: 13, fontWeight: 600, color: T.tx }}>Pipeline done for <span style={{ color: T.acc }}>{t.jobTitle}</span></p>
// // //             <p style={{ fontSize: 11, color: T.tx3 }}>{t.shortlisted} shortlisted · {t.rejected} not shortlisted</p>
// // //           </div>
// // //           <button
// // //             onClick={() => onDismiss(t.id)}
// // //             style={{ background: "none", border: "none", cursor: "pointer", color: T.tx3, display: "flex" }}
// // //           >
// // //             <X size={13} />
// // //           </button>
// // //         </div>
// // //       ))}
// // //     </div>
// // //   );
// // // };

// // // // ── Dashboard ─────────────────────────────────────────────────────────────────
// // // const Dashboard: React.FC = () => {
// // //   const router   = useRouter();
// // //   const dispatch = useAppDispatch();
// // //   const { jobs, candidates, recruitmentData, loading } = useAppSelector(
// // //     (state: any) => state.dashboard
// // //   );

// // //   const [theme, setTheme]                             = useState<Theme>("dark");
// // //   const [refreshing, setRefreshing]                   = useState(false);
// // //   const [selectedPipelineJob, setSelectedPipelineJob] = useState<any | null>(null);
// // //   const [selectedTimeRange, setSelectedTimeRange]     = useState<"week" | "month" | "quarter" | "year">("month");
// // //   const [lastFetchTime, setLastFetchTime]             = useState<Date | null>(null);

// // //   // Bell alerts
// // //   const [pipelineAlerts, setPipelineAlerts] = useState<PipelineAlert[]>([]);
// // //   const [bellOpen, setBellOpen]             = useState(false);
// // //   const alertIdRef                          = useRef(0);
// // //   const bellRef                             = useRef<HTMLDivElement>(null);

// // //   // Result toasts
// // //   const [resultToasts, setResultToasts] = useState<ResultToast[]>([]);
// // //   const toastIdRef                      = useRef(0);

// // //   // Pipeline status
// // //   const [pipelineStatus, setPipelineStatus] = useState<Record<string, any>>({});

// // //   const T = TOKENS[theme];

// // //   // Load saved theme
// // //   useEffect(() => {
// // //     const saved = localStorage.getItem("tf-theme") as Theme | null;
// // //     if (saved === "light") setTheme("light");
// // //   }, []);

// // //   const toggleTheme = () => {
// // //     const next = theme === "dark" ? "light" : "dark";
// // //     setTheme(next);
// // //     localStorage.setItem("tf-theme", next);
// // //   };

// // //   const unreadCount = pipelineAlerts.filter(a => !a.read).length;

// // //   // Close bell on outside click
// // //   useEffect(() => {
// // //     const handler = (e: MouseEvent) => {
// // //       if (bellRef.current && !bellRef.current.contains(e.target as Node)) setBellOpen(false);
// // //     };
// // //     document.addEventListener("mousedown", handler);
// // //     return () => document.removeEventListener("mousedown", handler);
// // //   }, []);

// // //   // Fetch
// // //   const fetchAll = useCallback(
// // //     async (force = false) => {
// // //       if (force) setRefreshing(true);
// // //       try {
// // //         await dispatch(dashboardRefreshAll()).unwrap();
// // //         setLastFetchTime(new Date());
// // //       } finally {
// // //         setRefreshing(false);
// // //       }
// // //     },
// // //     [dispatch]
// // //   );

// // //   useEffect(() => {
// // //     fetchAll();
// // //     const id = setInterval(() => fetchAll(true), 120_000);
// // //     return () => clearInterval(id);
// // //   }, [fetchAll, selectedTimeRange]);

// // //   // Stats
// // //   const stats = useMemo(() => {
// // //     const total              = candidates.length;
// // //     const shortlisted        = candidates.filter((c: any) => c?.status === "Shortlisted").length;
// // //     const interviews         = candidates.filter((c: any) => c?.interview_scheduled).length;
// // //     const assessmentsSent    = candidates.filter((c: any) => c?.exam_link_sent).length;
// // //     const assessmentsCompleted = candidates.filter((c: any) => c?.exam_completed).length;
// // //     const assessmentsPassed  = candidates.filter((c: any) => c?.exam_percentage >= 70).length;
// // //     const hires              = candidates.filter((c: any) => c?.final_status === "Hired").length;
// // //     const pendingAssessments = candidates.filter(
// // //       (c: any) => c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
// // //     ).length;
// // //     const now = new Date();
// // //     const pendingInterviews = candidates.filter((c: any) => {
// // //       if (!c?.interview_date) return false;
// // //       return c?.interview_scheduled && new Date(c.interview_date) > now;
// // //     }).length;
// // //     const timeToHire = (() => {
// // //       const hired = candidates.filter((c: any) => c?.final_status === "Hired" && c?.processed_date);
// // //       if (!hired.length) return 0;
// // //       const total = hired.reduce((acc: number, c: any) => {
// // //         return acc + Math.max(Math.floor((Date.now() - new Date(c.processed_date).getTime()) / 86_400_000), 0);
// // //       }, 0);
// // //       return Math.round(total / hired.length);
// // //     })();
// // //     return {
// // //       totalApplications:        total,
// // //       activeInterviews:         interviews,
// // //       timeToHire,
// // //       activeAssessments:        pendingAssessments,
// // //       shortlistRate:            total > 0 ? ((shortlisted / total) * 100).toFixed(1) : 0,
// // //       assessmentCompletionRate: assessmentsSent > 0 ? ((assessmentsCompleted / assessmentsSent) * 100).toFixed(1) : 0,
// // //       assessmentPassRate:       assessmentsCompleted > 0 ? ((assessmentsPassed / assessmentsCompleted) * 100).toFixed(1) : 0,
// // //       totalHires:               hires,
// // //       pendingActions:           pendingAssessments + pendingInterviews,
// // //     };
// // //   }, [candidates]);

// // //   // Pipeline stages for bar chart + stage cells
// // //   const pipelineStages = useMemo(() => [
// // //     { name: "Applied",     value: candidates.length,                                                                col: "#00d68f" },
// // //     { name: "Screened",    value: candidates.filter((c: any) => c?.ats_score > 0).length,                          col: "#00c47e" },
// // //     { name: "Shortlisted", value: candidates.filter((c: any) => c?.status === "Shortlisted").length,               col: "#fbbf24" },
// // //     { name: "Assessment",  value: candidates.filter((c: any) => c?.exam_completed).length,                         col: T.blue },
// // //     { name: "Interview",   value: candidates.filter((c: any) => c?.interview_scheduled).length,                    col: "#fbbf24" },
// // //     { name: "Hired",       value: candidates.filter((c: any) => c?.final_status === "Hired").length,               col: T.tx3 },
// // //   ], [candidates, T]);

// // //   // Assessment metrics
// // //   const assessmentMetrics = useMemo(() => [
// // //     { name: "Sent",      value: candidates.filter((c: any) => c?.exam_link_sent).length },
// // //     { name: "Started",   value: candidates.filter((c: any) => c?.exam_started).length },
// // //     { name: "Completed", value: candidates.filter((c: any) => c?.exam_completed).length },
// // //     { name: "Passed",    value: candidates.filter((c: any) => c?.exam_percentage >= 70).length },
// // //   ], [candidates]);

// // //   // Current workflow step
// // //   const currentStep = useMemo(() => {
// // //     if (candidates.some((c: any) => c?.interview_scheduled)) return 4;
// // //     if (candidates.some((c: any) => c?.exam_link_sent))      return 3;
// // //     if (candidates.some((c: any) => c?.status === "Shortlisted")) return 2;
// // //     if (jobs.length > 0)                                     return 1;
// // //     return 0;
// // //   }, [candidates, jobs]);

// // //   // Alerts
// // //   const addPipelineAlert = useCallback((jobTitle: string, shortlisted: number, rejected: number) => {
// // //     const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
// // //     const id   = ++alertIdRef.current;
// // //     setPipelineAlerts(prev => [{ id, jobTitle, candidateCount: shortlisted, rejected, time, read: false }, ...prev]);

// // //     const tid = ++toastIdRef.current;
// // //     setResultToasts(prev => [...prev, { id: tid, jobTitle, shortlisted, rejected }]);
// // //     setTimeout(() => setResultToasts(prev => prev.filter(t => t.id !== tid)), 7000);
// // //   }, []);

// // //   const dismissToast   = (id: number) => setResultToasts(prev => prev.filter(t => t.id !== id));
// // //   const clearAllAlerts = () => setPipelineAlerts([]);
// // //   const openBell       = () => { setBellOpen(o => !o); setPipelineAlerts(prev => prev.map(a => ({ ...a, read: true }))); };

// // //   // Loading
// // //   if (loading && !lastFetchTime) {
// // //     return (
// // //       <div
// // //         style={{
// // //           minHeight:       "100vh",
// // //           background:      T.bg,
// // //           display:         "flex",
// // //           alignItems:      "center",
// // //           justifyContent:  "center",
// // //         }}
// // //       >
// // //         <div style={{ textAlign: "center" }}>
// // //           <div
// // //             style={{
// // //               width:        44,
// // //               height:       44,
// // //               borderRadius: "50%",
// // //               border:       `3px solid ${T.border}`,
// // //               borderTopColor: T.acc,
// // //               margin:       "0 auto 12px",
// // //               animation:    "tfSpin 0.8s linear infinite",
// // //             }}
// // //           />
// // //           <p style={{ fontSize: 13, color: T.tx3 }}>Loading dashboard…</p>
// // //         </div>
// // //         <style>{`@keyframes tfSpin { to { transform:rotate(360deg); } }`}</style>
// // //       </div>
// // //     );
// // //   }

// // //   // ── Render ────────────────────────────────────────────────────────────────
// // //   return (
// // //     <div
// // //       style={{
// // //         minHeight:   "100vh",
// // //         background:  T.bg,
// // //         color:       T.tx,
// // //         fontFamily:  "'Inter',system-ui,sans-serif",
// // //         transition:  "background 0.35s, color 0.35s",
// // //       }}
// // //     >
// // //       {/* ──────────────── TOPBAR ──────────────── */}
// // //       <header
// // //         style={{
// // //           height:       52,
// // //           display:      "flex",
// // //           alignItems:   "center",
// // //           padding:      "0 1.6rem",
// // //           gap:          "1rem",
// // //           background:   T.topbarBg,
// // //           borderBottom: `1px solid ${T.border}`,
// // //           position:     "sticky",
// // //           top:          0,
// // //           zIndex:       100,
// // //           backdropFilter: "blur(20px)",
// // //           transition:   "background 0.35s, border-color 0.35s",
// // //         }}
// // //       >
// // //         {/* Breadcrumb */}
// // //         <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.73rem", color: T.tx3 }}>
// // //           <span style={{ color: T.tx2, fontWeight: 500, cursor: "pointer" }}>MGCV Tech</span>
// // //           <span style={{ opacity: 0.4 }}>/</span>
// // //           <span style={{ color: T.tx }}>Recruitment</span>
// // //         </div>

// // //         {/* Search */}
// // //         <div
// // //           style={{
// // //             display:      "flex",
// // //             alignItems:   "center",
// // //             gap:          7,
// // //             background:   T.surface2,
// // //             border:       `1px solid ${T.border}`,
// // //             borderRadius: 8,
// // //             padding:      "0.36rem 0.9rem",
// // //             minWidth:     240,
// // //           }}
// // //         >
// // //           <Search size={13} color={T.tx3} />
// // //           <input
// // //             type="text"
// // //             placeholder="Search candidates, jobs…"
// // //             style={{
// // //               background: "none",
// // //               border:     "none",
// // //               outline:    "none",
// // //               fontFamily: "inherit",
// // //               fontSize:   "0.73rem",
// // //               color:      T.tx,
// // //               width:      "100%",
// // //             }}
// // //           />
// // //           <span
// // //             style={{
// // //               fontSize:     "0.55rem",
// // //               background:   T.surface,
// // //               border:       `1px solid ${T.border}`,
// // //               borderRadius: 4,
// // //               padding:      "0.1rem 0.35rem",
// // //               color:        T.tx3,
// // //             }}
// // //           >
// // //             ⌘K
// // //           </span>
// // //         </div>

// // //         <div style={{ flex: 1 }} />

// // //         {/* Right controls */}
// // //         <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
// // //           {/* Time range */}
// // //           <select
// // //             value={selectedTimeRange}
// // //             onChange={e => setSelectedTimeRange(e.target.value as any)}
// // //             style={{
// // //               background:         T.selectBg,
// // //               border:             `1px solid ${T.border}`,
// // //               color:              T.tx2,
// // //               fontFamily:         "inherit",
// // //               fontSize:           "0.73rem",
// // //               padding:            "0.36rem 1.6rem 0.36rem 0.75rem",
// // //               borderRadius:       8,
// // //               outline:            "none",
// // //               cursor:             "pointer",
// // //               appearance:         "none",
// // //               WebkitAppearance:   "none",
// // //             }}
// // //           >
// // //             <option value="week">This Week</option>
// // //             <option value="month">This Month</option>
// // //             <option value="quarter">This Quarter</option>
// // //             <option value="year">This Year</option>
// // //           </select>

// // //           {/* Refresh */}
// // //           <IconBtn title="Refresh" onClick={() => fetchAll(true)} theme={theme}>
// // //             <RefreshCw size={14} color={T.tx3} style={refreshing ? { animation: "tfSpin 0.8s linear infinite" } : {}} />
// // //           </IconBtn>

// // //           {/* Bell */}
// // //           <div style={{ position: "relative" }} ref={bellRef}>
// // //             <IconBtn title="Notifications" onClick={openBell} theme={theme}>
// // //               <Bell size={14} color={T.tx3} />
// // //               {unreadCount > 0 && (
// // //                 <span
// // //                   style={{
// // //                     position:       "absolute",
// // //                     top:            -4,
// // //                     right:          -4,
// // //                     minWidth:       16,
// // //                     height:         16,
// // //                     padding:        "0 3px",
// // //                     background:     T.red,
// // //                     color:          "#fff",
// // //                     fontSize:       "0.53rem",
// // //                     fontWeight:     700,
// // //                     borderRadius:   999,
// // //                     display:        "flex",
// // //                     alignItems:     "center",
// // //                     justifyContent: "center",
// // //                     border:         `2px solid ${T.bg}`,
// // //                   }}
// // //                 >
// // //                   {unreadCount > 9 ? "9+" : unreadCount}
// // //                 </span>
// // //               )}
// // //             </IconBtn>
// // //             {bellOpen && (
// // //               <BellDropdown
// // //                 alerts={pipelineAlerts}
// // //                 onClearAll={clearAllAlerts}
// // //                 onClose={() => setBellOpen(false)}
// // //                 theme={theme}
// // //               />
// // //             )}
// // //           </div>

// // //           {/* Export */}
// // //           <TbBtn onClick={() => {}} theme={theme}>
// // //             <Download size={13} color={T.tx2} />
// // //             Export Report
// // //           </TbBtn>

// // //           {/* Settings */}
// // //           <TbBtn onClick={() => {}} theme={theme}>
// // //             <Settings size={13} color={T.tx2} />
// // //             Settings
// // //           </TbBtn>

// // //           {/* Theme toggle */}
// // //           <button
// // //             onClick={toggleTheme}
// // //             style={{
// // //               display:        "flex",
// // //               alignItems:     "center",
// // //               gap:            5,
// // //               background:     T.surface2,
// // //               border:         `1px solid ${T.border}`,
// // //               borderRadius:   999,
// // //               padding:        "0.32rem 0.65rem",
// // //               cursor:         "pointer",
// // //               fontSize:       "0.68rem",
// // //               color:          T.tx2,
// // //               fontFamily:     "inherit",
// // //               transition:     "all 0.2s",
// // //             }}
// // //           >
// // //             {theme === "dark" ? "🌙" : "☀️"}
// // //           </button>

// // //           {/* New Pipeline */}
// // //           <button
// // //             onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
// // //             style={{
// // //               display:      "flex",
// // //               alignItems:   "center",
// // //               gap:          6,
// // //               fontFamily:   "inherit",
// // //               fontSize:     "0.73rem",
// // //               fontWeight:   700,
// // //               background:   T.acc,
// // //               color:        T.btnText,
// // //               padding:      "0.4rem 1rem",
// // //               borderRadius: 8,
// // //               border:       "none",
// // //               cursor:       "pointer",
// // //               boxShadow:    `0 0 16px ${T.accg}`,
// // //               transition:   "all 0.2s",
// // //               whiteSpace:   "nowrap",
// // //             }}
// // //           >
// // //             + New Pipeline
// // //           </button>
// // //         </div>
// // //       </header>

// // //       {/* ──────────────── CONTENT ──────────────── */}
// // //       <div style={{ padding: "1.6rem 1.8rem" }}>

// // //         {/* Dash header */}
// // //         <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.4rem", flexWrap: "wrap", gap: "0.75rem" }}>
// // //           <div>
// // //             <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "2rem", color: T.tx, lineHeight: 1.15, marginBottom: "0.18rem" }}>
// // //               Recruitment <span style={{ color: T.acc }}>Dashboard</span>
// // //             </div>
// // //             <div style={{ fontSize: "0.73rem", color: T.tx3, display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
// // //               Welcome back, HR Manager
// // //               <div style={{ width: 4, height: 4, borderRadius: "50%", background: T.tx3 }} />
// // //               <strong style={{ color: T.acc, fontWeight: 600 }}>{jobs.length} active positions</strong>
// // //               <div style={{ width: 4, height: 4, borderRadius: "50%", background: T.tx3 }} />
// // //               <span style={{ color: T.tx2 }}>
// // //                 {lastFetchTime
// // //                   ? `Last updated ${lastFetchTime.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`
// // //                   : "Loading…"}
// // //               </span>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Recruitment Journey Banner */}
// // //         <RecruitmentJourney
// // //           currentStep={currentStep}
// // //           theme={theme}
// // //           onStepClick={(route) => router.push(route)}
// // //         />

// // //         {/* KPI Cards */}
// // //         <div
// // //           style={{
// // //             display:             "grid",
// // //             gridTemplateColumns: "repeat(4,1fr)",
// // //             gap:                 "0.85rem",
// // //             marginBottom:        "1.4rem",
// // //           }}
// // //         >
// // //           <StatCard
// // //             title="Total Applications"
// // //             value={stats.totalApplications}
// // //             change={12.5}
// // //             changeType="up"
// // //             icon={Users}
// // //             iconBg="rgba(96,165,250,0.12)"
// // //             iconColor={T.blue}
// // //             subtitle="All time applications"
// // //             loading={loading}
// // //             theme={theme}
// // //           />
// // //           <StatCard
// // //             title="Shortlist Rate"
// // //             value={`${stats.shortlistRate}%`}
// // //             change={5.2}
// // //             changeType="up"
// // //             icon={Target}
// // //             iconBg={T.accs}
// // //             iconColor={T.acc}
// // //             subtitle="Candidates shortlisted"
// // //             loading={loading}
// // //             theme={theme}
// // //           />
// // //           <StatCard
// // //             title="Time-to-Hire"
// // //             value={`${stats.timeToHire}d`}
// // //             change={-8.3}
// // //             changeType="down"
// // //             icon={Clock}
// // //             iconBg="rgba(251,191,36,0.10)"
// // //             iconColor={T.amber}
// // //             subtitle="Average days to hire"
// // //             loading={loading}
// // //             theme={theme}
// // //           />
// // //           <StatCard
// // //             title="Pending Actions"
// // //             value={stats.pendingActions}
// // //             changeLabel="✓ All clear"
// // //             changeType="na"
// // //             icon={Bell}
// // //             iconBg="rgba(167,139,250,0.10)"
// // //             iconColor={T.purple}
// // //             subtitle="Requires attention"
// // //             loading={loading}
// // //             theme={theme}
// // //           />
// // //         </div>

// // //         {/* Charts row */}
// // //         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem", marginBottom: "1.4rem" }}>
// // //           {/* Pipeline bar chart */}
// // //           <ChartCard title="Recruitment Pipeline" tag="Candidate counts by stage" theme={theme}>
// // //             <ResponsiveContainer width="100%" height={200}>
// // //               <BarChart data={pipelineStages} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
// // //                 <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "rgba(0,214,143,.055)" : "rgba(5,150,105,.06)"} />
// // //                 <XAxis dataKey="name" tick={{ fontSize: 11, fill: T.tx3 }} axisLine={false} tickLine={false} />
// // //                 <YAxis tick={{ fontSize: 11, fill: T.tx3 }} axisLine={false} tickLine={false} />
// // //                 <Tooltip
// // //                   contentStyle={{
// // //                     background:   T.surface,
// // //                     border:       `1px solid ${T.border}`,
// // //                     borderRadius: 10,
// // //                     fontSize:     12,
// // //                     color:        T.tx,
// // //                   }}
// // //                   formatter={(val: number) => [`${val} candidates`, ""]}
// // //                 />
// // //                 <Bar dataKey="value" radius={[8, 8, 0, 0]}>
// // //                   {pipelineStages.map((stage, i) => <Cell key={i} fill={stage.col} />)}
// // //                 </Bar>
// // //               </BarChart>
// // //             </ResponsiveContainer>
// // //           </ChartCard>

// // //           {/* Activity line chart */}
// // //           <ChartCard title="Hiring Activity" tag="6-month trend" theme={theme}>
// // //             <ResponsiveContainer width="100%" height={200}>
// // //               <LineChart data={recruitmentData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
// // //                 <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "rgba(0,214,143,.055)" : "rgba(5,150,105,.06)"} />
// // //                 <XAxis dataKey="month" tick={{ fontSize: 10, fill: T.tx3 }} axisLine={false} tickLine={false} />
// // //                 <YAxis tick={{ fontSize: 10, fill: T.tx3 }} axisLine={false} tickLine={false} />
// // //                 <Tooltip
// // //                   contentStyle={{
// // //                     background:   T.surface,
// // //                     border:       `1px solid ${T.border}`,
// // //                     borderRadius: 10,
// // //                     fontSize:     12,
// // //                     color:        T.tx,
// // //                   }}
// // //                 />
// // //                 <Line type="monotone" dataKey="applications" stroke={T.acc}   strokeWidth={2.5} dot={{ fill: T.acc,   r: 4 }} activeDot={{ r: 6 }} />
// // //                 <Line type="monotone" dataKey="interviews"   stroke={T.blue}  strokeWidth={2.5} dot={{ fill: T.blue,  r: 4 }} activeDot={{ r: 6 }} />
// // //                 <Line type="monotone" dataKey="hires"        stroke={T.amber} strokeWidth={2}   dot={{ fill: T.amber, r: 4 }} strokeDasharray="5 4" />
// // //               </LineChart>
// // //             </ResponsiveContainer>
// // //             <div style={{ display: "flex", alignItems: "center", gap: "1.1rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
// // //               {[
// // //                 { color: T.acc,   label: "Applications" },
// // //                 { color: T.blue,  label: "Interviews" },
// // //                 { color: T.amber, label: "Hires" },
// // //               ].map(l => (
// // //                 <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.65rem", color: T.tx2 }}>
// // //                   <div style={{ width: 8, height: 8, borderRadius: "50%", background: l.color }} />
// // //                   {l.label}
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </ChartCard>
// // //         </div>

// // //         {/* Pipeline stage cells */}
// // //         <div style={{ marginBottom: "1.4rem" }}>
// // //           <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
// // //             <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
// // //               <span style={{ fontSize: "0.85rem", fontWeight: 700, color: T.tx }}>Pipeline Stages</span>
// // //               <span style={{ fontSize: "0.6rem", fontWeight: 600, padding: "0.15rem 0.52rem", borderRadius: 999, background: T.badgeBg, color: T.badgeCol }}>
// // //                 Live counts
// // //               </span>
// // //             </div>
// // //             <span style={{ fontSize: "0.66rem", color: T.tx3 }}>Click stage to filter candidates →</span>
// // //           </div>
// // //           <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: "0.65rem" }}>
// // //             {pipelineStages.map((stage, idx) => {
// // //               const max = pipelineStages[0]?.value || 1;
// // //               const pct = max > 0 ? Math.round((stage.value / max) * 100) : 0;
// // //               return (
// // //                 <div
// // //                   key={idx}
// // //                   style={{
// // //                     background:   T.surface,
// // //                     border:       `1px solid ${T.border}`,
// // //                     borderRadius: 12,
// // //                     padding:      "0.9rem 1rem",
// // //                     cursor:       "pointer",
// // //                     transition:   "all 0.18s",
// // //                   }}
// // //                   onMouseEnter={e => {
// // //                     const el = e.currentTarget as HTMLDivElement;
// // //                     el.style.borderColor = stage.col;
// // //                     el.style.background  = T.accs;
// // //                   }}
// // //                   onMouseLeave={e => {
// // //                     const el = e.currentTarget as HTMLDivElement;
// // //                     el.style.borderColor = T.border;
// // //                     el.style.background  = T.surface;
// // //                   }}
// // //                 >
// // //                   <div style={{ fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: T.tx3, marginBottom: "0.4rem" }}>
// // //                     {stage.name}
// // //                   </div>
// // //                   <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "1.9rem", color: T.tx, lineHeight: 1, marginBottom: "0.5rem" }}>
// // //                     {stage.value}
// // //                   </div>
// // //                   <div style={{ height: 3, borderRadius: 2, background: T.barTrack, overflow: "hidden", marginBottom: "0.3rem" }}>
// // //                     <div style={{ height: "100%", width: `${pct}%`, borderRadius: 2, background: stage.col, transition: "width 0.9s ease" }} />
// // //                   </div>
// // //                   <div style={{ fontSize: "0.58rem", color: T.tx3 }}>{pct}% of total</div>
// // //                 </div>
// // //               );
// // //             })}
// // //           </div>
// // //         </div>

// // //         {/* Active jobs table */}
// // //         <div
// // //           style={{
// // //             background:    T.surface,
// // //             border:        `1px solid ${T.border}`,
// // //             borderRadius:  14,
// // //             overflow:      "hidden",
// // //             marginBottom:  "1.4rem",
// // //           }}
// // //         >
// // //           <div
// // //             style={{
// // //               display:        "flex",
// // //               alignItems:     "center",
// // //               justifyContent: "space-between",
// // //               padding:        "0.85rem 1.2rem",
// // //               borderBottom:   `1px solid ${T.border}`,
// // //               flexWrap:       "wrap",
// // //               gap:            "0.5rem",
// // //             }}
// // //           >
// // //             <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
// // //               <span style={{ fontSize: "0.85rem", fontWeight: 700, color: T.tx }}>Active Job Positions</span>
// // //               <span style={{ fontSize: "0.6rem", fontWeight: 600, padding: "0.15rem 0.52rem", borderRadius: 999, background: T.badgeBg, color: T.badgeCol }}>
// // //                 {jobs.length} active
// // //               </span>
// // //               <span style={{ fontSize: "0.58rem", fontWeight: 700, padding: "0.15rem 0.52rem", borderRadius: 999, background: T.accs, color: T.acc, border: `1px solid ${T.border}` }}>
// // //                 + AI Pipeline
// // //               </span>
// // //             </div>
// // //             <button
// // //               onClick={() => router.push("/candidates")}
// // //               style={{ background: "none", border: "none", fontSize: "0.73rem", fontWeight: 600, color: T.acc, cursor: "pointer", fontFamily: "inherit" }}
// // //             >
// // //               View All Candidates →
// // //             </button>
// // //           </div>

// // //           <div style={{ overflowX: "auto" }}>
// // //             <table style={{ width: "100%", borderCollapse: "collapse" }}>
// // //               <thead>
// // //                 <tr style={{ background: theme === "dark" ? "rgba(0,214,143,.025)" : T.surface2 }}>
// // //                   {["Position", "Department", "Location", "Apps", "Shortlisted", "In Progress", "Days Open", "Status", "Actions"].map(h => (
// // //                     <th
// // //                       key={h}
// // //                       style={{
// // //                         padding:       "0.56rem 1rem",
// // //                         textAlign:     "left",
// // //                         fontSize:      "0.57rem",
// // //                         fontWeight:    700,
// // //                         letterSpacing: "0.09em",
// // //                         textTransform: "uppercase",
// // //                         color:         T.tx3,
// // //                         borderBottom:  `1px solid ${T.border}`,
// // //                         whiteSpace:    "nowrap",
// // //                       }}
// // //                     >
// // //                       {h}
// // //                     </th>
// // //                   ))}
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {jobs.map((job: any) => {
// // //                   const jCandidates = candidates.filter((c: any) => String(c?.job_id) === String(job.id));
// // //                   const shortlisted = jCandidates.filter((c: any) => c?.status === "Shortlisted").length;
// // //                   const inProgress  = jCandidates.filter((c: any) => c?.interview_scheduled).length;
// // //                   const daysOpen    = job.created_at
// // //                     ? Math.floor((Date.now() - new Date(job.created_at).getTime()) / 86_400_000)
// // //                     : "—";
// // //                   const deptColors: Record<string, { bg: string; col: string }> = {
// // //                     "AI/ML":        { bg: "rgba(0,214,143,0.12)",   col: T.acc },
// // //                     "Engineering":  { bg: "rgba(167,139,250,0.12)", col: T.purple },
// // //                     "Health Care":  { bg: "rgba(96,165,250,0.12)",  col: T.blue },
// // //                     "Design":       { bg: "rgba(251,191,36,0.12)",  col: T.amber },
// // //                     "Product":      { bg: "rgba(251,191,36,0.12)",  col: T.amber },
// // //                   };
// // //                   const dc = deptColors[job.department] ?? { bg: T.surface2, col: T.tx2 };
// // //                   const initials = (job.title || "JO").split(" ").slice(0, 2).map((w: string) => w[0]).join("").toUpperCase();

// // //                   return (
// // //                     <tr key={job.id}>
// // //                       <td
// // //                         style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}`, transition: "background 0.12s" }}
// // //                         onMouseEnter={e => ((e.currentTarget.parentElement as HTMLTableRowElement).style.background = T.rowHover)}
// // //                         onMouseLeave={e => ((e.currentTarget.parentElement as HTMLTableRowElement).style.background = "transparent")}
// // //                       >
// // //                         <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
// // //                           <div style={{ width: 30, height: 30, borderRadius: 8, background: dc.bg, color: dc.col, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700, flexShrink: 0 }}>
// // //                             {initials}
// // //                           </div>
// // //                           <div>
// // //                             <div style={{ fontSize: "0.78rem", fontWeight: 600, color: T.tx }}>{job.title}</div>
// // //                             <div style={{ fontSize: "0.6rem", color: T.tx3 }}>JOB-{job.id}</div>
// // //                           </div>
// // //                         </div>
// // //                       </td>
// // //                       <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}` }}>
// // //                         <span style={{ fontSize: "0.62rem", fontWeight: 600, padding: "0.18rem 0.58rem", borderRadius: 999, background: dc.bg, color: dc.col }}>
// // //                           {job.department}
// // //                         </span>
// // //                       </td>
// // //                       <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}`, fontSize: "0.73rem", color: T.tx2 }}>
// // //                         📍 {job.location || "—"}
// // //                       </td>
// // //                       <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}`, fontSize: "0.78rem", fontWeight: 600, color: T.tx }}>
// // //                         {jCandidates.length}
// // //                       </td>
// // //                       <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}`, fontSize: "0.78rem", fontWeight: 600, color: T.blue, cursor: "pointer" }}
// // //                         onClick={() => router.push("/candidates")}
// // //                       >
// // //                         {shortlisted}
// // //                       </td>
// // //                       <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}`, fontSize: "0.78rem", fontWeight: 600, color: T.tx }}>
// // //                         {inProgress}
// // //                       </td>
// // //                       <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}` }}>
// // //                         <span style={{ fontSize: "0.62rem", color: T.tx3, background: T.surface2, border: `1px solid ${T.border}`, padding: "0.14rem 0.48rem", borderRadius: 5 }}>
// // //                           {typeof daysOpen === "number" ? `${daysOpen}d ago` : "—"}
// // //                         </span>
// // //                       </td>
// // //                       <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}` }}>
// // //                         <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: "0.64rem", fontWeight: 600, background: T.badgeBg, color: T.badgeCol, padding: "0.2rem 0.62rem", borderRadius: 999 }}>
// // //                           <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.acc, animation: "tfDot 2s infinite" }} />
// // //                           Active
// // //                         </span>
// // //                       </td>
// // //                       <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}` }}>
// // //                         <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
// // //                           <button
// // //                             onClick={() => router.push("/candidates")}
// // //                             style={{ fontSize: "0.68rem", fontWeight: 600, background: "transparent", border: `1px solid ${T.border}`, color: T.tx2, padding: "0.24rem 0.65rem", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", transition: "all 0.18s" }}
// // //                             onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = T.blue; el.style.color = T.blue; }}
// // //                             onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = T.border; el.style.color = T.tx2; }}
// // //                           >
// // //                             View
// // //                           </button>
// // //                           <button
// // //                             onClick={() => setSelectedPipelineJob(job)}
// // //                             style={{ fontSize: "0.68rem", fontWeight: 700, background: T.acc, border: "none", color: T.btnText, padding: "0.24rem 0.8rem", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", transition: "all 0.18s", boxShadow: `0 0 10px ${T.accg}` }}
// // //                             onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = T.acc3)}
// // //                             onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = T.acc)}
// // //                           >
// // //                             Run Pipeline
// // //                           </button>
// // //                         </div>
// // //                       </td>
// // //                     </tr>
// // //                   );
// // //                 })}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         </div>

// // //         {/* Bottom row: Assessment + Quick Actions */}
// // //         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem", marginBottom: "1.4rem" }}>
// // //           {/* Assessment Metrics */}
// // //           <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden" }}>
// // //             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.85rem 1.2rem", borderBottom: `1px solid ${T.border}` }}>
// // //               <span style={{ fontSize: "0.82rem", fontWeight: 700, color: T.tx }}>Assessment Metrics</span>
// // //               <button style={{ background: "none", border: "none", fontSize: "0.68rem", fontWeight: 600, color: T.acc, cursor: "pointer", fontFamily: "inherit" }}>View details →</button>
// // //             </div>

// // //             {/* Big rate boxes */}
// // //             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", padding: "0.9rem 1.2rem" }}>
// // //               {[
// // //                 { val: `${stats.assessmentCompletionRate}%`, lbl: "Completion Rate", color: T.acc },
// // //                 { val: `${stats.assessmentPassRate}%`,       lbl: "Pass Rate",        color: T.blue },
// // //               ].map(box => (
// // //                 <div key={box.lbl} style={{ background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 11, padding: "0.9rem 1rem", textAlign: "center" }}>
// // //                   <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "1.9rem", color: box.color, lineHeight: 1, marginBottom: "0.2rem" }}>{box.val}</div>
// // //                   <div style={{ fontSize: "0.62rem", color: T.tx3 }}>{box.lbl}</div>
// // //                 </div>
// // //               ))}
// // //             </div>

// // //             {/* Bar rows */}
// // //             <div style={{ padding: "0.2rem 1.2rem 0.9rem" }}>
// // //               {assessmentMetrics.map((m, idx) => {
// // //                 const max  = assessmentMetrics[0]?.value || 1;
// // //                 const pct  = max > 0 ? Math.round((m.value / max) * 100) : 0;
// // //                 const cols = [T.acc, T.blue, T.purple, T.red];
// // //                 return (
// // //                   <div key={m.name} style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.52rem" }}>
// // //                     <div style={{ fontSize: "0.68rem", color: T.tx2, width: 70, flexShrink: 0 }}>{m.name}</div>
// // //                     <div style={{ flex: 1, height: 5, borderRadius: 3, background: T.barTrack, overflow: "hidden" }}>
// // //                       <div style={{ height: "100%", width: `${pct}%`, borderRadius: 3, background: cols[idx], transition: "width 0.9s ease" }} />
// // //                     </div>
// // //                     <div style={{ fontSize: "0.68rem", fontWeight: 600, color: T.tx, width: 20, textAlign: "right" }}>{m.value}</div>
// // //                   </div>
// // //                 );
// // //               })}
// // //             </div>

// // //             <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "0.6rem 1.2rem", borderTop: `1px solid ${T.border}`, fontSize: "0.67rem", color: T.tx3 }}>
// // //               <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.acc, flexShrink: 0 }} />
// // //               {`${stats.assessmentCompletionRate}% completion · ${stats.assessmentPassRate}% pass rate`}
// // //             </div>
// // //           </div>

// // //           {/* Quick Actions */}
// // //           <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden" }}>
// // //             <div style={{ padding: "0.85rem 1.2rem", borderBottom: `1px solid ${T.border}`, fontSize: "0.82rem", fontWeight: 700, color: T.tx }}>
// // //               Quick Actions
// // //             </div>
// // //             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem", padding: "0.9rem 1.1rem" }}>
// // //               {[
// // //                 { label: "New Pipeline",          sub: "Start recruitment flow",      icon: <PlayCircle size={15} />,   color: T.accs,                    stroke: T.acc,    onClick: () => jobs.length > 0 && setSelectedPipelineJob(jobs[0]) },
// // //                 { label: "Manage Assessments",    sub: `${stats.activeAssessments} pending reviews`, icon: <Target size={15} />,  color: "rgba(167,139,250,0.12)", stroke: T.purple, onClick: () => router.push("/assessments") },
// // //                 { label: "Schedule Interviews",   sub: `${stats.activeInterviews} interviews scheduled`, icon: <CalendarDays size={15} />, color: "rgba(96,165,250,0.12)", stroke: T.blue, onClick: () => router.push("/scheduler") },
// // //                 { label: "View All Candidates",   sub: `${candidates.length} total candidates`, icon: <Users size={15} />,  color: "rgba(251,191,36,0.12)", stroke: T.amber, onClick: () => router.push("/candidates") },
// // //               ].map(qa => (
// // //                 <button
// // //                   key={qa.label}
// // //                   onClick={qa.onClick}
// // //                   style={{
// // //                     background:   T.surface2,
// // //                     border:       `1px solid ${T.border}`,
// // //                     borderRadius: 11,
// // //                     padding:      "0.85rem 0.95rem",
// // //                     cursor:       "pointer",
// // //                     transition:   "all 0.2s",
// // //                     textAlign:    "left",
// // //                     fontFamily:   "inherit",
// // //                     width:        "100%",
// // //                     display:      "flex",
// // //                     alignItems:   "flex-start",
// // //                     gap:          "0.65rem",
// // //                   }}
// // //                   onMouseEnter={e => {
// // //                     const el = e.currentTarget as HTMLButtonElement;
// // //                     el.style.borderColor = T.acc;
// // //                     el.style.background  = T.accs;
// // //                     el.style.transform   = "translateY(-1px)";
// // //                   }}
// // //                   onMouseLeave={e => {
// // //                     const el = e.currentTarget as HTMLButtonElement;
// // //                     el.style.borderColor = T.border;
// // //                     el.style.background  = T.surface2;
// // //                     el.style.transform   = "translateY(0)";
// // //                   }}
// // //                 >
// // //                   <div style={{ width: 32, height: 32, borderRadius: 9, background: qa.color, display: "flex", alignItems: "center", justifyContent: "center", color: qa.stroke, flexShrink: 0 }}>
// // //                     {qa.icon}
// // //                   </div>
// // //                   <div>
// // //                     <div style={{ fontSize: "0.74rem", fontWeight: 600, color: T.tx, marginBottom: "0.12rem" }}>{qa.label}</div>
// // //                     <div style={{ fontSize: "0.62rem", color: T.tx3 }}>{qa.sub}</div>
// // //                   </div>
// // //                 </button>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Pipeline Runner modal */}
// // //       {selectedPipelineJob && (
// // //         <PipelineRunner
// // //           job={selectedPipelineJob}
// // //           theme={theme}
// // //           onPipelineStart={() =>
// // //             setPipelineStatus(p => ({
// // //               ...p,
// // //               [selectedPipelineJob.id]: { status: "running", message: "Pipeline running…" },
// // //             }))
// // //           }
// // //           onPipelineComplete={() => {
// // //             fetchAll(true).then(() => {
// // //               const jobCandidates = candidates.filter((c: any) => String(c?.job_id) === String(selectedPipelineJob.id));
// // //               const shortlisted   = jobCandidates.filter((c: any) => c?.status === "Shortlisted").length;
// // //               addPipelineAlert(selectedPipelineJob.title, shortlisted, jobCandidates.length - shortlisted);
// // //               setPipelineStatus(p => ({
// // //                 ...p,
// // //                 [selectedPipelineJob.id]: { status: "completed", message: "Pipeline completed!" },
// // //               }));
// // //             });
// // //           }}
// // //           onClose={() => setSelectedPipelineJob(null)}
// // //         />
// // //       )}

// // //       {/* Result toasts */}
// // //       <PipelineResultToast toasts={resultToasts} onDismiss={dismissToast} theme={theme} />

// // //       <style>{`
// // //         @keyframes tfSpin        { to { transform: rotate(360deg); } }
// // //         @keyframes tfDot         { 0%,100%{opacity:1}50%{opacity:.4} }
// // //         @keyframes tfFadeSlide   { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
// // //         @keyframes tfFillBar     { from{width:0} }
// // //       `}</style>
// // //     </div>
// // //   );
// // // };

// // // // ── Tiny helper components ─────────────────────────────────────────────────────
// // // const IconBtn: React.FC<{ title?: string; onClick?: () => void; theme: Theme; children: React.ReactNode }> = ({
// // //   title, onClick, theme, children
// // // }) => {
// // //   const T = TOKENS[theme];
// // //   return (
// // //     <button
// // //       title={title}
// // //       onClick={onClick}
// // //       style={{
// // //         width:          32,
// // //         height:         32,
// // //         borderRadius:   8,
// // //         background:     T.surface2,
// // //         border:         `1px solid ${T.border}`,
// // //         display:        "flex",
// // //         alignItems:     "center",
// // //         justifyContent: "center",
// // //         cursor:         "pointer",
// // //         position:       "relative",
// // //         transition:     "all 0.18s",
// // //       }}
// // //       onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = T.acc; }}
// // //       onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = T.border; }}
// // //     >
// // //       {children}
// // //     </button>
// // //   );
// // // };

// // // const TbBtn: React.FC<{ onClick?: () => void; theme: Theme; children: React.ReactNode }> = ({
// // //   onClick, theme, children
// // // }) => {
// // //   const T = TOKENS[theme];
// // //   return (
// // //     <button
// // //       onClick={onClick}
// // //       style={{
// // //         display:      "flex",
// // //         alignItems:   "center",
// // //         gap:          6,
// // //         fontFamily:   "inherit",
// // //         fontSize:     "0.72rem",
// // //         fontWeight:   600,
// // //         background:   T.surface2,
// // //         color:        T.tx2,
// // //         padding:      "0.38rem 0.85rem",
// // //         borderRadius: 8,
// // //         border:       `1px solid ${T.border}`,
// // //         cursor:       "pointer",
// // //         transition:   "all 0.18s",
// // //       }}
// // //       onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = T.acc; el.style.color = T.acc; }}
// // //       onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = T.border; el.style.color = T.tx2; }}
// // //     >
// // //       {children}
// // //     </button>
// // //   );
// // // };

// // // const ChartCard: React.FC<{ title: string; tag: string; theme: Theme; children: React.ReactNode }> = ({
// // //   title, tag, theme, children
// // // }) => {
// // //   const T = TOKENS[theme];
// // //   return (
// // //     <div
// // //       style={{
// // //         background:    T.surface,
// // //         border:        `1px solid ${T.border}`,
// // //         borderRadius:  14,
// // //         padding:       "1.2rem",
// // //         backdropFilter:"blur(16px)",
// // //         boxShadow:     theme === "light" ? "0 1px 6px rgba(0,0,0,.06)" : "none",
// // //       }}
// // //     >
// // //       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
// // //         <span style={{ fontSize: "0.82rem", fontWeight: 700, color: T.tx }}>{title}</span>
// // //         <span style={{ fontSize: "0.6rem", fontWeight: 600, padding: "0.15rem 0.52rem", borderRadius: 999, background: T.badgeBg, color: T.badgeCol }}>{tag}</span>
// // //       </div>
// // //       {children}
// // //     </div>
// // //   );
// // // };

// // // export default Dashboard;
// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // "use client";

// // import React, {
// //   useCallback,
// //   useEffect,
// //   useMemo,
// //   useRef,
// //   useState,
// // } from "react";
// // import { useRouter, usePathname } from "next/navigation";
// // import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
// // import {
// //   RefreshCw,
// //   Users,
// //   Target,
// //   Clock,
// //   Bell,
// //   CheckCircle,
// //   X,
// //   Download,
// //   Settings,
// //   Search,
// //   PlayCircle,
// //   CalendarDays,
// //   LayoutDashboard,
// //   UserCheck,
// //   CalendarClock,
// //   ClipboardList,
// //   Trophy,
// //   ScanLine,
// //   BarChart3,
// //   LogOut,
// // } from "lucide-react";
// // import {
// //   ResponsiveContainer,
// //   CartesianGrid,
// //   Tooltip,
// //   XAxis,
// //   YAxis,
// //   BarChart,
// //   Bar,
// //   LineChart,
// //   Line,
// //   Cell,
// // } from "recharts";
// // import { dashboardRefreshAll } from "@/services/redux/thunk/dashboardThunk";
// // import StatCard from "./subComponents/StatCard";
// // import PipelineRunner from "./subComponents/PipelineRunner";
// // import RecruitmentJourney from "./subComponents/RecruitmentJourney";

// // // ── Theme ─────────────────────────────────────────────────────────────────────
// // type Theme = "dark" | "light";

// // interface TokenSet {
// //   bg: string; surface: string; surface2: string;
// //   sidebarBg: string; topbarBg: string;
// //   border: string; borderMd: string;
// //   acc: string; acc3: string; accg: string; accs: string;
// //   tx: string; tx2: string; tx3: string;
// //   red: string; amber: string; blue: string; purple: string;
// //   btnText: string; barTrack: string; rowHover: string;
// //   selectBg: string; badgeBg: string; badgeCol: string;
// //   rl: number;
// // }

// // const TOKENS: Record<Theme, TokenSet> = {
// //   dark: {
// //     bg: "#040d0a", surface: "rgba(255,255,255,0.035)", surface2: "rgba(255,255,255,0.06)",
// //     sidebarBg: "rgba(4,13,10,0.98)", topbarBg: "rgba(4,13,10,0.95)",
// //     border: "rgba(0,214,143,0.11)", borderMd: "rgba(0,214,143,0.22)",
// //     acc: "#00d68f", acc3: "#34d399", accg: "rgba(0,214,143,0.25)", accs: "rgba(0,214,143,0.10)",
// //     tx: "#e2faf1", tx2: "#a7c4b8", tx3: "#5a8a75",
// //     red: "#f87171", amber: "#fbbf24", blue: "#60a5fa", purple: "#a78bfa",
// //     btnText: "#040d0a", barTrack: "rgba(0,214,143,0.1)", rowHover: "rgba(0,214,143,0.035)",
// //     selectBg: "#0d1f18", badgeBg: "rgba(0,214,143,0.1)", badgeCol: "#00d68f", rl: 14,
// //   },
// //   light: {
// //     bg: "#f0faf6", surface: "#ffffff", surface2: "#f4faf7",
// //     sidebarBg: "#ffffff", topbarBg: "#ffffff",
// //     border: "#c5e8d8", borderMd: "#9dd4bb",
// //     acc: "#059669", acc3: "#34d399", accg: "rgba(5,150,105,0.2)", accs: "rgba(5,150,105,0.08)",
// //     tx: "#0d2b1e", tx2: "#2d5a42", tx3: "#6b9e85",
// //     red: "#dc2626", amber: "#d97706", blue: "#2563eb", purple: "#7c3aed",
// //     btnText: "#ffffff", barTrack: "rgba(5,150,105,0.1)", rowHover: "#f0fdf4",
// //     selectBg: "#ffffff", badgeBg: "rgba(5,150,105,0.1)", badgeCol: "#059669", rl: 14,
// //   },
// // };

// // // ── Sidebar nav config ────────────────────────────────────────────────────────
// // const NAV = [
// //   {
// //     section: "Recruitment",
// //     items: [
// //       { path: "/dashboard",         label: "Dashboard",        icon: LayoutDashboard, badge: null,  badgeType: null },
// //       { path: "/candidates",        label: "Candidates",       icon: Users,           badge: null,  badgeType: null },
// //       { path: "/scheduler",         label: "Scheduling",       icon: CalendarClock,   badge: null,  badgeType: null },
// //     ],
// //   },
// //   {
// //     section: "Screening",
// //     items: [
// //       { path: "/assessments",       label: "Assessments",      icon: ClipboardList,   badge: null,  badgeType: null },
// //       { path: "/interview-results", label: "Interview Results", icon: Trophy,          badge: "2",   badgeType: "red" },
// //     ],
// //   },
// //   {
// //     section: "Tools",
// //     items: [
// //       { path: "/candidates",        label: "ATS Checking",     icon: ScanLine,        badge: "AI",  badgeType: "ai" },
// //       { path: "/reports",           label: "Reports",          icon: BarChart3,       badge: null,  badgeType: null },
// //     ],
// //   },
// // ];

// // // ── Types ─────────────────────────────────────────────────────────────────────
// // interface PipelineAlert {
// //   id: number; jobTitle: string; candidateCount: number; rejected: number; time: string; read: boolean;
// // }
// // interface ResultToast {
// //   id: number; jobTitle: string; shortlisted: number; rejected: number;
// // }

// // // ── Sidebar ───────────────────────────────────────────────────────────────────
// // const Sidebar: React.FC<{
// //   theme: Theme;
// //   onToggleTheme: () => void;
// //   onLogout: () => void;
// // }> = ({ theme, onToggleTheme, onLogout }) => {
// //   const T = TOKENS[theme];
// //   const pathname = usePathname();
// //   const router   = useRouter();

// //   return (
// //     <aside
// //       style={{
// //         width:          200,
// //         flexShrink:     0,
// //         background:     T.sidebarBg,
// //         borderRight:    `1px solid ${T.border}`,
// //         display:        "flex",
// //         flexDirection:  "column",
// //         position:       "sticky",
// //         top:            0,
// //         height:         "100vh",
// //         overflowY:      "auto",
// //         backdropFilter: "blur(20px)",
// //         transition:     "background 0.35s, border-color 0.35s",
// //         zIndex:         50,
// //       }}
// //     >
// //       {/* Logo */}
// //       <div
// //         style={{
// //           display:       "flex",
// //           alignItems:    "center",
// //           gap:           9,
// //           padding:       "1.1rem 1.1rem 0.9rem",
// //           borderBottom:  `1px solid ${T.border}`,
// //           transition:    "border-color 0.35s",
// //         }}
// //       >
// //         <div
// //           style={{
// //             width:          34,
// //             height:         34,
// //             borderRadius:   9,
// //             background:     T.acc,
// //             display:        "flex",
// //             alignItems:     "center",
// //             justifyContent: "center",
// //             fontSize:       "0.9rem",
// //             fontWeight:     700,
// //             color:          T.btnText,
// //             flexShrink:     0,
// //             fontFamily:     "Georgia, serif",
// //           }}
// //         >
// //           T
// //         </div>
// //         <div style={{ fontFamily: "Georgia, serif", fontSize: "0.95rem", color: T.tx, lineHeight: 1.2 }}>
// //           TalentFlow <span style={{ color: T.acc }}>AI</span>
// //         </div>
// //       </div>

// //       {/* Nav */}
// //       <nav style={{ flex: 1, padding: "0.7rem 0" }}>
// //         {NAV.map(group => (
// //           <div key={group.section}>
// //             {/* Section label */}
// //             <div
// //               style={{
// //                 fontSize:      "0.58rem",
// //                 fontWeight:    700,
// //                 letterSpacing: "0.1em",
// //                 textTransform: "uppercase",
// //                 color:         T.tx3,
// //                 padding:       "0.6rem 1.1rem 0.3rem",
// //                 transition:    "color 0.35s",
// //               }}
// //             >
// //               {group.section}
// //             </div>

// //             {group.items.map(item => {
// //               const active = pathname === item.path || pathname.startsWith(item.path + "/");
// //               const Icon   = item.icon;
// //               return (
// //                 <div
// //                   key={item.path}
// //                   onClick={() => router.push(item.path)}
// //                   style={{
// //                     display:      "flex",
// //                     alignItems:   "center",
// //                     gap:          8,
// //                     padding:      "0.52rem 1.1rem",
// //                     cursor:       "pointer",
// //                     fontSize:     "0.76rem",
// //                     fontWeight:   active ? 600 : 500,
// //                     color:        active ? T.acc : T.tx2,
// //                     borderLeft:   `2px solid ${active ? T.acc : "transparent"}`,
// //                     background:   active
// //                       ? theme === "dark" ? "rgba(0,214,143,0.08)" : "rgba(5,150,105,0.07)"
// //                       : "transparent",
// //                     transition:   "all 0.15s",
// //                   }}
// //                   onMouseEnter={e => {
// //                     if (!active) {
// //                       const el = e.currentTarget as HTMLDivElement;
// //                       el.style.background = T.surface2;
// //                       el.style.color      = T.tx;
// //                     }
// //                   }}
// //                   onMouseLeave={e => {
// //                     if (!active) {
// //                       const el = e.currentTarget as HTMLDivElement;
// //                       el.style.background = "transparent";
// //                       el.style.color      = T.tx2;
// //                     }
// //                   }}
// //                 >
// //                   {/* Icon box */}
// //                   <div
// //                     style={{
// //                       width:          26,
// //                       height:         26,
// //                       borderRadius:   7,
// //                       display:        "flex",
// //                       alignItems:     "center",
// //                       justifyContent: "center",
// //                       background:     active ? T.accs : T.surface2,
// //                       flexShrink:     0,
// //                       transition:     "background 0.15s",
// //                     }}
// //                   >
// //                     <Icon size={13} color={active ? T.acc : T.tx3} strokeWidth={2} />
// //                   </div>

// //                   <span style={{ flex: 1 }}>{item.label}</span>

// //                   {/* Badge */}
// //                   {item.badge && (
// //                     <span
// //                       style={{
// //                         fontSize:     "0.55rem",
// //                         fontWeight:   700,
// //                         padding:      "0.08rem 0.38rem",
// //                         borderRadius: 999,
// //                         background:
// //                           item.badgeType === "red"
// //                             ? T.red
// //                             : item.badgeType === "ai"
// //                             ? "rgba(167,139,250,0.2)"
// //                             : T.accs,
// //                         color:
// //                           item.badgeType === "red"
// //                             ? "#fff"
// //                             : item.badgeType === "ai"
// //                             ? T.purple
// //                             : T.acc,
// //                         border:
// //                           item.badgeType === "ai"
// //                             ? `1px solid rgba(167,139,250,0.3)`
// //                             : "none",
// //                       }}
// //                     >
// //                       {item.badge}
// //                     </span>
// //                   )}
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         ))}
// //       </nav>

// //       {/* User + theme toggle */}
// //       <div
// //         style={{
// //           padding:      "0.8rem 1rem",
// //           borderTop:    `1px solid ${T.border}`,
// //           display:      "flex",
// //           alignItems:   "center",
// //           gap:          8,
// //           transition:   "border-color 0.35s",
// //         }}
// //       >
// //         {/* Avatar */}
// //         <div
// //           style={{
// //             width:          30,
// //             height:         30,
// //             borderRadius:   "50%",
// //             background:     T.acc,
// //             display:        "flex",
// //             alignItems:     "center",
// //             justifyContent: "center",
// //             fontSize:       "0.7rem",
// //             fontWeight:     700,
// //             color:          T.btnText,
// //             flexShrink:     0,
// //           }}
// //         >
// //           HR
// //         </div>

// //         <div style={{ flex: 1, minWidth: 0 }}>
// //           <div style={{ fontSize: "0.73rem", fontWeight: 600, color: T.tx, transition: "color 0.35s" }}>
// //             HR Manager
// //           </div>
// //           <div style={{ fontSize: "0.58rem", color: T.tx3, transition: "color 0.35s" }}>
// //             Admin · MGCV Tech
// //           </div>
// //         </div>

// //         {/* Theme toggle pill */}
// //         <div
// //           onClick={onToggleTheme}
// //           title="Toggle theme"
// //           style={{
// //             display:      "flex",
// //             alignItems:   "center",
// //             gap:          3,
// //             background:   theme === "dark" ? "rgba(0,214,143,0.12)" : "rgba(5,150,105,0.1)",
// //             border:       `1px solid ${T.borderMd}`,
// //             borderRadius: 999,
// //             padding:      "2px 3px",
// //             cursor:       "pointer",
// //             flexShrink:   0,
// //           }}
// //         >
// //           <span style={{ fontSize: "0.6rem" }}>{theme === "dark" ? "🌙" : "☀️"}</span>
// //           <div
// //             style={{
// //               width:        22,
// //               height:       12,
// //               borderRadius: 999,
// //               background:   T.borderMd,
// //               position:     "relative",
// //             }}
// //           >
// //             <div
// //               style={{
// //                 position:     "absolute",
// //                 top:          2,
// //                 left:         theme === "dark" ? 2 : 12,
// //                 width:        8,
// //                 height:       8,
// //                 borderRadius: "50%",
// //                 background:   T.acc,
// //                 transition:   "left 0.25s cubic-bezier(.4,0,.2,1)",
// //               }}
// //             />
// //           </div>
// //         </div>

// //         {/* Logout */}
// //         <div
// //           onClick={onLogout}
// //           title="Logout"
// //           style={{
// //             width:          22,
// //             height:         22,
// //             borderRadius:   6,
// //             display:        "flex",
// //             alignItems:     "center",
// //             justifyContent: "center",
// //             cursor:         "pointer",
// //             color:          T.tx3,
// //             flexShrink:     0,
// //             transition:     "all 0.15s",
// //           }}
// //           onMouseEnter={e => {
// //             const el = e.currentTarget as HTMLDivElement;
// //             el.style.color      = T.red;
// //             el.style.background = "rgba(248,113,113,0.1)";
// //           }}
// //           onMouseLeave={e => {
// //             const el = e.currentTarget as HTMLDivElement;
// //             el.style.color      = T.tx3;
// //             el.style.background = "transparent";
// //           }}
// //         >
// //           <LogOut size={13} />
// //         </div>
// //       </div>
// //     </aside>
// //   );
// // };

// // // ── Bell dropdown ─────────────────────────────────────────────────────────────
// // const BellDropdown: React.FC<{
// //   alerts: PipelineAlert[]; onClearAll: () => void; onClose: () => void; theme: Theme;
// // }> = ({ alerts, onClearAll, onClose, theme }) => {
// //   const T = TOKENS[theme];
// //   return (
// //     <div
// //       style={{
// //         position: "absolute", right: 0, top: 44, zIndex: 200,
// //         width: 310, background: T.surface, border: `1px solid ${T.border}`,
// //         borderRadius: 14, boxShadow: "0 16px 48px rgba(0,0,0,0.25)",
// //         overflow: "hidden", animation: "tfFadeSlide 0.18s ease",
// //       }}
// //     >
// //       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: `1px solid ${T.border}` }}>
// //         <span style={{ fontSize: 13, fontWeight: 700, color: T.tx }}>Pipeline Alerts</span>
// //         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
// //           {alerts.length > 0 && (
// //             <button onClick={onClearAll} style={{ background: "none", border: "none", fontSize: 12, fontWeight: 600, color: T.acc, cursor: "pointer" }}>Clear all</button>
// //           )}
// //           <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
// //             <X size={14} color={T.tx3} />
// //           </button>
// //         </div>
// //       </div>
// //       <div style={{ maxHeight: 280, overflowY: "auto" }}>
// //         {alerts.length === 0 ? (
// //           <div style={{ padding: "32px 16px", textAlign: "center" }}>
// //             <Bell size={28} color={T.tx3} style={{ margin: "0 auto 8px", display: "block" }} />
// //             <p style={{ fontSize: 13, color: T.tx3 }}>No alerts yet.</p>
// //             <p style={{ fontSize: 11, color: T.tx3, marginTop: 3 }}>Run a pipeline to see results here.</p>
// //           </div>
// //         ) : (
// //           alerts.map(alert => (
// //             <div key={alert.id}
// //               style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 16px", borderBottom: `1px solid ${T.border}`, transition: "background 0.12s" }}
// //               onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = T.rowHover)}
// //               onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = "transparent")}
// //             >
// //               <div style={{ width: 32, height: 32, borderRadius: "50%", background: T.accs, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
// //                 <CheckCircle size={16} color={T.acc} />
// //               </div>
// //               <div style={{ flex: 1 }}>
// //                 <p style={{ fontSize: 13, fontWeight: 600, color: T.tx }}>Pipeline completed</p>
// //                 <p style={{ fontSize: 11, color: T.acc, marginTop: 1 }}>{alert.jobTitle}</p>
// //                 <p style={{ fontSize: 11, color: T.tx3, marginTop: 2 }}>
// //                   <strong style={{ color: T.tx }}>{alert.candidateCount}</strong> candidates · <strong style={{ color: T.tx }}>{alert.rejected}</strong> not shortlisted
// //                 </p>
// //                 <p style={{ fontSize: 10, color: T.tx3, marginTop: 3 }}>{alert.time}</p>
// //               </div>
// //               {!alert.read && <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.blue, flexShrink: 0, marginTop: 6 }} />}
// //             </div>
// //           ))
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // // ── Result toast ──────────────────────────────────────────────────────────────
// // const PipelineResultToast: React.FC<{
// //   toasts: ResultToast[]; onDismiss: (id: number) => void; theme: Theme;
// // }> = ({ toasts, onDismiss, theme }) => {
// //   const T = TOKENS[theme];
// //   if (!toasts.length) return null;
// //   return (
// //     <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 300, display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
// //       {toasts.map(t => (
// //         <div key={t.id}
// //           style={{ background: T.surface, border: `1px solid ${T.acc}`, borderRadius: 12, padding: "10px 18px", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 8px 28px rgba(0,0,0,0.18)", animation: "tfFadeSlide 0.22s ease", minWidth: 280 }}
// //         >
// //           <CheckCircle size={18} color={T.acc} />
// //           <div style={{ flex: 1 }}>
// //             <p style={{ fontSize: 13, fontWeight: 600, color: T.tx }}>Pipeline done for <span style={{ color: T.acc }}>{t.jobTitle}</span></p>
// //             <p style={{ fontSize: 11, color: T.tx3 }}>{t.shortlisted} shortlisted · {t.rejected} not shortlisted</p>
// //           </div>
// //           <button onClick={() => onDismiss(t.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
// //             <X size={13} color={T.tx3} />
// //           </button>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // // ── Icon & text button helpers ────────────────────────────────────────────────
// // const IconBtn: React.FC<{ title?: string; onClick?: () => void; theme: Theme; children: React.ReactNode }> = ({ title, onClick, theme, children }) => {
// //   const T = TOKENS[theme];
// //   return (
// //     <button title={title} onClick={onClick}
// //       style={{ width: 32, height: 32, borderRadius: 8, background: T.surface2, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative", transition: "all 0.18s" }}
// //       onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = T.acc; }}
// //       onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = T.border; }}
// //     >
// //       {children}
// //     </button>
// //   );
// // };

// // const TbBtn: React.FC<{ onClick?: () => void; theme: Theme; children: React.ReactNode }> = ({ onClick, theme, children }) => {
// //   const T = TOKENS[theme];
// //   return (
// //     <button onClick={onClick}
// //       style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit", fontSize: "0.72rem", fontWeight: 600, background: T.surface2, color: T.tx2, padding: "0.38rem 0.85rem", borderRadius: 8, border: `1px solid ${T.border}`, cursor: "pointer", transition: "all 0.18s" }}
// //       onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = T.acc; el.style.color = T.acc; }}
// //       onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = T.border; el.style.color = T.tx2; }}
// //     >
// //       {children}
// //     </button>
// //   );
// // };

// // const ChartCard: React.FC<{ title: string; tag: string; theme: Theme; children: React.ReactNode }> = ({ title, tag, theme, children }) => {
// //   const T = TOKENS[theme];
// //   return (
// //     <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "1.2rem", backdropFilter: "blur(16px)", boxShadow: theme === "light" ? "0 1px 6px rgba(0,0,0,.06)" : "none" }}>
// //       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
// //         <span style={{ fontSize: "0.82rem", fontWeight: 700, color: T.tx }}>{title}</span>
// //         <span style={{ fontSize: "0.6rem", fontWeight: 600, padding: "0.15rem 0.52rem", borderRadius: 999, background: T.badgeBg, color: T.badgeCol }}>{tag}</span>
// //       </div>
// //       {children}
// //     </div>
// //   );
// // };

// // // ── Main Dashboard ────────────────────────────────────────────────────────────
// // const Dashboard: React.FC = () => {
// //   const router   = useRouter();
// //   const dispatch = useAppDispatch();
// //   const { jobs, candidates, recruitmentData, loading } = useAppSelector((state: any) => state.dashboard);

// //   const [theme, setTheme]                             = useState<Theme>("dark");
// //   const [refreshing, setRefreshing]                   = useState(false);
// //   const [selectedPipelineJob, setSelectedPipelineJob] = useState<any | null>(null);
// //   const [selectedTimeRange, setSelectedTimeRange]     = useState<"week" | "month" | "quarter" | "year">("month");
// //   const [lastFetchTime, setLastFetchTime]             = useState<Date | null>(null);
// //   const [pipelineAlerts, setPipelineAlerts]           = useState<PipelineAlert[]>([]);
// //   const [bellOpen, setBellOpen]                       = useState(false);
// //   const [resultToasts, setResultToasts]               = useState<ResultToast[]>([]);
// //   const [pipelineStatus, setPipelineStatus]           = useState<Record<string, any>>({});

// //   const alertIdRef = useRef(0);
// //   const toastIdRef = useRef(0);
// //   const bellRef    = useRef<HTMLDivElement>(null);

// //   const T = TOKENS[theme];

// //   // Load theme
// //   useEffect(() => {
// //     const saved = localStorage.getItem("tf-theme") as Theme | null;
// //     if (saved === "light") setTheme("light");
// //   }, []);

// //   const toggleTheme = () => {
// //     const next = theme === "dark" ? "light" : "dark";
// //     setTheme(next);
// //     localStorage.setItem("tf-theme", next);
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem("authToken");
// //     localStorage.removeItem("tf_token");
// //     localStorage.removeItem("authUser");
// //     router.replace("/");
// //   };

// //   const unreadCount = pipelineAlerts.filter(a => !a.read).length;

// //   useEffect(() => {
// //     const handler = (e: MouseEvent) => {
// //       if (bellRef.current && !bellRef.current.contains(e.target as Node)) setBellOpen(false);
// //     };
// //     document.addEventListener("mousedown", handler);
// //     return () => document.removeEventListener("mousedown", handler);
// //   }, []);

// //   const fetchAll = useCallback(async (force = false) => {
// //     if (force) setRefreshing(true);
// //     try {
// //       await dispatch(dashboardRefreshAll()).unwrap();
// //       setLastFetchTime(new Date());
// //     } finally {
// //       setRefreshing(false);
// //     }
// //   }, [dispatch]);

// //   useEffect(() => {
// //     fetchAll();
// //     const id = setInterval(() => fetchAll(true), 120_000);
// //     return () => clearInterval(id);
// //   }, [fetchAll, selectedTimeRange]);

// //   // Stats
// //   const stats = useMemo(() => {
// //     const total                = candidates.length;
// //     const shortlisted          = candidates.filter((c: any) => c?.status === "Shortlisted").length;
// //     const interviews           = candidates.filter((c: any) => c?.interview_scheduled).length;
// //     const assessmentsSent      = candidates.filter((c: any) => c?.exam_link_sent).length;
// //     const assessmentsCompleted = candidates.filter((c: any) => c?.exam_completed).length;
// //     const assessmentsPassed    = candidates.filter((c: any) => c?.exam_percentage >= 70).length;
// //     const pendingAssessments   = candidates.filter((c: any) => c?.exam_link_sent && !c?.exam_completed && !c?.link_expired).length;
// //     const now                  = new Date();
// //     const pendingInterviews    = candidates.filter((c: any) => c?.interview_scheduled && c?.interview_date && new Date(c.interview_date) > now).length;
// //     const hires                = candidates.filter((c: any) => c?.final_status === "Hired").length;
// //     const timeToHire = (() => {
// //       const hired = candidates.filter((c: any) => c?.final_status === "Hired" && c?.processed_date);
// //       if (!hired.length) return 0;
// //       const total = hired.reduce((acc: number, c: any) =>
// //         acc + Math.max(Math.floor((Date.now() - new Date(c.processed_date).getTime()) / 86_400_000), 0), 0);
// //       return Math.round(total / hired.length);
// //     })();
// //     return {
// //       totalApplications:        total,
// //       activeInterviews:         interviews,
// //       timeToHire,
// //       activeAssessments:        pendingAssessments,
// //       shortlistRate:            total > 0 ? ((shortlisted / total) * 100).toFixed(1) : 0,
// //       assessmentCompletionRate: assessmentsSent > 0 ? ((assessmentsCompleted / assessmentsSent) * 100).toFixed(1) : 0,
// //       assessmentPassRate:       assessmentsCompleted > 0 ? ((assessmentsPassed / assessmentsCompleted) * 100).toFixed(1) : 0,
// //       totalHires:               hires,
// //       pendingActions:           pendingAssessments + pendingInterviews,
// //     };
// //   }, [candidates]);

// //   const pipelineStages = useMemo(() => [
// //     { name: "Applied",     value: candidates.length,                                                       col: "#00d68f" },
// //     { name: "Screened",    value: candidates.filter((c: any) => c?.ats_score > 0).length,                  col: "#00c47e" },
// //     { name: "Shortlisted", value: candidates.filter((c: any) => c?.status === "Shortlisted").length,       col: "#fbbf24" },
// //     { name: "Assessment",  value: candidates.filter((c: any) => c?.exam_completed).length,                 col: T.blue   },
// //     { name: "Interview",   value: candidates.filter((c: any) => c?.interview_scheduled).length,            col: "#fbbf24" },
// //     { name: "Hired",       value: candidates.filter((c: any) => c?.final_status === "Hired").length,       col: T.tx3    },
// //   ], [candidates, T]);

// //   const assessmentMetrics = useMemo(() => [
// //     { name: "Sent",      value: candidates.filter((c: any) => c?.exam_link_sent).length },
// //     { name: "Started",   value: candidates.filter((c: any) => c?.exam_started).length },
// //     { name: "Completed", value: candidates.filter((c: any) => c?.exam_completed).length },
// //     { name: "Passed",    value: candidates.filter((c: any) => c?.exam_percentage >= 70).length },
// //   ], [candidates]);

// //   const currentStep = useMemo(() => {
// //     if (candidates.some((c: any) => c?.interview_scheduled)) return 4;
// //     if (candidates.some((c: any) => c?.exam_link_sent))      return 3;
// //     if (candidates.some((c: any) => c?.status === "Shortlisted")) return 2;
// //     if (jobs.length > 0)                                     return 1;
// //     return 0;
// //   }, [candidates, jobs]);

// //   const addPipelineAlert = useCallback((jobTitle: string, shortlisted: number, rejected: number) => {
// //     const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
// //     const id   = ++alertIdRef.current;
// //     setPipelineAlerts(prev => [{ id, jobTitle, candidateCount: shortlisted, rejected, time, read: false }, ...prev]);
// //     const tid = ++toastIdRef.current;
// //     setResultToasts(prev => [...prev, { id: tid, jobTitle, shortlisted, rejected }]);
// //     setTimeout(() => setResultToasts(prev => prev.filter(t => t.id !== tid)), 7000);
// //   }, []);

// //   const dismissToast   = (id: number) => setResultToasts(prev => prev.filter(t => t.id !== id));
// //   const clearAllAlerts = () => setPipelineAlerts([]);
// //   const openBell       = () => { setBellOpen(o => !o); setPipelineAlerts(prev => prev.map(a => ({ ...a, read: true }))); };

// //   // Loading screen
// //   if (loading && !lastFetchTime) {
// //     return (
// //       <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
// //         <div style={{ textAlign: "center" }}>
// //           <div style={{ width: 44, height: 44, borderRadius: "50%", border: `3px solid ${T.border}`, borderTopColor: T.acc, margin: "0 auto 12px", animation: "tfSpin 0.8s linear infinite" }} />
// //           <p style={{ fontSize: 13, color: T.tx3 }}>Loading dashboard…</p>
// //         </div>
// //         <style>{`@keyframes tfSpin { to { transform:rotate(360deg); } }`}</style>
// //       </div>
// //     );
// //   }

// //   // ── Render ────────────────────────────────────────────────────────────────
// //   return (
// //     <div
// //       style={{
// //         display:    "flex",
// //         minHeight:  "100vh",
// //         background: T.bg,
// //         color:      T.tx,
// //         fontFamily: "'Inter',system-ui,sans-serif",
// //         transition: "background 0.35s, color 0.35s",
// //         position:   "relative",
// //       }}
// //     >
// //       {/* ════ SIDEBAR ════ */}
// //       <Sidebar theme={theme} onToggleTheme={toggleTheme} onLogout={handleLogout} />

// //       {/* ════ MAIN ════ */}
// //       <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>

// //         {/* ── TOPBAR ── */}
// //         <header
// //           style={{
// //             height:         52,
// //             display:        "flex",
// //             alignItems:     "center",
// //             padding:        "0 1.6rem",
// //             gap:            "1rem",
// //             background:     T.topbarBg,
// //             borderBottom:   `1px solid ${T.border}`,
// //             position:       "sticky",
// //             top:            0,
// //             zIndex:         100,
// //             backdropFilter: "blur(20px)",
// //             transition:     "background 0.35s, border-color 0.35s",
// //           }}
// //         >
// //           {/* Breadcrumb */}
// //           <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.73rem", color: T.tx3 }}>
// //             <span style={{ color: T.tx2, fontWeight: 500 }}>MGCV Tech</span>
// //             <span style={{ opacity: 0.4 }}>/</span>
// //             <span style={{ color: T.tx }}>Recruitment</span>
// //           </div>

// //           {/* Search */}
// //           <div style={{ display: "flex", alignItems: "center", gap: 7, background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 8, padding: "0.36rem 0.9rem", minWidth: 240 }}>
// //             <Search size={13} color={T.tx3} />
// //             <input type="text" placeholder="Search candidates, jobs…"
// //               style={{ background: "none", border: "none", outline: "none", fontFamily: "inherit", fontSize: "0.73rem", color: T.tx, width: "100%" }}
// //             />
// //             <span style={{ fontSize: "0.55rem", background: T.surface, border: `1px solid ${T.border}`, borderRadius: 4, padding: "0.1rem 0.35rem", color: T.tx3 }}>⌘K</span>
// //           </div>

// //           <div style={{ flex: 1 }} />

// //           {/* Right controls */}
// //           <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
// //             <select value={selectedTimeRange} onChange={e => setSelectedTimeRange(e.target.value as any)}
// //               style={{ background: T.selectBg, border: `1px solid ${T.border}`, color: T.tx2, fontFamily: "inherit", fontSize: "0.73rem", padding: "0.36rem 1.6rem 0.36rem 0.75rem", borderRadius: 8, outline: "none", cursor: "pointer", appearance: "none", WebkitAppearance: "none" }}
// //             >
// //               <option value="week">This Week</option>
// //               <option value="month">This Month</option>
// //               <option value="quarter">This Quarter</option>
// //               <option value="year">This Year</option>
// //             </select>

// //             <IconBtn title="Refresh" onClick={() => fetchAll(true)} theme={theme}>
// //               <RefreshCw size={14} color={T.tx3} style={refreshing ? { animation: "tfSpin 0.8s linear infinite" } : {}} />
// //             </IconBtn>

// //             {/* Bell */}
// //             <div style={{ position: "relative" }} ref={bellRef}>
// //               <IconBtn title="Notifications" onClick={openBell} theme={theme}>
// //                 <Bell size={14} color={T.tx3} />
// //                 {unreadCount > 0 && (
// //                   <span style={{ position: "absolute", top: -4, right: -4, minWidth: 16, height: 16, padding: "0 3px", background: T.red, color: "#fff", fontSize: "0.53rem", fontWeight: 700, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${T.bg}` }}>
// //                     {unreadCount > 9 ? "9+" : unreadCount}
// //                   </span>
// //                 )}
// //               </IconBtn>
// //               {bellOpen && <BellDropdown alerts={pipelineAlerts} onClearAll={clearAllAlerts} onClose={() => setBellOpen(false)} theme={theme} />}
// //             </div>

// //             <TbBtn onClick={() => {}} theme={theme}><Download size={13} color={T.tx2} />Export Report</TbBtn>
// //             <TbBtn onClick={() => {}} theme={theme}><Settings size={13} color={T.tx2} />Settings</TbBtn>

// //             <button
// //               onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
// //               style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit", fontSize: "0.73rem", fontWeight: 700, background: T.acc, color: T.btnText, padding: "0.4rem 1rem", borderRadius: 8, border: "none", cursor: "pointer", boxShadow: `0 0 16px ${T.accg}`, transition: "all 0.2s", whiteSpace: "nowrap" }}
// //             >
// //               + New Pipeline
// //             </button>
// //           </div>
// //         </header>

// //         {/* ── CONTENT ── */}
// //         <div style={{ padding: "1.6rem 1.8rem", flex: 1 }}>

// //           {/* Dash header */}
// //           <div style={{ marginBottom: "1.4rem" }}>
// //             <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "2rem", color: T.tx, lineHeight: 1.15, marginBottom: "0.18rem" }}>
// //               Recruitment <span style={{ color: T.acc }}>Dashboard</span>
// //             </div>
// //             <div style={{ fontSize: "0.73rem", color: T.tx3, display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
// //               Welcome back, HR Manager
// //               <div style={{ width: 4, height: 4, borderRadius: "50%", background: T.tx3 }} />
// //               <strong style={{ color: T.acc, fontWeight: 600 }}>{jobs.length} active positions</strong>
// //               <div style={{ width: 4, height: 4, borderRadius: "50%", background: T.tx3 }} />
// //               <span style={{ color: T.tx2 }}>
// //                 {lastFetchTime ? `Last updated ${lastFetchTime.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}` : "Loading…"}
// //               </span>
// //             </div>
// //           </div>

// //           {/* Recruitment Journey */}
// //           <RecruitmentJourney currentStep={currentStep} theme={theme} onStepClick={route => router.push(route)} />

// //           {/* KPI Cards */}
// //           <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.85rem", marginBottom: "1.4rem" }}>
// //             <StatCard title="Total Applications" value={stats.totalApplications} change={12.5} changeType="up" icon={Users} iconBg="rgba(96,165,250,0.12)" iconColor={T.blue} subtitle="All time applications" loading={loading} theme={theme} />
// //             <StatCard title="Shortlist Rate" value={`${stats.shortlistRate}%`} change={5.2} changeType="up" icon={Target} iconBg={T.accs} iconColor={T.acc} subtitle="Candidates shortlisted" loading={loading} theme={theme} />
// //             <StatCard title="Time-to-Hire" value={`${stats.timeToHire}d`} change={-8.3} changeType="down" icon={Clock} iconBg="rgba(251,191,36,0.10)" iconColor={T.amber} subtitle="Average days to hire" loading={loading} theme={theme} />
// //             <StatCard title="Pending Actions" value={stats.pendingActions} changeLabel="✓ All clear" changeType="na" icon={Bell} iconBg="rgba(167,139,250,0.10)" iconColor={T.purple} subtitle="Requires attention" loading={loading} theme={theme} />
// //           </div>

// //           {/* Charts */}
// //           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem", marginBottom: "1.4rem" }}>
// //             <ChartCard title="Recruitment Pipeline" tag="Candidate counts by stage" theme={theme}>
// //               <ResponsiveContainer width="100%" height={200}>
// //                 <BarChart data={pipelineStages} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
// //                   <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "rgba(0,214,143,.055)" : "rgba(5,150,105,.06)"} />
// //                   <XAxis dataKey="name" tick={{ fontSize: 11, fill: T.tx3 }} axisLine={false} tickLine={false} />
// //                   <YAxis tick={{ fontSize: 11, fill: T.tx3 }} axisLine={false} tickLine={false} />
// //                   <Tooltip contentStyle={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 12, color: T.tx }} formatter={(val: number) => [`${val} candidates`, ""]} />
// //                   <Bar dataKey="value" radius={[8, 8, 0, 0]}>
// //                     {pipelineStages.map((s, i) => <Cell key={i} fill={s.col} />)}
// //                   </Bar>
// //                 </BarChart>
// //               </ResponsiveContainer>
// //             </ChartCard>

// //             <ChartCard title="Hiring Activity" tag="6-month trend" theme={theme}>
// //               <ResponsiveContainer width="100%" height={200}>
// //                 <LineChart data={recruitmentData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
// //                   <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "rgba(0,214,143,.055)" : "rgba(5,150,105,.06)"} />
// //                   <XAxis dataKey="month" tick={{ fontSize: 10, fill: T.tx3 }} axisLine={false} tickLine={false} />
// //                   <YAxis tick={{ fontSize: 10, fill: T.tx3 }} axisLine={false} tickLine={false} />
// //                   <Tooltip contentStyle={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 12, color: T.tx }} />
// //                   <Line type="monotone" dataKey="applications" stroke={T.acc}   strokeWidth={2.5} dot={{ fill: T.acc,   r: 4 }} activeDot={{ r: 6 }} />
// //                   <Line type="monotone" dataKey="interviews"   stroke={T.blue}  strokeWidth={2.5} dot={{ fill: T.blue,  r: 4 }} activeDot={{ r: 6 }} />
// //                   <Line type="monotone" dataKey="hires"        stroke={T.amber} strokeWidth={2}   dot={{ fill: T.amber, r: 4 }} strokeDasharray="5 4" />
// //                 </LineChart>
// //               </ResponsiveContainer>
// //               <div style={{ display: "flex", alignItems: "center", gap: "1.1rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
// //                 {[{ color: T.acc, label: "Applications" }, { color: T.blue, label: "Interviews" }, { color: T.amber, label: "Hires" }].map(l => (
// //                   <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.65rem", color: T.tx2 }}>
// //                     <div style={{ width: 8, height: 8, borderRadius: "50%", background: l.color }} />
// //                     {l.label}
// //                   </div>
// //                 ))}
// //               </div>
// //             </ChartCard>
// //           </div>

// //           {/* Pipeline stage cells */}
// //           <div style={{ marginBottom: "1.4rem" }}>
// //             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
// //               <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
// //                 <span style={{ fontSize: "0.85rem", fontWeight: 700, color: T.tx }}>Pipeline Stages</span>
// //                 <span style={{ fontSize: "0.6rem", fontWeight: 600, padding: "0.15rem 0.52rem", borderRadius: 999, background: T.badgeBg, color: T.badgeCol }}>Live counts</span>
// //               </div>
// //               <span style={{ fontSize: "0.66rem", color: T.tx3 }}>Click stage to filter candidates →</span>
// //             </div>
// //             <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: "0.65rem" }}>
// //               {pipelineStages.map((stage, idx) => {
// //                 const max = pipelineStages[0]?.value || 1;
// //                 const pct = max > 0 ? Math.round((stage.value / max) * 100) : 0;
// //                 return (
// //                   <div key={idx}
// //                     style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "0.9rem 1rem", cursor: "pointer", transition: "all 0.18s" }}
// //                     onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = stage.col; el.style.background = T.accs; }}
// //                     onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = T.border; el.style.background = T.surface; }}
// //                   >
// //                     <div style={{ fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: T.tx3, marginBottom: "0.4rem" }}>{stage.name}</div>
// //                     <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "1.9rem", color: T.tx, lineHeight: 1, marginBottom: "0.5rem" }}>{stage.value}</div>
// //                     <div style={{ height: 3, borderRadius: 2, background: T.barTrack, overflow: "hidden", marginBottom: "0.3rem" }}>
// //                       <div style={{ height: "100%", width: `${pct}%`, borderRadius: 2, background: stage.col, transition: "width 0.9s ease" }} />
// //                     </div>
// //                     <div style={{ fontSize: "0.58rem", color: T.tx3 }}>{pct}% of total</div>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           </div>

// //           {/* Active jobs table */}
// //           <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden", marginBottom: "1.4rem" }}>
// //             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.85rem 1.2rem", borderBottom: `1px solid ${T.border}`, flexWrap: "wrap", gap: "0.5rem" }}>
// //               <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
// //                 <span style={{ fontSize: "0.85rem", fontWeight: 700, color: T.tx }}>Active Job Positions</span>
// //                 <span style={{ fontSize: "0.6rem", fontWeight: 600, padding: "0.15rem 0.52rem", borderRadius: 999, background: T.badgeBg, color: T.badgeCol }}>{jobs.length} active</span>
// //                 <span style={{ fontSize: "0.58rem", fontWeight: 700, padding: "0.15rem 0.52rem", borderRadius: 999, background: T.accs, color: T.acc, border: `1px solid ${T.border}` }}>+ AI Pipeline</span>
// //               </div>
// //               <button onClick={() => router.push("/candidates")} style={{ background: "none", border: "none", fontSize: "0.73rem", fontWeight: 600, color: T.acc, cursor: "pointer", fontFamily: "inherit" }}>
// //                 View All Candidates →
// //               </button>
// //             </div>
// //             <div style={{ overflowX: "auto" }}>
// //               <table style={{ width: "100%", borderCollapse: "collapse" }}>
// //                 <thead>
// //                   <tr style={{ background: theme === "dark" ? "rgba(0,214,143,.025)" : T.surface2 }}>
// //                     {["Position", "Department", "Location", "Apps", "Shortlisted", "In Progress", "Days Open", "Status", "Actions"].map(h => (
// //                       <th key={h} style={{ padding: "0.56rem 1rem", textAlign: "left", fontSize: "0.57rem", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: T.tx3, borderBottom: `1px solid ${T.border}`, whiteSpace: "nowrap" }}>{h}</th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {jobs.map((job: any) => {
// //                     const jC         = candidates.filter((c: any) => String(c?.job_id) === String(job.id));
// //                     const shortlisted = jC.filter((c: any) => c?.status === "Shortlisted").length;
// //                     const inProgress  = jC.filter((c: any) => c?.interview_scheduled).length;
// //                     const daysOpen    = job.created_at ? Math.floor((Date.now() - new Date(job.created_at).getTime()) / 86_400_000) : "—";
// //                     const deptColors: Record<string, { bg: string; col: string }> = {
// //                       "AI/ML":       { bg: "rgba(0,214,143,0.12)",   col: T.acc    },
// //                       "Engineering": { bg: "rgba(167,139,250,0.12)", col: T.purple },
// //                       "Health Care": { bg: "rgba(96,165,250,0.12)",  col: T.blue   },
// //                       "Design":      { bg: "rgba(251,191,36,0.12)",  col: T.amber  },
// //                       "Product":     { bg: "rgba(251,191,36,0.12)",  col: T.amber  },
// //                     };
// //                     const dc       = deptColors[job.department] ?? { bg: T.surface2, col: T.tx2 };
// //                     const initials = (job.title || "JO").split(" ").slice(0, 2).map((w: string) => w[0]).join("").toUpperCase();
// //                     return (
// //                       <tr key={job.id}
// //                         onMouseEnter={e => ((e.currentTarget as HTMLTableRowElement).style.background = T.rowHover)}
// //                         onMouseLeave={e => ((e.currentTarget as HTMLTableRowElement).style.background = "transparent")}
// //                       >
// //                         <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}` }}>
// //                           <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
// //                             <div style={{ width: 30, height: 30, borderRadius: 8, background: dc.bg, color: dc.col, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700, flexShrink: 0 }}>{initials}</div>
// //                             <div>
// //                               <div style={{ fontSize: "0.78rem", fontWeight: 600, color: T.tx }}>{job.title}</div>
// //                               <div style={{ fontSize: "0.6rem", color: T.tx3 }}>JOB-{job.id}</div>
// //                             </div>
// //                           </div>
// //                         </td>
// //                         <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}` }}>
// //                           <span style={{ fontSize: "0.62rem", fontWeight: 600, padding: "0.18rem 0.58rem", borderRadius: 999, background: dc.bg, color: dc.col }}>{job.department}</span>
// //                         </td>
// //                         <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}`, fontSize: "0.73rem", color: T.tx2 }}>📍 {job.location || "—"}</td>
// //                         <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}`, fontSize: "0.78rem", fontWeight: 600, color: T.tx }}>{jC.length}</td>
// //                         <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}`, fontSize: "0.78rem", fontWeight: 600, color: T.blue, cursor: "pointer" }} onClick={() => router.push("/candidates")}>{shortlisted}</td>
// //                         <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}`, fontSize: "0.78rem", fontWeight: 600, color: T.tx }}>{inProgress}</td>
// //                         <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}` }}>
// //                           <span style={{ fontSize: "0.62rem", color: T.tx3, background: T.surface2, border: `1px solid ${T.border}`, padding: "0.14rem 0.48rem", borderRadius: 5 }}>
// //                             {typeof daysOpen === "number" ? `${daysOpen}d ago` : "—"}
// //                           </span>
// //                         </td>
// //                         <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}` }}>
// //                           <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: "0.64rem", fontWeight: 600, background: T.badgeBg, color: T.badgeCol, padding: "0.2rem 0.62rem", borderRadius: 999 }}>
// //                             <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.acc, animation: "tfDot 2s infinite" }} />
// //                             Active
// //                           </span>
// //                         </td>
// //                         <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}` }}>
// //                           <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
// //                             <button onClick={() => router.push("/candidates")}
// //                               style={{ fontSize: "0.68rem", fontWeight: 600, background: "transparent", border: `1px solid ${T.border}`, color: T.tx2, padding: "0.24rem 0.65rem", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", transition: "all 0.18s" }}
// //                               onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = T.blue; el.style.color = T.blue; }}
// //                               onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = T.border; el.style.color = T.tx2; }}
// //                             >View</button>
// //                             <button onClick={() => setSelectedPipelineJob(job)}
// //                               style={{ fontSize: "0.68rem", fontWeight: 700, background: T.acc, border: "none", color: T.btnText, padding: "0.24rem 0.8rem", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", transition: "all 0.18s", boxShadow: `0 0 10px ${T.accg}` }}
// //                               onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = T.acc3)}
// //                               onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = T.acc)}
// //                             >Run Pipeline</button>
// //                           </div>
// //                         </td>
// //                       </tr>
// //                     );
// //                   })}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>

// //           {/* Bottom row */}
// //           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem", marginBottom: "1.4rem" }}>
// //             {/* Assessment Metrics */}
// //             <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden" }}>
// //               <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.85rem 1.2rem", borderBottom: `1px solid ${T.border}` }}>
// //                 <span style={{ fontSize: "0.82rem", fontWeight: 700, color: T.tx }}>Assessment Metrics</span>
// //                 <button style={{ background: "none", border: "none", fontSize: "0.68rem", fontWeight: 600, color: T.acc, cursor: "pointer", fontFamily: "inherit" }}>View details →</button>
// //               </div>
// //               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", padding: "0.9rem 1.2rem" }}>
// //                 {[{ val: `${stats.assessmentCompletionRate}%`, lbl: "Completion Rate", color: T.acc }, { val: `${stats.assessmentPassRate}%`, lbl: "Pass Rate", color: T.blue }].map(box => (
// //                   <div key={box.lbl} style={{ background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 11, padding: "0.9rem 1rem", textAlign: "center" }}>
// //                     <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "1.9rem", color: box.color, lineHeight: 1, marginBottom: "0.2rem" }}>{box.val}</div>
// //                     <div style={{ fontSize: "0.62rem", color: T.tx3 }}>{box.lbl}</div>
// //                   </div>
// //                 ))}
// //               </div>
// //               <div style={{ padding: "0.2rem 1.2rem 0.9rem" }}>
// //                 {assessmentMetrics.map((m, idx) => {
// //                   const max  = assessmentMetrics[0]?.value || 1;
// //                   const pct  = max > 0 ? Math.round((m.value / max) * 100) : 0;
// //                   const cols = [T.acc, T.blue, T.purple, T.red];
// //                   return (
// //                     <div key={m.name} style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.52rem" }}>
// //                       <div style={{ fontSize: "0.68rem", color: T.tx2, width: 70, flexShrink: 0 }}>{m.name}</div>
// //                       <div style={{ flex: 1, height: 5, borderRadius: 3, background: T.barTrack, overflow: "hidden" }}>
// //                         <div style={{ height: "100%", width: `${pct}%`, borderRadius: 3, background: cols[idx], transition: "width 0.9s ease" }} />
// //                       </div>
// //                       <div style={{ fontSize: "0.68rem", fontWeight: 600, color: T.tx, width: 20, textAlign: "right" }}>{m.value}</div>
// //                     </div>
// //                   );
// //                 })}
// //               </div>
// //               <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "0.6rem 1.2rem", borderTop: `1px solid ${T.border}`, fontSize: "0.67rem", color: T.tx3 }}>
// //                 <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.acc, flexShrink: 0 }} />
// //                 {`${stats.assessmentCompletionRate}% completion · ${stats.assessmentPassRate}% pass rate`}
// //               </div>
// //             </div>

// //             {/* Quick Actions */}
// //             <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden" }}>
// //               <div style={{ padding: "0.85rem 1.2rem", borderBottom: `1px solid ${T.border}`, fontSize: "0.82rem", fontWeight: 700, color: T.tx }}>Quick Actions</div>
// //               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem", padding: "0.9rem 1.1rem" }}>
// //                 {[
// //                   { label: "New Pipeline",        sub: "Start recruitment flow",                        icon: <PlayCircle size={15} />,   color: T.accs,                    stroke: T.acc,    onClick: () => jobs.length > 0 && setSelectedPipelineJob(jobs[0]) },
// //                   { label: "Manage Assessments",  sub: `${stats.activeAssessments} pending reviews`,   icon: <Target size={15} />,       color: "rgba(167,139,250,0.12)",  stroke: T.purple, onClick: () => router.push("/assessments") },
// //                   { label: "Schedule Interviews", sub: `${stats.activeInterviews} interviews scheduled`,icon: <CalendarDays size={15} />, color: "rgba(96,165,250,0.12)",   stroke: T.blue,   onClick: () => router.push("/scheduler") },
// //                   { label: "View All Candidates", sub: `${candidates.length} total candidates`,         icon: <Users size={15} />,        color: "rgba(251,191,36,0.12)",   stroke: T.amber,  onClick: () => router.push("/candidates") },
// //                 ].map(qa => (
// //                   <button key={qa.label} onClick={qa.onClick}
// //                     style={{ background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 11, padding: "0.85rem 0.95rem", cursor: "pointer", transition: "all 0.2s", textAlign: "left", fontFamily: "inherit", width: "100%", display: "flex", alignItems: "flex-start", gap: "0.65rem" }}
// //                     onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = T.acc; el.style.background = T.accs; el.style.transform = "translateY(-1px)"; }}
// //                     onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = T.border; el.style.background = T.surface2; el.style.transform = "translateY(0)"; }}
// //                   >
// //                     <div style={{ width: 32, height: 32, borderRadius: 9, background: qa.color, display: "flex", alignItems: "center", justifyContent: "center", color: qa.stroke, flexShrink: 0 }}>{qa.icon}</div>
// //                     <div>
// //                       <div style={{ fontSize: "0.74rem", fontWeight: 600, color: T.tx, marginBottom: "0.12rem" }}>{qa.label}</div>
// //                       <div style={{ fontSize: "0.62rem", color: T.tx3 }}>{qa.sub}</div>
// //                     </div>
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </div>{/* /content */}
// //       </div>{/* /main */}

// //       {/* Pipeline Runner modal */}
// //       {selectedPipelineJob && (
// //         <PipelineRunner
// //           job={selectedPipelineJob}
// //           theme={theme}
// //           onPipelineStart={() => setPipelineStatus(p => ({ ...p, [selectedPipelineJob.id]: { status: "running" } }))}
// //           onPipelineComplete={() => {
// //             fetchAll(true).then(() => {
// //               const jC         = candidates.filter((c: any) => String(c?.job_id) === String(selectedPipelineJob.id));
// //               const shortlisted = jC.filter((c: any) => c?.status === "Shortlisted").length;
// //               addPipelineAlert(selectedPipelineJob.title, shortlisted, jC.length - shortlisted);
// //               setPipelineStatus(p => ({ ...p, [selectedPipelineJob.id]: { status: "completed" } }));
// //             });
// //           }}
// //           onClose={() => setSelectedPipelineJob(null)}
// //         />
// //       )}

// //       <PipelineResultToast toasts={resultToasts} onDismiss={dismissToast} theme={theme} />

// //       <style>{`
// //         @keyframes tfSpin      { to { transform: rotate(360deg); } }
// //         @keyframes tfDot       { 0%,100%{opacity:1} 50%{opacity:.4} }
// //         @keyframes tfFadeSlide { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default Dashboard;
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
// import {
//   RefreshCw,
//   Users,
//   Target,
//   Clock,
//   Bell,
//   CheckCircle,
//   X,
//   Download,
//   Settings,
//   Search,
//   PlayCircle,
//   CalendarDays,
//   LayoutDashboard,
//   UserCheck,
//   CalendarClock,
//   ClipboardList,
//   Trophy,
//   ScanLine,
//   BarChart3,
//   LogOut,
// } from "lucide-react";
// import {
//   ResponsiveContainer,
//   CartesianGrid,
//   Tooltip,
//   XAxis,
//   YAxis,
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   Cell,
// } from "recharts";
// import { dashboardRefreshAll } from "@/services/redux/thunk/dashboardThunk";
// import StatCard from "./subComponents/StatCard";
// import PipelineRunner from "./subComponents/PipelineRunner";
// import RecruitmentJourney from "./subComponents/RecruitmentJourney";

// // ── Theme ─────────────────────────────────────────────────────────────────────
// type Theme = "dark" | "light";

// interface TokenSet {
//   bg: string; surface: string; surface2: string;
//   sidebarBg: string; topbarBg: string;
//   border: string; borderMd: string;
//   acc: string; acc3: string; accg: string; accs: string;
//   tx: string; tx2: string; tx3: string;
//   red: string; amber: string; blue: string; purple: string;
//   btnText: string; barTrack: string; rowHover: string;
//   selectBg: string; badgeBg: string; badgeCol: string;
//   rl: number;
// }

// const TOKENS: Record<Theme, TokenSet> = {
//   dark: {
//     bg: "#040d0a", surface: "rgba(255,255,255,0.035)", surface2: "rgba(255,255,255,0.06)",
//     sidebarBg: "rgba(4,13,10,0.98)", topbarBg: "rgba(4,13,10,0.95)",
//     border: "rgba(0,214,143,0.11)", borderMd: "rgba(0,214,143,0.22)",
//     acc: "#00d68f", acc3: "#34d399", accg: "rgba(0,214,143,0.25)", accs: "rgba(0,214,143,0.10)",
//     tx: "#e2faf1", tx2: "#a7c4b8", tx3: "#5a8a75",
//     red: "#f87171", amber: "#fbbf24", blue: "#60a5fa", purple: "#a78bfa",
//     btnText: "#040d0a", barTrack: "rgba(0,214,143,0.1)", rowHover: "rgba(0,214,143,0.035)",
//     selectBg: "#0d1f18", badgeBg: "rgba(0,214,143,0.1)", badgeCol: "#00d68f", rl: 14,
//   },
//   light: {
//     bg: "#f0faf6", surface: "#ffffff", surface2: "#f4faf7",
//     sidebarBg: "#ffffff", topbarBg: "#ffffff",
//     border: "#c5e8d8", borderMd: "#9dd4bb",
//     acc: "#059669", acc3: "#34d399", accg: "rgba(5,150,105,0.2)", accs: "rgba(5,150,105,0.08)",
//     tx: "#0d2b1e", tx2: "#2d5a42", tx3: "#6b9e85",
//     red: "#dc2626", amber: "#d97706", blue: "#2563eb", purple: "#7c3aed",
//     btnText: "#ffffff", barTrack: "rgba(5,150,105,0.1)", rowHover: "#f0fdf4",
//     selectBg: "#ffffff", badgeBg: "rgba(5,150,105,0.1)", badgeCol: "#059669", rl: 14,
//   },
// };

// // ── Sidebar nav config ────────────────────────────────────────────────────────
// const NAV = [
//   {
//     section: "Recruitment",
//     items: [
//       { path: "/dashboard",         label: "Dashboard",        icon: LayoutDashboard, badge: null,  badgeType: null },
//       { path: "/candidates",        label: "Candidates",       icon: Users,           badge: null,  badgeType: null },
//       { path: "/scheduler",         label: "Scheduling",       icon: CalendarClock,   badge: null,  badgeType: null },
//     ],
//   },
//   {
//     section: "Screening",
//     items: [
//       { path: "/assessments",       label: "Assessments",      icon: ClipboardList,   badge: null,  badgeType: null },
//       { path: "/interview-results", label: "Interview Results", icon: Trophy,          badge: "2",   badgeType: "red" },
//     ],
//   },
//   {
//     section: "Tools",
//     items: [
//       { path: "/candidates",        label: "ATS Checking",     icon: ScanLine,        badge: "AI",  badgeType: "ai" },
//       { path: "/reports",           label: "Reports",          icon: BarChart3,       badge: null,  badgeType: null },
//     ],
//   },
// ];

// // ── Types ─────────────────────────────────────────────────────────────────────
// interface PipelineAlert {
//   id: number; jobTitle: string; candidateCount: number; rejected: number; time: string; read: boolean;
// }
// interface ResultToast {
//   id: number; jobTitle: string; shortlisted: number; rejected: number;
// }

// // ── Sidebar ───────────────────────────────────────────────────────────────────
// const Sidebar: React.FC<{
//   theme: Theme;
//   onToggleTheme: () => void;
//   onLogout: () => void;
// }> = ({ theme, onToggleTheme, onLogout }) => {
//   const T = TOKENS[theme];
//   const pathname = usePathname();
//   const router   = useRouter();

//   return (
//     <aside
//       style={{
//         width:          200,
//         flexShrink:     0,
//         background:     T.sidebarBg,
//         borderRight:    `1px solid ${T.border}`,
//         display:        "flex",
//         flexDirection:  "column",
//         position:       "sticky",
//         top:            0,
//         height:         "100vh",
//         overflowY:      "auto",
//         backdropFilter: "blur(20px)",
//         transition:     "background 0.35s, border-color 0.35s",
//         zIndex:         50,
//       }}
//     >
//       {/* Logo */}
//       <div
//         style={{
//           display:       "flex",
//           alignItems:    "center",
//           gap:           9,
//           padding:       "1.1rem 1.1rem 0.9rem",
//           borderBottom:  `1px solid ${T.border}`,
//           transition:    "border-color 0.35s",
//         }}
//       >
//         <div
//           style={{
//             width:          34,
//             height:         34,
//             borderRadius:   9,
//             background:     T.acc,
//             display:        "flex",
//             alignItems:     "center",
//             justifyContent: "center",
//             fontSize:       "0.9rem",
//             fontWeight:     700,
//             color:          T.btnText,
//             flexShrink:     0,
//             fontFamily:     "Georgia, serif",
//           }}
//         >
//           T
//         </div>
//         <div style={{ fontFamily: "Georgia, serif", fontSize: "0.95rem", color: T.tx, lineHeight: 1.2 }}>
//           TalentFlow <span style={{ color: T.acc }}>AI</span>
//         </div>
//       </div>

//       {/* Nav */}
//       <nav style={{ flex: 1, padding: "0.7rem 0" }}>
//         {NAV.map(group => (
//           <div key={group.section}>
//             {/* Section label */}
//             <div
//               style={{
//                 fontSize:      "0.58rem",
//                 fontWeight:    700,
//                 letterSpacing: "0.1em",
//                 textTransform: "uppercase",
//                 color:         T.tx3,
//                 padding:       "0.6rem 1.1rem 0.3rem",
//                 transition:    "color 0.35s",
//               }}
//             >
//               {group.section}
//             </div>

//             {group.items.map(item => {
//               const active = pathname === item.path || pathname.startsWith(item.path + "/");
//               const Icon   = item.icon;
//               return (
//                 <div
//                   key={item.path}
//                   onClick={() => router.push(item.path)}
//                   style={{
//                     display:      "flex",
//                     alignItems:   "center",
//                     gap:          8,
//                     padding:      "0.52rem 1.1rem",
//                     cursor:       "pointer",
//                     fontSize:     "0.76rem",
//                     fontWeight:   active ? 600 : 500,
//                     color:        active ? T.acc : T.tx2,
//                     borderLeft:   `2px solid ${active ? T.acc : "transparent"}`,
//                     background:   active
//                       ? theme === "dark" ? "rgba(0,214,143,0.08)" : "rgba(5,150,105,0.07)"
//                       : "transparent",
//                     transition:   "all 0.15s",
//                   }}
//                   onMouseEnter={e => {
//                     if (!active) {
//                       const el = e.currentTarget as HTMLDivElement;
//                       el.style.background = T.surface2;
//                       el.style.color      = T.tx;
//                     }
//                   }}
//                   onMouseLeave={e => {
//                     if (!active) {
//                       const el = e.currentTarget as HTMLDivElement;
//                       el.style.background = "transparent";
//                       el.style.color      = T.tx2;
//                     }
//                   }}
//                 >
//                   {/* Icon box */}
//                   <div
//                     style={{
//                       width:          26,
//                       height:         26,
//                       borderRadius:   7,
//                       display:        "flex",
//                       alignItems:     "center",
//                       justifyContent: "center",
//                       background:     active ? T.accs : T.surface2,
//                       flexShrink:     0,
//                       transition:     "background 0.15s",
//                     }}
//                   >
//                     <Icon size={13} color={active ? T.acc : T.tx3} strokeWidth={2} />
//                   </div>

//                   <span style={{ flex: 1 }}>{item.label}</span>

//                   {/* Badge */}
//                   {item.badge && (
//                     <span
//                       style={{
//                         fontSize:     "0.55rem",
//                         fontWeight:   700,
//                         padding:      "0.08rem 0.38rem",
//                         borderRadius: 999,
//                         background:
//                           item.badgeType === "red"
//                             ? T.red
//                             : item.badgeType === "ai"
//                             ? "rgba(167,139,250,0.2)"
//                             : T.accs,
//                         color:
//                           item.badgeType === "red"
//                             ? "#fff"
//                             : item.badgeType === "ai"
//                             ? T.purple
//                             : T.acc,
//                         border:
//                           item.badgeType === "ai"
//                             ? `1px solid rgba(167,139,250,0.3)`
//                             : "none",
//                       }}
//                     >
//                       {item.badge}
//                     </span>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         ))}
//       </nav>

//       {/* User + theme toggle */}
//       <div
//         style={{
//           padding:      "0.8rem 1rem",
//           borderTop:    `1px solid ${T.border}`,
//           display:      "flex",
//           alignItems:   "center",
//           gap:          8,
//           transition:   "border-color 0.35s",
//         }}
//       >
//         {/* Avatar */}
//         <div
//           style={{
//             width:          30,
//             height:         30,
//             borderRadius:   "50%",
//             background:     T.acc,
//             display:        "flex",
//             alignItems:     "center",
//             justifyContent: "center",
//             fontSize:       "0.7rem",
//             fontWeight:     700,
//             color:          T.btnText,
//             flexShrink:     0,
//           }}
//         >
//           HR
//         </div>

//         <div style={{ flex: 1, minWidth: 0 }}>
//           <div style={{ fontSize: "0.73rem", fontWeight: 600, color: T.tx, transition: "color 0.35s" }}>
//             HR Manager
//           </div>
//           <div style={{ fontSize: "0.58rem", color: T.tx3, transition: "color 0.35s" }}>
//             Admin · MGCV Tech
//           </div>
//         </div>

//         {/* Theme toggle pill */}
//         <div
//           onClick={onToggleTheme}
//           title="Toggle theme"
//           style={{
//             display:      "flex",
//             alignItems:   "center",
//             gap:          3,
//             background:   theme === "dark" ? "rgba(0,214,143,0.12)" : "rgba(5,150,105,0.1)",
//             border:       `1px solid ${T.borderMd}`,
//             borderRadius: 999,
//             padding:      "2px 3px",
//             cursor:       "pointer",
//             flexShrink:   0,
//           }}
//         >
//           <span style={{ fontSize: "0.6rem" }}>{theme === "dark" ? "🌙" : "☀️"}</span>
//           <div
//             style={{
//               width:        22,
//               height:       12,
//               borderRadius: 999,
//               background:   T.borderMd,
//               position:     "relative",
//             }}
//           >
//             <div
//               style={{
//                 position:     "absolute",
//                 top:          2,
//                 left:         theme === "dark" ? 2 : 12,
//                 width:        8,
//                 height:       8,
//                 borderRadius: "50%",
//                 background:   T.acc,
//                 transition:   "left 0.25s cubic-bezier(.4,0,.2,1)",
//               }}
//             />
//           </div>
//         </div>

//         {/* Logout */}
//         <div
//           onClick={onLogout}
//           title="Logout"
//           style={{
//             width:          22,
//             height:         22,
//             borderRadius:   6,
//             display:        "flex",
//             alignItems:     "center",
//             justifyContent: "center",
//             cursor:         "pointer",
//             color:          T.tx3,
//             flexShrink:     0,
//             transition:     "all 0.15s",
//           }}
//           onMouseEnter={e => {
//             const el = e.currentTarget as HTMLDivElement;
//             el.style.color      = T.red;
//             el.style.background = "rgba(248,113,113,0.1)";
//           }}
//           onMouseLeave={e => {
//             const el = e.currentTarget as HTMLDivElement;
//             el.style.color      = T.tx3;
//             el.style.background = "transparent";
//           }}
//         >
//           <LogOut size={13} />
//         </div>
//       </div>
//     </aside>
//   );
// };

// // ── Bell dropdown ─────────────────────────────────────────────────────────────
// const BellDropdown: React.FC<{
//   alerts: PipelineAlert[]; onClearAll: () => void; onClose: () => void; theme: Theme;
// }> = ({ alerts, onClearAll, onClose, theme }) => {
//   const T = TOKENS[theme];
//   return (
//     <div
//       style={{
//         position: "absolute", right: 0, top: 44, zIndex: 200,
//         width: 310, background: T.surface, border: `1px solid ${T.border}`,
//         borderRadius: 14, boxShadow: "0 16px 48px rgba(0,0,0,0.25)",
//         overflow: "hidden", animation: "tfFadeSlide 0.18s ease",
//       }}
//     >
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: `1px solid ${T.border}` }}>
//         <span style={{ fontSize: 13, fontWeight: 700, color: T.tx }}>Pipeline Alerts</span>
//         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//           {alerts.length > 0 && (
//             <button onClick={onClearAll} style={{ background: "none", border: "none", fontSize: 12, fontWeight: 600, color: T.acc, cursor: "pointer" }}>Clear all</button>
//           )}
//           <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
//             <X size={14} color={T.tx3} />
//           </button>
//         </div>
//       </div>
//       <div style={{ maxHeight: 280, overflowY: "auto" }}>
//         {alerts.length === 0 ? (
//           <div style={{ padding: "32px 16px", textAlign: "center" }}>
//             <Bell size={28} color={T.tx3} style={{ margin: "0 auto 8px", display: "block" }} />
//             <p style={{ fontSize: 13, color: T.tx3 }}>No alerts yet.</p>
//             <p style={{ fontSize: 11, color: T.tx3, marginTop: 3 }}>Run a pipeline to see results here.</p>
//           </div>
//         ) : (
//           alerts.map(alert => (
//             <div key={alert.id}
//               style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 16px", borderBottom: `1px solid ${T.border}`, transition: "background 0.12s" }}
//               onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = T.rowHover)}
//               onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = "transparent")}
//             >
//               <div style={{ width: 32, height: 32, borderRadius: "50%", background: T.accs, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//                 <CheckCircle size={16} color={T.acc} />
//               </div>
//               <div style={{ flex: 1 }}>
//                 <p style={{ fontSize: 13, fontWeight: 600, color: T.tx }}>Pipeline completed</p>
//                 <p style={{ fontSize: 11, color: T.acc, marginTop: 1 }}>{alert.jobTitle}</p>
//                 <p style={{ fontSize: 11, color: T.tx3, marginTop: 2 }}>
//                   <strong style={{ color: T.tx }}>{alert.candidateCount}</strong> candidates · <strong style={{ color: T.tx }}>{alert.rejected}</strong> not shortlisted
//                 </p>
//                 <p style={{ fontSize: 10, color: T.tx3, marginTop: 3 }}>{alert.time}</p>
//               </div>
//               {!alert.read && <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.blue, flexShrink: 0, marginTop: 6 }} />}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// // ── Result toast ──────────────────────────────────────────────────────────────
// const PipelineResultToast: React.FC<{
//   toasts: ResultToast[]; onDismiss: (id: number) => void; theme: Theme;
// }> = ({ toasts, onDismiss, theme }) => {
//   const T = TOKENS[theme];
//   if (!toasts.length) return null;
//   return (
//     <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 300, display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
//       {toasts.map(t => (
//         <div key={t.id}
//           style={{ background: T.surface, border: `1px solid ${T.acc}`, borderRadius: 12, padding: "10px 18px", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 8px 28px rgba(0,0,0,0.18)", animation: "tfFadeSlide 0.22s ease", minWidth: 280 }}
//         >
//           <CheckCircle size={18} color={T.acc} />
//           <div style={{ flex: 1 }}>
//             <p style={{ fontSize: 13, fontWeight: 600, color: T.tx }}>Pipeline done for <span style={{ color: T.acc }}>{t.jobTitle}</span></p>
//             <p style={{ fontSize: 11, color: T.tx3 }}>{t.shortlisted} shortlisted · {t.rejected} not shortlisted</p>
//           </div>
//           <button onClick={() => onDismiss(t.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
//             <X size={13} color={T.tx3} />
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// // ── Icon & text button helpers ────────────────────────────────────────────────
// const IconBtn: React.FC<{ title?: string; onClick?: () => void; theme: Theme; children: React.ReactNode }> = ({ title, onClick, theme, children }) => {
//   const T = TOKENS[theme];
//   return (
//     <button title={title} onClick={onClick}
//       style={{ width: 32, height: 32, borderRadius: 8, background: T.surface2, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative", transition: "all 0.18s" }}
//       onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = T.acc; }}
//       onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = T.border; }}
//     >
//       {children}
//     </button>
//   );
// };

// const TbBtn: React.FC<{ onClick?: () => void; theme: Theme; children: React.ReactNode }> = ({ onClick, theme, children }) => {
//   const T = TOKENS[theme];
//   return (
//     <button onClick={onClick}
//       style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit", fontSize: "0.72rem", fontWeight: 600, background: T.surface2, color: T.tx2, padding: "0.38rem 0.85rem", borderRadius: 8, border: `1px solid ${T.border}`, cursor: "pointer", transition: "all 0.18s" }}
//       onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = T.acc; el.style.color = T.acc; }}
//       onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = T.border; el.style.color = T.tx2; }}
//     >
//       {children}
//     </button>
//   );
// };

// const ChartCard: React.FC<{ title: string; tag: string; theme: Theme; children: React.ReactNode }> = ({ title, tag, theme, children }) => {
//   const T = TOKENS[theme];
//   return (
//     <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "1.2rem", backdropFilter: "blur(16px)", boxShadow: theme === "light" ? "0 1px 6px rgba(0,0,0,.06)" : "none" }}>
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
//         <span style={{ fontSize: "0.82rem", fontWeight: 700, color: T.tx }}>{title}</span>
//         <span style={{ fontSize: "0.6rem", fontWeight: 600, padding: "0.15rem 0.52rem", borderRadius: 999, background: T.badgeBg, color: T.badgeCol }}>{tag}</span>
//       </div>
//       {children}
//     </div>
//   );
// };

// // ── Main Dashboard ────────────────────────────────────────────────────────────
// const Dashboard: React.FC = () => {
//   const router   = useRouter();
//   const dispatch = useAppDispatch();
//   const { jobs, candidates, recruitmentData, loading } = useAppSelector((state: any) => state.dashboard);

//   const [theme, setTheme]                             = useState<Theme>("dark");
//   const [refreshing, setRefreshing]                   = useState(false);
//   const [selectedPipelineJob, setSelectedPipelineJob] = useState<any | null>(null);
//   const [selectedTimeRange, setSelectedTimeRange]     = useState<"week" | "month" | "quarter" | "year">("month");
//   const [lastFetchTime, setLastFetchTime]             = useState<Date | null>(null);
//   const [pipelineAlerts, setPipelineAlerts]           = useState<PipelineAlert[]>([]);
//   const [bellOpen, setBellOpen]                       = useState(false);
//   const [resultToasts, setResultToasts]               = useState<ResultToast[]>([]);
//   const [pipelineStatus, setPipelineStatus]           = useState<Record<string, any>>({});

//   const alertIdRef = useRef(0);
//   const toastIdRef = useRef(0);
//   const bellRef    = useRef<HTMLDivElement>(null);

//   const T = TOKENS[theme];

//   // Load theme
//   useEffect(() => {
//     const saved = localStorage.getItem("tf-theme") as Theme | null;
//     if (saved === "light") setTheme("light");
//   }, []);

//   const toggleTheme = () => {
//     const next = theme === "dark" ? "light" : "dark";
//     setTheme(next);
//     localStorage.setItem("tf-theme", next);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("tf_token");
//     localStorage.removeItem("authUser");
//     router.replace("/");
//   };

//   const unreadCount = pipelineAlerts.filter(a => !a.read).length;

//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (bellRef.current && !bellRef.current.contains(e.target as Node)) setBellOpen(false);
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const fetchAll = useCallback(async (force = false) => {
//     if (force) setRefreshing(true);
//     try {
//       await dispatch(dashboardRefreshAll()).unwrap();
//       setLastFetchTime(new Date());
//     } finally {
//       setRefreshing(false);
//     }
//   }, [dispatch]);

//   useEffect(() => {
//     fetchAll();
//     const id = setInterval(() => fetchAll(true), 120_000);
//     return () => clearInterval(id);
//   }, [fetchAll, selectedTimeRange]);

//   // Stats
//   const stats = useMemo(() => {
//     const total                = candidates.length;
//     const shortlisted          = candidates.filter((c: any) => c?.status === "Shortlisted").length;
//     const interviews           = candidates.filter((c: any) => c?.interview_scheduled).length;
//     const assessmentsSent      = candidates.filter((c: any) => c?.exam_link_sent).length;
//     const assessmentsCompleted = candidates.filter((c: any) => c?.exam_completed).length;
//     const assessmentsPassed    = candidates.filter((c: any) => c?.exam_percentage >= 70).length;
//     const pendingAssessments   = candidates.filter((c: any) => c?.exam_link_sent && !c?.exam_completed && !c?.link_expired).length;
//     const now                  = new Date();
//     const pendingInterviews    = candidates.filter((c: any) => c?.interview_scheduled && c?.interview_date && new Date(c.interview_date) > now).length;
//     const hires                = candidates.filter((c: any) => c?.final_status === "Hired").length;
//     const timeToHire = (() => {
//       const hired = candidates.filter((c: any) => c?.final_status === "Hired" && c?.processed_date);
//       if (!hired.length) return 0;
//       const total = hired.reduce((acc: number, c: any) =>
//         acc + Math.max(Math.floor((Date.now() - new Date(c.processed_date).getTime()) / 86_400_000), 0), 0);
//       return Math.round(total / hired.length);
//     })();
//     return {
//       totalApplications:        total,
//       activeInterviews:         interviews,
//       timeToHire,
//       activeAssessments:        pendingAssessments,
//       shortlistRate:            total > 0 ? ((shortlisted / total) * 100).toFixed(1) : 0,
//       assessmentCompletionRate: assessmentsSent > 0 ? ((assessmentsCompleted / assessmentsSent) * 100).toFixed(1) : 0,
//       assessmentPassRate:       assessmentsCompleted > 0 ? ((assessmentsPassed / assessmentsCompleted) * 100).toFixed(1) : 0,
//       totalHires:               hires,
//       pendingActions:           pendingAssessments + pendingInterviews,
//     };
//   }, [candidates]);

//   const pipelineStages = useMemo(() => [
//     { name: "Applied",     value: candidates.length,                                                       col: "#00d68f" },
//     { name: "Screened",    value: candidates.filter((c: any) => c?.ats_score > 0).length,                  col: "#00c47e" },
//     { name: "Shortlisted", value: candidates.filter((c: any) => c?.status === "Shortlisted").length,       col: "#fbbf24" },
//     { name: "Assessment",  value: candidates.filter((c: any) => c?.exam_completed).length,                 col: T.blue   },
//     { name: "Interview",   value: candidates.filter((c: any) => c?.interview_scheduled).length,            col: "#fbbf24" },
//     { name: "Hired",       value: candidates.filter((c: any) => c?.final_status === "Hired").length,       col: T.tx3    },
//   ], [candidates, T]);

//   const assessmentMetrics = useMemo(() => [
//     { name: "Sent",      value: candidates.filter((c: any) => c?.exam_link_sent).length },
//     { name: "Started",   value: candidates.filter((c: any) => c?.exam_started).length },
//     { name: "Completed", value: candidates.filter((c: any) => c?.exam_completed).length },
//     { name: "Passed",    value: candidates.filter((c: any) => c?.exam_percentage >= 70).length },
//   ], [candidates]);

//   // ── Hiring Activity chart data ─────────────────────────────────────────────
//   // Build 6-month rolling data from real candidates. If the API already returns
//   // recruitmentData with the right shape, we use that. Otherwise we derive it
//   // from candidates so the chart is never blank.
//   const chartData = useMemo(() => {
//     // If Redux already has properly shaped data (has a `month` key & values), use it
//     const hasApiData =
//       Array.isArray(recruitmentData) &&
//       recruitmentData.length > 0 &&
//       recruitmentData[0]?.month !== undefined;

//     if (hasApiData) return recruitmentData;

//     // Build last 6 calendar months from candidates
//     const months: { month: string; applications: number; interviews: number; hires: number }[] = [];
//     for (let i = 5; i >= 0; i--) {
//       const d     = new Date();
//       d.setMonth(d.getMonth() - i);
//       const label = d.toLocaleString("en-US", { month: "short" });
//       const yr    = d.getFullYear();
//       const mo    = d.getMonth();

//       const inMonth = (dateStr: string) => {
//         if (!dateStr) return false;
//         const dt = new Date(dateStr);
//         return dt.getFullYear() === yr && dt.getMonth() === mo;
//       };

//       months.push({
//         month:        label,
//         applications: candidates.filter((c: any) => inMonth(c?.processed_date || c?.created_at)).length,
//         interviews:   candidates.filter((c: any) => c?.interview_scheduled && inMonth(c?.interview_date)).length,
//         hires:        candidates.filter((c: any) => c?.final_status === "Hired" && inMonth(c?.processed_date)).length,
//       });
//     }

//     // If all counts are zero (no date fields on candidates), show illustrative
//     // non-zero data so the chart renders visibly instead of a blank card
//     const allZero = months.every(m => m.applications === 0 && m.interviews === 0 && m.hires === 0);
//     if (allZero) {
//       const seeds = [
//         { applications: 0,  interviews: 0, hires: 0 },
//         { applications: 1,  interviews: 0, hires: 0 },
//         { applications: 3,  interviews: 1, hires: 0 },
//         { applications: 4,  interviews: 2, hires: 0 },
//         { applications: 14, interviews: 5, hires: 0 },
//         { applications: candidates.length || 12, interviews: candidates.filter((c: any) => c?.interview_scheduled).length || 7, hires: candidates.filter((c: any) => c?.final_status === "Hired").length || 0 },
//       ];
//       return months.map((m, i) => ({ ...m, ...seeds[i] }));
//     }

//     return months;
//   }, [recruitmentData, candidates]);

//   const currentStep = useMemo(() => {
//     if (candidates.some((c: any) => c?.interview_scheduled)) return 4;
//     if (candidates.some((c: any) => c?.exam_link_sent))      return 3;
//     if (candidates.some((c: any) => c?.status === "Shortlisted")) return 2;
//     if (jobs.length > 0)                                     return 1;
//     return 0;
//   }, [candidates, jobs]);

//   const addPipelineAlert = useCallback((jobTitle: string, shortlisted: number, rejected: number) => {
//     const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//     const id   = ++alertIdRef.current;
//     setPipelineAlerts(prev => [{ id, jobTitle, candidateCount: shortlisted, rejected, time, read: false }, ...prev]);
//     const tid = ++toastIdRef.current;
//     setResultToasts(prev => [...prev, { id: tid, jobTitle, shortlisted, rejected }]);
//     setTimeout(() => setResultToasts(prev => prev.filter(t => t.id !== tid)), 7000);
//   }, []);

//   const dismissToast   = (id: number) => setResultToasts(prev => prev.filter(t => t.id !== id));
//   const clearAllAlerts = () => setPipelineAlerts([]);
//   const openBell       = () => { setBellOpen(o => !o); setPipelineAlerts(prev => prev.map(a => ({ ...a, read: true }))); };

//   // Loading screen
//   if (loading && !lastFetchTime) {
//     return (
//       <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
//         <div style={{ textAlign: "center" }}>
//           <div style={{ width: 44, height: 44, borderRadius: "50%", border: `3px solid ${T.border}`, borderTopColor: T.acc, margin: "0 auto 12px", animation: "tfSpin 0.8s linear infinite" }} />
//           <p style={{ fontSize: 13, color: T.tx3 }}>Loading dashboard…</p>
//         </div>
//         <style>{`@keyframes tfSpin { to { transform:rotate(360deg); } }`}</style>
//       </div>
//     );
//   }

//   // ── Render ────────────────────────────────────────────────────────────────
//   return (
//     <div
//       style={{
//         display:    "flex",
//         minHeight:  "100vh",
//         background: T.bg,
//         color:      T.tx,
//         fontFamily: "'Inter',system-ui,sans-serif",
//         transition: "background 0.35s, color 0.35s",
//         position:   "relative",
//       }}
//     >
//       {/* ════ SIDEBAR ════ */}
//       <Sidebar theme={theme} onToggleTheme={toggleTheme} onLogout={handleLogout} />

//       {/* ════ MAIN ════ */}
//       <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>

//         {/* ── TOPBAR ── */}
//         <header
//           style={{
//             height:         52,
//             display:        "flex",
//             alignItems:     "center",
//             padding:        "0 1.6rem",
//             gap:            "1rem",
//             background:     T.topbarBg,
//             borderBottom:   `1px solid ${T.border}`,
//             position:       "sticky",
//             top:            0,
//             zIndex:         100,
//             backdropFilter: "blur(20px)",
//             transition:     "background 0.35s, border-color 0.35s",
//           }}
//         >
//           {/* Breadcrumb */}
//           <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.73rem", color: T.tx3 }}>
//             <span style={{ color: T.tx2, fontWeight: 500 }}>MGCV Tech</span>
//             <span style={{ opacity: 0.4 }}>/</span>
//             <span style={{ color: T.tx }}>Recruitment</span>
//           </div>

//           {/* Search */}
//           <div style={{ display: "flex", alignItems: "center", gap: 7, background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 8, padding: "0.36rem 0.9rem", minWidth: 240 }}>
//             <Search size={13} color={T.tx3} />
//             <input type="text" placeholder="Search candidates, jobs…"
//               style={{ background: "none", border: "none", outline: "none", fontFamily: "inherit", fontSize: "0.73rem", color: T.tx, width: "100%" }}
//             />
//             <span style={{ fontSize: "0.55rem", background: T.surface, border: `1px solid ${T.border}`, borderRadius: 4, padding: "0.1rem 0.35rem", color: T.tx3 }}>⌘K</span>
//           </div>

//           <div style={{ flex: 1 }} />

//           {/* Right controls */}
//           <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
//             <select value={selectedTimeRange} onChange={e => setSelectedTimeRange(e.target.value as any)}
//               style={{ background: T.selectBg, border: `1px solid ${T.border}`, color: T.tx2, fontFamily: "inherit", fontSize: "0.73rem", padding: "0.36rem 1.6rem 0.36rem 0.75rem", borderRadius: 8, outline: "none", cursor: "pointer", appearance: "none", WebkitAppearance: "none" }}
//             >
//               <option value="week">This Week</option>
//               <option value="month">This Month</option>
//               <option value="quarter">This Quarter</option>
//               <option value="year">This Year</option>
//             </select>

//             <IconBtn title="Refresh" onClick={() => fetchAll(true)} theme={theme}>
//               <RefreshCw size={14} color={T.tx3} style={refreshing ? { animation: "tfSpin 0.8s linear infinite" } : {}} />
//             </IconBtn>

//             {/* Bell */}
//             <div style={{ position: "relative" }} ref={bellRef}>
//               <IconBtn title="Notifications" onClick={openBell} theme={theme}>
//                 <Bell size={14} color={T.tx3} />
//                 {unreadCount > 0 && (
//                   <span style={{ position: "absolute", top: -4, right: -4, minWidth: 16, height: 16, padding: "0 3px", background: T.red, color: "#fff", fontSize: "0.53rem", fontWeight: 700, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${T.bg}` }}>
//                     {unreadCount > 9 ? "9+" : unreadCount}
//                   </span>
//                 )}
//               </IconBtn>
//               {bellOpen && <BellDropdown alerts={pipelineAlerts} onClearAll={clearAllAlerts} onClose={() => setBellOpen(false)} theme={theme} />}
//             </div>

//             <TbBtn onClick={() => {}} theme={theme}><Download size={13} color={T.tx2} />Export Report</TbBtn>
//             <TbBtn onClick={() => {}} theme={theme}><Settings size={13} color={T.tx2} />Settings</TbBtn>

//             <button
//               onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
//               style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit", fontSize: "0.73rem", fontWeight: 700, background: T.acc, color: T.btnText, padding: "0.4rem 1rem", borderRadius: 8, border: "none", cursor: "pointer", boxShadow: `0 0 16px ${T.accg}`, transition: "all 0.2s", whiteSpace: "nowrap" }}
//             >
//               + New Pipeline
//             </button>
//           </div>
//         </header>

//         {/* ── CONTENT ── */}
//         <div style={{ padding: "1.6rem 1.8rem", flex: 1 }}>

//           {/* Dash header */}
//           <div style={{ marginBottom: "1.4rem" }}>
//             <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "2rem", color: T.tx, lineHeight: 1.15, marginBottom: "0.18rem" }}>
//               Recruitment <span style={{ color: T.acc }}>Dashboard</span>
//             </div>
//             <div style={{ fontSize: "0.73rem", color: T.tx3, display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
//               Welcome back, HR Manager
//               <div style={{ width: 4, height: 4, borderRadius: "50%", background: T.tx3 }} />
//               <strong style={{ color: T.acc, fontWeight: 600 }}>{jobs.length} active positions</strong>
//               <div style={{ width: 4, height: 4, borderRadius: "50%", background: T.tx3 }} />
//               <span style={{ color: T.tx2 }}>
//                 {lastFetchTime ? `Last updated ${lastFetchTime.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}` : "Loading…"}
//               </span>
//             </div>
//           </div>

//           {/* Recruitment Journey */}
//           <RecruitmentJourney currentStep={currentStep} theme={theme} onStepClick={route => router.push(route)} />

//           {/* KPI Cards */}
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.85rem", marginBottom: "1.4rem" }}>
//             <StatCard title="Total Applications" value={stats.totalApplications} change={12.5} changeType="up" icon={Users} iconBg="rgba(96,165,250,0.12)" iconColor={T.blue} subtitle="All time applications" loading={loading} theme={theme} />
//             <StatCard title="Shortlist Rate" value={`${stats.shortlistRate}%`} change={5.2} changeType="up" icon={Target} iconBg={T.accs} iconColor={T.acc} subtitle="Candidates shortlisted" loading={loading} theme={theme} />
//             <StatCard title="Time-to-Hire" value={`${stats.timeToHire}d`} change={-8.3} changeType="down" icon={Clock} iconBg="rgba(251,191,36,0.10)" iconColor={T.amber} subtitle="Average days to hire" loading={loading} theme={theme} />
//             <StatCard title="Pending Actions" value={stats.pendingActions} changeLabel="✓ All clear" changeType="na" icon={Bell} iconBg="rgba(167,139,250,0.10)" iconColor={T.purple} subtitle="Requires attention" loading={loading} theme={theme} />
//           </div>

//           {/* Charts */}
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem", marginBottom: "1.4rem" }}>
//             <ChartCard title="Recruitment Pipeline" tag="Candidate counts by stage" theme={theme}>
//               <ResponsiveContainer width="100%" height={200}>
//                 <BarChart data={pipelineStages} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
//                   <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "rgba(0,214,143,.055)" : "rgba(5,150,105,.06)"} />
//                   <XAxis dataKey="name" tick={{ fontSize: 11, fill: T.tx3 }} axisLine={false} tickLine={false} />
//                   <YAxis tick={{ fontSize: 11, fill: T.tx3 }} axisLine={false} tickLine={false} />
//                   <Tooltip contentStyle={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 12, color: T.tx }} formatter={(val: number) => [`${val} candidates`, ""]} />
//                   <Bar dataKey="value" radius={[8, 8, 0, 0]}>
//                     {pipelineStages.map((s, i) => <Cell key={i} fill={s.col} />)}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             </ChartCard>

//             <ChartCard title="Hiring Activity" tag="6-month trend" theme={theme}>
//               <ResponsiveContainer width="100%" height={200}>
//                 <LineChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
//                   <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "rgba(0,214,143,.055)" : "rgba(5,150,105,.06)"} />
//                   <XAxis dataKey="month" tick={{ fontSize: 10, fill: T.tx3 }} axisLine={false} tickLine={false} />
//                   <YAxis tick={{ fontSize: 10, fill: T.tx3 }} axisLine={false} tickLine={false} />
//                   <Tooltip contentStyle={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 12, color: T.tx }} />
//                   <Line type="monotone" dataKey="applications" stroke={T.acc}   strokeWidth={2.5} dot={{ fill: T.acc,   r: 4 }} activeDot={{ r: 6 }} />
//                   <Line type="monotone" dataKey="interviews"   stroke={T.blue}  strokeWidth={2.5} dot={{ fill: T.blue,  r: 4 }} activeDot={{ r: 6 }} />
//                   <Line type="monotone" dataKey="hires"        stroke={T.amber} strokeWidth={2}   dot={{ fill: T.amber, r: 4 }} strokeDasharray="5 4" />
//                 </LineChart>
//               </ResponsiveContainer>
//               <div style={{ display: "flex", alignItems: "center", gap: "1.1rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
//                 {[{ color: T.acc, label: "Applications" }, { color: T.blue, label: "Interviews" }, { color: T.amber, label: "Hires" }].map(l => (
//                   <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.65rem", color: T.tx2 }}>
//                     <div style={{ width: 8, height: 8, borderRadius: "50%", background: l.color }} />
//                     {l.label}
//                   </div>
//                 ))}
//               </div>
//             </ChartCard>
//           </div>

//           {/* Pipeline stage cells */}
//           <div style={{ marginBottom: "1.4rem" }}>
//             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
//               <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
//                 <span style={{ fontSize: "0.85rem", fontWeight: 700, color: T.tx }}>Pipeline Stages</span>
//                 <span style={{ fontSize: "0.6rem", fontWeight: 600, padding: "0.15rem 0.52rem", borderRadius: 999, background: T.badgeBg, color: T.badgeCol }}>Live counts</span>
//               </div>
//               <span style={{ fontSize: "0.66rem", color: T.tx3 }}>Click stage to filter candidates →</span>
//             </div>
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: "0.65rem" }}>
//               {pipelineStages.map((stage, idx) => {
//                 const max = pipelineStages[0]?.value || 1;
//                 const pct = max > 0 ? Math.round((stage.value / max) * 100) : 0;
//                 return (
//                   <div key={idx}
//                     style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "0.9rem 1rem", cursor: "pointer", transition: "all 0.18s" }}
//                     onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = stage.col; el.style.background = T.accs; }}
//                     onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = T.border; el.style.background = T.surface; }}
//                   >
//                     <div style={{ fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: T.tx3, marginBottom: "0.4rem" }}>{stage.name}</div>
//                     <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "1.9rem", color: T.tx, lineHeight: 1, marginBottom: "0.5rem" }}>{stage.value}</div>
//                     <div style={{ height: 3, borderRadius: 2, background: T.barTrack, overflow: "hidden", marginBottom: "0.3rem" }}>
//                       <div style={{ height: "100%", width: `${pct}%`, borderRadius: 2, background: stage.col, transition: "width 0.9s ease" }} />
//                     </div>
//                     <div style={{ fontSize: "0.58rem", color: T.tx3 }}>{pct}% of total</div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Active jobs table */}
//           <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden", marginBottom: "1.4rem" }}>
//             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.85rem 1.2rem", borderBottom: `1px solid ${T.border}`, flexWrap: "wrap", gap: "0.5rem" }}>
//               <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
//                 <span style={{ fontSize: "0.85rem", fontWeight: 700, color: T.tx }}>Active Job Positions</span>
//                 <span style={{ fontSize: "0.6rem", fontWeight: 600, padding: "0.15rem 0.52rem", borderRadius: 999, background: T.badgeBg, color: T.badgeCol }}>{jobs.length} active</span>
//                 <span style={{ fontSize: "0.58rem", fontWeight: 700, padding: "0.15rem 0.52rem", borderRadius: 999, background: T.accs, color: T.acc, border: `1px solid ${T.border}` }}>+ AI Pipeline</span>
//               </div>
//               <button onClick={() => router.push("/candidates")} style={{ background: "none", border: "none", fontSize: "0.73rem", fontWeight: 600, color: T.acc, cursor: "pointer", fontFamily: "inherit" }}>
//                 View All Candidates →
//               </button>
//             </div>
//             <div style={{ overflowX: "auto" }}>
//               <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                 <thead>
//                   <tr style={{ background: theme === "dark" ? "rgba(0,214,143,.025)" : T.surface2 }}>
//                     {["Position", "Department", "Location", "Apps", "Shortlisted", "In Progress", "Days Open", "Status", "Actions"].map(h => (
//                       <th key={h} style={{ padding: "0.56rem 1rem", textAlign: "left", fontSize: "0.57rem", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: T.tx3, borderBottom: `1px solid ${T.border}`, whiteSpace: "nowrap" }}>{h}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {jobs.map((job: any) => {
//                     const jC         = candidates.filter((c: any) => String(c?.job_id) === String(job.id));
//                     const shortlisted = jC.filter((c: any) => c?.status === "Shortlisted").length;
//                     const inProgress  = jC.filter((c: any) => c?.interview_scheduled).length;
//                     const daysOpen    = job.created_at ? Math.floor((Date.now() - new Date(job.created_at).getTime()) / 86_400_000) : "—";
//                     const deptColors: Record<string, { bg: string; col: string }> = {
//                       "AI/ML":       { bg: "rgba(0,214,143,0.12)",   col: T.acc    },
//                       "Engineering": { bg: "rgba(167,139,250,0.12)", col: T.purple },
//                       "Health Care": { bg: "rgba(96,165,250,0.12)",  col: T.blue   },
//                       "Design":      { bg: "rgba(251,191,36,0.12)",  col: T.amber  },
//                       "Product":     { bg: "rgba(251,191,36,0.12)",  col: T.amber  },
//                     };
//                     const dc       = deptColors[job.department] ?? { bg: T.surface2, col: T.tx2 };
//                     const initials = (job.title || "JO").split(" ").slice(0, 2).map((w: string) => w[0]).join("").toUpperCase();
//                     return (
//                       <tr key={job.id}
//                         onMouseEnter={e => ((e.currentTarget as HTMLTableRowElement).style.background = T.rowHover)}
//                         onMouseLeave={e => ((e.currentTarget as HTMLTableRowElement).style.background = "transparent")}
//                       >
//                         <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}` }}>
//                           <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
//                             <div style={{ width: 30, height: 30, borderRadius: 8, background: dc.bg, color: dc.col, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700, flexShrink: 0 }}>{initials}</div>
//                             <div>
//                               <div style={{ fontSize: "0.78rem", fontWeight: 600, color: T.tx }}>{job.title}</div>
//                               <div style={{ fontSize: "0.6rem", color: T.tx3 }}>JOB-{job.id}</div>
//                             </div>
//                           </div>
//                         </td>
//                         <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}` }}>
//                           <span style={{ fontSize: "0.62rem", fontWeight: 600, padding: "0.18rem 0.58rem", borderRadius: 999, background: dc.bg, color: dc.col }}>{job.department}</span>
//                         </td>
//                         <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}`, fontSize: "0.73rem", color: T.tx2 }}>📍 {job.location || "—"}</td>
//                         <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}`, fontSize: "0.78rem", fontWeight: 600, color: T.tx }}>{jC.length}</td>
//                         <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}`, fontSize: "0.78rem", fontWeight: 600, color: T.blue, cursor: "pointer" }} onClick={() => router.push("/candidates")}>{shortlisted}</td>
//                         <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}`, fontSize: "0.78rem", fontWeight: 600, color: T.tx }}>{inProgress}</td>
//                         <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}` }}>
//                           <span style={{ fontSize: "0.62rem", color: T.tx3, background: T.surface2, border: `1px solid ${T.border}`, padding: "0.14rem 0.48rem", borderRadius: 5 }}>
//                             {typeof daysOpen === "number" ? `${daysOpen}d ago` : "—"}
//                           </span>
//                         </td>
//                         <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}` }}>
//                           <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: "0.64rem", fontWeight: 600, background: T.badgeBg, color: T.badgeCol, padding: "0.2rem 0.62rem", borderRadius: 999 }}>
//                             <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.acc, animation: "tfDot 2s infinite" }} />
//                             Active
//                           </span>
//                         </td>
//                         <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}` }}>
//                           <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
//                             <button onClick={() => router.push("/candidates")}
//                               style={{ fontSize: "0.68rem", fontWeight: 600, background: "transparent", border: `1px solid ${T.border}`, color: T.tx2, padding: "0.24rem 0.65rem", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", transition: "all 0.18s" }}
//                               onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = T.blue; el.style.color = T.blue; }}
//                               onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = T.border; el.style.color = T.tx2; }}
//                             >View</button>
//                             <button onClick={() => setSelectedPipelineJob(job)}
//                               style={{ fontSize: "0.68rem", fontWeight: 700, background: T.acc, border: "none", color: T.btnText, padding: "0.24rem 0.8rem", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", transition: "all 0.18s", boxShadow: `0 0 10px ${T.accg}` }}
//                               onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = T.acc3)}
//                               onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = T.acc)}
//                             >Run Pipeline</button>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Bottom row */}
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem", marginBottom: "1.4rem" }}>
//             {/* Assessment Metrics */}
//             <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden" }}>
//               <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.85rem 1.2rem", borderBottom: `1px solid ${T.border}` }}>
//                 <span style={{ fontSize: "0.82rem", fontWeight: 700, color: T.tx }}>Assessment Metrics</span>
//                 <button style={{ background: "none", border: "none", fontSize: "0.68rem", fontWeight: 600, color: T.acc, cursor: "pointer", fontFamily: "inherit" }}>View details →</button>
//               </div>
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", padding: "0.9rem 1.2rem" }}>
//                 {[{ val: `${stats.assessmentCompletionRate}%`, lbl: "Completion Rate", color: T.acc }, { val: `${stats.assessmentPassRate}%`, lbl: "Pass Rate", color: T.blue }].map(box => (
//                   <div key={box.lbl} style={{ background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 11, padding: "0.9rem 1rem", textAlign: "center" }}>
//                     <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "1.9rem", color: box.color, lineHeight: 1, marginBottom: "0.2rem" }}>{box.val}</div>
//                     <div style={{ fontSize: "0.62rem", color: T.tx3 }}>{box.lbl}</div>
//                   </div>
//                 ))}
//               </div>
//               <div style={{ padding: "0.2rem 1.2rem 0.9rem" }}>
//                 {assessmentMetrics.map((m, idx) => {
//                   const max  = assessmentMetrics[0]?.value || 1;
//                   const pct  = max > 0 ? Math.round((m.value / max) * 100) : 0;
//                   const cols = [T.acc, T.blue, T.purple, T.red];
//                   return (
//                     <div key={m.name} style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.52rem" }}>
//                       <div style={{ fontSize: "0.68rem", color: T.tx2, width: 70, flexShrink: 0 }}>{m.name}</div>
//                       <div style={{ flex: 1, height: 5, borderRadius: 3, background: T.barTrack, overflow: "hidden" }}>
//                         <div style={{ height: "100%", width: `${pct}%`, borderRadius: 3, background: cols[idx], transition: "width 0.9s ease" }} />
//                       </div>
//                       <div style={{ fontSize: "0.68rem", fontWeight: 600, color: T.tx, width: 20, textAlign: "right" }}>{m.value}</div>
//                     </div>
//                   );
//                 })}
//               </div>
//               <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "0.6rem 1.2rem", borderTop: `1px solid ${T.border}`, fontSize: "0.67rem", color: T.tx3 }}>
//                 <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.acc, flexShrink: 0 }} />
//                 {`${stats.assessmentCompletionRate}% completion · ${stats.assessmentPassRate}% pass rate`}
//               </div>
//             </div>

//             {/* Quick Actions */}
//             <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden" }}>
//               <div style={{ padding: "0.85rem 1.2rem", borderBottom: `1px solid ${T.border}`, fontSize: "0.82rem", fontWeight: 700, color: T.tx }}>Quick Actions</div>
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem", padding: "0.9rem 1.1rem" }}>
//                 {[
//                   { label: "New Pipeline",        sub: "Start recruitment flow",                        icon: <PlayCircle size={15} />,   color: T.accs,                    stroke: T.acc,    onClick: () => jobs.length > 0 && setSelectedPipelineJob(jobs[0]) },
//                   { label: "Manage Assessments",  sub: `${stats.activeAssessments} pending reviews`,   icon: <Target size={15} />,       color: "rgba(167,139,250,0.12)",  stroke: T.purple, onClick: () => router.push("/assessments") },
//                   { label: "Schedule Interviews", sub: `${stats.activeInterviews} interviews scheduled`,icon: <CalendarDays size={15} />, color: "rgba(96,165,250,0.12)",   stroke: T.blue,   onClick: () => router.push("/scheduler") },
//                   { label: "View All Candidates", sub: `${candidates.length} total candidates`,         icon: <Users size={15} />,        color: "rgba(251,191,36,0.12)",   stroke: T.amber,  onClick: () => router.push("/candidates") },
//                 ].map(qa => (
//                   <button key={qa.label} onClick={qa.onClick}
//                     style={{ background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 11, padding: "0.85rem 0.95rem", cursor: "pointer", transition: "all 0.2s", textAlign: "left", fontFamily: "inherit", width: "100%", display: "flex", alignItems: "flex-start", gap: "0.65rem" }}
//                     onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = T.acc; el.style.background = T.accs; el.style.transform = "translateY(-1px)"; }}
//                     onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = T.border; el.style.background = T.surface2; el.style.transform = "translateY(0)"; }}
//                   >
//                     <div style={{ width: 32, height: 32, borderRadius: 9, background: qa.color, display: "flex", alignItems: "center", justifyContent: "center", color: qa.stroke, flexShrink: 0 }}>{qa.icon}</div>
//                     <div>
//                       <div style={{ fontSize: "0.74rem", fontWeight: 600, color: T.tx, marginBottom: "0.12rem" }}>{qa.label}</div>
//                       <div style={{ fontSize: "0.62rem", color: T.tx3 }}>{qa.sub}</div>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>{/* /content */}
//       </div>{/* /main */}

//       {/* Pipeline Runner modal */}
//       {selectedPipelineJob && (
//         <PipelineRunner
//           job={selectedPipelineJob}
//           theme={theme}
//           onPipelineStart={() => setPipelineStatus(p => ({ ...p, [selectedPipelineJob.id]: { status: "running" } }))}
//           onPipelineComplete={() => {
//             fetchAll(true).then(() => {
//               const jC         = candidates.filter((c: any) => String(c?.job_id) === String(selectedPipelineJob.id));
//               const shortlisted = jC.filter((c: any) => c?.status === "Shortlisted").length;
//               addPipelineAlert(selectedPipelineJob.title, shortlisted, jC.length - shortlisted);
//               setPipelineStatus(p => ({ ...p, [selectedPipelineJob.id]: { status: "completed" } }));
//             });
//           }}
//           onClose={() => setSelectedPipelineJob(null)}
//         />
//       )}

//       <PipelineResultToast toasts={resultToasts} onDismiss={dismissToast} theme={theme} />

//       <style>{`
//         @keyframes tfSpin      { to { transform: rotate(360deg); } }
//         @keyframes tfDot       { 0%,100%{opacity:1} 50%{opacity:.4} }
//         @keyframes tfFadeSlide { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
//       `}</style>
//     </div>
//   );
// };

// export default Dashboard;
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import {
  RefreshCw, Users, Target, Clock, Bell, CheckCircle, X,
  Download, Settings, Search, PlayCircle, CalendarDays,
  LayoutDashboard, CalendarClock, ClipboardList, Trophy,
  ScanLine, BarChart3, LogOut,
} from "lucide-react";
import {
  ResponsiveContainer, CartesianGrid, Tooltip,
  XAxis, YAxis, BarChart, Bar, LineChart, Line, Cell,
} from "recharts";
import { dashboardRefreshAll } from "@/services/redux/thunk/dashboardThunk";
import StatCard        from "./subComponents/StatCard";
import PipelineRunner, { PipelineCompleteData } from "./subComponents/PipelineRunner";
import RecruitmentJourney from "./subComponents/RecruitmentJourney";

type Theme = "dark" | "light";

interface TokenSet {
  bg: string; surface: string; surface2: string;
  sidebarBg: string; topbarBg: string;
  border: string; borderMd: string;
  acc: string; acc3: string; accg: string; accs: string;
  tx: string; tx2: string; tx3: string;
  red: string; amber: string; blue: string; purple: string;
  btnText: string; barTrack: string; rowHover: string;
  selectBg: string; badgeBg: string; badgeCol: string;
  rl: number;
}

const TOKENS: Record<Theme, TokenSet> = {
  dark: {
    bg: "#040d0a", surface: "rgba(255,255,255,0.035)", surface2: "rgba(255,255,255,0.06)",
    sidebarBg: "rgba(4,13,10,0.98)", topbarBg: "rgba(4,13,10,0.95)",
    border: "rgba(0,214,143,0.11)", borderMd: "rgba(0,214,143,0.22)",
    acc: "#00d68f", acc3: "#34d399", accg: "rgba(0,214,143,0.25)", accs: "rgba(0,214,143,0.10)",
    tx: "#e2faf1", tx2: "#a7c4b8", tx3: "#5a8a75",
    red: "#f87171", amber: "#fbbf24", blue: "#60a5fa", purple: "#a78bfa",
    btnText: "#040d0a", barTrack: "rgba(0,214,143,0.1)", rowHover: "rgba(0,214,143,0.035)",
    selectBg: "#0d1f18", badgeBg: "rgba(0,214,143,0.1)", badgeCol: "#00d68f", rl: 14,
  },
  light: {
    bg: "#f0faf6", surface: "#ffffff", surface2: "#f4faf7",
    sidebarBg: "#ffffff", topbarBg: "#ffffff",
    border: "#c5e8d8", borderMd: "#9dd4bb",
    acc: "#059669", acc3: "#34d399", accg: "rgba(5,150,105,0.2)", accs: "rgba(5,150,105,0.08)",
    tx: "#0d2b1e", tx2: "#2d5a42", tx3: "#6b9e85",
    red: "#dc2626", amber: "#d97706", blue: "#2563eb", purple: "#7c3aed",
    btnText: "#ffffff", barTrack: "rgba(5,150,105,0.1)", rowHover: "#f0fdf4",
    selectBg: "#ffffff", badgeBg: "rgba(5,150,105,0.1)", badgeCol: "#059669", rl: 14,
  },
};

const NAV = [
  {
    section: "Recruitment",
    items: [
      { path: "/dashboard",         label: "Dashboard",        icon: LayoutDashboard, badge: null, badgeType: null },
      { path: "/candidates",        label: "Candidates",       icon: Users,           badge: null, badgeType: null },
      { path: "/scheduler",         label: "Scheduling",       icon: CalendarClock,   badge: null, badgeType: null },
    ],
  },
  {
    section: "Screening",
    items: [
      { path: "/assessments",       label: "Assessments",      icon: ClipboardList,   badge: null, badgeType: null },
      { path: "/interview-results", label: "Interview Results", icon: Trophy,          badge: "2",  badgeType: "red" },
    ],
  },
  {
    section: "Tools",
    items: [
      { path: "/candidates",        label: "ATS Checking",     icon: ScanLine,        badge: "AI", badgeType: "ai" },
      { path: "/reports",           label: "Reports",          icon: BarChart3,       badge: null, badgeType: null },
    ],
  },
];

// ── Pipeline alert — now carries full breakdown ───────────────────────────────
interface PipelineAlert {
  id:          number;
  jobTitle:    string;
  shortlisted: number;
  rejected:    number;
  total:       number;
  time:        string;
  read:        boolean;
}

interface ResultToast {
  id:          number;
  jobTitle:    string;
  shortlisted: number;
  rejected:    number;
  total:       number;
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
const Sidebar: React.FC<{ theme: Theme; onToggleTheme: () => void; onLogout: () => void }> = ({
  theme, onToggleTheme, onLogout,
}) => {
  const T        = TOKENS[theme];
  const pathname = usePathname();
  const router   = useRouter();

  return (
    <aside style={{ width: 200, flexShrink: 0, background: T.sidebarBg, borderRight: `1px solid ${T.border}`, display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", overflowY: "auto", backdropFilter: "blur(20px)", transition: "background 0.35s, border-color 0.35s", zIndex: 50 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "1.1rem 1.1rem 0.9rem", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: T.acc, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", fontWeight: 700, color: T.btnText, flexShrink: 0, fontFamily: "Georgia, serif" }}>T</div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "0.95rem", color: T.tx, lineHeight: 1.2 }}>TalentFlow <span style={{ color: T.acc }}>AI</span></div>
      </div>

      <nav style={{ flex: 1, padding: "0.7rem 0" }}>
        {NAV.map(group => (
          <div key={group.section}>
            <div style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.tx3, padding: "0.6rem 1.1rem 0.3rem" }}>{group.section}</div>
            {group.items.map(item => {
              const active = pathname === item.path || pathname.startsWith(item.path + "/");
              const Icon   = item.icon;
              return (
                <div key={item.path} onClick={() => router.push(item.path)}
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "0.52rem 1.1rem", cursor: "pointer", fontSize: "0.76rem", fontWeight: active ? 600 : 500, color: active ? T.acc : T.tx2, borderLeft: `2px solid ${active ? T.acc : "transparent"}`, background: active ? (theme === "dark" ? "rgba(0,214,143,0.08)" : "rgba(5,150,105,0.07)") : "transparent", transition: "all 0.15s" }}
                  onMouseEnter={e => { if (!active) { const el = e.currentTarget as HTMLDivElement; el.style.background = T.surface2; el.style.color = T.tx; } }}
                  onMouseLeave={e => { if (!active) { const el = e.currentTarget as HTMLDivElement; el.style.background = "transparent"; el.style.color = T.tx2; } }}
                >
                  <div style={{ width: 26, height: 26, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", background: active ? T.accs : T.surface2, flexShrink: 0 }}>
                    <Icon size={13} color={active ? T.acc : T.tx3} strokeWidth={2} />
                  </div>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.badge && (
                    <span style={{ fontSize: "0.55rem", fontWeight: 700, padding: "0.08rem 0.38rem", borderRadius: 999, background: item.badgeType === "red" ? T.red : item.badgeType === "ai" ? "rgba(167,139,250,0.2)" : T.accs, color: item.badgeType === "red" ? "#fff" : item.badgeType === "ai" ? T.purple : T.acc, border: item.badgeType === "ai" ? "1px solid rgba(167,139,250,0.3)" : "none" }}>{item.badge}</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </nav>

      <div style={{ padding: "0.8rem 1rem", borderTop: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: T.acc, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, color: T.btnText, flexShrink: 0 }}>HR</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "0.73rem", fontWeight: 600, color: T.tx }}>HR Manager</div>
          <div style={{ fontSize: "0.58rem", color: T.tx3 }}>Admin · MGCV Tech</div>
        </div>
        <div onClick={onToggleTheme} title="Toggle theme" style={{ display: "flex", alignItems: "center", gap: 3, background: theme === "dark" ? "rgba(0,214,143,0.12)" : "rgba(5,150,105,0.1)", border: `1px solid ${T.borderMd}`, borderRadius: 999, padding: "2px 3px", cursor: "pointer", flexShrink: 0 }}>
          <span style={{ fontSize: "0.6rem" }}>{theme === "dark" ? "🌙" : "☀️"}</span>
          <div style={{ width: 22, height: 12, borderRadius: 999, background: T.borderMd, position: "relative" }}>
            <div style={{ position: "absolute", top: 2, left: theme === "dark" ? 2 : 12, width: 8, height: 8, borderRadius: "50%", background: T.acc, transition: "left 0.25s cubic-bezier(.4,0,.2,1)" }} />
          </div>
        </div>
        <div onClick={onLogout} title="Logout" style={{ width: 22, height: 22, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: T.tx3, flexShrink: 0, transition: "all 0.15s" }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.color = T.red; el.style.background = "rgba(248,113,113,0.1)"; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.color = T.tx3; el.style.background = "transparent"; }}
        >
          <LogOut size={13} />
        </div>
      </div>
    </aside>
  );
};

// ── Bell dropdown — rich pipeline result cards ────────────────────────────────
const BellDropdown: React.FC<{
  alerts: PipelineAlert[]; onClearAll: () => void; onClose: () => void; theme: Theme;
}> = ({ alerts, onClearAll, onClose, theme }) => {
  const T = TOKENS[theme];
  return (
    <div style={{ position: "absolute", right: 0, top: 44, zIndex: 200, width: 340, background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, boxShadow: "0 20px 56px rgba(0,0,0,0.3)", overflow: "hidden", animation: "tfFadeSlide 0.18s ease" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: T.tx }}>Pipeline Alerts</span>
          {alerts.length > 0 && (
            <span style={{ fontSize: "0.58rem", fontWeight: 700, padding: "0.1rem 0.42rem", borderRadius: 999, background: T.acc, color: T.btnText }}>{alerts.length}</span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {alerts.length > 0 && (
            <button onClick={onClearAll} style={{ background: "none", border: "none", fontSize: 12, fontWeight: 600, color: T.acc, cursor: "pointer", fontFamily: "inherit" }}>Clear all</button>
          )}
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", color: T.tx3, fontFamily: "inherit" }}>
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Alert list */}
      <div style={{ maxHeight: 360, overflowY: "auto" }}>
        {alerts.length === 0 ? (
          <div style={{ padding: "36px 16px", textAlign: "center" }}>
            <Bell size={30} color={T.tx3} style={{ margin: "0 auto 10px", display: "block" }} />
            <p style={{ fontSize: 13, fontWeight: 600, color: T.tx3 }}>No pipeline alerts yet</p>
            <p style={{ fontSize: 11, color: T.tx3, marginTop: 4, lineHeight: 1.5 }}>
              Run a pipeline on any job position.<br />Results will appear here when complete.
            </p>
          </div>
        ) : (
          alerts.map(alert => {
            const passRate = alert.total > 0 ? Math.round((alert.shortlisted / alert.total) * 100) : 0;
            return (
              <div key={alert.id} style={{ padding: "14px 16px", borderBottom: `1px solid ${T.border}`, transition: "background 0.12s" }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = T.rowHover)}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = "transparent")}
              >
                {/* Alert header row */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: T.accs, border: `1px solid ${T.borderMd}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <CheckCircle size={16} color={T.acc} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: T.tx, margin: 0 }}>Pipeline Complete</p>
                    <p style={{ fontSize: 12, color: T.acc, marginTop: 2, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {alert.jobTitle}
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                    {!alert.read && <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.blue }} />}
                    <span style={{ fontSize: 10, color: T.tx3 }}>{alert.time}</span>
                  </div>
                </div>

                {/* Stats row — 3 chips */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
                  {[
                    { val: alert.total,       lbl: "Processed", bg: T.surface2,                    col: T.tx     },
                    { val: alert.shortlisted, lbl: "Shortlisted", bg: "rgba(0,214,143,0.10)",       col: T.acc    },
                    { val: alert.rejected,    lbl: "Rejected",    bg: "rgba(248,113,113,0.10)",      col: T.red    },
                  ].map(s => (
                    <div key={s.lbl} style={{ background: s.bg, borderRadius: 8, padding: "6px 8px", textAlign: "center" }}>
                      <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "1.1rem", color: s.col, lineHeight: 1 }}>{s.val}</div>
                      <div style={{ fontSize: "0.58rem", color: T.tx3, marginTop: 2, fontWeight: 600, letterSpacing: "0.04em" }}>{s.lbl}</div>
                    </div>
                  ))}
                </div>

                {/* Pass rate bar */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ flex: 1, height: 4, borderRadius: 2, background: T.barTrack, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${passRate}%`, borderRadius: 2, background: `linear-gradient(90deg, ${T.acc}, ${T.acc3})`, transition: "width 0.9s ease" }} />
                  </div>
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, color: T.acc, whiteSpace: "nowrap" }}>{passRate}% shortlist rate</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

// ── Rich result toast ─────────────────────────────────────────────────────────
const PipelineResultToast: React.FC<{
  toasts: ResultToast[]; onDismiss: (id: number) => void; theme: Theme;
}> = ({ toasts, onDismiss, theme }) => {
  const T = TOKENS[theme];
  if (!toasts.length) return null;
  return (
    <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 300, display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
      {toasts.map(t => {
        const passRate = t.total > 0 ? Math.round((t.shortlisted / t.total) * 100) : 0;
        return (
          <div key={t.id}
            style={{ background: T.surface, border: `1px solid ${T.acc}`, borderRadius: 14, padding: "14px 16px", width: 320, boxShadow: `0 12px 36px rgba(0,0,0,0.22), 0 0 0 1px ${T.accs}`, animation: "tfSlideInRight 0.25s cubic-bezier(.34,1.3,.64,1) forwards" }}
          >
            {/* Toast header */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: T.accs, border: `1px solid ${T.borderMd}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <CheckCircle size={16} color={T.acc} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: T.tx, margin: 0 }}>Pipeline Complete! 🎉</p>
                <p style={{ fontSize: 11, color: T.acc, marginTop: 2, fontWeight: 600 }}>{t.jobTitle}</p>
              </div>
              <button onClick={() => onDismiss(t.id)} style={{ background: "none", border: "none", cursor: "pointer", color: T.tx3, display: "flex", flexShrink: 0 }}>
                <X size={13} />
              </button>
            </div>

            {/* Breakdown chips */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
              {[
                { val: t.total,       lbl: "Processed",   bg: T.surface2,               col: T.tx  },
                { val: t.shortlisted, lbl: "Shortlisted", bg: "rgba(0,214,143,0.10)",    col: T.acc },
                { val: t.rejected,    lbl: "Rejected",    bg: "rgba(248,113,113,0.10)",  col: T.red },
              ].map(s => (
                <div key={s.lbl} style={{ background: s.bg, borderRadius: 8, padding: "6px 8px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "1.15rem", color: s.col, lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: "0.58rem", color: T.tx3, marginTop: 2, fontWeight: 600 }}>{s.lbl}</div>
                </div>
              ))}
            </div>

            {/* Rate bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ flex: 1, height: 4, borderRadius: 2, background: T.barTrack, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${passRate}%`, borderRadius: 2, background: `linear-gradient(90deg,${T.acc},${T.acc3})` }} />
              </div>
              <span style={{ fontSize: "0.68rem", fontWeight: 700, color: T.acc }}>{passRate}% rate</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ── Helper button components ──────────────────────────────────────────────────
const IconBtn: React.FC<{ title?: string; onClick?: () => void; theme: Theme; children: React.ReactNode }> = ({ title, onClick, theme, children }) => {
  const T = TOKENS[theme];
  return (
    <button title={title} onClick={onClick}
      style={{ width: 32, height: 32, borderRadius: 8, background: T.surface2, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative", transition: "all 0.18s" }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = T.acc; }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = T.border; }}
    >
      {children}
    </button>
  );
};

const TbBtn: React.FC<{ onClick?: () => void; theme: Theme; children: React.ReactNode }> = ({ onClick, theme, children }) => {
  const T = TOKENS[theme];
  return (
    <button onClick={onClick}
      style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit", fontSize: "0.72rem", fontWeight: 600, background: T.surface2, color: T.tx2, padding: "0.38rem 0.85rem", borderRadius: 8, border: `1px solid ${T.border}`, cursor: "pointer", transition: "all 0.18s" }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = T.acc; el.style.color = T.acc; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = T.border; el.style.color = T.tx2; }}
    >
      {children}
    </button>
  );
};

const ChartCard: React.FC<{ title: string; tag: string; theme: Theme; children: React.ReactNode }> = ({ title, tag, theme, children }) => {
  const T = TOKENS[theme];
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "1.2rem", backdropFilter: "blur(16px)", boxShadow: theme === "light" ? "0 1px 6px rgba(0,0,0,.06)" : "none" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <span style={{ fontSize: "0.82rem", fontWeight: 700, color: T.tx }}>{title}</span>
        <span style={{ fontSize: "0.6rem", fontWeight: 600, padding: "0.15rem 0.52rem", borderRadius: 999, background: T.badgeBg, color: T.badgeCol }}>{tag}</span>
      </div>
      {children}
    </div>
  );
};

// ── Main Dashboard ────────────────────────────────────────────────────────────
const Dashboard: React.FC = () => {
  const router   = useRouter();
  const dispatch = useAppDispatch();
  const { jobs, candidates, recruitmentData, loading } = useAppSelector((state: any) => state.dashboard);

  const [theme, setTheme]                             = useState<Theme>("dark");
  const [refreshing, setRefreshing]                   = useState(false);
  const [selectedPipelineJob, setSelectedPipelineJob] = useState<any | null>(null);
  const [selectedTimeRange, setSelectedTimeRange]     = useState<"week" | "month" | "quarter" | "year">("month");
  const [lastFetchTime, setLastFetchTime]             = useState<Date | null>(null);
  const [pipelineAlerts, setPipelineAlerts]           = useState<PipelineAlert[]>([]);
  const [bellOpen, setBellOpen]                       = useState(false);
  const [resultToasts, setResultToasts]               = useState<ResultToast[]>([]);
  const [pipelineStatus, setPipelineStatus]           = useState<Record<string, any>>({});

  const alertIdRef = useRef(0);
  const toastIdRef = useRef(0);
  const bellRef    = useRef<HTMLDivElement>(null);

  const T = TOKENS[theme];

  useEffect(() => {
    const saved = localStorage.getItem("tf-theme") as Theme | null;
    if (saved === "light") setTheme("light");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("tf-theme", next);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("tf_token");
    localStorage.removeItem("authUser");
    router.replace("/");
  };

  const unreadCount = pipelineAlerts.filter(a => !a.read).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) setBellOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fetchAll = useCallback(async (force = false) => {
    if (force) setRefreshing(true);
    try {
      await dispatch(dashboardRefreshAll()).unwrap();
      setLastFetchTime(new Date());
    } finally {
      setRefreshing(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchAll();
    const id = setInterval(() => fetchAll(true), 120_000);
    return () => clearInterval(id);
  }, [fetchAll, selectedTimeRange]);

  const stats = useMemo(() => {
    const total                = candidates.length;
    const shortlisted          = candidates.filter((c: any) => c?.status === "Shortlisted").length;
    const interviews           = candidates.filter((c: any) => c?.interview_scheduled).length;
    const assessmentsSent      = candidates.filter((c: any) => c?.exam_link_sent).length;
    const assessmentsCompleted = candidates.filter((c: any) => c?.exam_completed).length;
    const assessmentsPassed    = candidates.filter((c: any) => c?.exam_percentage >= 70).length;
    const pendingAssessments   = candidates.filter((c: any) => c?.exam_link_sent && !c?.exam_completed && !c?.link_expired).length;
    const pendingInterviews    = candidates.filter((c: any) => c?.interview_scheduled && c?.interview_date && new Date(c.interview_date) > new Date()).length;
    const hires                = candidates.filter((c: any) => c?.final_status === "Hired").length;
    const timeToHire = (() => {
      const hired = candidates.filter((c: any) => c?.final_status === "Hired" && c?.processed_date);
      if (!hired.length) return 0;
      const t = hired.reduce((acc: number, c: any) => acc + Math.max(Math.floor((Date.now() - new Date(c.processed_date).getTime()) / 86_400_000), 0), 0);
      return Math.round(t / hired.length);
    })();
    return {
      totalApplications:        total,
      activeInterviews:         interviews,
      timeToHire,
      activeAssessments:        pendingAssessments,
      shortlistRate:            total > 0 ? ((shortlisted / total) * 100).toFixed(1) : 0,
      assessmentCompletionRate: assessmentsSent > 0 ? ((assessmentsCompleted / assessmentsSent) * 100).toFixed(1) : 0,
      assessmentPassRate:       assessmentsCompleted > 0 ? ((assessmentsPassed / assessmentsCompleted) * 100).toFixed(1) : 0,
      totalHires:               hires,
      pendingActions:           pendingAssessments + pendingInterviews,
    };
  }, [candidates]);

  const pipelineStages = useMemo(() => [
    { name: "Applied",     value: candidates.length,                                                col: "#00d68f" },
    { name: "Screened",    value: candidates.filter((c: any) => c?.ats_score > 0).length,           col: "#00c47e" },
    { name: "Shortlisted", value: candidates.filter((c: any) => c?.status === "Shortlisted").length, col: "#fbbf24" },
    { name: "Assessment",  value: candidates.filter((c: any) => c?.exam_completed).length,          col: T.blue   },
    { name: "Interview",   value: candidates.filter((c: any) => c?.interview_scheduled).length,     col: "#fbbf24" },
    { name: "Hired",       value: candidates.filter((c: any) => c?.final_status === "Hired").length, col: T.tx3   },
  ], [candidates, T]);

  const assessmentMetrics = useMemo(() => [
    { name: "Sent",      value: candidates.filter((c: any) => c?.exam_link_sent).length },
    { name: "Started",   value: candidates.filter((c: any) => c?.exam_started).length },
    { name: "Completed", value: candidates.filter((c: any) => c?.exam_completed).length },
    { name: "Passed",    value: candidates.filter((c: any) => c?.exam_percentage >= 70).length },
  ], [candidates]);

  const chartData = useMemo(() => {
    const hasApiData = Array.isArray(recruitmentData) && recruitmentData.length > 0 && recruitmentData[0]?.month !== undefined;
    if (hasApiData) return recruitmentData;
    const months: any[] = [];
    for (let i = 5; i >= 0; i--) {
      const d  = new Date(); d.setMonth(d.getMonth() - i);
      const label = d.toLocaleString("en-US", { month: "short" });
      const yr = d.getFullYear(), mo = d.getMonth();
      const inMonth = (ds: string) => { if (!ds) return false; const dt = new Date(ds); return dt.getFullYear() === yr && dt.getMonth() === mo; };
      months.push({ month: label, applications: candidates.filter((c: any) => inMonth(c?.processed_date || c?.created_at)).length, interviews: candidates.filter((c: any) => c?.interview_scheduled && inMonth(c?.interview_date)).length, hires: candidates.filter((c: any) => c?.final_status === "Hired" && inMonth(c?.processed_date)).length });
    }
    const allZero = months.every(m => m.applications === 0 && m.interviews === 0 && m.hires === 0);
    if (allZero) {
      const seeds = [{ a: 0, i: 0, h: 0 }, { a: 1, i: 0, h: 0 }, { a: 3, i: 1, h: 0 }, { a: 4, i: 2, h: 0 }, { a: 14, i: 5, h: 0 }, { a: candidates.length || 12, i: candidates.filter((c: any) => c?.interview_scheduled).length || 7, h: 0 }];
      return months.map((m, idx) => ({ ...m, applications: seeds[idx].a, interviews: seeds[idx].i, hires: seeds[idx].h }));
    }
    return months;
  }, [recruitmentData, candidates]);

  const currentStep = useMemo(() => {
    if (candidates.some((c: any) => c?.interview_scheduled)) return 4;
    if (candidates.some((c: any) => c?.exam_link_sent))      return 3;
    if (candidates.some((c: any) => c?.status === "Shortlisted")) return 2;
    if (jobs.length > 0)                                     return 1;
    return 0;
  }, [candidates, jobs]);

  // ── Pipeline complete handler — receives counts from PipelineRunner ──────────
  const handlePipelineComplete = useCallback(
    async (pipelineData: PipelineCompleteData) => {
      // Fetch fresh candidates so dashboard counts update
      await fetchAll(true);

      // If backend returned actual counts, use them directly.
      // Otherwise fall back to counting from the freshly-fetched Redux store.
      // (Note: candidates in this closure is the pre-fetch value — we prefer
      //  pipelineData counts if non-zero, then let the re-render handle the rest.)
      const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      // Determine counts: prefer pipeline response if backend sent them
      let shortlisted = pipelineData.shortlisted;
      let rejected    = pipelineData.rejected;
      let total       = pipelineData.total;

      // If backend didn't include counts (all zero), derive from candidates
      if (total === 0) {
        const jCands  = candidates.filter((c: any) => String(c?.job_id) === String(pipelineData.jobId));
        shortlisted   = jCands.filter((c: any) => c?.status === "Shortlisted").length;
        rejected      = jCands.filter((c: any) => c?.status !== "Shortlisted").length;
        total         = jCands.length;
      }

      // Add to bell alerts
      const alertId = ++alertIdRef.current;
      setPipelineAlerts(prev => [{
        id: alertId, jobTitle: pipelineData.jobTitle,
        shortlisted, rejected, total, time, read: false,
      }, ...prev]);

      // Auto-open bell so user sees the new alert
      setBellOpen(true);

      // Show bottom-right toast (auto-dismisses after 10s)
      const toastId = ++toastIdRef.current;
      setResultToasts(prev => [...prev, { id: toastId, jobTitle: pipelineData.jobTitle, shortlisted, rejected, total }]);
      setTimeout(() => setResultToasts(prev => prev.filter(t => t.id !== toastId)), 10_000);

      setPipelineStatus(p => ({ ...p, [pipelineData.jobId]: { status: "completed", shortlisted, rejected } }));
    },
    [candidates, fetchAll]
  );

  const dismissToast   = (id: number) => setResultToasts(prev => prev.filter(t => t.id !== id));
  const clearAllAlerts = () => setPipelineAlerts([]);
  const openBell       = () => { setBellOpen(o => !o); setPipelineAlerts(prev => prev.map(a => ({ ...a, read: true }))); };

  if (loading && !lastFetchTime) {
    return (
      <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", border: `3px solid ${T.border}`, borderTopColor: T.acc, margin: "0 auto 12px", animation: "tfSpin 0.8s linear infinite" }} />
          <p style={{ fontSize: 13, color: T.tx3 }}>Loading dashboard…</p>
        </div>
        <style>{`@keyframes tfSpin { to { transform:rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: T.bg, color: T.tx, fontFamily: "'Inter',system-ui,sans-serif", transition: "background 0.35s, color 0.35s", position: "relative" }}>
      <Sidebar theme={theme} onToggleTheme={toggleTheme} onLogout={handleLogout} />

      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        {/* TOPBAR */}
        <header style={{ height: 52, display: "flex", alignItems: "center", padding: "0 1.6rem", gap: "1rem", background: T.topbarBg, borderBottom: `1px solid ${T.border}`, position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(20px)", transition: "background 0.35s, border-color 0.35s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.73rem", color: T.tx3 }}>
            <span style={{ color: T.tx2, fontWeight: 500 }}>MGCV Tech</span>
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: T.tx }}>Recruitment</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 7, background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 8, padding: "0.36rem 0.9rem", minWidth: 240 }}>
            <Search size={13} color={T.tx3} />
            <input type="text" placeholder="Search candidates, jobs…" style={{ background: "none", border: "none", outline: "none", fontFamily: "inherit", fontSize: "0.73rem", color: T.tx, width: "100%" }} />
            <span style={{ fontSize: "0.55rem", background: T.surface, border: `1px solid ${T.border}`, borderRadius: 4, padding: "0.1rem 0.35rem", color: T.tx3 }}>⌘K</span>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
            <select value={selectedTimeRange} onChange={e => setSelectedTimeRange(e.target.value as any)}
              style={{ background: T.selectBg, border: `1px solid ${T.border}`, color: T.tx2, fontFamily: "inherit", fontSize: "0.73rem", padding: "0.36rem 1.6rem 0.36rem 0.75rem", borderRadius: 8, outline: "none", cursor: "pointer", appearance: "none", WebkitAppearance: "none" }}>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <IconBtn title="Refresh" onClick={() => fetchAll(true)} theme={theme}>
              <RefreshCw size={14} color={T.tx3} style={refreshing ? { animation: "tfSpin 0.8s linear infinite" } : {}} />
            </IconBtn>
            <div style={{ position: "relative" }} ref={bellRef}>
              <IconBtn title="Notifications" onClick={openBell} theme={theme}>
                <Bell size={14} color={T.tx3} />
                {unreadCount > 0 && (
                  <span style={{ position: "absolute", top: -4, right: -4, minWidth: 16, height: 16, padding: "0 3px", background: T.red, color: "#fff", fontSize: "0.53rem", fontWeight: 700, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${T.bg}` }}>
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </IconBtn>
              {bellOpen && <BellDropdown alerts={pipelineAlerts} onClearAll={clearAllAlerts} onClose={() => setBellOpen(false)} theme={theme} />}
            </div>
            <TbBtn onClick={() => {}} theme={theme}><Download size={13} color={T.tx2} />Export Report</TbBtn>
            <TbBtn onClick={() => {}} theme={theme}><Settings size={13} color={T.tx2} />Settings</TbBtn>
            <button
              onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
              style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit", fontSize: "0.73rem", fontWeight: 700, background: T.acc, color: T.btnText, padding: "0.4rem 1rem", borderRadius: 8, border: "none", cursor: "pointer", boxShadow: `0 0 16px ${T.accg}`, transition: "all 0.2s", whiteSpace: "nowrap" }}
            >+ New Pipeline</button>
          </div>
        </header>

        {/* CONTENT */}
        <div style={{ padding: "1.6rem 1.8rem", flex: 1 }}>
          <div style={{ marginBottom: "1.4rem" }}>
            <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "2rem", color: T.tx, lineHeight: 1.15, marginBottom: "0.18rem" }}>
              Recruitment <span style={{ color: T.acc }}>Dashboard</span>
            </div>
            <div style={{ fontSize: "0.73rem", color: T.tx3, display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
              Welcome back, HR Manager
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: T.tx3 }} />
              <strong style={{ color: T.acc, fontWeight: 600 }}>{jobs.length} active positions</strong>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: T.tx3 }} />
              <span style={{ color: T.tx2 }}>{lastFetchTime ? `Last updated ${lastFetchTime.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}` : "Loading…"}</span>
            </div>
          </div>

          <RecruitmentJourney currentStep={currentStep} theme={theme} onStepClick={route => router.push(route)} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.85rem", marginBottom: "1.4rem" }}>
            <StatCard title="Total Applications" value={stats.totalApplications} change={12.5} changeType="up" icon={Users} iconBg="rgba(96,165,250,0.12)" iconColor={T.blue} subtitle="All time applications" loading={loading} theme={theme} />
            <StatCard title="Shortlist Rate" value={`${stats.shortlistRate}%`} change={5.2} changeType="up" icon={Target} iconBg={T.accs} iconColor={T.acc} subtitle="Candidates shortlisted" loading={loading} theme={theme} />
            <StatCard title="Time-to-Hire" value={`${stats.timeToHire}d`} change={-8.3} changeType="down" icon={Clock} iconBg="rgba(251,191,36,0.10)" iconColor={T.amber} subtitle="Average days to hire" loading={loading} theme={theme} />
            <StatCard title="Pending Actions" value={stats.pendingActions} changeLabel="✓ All clear" changeType="na" icon={Bell} iconBg="rgba(167,139,250,0.10)" iconColor={T.purple} subtitle="Requires attention" loading={loading} theme={theme} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem", marginBottom: "1.4rem" }}>
            <ChartCard title="Recruitment Pipeline" tag="Candidate counts by stage" theme={theme}>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={pipelineStages} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "rgba(0,214,143,.055)" : "rgba(5,150,105,.06)"} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: T.tx3 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: T.tx3 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 12, color: T.tx }} formatter={(val: number) => [`${val} candidates`, ""]} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {pipelineStages.map((s, i) => <Cell key={i} fill={s.col} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title="Hiring Activity" tag="6-month trend" theme={theme}>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "rgba(0,214,143,.055)" : "rgba(5,150,105,.06)"} />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: T.tx3 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: T.tx3 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 12, color: T.tx }} />
                  <Line type="monotone" dataKey="applications" stroke={T.acc}   strokeWidth={2.5} dot={{ fill: T.acc,   r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="interviews"   stroke={T.blue}  strokeWidth={2.5} dot={{ fill: T.blue,  r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="hires"        stroke={T.amber} strokeWidth={2}   dot={{ fill: T.amber, r: 4 }} strokeDasharray="5 4" />
                </LineChart>
              </ResponsiveContainer>
              <div style={{ display: "flex", alignItems: "center", gap: "1.1rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
                {[{ color: T.acc, label: "Applications" }, { color: T.blue, label: "Interviews" }, { color: T.amber, label: "Hires" }].map(l => (
                  <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.65rem", color: T.tx2 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: l.color }} /> {l.label}
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>

          {/* Pipeline stage cells */}
          <div style={{ marginBottom: "1.4rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: T.tx }}>Pipeline Stages</span>
                <span style={{ fontSize: "0.6rem", fontWeight: 600, padding: "0.15rem 0.52rem", borderRadius: 999, background: T.badgeBg, color: T.badgeCol }}>Live counts</span>
              </div>
              <span style={{ fontSize: "0.66rem", color: T.tx3 }}>Click stage to filter candidates →</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: "0.65rem" }}>
              {pipelineStages.map((stage, idx) => {
                const max = pipelineStages[0]?.value || 1;
                const pct = max > 0 ? Math.round((stage.value / max) * 100) : 0;
                return (
                  <div key={idx} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "0.9rem 1rem", cursor: "pointer", transition: "all 0.18s" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = stage.col; el.style.background = T.accs; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = T.border; el.style.background = T.surface; }}
                  >
                    <div style={{ fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: T.tx3, marginBottom: "0.4rem" }}>{stage.name}</div>
                    <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "1.9rem", color: T.tx, lineHeight: 1, marginBottom: "0.5rem" }}>{stage.value}</div>
                    <div style={{ height: 3, borderRadius: 2, background: T.barTrack, overflow: "hidden", marginBottom: "0.3rem" }}>
                      <div style={{ height: "100%", width: `${pct}%`, borderRadius: 2, background: stage.col, transition: "width 0.9s ease" }} />
                    </div>
                    <div style={{ fontSize: "0.58rem", color: T.tx3 }}>{pct}% of total</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active jobs table */}
          <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden", marginBottom: "1.4rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.85rem 1.2rem", borderBottom: `1px solid ${T.border}`, flexWrap: "wrap", gap: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: T.tx }}>Active Job Positions</span>
                <span style={{ fontSize: "0.6rem", fontWeight: 600, padding: "0.15rem 0.52rem", borderRadius: 999, background: T.badgeBg, color: T.badgeCol }}>{jobs.length} active</span>
                <span style={{ fontSize: "0.58rem", fontWeight: 700, padding: "0.15rem 0.52rem", borderRadius: 999, background: T.accs, color: T.acc, border: `1px solid ${T.border}` }}>+ AI Pipeline</span>
              </div>
              <button onClick={() => router.push("/candidates")} style={{ background: "none", border: "none", fontSize: "0.73rem", fontWeight: 600, color: T.acc, cursor: "pointer", fontFamily: "inherit" }}>View All Candidates →</button>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: theme === "dark" ? "rgba(0,214,143,.025)" : T.surface2 }}>
                    {["Position", "Department", "Location", "Apps", "Shortlisted", "In Progress", "Days Open", "Status", "Actions"].map(h => (
                      <th key={h} style={{ padding: "0.56rem 1rem", textAlign: "left", fontSize: "0.57rem", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: T.tx3, borderBottom: `1px solid ${T.border}`, whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job: any) => {
                    const jC         = candidates.filter((c: any) => String(c?.job_id) === String(job.id));
                    const shortlisted = jC.filter((c: any) => c?.status === "Shortlisted").length;
                    const inProgress  = jC.filter((c: any) => c?.interview_scheduled).length;
                    const daysOpen    = job.created_at ? Math.floor((Date.now() - new Date(job.created_at).getTime()) / 86_400_000) : "—";
                    const deptColors: Record<string, { bg: string; col: string }> = {
                      "AI/ML":       { bg: "rgba(0,214,143,0.12)",   col: T.acc    },
                      "Engineering": { bg: "rgba(167,139,250,0.12)", col: T.purple },
                      "Health Care": { bg: "rgba(96,165,250,0.12)",  col: T.blue   },
                      "Design":      { bg: "rgba(251,191,36,0.12)",  col: T.amber  },
                      "Product":     { bg: "rgba(251,191,36,0.12)",  col: T.amber  },
                    };
                    const dc       = deptColors[job.department] ?? { bg: T.surface2, col: T.tx2 };
                    const initials = (job.title || "JO").split(" ").slice(0, 2).map((w: string) => w[0]).join("").toUpperCase();
                    const pStatus  = pipelineStatus[job.id];
                    return (
                      <tr key={job.id}
                        onMouseEnter={e => ((e.currentTarget as HTMLTableRowElement).style.background = T.rowHover)}
                        onMouseLeave={e => ((e.currentTarget as HTMLTableRowElement).style.background = "transparent")}
                      >
                        <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}` }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                            <div style={{ width: 30, height: 30, borderRadius: 8, background: dc.bg, color: dc.col, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700, flexShrink: 0 }}>{initials}</div>
                            <div>
                              <div style={{ fontSize: "0.78rem", fontWeight: 600, color: T.tx }}>{job.title}</div>
                              <div style={{ fontSize: "0.6rem", color: T.tx3 }}>JOB-{job.id}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}` }}>
                          <span style={{ fontSize: "0.62rem", fontWeight: 600, padding: "0.18rem 0.58rem", borderRadius: 999, background: dc.bg, color: dc.col }}>{job.department}</span>
                        </td>
                        <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}`, fontSize: "0.73rem", color: T.tx2 }}>📍 {job.location || "—"}</td>
                        <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}`, fontSize: "0.78rem", fontWeight: 600, color: T.tx }}>{jC.length}</td>
                        <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}`, fontSize: "0.78rem", fontWeight: 600, color: T.acc }}>{shortlisted}</td>
                        <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}`, fontSize: "0.78rem", fontWeight: 600, color: T.tx }}>{inProgress}</td>
                        <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}` }}>
                          <span style={{ fontSize: "0.62rem", color: T.tx3, background: T.surface2, border: `1px solid ${T.border}`, padding: "0.14rem 0.48rem", borderRadius: 5 }}>
                            {typeof daysOpen === "number" ? `${daysOpen}d ago` : "—"}
                          </span>
                        </td>
                        <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}` }}>
                          {pStatus?.status === "completed" ? (
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: "0.64rem", fontWeight: 600, background: T.accs, color: T.acc, padding: "0.2rem 0.62rem", borderRadius: 999 }}>
                              <CheckCircle size={10} /> Done · {pStatus.shortlisted ?? 0} hired
                            </span>
                          ) : pStatus?.status === "running" ? (
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: "0.64rem", fontWeight: 600, background: "rgba(96,165,250,0.1)", color: T.blue, padding: "0.2rem 0.62rem", borderRadius: 999 }}>
                              <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.blue, animation: "tfDot 1s infinite" }} />
                              Running…
                            </span>
                          ) : (
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: "0.64rem", fontWeight: 600, background: T.badgeBg, color: T.badgeCol, padding: "0.2rem 0.62rem", borderRadius: 999 }}>
                              <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.acc, animation: "tfDot 2s infinite" }} />
                              Active
                            </span>
                          )}
                        </td>
                        <td style={{ padding: "0.72rem 1rem", borderBottom: `1px solid ${T.border}` }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <button onClick={() => router.push("/candidates")}
                              style={{ fontSize: "0.68rem", fontWeight: 600, background: "transparent", border: `1px solid ${T.border}`, color: T.tx2, padding: "0.24rem 0.65rem", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", transition: "all 0.18s" }}
                              onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = T.blue; el.style.color = T.blue; }}
                              onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = T.border; el.style.color = T.tx2; }}
                            >View</button>
                            <button onClick={() => setSelectedPipelineJob(job)}
                              style={{ fontSize: "0.68rem", fontWeight: 700, background: T.acc, border: "none", color: T.btnText, padding: "0.24rem 0.8rem", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", transition: "all 0.18s", boxShadow: `0 0 10px ${T.accg}` }}
                              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = T.acc3)}
                              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = T.acc)}
                            >Run Pipeline</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem", marginBottom: "1.4rem" }}>
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.85rem 1.2rem", borderBottom: `1px solid ${T.border}` }}>
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: T.tx }}>Assessment Metrics</span>
                <button style={{ background: "none", border: "none", fontSize: "0.68rem", fontWeight: 600, color: T.acc, cursor: "pointer", fontFamily: "inherit" }}>View details →</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", padding: "0.9rem 1.2rem" }}>
                {[{ val: `${stats.assessmentCompletionRate}%`, lbl: "Completion Rate", color: T.acc }, { val: `${stats.assessmentPassRate}%`, lbl: "Pass Rate", color: T.blue }].map(box => (
                  <div key={box.lbl} style={{ background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 11, padding: "0.9rem 1rem", textAlign: "center" }}>
                    <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "1.9rem", color: box.color, lineHeight: 1, marginBottom: "0.2rem" }}>{box.val}</div>
                    <div style={{ fontSize: "0.62rem", color: T.tx3 }}>{box.lbl}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding: "0.2rem 1.2rem 0.9rem" }}>
                {assessmentMetrics.map((m, idx) => {
                  const max  = assessmentMetrics[0]?.value || 1;
                  const pct  = max > 0 ? Math.round((m.value / max) * 100) : 0;
                  const cols = [T.acc, T.blue, T.purple, T.red];
                  return (
                    <div key={m.name} style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.52rem" }}>
                      <div style={{ fontSize: "0.68rem", color: T.tx2, width: 70, flexShrink: 0 }}>{m.name}</div>
                      <div style={{ flex: 1, height: 5, borderRadius: 3, background: T.barTrack, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, borderRadius: 3, background: cols[idx], transition: "width 0.9s ease" }} />
                      </div>
                      <div style={{ fontSize: "0.68rem", fontWeight: 600, color: T.tx, width: 20, textAlign: "right" }}>{m.value}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden" }}>
              <div style={{ padding: "0.85rem 1.2rem", borderBottom: `1px solid ${T.border}`, fontSize: "0.82rem", fontWeight: 700, color: T.tx }}>Quick Actions</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem", padding: "0.9rem 1.1rem" }}>
                {[
                  { label: "New Pipeline",        sub: "Start recruitment flow",                         icon: <PlayCircle size={15} />,   color: T.accs,                   stroke: T.acc,    onClick: () => jobs.length > 0 && setSelectedPipelineJob(jobs[0]) },
                  { label: "Manage Assessments",  sub: `${stats.activeAssessments} pending reviews`,    icon: <Target size={15} />,       color: "rgba(167,139,250,0.12)", stroke: T.purple, onClick: () => router.push("/assessments") },
                  { label: "Schedule Interviews", sub: `${stats.activeInterviews} interviews scheduled`, icon: <CalendarDays size={15} />, color: "rgba(96,165,250,0.12)",  stroke: T.blue,   onClick: () => router.push("/scheduler") },
                  { label: "View All Candidates", sub: `${candidates.length} total candidates`,          icon: <Users size={15} />,        color: "rgba(251,191,36,0.12)",  stroke: T.amber,  onClick: () => router.push("/candidates") },
                ].map(qa => (
                  <button key={qa.label} onClick={qa.onClick}
                    style={{ background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 11, padding: "0.85rem 0.95rem", cursor: "pointer", transition: "all 0.2s", textAlign: "left", fontFamily: "inherit", width: "100%", display: "flex", alignItems: "flex-start", gap: "0.65rem" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = T.acc; el.style.background = T.accs; el.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = T.border; el.style.background = T.surface2; el.style.transform = "translateY(0)"; }}
                  >
                    <div style={{ width: 32, height: 32, borderRadius: 9, background: qa.color, display: "flex", alignItems: "center", justifyContent: "center", color: qa.stroke, flexShrink: 0 }}>{qa.icon}</div>
                    <div>
                      <div style={{ fontSize: "0.74rem", fontWeight: 600, color: T.tx, marginBottom: "0.12rem" }}>{qa.label}</div>
                      <div style={{ fontSize: "0.62rem", color: T.tx3 }}>{qa.sub}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Runner modal */}
      {selectedPipelineJob && (
        <PipelineRunner
          job={selectedPipelineJob}
          theme={theme}
          onPipelineStart={() =>
            setPipelineStatus(p => ({ ...p, [selectedPipelineJob.id]: { status: "running" } }))
          }
          onPipelineComplete={handlePipelineComplete}
          onClose={() => setSelectedPipelineJob(null)}
        />
      )}

      {/* Rich result toasts — bottom-right */}
      <PipelineResultToast toasts={resultToasts} onDismiss={dismissToast} theme={theme} />

      <style>{`
        @keyframes tfSpin         { to { transform: rotate(360deg); } }
        @keyframes tfDot          { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes tfFadeSlide    { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes tfSlideInRight { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:translateX(0)} }
      `}</style>
    </div>
  );
};

export default Dashboard;