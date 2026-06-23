// // // src/components/loginForm/Login.tsx
// // "use client";
// // import React, { useEffect, useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { loginAPI } from "@/services/redux/thunk/authThunk";
// // import Link from "next/link";

// // type LoginProps = {
// //   onClose?: () => void;
// //   onLoggedIn?: () => void;
// //   switchToSignUp?: () => void;
// //   redirectTo?: string;
// // };

// // const GoogleIcon = () => (
// //   <svg width="18" height="18" viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
// //     <path fill="#EA4335" d="M24 9.5c3.15 0 5.96 1.08 8.18 2.86l6.1-6.1C34.46 3.08 29.5 1 24 1 14.82 1 7.07 6.48 3.58 14.24l7.14 5.55C12.49 13.48 17.8 9.5 24 9.5z"/>
// //     <path fill="#4285F4" d="M46.52 24.5c0-1.64-.15-3.22-.43-4.75H24v9.01h12.7c-.55 2.96-2.2 5.47-4.68 7.16l7.18 5.58C43.38 37.35 46.52 31.35 46.52 24.5z"/>
// //     <path fill="#FBBC05" d="M10.72 28.21A14.5 14.5 0 0 1 9.5 24c0-1.46.25-2.87.7-4.19l-7.14-5.55A23.94 23.94 0 0 0 0 24c0 3.87.92 7.53 2.55 10.76l8.17-6.55z"/>
// //     <path fill="#34A853" d="M24 47c5.49 0 10.1-1.82 13.47-4.95l-7.18-5.58c-1.83 1.23-4.18 1.95-6.29 1.95-6.2 0-11.51-4-13.28-9.21l-8.17 6.55C7.07 41.52 14.82 47 24 47z"/>
// //   </svg>
// // );

// // const AppleIcon = () => (
// //   <svg width="16" height="16" viewBox="0 0 814 1000" style={{ flexShrink: 0 }}>
// //     <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-42.8-155.5-111.2C115.1 794 61.1 694.2 61.1 580.4c0-167 108.8-255.2 215.4-255.2 47.8 0 87.8 31.4 116.8 31.4 27.6 0 71.7-33.2 126.3-33.2 20.3 0 104.2 1.9 161.5 67.9z" fill="currentColor"/>
// //     <path d="M550.9 106.1c24.5-28.8 42.2-68.7 42.2-108.6 0-5.5-.5-11.1-1.5-15.5-40.3 1.5-88.4 26.8-117.5 59.2-22.8 25.5-44.4 65.4-44.4 105.8 0 6 1 12.1 1.5 14.1 2.5.5 6.5 1 10.5 1 36.3 0 81.8-24.3 109.2-56z" fill="currentColor"/>
// //   </svg>
// // );

// // const EyeIcon = () => (
// //   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //     <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>
// //   </svg>
// // );

// // const EyeOffIcon = () => (
// //   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //     <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-10.94-8 .58-1.77 1.54-3.34 2.78-4.62"/>
// //     <path d="M1 1l22 22"/><path d="M10.58 10.58a2 2 0 0 0 2.84 2.84"/>
// //     <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c5 0 9.27 3.11 10.94 8a11.8 11.8 0 0 1-2.31 3.64"/>
// //   </svg>
// // );

// // /* ── Brand accent colours ─────────────────────────────────────────────────── */
// // const C = {
// //   acc:      "#00d68f",   // TalentFlow green
// //   accDark:  "#059669",
// //   accGlow:  "rgba(0,214,143,0.25)",
// //   accLight: "rgba(0,214,143,0.08)",
// //   blue:     "#60a5fa",
// //   bg:       "#040d0a",   // deep dark green-black
// //   surface:  "rgba(255,255,255,0.04)",
// //   border:   "rgba(0,214,143,0.18)",
// //   borderFocus: "#00d68f",
// //   tx:       "#e2faf1",
// //   tx2:      "#a7c4b8",
// //   tx3:      "#5a8a75",
// // } as const;

// // export default function Login({
// //   onClose,
// //   onLoggedIn,
// //   switchToSignUp,
// //   redirectTo = "/dashboard",
// // }: LoginProps) {
// //   const router = useRouter();

// //   const [mounted,  setMounted]  = useState(false);
// //   const [email,    setEmail]    = useState("");
// //   const [password, setPassword] = useState("");
// //   const [showPw,   setShowPw]   = useState(false);
// //   const [loading,  setLoading]  = useState(false);
// //   const [gLoading, setGLoading] = useState(false);
// //   const [aLoading, setALoading] = useState(false);
// //   const [error,    setError]    = useState("");

// //   useEffect(() => { setMounted(true); }, []);

// //   const handleLogin = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError("");
// //     if (!email || !password) { setError("Please enter both email and password"); return; }
// //     setLoading(true);
// //     try {
// //       const data = await loginAPI(email, password);
// //       localStorage.setItem("authToken", data.token);
// //       localStorage.setItem("authUser", JSON.stringify(data.user));
// //       window.dispatchEvent(new Event("auth-changed"));
// //       onLoggedIn?.();
// //       onClose?.();
// //       router.push(redirectTo);
// //     } catch (err: unknown) {
// //       const e = err as { response?: { data?: { message?: string } } };
// //       setError(e?.response?.data?.message || "Login failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleGoogle = () => { setGLoading(true); window.location.href = `${process.env.NEXT_PUBLIC_API_URL ?? ""}/api/auth/google`; };
// //   const handleApple  = () => { setALoading(true); window.location.href = `${process.env.NEXT_PUBLIC_API_URL ?? ""}/api/auth/apple`;  };

// //   if (!mounted) return <div style={{ minHeight: "100vh", background: C.bg }} />;

// //   /* ── Input style ─────────────────────────────────────────────────────────── */
// //   const inp: React.CSSProperties = {
// //     width: "100%", padding: "13px 16px", borderRadius: 12,
// //     border: `1.5px solid ${C.border}`,
// //     background: C.surface,
// //     color: C.tx, fontSize: 14, outline: "none",
// //     fontFamily: "inherit", boxSizing: "border-box",
// //     transition: "border-color 0.2s, background 0.2s",
// //   };

// //   /* ── Social button style ─────────────────────────────────────────────────── */
// //   const socialStyle: React.CSSProperties = {
// //     width: "100%", display: "flex", alignItems: "center",
// //     justifyContent: "center", gap: 10,
// //     padding: "12px 0", borderRadius: 12,
// //     border: `1.5px solid ${C.border}`,
// //     background: "rgba(0,214,143,0.04)",
// //     color: C.tx, fontSize: 14, fontWeight: 600,
// //     cursor: "pointer", fontFamily: "inherit",
// //     transition: "background 0.15s, border-color 0.15s",
// //   };

// //   return (
// //     <>
// //       {/* Global reset + dark bg body */}
// //       <style>{`
// //         html, body { margin: 0; padding: 0; background: ${C.bg}; }

