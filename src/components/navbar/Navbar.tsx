// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import AuthModal from "../modal/AuthModal";
// import { User, LogOut } from "lucide-react";

// // ── Routes where the top navbar should be HIDDEN ──────────────────────────────
// // The Dashboard (and all its sub-pages) already has a sidebar, so no top nav.
// const SIDEBAR_ROUTES = [
//   "/dashboard",
//   "/candidates",
//   "/scheduler",
//   "/assessments",
//   "/interview-results",
// ];

// const Navbar: React.FC = () => {
//   const [mounted, setMounted]               = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [showModal, setShowModal]           = useState(false);
//   const pathname = usePathname();
//   const router   = useRouter();

//   const navItems = [
//     { path: "/dashboard",         label: "Dashboard"         },
//     { path: "/candidates",        label: "Candidates"        },
//     { path: "/scheduler",         label: "Scheduling"        },
//     { path: "/assessments",       label: "Assessments"       },
//     { path: "/interview-results", label: "Interview Results" },
//   ];

//   const syncAuth = () => {
//     const token =
//       (typeof window !== "undefined" && localStorage.getItem("authToken")) ||
//       (typeof window !== "undefined" && localStorage.getItem("tf_token"));
//     setIsAuthenticated(!!token);
//   };

//   useEffect(() => {
//     setMounted(true);
//     syncAuth();
//     const onStorage     = () => syncAuth();
//     const onAuthChanged = () => syncAuth();
//     window.addEventListener("storage",      onStorage);
//     window.addEventListener("auth-changed", onAuthChanged as EventListener);
//     return () => {
//       window.removeEventListener("storage",      onStorage);
//       window.removeEventListener("auth-changed", onAuthChanged as EventListener);
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("tf_token");
//     localStorage.removeItem("authUser");
//     window.dispatchEvent(new Event("auth-changed"));
//     router.replace("/");
//   };

//   if (!mounted) return null;

//   // ── Hide navbar completely on sidebar-layout routes ──────────────────────────
//   // Dashboard pages have their own sidebar — no top nav needed there.
//   const isOnSidebarRoute = SIDEBAR_ROUTES.some(
//     (route) => pathname === route || pathname.startsWith(route + "/")
//   );
//   if (isOnSidebarRoute) return null;

//   // ── Auth / freeze logic for login/home pages ──────────────────────────────────
//   const isLoginRoute = pathname === "/" || pathname === "/login";
//   const freezeNav    = !isAuthenticated && isLoginRoute;

//   return (
//     <>
//       {/* ── Navbar shell ── */}
//       <header
//         style={{
//           display:        "flex",
//           alignItems:     "center",
//           justifyContent: "space-between",
//           padding:        "0 24px",
//           height:         56,
//           background:     "#ffffff",
//           borderBottom:   "1px solid #e5e7eb",
//           boxShadow:      "0 1px 3px rgba(0,0,0,0.06)",
//           position:       "sticky",
//           top:            0,
//           zIndex:         100,
//           fontFamily:     "inherit",
//         }}
//       >
//         {/* ── Left: brand + nav ── */}
//         <div style={{ display: "flex", alignItems: "center" }}>

//           {/* Brand */}
//           {freezeNav ? (
//             <span style={{ fontSize: 20, fontWeight: 700, color: "#9ca3af", userSelect: "none" }}>
//               TalentFlow AI
//             </span>
//           ) : (
//             <Link
//               href="/"
//               style={{ fontSize: 20, fontWeight: 700, color: "#2563eb", textDecoration: "none" }}
//             >
//               TalentFlow AI
//             </Link>
//           )}

//           {/* Nav links */}
//           <nav
//             style={{
//               display:    "flex",
//               alignItems: "center",
//               gap:        4,
//               marginLeft: 40,
//             }}
//           >
//             {navItems.map((item) =>
//               freezeNav ? (
//                 <span
//                   key={item.path}
//                   style={{
//                     padding:    "6px 12px",
//                     fontSize:   14,
//                     color:      "#9ca3af",
//                     cursor:     "not-allowed",
//                     userSelect: "none",
//                   }}
//                 >
//                   {item.label}
//                 </span>
//               ) : (
//                 <Link
//                   key={item.path}
//                   href={item.path}
//                   style={{
//                     padding:        "6px 12px",
//                     borderRadius:   8,
//                     fontSize:       14,
//                     fontWeight:     pathname === item.path ? 600 : 400,
//                     color:          pathname === item.path ? "#2563eb" : "#4b5563",
//                     background:     pathname === item.path ? "#eff6ff" : "transparent",
//                     textDecoration: "none",
//                     transition:     "all 0.14s",
//                     whiteSpace:     "nowrap",
//                   }}
//                 >
//                   {item.label}
//                 </Link>
//               )
//             )}
//           </nav>
//         </div>

