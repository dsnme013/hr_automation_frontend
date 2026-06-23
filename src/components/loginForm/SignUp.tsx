// // src/components/loginForm/SignUp.tsx
// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { signupAPI } from "@/services/redux/thunk/authThunk";
// import Link from "next/link";

// type SignUpProps = {
//   onClose?: () => void;
//   switchToLogin?: () => void;
//   redirectTo?: string;
//   autoLogin?: boolean;
// };

// const GoogleIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 48 48" style={{ flexShrink:0 }}>
//     <path fill="#EA4335" d="M24 9.5c3.15 0 5.96 1.08 8.18 2.86l6.1-6.1C34.46 3.08 29.5 1 24 1 14.82 1 7.07 6.48 3.58 14.24l7.14 5.55C12.49 13.48 17.8 9.5 24 9.5z"/>
//     <path fill="#4285F4" d="M46.52 24.5c0-1.64-.15-3.22-.43-4.75H24v9.01h12.7c-.55 2.96-2.2 5.47-4.68 7.16l7.18 5.58C43.38 37.35 46.52 31.35 46.52 24.5z"/>
//     <path fill="#FBBC05" d="M10.72 28.21A14.5 14.5 0 0 1 9.5 24c0-1.46.25-2.87.7-4.19l-7.14-5.55A23.94 23.94 0 0 0 0 24c0 3.87.92 7.53 2.55 10.76l8.17-6.55z"/>
//     <path fill="#34A853" d="M24 47c5.49 0 10.1-1.82 13.47-4.95l-7.18-5.58c-1.83 1.23-4.18 1.95-6.29 1.95-6.2 0-11.51-4-13.28-9.21l-8.17 6.55C7.07 41.52 14.82 47 24 47z"/>
//   </svg>
// );

// const AppleIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 814 1000" style={{ flexShrink:0 }}>
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
//   acc:"#00d68f", accDark:"#059669", accGlow:"rgba(0,214,143,0.25)",
//   accLight:"rgba(0,214,143,0.08)", blue:"#60a5fa",
//   bg:"#040d0a", surface:"rgba(255,255,255,0.04)",
//   border:"rgba(0,214,143,0.18)", tx:"#e2faf1", tx2:"#a7c4b8", tx3:"#5a8a75",
// } as const;

// function getStrength(pw: string): { level:number; label:string; color:string } {
//   if (!pw) return { level:0, label:"", color:"" };
//   let s = 0;
//   if (pw.length >= 8) s++;
//   if (pw.length >= 12) s++;
//   if (/[A-Z]/.test(pw)) s++;
//   if (/[0-9]/.test(pw)) s++;
//   if (/[^A-Za-z0-9]/.test(pw)) s++;
//   if (s <= 1) return { level:1, label:"Weak",   color:"#f87171" };
//   if (s <= 3) return { level:2, label:"Fair",   color:"#fbbf24" };
//   if (s === 4) return { level:3, label:"Good",   color:C.blue };
//   return              { level:4, label:"Strong", color:C.acc  };
// }

// export default function SignUp({
//   onClose, switchToLogin, redirectTo = "/dashboard", autoLogin = true,
// }: SignUpProps) {
//   const router = useRouter();
//   const [mounted,  setMounted]  = useState(false);
//   const [form,     setForm]     = useState({ first_name:"", last_name:"", email:"", password:"" });
//   const [showPw,   setShowPw]   = useState(false);
//   const [loading,  setLoading]  = useState(false);
//   const [gLoading, setGLoading] = useState(false);
//   const [aLoading, setALoading] = useState(false);
//   const [error,    setError]    = useState("");

//   useEffect(() => { setMounted(true); }, []);

//   const strength = getStrength(form.password);

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     const { first_name, last_name, email, password } = form;
//     if (!first_name||!last_name||!email||!password) { setError("All fields are required"); return; }
//     setLoading(true);
//     try {
//       const data = await signupAPI(first_name, last_name, email, password);
//       if (autoLogin && data?.token) {
//         localStorage.setItem("authToken", data.token);
//         localStorage.setItem("authUser", JSON.stringify(data.user));
//         window.dispatchEvent(new Event("auth-changed"));
//         onClose?.(); router.push(redirectTo);
//       } else { switchToLogin?.(); }
//     } catch (err: unknown) {
//       const e = err as { response?: { data?: { message?: string } } };
//       setError(e?.response?.data?.message || "Signup failed");
//     } finally { setLoading(false); }
//   };