// //         /* Dark grid texture — mirrors Dashboard */
// //         body::before {
// //           content: '';
// //           position: fixed; inset: 0; z-index: 0; pointer-events: none;
// //           background-image:
// //             linear-gradient(rgba(0,214,143,.018) 1px, transparent 1px),
// //             linear-gradient(90deg, rgba(0,214,143,.018) 1px, transparent 1px);
// //           background-size: 48px 48px;
// //         }

// //         /* Ambient orb */
// //         body::after {
// //           content: '';
// //           position: fixed; width: 600px; height: 600px; border-radius: 50%;
// //           background: radial-gradient(circle, rgba(0,214,143,.06) 0%, transparent 70%);
// //           top: -120px; right: -120px;
// //           pointer-events: none; z-index: 0;
// //         }

// //         /* Photo panel responsive show */
// //         @media (min-width: 860px) { .lp-left { display: flex !important; } }

// //         /* Input placeholder colour */
// //         .lp-input::placeholder { color: ${C.tx3}; }
// //         .lp-input:focus {
// //           border-color: ${C.acc} !important;
// //           background: rgba(0,214,143,0.06) !important;
// //           box-shadow: 0 0 0 3px rgba(0,214,143,0.12);
// //         }

// //         .lp-social:hover {
// //           background: rgba(0,214,143,0.09) !important;
// //           border-color: ${C.acc} !important;
// //         }

// //         /* Animated dot */
// //         @keyframes lp-dot { 0%,100%{opacity:1} 50%{opacity:.4} }
// //       `}</style>

// //       <div style={{
// //         minHeight: "100vh",
// //         display: "flex",
// //         background: C.bg,
// //         fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
// //         position: "relative",
// //         zIndex: 1,
// //       }}>

// //         {/* ══ LEFT — office photo + branding ══════════════════════════════════ */}
// //         <div
// //           className="lp-left"
// //           style={{
// //             display:   "none",   /* shown via media query */
// //             flex:      "0 0 52%",
// //             position:  "relative",
// //             overflow:  "hidden",
// //             minHeight: "100vh",
// //           }}
// //         >
// //           {/* Photo */}
// //           {/* eslint-disable-next-line @next/next/no-img-element */}
// //           <img
// //             src="/office-bg.png"
// //             alt="Team at work"
// //             style={{
// //               position: "absolute", inset: 0,
// //               width: "100%", height: "100%",
// //               objectFit: "cover", objectPosition: "center 20%",
// //               display: "block",
// //             }}
// //           />

// //           {/* Gradient overlay — dark at top + bottom */}
// //           <div style={{
// //             position: "absolute", inset: 0,
// //             background: "linear-gradient(160deg, rgba(4,13,10,0.72) 0%, rgba(4,13,10,0.1) 45%, rgba(4,13,10,0.85) 100%)",
// //           }} />

// //           {/* Brand content */}
// //           <div style={{
// //             position: "absolute", inset: 0,
// //             display: "flex", flexDirection: "column",
// //             justifyContent: "space-between",
// //             padding: "40px 52px",
// //           }}>

// //             {/* Logo */}
// //             <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
// //               <div style={{
// //                 width: 40, height: 40, borderRadius: 11, flexShrink: 0,
// //                 background: C.acc,
// //                 display: "flex", alignItems: "center", justifyContent: "center",
// //                 boxShadow: `0 4px 20px ${C.accGlow}`,
// //               }}>
// //                 <svg width="22" height="22" viewBox="0 0 20 20" fill={C.bg}>
// //                   <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 3a3 3 0 110 6 3 3 0 010-6zm0 9.5c-2.33 0-4.32-1.45-5.12-3.5h10.24c-.8 2.05-2.79 3.5-5.12 3.5z"/>
// //                 </svg>
// //               </div>
// //               <span style={{ fontSize: 21, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
// //                 TalentFlow <span style={{ color: C.acc }}>AI</span>
// //               </span>
// //             </div>

// //             {/* Headline + body + stats */}
// //             <div>
// //               {/* Live indicator */}
// //               <div style={{
// //                 display: "inline-flex", alignItems: "center", gap: 7,
// //                 background: "rgba(0,214,143,0.12)",
// //                 border: `1px solid ${C.border}`,
// //                 borderRadius: 999, padding: "5px 14px",
// //                 marginBottom: 20,
// //               }}>
// //                 <span style={{
// //                   width: 7, height: 7, borderRadius: "50%", background: C.acc, flexShrink: 0,
// //                   animation: "lp-dot 1.6s infinite",
// //                 }} />
// //                 <span style={{ fontSize: 12, fontWeight: 600, color: C.acc, letterSpacing: "0.04em" }}>
// //                   Live Platform
// //                 </span>
// //               </div>

// //               <h2 style={{
// //                 fontSize: 34, fontWeight: 800, color: "#fff",
// //                 lineHeight: 1.18, marginBottom: 14,
// //                 textShadow: "0 2px 20px rgba(0,0,0,0.6)",
// //               }}>
// //                 Smarter hiring,<br/>
// //                 <span style={{
// //                   background: `linear-gradient(90deg, ${C.acc}, ${C.blue})`,
// //                   WebkitBackgroundClip: "text",
// //                   WebkitTextFillColor: "transparent",
// //                 }}>built for modern teams</span>
// //               </h2>

// //               <p style={{
// //                 fontSize: 14, color: "rgba(255,255,255,0.68)",
// //                 lineHeight: 1.7, maxWidth: 310, marginBottom: 32,
// //               }}>
// //                 Automate onboarding, screening &amp; performance reviews — all in one platform trusted by 2,400+ companies.
// //               </p>

// //               {/* Feature pills */}
// //               <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
// //                 {["AI Resume Screening", "Auto Assessments", "Interview Scheduling", "Live Analytics"].map(f => (
// //                   <span key={f} style={{
// //                     fontSize: 11, fontWeight: 600,
// //                     background: "rgba(0,214,143,0.1)",
// //                     border: `1px solid ${C.border}`,
// //                     color: C.acc, borderRadius: 999,
// //                     padding: "5px 12px", letterSpacing: "0.02em",
// //                   }}>
// //                     {f}
// //                   </span>
// //                 ))}
// //               </div>

// //               {/* Stats */}
// //               <div style={{ display: "flex", gap: 0 }}>
// //                 {[
// //                   { num: "2.4k+", lbl: "Companies"    },
// //                   { num: "98%",   lbl: "Satisfaction"  },
// //                   { num: "10x",   lbl: "Faster hiring" },
// //                 ].map((s, i) => (
// //                   <div key={s.lbl} style={{
// //                     flex: 1,
// //                     paddingLeft: i > 0 ? 24 : 0,
// //                     borderLeft: i > 0 ? `1px solid rgba(0,214,143,0.2)` : "none",
// //                     marginLeft: i > 0 ? 24 : 0,
// //                   }}>
// //                     <div style={{ fontSize: 26, fontWeight: 800, color: C.acc, lineHeight: 1 }}>{s.num}</div>
// //                     <div style={{ fontSize: 11, color: C.tx3, marginTop: 4, fontWeight: 500 }}>{s.lbl}</div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ══ RIGHT — login form ════════════════════════════════════════════════ */}
// //         <div style={{
// //           flex:           1,
// //           minHeight:      "100vh",
// //           display:        "flex",
// //           flexDirection:  "column",
// //           alignItems:     "center",
// //           justifyContent: "center",
// //           padding:        "48px 28px",
// //           background:     "transparent",
// //           overflowY:      "auto",
// //           position:       "relative",
// //           zIndex:         1,
// //         }}>
// //           <div style={{ width: "100%", maxWidth: 380 }}>

