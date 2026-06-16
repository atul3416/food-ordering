import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { useParams, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';

const EditCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const { id } = useParams();
    const adminUser = localStorage.getItem('adminUser');
    const navigate = useNavigate();
    useEffect(() => {
        if (!adminUser) {
            navigate('/admin-login');
            return;
        }
        fetch(`http://127.0.0.1:8000/api/category_detail/${id}/`)
            .then(res => res.json())
            .then(data => {
                setCategoryName(data.category_name)
            })
            .catch(err => console.error(err))
    }, [id])
    const handleUpdate = (e) => {
        e.preventDefault();
        fetch(`http://127.0.0.1:8000/api/category_detail/${id}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category_name: categoryName })
        })
            .then(res => res.json())
            .then(data => {
                toast.success(data.message)
                setTimeout(() => {
                    navigate('/manage-category')
                }, 2000);

            })
            .catch(err => console.error(err))
    }
    return (
        <div>
            <AdminLayout>
                <div className='container mb-3'>
                    <div className=' shadow-sm rounded'>
                        <h4 className='mb-3'>
                            <i className='fas fa-pen-square me-2'></i>Update Category
                        </h4>

                    </div>
                    <form onSubmit={handleUpdate} className='form-label'>
                        <div className='mb-3'>
                            <label className='form-label'>Category Name</label>
                            <input type='text' className='form-control' value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder='Enter Category Name' required />
                        </div>

                        <button type='submit' className='btn btn-primary w-100 mt-3'>
                            <i className='fas fa-save me-1'></i> Update Category
                        </button>

                    </form>

                </div>
                <ToastContainer autoClose={2000} />
            </AdminLayout>
        </div>
    )
}

export default EditCategory
