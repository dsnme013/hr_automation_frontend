// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // "use client";
// // import React, { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { resetPasswordAPI, sendOTPAPI, verifyOTPAPI } from "@/services/redux/thunk/authThunk";
// // import Input from "../input/Input";
// // import Button from "../button/Button";

// // export default function ForgotPassword() {
// //   const router = useRouter();
// //   const [step, setStep] = useState(1);
// //   const [email, setEmail] = useState("");
// //   const [otp, setOTP] = useState("");
// //   const [password, setPassword] = useState(""); 
// //   const [resetToken, setResetToken] = useState("");
// //   const [message, setMessage] = useState("");
// //   const [error, setError] = useState("");

// //   const handleSendOTP = async () => {
// //     try {
// //       const data = await sendOTPAPI(email);
// //       setMessage(data.message);
// //       setStep(2);
// //     } catch (err: any) {
// //       setError(err.response?.data?.message || "Failed to send OTP");
// //     }
// //   };

// //   const handleVerifyOTP = async () => {
// //     try {
// //       const data = await verifyOTPAPI(email, otp);
// //       setResetToken(data.reset_token);
// //       setStep(3);
// //     } catch (err: any) {
// //       setError(err.response?.data?.message || "Invalid OTP");
// //     }
// //   };

// //   const handleResetPassword = async () => {
// //     try {
// //       await resetPasswordAPI(email, password, resetToken);
// //       alert("Password reset successful!");
// //       router.push("/login");
// //     } catch (err: any) {
// //       setError(err.response?.data?.message || "Failed to reset password");
// //     }
// //   };

// //   return (
// //     <div className="flex items-center justify-center mt-40">
// //       <div className="w-96 p-6 rounded-lg shadow-md">
// //         <h1 className="text-2xl mb-4 text-center">Forgot Password</h1>

// //         {step === 1 && (
// //           <>
// //             <Input
// //               type="email"
// //               label="Email"
// //               placeholder="Enter your email"
// //               className="w-full p-2 mb-3 rounded"
// //               name="email"
// //             />
// //             <Button onClick={handleSendOTP} className="w-full bg-blue-600 py-2 rounded" label="Send OTP" />
           
// //           </>
// //         )}

// //         {step === 2 && (
// //           <>
// //             <Input
// //               type="text"
// //               label="Otp"
// //               placeholder="Enter OTP"
// //               className="w-full p-2 mb-3 bg-gray-700 rounded"
// //               name="otp"
// //             />
// //             <Button onClick={handleVerifyOTP} className="w-full bg-green-600 py-2 rounded" label="Verify OTP" />

// //           </>
// //         )}

// //         {step === 3 && (
// //           <>
// //             <Input
// //               type="password"
// //               label="password"
// //               name="password"
// //               placeholder="New Password"
  
// //             />
// //             <Button onClick={handleResetPassword} className="w-full bg-yellow-600 py-2 rounded" label="Reset Password" />
              
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { sendOTPAPI, verifyOTPAPI, resetPasswordAPI } from "@/services/redux/thunk/authThunk";
// import Button from "../button/Button";
// import Link from "next/link";

// export default function ForgotPassword() {
//   const router = useRouter();
//   const [step, setStep] = useState<1 | 2 | 3>(1);
//   const [email, setEmail] = useState("");
//   const [otp, setOTP] = useState("");
//   const [password, setPassword] = useState("");
//   const [resetToken, setResetToken] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSendOTP = async () => {
//     setError(""); setMessage(""); setLoading(true);
//     try {
//       if (!email) return setError("Enter your email");
//       const data = await sendOTPAPI(email);
//       setMessage(data.message || "OTP sent to your email");
//       setStep(2);
//     } catch (err: any) {
//       setError(err?.response?.data?.message || "Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOTP = async () => {
//     setError(""); setMessage(""); setLoading(true);
//     try {
//       if (!otp) return setError("Enter OTP");
//       const data = await verifyOTPAPI(email, otp);
//       setResetToken(data.reset_token);
//       setMessage(data.message || "OTP verified");
//       setStep(3);
//     } catch (err: any) {
//       setError(err?.response?.data?.message || "Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResetPassword = async () => {
//     setError(""); setMessage(""); setLoading(true);
//     try {
//       if (!password) return setError("Enter new password");
//       await resetPasswordAPI({ email, password, reset_token: resetToken }); // ✅ object param
//       setMessage("Password reset successful!");
//       router.push("/login");
//     } catch (err: any) {
//       setError(err?.response?.data?.message || "Failed to reset password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center mt-40">
//       <div className="w-96 p-6 rounded-lg shadow-md bg-white">
//         <h1 className="text-2xl mb-4 text-center font-semibold">Forgot Password</h1>

