import Login from '../components/login';

const LoginPage = ()=>{

    return(
        <div className='flex justify-center items-center mt-5 mb-5 h-full'>
            <div className='border-2 border-black rounded-lg w-[30rem] bg-white'>
                <Login />
            </div>
        </div>
    )
}

export default LoginPage;