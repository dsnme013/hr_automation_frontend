/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { createPortal } from "react-dom";

interface Candidate {
  id: string; name: string; email?: string;
  interview_date?: string | null; interview_type?: string | null;
  interviewer?: string | null; meeting_link?: string | null;
  duration?: number;
}

interface Props {
  candidate: Candidate | null;
  onClose:   () => void;
  onSave:    (fields: any) => void;
}

export default function ManualModal({ candidate: c, onClose, onSave }: Props) {
  const today = new Date().toISOString().split("T")[0];
  const [date,        setDate]       = useState(c?.interview_date ? new Date(c.interview_date).toISOString().split("T")[0] : today);
  const [time,        setTime]       = useState(c?.interview_date ? new Date(c.interview_date).toTimeString().slice(0,5) : "10:00");
  const [type,        setType]       = useState(c?.interview_type || "video");
  const [interviewer, setInterviewer]= useState(c?.interviewer || "");
  const [link,        setLink]       = useState(c?.meeting_link || "");
  const [duration,    setDuration]   = useState(String(c?.duration || 60));
  const [notes,       setNotes]      = useState("");

  if (typeof document === "undefined") return null;

  const field = (label: string, child: React.ReactNode) => (
    <div style={{ marginBottom: ".9rem" }}>
      <label style={{
        display: "block", fontSize: ".65rem", fontWeight: 700,
        color: "var(--tx3)", marginBottom: ".3rem",
        textTransform: "uppercase", letterSpacing: ".07em",
      }}>
        {label}
      </label>
      {child}
    </div>
  );

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "var(--glass2)", border: "1px solid var(--card-bd)",
    borderRadius: 9, padding: ".5rem .75rem", fontSize: ".8rem",
    color: "var(--tx)", fontFamily: "var(--sans)", outline: "none",
  };

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
        borderRadius: 18, width: "100%", maxWidth: 480, padding: "1.4rem",
        backdropFilter: "blur(24px)", maxHeight: "90vh", overflowY: "auto",
      }}>
        {/* Title */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.2rem" }}>
          <span style={{ fontFamily: "var(--serif)", fontSize: "1rem", color: "var(--tx)" }}>
            {c ? `Schedule — ${c.name}` : "Schedule Interview"}
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

        {/* Form grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem", marginBottom: ".9rem" }}>
          {field("Interview Date",
            <input type="date" style={inputStyle} min={today} value={date} onChange={e => setDate(e.target.value)} />
          )}
          {field("Interview Time",
            <input type="time" style={inputStyle} value={time} onChange={e => setTime(e.target.value)} />
          )}
        </div>

        {field("Interview Type",
          <select style={inputStyle} value={type} onChange={e => setType(e.target.value)}>
            <option value="video">Video Call (Google Meet / Zoom)</option>
            <option value="phone">Phone Interview</option>
            <option value="onsite">On-site Interview</option>
            <option value="technical">Technical Round</option>
            <option value="hr">HR Round</option>
            <option value="final">Final Round</option>
          </select>
        )}

        {field("Interviewer(s)",
          <input type="text" style={inputStyle} placeholder="e.g. Priya Sharma, Ravi Kumar"
            value={interviewer} onChange={e => setInterviewer(e.target.value)} />
        )}

        {field("Meeting Link / Location",
          <input type="text" style={inputStyle} placeholder="https://meet.google.com/… or Office Room 201"
            value={link} onChange={e => setLink(e.target.value)} />
        )}

        {field("Duration",
          <select style={inputStyle} value={duration} onChange={e => setDuration(e.target.value)}>
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">1 hour</option>
            <option value="90">1.5 hours</option>
            <option value="120">2 hours</option>
          </select>
        )}

        {field("Notes (optional)",
          <textarea style={{ ...inputStyle, minHeight: 72, resize: "none" }}
            placeholder="Preparation instructions or notes…"
            value={notes} onChange={e => setNotes(e.target.value)} />
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: ".7rem", marginTop: ".4rem", justifyContent: "flex-end" }}>
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-confirm"
            onClick={() => onSave({ candId: c?.id, date, time, type, interviewer, link, duration, notes })}>
            Schedule Interview →
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}