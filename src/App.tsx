import { useEffect} from 'react';
import Nav from './components/nav';
import LandingPage from './pages/landing';
import Login from './pages/loginPage'
import { Routes, Route, Navigate } from 'react-router-dom';
import Profile from './pages/profile';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { checkAuthState } from './store/userSlice';
import { userActions } from './store/userSlice';
import { SerializableUser } from './store/userSlice';
import { useAppDispatch } from './store/hooks';



function App() {
  
  const dispatch = useAppDispatch();

  const user = useSelector((state: any) => state.user.user); // Added null check for user
  useEffect(() => {
    const handleCheckAuthState = async () => {
      try {
        const user = await dispatch(checkAuthState()).unwrap() as SerializableUser | null;
        dispatch(userActions.setUser(user));
        console.log('Auth state checked successfully');
      } catch (error) {
        // Type guard to check if error is an instance of Error
        if (error instanceof Error) {
          console.error('Auth state check failed:', error.message);
        } else {
          // Log the error object for inspection
          console.error('Auth state check failed: An unknown error occurred.', error);
        }
      }
    };

    handleCheckAuthState();
  }, [dispatch]);


  return (
    <div className="App">
      <Nav />
      <div className='min-h-screen pt-16 pb-5 bg-red-100'>
        <Routes>
            <Route path='/' element= {<LandingPage />} />
            <Route path='/login' element = {!user? <Login /> : <Navigate to="/" />} />
            <Route path='/profile' element=  {user ? <Profile /> : <Navigate to='/login'/>} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;