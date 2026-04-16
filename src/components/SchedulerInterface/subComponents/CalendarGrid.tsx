/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DOW = ["SU","MO","TU","WE","TH","FR","SA"];

interface Props {
  calYear:      number;
  calMonth:     number;
  selDate:      { d: number; m: number; y: number } | null;
  onPickDate:   (d: number) => void;
  onPrevMonth:  () => void;
  onNextMonth:  () => void;
  markedDays?:  Set<number>; // days with interview dots
}

export default function CalendarGrid({
  calYear, calMonth, selDate, onPickDate, onPrevMonth, onNextMonth, markedDays = new Set(),
}: Props) {
  const firstDay    = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const today       = new Date();

  const cells: React.ReactNode[] = [];

  /* Day-of-week headers */
  DOW.forEach(d => cells.push(<div key={"h" + d} className="cal-dow">{d}</div>));

  /* Empty cells before month start */
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={"b" + i} className="cal-day empty" />);
  }

  /* Day cells */
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday  = d === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
    const isSel    = selDate?.d === d && selDate?.m === calMonth && selDate?.y === calYear;
    const hasDot   = markedDays.has(d);
    let cls = "cal-day";
    if (isToday) cls += " today";
    if (isSel)   cls += " selected";
    cells.push(
      <div
        key={"d" + d}
        className={cls}
        onClick={() => onPickDate(d)}
      >
        <div className="cd-num">{d}</div>
        {hasDot && <div className="cd-dots"><div className="cd-dot" /></div>}
      </div>
    );
  }

  return (
    <div className="cal-wrap">
      <div className="cal-nav">
        <div className="cal-arrow" onClick={onPrevMonth}>‹</div>
        <div className="cal-month">{MONTH_NAMES[calMonth]} {calYear}</div>
        <div className="cal-arrow" onClick={onNextMonth}>›</div>
      </div>
      <div className="cal-grid">{cells}</div>
    </div>
  );
}