//   const handleGoogle = () => { setGLoading(true); window.location.href = `${process.env.NEXT_PUBLIC_API_URL ?? ""}/api/auth/google`; };
//   const handleApple  = () => { setALoading(true); window.location.href = `${process.env.NEXT_PUBLIC_API_URL ?? ""}/api/auth/apple`; };

//   if (!mounted) return <div style={{ minHeight:"100vh", background:C.bg }} />;

//   const inp: React.CSSProperties = {
//     width:"100%", padding:"12px 14px", borderRadius:12,
//     border:`1.5px solid ${C.border}`, background:C.surface,
//     color:C.tx, fontSize:14, outline:"none",
//     fontFamily:"inherit", boxSizing:"border-box",
//     transition:"border-color 0.2s, background 0.2s",
//   };

//   const socialStyle: React.CSSProperties = {
//     width:"100%", display:"flex", alignItems:"center",
//     justifyContent:"center", gap:10, padding:"11px 0", borderRadius:12,
//     border:`1.5px solid ${C.border}`, background:"rgba(0,214,143,0.04)",
//     color:C.tx, fontSize:14, fontWeight:600, cursor:"pointer",
//     fontFamily:"inherit", transition:"background 0.15s, border-color 0.15s",
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
//         @media(min-width:860px){ .su-left{ display:flex !important; } }
//         .su-input::placeholder { color:${C.tx3}; }
//         .su-input:focus {
//           border-color:${C.acc} !important;
//           background:rgba(0,214,143,0.06) !important;
//           box-shadow:0 0 0 3px rgba(0,214,143,0.12);
//         }
//         .su-social:hover { background:rgba(0,214,143,0.09) !important; border-color:${C.acc} !important; }
//         @keyframes su-dot    { 0%,100%{opacity:1} 50%{opacity:.4} }
//         @keyframes su-fadein { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
//         .su-form-in { animation:su-fadein 0.5s ease 0.1s both; }
//       `}</style>

//       <div style={{
//         minHeight:"100vh", display:"flex", background:C.bg,
//         fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
//         position:"relative", zIndex:1,
//       }}>

//         {/* ══ LEFT — photo panel (same as Login) ══════════════════════════════ */}
//         <div className="su-left" style={{
//           display:"none", flex:"0 0 55%",
//           position:"relative", overflow:"hidden", minHeight:"100vh",
//         }}>
//           {/* eslint-disable-next-line @next/next/no-img-element */}
//           <img src="/ChatGPT Image Apr 15, 2026, 12_31_04 AM.png" alt="Team collaboration"
//             style={{
//               position:"absolute", inset:0, width:"100%", height:"100%",
//               objectFit:"cover", objectPosition:"center 25%", display:"block",
//             }}
//           />
//           <div style={{
//             position:"absolute", inset:0,
//             background:"linear-gradient(105deg,rgba(4,13,10,0.92) 0%,rgba(4,13,10,0.60) 40%,rgba(4,13,10,0.20) 70%,rgba(4,13,10,0.05) 100%)",
//           }}/>
//           <div style={{
//             position:"absolute", inset:0,
//             background:"linear-gradient(to top,rgba(4,13,10,0.88) 0%,transparent 45%)",
//           }}/>

//           <div style={{
//             position:"absolute", inset:0,
//             display:"flex", flexDirection:"column",
//             justifyContent:"space-between", padding:"44px 56px",
//           }}>
//             {/* Logo */}
//             <div style={{ display:"flex", alignItems:"center", gap:12 }}>
//               <div style={{
//                 width:42, height:42, borderRadius:12, flexShrink:0,
//                 background:C.acc, display:"flex", alignItems:"center", justifyContent:"center",
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

//             <div>
//               <div style={{
//                 display:"inline-flex", alignItems:"center", gap:8,
//                 background:"rgba(0,214,143,0.12)", border:`1px solid ${C.border}`,
//                 borderRadius:999, padding:"6px 16px", marginBottom:22,
//               }}>
//                 <span style={{ width:7, height:7, borderRadius:"50%", background:C.acc, flexShrink:0, animation:"su-dot 1.6s infinite" }}/>
//                 <span style={{ fontSize:12, fontWeight:700, color:C.acc, letterSpacing:"0.05em" }}>Start for free today</span>
//               </div>

