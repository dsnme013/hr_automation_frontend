/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { createPortal } from "react-dom";

interface Props {
  open:         boolean;
  value:        string;
  defaultTitle?: string;
  onChange:     (s: string) => void;
  onClose:      () => void;
  onSave:       () => void;
}

export default function JobDescriptionModal({ open, value, defaultTitle, onChange, onClose, onSave }: Props) {
  if (!open || typeof document === "undefined") return null;

  const content = (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(15,23,42,.55)",
        zIndex: 9996, display: "flex", alignItems: "center",
        justifyContent: "center", padding: "1rem", backdropFilter: "blur(4px)",
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: "var(--card-bg)", border: "1px solid var(--card-bd)",
        borderRadius: 18, width: "100%", maxWidth: 560, padding: "1.4rem",
        backdropFilter: "blur(24px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <span style={{ fontFamily: "var(--serif)", fontSize: "1rem", color: "var(--tx)" }}>
            Add / Edit Job Description
          </span>
          <button
            style={{
              width: 26, height: 26, borderRadius: "50%", background: "var(--glass2)",
              border: "1px solid var(--card-bd)", color: "var(--tx3)", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <textarea
          className="jd-textarea"
          style={{ minHeight: 180, width: "100%" }}
          placeholder={`Enter job description for ${defaultTitle || "the position"}…`}
          value={value}
          onChange={e => onChange(e.target.value)}
        />

        <div style={{ display: "flex", gap: ".7rem", marginTop: "1rem", justifyContent: "flex-end" }}>
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-confirm" onClick={onSave}>Save Job Description</button>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}