// //             {/* Top label */}
// //             <div style={{ textAlign: "center", marginBottom: 28 }}>
// //               <p style={{
// //                 fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
// //                 textTransform: "uppercase", color: C.acc, marginBottom: 8,
// //               }}>
// //                 Welcome back
// //               </p>
// //               <h1 style={{
// //                 fontFamily: "'DM Serif Display',Georgia,serif",
// //                 fontSize: 28, fontWeight: 400, color: C.tx,
// //                 lineHeight: 1.2, marginBottom: 6,
// //               }}>
// //                 Sign in to TalentFlow
// //               </h1>
// //               <p style={{ fontSize: 13, color: C.tx3 }}>
// //                 Access your recruitment dashboard
// //               </p>
// //             </div>

// //             {/* Error */}
// //             {error && (
// //               <div style={{
// //                 marginBottom: 16, borderRadius: 10,
// //                 background: "rgba(248,113,113,0.1)",
// //                 border: "1px solid rgba(248,113,113,0.3)",
// //                 padding: "11px 16px", fontSize: 13, color: "#f87171",
// //               }}>
// //                 {error}
// //               </div>
// //             )}

// //             {/* ── Google ── */}
// //             <button
// //               type="button"
// //               onClick={handleGoogle}
// //               disabled={gLoading || aLoading}
// //               className="lp-social"
// //               style={{ ...socialStyle, marginBottom: 10, opacity: (gLoading || aLoading) ? 0.65 : 1 }}
// //             >
// //               {gLoading ? <span style={{ fontSize: 13, color: C.tx2 }}>Redirecting…</span>
// //                 : <><GoogleIcon /><span>Continue with Google</span></>}
// //             </button>

// //             {/* ── Apple ── */}
// //             <button
// //               type="button"
// //               onClick={handleApple}
// //               disabled={gLoading || aLoading}
// //               className="lp-social"
// //               style={{ ...socialStyle, marginBottom: 22, opacity: (gLoading || aLoading) ? 0.65 : 1 }}
// //             >
// //               {aLoading ? <span style={{ fontSize: 13, color: C.tx2 }}>Redirecting…</span>
// //                 : <><AppleIcon /><span>Continue with Apple</span></>}
// //             </button>

// //             {/* OR */}
// //             <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
// //               <div style={{ flex: 1, height: 1, background: `rgba(0,214,143,0.15)` }} />
// //               <span style={{ fontSize: 11, color: C.tx3, fontWeight: 700, letterSpacing: "0.08em" }}>OR</span>
// //               <div style={{ flex: 1, height: 1, background: `rgba(0,214,143,0.15)` }} />
// //             </div>

// //             {/* Form */}
// //             <form onSubmit={handleLogin} noValidate>
// //               {/* Email */}
// //               <div style={{ marginBottom: 12 }}>
// //                 <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.tx3, marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>
// //                   Email
// //                 </label>
// //                 <input
// //                   type="email"
// //                   placeholder="you@company.com"
// //                   value={email}
// //                   onChange={e => setEmail(e.target.value)}
// //                   autoComplete="email"
// //                   className="lp-input"
// //                   style={inp}
// //                 />
// //               </div>

// //               {/* Password */}
// //               <div style={{ marginBottom: 8 }}>
// //                 <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.tx3, marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>
// //                   Password
// //                 </label>
// //                 <div style={{ position: "relative" }}>
// //                   <input
// //                     type={showPw ? "text" : "password"}
// //                     placeholder="Enter your password"
// //                     value={password}
// //                     onChange={e => setPassword(e.target.value)}
// //                     autoComplete="current-password"
// //                     className="lp-input"
// //                     style={{ ...inp, paddingRight: 48 }}
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={() => setShowPw(v => !v)}
// //                     aria-label={showPw ? "Hide" : "Show"}
// //                     style={{
// //                       position: "absolute", right: 14, top: "50%",
// //                       transform: "translateY(-50%)",
// //                       background: "none", border: "none",
// //                       cursor: "pointer", color: C.tx3,
// //                       padding: 0, display: "flex", alignItems: "center",
// //                     }}
// //                   >
// //                     {showPw ? <EyeOffIcon /> : <EyeIcon />}
// //                   </button>
// //                 </div>
// //               </div>

// //               {/* Forgot */}
// //               <div style={{ textAlign: "right", marginBottom: 20 }}>
// //                 <Link href="/forget-password" style={{ fontSize: 12, color: C.acc, textDecoration: "none", fontWeight: 600 }}>
// //                   Forgot password?
// //                 </Link>
// //               </div>

// //               {/* Sign in button — brand green */}
// //               <button
// //                 type="submit"
// //                 disabled={loading}
// //                 style={{
// //                   width: "100%", padding: "13px 0",
// //                   borderRadius: 12, border: "none",
// //                   background: loading ? C.accDark : C.acc,
// //                   color: C.bg,
// //                   fontSize: 14, fontWeight: 800,
// //                   cursor: loading ? "not-allowed" : "pointer",
// //                   opacity: loading ? 0.8 : 1,
// //                   transition: "background 0.2s, box-shadow 0.2s",
// //                   boxShadow: loading ? "none" : `0 0 20px ${C.accGlow}`,
// //                   letterSpacing: "0.02em",
// //                   fontFamily: "inherit",
// //                 }}
// //                 onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 32px rgba(0,214,143,0.45)`; }}
// //                 onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 20px ${C.accGlow}`; }}
// //               >
// //                 {loading ? "Signing in…" : "Sign in →"}
// //               </button>
// //             </form>

// //             {/* Sign up */}
// //             <div style={{
// //               marginTop: 36, paddingTop: 24,
// //               borderTop: `1px solid rgba(0,214,143,0.1)`,
// //               textAlign: "center",
// //             }}>
// //               <p style={{ fontSize: 14, color: C.tx2, marginBottom: 14 }}>
// //                 Don&apos;t have an account?
// //               </p>
// //               {switchToSignUp ? (
// //                 <button
// //                   type="button"
// //                   onClick={switchToSignUp}
// //                   style={{
// //                     width: "100%", padding: "12px 0", borderRadius: 12,
// //                     border: `1.5px solid ${C.border}`,
// //                     background: C.accLight,
// //                     color: C.acc, fontSize: 14, fontWeight: 700,
// //                     cursor: "pointer", fontFamily: "inherit",
// //                     transition: "background 0.15s, border-color 0.15s",
// //                   }}
// //                   onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,214,143,0.14)"; }}
// //                   onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = C.accLight; }}
// //                 >
// //                   Create a free account
// //                 </button>
// //               ) : (
// //                 <Link href="/signup" style={{
// //                   display: "block", width: "100%", padding: "12px 0",
// //                   borderRadius: 12, border: `1.5px solid ${C.border}`,
// //                   background: C.accLight,
// //                   color: C.acc, fontSize: 14, fontWeight: 700,
// //                   textDecoration: "none", textAlign: "center",
// //                   boxSizing: "border-box",
// //                 }}>
// //                   Create a free account
// //                 </Link>
// //               )}
// //             </div>

// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }
// // src/components/loginForm/Login.tsx
// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { loginAPI } from "@/services/redux/thunk/authThunk";
// import Link from "next/link";

// type LoginProps = {
//   onClose?: () => void;
//   onLoggedIn?: () => void;
//   switchToSignUp?: () => void;
//   redirectTo?: string;
// };

// const GoogleIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
//     <path fill="#EA4335" d="M24 9.5c3.15 0 5.96 1.08 8.18 2.86l6.1-6.1C34.46 3.08 29.5 1 24 1 14.82 1 7.07 6.48 3.58 14.24l7.14 5.55C12.49 13.48 17.8 9.5 24 9.5z"/>
//     <path fill="#4285F4" d="M46.52 24.5c0-1.64-.15-3.22-.43-4.75H24v9.01h12.7c-.55 2.96-2.2 5.47-4.68 7.16l7.18 5.58C43.38 37.35 46.52 31.35 46.52 24.5z"/>
//     <path fill="#FBBC05" d="M10.72 28.21A14.5 14.5 0 0 1 9.5 24c0-1.46.25-2.87.7-4.19l-7.14-5.55A23.94 23.94 0 0 0 0 24c0 3.87.92 7.53 2.55 10.76l8.17-6.55z"/>
//     <path fill="#34A853" d="M24 47c5.49 0 10.1-1.82 13.47-4.95l-7.18-5.58c-1.83 1.23-4.18 1.95-6.29 1.95-6.2 0-11.51-4-13.28-9.21l-8.17 6.55C7.07 41.52 14.82 47 24 47z"/>
//   </svg>
// );

// const AppleIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 814 1000" style={{ flexShrink: 0 }}>
//     <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-42.8-155.5-111.2C115.1 794 61.1 694.2 61.1 580.4c0-167 108.8-255.2 215.4-255.2 47.8 0 87.8 31.4 116.8 31.4 27.6 0 71.7-33.2 126.3-33.2 20.3 0 104.2 1.9 161.5 67.9z" fill="currentColor"/>
//     <path d="M550.9 106.1c24.5-28.8 42.2-68.7 42.2-108.6 0-5.5-.5-11.1-1.5-15.5-40.3 1.5-88.4 26.8-117.5 59.2-22.8 25.5-44.4 65.4-44.4 105.8 0 6 1 12.1 1.5 14.1 2.5.5 6.5 1 10.5 1 36.3 0 81.8-24.3 109.2-56z" fill="currentColor"/>
//   </svg>
// );

// const EyeIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>
//   </svg>
// );

// const EyeOffIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-10.94-8 .58-1.77 1.54-3.34 2.78-4.62"/>
//     <path d="M1 1l22 22"/><path d="M10.58 10.58a2 2 0 0 0 2.84 2.84"/>
//     <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c5 0 9.27 3.11 10.94 8a11.8 11.8 0 0 1-2.31 3.64"/>
//   </svg>
// );

// const C = {
//   acc:      "#00d68f",
//   accDark:  "#059669",
//   accGlow:  "rgba(0,214,143,0.25)",
//   accLight: "rgba(0,214,143,0.08)",
//   blue:     "#60a5fa",
//   bg:       "#040d0a",
//   surface:  "rgba(255,255,255,0.04)",
//   border:   "rgba(0,214,143,0.18)",
//   tx:       "#e2faf1",
//   tx2:      "#a7c4b8",
//   tx3:      "#5a8a75",
// } as const;

// export default function Login({
//   onClose, onLoggedIn, switchToSignUp, redirectTo = "/dashboard",
// }: LoginProps) {
//   const router = useRouter();
//   const [mounted,  setMounted]  = useState(false);
//   const [email,    setEmail]    = useState("");
//   const [password, setPassword] = useState("");
//   const [showPw,   setShowPw]   = useState(false);
//   const [loading,  setLoading]  = useState(false);
//   const [gLoading, setGLoading] = useState(false);
//   const [aLoading, setALoading] = useState(false);
//   const [error,    setError]    = useState("");

//   useEffect(() => { setMounted(true); }, []);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     if (!email || !password) { setError("Please enter both email and password"); return; }
//     setLoading(true);
//     try {
//       const data = await loginAPI(email, password);
//       localStorage.setItem("authToken", data.token);
//       localStorage.setItem("authUser", JSON.stringify(data.user));
//       window.dispatchEvent(new Event("auth-changed"));
//       onLoggedIn?.(); onClose?.();
//       router.push(redirectTo);
//     } catch (err: unknown) {
//       const e = err as { response?: { data?: { message?: string } } };
//       setError(e?.response?.data?.message || "Login failed");
//     } finally { setLoading(false); }
//   };

//   const handleGoogle = () => { setGLoading(true); window.location.href = `${process.env.NEXT_PUBLIC_API_URL ?? ""}/api/auth/google`; };
//   const handleApple  = () => { setALoading(true); window.location.href = `${process.env.NEXT_PUBLIC_API_URL ?? ""}/api/auth/apple`; };

//   if (!mounted) return <div style={{ minHeight: "100vh", background: C.bg }} />;

//   const inp: React.CSSProperties = {
//     width: "100%", padding: "13px 16px", borderRadius: 12,
//     border: `1.5px solid ${C.border}`, background: C.surface,
//     color: C.tx, fontSize: 14, outline: "none",
//     fontFamily: "inherit", boxSizing: "border-box",
//     transition: "border-color 0.2s, background 0.2s",
//   };

//   const socialStyle: React.CSSProperties = {
//     width: "100%", display: "flex", alignItems: "center",
//     justifyContent: "center", gap: 10, padding: "12px 0", borderRadius: 12,
//     border: `1.5px solid ${C.border}`, background: "rgba(0,214,143,0.04)",
//     color: C.tx, fontSize: 14, fontWeight: 600, cursor: "pointer",
//     fontFamily: "inherit", transition: "background 0.15s, border-color 0.15s",
//   };

//   return (
//     <>
//       <style>{`
//         html, body { margin:0; padding:0; background:${C.bg}; }
//         body::before {
//           content:''; position:fixed; inset:0; z-index:0; pointer-events:none;
//           background-image:
//             linear-gradient(rgba(0,214,143,.018) 1px,transparent 1px),
//             linear-gradient(90deg,rgba(0,214,143,.018) 1px,transparent 1px);
//           background-size:48px 48px;
//         }
//         @media(min-width:860px){ .lp-left{ display:flex !important; } }
//         .lp-input::placeholder { color:${C.tx3}; }
//         .lp-input:focus {
//           border-color:${C.acc} !important;
//           background:rgba(0,214,143,0.06) !important;
//           box-shadow:0 0 0 3px rgba(0,214,143,0.12);
//         }
//         .lp-social:hover { background:rgba(0,214,143,0.09) !important; border-color:${C.acc} !important; }
//         @keyframes lp-dot { 0%,100%{opacity:1} 50%{opacity:.4} }
//         @keyframes lp-fadein { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
//         .lp-form-in { animation: lp-fadein 0.5s ease 0.1s both; }
//       `}</style>