//               <h2 style={{
//                 fontSize:36, fontWeight:800, color:"#fff",
//                 lineHeight:1.18, marginBottom:16,
//                 textShadow:"0 2px 24px rgba(0,0,0,0.5)",
//               }}>
//                 Join 2,400+<br/>
//                 <span style={{
//                   background:`linear-gradient(90deg,${C.acc},${C.blue})`,
//                   WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
//                 }}>forward-thinking teams</span>
//               </h2>

//               <p style={{
//                 fontSize:15, color:"rgba(255,255,255,0.72)",
//                 lineHeight:1.7, maxWidth:320, marginBottom:32,
//               }}>
//                 Set up your recruitment pipeline in minutes. No credit card required — start your 14-day free trial now.
//               </p>

//               {/* Benefits */}
//               <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:36 }}>
//                 {[
//                   "✓  Unlimited job postings",
//                   "✓  AI screening on every application",
//                   "✓  Automated assessment dispatch",
//                   "✓  Real-time candidate dashboard",
//                 ].map(b => (
//                   <div key={b} style={{ fontSize:13, fontWeight:600, color:"rgba(255,255,255,0.78)" }}>{b}</div>
//                 ))}
//               </div>

//               <div style={{ display:"flex", gap:0 }}>
//                 {[
//                   { num:"Free",  lbl:"14-day trial"  },
//                   { num:"0",     lbl:"Setup fees"     },
//                   { num:"24/7",  lbl:"Support"        },
//                 ].map((s,i) => (
//                   <div key={s.lbl} style={{
//                     flex:1,
//                     paddingLeft: i>0?28:0, marginLeft: i>0?28:0,
//                     borderLeft:  i>0?"1px solid rgba(0,214,143,0.2)":"none",
//                   }}>
//                     <div style={{ fontSize:24, fontWeight:800, color:C.acc, lineHeight:1 }}>{s.num}</div>
//                     <div style={{ fontSize:11, color:C.tx3, marginTop:5, fontWeight:500 }}>{s.lbl}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ══ RIGHT — signup form ══════════════════════════════════════════════ */}
//         <div style={{
//           flex:1, minHeight:"100vh",
//           display:"flex", flexDirection:"column",
//           alignItems:"center", justifyContent:"center",
//           padding:"48px 28px",
//           background:"transparent", overflowY:"auto",
//           position:"relative", zIndex:1,
//         }}>
//           <div className="su-form-in" style={{ width:"100%", maxWidth:380 }}>

//             {/* Header */}
//             <div style={{ textAlign:"center", marginBottom:26 }}>
//               <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.acc, marginBottom:8 }}>
//                 Get started free
//               </p>
//               <h1 style={{
//                 fontFamily:"'DM Serif Display',Georgia,serif",
//                 fontSize:28, fontWeight:400, color:C.tx, lineHeight:1.2, marginBottom:6,
//               }}>
//                 Create your account
//               </h1>
//               <p style={{ fontSize:13, color:C.tx3 }}>14-day free trial · No credit card needed</p>
//             </div>

//             {/* Error */}
//             {error && (
//               <div style={{
//                 marginBottom:16, borderRadius:10,
//                 background:"rgba(248,113,113,0.1)", border:"1px solid rgba(248,113,113,0.3)",
//                 padding:"11px 16px", fontSize:13, color:"#f87171",
//               }}>{error}</div>
//             )}

//             {/* Google */}
//             <button type="button" onClick={handleGoogle}
//               disabled={gLoading||aLoading} className="su-social"
//               style={{ ...socialStyle, marginBottom:10, opacity:(gLoading||aLoading)?0.65:1 }}
//             >
//               {gLoading?<span style={{fontSize:13,color:C.tx2}}>Redirecting…</span>:<><GoogleIcon/><span>Sign up with Google</span></>}
//             </button>

//             {/* Apple */}
//             <button type="button" onClick={handleApple}
//               disabled={gLoading||aLoading} className="su-social"
//               style={{ ...socialStyle, marginBottom:22, opacity:(gLoading||aLoading)?0.65:1 }}
//             >
//               {aLoading?<span style={{fontSize:13,color:C.tx2}}>Redirecting…</span>:<><AppleIcon/><span>Sign up with Apple</span></>}
//             </button>

