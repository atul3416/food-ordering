import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { useParams, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';

const EditFood = () => {
    const [categories, setCategories] = useState([])
    const [formData, setFormData] = useState({
        category: '',
        item_name: '',
        price: '',
        item_description: '',
        image: '',
        item_quantity: '',
        is_available: ''
    });
    const { id } = useParams();
    const adminUser = localStorage.getItem('adminUser');
    const navigate = useNavigate();
    useEffect(() => {
        if (!adminUser) {
            navigate('/admin-login');
            return;
        }
        fetch(`http://127.0.0.1:8000/api/edit-food/${id}/`)
            .then(res => res.json())
            .then(data => {
                setFormData(data)
            })
            .catch(err => console.error(err))

        fetch('http://127.0.0.1:8000/api/categories/')
            .then(res => res.json())
            .then(data => {
                setCategories(data)
            })

    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            image: e.target.files[0]
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("category", formData.category)
        data.append("item_name", formData.item_name)
        data.append("item_description", formData.item_description)
        data.append("price", formData.price)
        data.append("item_quantity", formData.item_quantity)
        data.append("image", formData.image)
        data.append("is_available", formData.is_available ? "true" : "false");
        try {

            const response = await fetch(`http://127.0.0.1:8000/api/edit-food/${id}/`, {
                method: 'PUT',
                body: data,
            });
            const result = await response.json();

            if (response.status === 200) {

                toast.success(result.message);
            }
            else {
                toast.error(result.message);
            }
        }
        catch (error) {
            console.error(error);
            toast.error("Error connecting to server");
        }
    }
  
    return (
        <AdminLayout>

            <div className='row'>
                <div className='col-md-8'>
                    <div className='p-4 shadow-sm rounded '>
                        <h4 className='mb-4'><i className='fas fa-pen-square '></i> Edit Food Item</h4>

                        <form onSubmit={handleSubmit} encType='multipart/form-data'>
                            <div className='mb-3'>
                                <label className='form-label'>Food Category</label>
                                <select value={formData.category} onChange={handleChange} name="category" className='form-select'>
                                    <option value={""}> -------Select Category------- </option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.category_name}</option>
                                    ))}
                                </select>

                            </div>

                            <div className='mb-3'>
                                <label className='form-label'>Food Item Name</label>
                                <input type='text' value={formData.item_name} onChange={handleChange} name='item_name' className='form-control' placeholder='Enter Food Item Name' required />
                            </div>

                            <div className='mb-3'>
                                <label className='form-label'> Item Description </label>
                                <textarea name='item_description' value={formData.item_description} onChange={handleChange} className='form-control' placeholder='Enter Food Item Name' required />
                            </div>


                            <div className='mb-3'>
                                <label className='form-label'> Quantity  </label>
                                <input name='item_quantity' value={formData.item_quantity} onChange={handleChange} className='form-control' placeholder='Enter Food Item Name' required />
                            </div>

                            <div className='mb-3'>
                                <label className='form-label'> Item Price </label>
                                <input name='price' type='number' value={formData.price} onChange={handleChange} step=".01" className='form-control' placeholder='Enter Food Price' required />
                            </div>

                            <div className='mb-3 form-check form-switch'>
                                <input id='mycheckbox' name='is_available' checked={formData.is_available} onChange={(e) => setFormData({
                                    ...formData,
                                    is_available: e.target.checked
                                })} type='checkbox' className='form-check-input' />
                                <label className='form-check-lable'>
                                    {formData.is_available === "true" ? "Available" : "Not Available"}
                                </label>
                            </div>



                            <div className='mb-3'>
                                <label className='form-label'> Item Image </label>
                                <div className='row d-flex align-items-center'>
                                    <div className='col-md-6'>
                                        <input name='image' type='file' className='form-control' onChange={handleFileChange} accept='image/*' />
                                    </div>
                                    <div className='col-md-6'>
                                        {formData.image && (
                                            <img src={`http://127.0.0.1:8000/${formData.image}`} className='img-fluid'
                                                style={{ height: '100px', width: '100px', border: '1px solid blue', borderRadius: '8px' }} />
                                        )}

                                    </div>
                                </div>
                            </div>

                            <button type='submit' className='btn btn-primary w-100 mt-3'>
                                <i className='fas fa-save me-1'></i> Update Food Item
                            </button>

                        </form>
                    </div>
                </div>
                <div className='col-md-4 d-flex justify-content-center align-items-center'>
                    <i className='fas fa-utensils' style={{ fontSize: '180px', color: '#e5e5e5' }}></i>
                </div>
            </div>
            <ToastContainer autoClose={1500} />
        </AdminLayout>
    )
}

export default EditFood
