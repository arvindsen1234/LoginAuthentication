import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
export const Signup = () => { 
    const [signupInfo, setSignupInfo] = useState({
      name:'',
      email:'' ,
      password:'' 
    })
    const navigate = useNavigate();
    const handleChange = (e)=>{
    const{name, value} = e.target;
    const copySignupInfo = { ...signupInfo};
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('name, email and password are required')
        }
        try {
          const url = 'http://localhost:8080/auth/signup'
          const response = await fetch(url, {
            method :"POST",
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify(signupInfo)
          });
          const result = await response.json();
          const {success, message, error} = result;
          if(success){
            handleSuccess(message);
            setTimeout(()=>{
              navigate("/login");
            }, 1000);
        }
        else if(error){
          const details = error?.details[0].message;
          handleError(details);
        }
        else if(!success){
          handleError(message);
        }
      } catch (error) {
          handleError(error);
        }
    }

  return (
    <div className='container'>
       <h1>Signup</h1>

       <form onSubmit={handleSignup}>
        <label htmlFor="name">Name</label>
        <input
        onChange={handleChange}
         type="text"
         name='name'
         autoCorrect
         placeholder='Enter your name....'
         value={signupInfo.name}
         />
<div>   
<label htmlFor="email">Email</label>
        <input
         onChange={handleChange}
         type="email"
         name='email'
         placeholder='Enter your email....'
         value={signupInfo.email}
         />
           <label htmlFor="password">Password</label>
        <input
         onChange={handleChange}
         type="password"
         name='password'
         placeholder='Enter your password....'
         value={signupInfo.password}
         /> 
         </div>
         <button>Signup</button>
        <span>Already have an account ? <Link to="/login">Login</Link>
        </span>
       </form>
     <ToastContainer/> 
    </div>
  )
}
