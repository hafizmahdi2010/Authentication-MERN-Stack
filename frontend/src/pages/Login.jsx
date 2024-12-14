import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api_base_url } from '../helper';

const Login = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: pwd
      })
    }).then((res) => res.json()).then((data) => {
      if (data.success) {
        localStorage.setItem("token", data.token);
        navigate("/");
      }
      else {
        setError(data.msg)
      }
    })
  }

  return (
    <>
      <div className="container w-screen h-screen flex items-center justify-center flex-col">
        <form onSubmit={handleSubmit} className='w-[24vw] h-[fit] flex flex-col bg-[#0a0a0a] p-[20px] rounded-xl shadow-xl shadow-black/50'>
          <h3 className='text-2xl mb-3'>Login</h3>

          <div className="inputBox">
            <input onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" placeholder='Email' required />
          </div>

          <div className="inputBox">
            <input onChange={(e) => { setPwd(e.target.value) }} value={pwd} type="password" placeholder='Password' required />
          </div>

          <p className='text-[gray] text-[14px] mt-3 mb-1'>Don't have an account <Link className='text-blue-500' to="/signUp">Sign Up</Link></p>
          <p className='text-red-500 text-[14px] mb-1'>{error}</p>

          <button className="btnNormal bg-blue-500 transition-all hover:bg-blue-600 mt-2 rounded-lg">Login</button>
        </form>
      </div>
    </>
  )
}

export default Login