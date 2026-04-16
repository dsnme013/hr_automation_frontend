/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";

export interface Interviewer { id: number; name: string; role: string; checked: boolean; }

interface Props {
  items:    Interviewer[];
  onToggle: (id: number) => void;
}

export default function InterviewerPicker({ items, onToggle }: Props) {
  return (
    <div>
      {items.map(iv => (
        <div key={iv.id} className="int-row">
          <div className="int-av">{iv.name.charAt(0)}</div>
          <div style={{ flex: 1 }}>
            <div className="int-nm">{iv.name}</div>
            <div className="int-role">{iv.role}</div>
          </div>
          <input
            type="checkbox"
            className="int-cb"
            checked={iv.checked}
            onChange={() => onToggle(iv.id)}
          />
        </div>
      ))}
    </div>
  );
}