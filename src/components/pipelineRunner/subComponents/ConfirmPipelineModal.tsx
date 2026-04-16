// import React from "react";
// import { X, FileText, Zap, AlertCircle } from "lucide-react";

// type Provider = "testlify" | "criteria";

// type Props = {
//   job: { title?: string; location?: string };
//   onClose?: () => void;
//   // returns the chosen provider
//   onChoose: (assessmentProvider: Provider) => void;
// };

// const ConfirmPipelineModal: React.FC<Props> = ({ job, onClose, onChoose }) => {
//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
//         <div className="flex justify-between items-start mb-4">
//           <h3 className="text-lg font-semibold text-gray-900">Configure Pipeline</h3>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <div className="mb-6">
//           <p className="text-gray-600 mb-4">Choose how you want to run the recruitment pipeline:</p>
//           <div className="bg-gray-50 p-3 rounded-lg">
//             <p className="font-medium text-gray-900">{job?.title}</p>
//             <p className="text-sm text-gray-500">{job?.location}</p>
//           </div>
//         </div>

//         <div className="space-y-3 mb-6">
//           {/* OPTION 1: Testlify */}
//           <button
//             onClick={() => onChoose("testlify")}
//             className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
//           >
//             <div className="flex items-start">
//               <FileText className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
//               <div className="text-left flex-1">
//                 <h4 className="font-medium text-gray-900 group-hover:text-blue-600">
//                   Full Pipeline (Testlify)
//                 </h4>
//                 <p className="text-sm text-gray-500 mt-1">
//                   • Scrape resumes<br />• Create <b>Testlify</b> assessment<br />• AI screening &amp; scoring
//                 </p>
//                 <p className="text-xs text-blue-600 mt-2">~5–10 minutes</p>
//               </div>
//             </div>
//           </button>

//           {/* OPTION 2: Criteria */}
//           <button
//             onClick={() => onChoose("criteria")}
//             className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all group"
//           >
//             <div className="flex items-start">
//               <Zap className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
//               <div className="text-left flex-1">
//                 <h4 className="font-medium text-gray-900 group-hover:text-green-600">
//                   Quick Pipeline (Criteria)
//                 </h4>
//                 <p className="text-sm text-gray-500 mt-1">
//                   • Scrape resumes<br />• Create <b>Criteria</b> assessment<br />• AI screening &amp; scoring
//                 </p>
//                 <p className="text-xs text-green-600 mt-2">~5–10 minutes</p>
//               </div>
//             </div>
//           </button>
//         </div>

//         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
//           <div className="flex">
//             <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0" />
//             <div className="text-sm text-yellow-800">
//               <p className="font-medium">Note:</p>
//               <p>You can also create assessments later from the Assessments page.</p>
//             </div>
//           </div>
//         </div>

//         <div className="mt-6 flex justify-end">
//           <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConfirmPipelineModal;

import React from "react";
import { Loader2 } from "lucide-react";

interface Props {
  job?: { id?: string | number; title?: string; location?: string; description?: string };
  onClose?: () => void;
  onChoose?: () => void;   // no args — provider choice removed
}

const ConfirmPipelineModal: React.FC<Props> = ({ job, onClose, onChoose }) => {
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true);
      setTimeout(() => {
        onChoose?.();
        onClose?.();
      }, 1500);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 text-center">
        {!started ? (
          <>
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
            <p className="text-gray-700 font-medium">Starting pipeline for</p>
            <p className="text-blue-600 font-semibold mt-1">{job?.title}</p>
            <p className="text-sm text-gray-400 mt-2">Please wait...</p>
          </>
        ) : (
          <>
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
              <span className="text-green-600 text-lg">✓</span>
            </div>
            <p className="text-gray-700 font-medium">Pipeline started!</p>
            <p className="text-blue-600 font-semibold mt-1">{job?.title}</p>
            <p className="text-sm text-gray-400 mt-2">Running in background...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmPipelineModal;