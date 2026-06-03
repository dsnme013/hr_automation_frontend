// import React from "react";

// /* ── CandidateListSkeleton — mirrors HTML renderSkeleton() exactly ── */
// const CandidateListSkeleton: React.FC = () => (
//   <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
//     {Array.from({ length: 7 }).map((_, i) => (
//       <div key={i} className="cs-skel-item">
//         {/* Avatar circle */}
//         <div className="cs-skel" style={{ width:38, height:38, borderRadius:"50%", flexShrink:0 }} />
//         {/* Text lines */}
//         <div style={{ flex:1, display:"flex", flexDirection:"column", gap:5, paddingTop:2 }}>
//           <div className="cs-skel" style={{ height:12, width:"55%" }} />
//           <div className="cs-skel" style={{ height:10, width:"42%" }} />
//           <div className="cs-skel" style={{ height:9,  width:"35%" }} />
//           <div className="cs-skel" style={{ height:15, width:76, borderRadius:20 }} />
//         </div>
//         {/* Score + denom */}
//         <div style={{ flexShrink:0, display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
//           <div className="cs-skel" style={{ height:20, width:36, borderRadius:6 }} />
//           <div className="cs-skel" style={{ height:8,  width:26 }} />
//         </div>
//       </div>
//     ))}
//   </div>
// );

// export default CandidateListSkeleton;

import React from "react";

/**
 * CandidateListSkeleton
 * Mirrors HTML renderSkeleton() exactly — 7 shimmer rows.
 * CSS classes: cs-skel-item, cs-skel (defined in CandidateScreeningInterface global CSS)
 */
const CandidateListSkeleton: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
    {Array.from({ length: 7 }).map((_, i) => (
      <div key={i} className="cs-skel-item">
        {/* Avatar circle */}
        <div
          className="cs-skel"
          style={{ width: 38, height: 38, borderRadius: "50%", flexShrink: 0 }}
        />
        {/* Text lines */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 5,
            paddingTop: 2,
          }}
        >
          <div className="cs-skel" style={{ height: 12, width: "55%" }} />
          <div className="cs-skel" style={{ height: 10, width: "42%" }} />
          <div className="cs-skel" style={{ height: 9, width: "35%" }} />
          <div
            className="cs-skel"
            style={{ height: 15, width: 76, borderRadius: 20 }}
          />
        </div>
        {/* Score badge + denom */}
        <div
          style={{
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 4,
          }}
        >
          <div
            className="cs-skel"
            style={{ height: 20, width: 36, borderRadius: 6 }}
          />
          <div className="cs-skel" style={{ height: 8, width: 26 }} />
        </div>
      </div>
    ))}
  </div>
);

export default CandidateListSkeleton;