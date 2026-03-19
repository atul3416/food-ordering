import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PublicLayout from './PublicLayout'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [formData,setFormData]  = useState({
        emailcont:'',
        password:'',
    })
    const navigate = useNavigate();
    const handleChange = (e)=>{
        const {name , value} = e.target;

        setFormData((prev)=>({
            ...prev,
            [name] : value
        }))
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const { emailcont, password} = formData;
        try{
            const response = await fetch('http://127.0.0.1:8000/api/login/',{
                method : 'POST',
                headers : {'Content-Type': 'application/json'},
                body : JSON.stringify({emailcont, password})
            })
            const result = await response.json();
            if(response.status === 200){
                toast.success(result.message || "Login Successfull");

                setFormData({
                    emailcont: '',
                    password : '',
                })
                localStorage.setItem('userId',result.userId);
                localStorage.setItem('userName',result.userName);
                setTimeout(()=>{
                    navigate('/')
                },500)
            }
            else{
                toast.error(result.message || "Wrong Id or Password ")
            }
        }
        catch(error){
            console.error(error);
            toast.error("Error connecting to server");
        }
    }
  
  return (
    <div>
      <PublicLayout>
            <div className='container py-5'>
                <div className='row align-items-center'>
                    <div className='col-md-6 p-4'>
                        <h3 className='text-center mb-4'><i className='fas fa-sign-in-alt me-2'></i>User Login</h3>
                        <form className='card p-4 shadow' onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <input name='emailcont' type='text' className='form-control' value={formData.emailcont} onChange={handleChange} placeholder='Email/Mobile' required/>
                            </div>
                            <div className='mb-3'>
                                <input name='password' type='password' className='form-control' value={formData.password} onChange={handleChange} placeholder='Password' required />
                            </div>
                            
                            <div className=''>
                                <button type='submit' className="btn btn-primary w-100" ><i className='fas fa-sign-in me-2'></i>Login</button>
                                <p className='mt-2'>New User? <span><Link to="/register" className='nav-link text-primary'>Create account</Link></span></p>
                            </div>
                        </form>
                    </div>
                    <div className='col-md-6 d-flex align-items-center justify-content-center'>
                        <div className='p-4 text-center'>
                            <img src='images/login.png' className='img-fluid' style={{ maxWidth: "600px" }} />
                           
                        </div>

                    </div>

                </div>
                <ToastContainer autoClose={2000} />
            </div>
        </PublicLayout>
    </div>
  )
}

export default Login
