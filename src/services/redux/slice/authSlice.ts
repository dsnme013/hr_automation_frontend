// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { loginAPI, signupAPI } from "../thunk/authThunk";

// interface AuthState {
//   user: any | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: AuthState = {
//   user: null,
//   loading: false,
//   error: null,
// };

// // --- Thunks ---
// export const loginThunk = createAsyncThunk(
//   "auth/login",
//   async (payload: { email: string; password: string }, { rejectWithValue }) => {
//     try {
//       const data = await loginAPI(payload);
//       return data;
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data?.message || "Login failed");
//     }
//   }
// );

// export const signupThunk = createAsyncThunk(
//   "auth/signup",
//   async (payload: { email: string; password: string; name: string }, { rejectWithValue }) => {
//     try {
//       const data = await signupAPI(payload);
//       return data;
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data?.message || "Signup failed");
//     }
//   }
// );

// // --- Slice ---
// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginThunk.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginThunk.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(loginThunk.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { loginAPI, signupAPI } from "../thunk/authThunk";

// /**
//  * Auth state
//  */
// interface AuthState {
//   user: any | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: AuthState = {
//   user: null,
//   loading: false,
//   error: null,
// };

// /**
//  * loginThunk
//  * Works whether loginAPI(email, password) OR loginAPI(payload, config) is implemented.
//  */
// export const loginThunk = createAsyncThunk(
//   "auth/login",
//   async (
//     payload: { email: string; password: string },
//     { rejectWithValue, signal }
//   ) => {
//     try {
//       // Many codebases type loginAPI to need 2 args. Support both shapes:
//       //  - (email, password)
//       //  - (payload, { signal })
//       const result =
//         // If function is declared with exactly 2 required params (common for positional)
//         (loginAPI as any).length >= 2
//           ? // Call as positional: (email, password)
//             await (loginAPI as any)(payload.email, payload.password)
//           : // Otherwise call as object + config
//             await (loginAPI as any)(payload, { signal });

//       return result;
//     } catch (err: any) {
//       return rejectWithValue(err?.response?.data?.message || "Login failed");
//     }
//   }
// );

// /**
//  * signupThunk
//  * Works whether signupAPI(name, email, password) OR signupAPI(payload, config) is implemented.
//  */
// export const signupThunk = createAsyncThunk(
//   "auth/signup",
//   async (
//     payload: { name: string; email: string; password: string },
//     { rejectWithValue, signal }
//   ) => {
//     try {
//       const result =
//         (signupAPI as any).length >= 3
//           ? // Positional: (name, email, password)
//             await (signupAPI as any)(payload.name, payload.email, payload.password)
//           : // Object + config
//             await (signupAPI as any)(payload, { signal });

//       return result;
//     } catch (err: any) {
//       return rejectWithValue(err?.response?.data?.message || "Signup failed");
//     }
//   }
// );

// /**
//  * Slice
//  */
// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // LOGIN
//       .addCase(loginThunk.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginThunk.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(loginThunk.rejected, (state, action) => {
//         state.loading = false;
//         state.error = (action.payload as string) ?? "Login failed";
//       })
//       // SIGNUP
//       .addCase(signupThunk.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(signupThunk.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(signupThunk.rejected, (state, action) => {
//         state.loading = false;
//         state.error = (action.payload as string) ?? "Signup failed";
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = { id: number; firstName: string; lastName: string; email: string } | null;

type AuthState = {
  token: string | null;
  user: User;
};

const initialState: AuthState = {
  token: typeof window !== "undefined" ? localStorage.getItem("tf_token") : null,
  user:
    typeof window !== "undefined" && localStorage.getItem("tf_user")
      ? JSON.parse(localStorage.getItem("tf_user") as string)
      : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ token: string; user: User }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    clearAuth(state) {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
