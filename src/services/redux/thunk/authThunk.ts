// import axiosInstance from "@/services/api/axiosConfig";

// // LOGIN
// export const loginAPI = async (email: string, password: string) => {
//   const response = await axiosInstance.post("/api/login", { email, password });
//   return response.data;
// };

// // SIGNUP
// export const signupAPI = async (first_name: string, last_name: string, email: string, password: string) => {
//   const response = await axiosInstance.post("/api/register", {
//     first_name,
//     last_name,
//     email,
//     password,
//   });
//   return response.data;
// };

// // SEND OTP
// export const sendOTPAPI = async (email: string) => {
//   const response = await axiosInstance.post("/api/verify-otp", { email });
//   return response.data;
// };

// // VERIFY OTP
// export const verifyOTPAPI = async (email: string, otp: string) => {
//   const response = await axiosInstance.post("/api/verify-otp", { email, otp });
//   return response.data;
// };

// // RESET PASSWORD
// export const resetPasswordAPI = async (email: string, password: string, reset_token: string) => {
//   const response = await axiosInstance.post("/api/forgot-password", {
//     email,
//     password,
//     reset_token,
//   });
//   return response.data;
// };

// import api from "@/services/api/axiosConfig";

// export const loginAPI = async (email: string, password: string) => {
//   const { data } = await api.post("/api/login", { email, password });
//   return data;
// };

// export const signupAPI = async (
//   first_name: string,
//   last_name: string,
//   email: string,
//   password: string) => {
//   const { data } = await api.post("/api/register", {
//     first_name,
//     last_name,
//     email,
//     password,
//   });
//   return data;
// };

// export const resetPasswordAPI = async (payload: any) => {
//   const { data } = await api.post("/api/reset-password", payload);
//   return data;
// };
// Thin API helpers (promise-based) the components can call directly.
// import { api } from "@/services/api/authAPI";

// export type LoginResponse = {
//   token: string;
//   user: { id: number; firstName: string; lastName: string; email: string };
// };

// export async function loginAPI(email: string, password: string): Promise<LoginResponse> {
//   const { data } = await api.post("/api/login", { email, password });
//   // Persist token for client navigation
//   if (typeof window !== "undefined") {
//     localStorage.setItem("tf_token", data.token);
//     localStorage.setItem("tf_user", JSON.stringify(data.user));
//   }
//   return data;
// }

// export async function signupAPI(
//   first_name: string,
//   last_name: string,
//   email: string,
//   password: string
// ): Promise<LoginResponse> {
//   const { data } = await api.post("/api/register", {
//     first_name,
//     last_name,
//     email,
//     password,
//   });
//   return data;
// }

// export async function sendOTPAPI(email: string, resend = false): Promise<{ success: boolean; message: string }> {
//   const { data } = await api.post("/api/forgot-password", { email, resend });
//   return data;
// }

// export async function verifyOTPAPI(
//   email: string,
//   otp: string
// ): Promise<{ success: boolean; reset_token: string; message: string }> {
//   const { data } = await api.post("/api/verify-otp", { email, otp });
//   return data;
// }

// export async function resetPasswordAPI(args: {
//   email: string;
//   password: string;
//   reset_token: string;
// }): Promise<{ success: boolean; message: string }> {
//   const { email, password, reset_token } = args;
//   const { data } = await api.post("/api/reset-password", { email, password, reset_token });
//   return data;
// }

// export function logout() {
//   if (typeof window !== "undefined") {
//     localStorage.removeItem("tf_token");
//     localStorage.removeItem("tf_user");
//   }
// }

// import { api } from "@/services/api/authAPI";


// export type AuthUser = { id: number; firstName: string; lastName: string; email: string };
// export type LoginResponse = { token: string; user: AuthUser };

// // ------- Login / Signup -------
// export async function loginAPI(email: string, password: string): Promise<LoginResponse> {
//   const { data } = await api.post("/api/login", { email, password });
//   return data;
// }

// export async function signupAPI(
//   first_name: string,
//   last_name: string,
//   email: string,
//   password: string
// ): Promise<LoginResponse> {
//   const { data } = await api.post("/api/register", { first_name, last_name, email, password });
//   return data;
// }

// // ------- Password reset (3 steps) -------
// export async function sendOTPAPI(
//   email: string,
//   resend = false
// ): Promise<{ success: boolean; message: string; dev_otp?: string }> {
//   const { data } = await api.post("/api/forgot-password", { email, resend });
//   return data;
// }

// export async function verifyOTPAPI(
//   email: string,
//   otp: string
// ): Promise<{ success: boolean; reset_token: string; message: string }> {
//   const { data } = await api.post("/api/verify-otp", { email, otp });
//   return data;
// }

// export async function resetPasswordAPI(email: string, password: string, resetToken: string, args: {
//   email: string;
//   password: string;
//   reset_token: string;
// }): Promise<{ success: boolean; message: string }> {
//   const { data } = await api.post("/api/reset-password", args);
//   return data;
// }

// src/services/redux/thunk/authThunk.ts
import { api } from "@/services/api/authAPI";

export type AuthUser = { id: number; firstName: string; lastName: string; email: string };
export type LoginResponse = { token: string; user: AuthUser };

// -------------------- Login / Signup --------------------
export async function loginAPI(email: string, password: string): Promise<LoginResponse> {
  const { data } = await api.post("/api/login", { email, password });
  return data; // { token, user }
}

export async function signupAPI(
  first_name: string,
  last_name: string,
  email: string,
  password: string
): Promise<LoginResponse> {
  const { data } = await api.post("/api/register", { first_name, last_name, email, password });
  return data; // { token, user }
}

// -------------------- Password reset (3 steps) --------------------
export async function sendOTPAPI(
  email: string,
  resend = false
): Promise<{ success: boolean; message: string; dev_otp?: string }> {
  const { data } = await api.post("/api/forgot-password", { email, resend });
  return data;
}

export async function verifyOTPAPI(
  email: string,
  otp: string
): Promise<{ success: boolean; reset_token: string; message: string }> {
  const { data } = await api.post("/api/verify-otp", { email, otp });
  return data;
}

/**
 * resetPasswordAPI overloads:
 * - Positional: resetPasswordAPI(email, password, reset_token)
 * - Object:     resetPasswordAPI({ email, password, reset_token })
 */
export function resetPasswordAPI(
  email: string,
  password: string,
  reset_token: string
): Promise<{ success: boolean; message: string }>;
export function resetPasswordAPI(args: {
  email: string;
  password: string;
  reset_token: string;
}): Promise<{ success: boolean; message: string }>;

export async function resetPasswordAPI(
  a: string | { email: string; password: string; reset_token: string },
  b?: string,
  c?: string
): Promise<{ success: boolean; message: string }> {
  let payload: { email: string; password: string; reset_token: string };

  if (typeof a === "string") {
    // Positional usage
    payload = { email: a, password: b as string, reset_token: c as string };
  } else {
    // Object usage
    payload = a;
  }

  const { data } = await api.post("/api/reset-password", payload);
  return data;
}

// -------------------- Optional helpers --------------------
export function persistAuth(token: string, user: AuthUser) {
  if (typeof window !== "undefined") {
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", JSON.stringify(user));
    window.dispatchEvent(new Event("auth-changed"));
  }
}

export function clearAuth() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    window.dispatchEvent(new Event("auth-changed"));
  }
}
