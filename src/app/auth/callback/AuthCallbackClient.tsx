// FILE LOCATION: src/app/auth/callback/AuthCallbackClient.tsx
// This is the client component — useSearchParams() lives here, inside Suspense
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/services/context/AuthContext";   // adjust path if needed

export default function AuthCallbackClient() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const { login }    = useAuth();

  const [status,   setStatus]   = useState<"loading" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    // ── OAuth error from backend ───────────────────────────────────────────
    if (error) {
      const messages: Record<string, string> = {
        google_oauth_failed:    "Google sign-in was cancelled or denied.",
        google_token_failed:    "Could not get a token from Google. Try again.",
        google_no_email:        "Google did not share your email address.",
        google_userinfo_failed: "Could not fetch your Google profile.",
        db_error:               "Server error creating your account. Try again.",
      };
      setErrorMsg(messages[error] || "Sign-in failed. Please try again.");
      setStatus("error");
      setTimeout(() => router.replace("/login"), 3000);
      return;
    }

    // ── No token ───────────────────────────────────────────────────────────
    if (!token) {
      setErrorMsg("No authentication token received.");
      setStatus("error");
      setTimeout(() => router.replace("/login"), 3000);
      return;
    }

    // ── Decode JWT payload to get user info (no external library) ──────────
    let user = { id: "", email: "", firstName: "", lastName: "" };
    try {
      const b64    = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
      const padded = b64 + "=".repeat((4 - b64.length % 4) % 4);
      const payload = JSON.parse(atob(padded));
      user = {
        id:        String(payload.user_id  ?? ""),
        email:     String(payload.email    ?? ""),
        firstName: String(payload.first_name ?? payload.email?.split("@")[0] ?? ""),
        lastName:  String(payload.last_name  ?? ""),
      };
    } catch {
      // decode failed — still proceed, token is valid
    }

    // ── Call AuthContext.login() — identical to email/password login ────────
    try {
      login(token, user);
      window.dispatchEvent(new Event("auth-changed"));
      router.replace("/dashboard");
    } catch {
      setErrorMsg("Failed to complete sign-in. Please try again.");
      setStatus("error");
      setTimeout(() => router.replace("/login"), 3000);
    }
  }, [router, searchParams, login]);


  // ── Loading UI ─────────────────────────────────────────────────────────────
  if (status === "loading") {
    return (
      <div style={{
        minHeight: "100vh", background: "#040d0a",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 16,
        fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
      }}>
        {/* Spinner */}
        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          border: "3px solid rgba(0,214,143,0.15)",
          borderTopColor: "#00d68f",
          animation: "cb-spin 0.8s linear infinite",
        }}/>

        {/* Google icon + text */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.15 0 5.96 1.08 8.18 2.86l6.1-6.1C34.46 3.08 29.5 1 24 1 14.82 1 7.07 6.48 3.58 14.24l7.14 5.55C12.49 13.48 17.8 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.52 24.5c0-1.64-.15-3.22-.43-4.75H24v9.01h12.7c-.55 2.96-2.2 5.47-4.68 7.16l7.18 5.58C43.38 37.35 46.52 31.35 46.52 24.5z"/>
            <path fill="#FBBC05" d="M10.72 28.21A14.5 14.5 0 0 1 9.5 24c0-1.46.25-2.87.7-4.19l-7.14-5.55A23.94 23.94 0 0 0 0 24c0 3.87.92 7.53 2.55 10.76l8.17-6.55z"/>
            <path fill="#34A853" d="M24 47c5.49 0 10.1-1.82 13.47-4.95l-7.18-5.58c-1.83 1.23-4.18 1.95-6.29 1.95-6.2 0-11.51-4-13.28-9.21l-8.17 6.55C7.07 41.52 14.82 47 24 47z"/>
          </svg>
          <p style={{ fontSize: 14, color: "#a7c4b8", margin: 0 }}>
            Completing Google sign-in…
          </p>
        </div>

        <p style={{ fontSize: 12, color: "#5a8a75", margin: 0 }}>
          Redirecting to dashboard
        </p>

        <style>{`@keyframes cb-spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ── Error UI ───────────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: "100vh", background: "#040d0a",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 14, padding: "0 24px",
      fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: "50%",
        background: "rgba(248,113,113,0.1)",
        border: "1.5px solid rgba(248,113,113,0.3)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22, color: "#f87171",
      }}>✕</div>

      <p style={{ fontSize: 16, fontWeight: 700, color: "#f87171", margin: 0, textAlign: "center" }}>
        Sign-in failed
      </p>
      <p style={{ fontSize: 13, color: "#5a8a75", margin: 0, textAlign: "center", maxWidth: 300, lineHeight: 1.6 }}>
        {errorMsg}
      </p>
      <p style={{ fontSize: 12, color: "#5a8a75", margin: 0 }}>
        Redirecting back to login…
      </p>
    </div>
  );
}