//         {message && <p className="text-sm text-center mb-3 text-blue-600">{message}</p>}
//         {error && <p className="text-sm text-center mb-3 text-red-600">{error}</p>}

//         {step === 1 && (
//           <>
//             <label className="block text-sm font-medium mb-1">Email</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 mb-3 rounded text-black border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
//             />
//             <Button
//               onClick={handleSendOTP}
//               disabled={loading}
//               className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
//               label={loading ? "Sending..." : "Send OTP"}
//             />
//           </>
//         )}

//         {step === 2 && (
//           <>
//             <label className="block text-sm font-medium mb-1">OTP</label>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOTP(e.target.value)}
//               className="w-full p-2 mb-3 rounded text-black border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
//             />

//             <div className="flex items-center justify-between mb-3">
//               <button
//                 type="button"
//                 onClick={async () => {
//                   try {
//                     const res = await sendOTPAPI(email, true);
//                     setMessage(res.message || "OTP resent");
//                   } catch (e: any) {
//                     setError(e?.response?.data?.message || "Failed to resend OTP");
//                   }
//                 }}
//                 className="text-sm underline"
//               >
//                 Resend OTP
//               </button>
//             </div>

//             <Button
//               onClick={handleVerifyOTP}
//               disabled={loading}
//               className="w-full bg-green-600 hover:bg-green-700 py-2 rounded"
//               label={loading ? "Verifying..." : "Verify OTP"}
//             />
//           </>
//         )}

//         {step === 3 && (
//           <>
//             <label className="block text-sm font-medium mb-1">New Password</label>
//             <input
//               type="password"
//               placeholder="Enter new password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 mb-3 rounded text-black border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
//             />
//             <Button
//               onClick={handleResetPassword}
//               disabled={loading}
//               className="w-full bg-yellow-600 hover:bg-yellow-700 py-2 rounded"
//               label={loading ? "Resetting..." : "Reset Password"}
//             />
//           </>
//         )}

//         <p className="text-sm mt-4 text-center">
//           <Link href="/login" className="text-blue-500 underline">
//             Back to Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
// src/components/loginForm/ForgetPassword.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { sendOTPAPI, verifyOTPAPI, resetPasswordAPI } from "@/services/redux/thunk/authThunk";
import Link from "next/link";

