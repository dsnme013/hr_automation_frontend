"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";

// ── Token shape ────────────────────────────────────────────────────────────────
// Explicitly typed as an interface so TypeScript keeps values as `string`,
// NOT as narrow literal types. This prevents "Type 'X' is not assignable to
// type 'Y'" errors when re-assigning `let trendBg / trendColor` or spreading
// token values into style={}.
interface ThemeTokens {
  cardBg:    string;
  cardBd:    string;
  tx:        string;
  tx2:       string;
  tx3:       string;
  acc:       string;
  accg:      string;
  accs:      string;
  trendUpBg: string;
  trendDnBg: string;
  trendNaBg: string;
  red:       string;
  blue:      string;
  btnText:   string;
}

// ── Design tokens (mirrors CSS variables in HTML) ──────────────────────────────
// NOTE: No `as const` — that would narrow every value to a literal type and
// cause TypeScript errors when re-assigning `let trendBg` / `let trendColor`.
export const THEMES: Record<"dark" | "light", ThemeTokens> = {
  dark: {
    cardBg:    "rgba(255,255,255,0.035)",
    cardBd:    "rgba(0,214,143,0.11)",
    tx:        "#e2faf1",
    tx2:       "#a7c4b8",
    tx3:       "#5a8a75",
    acc:       "#00d68f",
    accg:      "rgba(0,214,143,0.25)",
    accs:      "rgba(0,214,143,0.10)",
    trendUpBg: "rgba(0,214,143,0.1)",
    trendDnBg: "rgba(248,113,113,0.1)",
    trendNaBg: "rgba(96,165,250,0.08)",
    red:       "#f87171",
    blue:      "#60a5fa",
    btnText:   "#040d0a",
  },
  light: {
    cardBg:    "#ffffff",
    cardBd:    "#c5e8d8",
    tx:        "#0d2b1e",
    tx2:       "#2d5a42",
    tx3:       "#6b9e85",
    acc:       "#059669",
    accg:      "rgba(5,150,105,0.2)",
    accs:      "rgba(5,150,105,0.08)",
    trendUpBg: "#ecfdf5",
    trendDnBg: "#fef2f2",
    trendNaBg: "rgba(37,99,235,0.08)",
    red:       "#dc2626",
    blue:      "#2563eb",
    btnText:   "#ffffff",
  },
};

export type ThemeKey = keyof typeof THEMES;

// ── Props ──────────────────────────────────────────────────────────────────────
type Props = {
  title:        string;
  value:        string | number;
  change?:      number;         // e.g. 12.5  → "↑ +12.5%"
  changeLabel?: string;         // override badge text entirely e.g. "✓ All clear"
  changeType?:  "up" | "down" | "na";
  icon:         LucideIcon;
  iconBg:       string;
  iconColor:    string;
  subtitle?:    string;
  loading?:     boolean;
  theme?:       ThemeKey;
  style?:       React.CSSProperties;
};

// ── Component ──────────────────────────────────────────────────────────────────
const StatCard: React.FC<Props> = ({
  title,
  value,
  change,
  changeLabel,
  changeType = "up",
  icon: Icon,
  iconBg,
  iconColor,
  subtitle,
  loading,
  theme = "dark",
  style,
}) => {
  const T = THEMES[theme];

  // `let` is fine now — T values are typed as `string`, not narrow literals
  let trendBg:    string = T.trendUpBg;
  let trendColor: string = T.acc;
  const trendText: string =
    changeLabel ??
    (change !== undefined
      ? `${change >= 0 ? "↑ +" : "↓ "}${Math.abs(change)}%`
      : "");

  if (changeType === "down" || (change !== undefined && change < 0)) {
    trendBg    = T.trendDnBg;
    trendColor = T.red;
  } else if (changeType === "na") {
    trendBg    = T.trendNaBg;
    trendColor = T.blue;
  }

  return (
    <div
      style={{
        background:     T.cardBg,
        border:         `1px solid ${T.cardBd}`,
        borderRadius:   14,
        padding:        "1.1rem 1.2rem",
        backdropFilter: "blur(16px)",
        position:       "relative",
        overflow:       "hidden",
        cursor:         "pointer",
        transition:     "transform 0.18s, box-shadow 0.18s",
        ...style,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-2px)";
        el.style.boxShadow = "0 8px 28px rgba(0,0,0,0.14)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Bottom shimmer line (dark mode only) */}
      {theme === "dark" && (
        <div
          style={{
            position:      "absolute",
            bottom:        0,
            left:          0,
            right:         0,
            height:        1,
            background:    "linear-gradient(90deg,transparent,rgba(0,214,143,0.2),transparent)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Top row: trend badge + icon */}
      <div
        style={{
          display:        "flex",
          alignItems:     "flex-start",
          justifyContent: "space-between",
          marginBottom:   "0.7rem",
        }}
      >
        {trendText && (
          <span
            style={{
              display:      "inline-flex",
              alignItems:   "center",
              gap:          4,
              fontSize:     "0.64rem",
              fontWeight:   700,
              padding:      "0.14rem 0.45rem",
              borderRadius: 6,
              background:   trendBg,
              color:        trendColor,
            }}
          >
            {trendText}
          </span>
        )}

        <div
          style={{
            width:          38,
            height:         38,
            borderRadius:   10,
            background:     iconBg,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            flexShrink:     0,
          }}
        >
          <Icon size={18} color={iconColor} strokeWidth={2} strokeLinecap="round" />
        </div>
      </div>

      {/* Label */}
      <div
        style={{
          fontSize:      "0.6rem",
          fontWeight:    700,
          letterSpacing: "0.09em",
          textTransform: "uppercase",
          color:         T.tx3,
          marginBottom:  "0.1rem",
        }}
      >
        {title}
      </div>

      {/* Value */}
      {loading ? (
        <div
          style={{
            width:          70,
            height:         34,
            borderRadius:   6,
            background:     "rgba(255,255,255,0.06)",
            animation:      "tfShimmer 1.2s infinite linear",
            backgroundSize: "200px 100%",
          }}
        />
      ) : (
        <div
          style={{
            fontFamily:   "'DM Serif Display', Georgia, serif",
            fontSize:     "2.2rem",
            lineHeight:   1,
            color:        T.tx,
            marginBottom: "0.15rem",
          }}
        >
          {value}
        </div>
      )}

      {/* Subtitle */}
      {subtitle && (
        <div style={{ fontSize: "0.63rem", color: T.tx3 }}>{subtitle}</div>
      )}

      <style>{`
        @keyframes tfShimmer {
          0%   { background-position: -200px 0; }
          100% { background-position:  200px 0; }
        }
      `}</style>
    </div>
  );
};

export default StatCard;