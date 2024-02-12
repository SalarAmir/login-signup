import React, { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function register() {
  const navigate=useNavigate()
  const[data,setData]= useState({
    name:'',
    email:'',
    password:'',
  })


  const registerUser= async(e)=>{
    e.preventDefault()
    const {name,email,password}= data
    try{
      const {data}= await axios.post ('/register',{
        name,email,password
      })
      if(data.error){
        toast.error(data.error)
      }
      else{
        setData({})
        toast.success('Login Successful. Welcome!')
        navigate('/login')
      }
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <div className="container">
    <form className="register-form" onSubmit={registerUser}>
        <h2>Register Form</h2>
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" id="name" className="form-input" placeholder='Enter Name..' value={data.name} onChange={(e)=>setData({...data,name:e.target.value})} />
        <label htmlFor="email" className="form-label">Email Address</label>
        <input type="text" id="email" className="form-input" placeholder='Enter email..' value={data.email} onChange={(e)=>setData({...data,email:e.target.value})} />
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" id="password" className="form-input" placeholder='Enter password..' value={data.password} onChange={(e)=>setData({...data,password:e.target.value})} />
        <button type='submit' className="form-button">Submit</button>
    </form>
</div>

  )
}
