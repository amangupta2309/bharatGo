import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

export interface SerializableUser {
  uid: string | null;
  email: string | null;
}

interface UserState {
  user: SerializableUser | null;
  loading: boolean;
  error: string | null;
}

const initialState:UserState = {
    user: null,
    loading: false,
    error: null,
};
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = res.user;

      const serializableUser: SerializableUser = {
        uid: user.uid,
        email: user.email,
      };

      return serializableUser;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);


export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data: any, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      const serializableUser: SerializableUser = {
        uid: user.uid,
        email: user.email,
      };
      return serializableUser;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const checkAuthState = createAsyncThunk(
  "user/checkAuthState",
  () => {
    return new Promise<SerializableUser | null>((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user: User | null) => {
          unsubscribe(); // Unsubscribe immediately after the first auth change
          if (user) {
            const serializableUser: SerializableUser = {
              uid: user.uid,
              email: user.email,
            };
            resolve(serializableUser);
          } else {
            resolve(null);
          }
        },
        (error) => {
          reject(error); // Reject the promise if there's an error
        }
      );
    });
  }
);


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload;
        state.loading = false; 
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; 
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.error = null;
        state.loading = false;
      }).addCase(logoutUser.pending, (state) =>{
          state.loading = true;
      }).addCase(logoutUser.rejected, (state, action)=>{
          state.loading = false;
          state.error = action.payload as string;
      }).addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(checkAuthState.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthState.fulfilled, (state) => {
        state.loading = false;
      });
  },
});
export default userSlice.reducer;
export const userActions = userSlice.actions;