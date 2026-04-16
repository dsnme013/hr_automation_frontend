import LoginPage from '@/components/loginForm/Login'
import React from 'react'

const page = () => {
  return (
    <div>
      <LoginPage />
    </div>
  )
}

export default page

// "use client";

// import { useState } from "react";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e: any) => {
//     e.preventDefault();

//     // 🔥 This goes to Flask backend through Next.js proxy
//     const res = await fetch("/api/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     });

//     const data = await res.json();
//     console.log("Login Response:", data);
//   };

//   return (
//     <form onSubmit={handleLogin} className="space-y-4">
//       <input
//         className="border p-2"
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         className="border p-2"
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button type="submit" className="bg-blue-500 text-white p-2">
//         Login
//       </button>
//     </form>
//   );
// }
