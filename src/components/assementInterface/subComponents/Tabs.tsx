/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Candidate } from "@/services/interfaces/CandidateScreening";

interface TabsProps {
  candidates: Candidate[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  loading: boolean;
}

const CSS = `
.am-tabs {
  display: flex;
  border-bottom: 1px solid var(--card-bd);
  padding: 0 1.2rem;
  overflow-x: auto;
  scrollbar-width: none;
  transition: border-color .35s;
}
.am-tabs::-webkit-scrollbar { display: none; }

.am-tab {
  font-size: .76rem; font-weight: 500;
  color: var(--tx3);
  padding: .75rem .8rem;
  cursor: pointer;
  border: none; background: transparent;
  border-bottom: 2px solid transparent;
  font-family: var(--sans);
  transition: all .15s;
  white-space: nowrap;
}
.am-tab.on {
  color: var(--tab-act-col);
  border-bottom-color: var(--tab-act-bd);
  font-weight: 600;
}
.am-tab:hover:not(.on) { color: var(--tx2); }
.am-tab:disabled { opacity: .5; cursor: default; }
`;

const Tabs: React.FC<TabsProps> = ({ candidates, activeTab, setActiveTab, loading }) => {
  /* Tab definitions — counts mirror HTML tab labels */
  const pendingCount   = candidates.filter(c => c.exam_link_sent && !c.exam_completed && !c.link_expired).length;
  const completedCount = candidates.filter(c => c.exam_completed).length;

  const tabs = [
    { key: "all",       label: "All Candidates"            },
    { key: "pending",   label: `Pending (${pendingCount})` },
    { key: "completed", label: `Completed (${completedCount})` },
    { key: "questions", label: "Questions"                 },
    { key: "results",   label: "Results"                   },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="am-tabs">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`am-tab${activeTab === tab.key ? " on" : ""}`}
            onClick={() => !loading && setActiveTab(tab.key)}
            disabled={loading}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </>
  );
};

export default Tabs;