//             {/* OR */}
//             <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
//               <div style={{ flex:1, height:1, background:"rgba(0,214,143,0.15)" }}/>
//               <span style={{ fontSize:11, color:C.tx3, fontWeight:700, letterSpacing:"0.08em" }}>OR</span>
//               <div style={{ flex:1, height:1, background:"rgba(0,214,143,0.15)" }}/>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSignup} noValidate>
//               {/* Name row */}
//               <div style={{ display:"flex", gap:10, marginBottom:12 }}>
//                 <div style={{ flex:1 }}>
//                   <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.tx3, marginBottom:5, letterSpacing:"0.06em", textTransform:"uppercase" }}>First name</label>
//                   <input type="text" placeholder="Rahul" value={form.first_name}
//                     onChange={e => setForm({...form,first_name:e.target.value})}
//                     autoComplete="given-name" className="su-input" style={inp}
//                   />
//                 </div>
//                 <div style={{ flex:1 }}>
//                   <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.tx3, marginBottom:5, letterSpacing:"0.06em", textTransform:"uppercase" }}>Last name</label>
//                   <input type="text" placeholder="Sharma" value={form.last_name}
//                     onChange={e => setForm({...form,last_name:e.target.value})}
//                     autoComplete="family-name" className="su-input" style={inp}
//                   />
//                 </div>
//               </div>

//               {/* Email */}
//               <div style={{ marginBottom:12 }}>
//                 <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.tx3, marginBottom:5, letterSpacing:"0.06em", textTransform:"uppercase" }}>Email</label>
//                 <input type="email" placeholder="you@company.com" value={form.email}
//                   onChange={e => setForm({...form,email:e.target.value})}
//                   autoComplete="email" className="su-input" style={inp}
//                 />
//               </div>

//               {/* Password */}
//               <div style={{ marginBottom:16 }}>
//                 <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.tx3, marginBottom:5, letterSpacing:"0.06em", textTransform:"uppercase" }}>Password</label>
//                 <div style={{ position:"relative" }}>
//                   <input type={showPw?"text":"password"} placeholder="Create a strong password"
//                     value={form.password} onChange={e => setForm({...form,password:e.target.value})}
//                     autoComplete="new-password" className="su-input" style={{ ...inp, paddingRight:48 }}
//                   />
//                   <button type="button" onClick={() => setShowPw(v => !v)}
//                     aria-label={showPw?"Hide":"Show"}
//                     style={{
//                       position:"absolute", right:14, top:"50%", transform:"translateY(-50%)",
//                       background:"none", border:"none", cursor:"pointer",
//                       color:C.tx3, padding:0, display:"flex", alignItems:"center",
//                     }}
//                   >
//                     {showPw ? <EyeOffIcon/> : <EyeIcon/>}
//                   </button>
//                 </div>
//                 {/* Strength bar */}
//                 {form.password.length > 0 && (
//                   <div style={{ marginTop:8 }}>
//                     <div style={{ display:"flex", gap:4 }}>
//                       {[1,2,3,4].map(i => (
//                         <div key={i} style={{
//                           flex:1, height:3, borderRadius:999,
//                           background: i<=strength.level ? strength.color : "rgba(0,214,143,0.1)",
//                           transition:"background 0.25s",
//                         }}/>
//                       ))}
//                     </div>
//                     {strength.label && (
//                       <p style={{ fontSize:11, marginTop:4, color:strength.color, fontWeight:600 }}>{strength.label}</p>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Create account */}
//               <button type="submit" disabled={loading} style={{
//                 width:"100%", padding:"14px 0", borderRadius:12, border:"none",
//                 background: loading ? C.accDark : C.acc,
//                 color:C.bg, fontSize:15, fontWeight:800,
//                 cursor: loading?"not-allowed":"pointer", opacity: loading?0.8:1,
//                 transition:"background 0.2s, box-shadow 0.2s",
//                 boxShadow: loading?"none":`0 0 24px ${C.accGlow}`,
//                 letterSpacing:"0.02em", fontFamily:"inherit",
//               }}
//                 onMouseEnter={e => { if(!loading)(e.currentTarget as HTMLButtonElement).style.boxShadow=`0 0 36px rgba(0,214,143,0.5)`; }}
//                 onMouseLeave={e => { if(!loading)(e.currentTarget as HTMLButtonElement).style.boxShadow=`0 0 24px ${C.accGlow}`; }}
//               >
//                 {loading ? "Creating account…" : "Create account →"}
//               </button>
//             </form>