//         {/* ── Right: auth button ── */}
//         {!isAuthenticated ? (
//           freezeNav ? null : (
//             <button
//               type="button"
//               onClick={() => setShowModal(true)}
//               style={{
//                 display:      "flex",
//                 alignItems:   "center",
//                 gap:          8,
//                 padding:      "8px 16px",
//                 fontSize:     13,
//                 fontWeight:   500,
//                 color:        "#fff",
//                 background:   "#2563eb",
//                 border:       "none",
//                 borderRadius: 8,
//                 cursor:       "pointer",
//                 transition:   "background 0.14s",
//               }}
//               onMouseEnter={e =>
//                 ((e.currentTarget as HTMLButtonElement).style.background = "#1d4ed8")
//               }
//               onMouseLeave={e =>
//                 ((e.currentTarget as HTMLButtonElement).style.background = "#2563eb")
//               }
//             >
//               <User size={16} />
//               Login / Signup
//             </button>
//           )
//         ) : (
//           <button
//             onClick={handleLogout}
//             style={{
//               display:      "flex",
//               alignItems:   "center",
//               gap:          8,
//               padding:      "8px 16px",
//               fontSize:     13,
//               fontWeight:   500,
//               color:        "#fff",
//               background:   "#dc2626",
//               border:       "none",
//               borderRadius: 8,
//               cursor:       "pointer",
//               transition:   "background 0.14s",
//             }}
//             onMouseEnter={e =>
//               ((e.currentTarget as HTMLButtonElement).style.background = "#b91c1c")
//             }
//             onMouseLeave={e =>
//               ((e.currentTarget as HTMLButtonElement).style.background = "#dc2626")
//             }
//           >
//             <LogOut size={16} />
//             Logout
//           </button>
//         )}
//       </header>

//       {showModal && <AuthModal onClose={() => setShowModal(false)} />}
//     </>
//   );
// };

// export default Navbar;
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AuthModal from "../modal/AuthModal";
import { User, LogOut } from "lucide-react";

// ── Routes where the top navbar is HIDDEN completely ─────────────────────────
// 1. Dashboard/app pages  → have their own sidebar
// 2. Auth pages           → full-screen layouts, no nav bar needed
const HIDDEN_ROUTES = [
  // App sidebar pages
  "/dashboard",
  "/candidates",
  "/scheduler",
  "/assessments",
  "/interview-results",
  "/reports",
  // Auth / landing pages
  "/",
  "/login",
  "/signup",
  "/forget-password",
  "/forgot-password",
];

const Navbar: React.FC = () => {
  const [mounted,         setMounted]         = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal,       setShowModal]       = useState(false);
  const pathname = usePathname();
  const router   = useRouter();

  const navItems = [
    { path: "/dashboard",         label: "Dashboard"         },
    { path: "/candidates",        label: "Candidates"        },
    { path: "/scheduler",         label: "Scheduling"        },
    { path: "/assessments",       label: "Assessments"       },
    { path: "/interview-results", label: "Interview Results" },
  ];

  const syncAuth = () => {
    if (typeof window === "undefined") return;
    const token =
      localStorage.getItem("authToken") ||
      localStorage.getItem("tf_token");
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    setMounted(true);
    syncAuth();
    const onStorage     = () => syncAuth();
    const onAuthChanged = () => syncAuth();
    window.addEventListener("storage",      onStorage);
    window.addEventListener("auth-changed", onAuthChanged as EventListener);
    return () => {
      window.removeEventListener("storage",      onStorage);
      window.removeEventListener("auth-changed", onAuthChanged as EventListener);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("tf_token");
    localStorage.removeItem("authUser");
    window.dispatchEvent(new Event("auth-changed"));
    router.replace("/login");
  };

  // Wait for hydration
  if (!mounted) return null;

  // ── Hide on all auth + sidebar routes ────────────────────────────────────
  const isHidden = HIDDEN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
  if (isHidden) return null;

  return (
    <>
      <header
        style={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          padding:        "0 24px",
          height:         56,
          background:     "#ffffff",
          borderBottom:   "1px solid #e5e7eb",
          boxShadow:      "0 1px 3px rgba(0,0,0,0.06)",
          position:       "sticky",
          top:            0,
          zIndex:         100,
          fontFamily:     "inherit",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link
            href="/"
            style={{ fontSize: 20, fontWeight: 700, color: "#2563eb", textDecoration: "none" }}
          >
            TalentFlow AI
          </Link>

          {/* Nav links — only shown when authenticated */}
          {isAuthenticated && (
            <nav style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 40 }}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  style={{
                    padding:        "6px 12px",
                    borderRadius:   8,
                    fontSize:       14,
                    fontWeight:     pathname === item.path ? 600 : 400,
                    color:          pathname === item.path ? "#2563eb" : "#4b5563",
                    background:     pathname === item.path ? "#eff6ff" : "transparent",
                    textDecoration: "none",
                    transition:     "all 0.14s",
                    whiteSpace:     "nowrap",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>

        {/* Right: Login button or Logout button */}
        {!isAuthenticated ? (
          <button
            type="button"
            onClick={() => setShowModal(true)}
            style={{
              display:      "flex",
              alignItems:   "center",
              gap:          8,
              padding:      "8px 16px",
              fontSize:     13,
              fontWeight:   500,
              color:        "#fff",
              background:   "#2563eb",
              border:       "none",
              borderRadius: 8,
              cursor:       "pointer",
              transition:   "background 0.14s",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "#1d4ed8")}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "#2563eb")}
          >
            <User size={16} />
            Login / Signup
          </button>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              display:      "flex",
              alignItems:   "center",
              gap:          8,
              padding:      "8px 16px",
              fontSize:     13,
              fontWeight:   500,
              color:        "#fff",
              background:   "#dc2626",
              border:       "none",
              borderRadius: 8,
              cursor:       "pointer",
              transition:   "background 0.14s",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "#b91c1c")}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "#dc2626")}
          >
            <LogOut size={16} />
            Logout
          </button>
        )}
      </header>

      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Navbar;