//       <div style={{
//         minHeight:"100vh", display:"flex", background:C.bg,
//         fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
//         position:"relative", zIndex:1,
//       }}>

//         {/* ══ LEFT — new photo ═══════════════════════════════════════════════ */}
//         <div className="lp-left" style={{
//           display:"none", flex:"0 0 55%",
//           position:"relative", overflow:"hidden", minHeight:"100vh",
//         }}>
//           {/* eslint-disable-next-line @next/next/no-img-element */}
//           <img
//             src="/ChatGPT Image Apr 15, 2026, 12_31_04 AM.png"
//             alt="Team collaboration"
//             style={{
//               position:"absolute", inset:0,
//               width:"100%", height:"100%",
//               objectFit:"cover", objectPosition:"center 25%",
//               display:"block",
//             }}
//           />

//           {/* Rich gradient overlay — left dark, right light */}
//           <div style={{
//             position:"absolute", inset:0,
//             background:"linear-gradient(105deg, rgba(4,13,10,0.92) 0%, rgba(4,13,10,0.60) 40%, rgba(4,13,10,0.20) 70%, rgba(4,13,10,0.05) 100%)",
//           }}/>

//           {/* Green vignette bottom */}
//           <div style={{
//             position:"absolute", inset:0,
//             background:"linear-gradient(to top, rgba(4,13,10,0.88) 0%, transparent 45%)",
//           }}/>

//           {/* Content */}
//           <div style={{
//             position:"absolute", inset:0,
//             display:"flex", flexDirection:"column",
//             justifyContent:"space-between", padding:"44px 56px",
//           }}>

//             {/* Logo */}
//             <div style={{ display:"flex", alignItems:"center", gap:12 }}>
//               <div style={{
//                 width:42, height:42, borderRadius:12, flexShrink:0,
//                 background:C.acc,
//                 display:"flex", alignItems:"center", justifyContent:"center",
//                 boxShadow:`0 4px 24px ${C.accGlow}`,
//               }}>
//                 <svg width="22" height="22" viewBox="0 0 20 20" fill={C.bg}>
//                   <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 3a3 3 0 110 6 3 3 0 010-6zm0 9.5c-2.33 0-4.32-1.45-5.12-3.5h10.24c-.8 2.05-2.79 3.5-5.12 3.5z"/>
//                 </svg>
//               </div>
//               <span style={{ fontSize:22, fontWeight:700, color:"#fff", letterSpacing:"-0.02em" }}>
//                 TalentFlow <span style={{ color:C.acc }}>AI</span>
//               </span>
//             </div>

//             {/* Bottom block */}
//             <div>
//               {/* Live badge */}
//               <div style={{
//                 display:"inline-flex", alignItems:"center", gap:8,
//                 background:"rgba(0,214,143,0.12)", border:`1px solid ${C.border}`,
//                 borderRadius:999, padding:"6px 16px", marginBottom:22,
//               }}>
//                 <span style={{
//                   width:7, height:7, borderRadius:"50%", background:C.acc, flexShrink:0,
//                   animation:"lp-dot 1.6s infinite",
//                 }}/>
//                 <span style={{ fontSize:12, fontWeight:700, color:C.acc, letterSpacing:"0.05em" }}>
//                   AI-Powered Recruitment
//                 </span>
//               </div>

//               <h2 style={{
//                 fontSize:36, fontWeight:800, color:"#fff",
//                 lineHeight:1.18, marginBottom:16,
//                 textShadow:"0 2px 24px rgba(0,0,0,0.5)",
//               }}>
//                 Hire smarter,<br/>
//                 <span style={{
//                   background:`linear-gradient(90deg,${C.acc},${C.blue})`,
//                   WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
//                 }}>move faster</span>
//               </h2>

//               <p style={{
//                 fontSize:15, color:"rgba(255,255,255,0.72)",
//                 lineHeight:1.7, maxWidth:320, marginBottom:32,
//               }}>
//                 From job posting to offer letter — automate your entire recruitment pipeline with AI that actually works.
//               </p>

//               {/* Feature grid */}
//               <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:36 }}>
//                 {[
//                   { icon:"🤖", label:"AI Resume Screening" },
//                   { icon:"📋", label:"Smart Assessments"   },
//                   { icon:"📅", label:"Auto Scheduling"      },
//                   { icon:"📊", label:"Live Analytics"       },
//                 ].map(f => (
//                   <div key={f.label} style={{
//                     display:"flex", alignItems:"center", gap:10,
//                     background:"rgba(0,214,143,0.07)",
//                     border:`1px solid rgba(0,214,143,0.14)`,
//                     borderRadius:10, padding:"10px 14px",
//                   }}>
//                     <span style={{ fontSize:16 }}>{f.icon}</span>
//                     <span style={{ fontSize:12, fontWeight:600, color:C.tx2 }}>{f.label}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* Stats */}
//               <div style={{ display:"flex", gap:0 }}>
//                 {[
//                   { num:"2.4k+", lbl:"Companies"   },
//                   { num:"98%",   lbl:"Satisfaction" },
//                   { num:"10x",   lbl:"Faster hiring"},
//                 ].map((s,i) => (
//                   <div key={s.lbl} style={{
//                     flex:1,
//                     paddingLeft: i > 0 ? 28 : 0,
//                     borderLeft:  i > 0 ? "1px solid rgba(0,214,143,0.2)" : "none",
//                     marginLeft:  i > 0 ? 28 : 0,
//                   }}>
//                     <div style={{ fontSize:28, fontWeight:800, color:C.acc, lineHeight:1 }}>{s.num}</div>
//                     <div style={{ fontSize:11, color:C.tx3, marginTop:5, fontWeight:500 }}>{s.lbl}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ══ RIGHT — form ══════════════════════════════════════════════════════ */}
//         <div style={{
//           flex:1, minHeight:"100vh",
//           display:"flex", flexDirection:"column",
//           alignItems:"center", justifyContent:"center",
//           padding:"48px 28px",
//           background:"transparent",
//           overflowY:"auto", position:"relative", zIndex:1,
//         }}>
//           <div className="lp-form-in" style={{ width:"100%", maxWidth:380 }}>

//             {/* Header */}
//             <div style={{ textAlign:"center", marginBottom:30 }}>
//               <p style={{
//                 fontSize:11, fontWeight:700, letterSpacing:"0.12em",
//                 textTransform:"uppercase", color:C.acc, marginBottom:8,
//               }}>
//                 Welcome back
//               </p>
//               <h1 style={{
//                 fontFamily:"'DM Serif Display',Georgia,serif",
//                 fontSize:28, fontWeight:400, color:C.tx,
//                 lineHeight:1.2, marginBottom:6,
//               }}>
//                 Sign in to TalentFlow
//               </h1>
//               <p style={{ fontSize:13, color:C.tx3 }}>Access your recruitment dashboard</p>
//             </div>

//             {/* Error */}
//             {error && (
//               <div style={{
//                 marginBottom:16, borderRadius:10,
//                 background:"rgba(248,113,113,0.1)",
//                 border:"1px solid rgba(248,113,113,0.3)",
//                 padding:"11px 16px", fontSize:13, color:"#f87171",
//               }}>{error}</div>
//             )}

//             {/* Google */}
//             <button type="button" onClick={handleGoogle}
//               disabled={gLoading||aLoading} className="lp-social"
//               style={{ ...socialStyle, marginBottom:10, opacity:(gLoading||aLoading)?0.65:1 }}
//             >
//               {gLoading ? <span style={{fontSize:13,color:C.tx2}}>Redirecting…</span>
//                 : <><GoogleIcon /><span>Continue with Google</span></>}
//             </button>

//             {/* Apple */}
//             <button type="button" onClick={handleApple}
//               disabled={gLoading||aLoading} className="lp-social"
//               style={{ ...socialStyle, marginBottom:24, opacity:(gLoading||aLoading)?0.65:1 }}
//             >
//               {aLoading ? <span style={{fontSize:13,color:C.tx2}}>Redirecting…</span>
//                 : <><AppleIcon /><span>Continue with Apple</span></>}
//             </button>

//             {/* OR */}
//             <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:22 }}>
//               <div style={{ flex:1, height:1, background:"rgba(0,214,143,0.15)" }}/>
//               <span style={{ fontSize:11, color:C.tx3, fontWeight:700, letterSpacing:"0.08em" }}>OR</span>
//               <div style={{ flex:1, height:1, background:"rgba(0,214,143,0.15)" }}/>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleLogin} noValidate>
//               <div style={{ marginBottom:12 }}>
//                 <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.tx3, marginBottom:6, letterSpacing:"0.06em", textTransform:"uppercase" }}>
//                   Email
//                 </label>
//                 <input type="email" placeholder="you@company.com" value={email}
//                   onChange={e => setEmail(e.target.value)} autoComplete="email"
//                   className="lp-input" style={inp}
//                 />
//               </div>

//               <div style={{ marginBottom:8 }}>
//                 <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.tx3, marginBottom:6, letterSpacing:"0.06em", textTransform:"uppercase" }}>
//                   Password
//                 </label>
//                 <div style={{ position:"relative" }}>
//                   <input type={showPw?"text":"password"} placeholder="Enter your password"
//                     value={password} onChange={e => setPassword(e.target.value)}
//                     autoComplete="current-password"
//                     className="lp-input" style={{ ...inp, paddingRight:48 }}
//                   />
//                   <button type="button" onClick={() => setShowPw(v => !v)}
//                     aria-label={showPw?"Hide":"Show"}
//                     style={{
//                       position:"absolute", right:14, top:"50%",
//                       transform:"translateY(-50%)",
//                       background:"none", border:"none", cursor:"pointer",
//                       color:C.tx3, padding:0, display:"flex", alignItems:"center",
//                     }}
//                   >
//                     {showPw ? <EyeOffIcon /> : <EyeIcon />}
//                   </button>
//                 </div>
//               </div>

//               <div style={{ textAlign:"right", marginBottom:20 }}>
//                 <Link href="/forget-password" style={{ fontSize:12, color:C.acc, textDecoration:"none", fontWeight:600 }}>
//                   Forgot password?
//                 </Link>
//               </div>

//               {/* Sign in — brand green CTA */}
//               <button type="submit" disabled={loading} style={{
//                 width:"100%", padding:"14px 0", borderRadius:12, border:"none",
//                 background: loading ? C.accDark : C.acc,
//                 color:C.bg, fontSize:15, fontWeight:800,
//                 cursor: loading ? "not-allowed" : "pointer",
//                 opacity: loading ? 0.8 : 1,
//                 transition:"background 0.2s, box-shadow 0.2s",
//                 boxShadow: loading ? "none" : `0 0 24px ${C.accGlow}`,
//                 letterSpacing:"0.02em", fontFamily:"inherit",
//               }}
//                 onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.boxShadow=`0 0 36px rgba(0,214,143,0.5)`; }}
//                 onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.boxShadow=`0 0 24px ${C.accGlow}`; }}
//               >
//                 {loading ? "Signing in…" : "Sign in →"}
//               </button>
//             </form>

//             {/* Sign up */}
//             <div style={{
//               marginTop:36, paddingTop:24,
//               borderTop:"1px solid rgba(0,214,143,0.1)",
//               textAlign:"center",
//             }}>
//               <p style={{ fontSize:14, color:C.tx2, marginBottom:14 }}>
//                 Don&apos;t have an account?
//               </p>
//               {switchToSignUp ? (
//                 <button type="button" onClick={switchToSignUp} style={{
//                   width:"100%", padding:"13px 0", borderRadius:12,
//                   border:`1.5px solid ${C.border}`, background:C.accLight,
//                   color:C.acc, fontSize:14, fontWeight:700,
//                   cursor:"pointer", fontFamily:"inherit",
//                   transition:"background 0.15s, border-color 0.15s",
//                 }}
//                   onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background="rgba(0,214,143,0.14)"; }}
//                   onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background=C.accLight; }}
//                 >
//                   Create a free account
//                 </button>
//               ) : (
//                 <Link href="/signup" style={{
//                   display:"block", width:"100%", padding:"13px 0", borderRadius:12,
//                   border:`1.5px solid ${C.border}`, background:C.accLight,
//                   color:C.acc, fontSize:14, fontWeight:700,
//                   textDecoration:"none", textAlign:"center", boxSizing:"border-box",
//                 }}>
//                   Create a free account
//                 </Link>
//               )}
//             </div>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// src/components/loginForm/Login.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginAPI } from "@/services/redux/thunk/authThunk";
import Link from "next/link";

type LoginProps = {
  onClose?: () => void;
  onLoggedIn?: () => void;
  switchToSignUp?: () => void;
  redirectTo?: string;
};

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
    <path fill="#EA4335" d="M24 9.5c3.15 0 5.96 1.08 8.18 2.86l6.1-6.1C34.46 3.08 29.5 1 24 1 14.82 1 7.07 6.48 3.58 14.24l7.14 5.55C12.49 13.48 17.8 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.52 24.5c0-1.64-.15-3.22-.43-4.75H24v9.01h12.7c-.55 2.96-2.2 5.47-4.68 7.16l7.18 5.58C43.38 37.35 46.52 31.35 46.52 24.5z"/>
    <path fill="#FBBC05" d="M10.72 28.21A14.5 14.5 0 0 1 9.5 24c0-1.46.25-2.87.7-4.19l-7.14-5.55A23.94 23.94 0 0 0 0 24c0 3.87.92 7.53 2.55 10.76l8.17-6.55z"/>
    <path fill="#34A853" d="M24 47c5.49 0 10.1-1.82 13.47-4.95l-7.18-5.58c-1.83 1.23-4.18 1.95-6.29 1.95-6.2 0-11.51-4-13.28-9.21l-8.17 6.55C7.07 41.52 14.82 47 24 47z"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-10.94-8 .58-1.77 1.54-3.34 2.78-4.62"/>
    <path d="M1 1l22 22"/><path d="M10.58 10.58a2 2 0 0 0 2.84 2.84"/>
    <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c5 0 9.27 3.11 10.94 8a11.8 11.8 0 0 1-2.31 3.64"/>
  </svg>
);

