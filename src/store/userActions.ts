// import axios from 'axios';
// import { userActions } from './userSlice';
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { auth } from '@/firebase/firebaseConfig';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth';



// // export const register = async (data) => {
// //     // this allows us to send form info with image
// //     try {
// //         console.log(data);
// //         const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
// //         console.log(res);
// //         // Registration successful, you can redirect or show a success message
// //         console.log('Registration successful!');
// //         console.log(res.user);
// //         return res.user;
// //       } catch (err) {
// //         setError(err.message);
// //         console.error('Registration error:', err);
// //       }
// // };
// export const registerUser = createAsyncThunk(
//     "user/registerUser",
//     async (data: any, { rejectWithValue }) => {
//       try {
//         const res = await createUserWithEmailAndPassword(
//           auth,
//           data.email,
//           data.password
//         );
//         return res.user;
//       } catch (err: any) {
//         return rejectWithValue(err.message);
//       }
//     }
//   );
  

// export const login = async( data, navigate, setMessage) =>{
//     try {
//         await signInWithEmailAndPassword(auth, data.email, data.password);
//         // Login successful, you can redirect or show a success message
//         console.log('Login successful!');
//         navigate('/');
//       } catch (err) {
//         setError(err.message);
//         console.error('Login error:', err);
//       }
// };
