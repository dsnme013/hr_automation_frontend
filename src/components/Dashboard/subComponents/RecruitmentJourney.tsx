"use client";

import React from "react";
import { useRouter } from "next/navigation";

// ── Props ──────────────────────────────────────────────────────────────────────
type Theme = "dark" | "light";

type Props = {
  currentStep: number;
  onStepClick?: (route: string, index: number) => void;
  theme?: Theme;
};

// ── Color tokens (mirrors CSS vars in HTML) ────────────────────────────────────
const TOKENS = {
  dark: {
    bannerBg:   "rgba(255,255,255,0.035)",
    bannerBd:   "rgba(0,214,143,0.11)",
    bannerGlow: "linear-gradient(90deg,rgba(0,214,143,.025) 0%,transparent 50%)",
    acc:        "#00d68f",
    acc3:       "#34d399",
    accg:       "rgba(0,214,143,0.25)",
    accs:       "rgba(0,214,143,0.10)",
    wfLine:     "rgba(0,214,143,0.35)",
    tx:         "#e2faf1",
    tx2:        "#a7c4b8",
    tx3:        "#5a8a75",
    iconBg:     "rgba(255,255,255,0.06)",
    iconBd:     "rgba(0,214,143,0.11)",
    activeIcon: "#00d68f",
    doneOpacity: 1,
    aiBadgeBg:  "rgba(0,214,143,0.10)",
    aiBadgeBd:  "rgba(0,214,143,0.12)",
    barTrack:   "rgba(0,214,143,0.1)",
    btnText:    "#040d0a",
  },
  light: {
    bannerBg:   "#ffffff",
    bannerBd:   "#c5e8d8",
    bannerGlow: "none",
    acc:        "#059669",
    acc3:       "#34d399",
    accg:       "rgba(5,150,105,0.2)",
    accs:       "rgba(5,150,105,0.08)",
    wfLine:     "#9dd4bb",
    tx:         "#0d2b1e",
    tx2:        "#2d5a42",
    tx3:        "#6b9e85",
    iconBg:     "rgba(255,255,255,0.8)",
    iconBd:     "#c5e8d8",
    activeIcon: "#059669",
    doneOpacity: 1,
    aiBadgeBg:  "rgba(5,150,105,0.1)",
    aiBadgeBd:  "rgba(5,150,105,0.25)",
    barTrack:   "rgba(5,150,105,0.1)",
    btnText:    "#ffffff",
  },
} as const;

// ── Steps ──────────────────────────────────────────────────────────────────────
const STEPS = [
  { label: "Dashboard",            sublabel: "Overview",       route: "/dashboard",   emoji: "🏠" },
  { label: "Job & Candidates",     sublabel: "Post role",      route: "/jobs",        emoji: "📋" },
  { label: "Assessment",           sublabel: "Build tests",    route: "/assessments", emoji: "📝" },
  { label: "ATS Checking",         sublabel: "AI screening",   route: "/candidates",  emoji: "🤖" },
  { label: "Interviews",           sublabel: "Book slots",     route: "/scheduler",   emoji: "📅" },
];