const C = {
  acc:      "#00d68f",
  accDark:  "#059669",
  accGlow:  "rgba(0,214,143,0.25)",
  accLight: "rgba(0,214,143,0.08)",
  blue:     "#60a5fa",
  bg:       "#040d0a",
  surface:  "rgba(255,255,255,0.04)",
  border:   "rgba(0,214,143,0.18)",
  tx:       "#e2faf1",
  tx2:      "#a7c4b8",
  tx3:      "#5a8a75",
} as const;

export default function Login({
  onClose, onLoggedIn, switchToSignUp, redirectTo = "/dashboard",
}: LoginProps) {
  const router = useRouter();
  const [mounted,  setMounted]  = useState(false);
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [gLoading, setGLoading] = useState(false);
  const [error,    setError]    = useState("");

  useEffect(() => { setMounted(true); }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please enter both email and password"); return; }
    setLoading(true);
    try {
      const data = await loginAPI(email, password);
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("authUser", JSON.stringify(data.user));
      window.dispatchEvent(new Event("auth-changed"));
      onLoggedIn?.(); onClose?.();
      router.push(redirectTo);
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      setError(e?.response?.data?.message || "Login failed");
    } finally { setLoading(false); }
  };

  const handleGoogle = () => { setGLoading(true); window.location.href = `${process.env.NEXT_PUBLIC_API_URL ?? ""}/api/auth/google`; };

  if (!mounted) return <div style={{ minHeight: "100vh", background: C.bg }} />;

  const inp: React.CSSProperties = {
    width: "100%", padding: "13px 16px", borderRadius: 12,
    border: `1.5px solid ${C.border}`, background: C.surface,
    color: C.tx, fontSize: 14, outline: "none",
    fontFamily: "inherit", boxSizing: "border-box",
    transition: "border-color 0.2s, background 0.2s",
  };

  const socialStyle: React.CSSProperties = {
    width: "100%", display: "flex", alignItems: "center",
    justifyContent: "center", gap: 10, padding: "12px 0", borderRadius: 12,
    border: `1.5px solid ${C.border}`, background: "rgba(0,214,143,0.04)",
    color: C.tx, fontSize: 14, fontWeight: 600, cursor: "pointer",
    fontFamily: "inherit", transition: "background 0.15s, border-color 0.15s",
  };

  return (
    <>
      <style>{`
        html, body { margin:0; padding:0; background:${C.bg}; }
        body::before {
          content:''; position:fixed; inset:0; z-index:0; pointer-events:none;
          background-image:
            linear-gradient(rgba(0,214,143,.018) 1px,transparent 1px),
            linear-gradient(90deg,rgba(0,214,143,.018) 1px,transparent 1px);
          background-size:48px 48px;
        }
        @media(min-width:860px){ .lp-left{ display:flex !important; } }
        .lp-input::placeholder { color:${C.tx3}; }
        .lp-input:focus {
          border-color:${C.acc} !important;
          background:rgba(0,214,143,0.06) !important;
          box-shadow:0 0 0 3px rgba(0,214,143,0.12);
        }
        .lp-social:hover { background:rgba(0,214,143,0.09) !important; border-color:${C.acc} !important; }
        @keyframes lp-dot { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes lp-fadein { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .lp-form-in { animation: lp-fadein 0.5s ease 0.1s both; }
      `}</style>

      <div style={{
        minHeight:"100vh", display:"flex", background:C.bg,
        fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
        position:"relative", zIndex:1,
      }}>

        {/* ══ LEFT — new photo ═══════════════════════════════════════════════ */}
        <div className="lp-left" style={{
          display:"none", flex:"0 0 55%",
          position:"relative", overflow:"hidden", minHeight:"100vh",
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/office-bg.png"
            alt="Team collaboration"
            style={{
              position:"absolute", inset:0,
              width:"100%", height:"100%",
              objectFit:"cover", objectPosition:"center 25%",
              display:"block",
            }}
          />

          {/* Rich gradient overlay — left dark, right light */}
          <div style={{
            position:"absolute", inset:0,
            background:"linear-gradient(105deg, rgba(4,13,10,0.92) 0%, rgba(4,13,10,0.60) 40%, rgba(4,13,10,0.20) 70%, rgba(4,13,10,0.05) 100%)",
          }}/>

          {/* Green vignette bottom */}
          <div style={{
            position:"absolute", inset:0,
            background:"linear-gradient(to top, rgba(4,13,10,0.88) 0%, transparent 45%)",
          }}/>

          {/* Content */}
          <div style={{
            position:"absolute", inset:0,
            display:"flex", flexDirection:"column",
            justifyContent:"space-between", padding:"44px 56px",
          }}>

            {/* Logo */}
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{
                width:42, height:42, borderRadius:12, flexShrink:0,
                background:C.acc,
                display:"flex", alignItems:"center", justifyContent:"center",
                boxShadow:`0 4px 24px ${C.accGlow}`,
              }}>
                <svg width="22" height="22" viewBox="0 0 20 20" fill={C.bg}>
                  <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 3a3 3 0 110 6 3 3 0 010-6zm0 9.5c-2.33 0-4.32-1.45-5.12-3.5h10.24c-.8 2.05-2.79 3.5-5.12 3.5z"/>
                </svg>
              </div>
              <span style={{ fontSize:22, fontWeight:700, color:"#fff", letterSpacing:"-0.02em" }}>
                TalentFlow <span style={{ color:C.acc }}>AI</span>
              </span>
            </div>

            {/* Bottom block */}
            <div>
              {/* Live badge */}
              <div style={{
                display:"inline-flex", alignItems:"center", gap:8,
                background:"rgba(0,214,143,0.12)", border:`1px solid ${C.border}`,
                borderRadius:999, padding:"6px 16px", marginBottom:22,
              }}>
                <span style={{
                  width:7, height:7, borderRadius:"50%", background:C.acc, flexShrink:0,
                  animation:"lp-dot 1.6s infinite",
                }}/>
                <span style={{ fontSize:12, fontWeight:700, color:C.acc, letterSpacing:"0.05em" }}>
                  AI-Powered Recruitment
                </span>
              </div>

              <h2 style={{
                fontSize:36, fontWeight:800, color:"#fff",
                lineHeight:1.18, marginBottom:16,
                textShadow:"0 2px 24px rgba(0,0,0,0.5)",
              }}>
                Hire smarter,<br/>
                <span style={{
                  background:`linear-gradient(90deg,${C.acc},${C.blue})`,
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                }}>move faster</span>
              </h2>

              <p style={{
                fontSize:15, color:"rgba(255,255,255,0.72)",
                lineHeight:1.7, maxWidth:320, marginBottom:32,
              }}>
                From job posting to offer letter — automate your entire recruitment pipeline with AI that actually works.
              </p>

              {/* Feature grid */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:36 }}>
                {[
                  { icon:"🤖", label:"AI Resume Screening" },
                  { icon:"📋", label:"Smart Assessments"   },
                  { icon:"📅", label:"Auto Scheduling"      },
                  { icon:"📊", label:"Live Analytics"       },
                ].map(f => (
                  <div key={f.label} style={{
                    display:"flex", alignItems:"center", gap:10,
                    background:"rgba(0,214,143,0.07)",
                    border:`1px solid rgba(0,214,143,0.14)`,
                    borderRadius:10, padding:"10px 14px",
                  }}>
                    <span style={{ fontSize:16 }}>{f.icon}</span>
                    <span style={{ fontSize:12, fontWeight:600, color:C.tx2 }}>{f.label}</span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div style={{ display:"flex", gap:0 }}>
                {[
                  { num:"2.4k+", lbl:"Companies"   },
                  { num:"98%",   lbl:"Satisfaction" },
                  { num:"10x",   lbl:"Faster hiring"},
                ].map((s,i) => (
                  <div key={s.lbl} style={{
                    flex:1,
                    paddingLeft: i > 0 ? 28 : 0,
                    borderLeft:  i > 0 ? "1px solid rgba(0,214,143,0.2)" : "none",
                    marginLeft:  i > 0 ? 28 : 0,
                  }}>
                    <div style={{ fontSize:28, fontWeight:800, color:C.acc, lineHeight:1 }}>{s.num}</div>
                    <div style={{ fontSize:11, color:C.tx3, marginTop:5, fontWeight:500 }}>{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══ RIGHT — form ══════════════════════════════════════════════════════ */}
        <div style={{
          flex:1, minHeight:"100vh",
          display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center",
          padding:"48px 28px",
          background:"transparent",
          overflowY:"auto", position:"relative", zIndex:1,
        }}>
          <div className="lp-form-in" style={{ width:"100%", maxWidth:380 }}>

            {/* Header */}
            <div style={{ textAlign:"center", marginBottom:30 }}>
              <p style={{
                fontSize:11, fontWeight:700, letterSpacing:"0.12em",
                textTransform:"uppercase", color:C.acc, marginBottom:8,
              }}>
                Welcome back
              </p>
              <h1 style={{
                fontFamily:"'DM Serif Display',Georgia,serif",
                fontSize:28, fontWeight:400, color:C.tx,
                lineHeight:1.2, marginBottom:6,
              }}>
                Sign in to TalentFlow
              </h1>
              <p style={{ fontSize:13, color:C.tx3 }}>Access your recruitment dashboard</p>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                marginBottom:16, borderRadius:10,
                background:"rgba(248,113,113,0.1)",
                border:"1px solid rgba(248,113,113,0.3)",
                padding:"11px 16px", fontSize:13, color:"#f87171",
              }}>{error}</div>
            )}

            {/* Google */}
            <button type="button" onClick={handleGoogle}
              disabled={gLoading} className="lp-social"
              style={{ ...socialStyle, marginBottom:24, opacity:gLoading?0.65:1 }}
            >
              {gLoading ? <span style={{fontSize:13,color:C.tx2}}>Redirecting…</span>
                : <><GoogleIcon /><span>Continue with Google</span></>}
            </button>



            {/* OR */}
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:22 }}>
              <div style={{ flex:1, height:1, background:"rgba(0,214,143,0.15)" }}/>
              <span style={{ fontSize:11, color:C.tx3, fontWeight:700, letterSpacing:"0.08em" }}>OR</span>
              <div style={{ flex:1, height:1, background:"rgba(0,214,143,0.15)" }}/>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} noValidate>
              <div style={{ marginBottom:12 }}>
                <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.tx3, marginBottom:6, letterSpacing:"0.06em", textTransform:"uppercase" }}>
                  Email
                </label>
                <input type="email" placeholder="you@company.com" value={email}
                  onChange={e => setEmail(e.target.value)} autoComplete="email"
                  className="lp-input" style={inp}
                />
              </div>

              <div style={{ marginBottom:8 }}>
                <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.tx3, marginBottom:6, letterSpacing:"0.06em", textTransform:"uppercase" }}>
                  Password
                </label>
                <div style={{ position:"relative" }}>
                  <input type={showPw?"text":"password"} placeholder="Enter your password"
                    value={password} onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="lp-input" style={{ ...inp, paddingRight:48 }}
                  />
                  <button type="button" onClick={() => setShowPw(v => !v)}
                    aria-label={showPw?"Hide":"Show"}
                    style={{
                      position:"absolute", right:14, top:"50%",
                      transform:"translateY(-50%)",
                      background:"none", border:"none", cursor:"pointer",
                      color:C.tx3, padding:0, display:"flex", alignItems:"center",
                    }}
                  >
                    {showPw ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              <div style={{ textAlign:"right", marginBottom:20 }}>
                <Link href="/forget-password" style={{ fontSize:12, color:C.acc, textDecoration:"none", fontWeight:600 }}>
                  Forgot password?
                </Link>
              </div>

              {/* Sign in — brand green CTA */}
              <button type="submit" disabled={loading} style={{
                width:"100%", padding:"14px 0", borderRadius:12, border:"none",
                background: loading ? C.accDark : C.acc,
                color:C.bg, fontSize:15, fontWeight:800,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.8 : 1,
                transition:"background 0.2s, box-shadow 0.2s",
                boxShadow: loading ? "none" : `0 0 24px ${C.accGlow}`,
                letterSpacing:"0.02em", fontFamily:"inherit",
              }}
                onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.boxShadow=`0 0 36px rgba(0,214,143,0.5)`; }}
                onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.boxShadow=`0 0 24px ${C.accGlow}`; }}
              >
                {loading ? "Signing in…" : "Sign in →"}
              </button>
            </form>

            {/* Sign up */}
            <div style={{
              marginTop:36, paddingTop:24,
              borderTop:"1px solid rgba(0,214,143,0.1)",
              textAlign:"center",
            }}>
              <p style={{ fontSize:14, color:C.tx2, marginBottom:14 }}>
                Don&apos;t have an account?
              </p>
              {switchToSignUp ? (
                <button type="button" onClick={switchToSignUp} style={{
                  width:"100%", padding:"13px 0", borderRadius:12,
                  border:`1.5px solid ${C.border}`, background:C.accLight,
                  color:C.acc, fontSize:14, fontWeight:700,
                  cursor:"pointer", fontFamily:"inherit",
                  transition:"background 0.15s, border-color 0.15s",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background="rgba(0,214,143,0.14)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background=C.accLight; }}
                >
                  Create a free account
                </button>
              ) : (
                <Link href="/signup" style={{
                  display:"block", width:"100%", padding:"13px 0", borderRadius:12,
                  border:`1.5px solid ${C.border}`, background:C.accLight,
                  color:C.acc, fontSize:14, fontWeight:700,
                  textDecoration:"none", textAlign:"center", boxSizing:"border-box",
                }}>
                  Create a free account
                </Link>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
