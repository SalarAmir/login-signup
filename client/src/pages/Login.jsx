import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function login() {
  const [data,setData]= useState({
    email:'',
    password:'',
  })

  const navigate = useNavigate(); // Define navigate using useNavigate

  const loginUser= async(e)=>{
    e.preventDefault()
    const{email,password}= data;
    try {
        const {data} = await axios.post('/login', {
          email,
          password
        });
        if(data.error){
          toast.error(data.error)
        }else{
          setData({});
          navigate('/') // Now you can use navigate
        }
    } catch (error) {
        console.log(error)
    }
      }

  return (
    <div className="container">
    <form className="login-form" onSubmit={loginUser}>
        <h2>Login</h2>
        <label htmlFor="email" className="form-label">Email Address</label>
        <input type="text" id="email" className="form-input" placeholder='Enter email..' value={data.email} onChange={(e)=>setData({...data,email:e.target.value})} />
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" id="password" className="form-input" placeholder='Enter password..' value={data.password} onChange={(e)=>setData({...data,password:e.target.value})} />
        <a href="#" className="forgot-password">Forgot password?</a>
        <br />
        <br />
        <button type='submit' className="form-button">Login</button>
    </form>
</div>

  )
}
