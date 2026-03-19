import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PublicLayout from './PublicLayout'
import { useNavigate } from 'react-router-dom'
const Register = () => {

    const [formData, setformData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        mobileno: '',
        repeatpassword: ''
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { firstname, lastname, email, password, mobileno, repeatpassword } = formData;
        if (password != repeatpassword) {
            toast.error("Password and Confirm Password do not match");
            return;
        }
        try {

            const response = await fetch('http://127.0.0.1:8000/api/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstname, lastname, email, password, mobileno })
            });
            const result = await response.json();

            if (response.status === 201) {

                toast.success(result.message || "You have successfully registered");
                setformData({
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: '',
                    mobileno: '',
                    repeatpassword: ''
                })
            }
            else {
                toast.error(result.message || "Something went wrong");
            }
        }
        catch (error) {
            console.error(error);
            toast.error("Error connecting to server");
        }
    }
    return (
        <PublicLayout>
            <div className='container py-5'>
                <div className='row shadow-lg rounded-4'>
                    <div className='col-md-6 p-4'>
                        <h3 className='text-center mb-4'><i className='fas fa-user-plus me-2'></i>User Registration</h3>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <input name='firstname' type='text' className='form-control' value={formData.firstname} onChange={handleChange} placeholder='First Name' required/>
                            </div>
                            <div className='mb-3'>
                                <input name='lastname' type='text' className='form-control' value={formData.lastname} onChange={handleChange} placeholder='Last Name' required />
                            </div>
                            <div className='mb-3'>
                                <input name='email' type='email' className='form-control' value={formData.email} onChange={handleChange} placeholder=' Email ' required/>
                            </div>
                            <div className='mb-3'>
                                <input name='mobileno' type='tel' className='form-control' value={formData.mobileno} onChange={handleChange} placeholder='Mobile No' required/>
                            </div>
                            <div className='mb-3'>
                                <input name='password' type='password' className='form-control' value={formData.password} onChange={handleChange} placeholder=' Password' required/>
                            </div>
                            <div className='mb-3'>
                                <input name='repeatpassword' type='password' className='form-control' value={formData.repeatpassword} onChange={handleChange} placeholder='Repeate Password' />
                            </div>
                            <div>
                                <button type='submit' className="btn btn-primary w-100" ><i className='fas fa-user-check me-2'></i>Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className='col-md-6 d-flex align-items-center justify-content-center'>
                        <div className='p-4 text-center'>
                            <img src='images/register.png' className='img-fluid' style={{ maxWidth: "600px" }} />
                            <h5 className='mt-3 '>Registration is fast, secure and free </h5>
                            <p className='text-muted small'>Join our food family and enjoy delicious food delivered to your door!</p>
                        </div>

                    </div>

                </div>
                <ToastContainer autoClose={2000} />
            </div>
        </PublicLayout>
    )
}

export default Register
