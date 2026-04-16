/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";

export interface Slot { id: number; time: string; available: boolean; }

interface Props {
  selDate:   { d: number; m: number; y: number };
  selSlot:   Slot | null;
  morning:   Slot[];
  afternoon: Slot[];
  onPickSlot:(s: Slot) => void;
  onBack:    () => void;
}

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DOW_LONG = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

export default function TimeSlots({
  selDate, selSlot, morning, afternoon, onPickSlot, onBack,
}: Props) {
  const dt    = new Date(selDate.y, selDate.m, selDate.d);
  const dtStr = `${DOW_LONG[dt.getDay()]}, ${MONTH_NAMES[selDate.m]} ${selDate.d}`;

  const mkSlot = (s: Slot) => (
    <div
      key={s.id}
      className={`slot ${s.available ? "avail" : "taken"}${selSlot?.id === s.id ? " sel" : ""}`}
      onClick={() => { if (s.available) onPickSlot(s); }}
    >
      <div className="slot-time">
        <span className="slot-time-icon">🕐</span>
        {s.time}
      </div>
      <span className={`slot-badge ${s.available ? "av" : "tk"}`}>
        {s.available ? "Available" : "Taken"}
      </span>
    </div>
  );

  return (
    <div className="time-wrap">
      <button className="tw-back" onClick={onBack}>‹ Back to calendar</button>
      <div className="tw-title">Select a time on {dtStr}</div>
      <div className="tw-sections">
        <div>
          <div className="tw-sec-lbl">Morning</div>
          <div className="slot-list">{morning.map(mkSlot)}</div>
        </div>
        <div>
          <div className="tw-sec-lbl">Afternoon</div>
          <div className="slot-list">{afternoon.map(mkSlot)}</div>
        </div>
      </div>
    </div>
  );
}