//             {/* Terms */}
//             <p style={{ fontSize:11, color:C.tx3, marginTop:12, lineHeight:1.6, textAlign:"center" }}>
//               By signing up, you agree to our{" "}
//               <Link href="/terms" style={{ color:C.acc, textDecoration:"none" }}>Terms</Link>{" "}and{" "}
//               <Link href="/privacy" style={{ color:C.acc, textDecoration:"none" }}>Privacy Policy</Link>
//             </p>

//             {/* Sign in */}
//             <div style={{
//               marginTop:28, paddingTop:24,
//               borderTop:"1px solid rgba(0,214,143,0.1)",
//               textAlign:"center",
//             }}>
//               <p style={{ fontSize:14, color:C.tx2, marginBottom:14 }}>
//                 Already have an account?
//               </p>
//               {switchToLogin ? (
//                 <button type="button" onClick={switchToLogin} style={{
//                   width:"100%", padding:"13px 0", borderRadius:12,
//                   border:`1.5px solid ${C.border}`, background:C.accLight,
//                   color:C.acc, fontSize:14, fontWeight:700,
//                   cursor:"pointer", fontFamily:"inherit",
//                   transition:"background 0.15s",
//                 }}
//                   onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background="rgba(0,214,143,0.14)"; }}
//                   onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background=C.accLight; }}
//                 >
//                   Sign in instead
//                 </button>
//               ) : (
//                 <Link href="/login" style={{
//                   display:"block", width:"100%", padding:"13px 0", borderRadius:12,
//                   border:`1.5px solid ${C.border}`, background:C.accLight,
//                   color:C.acc, fontSize:14, fontWeight:700,
//                   textDecoration:"none", textAlign:"center", boxSizing:"border-box",
//                 }}>
//                   Sign in instead
//                 </Link>
//               )}
//             </div>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// src/components/loginForm/SignUp.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signupAPI } from "@/services/redux/thunk/authThunk";
import Link from "next/link";

type SignUpProps = {
  onClose?: () => void;
  switchToLogin?: () => void;
  redirectTo?: string;
  autoLogin?: boolean;
};

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" style={{ flexShrink:0 }}>
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
  acc:"#00d68f", accDark:"#059669", accGlow:"rgba(0,214,143,0.25)",
  accLight:"rgba(0,214,143,0.08)", blue:"#60a5fa",
  bg:"#040d0a", surface:"rgba(255,255,255,0.04)",
  border:"rgba(0,214,143,0.18)", tx:"#e2faf1", tx2:"#a7c4b8", tx3:"#5a8a75",
} as const;

function getStrength(pw: string): { level:number; label:string; color:string } {
  if (!pw) return { level:0, label:"", color:"" };
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  if (s <= 1) return { level:1, label:"Weak",   color:"#f87171" };
  if (s <= 3) return { level:2, label:"Fair",   color:"#fbbf24" };
  if (s === 4) return { level:3, label:"Good",   color:C.blue };
  return              { level:4, label:"Strong", color:C.acc  };
}