// ── Component ──────────────────────────────────────────────────────────────────
const RecruitmentJourney: React.FC<Props> = ({
  currentStep,
  onStepClick,
  theme = "dark",
}) => {
  const router = useRouter();
  const T = TOKENS[theme];
  const progressPct = Math.round((currentStep / (STEPS.length - 1)) * 100);

  const handleClick = (route: string, idx: number) => {
    if (onStepClick) onStepClick(route, idx);
    else router.push(route);
  };

  return (
    <div
      style={{
        background:    T.bannerBg,
        border:        `1px solid ${T.bannerBd}`,
        borderRadius:  14,
        padding:       "1.2rem 1.6rem 1rem",
        marginBottom:  "1.5rem",
        position:      "relative",
        overflow:      "hidden",
        backdropFilter:"blur(16px)",
        boxShadow:     theme === "light" ? "0 1px 8px rgba(0,0,0,.06)" : "none",
      }}
    >
      {/* Glow overlay for dark */}
      {theme === "dark" && (
        <div
          style={{
            position:      "absolute",
            inset:         0,
            background:    T.bannerGlow,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.tx3 }}>
            RECRUITMENT WORKFLOW
          </span>
          <span
            style={{
              background:   T.aiBadgeBg,
              color:        T.acc,
              border:       `1px solid ${T.aiBadgeBd}`,
              borderRadius: 999,
              fontSize:     "0.55rem",
              fontWeight:   700,
              padding:      "0.1rem 0.48rem",
              letterSpacing:"0.05em",
            }}
          >
            + AI-ASSISTED
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.65rem", color: T.acc, fontWeight: 600 }}>
          <span
            style={{
              width:  6,
              height: 6,
              borderRadius: "50%",
              background:   T.acc,
              display:      "inline-block",
              animation:    "tfDot 1.5s infinite",
            }}
          />
          Step {currentStep + 1} of {STEPS.length} — {STEPS[currentStep].label}
        </div>
      </div>

      {/* Steps row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", marginBottom: "1rem" }}>
        {STEPS.map((step, idx) => {
          const isDone   = idx < currentStep;
          const isActive = idx === currentStep;

          return (
            <React.Fragment key={idx}>
              {/* Step */}
              <div
                onClick={() => handleClick(step.route, idx)}
                title={step.label}
                style={{
                  display:       "flex",
                  flexDirection: "column",
                  alignItems:    "center",
                  gap:           "0.4rem",
                  cursor:        "pointer",
                  position:      "relative",
                  zIndex:        1,
                  minWidth:      0,
                  userSelect:    "none",
                  transition:    "transform 0.18s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                {/* Icon circle */}
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      width:          50,
                      height:         50,
                      borderRadius:   "50%",
                      display:        "flex",
                      alignItems:     "center",
                      justifyContent: "center",
                      fontSize:       "1.15rem",
                      border:         `2px solid ${isActive || isDone ? T.acc : T.iconBd}`,
                      background:     isActive
                        ? T.acc
                        : isDone
                        ? `rgba(${theme === "dark" ? "0,214,143" : "5,150,105"},0.12)`
                        : T.iconBg,
                      transition:    "all 0.25s",
                      boxShadow:     isActive ? `0 4px 20px ${T.accg}` : "none",
                      animation:     isActive ? "tfPulse 2s infinite" : "none",
                    }}
                  >
                    {step.emoji}

                    {/* Done checkmark */}
                    {isDone && (
                      <div
                        style={{
                          position:       "absolute",
                          bottom:         -2,
                          right:          -2,
                          width:          16,
                          height:         16,
                          borderRadius:   "50%",
                          background:     T.acc,
                          color:          T.btnText,
                          fontSize:       "0.55rem",
                          fontWeight:     700,
                          display:        "flex",
                          alignItems:     "center",
                          justifyContent: "center",
                          border:         `2px solid ${theme === "dark" ? "#040d0a" : "#f0faf6"}`,
                        }}
                      >
                        ✓
                      </div>
                    )}

                    {/* Badge on active */}
                    {isActive && (
                      <div
                        style={{
                          position:       "absolute",
                          top:            -5,
                          right:          -5,
                          width:          18,
                          height:         18,
                          borderRadius:   "50%",
                          background:     "#f87171",
                          color:          "#fff",
                          fontSize:       "0.53rem",
                          fontWeight:     700,
                          display:        "flex",
                          alignItems:     "center",
                          justifyContent: "center",
                          border:         `2px solid ${theme === "dark" ? "#040d0a" : "#f0faf6"}`,
                          zIndex:         2,
                        }}
                      >
                        {idx + 1}
                      </div>
                    )}
                  </div>
                </div>

                {/* Label */}
                <div
                  style={{
                    fontSize:   "0.66rem",
                    fontWeight: 600,
                    color:      isActive ? T.acc : T.tx2,
                    textAlign:  "center",
                    maxWidth:   80,
                    lineHeight: 1.3,
                    transition: "color 0.2s",
                  }}
                >
                  {step.label}
                </div>
                <div
                  style={{
                    fontSize:   "0.57rem",
                    color:      T.tx3,
                    textAlign:  "center",
                    maxWidth:   80,
                    lineHeight: 1.3,
                  }}
                >
                  {step.sublabel}
                </div>
              </div>

              {/* Connector line */}
              {idx < STEPS.length - 1 && (
                <div
                  style={{
                    flex:        1,
                    height:      2,
                    background:  isDone ? T.acc : T.wfLine,
                    margin:      "0 4px",
                    marginTop:   -28,
                    position:    "relative",
                    zIndex:      0,
                    transition:  "background 0.3s",
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Progress bar */}
      <div style={{ marginTop: "0.2rem" }}>
        <div
          style={{
            height:       3,
            background:   T.barTrack,
            borderRadius: 2,
            overflow:     "hidden",
            marginBottom: "0.5rem",
          }}
        >
          <div
            style={{
              height:     "100%",
              width:      `${progressPct}%`,
              borderRadius: 2,
              background: `linear-gradient(90deg,${T.acc},${T.acc3})`,
              transition: "width 0.5s ease",
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", fontSize: "0.65rem", color: T.tx3 }}>
          <strong style={{ color: T.acc }}>{progressPct}% Complete</strong>
          {progressPct === 100 && " ✓"}
        </div>
      </div>

      <style>{`
        @keyframes tfDot {
          0%,100% { opacity:1; }
          50%      { opacity:0.4; }
        }
        @keyframes tfPulse {
          0%   { box-shadow: 0 0 0 0 ${T.accg}; }
          70%  { box-shadow: 0 0 0 8px transparent; }
          100% { box-shadow: 0 0 0 0 transparent; }
        }
      `}</style>
    </div>
  );
};

export default RecruitmentJourney;