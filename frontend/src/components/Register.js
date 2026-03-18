import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PublicLayout from './PublicLayout'
import { useNavigate } from 'react-router-dom'
const Register = () => {

    const [formData, setformData] = useState({
        firstname: '',
        lastname : '',
        email : '',
        password : '',
        mobileno : '',
        repeatpassword : ''
    })
   const navigate = useNavigate();

   const handleChange = (e) => {
        const { name, value } = e.target;
        setformData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
  return (
    <PublicLayout>
        <div className='container py-5'>
            <div className='row shadow-lg rounded-4'>
                <div className='col-md-6 p-4'>
                    <h3 className='text-center mb-4'><i className='fas fa-user-plus me-2'></i>User Registration</h3>
                    <form>
                        <div className='mb-3'>
                            <input name='firstname' type='text' className='form-control' value={formData.firstname} onChange={handleChange} placeholder='First Name' />
                        </div>
                        <div className='mb-3'>
                            <input name='lastname' type='text' className='form-control'  value={formData.lastname} onChange={handleChange} placeholder='Last Name' />
                        </div>
                        <div className='mb-3'>
                            <input name='email' type='email' className='form-control'  value={formData.email} onChange={handleChange} placeholder=' Email ' />
                        </div>
                        <div className='mb-3'>
                            <input name='mobileno' type='number' className='form-control'  value={formData.mobileno} onChange={handleChange} placeholder='Mobile No' />
                        </div>
                        <div className='mb-3'>
                            <input name='password' type='text' className='form-control'  value={formData.password} onChange={handleChange} placeholder=' Password' />
                        </div>
                        <div className='mb-3'>
                            <input name='repeatpassword' type='text' className='form-control'  value={formData.repeatpassword} onChange={handleChange} placeholder='Repeate Password' />
                        </div>
                        <div>
                            <butto className="btn btn-primary w-100"><i className='fas fa-user-check me-2'></i>Submit</butto>
                        </div>
                    </form>
                </div>
                <div className='col-md-6 d-flex align-items-center justify-content-center'>
                    <div className='p-4 text-center'>
                        <img src='images/register.png' className='img-fluid' style={{maxWidth:"600px"}}/>
                        <h5 className='mt-3 '>Registration is fast, secure and free </h5>
                        <p className='text-muted small'>Join our food family and enjoy delicious food delivered to your door!</p>
                    </div>

                </div>

            </div>

        </div>
    </PublicLayout>
  )
}

export default Register
