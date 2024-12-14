import React, { useEffect } from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import { api_base_url } from './helper';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <RouteHandler />
      </BrowserRouter>
    </>
  )
};

const RouteHandler = () => {
  let location = useLocation();
  const navigate = useNavigate();

  const authenticateUser = () => {
    fetch(api_base_url + "/authencateUser", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: localStorage.getItem("token")
      })
    }).then(res => res.json()).then(data => {
      if (data.success === false) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    })
  }

  useEffect(() => {
    // console.log(location.pathname);
    if (location.pathname !== '/signUp' && location.pathname !== '/login') {
      authenticateUser();
    }
  }, [location])


  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signUp' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default App