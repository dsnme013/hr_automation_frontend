// "use client";

// import React from "react";
// import CandidateScreeningInterface from "@/components/candidateScreening/CandidateScreeningInterface";

// export default function CandidatesPage() {
//   return (
//         <CandidateScreeningInterface />
//   );
// }

// src/app/candidates/page.tsx
import { Suspense } from "react";
import CandidateScreeningInterface from "@/components/candidateScreening/CandidateScreeningInterface";

export const dynamic = "force-dynamic"; // optional; remove if you prefer static where possible

export default function CandidatesPage() {
  return (
    <Suspense fallback={<div className="p-6 text-gray-500">Loading candidates…</div>}>
      <CandidateScreeningInterface />
    </Suspense>
  );
}
