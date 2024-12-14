import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="con flex w-screen h-screen flex-col items-center justify-center">
        <p>Hi, Mahdi 👋</p>
        <h1 className="text-4xl font-[500]">Welcome to the Home Page</h1>
        <button className="btnNormal bg-red-500 transition-all  hover:bg-red-600 mt-5 rounded-lg !px-[50px]" onClick={()=>{
          localStorage.removeItem('token');
          navigate("/login");
        }}>Logout</button>
      </div>
    </>
  )
}

export default Home