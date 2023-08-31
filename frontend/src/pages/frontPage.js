import React from 'react';
import picture from '../images/front.png'
import { useNavigate } from 'react-router-dom';

const FrontPage = () => {
    const navigate = useNavigate();

    const loginPage = async() => {
        navigate('/login');
    }

    return (
        <div className="relative h-screen">
            <img src={picture} alt="Background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h1 className="text-5xl font-bold mb-2">Welcome to Online Examination Management System</h1>
                {/* <button className='border text-xl font-semibold px-12 py-2 rounded-lg' onClick={loginPage}>LOGIN</button> */}
            </div>
        </div>
    ); 
}

export default FrontPage;