export default function SignUp({
  onClose, switchToLogin, redirectTo = "/dashboard", autoLogin = true,
}: SignUpProps) {
  const router = useRouter();
  const [mounted,  setMounted]  = useState(false);
  const [form,     setForm]     = useState({ first_name:"", last_name:"", email:"", password:"" });
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [gLoading, setGLoading] = useState(false);
  const [error,    setError]    = useState("");

  useEffect(() => { setMounted(true); }, []);

  const strength = getStrength(form.password);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { first_name, last_name, email, password } = form;
    if (!first_name||!last_name||!email||!password) { setError("All fields are required"); return; }
    setLoading(true);
    try {
      const data = await signupAPI(first_name, last_name, email, password);
      if (autoLogin && data?.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("authUser", JSON.stringify(data.user));
        window.dispatchEvent(new Event("auth-changed"));
        onClose?.(); router.push(redirectTo);
      } else { switchToLogin?.(); }
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      setError(e?.response?.data?.message || "Signup failed");
    } finally { setLoading(false); }
  };

  const handleGoogle = () => { setGLoading(true); window.location.href = `${process.env.NEXT_PUBLIC_API_URL ?? ""}/api/auth/google`; };

  if (!mounted) return <div style={{ minHeight:"100vh", background:C.bg }} />;

  const inp: React.CSSProperties = {
    width:"100%", padding:"12px 14px", borderRadius:12,
    border:`1.5px solid ${C.border}`, background:C.surface,
    color:C.tx, fontSize:14, outline:"none",
    fontFamily:"inherit", boxSizing:"border-box",
    transition:"border-color 0.2s, background 0.2s",
  };

  const socialStyle: React.CSSProperties = {
    width:"100%", display:"flex", alignItems:"center",
    justifyContent:"center", gap:10, padding:"11px 0", borderRadius:12,
    border:`1.5px solid ${C.border}`, background:"rgba(0,214,143,0.04)",
    color:C.tx, fontSize:14, fontWeight:600, cursor:"pointer",
    fontFamily:"inherit", transition:"background 0.15s, border-color 0.15s",
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
        @media(min-width:860px){ .su-left{ display:flex !important; } }
        .su-input::placeholder { color:${C.tx3}; }
        .su-input:focus {
          border-color:${C.acc} !important;
          background:rgba(0,214,143,0.06) !important;
          box-shadow:0 0 0 3px rgba(0,214,143,0.12);
        }
        .su-social:hover { background:rgba(0,214,143,0.09) !important; border-color:${C.acc} !important; }
        @keyframes su-dot    { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes su-fadein { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .su-form-in { animation:su-fadein 0.5s ease 0.1s both; }
      `}</style>

      <div style={{
        minHeight:"100vh", display:"flex", background:C.bg,
        fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
        position:"relative", zIndex:1,
      }}>

        {/* ══ LEFT — photo panel (same as Login) ══════════════════════════════ */}
        <div className="su-left" style={{
          display:"none", flex:"0 0 55%",
          position:"relative", overflow:"hidden", minHeight:"100vh",
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/office-bg.png" alt="Team collaboration"
            style={{
              position:"absolute", inset:0, width:"100%", height:"100%",
              objectFit:"cover", objectPosition:"center 25%", display:"block",
            }}
          />
          <div style={{
            position:"absolute", inset:0,
            background:"linear-gradient(105deg,rgba(4,13,10,0.92) 0%,rgba(4,13,10,0.60) 40%,rgba(4,13,10,0.20) 70%,rgba(4,13,10,0.05) 100%)",
          }}/>
          <div style={{
            position:"absolute", inset:0,
            background:"linear-gradient(to top,rgba(4,13,10,0.88) 0%,transparent 45%)",
          }}/>

          <div style={{
            position:"absolute", inset:0,
            display:"flex", flexDirection:"column",
            justifyContent:"space-between", padding:"44px 56px",
          }}>
            {/* Logo */}
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{
                width:42, height:42, borderRadius:12, flexShrink:0,
                background:C.acc, display:"flex", alignItems:"center", justifyContent:"center",
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

            <div>
              <div style={{
                display:"inline-flex", alignItems:"center", gap:8,
                background:"rgba(0,214,143,0.12)", border:`1px solid ${C.border}`,
                borderRadius:999, padding:"6px 16px", marginBottom:22,
              }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:C.acc, flexShrink:0, animation:"su-dot 1.6s infinite" }}/>
                <span style={{ fontSize:12, fontWeight:700, color:C.acc, letterSpacing:"0.05em" }}>Start for free today</span>
              </div>

              <h2 style={{
                fontSize:36, fontWeight:800, color:"#fff",
                lineHeight:1.18, marginBottom:16,
                textShadow:"0 2px 24px rgba(0,0,0,0.5)",
              }}>
                Join 2,400+<br/>
                <span style={{
                  background:`linear-gradient(90deg,${C.acc},${C.blue})`,
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                }}>forward-thinking teams</span>
              </h2>

              <p style={{
                fontSize:15, color:"rgba(255,255,255,0.72)",
                lineHeight:1.7, maxWidth:320, marginBottom:32,
              }}>
                Set up your recruitment pipeline in minutes. No credit card required — start your 14-day free trial now.
              </p>

              {/* Benefits */}
              <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:36 }}>
                {[
                  "✓  Unlimited job postings",
                  "✓  AI screening on every application",
                  "✓  Automated assessment dispatch",
                  "✓  Real-time candidate dashboard",
                ].map(b => (
                  <div key={b} style={{ fontSize:13, fontWeight:600, color:"rgba(255,255,255,0.78)" }}>{b}</div>
                ))}
              </div>

              <div style={{ display:"flex", gap:0 }}>
                {[
                  { num:"Free",  lbl:"14-day trial"  },
                  { num:"0",     lbl:"Setup fees"     },
                  { num:"24/7",  lbl:"Support"        },
                ].map((s,i) => (
                  <div key={s.lbl} style={{
                    flex:1,
                    paddingLeft: i>0?28:0, marginLeft: i>0?28:0,
                    borderLeft:  i>0?"1px solid rgba(0,214,143,0.2)":"none",
                  }}>
                    <div style={{ fontSize:24, fontWeight:800, color:C.acc, lineHeight:1 }}>{s.num}</div>
                    <div style={{ fontSize:11, color:C.tx3, marginTop:5, fontWeight:500 }}>{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══ RIGHT — signup form ══════════════════════════════════════════════ */}
        <div style={{
          flex:1, minHeight:"100vh",
          display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center",
          padding:"48px 28px",
          background:"transparent", overflowY:"auto",
          position:"relative", zIndex:1,
        }}>
          <div className="su-form-in" style={{ width:"100%", maxWidth:380 }}>

            {/* Header */}
            <div style={{ textAlign:"center", marginBottom:26 }}>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.acc, marginBottom:8 }}>
                Get started free
              </p>
              <h1 style={{
                fontFamily:"'DM Serif Display',Georgia,serif",
                fontSize:28, fontWeight:400, color:C.tx, lineHeight:1.2, marginBottom:6,
              }}>
                Create your account
              </h1>
              <p style={{ fontSize:13, color:C.tx3 }}>14-day free trial · No credit card needed</p>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                marginBottom:16, borderRadius:10,
                background:"rgba(248,113,113,0.1)", border:"1px solid rgba(248,113,113,0.3)",
                padding:"11px 16px", fontSize:13, color:"#f87171",
              }}>{error}</div>
            )}

            {/* Google */}
            <button type="button" onClick={handleGoogle}
              disabled={gLoading} className="su-social"
              style={{ ...socialStyle, marginBottom:24, opacity:gLoading?0.65:1 }}
            >
              {gLoading?<span style={{fontSize:13,color:C.tx2}}>Redirecting…</span>:<><GoogleIcon/><span>Sign up with Google</span></>}
            </button>



            {/* OR */}
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
              <div style={{ flex:1, height:1, background:"rgba(0,214,143,0.15)" }}/>
              <span style={{ fontSize:11, color:C.tx3, fontWeight:700, letterSpacing:"0.08em" }}>OR</span>
              <div style={{ flex:1, height:1, background:"rgba(0,214,143,0.15)" }}/>
            </div>

            {/* Form */}
            <form onSubmit={handleSignup} noValidate>
              {/* Name row */}
              <div style={{ display:"flex", gap:10, marginBottom:12 }}>
                <div style={{ flex:1 }}>
                  <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.tx3, marginBottom:5, letterSpacing:"0.06em", textTransform:"uppercase" }}>First name</label>
                  <input type="text" placeholder="Rahul" value={form.first_name}
                    onChange={e => setForm({...form,first_name:e.target.value})}
                    autoComplete="given-name" className="su-input" style={inp}
                  />
                </div>
                <div style={{ flex:1 }}>
                  <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.tx3, marginBottom:5, letterSpacing:"0.06em", textTransform:"uppercase" }}>Last name</label>
                  <input type="text" placeholder="Sharma" value={form.last_name}
                    onChange={e => setForm({...form,last_name:e.target.value})}
                    autoComplete="family-name" className="su-input" style={inp}
                  />
                </div>
              </div>

              {/* Email */}
              <div style={{ marginBottom:12 }}>
                <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.tx3, marginBottom:5, letterSpacing:"0.06em", textTransform:"uppercase" }}>Email</label>
                <input type="email" placeholder="you@company.com" value={form.email}
                  onChange={e => setForm({...form,email:e.target.value})}
                  autoComplete="email" className="su-input" style={inp}
                />
              </div>

              {/* Password */}
              <div style={{ marginBottom:16 }}>
                <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.tx3, marginBottom:5, letterSpacing:"0.06em", textTransform:"uppercase" }}>Password</label>
                <div style={{ position:"relative" }}>
                  <input type={showPw?"text":"password"} placeholder="Create a strong password"
                    value={form.password} onChange={e => setForm({...form,password:e.target.value})}
                    autoComplete="new-password" className="su-input" style={{ ...inp, paddingRight:48 }}
                  />
                  <button type="button" onClick={() => setShowPw(v => !v)}
                    aria-label={showPw?"Hide":"Show"}
                    style={{
                      position:"absolute", right:14, top:"50%", transform:"translateY(-50%)",
                      background:"none", border:"none", cursor:"pointer",
                      color:C.tx3, padding:0, display:"flex", alignItems:"center",
                    }}
                  >
                    {showPw ? <EyeOffIcon/> : <EyeIcon/>}
                  </button>
                </div>
                {/* Strength bar */}
                {form.password.length > 0 && (
                  <div style={{ marginTop:8 }}>
                    <div style={{ display:"flex", gap:4 }}>
                      {[1,2,3,4].map(i => (
                        <div key={i} style={{
                          flex:1, height:3, borderRadius:999,
                          background: i<=strength.level ? strength.color : "rgba(0,214,143,0.1)",
                          transition:"background 0.25s",
                        }}/>
                      ))}
                    </div>
                    {strength.label && (
                      <p style={{ fontSize:11, marginTop:4, color:strength.color, fontWeight:600 }}>{strength.label}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Create account */}
              <button type="submit" disabled={loading} style={{
                width:"100%", padding:"14px 0", borderRadius:12, border:"none",
                background: loading ? C.accDark : C.acc,
                color:C.bg, fontSize:15, fontWeight:800,
                cursor: loading?"not-allowed":"pointer", opacity: loading?0.8:1,
                transition:"background 0.2s, box-shadow 0.2s",
                boxShadow: loading?"none":`0 0 24px ${C.accGlow}`,
                letterSpacing:"0.02em", fontFamily:"inherit",
              }}
                onMouseEnter={e => { if(!loading)(e.currentTarget as HTMLButtonElement).style.boxShadow=`0 0 36px rgba(0,214,143,0.5)`; }}
                onMouseLeave={e => { if(!loading)(e.currentTarget as HTMLButtonElement).style.boxShadow=`0 0 24px ${C.accGlow}`; }}
              >
                {loading ? "Creating account…" : "Create account →"}
              </button>
            </form>

            {/* Terms */}
            <p style={{ fontSize:11, color:C.tx3, marginTop:12, lineHeight:1.6, textAlign:"center" }}>
              By signing up, you agree to our{" "}
              <Link href="/terms" style={{ color:C.acc, textDecoration:"none" }}>Terms</Link>{" "}and{" "}
              <Link href="/privacy" style={{ color:C.acc, textDecoration:"none" }}>Privacy Policy</Link>
            </p>

            {/* Sign in */}
            <div style={{
              marginTop:28, paddingTop:24,
              borderTop:"1px solid rgba(0,214,143,0.1)",
              textAlign:"center",
            }}>
              <p style={{ fontSize:14, color:C.tx2, marginBottom:14 }}>
                Already have an account?
              </p>
              {switchToLogin ? (
                <button type="button" onClick={switchToLogin} style={{
                  width:"100%", padding:"13px 0", borderRadius:12,
                  border:`1.5px solid ${C.border}`, background:C.accLight,
                  color:C.acc, fontSize:14, fontWeight:700,
                  cursor:"pointer", fontFamily:"inherit",
                  transition:"background 0.15s",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background="rgba(0,214,143,0.14)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background=C.accLight; }}
                >
                  Sign in instead
                </button>
              ) : (
                <Link href="/login" style={{
                  display:"block", width:"100%", padding:"13px 0", borderRadius:12,
                  border:`1.5px solid ${C.border}`, background:C.accLight,
                  color:C.acc, fontSize:14, fontWeight:700,
                  textDecoration:"none", textAlign:"center", boxSizing:"border-box",
                }}>
                  Sign in instead
                </Link>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