export default function ForgotPassword() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Password strength
  const getStrength = (val: string): number => {
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    return score;
  };
  const strengthMeta: Record<number, { label: string; color: string }> = {
    0: { label: "", color: "#1e293b" },
    1: { label: "Weak", color: "#ef4444" },
    2: { label: "Fair", color: "#f97316" },
    3: { label: "Good", color: "#eab308" },
    4: { label: "Strong", color: "#22c55e" },
  };
  const strength = getStrength(password);
  const { label: strengthLabel, color: strengthColor } = strengthMeta[strength];

  const handleSendOTP = async () => {
    setError(""); setMessage(""); setLoading(true);
    try {
      if (!email) { setError("Please enter your email"); return; }
      const data = await sendOTPAPI(email);
      setMessage(data.message || "OTP sent to your email");
      setStep(2);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to send OTP");
    } finally { setLoading(false); }
  };

  const handleVerifyOTP = async () => {
    setError(""); setMessage(""); setLoading(true);
    try {
      if (!otp) { setError("Please enter the OTP"); return; }
      const data = await verifyOTPAPI(email, otp);
      setResetToken(data.reset_token);
      setMessage(data.message || "OTP verified");
      setStep(3);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid OTP");
    } finally { setLoading(false); }
  };

  const handleResetPassword = async () => {
    setError(""); setMessage(""); setLoading(true);
    try {
      if (!password) { setError("Please enter a new password"); return; }
      await resetPasswordAPI({ email, password, reset_token: resetToken });
      setMessage("Password reset successful! Redirecting…");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to reset password");
    } finally { setLoading(false); }
  };

  const handleResendOTP = async () => {
    setError(""); setMessage("");
    try {
      const res = await sendOTPAPI(email, true);
      setMessage(res.message || "OTP resent to your email");
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to resend OTP");
    }
  };

  // Step metadata
  const stepsMeta = [
    { num: 1, title: "Email" },
    { num: 2, title: "Verify" },
    { num: 3, title: "Reset" },
  ];

  // Left panel copy per step
  const brandCopy = {
    1: {
      heading: (
        <>Let&apos;s get you{" "}<span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">back in</span></>
      ),
      sub: "We'll send a secure one-time code to your registered work email address.",
      tips: ["Link expires in 30 minutes", "Check your spam folder too", "Contact support if stuck"],
    },
    2: {
      heading: (
        <>Check your{" "}<span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">inbox</span></>
      ),
      sub: "Enter the 6-digit OTP we sent to your email to continue.",
      tips: ["Check spam if not received", "Code expires in 10 minutes", "Request a new code if needed"],
    },
    3: {
      heading: (
        <>Create a{" "}<span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">new password</span></>
      ),
      sub: "Choose a strong password to keep your account secure.",
      tips: ["Use at least 8 characters", "Mix letters, numbers & symbols", "Avoid reusing old passwords"],
    },
  }[step];

  return (
    <div className="min-h-screen flex items-stretch bg-[#0b1120] font-sans">
      {/* ── Left brand panel ── */}
      <div className="hidden lg:flex w-[42%] flex-col justify-between px-10 py-10 bg-gradient-to-br from-[#0f1f3d] via-[#0b1120] to-[#071428] border-r border-[#1e3a5f]/40 relative overflow-hidden">
        <div className="pointer-events-none absolute -top-20 -left-16 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-10 w-56 h-56 rounded-full bg-indigo-500/10 blur-3xl" />

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 fill-white" viewBox="0 0 20 20">
              <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 3a3 3 0 110 6 3 3 0 010-6zm0 9.5c-2.33 0-4.32-1.45-5.12-3.5h10.24c-.8 2.05-2.79 3.5-5.12 3.5z" />
            </svg>
          </div>
          <span className="text-white font-semibold text-[15px] tracking-wide">
            HR<span className="text-blue-400">Auto</span>
          </span>
        </div>

        {/* Hero copy — animates per step */}
        <div className="relative z-10 flex flex-col gap-6">
          <div>
            <h1 className="text-white text-[28px] font-semibold leading-snug mb-3">
              {brandCopy.heading}
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-[240px]">
              {brandCopy.sub}
            </p>
          </div>

          <ul className="flex flex-col gap-3">
            {brandCopy.tips.map((t) => (
              <li key={t} className="flex items-center gap-3 text-sm text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-slate-700 text-xs relative z-10">© 2026 HRAutomation Inc.</p>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-14 py-10 bg-[#111827]">
        <div className="w-full max-w-sm mx-auto">
          {/* Back link */}
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-slate-500 text-xs hover:text-slate-300 transition-colors mb-8"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to sign in
          </Link>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {stepsMeta.map((s, i) => (
              <React.Fragment key={s.num}>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold transition-all ${
                      step === s.num
                        ? "bg-blue-600 text-white"
                        : step > s.num
                        ? "bg-blue-600/30 text-blue-400"
                        : "bg-slate-800 text-slate-600"
                    }`}
                  >
                    {step > s.num ? (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    ) : (
                      s.num
                    )}
                  </div>
                  <span
                    className={`text-[11px] font-medium ${
                      step === s.num ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
                {i < stepsMeta.length - 1 && (
                  <div
                    className={`flex-1 h-px transition-all ${
                      step > s.num ? "bg-blue-600/40" : "bg-[#1e293b]"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Header */}
          <p className="text-blue-400 text-[11px] font-medium uppercase tracking-widest mb-2">
            Account recovery
          </p>
          <h2 className="text-white text-2xl font-semibold mb-1">
            {step === 1 && "Reset your password"}
            {step === 2 && "Enter the OTP"}
            {step === 3 && "Create new password"}
          </h2>
          <p className="text-slate-400 text-sm mb-7">
            {step === 1 && "Enter the work email linked to your account."}
            {step === 2 && `We sent a code to ${email}. Enter it below.`}
            {step === 3 && "Choose a strong new password for your account."}
          </p>

          {/* Status messages */}
          {message && (
            <div className="mb-5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 px-4 py-2.5 text-sm text-emerald-400">
              {message}
            </div>
          )}
          {error && (
            <div className="mb-5 rounded-lg bg-red-500/10 border border-red-500/25 px-4 py-2.5 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* ── Step 1: Email ── */}
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-[12px] font-medium text-slate-400 mb-1.5">
                  Work email
                </label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full bg-[#1e293b] border border-[#1e3a5f] rounded-[9px] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all"
                />
                <p className="text-[11px] text-slate-600 mt-1.5">
                  Must match your registered work email.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSendOTP}
                disabled={loading}
                className="w-full py-2.5 rounded-[9px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-60"
              >
                {loading ? "Sending OTP…" : "Send OTP →"}
              </button>
            </div>
          )}

          {/* ── Step 2: OTP ── */}
          {step === 2 && (
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-[12px] font-medium text-slate-400 mb-1.5">
                  One-time password
                </label>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  maxLength={6}
                  className="w-full bg-[#1e293b] border border-[#1e3a5f] rounded-[9px] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all tracking-[0.25em] font-mono"
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-[11px] text-slate-600">
                    Didn&apos;t receive it?
                  </p>
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    className="text-[11px] text-blue-500 hover:text-blue-400 transition-colors"
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={handleVerifyOTP}
                disabled={loading}
                className="w-full py-2.5 rounded-[9px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-60"
              >
                {loading ? "Verifying…" : "Verify OTP →"}
              </button>
              <button
                type="button"
                onClick={() => { setStep(1); setError(""); setMessage(""); setOTP(""); }}
                className="w-full py-2.5 rounded-[9px] border border-[#1e3a5f] bg-transparent text-slate-400 text-sm hover:text-slate-200 transition-colors"
              >
                Change email
              </button>
            </div>
          )}

          {/* ── Step 3: New Password ── */}
          {step === 3 && (
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-[12px] font-medium text-slate-400 mb-1.5">
                  New password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    className="w-full bg-[#1e293b] border border-[#1e3a5f] rounded-[9px] px-3.5 py-2.5 pr-11 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-10.94-8 .58-1.77 1.54-3.34 2.78-4.62" />
                        <path d="M1 1l22 22" />
                        <path d="M10.58 10.58a2 2 0 0 0 2.84 2.84" />
                        <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c5 0 9.27 3.11 10.94 8a11.8 11.8 0 0 1-2.31 3.64" />
                      </svg>
                    ) : (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Strength bar */}
                {password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="h-[3px] flex-1 rounded-full transition-all duration-300"
                          style={{ backgroundColor: i <= strength ? strengthColor : "#1e293b" }}
                        />
                      ))}
                    </div>
                    {strengthLabel && (
                      <p className="text-[11px] mt-1" style={{ color: strengthColor }}>
                        {strengthLabel}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleResetPassword}
                disabled={loading}
                className="w-full py-2.5 rounded-[9px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-60"
              >
                {loading ? "Resetting password…" : "Reset password →"}
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-6 pt-5 border-t border-[#1e293b]">
            <span className="text-sm text-slate-500">Don&apos;t have an account?</span>
            <Link
              href="/signup"
              className="text-sm text-blue-400 font-medium hover:text-blue-300 transition-colors"
            >
              Sign up free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}