/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DOW_LONG = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

interface Props {
  selDate:       { d: number; m: number; y: number };
  selSlot:       { time: string } | null;
  candidateName: string;
  jobTitle:      string;
}

export default function InterviewSummary({ selDate, selSlot, candidateName, jobTitle }: Props) {
  const dt    = new Date(selDate.y, selDate.m, selDate.d);
  const dtStr = `${DOW_LONG[dt.getDay()]}, ${MONTH_NAMES[selDate.m]} ${selDate.d}${selSlot ? ` at ${selSlot.time}` : ""}`;

  return (
    <div className="int-summary">
      <span className="int-sum-icon">🗓️</span>
      <div>
        <div className="int-sum-dt">{dtStr}</div>
        <div className="int-sum-meta">
          <div>
            <span className="int-sum-lbl">Position: </span>
            <span className="int-sum-val">{jobTitle || "—"}</span>
          </div>
          <div>
            <span className="int-sum-lbl">Candidate: </span>
            <span className="int-sum-val">{candidateName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}