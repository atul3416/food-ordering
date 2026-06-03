import React, { useEffect, useState } from 'react'
import PublicLayout from '../components/PublicLayout'
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const ChangePass = () => {
    const userId = localStorage.getItem("userId");
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate('/login');
            return;
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (formData.newPassword !== formData.confirmPassword) {
                toast.error('New password and confirm password do not match')
                return;
            }
            const response = await fetch(`http://127.0.0.1:8000/api/change_password/${userId}/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    current_password: formData.currentPassword, new_password: formData.newPassword
                })
            });
            const result = await response.json()

            if (response.status === 200) {
                toast.success(result.message || 'password changed successfully');
                setFormData(
                    {
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                    }
                )
            }
            else {
                toast.error(result.message || 'Something went wrong')
            }

        }
        catch (error) {
            console.log(error)
            toast.error("Error connecting to server")
        }
    }
    return (
        <PublicLayout>
            <ToastContainer autoClose={2000} />
            <div className='container py-5' >
                <h3 className='text-center text-primary mb-4'><i className='fas fa-key me-2'></i>Change Password</h3>
                <form onSubmit={handleSubmit} className='card p-4 shadow-sm border-0'>
                    <div >
                        <label className='mb-1'>Current Password</label>
                        <input name="currentPassword" type='password' className='form-control'  onChange={handleChange} value={formData.currentPassword}/>
                    </div>

                    <div >
                        <label className='mb-1'>New Password</label>
                        <input type='password' name='newPassword' className='form-control' onChange={handleChange} value={formData.newPassword}  />
                    </div>

                    <div>
                        <label className='mb-1'>Confirm Password</label>
                        <input type='password' name='confirmPassword' className='form-control' onChange={handleChange} value={formData.confirmPassword}  />
                    </div>



                    <button onSubmit={handleSubmit} className='btn btn-primary mt-3'>
                        <i className='fas fa-check-circle me-2'></i>Change Password
                    </button>

                </form>

            </div>
        </PublicLayout>
    )
}

export default ChangePass
