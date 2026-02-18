import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const AddFood = () => {
    const [categories, setCategories] = useState([]);
    const [formData, setformData] = useState(
        {
            category: '',
            item_name: '',
            item_price: '',
            item_description: '',
            image: null,
            item_quantity: ''
        }
    )

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/categories/')
            .then(res => res.json())
            .then(data => {
                setCategories(data)
            })
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleFileChange = (e) => {
        setformData((prev) => ({
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
        data.append("price", formData.item_price)
        data.append("item_quantity", formData.item_quantity)
        data.append("image", formData.image)
        try {

            const response = await fetch('http://127.0.0.1:8000/api/add-food-item/', {
                method: 'POST',
                body: data,
            });
            const result = await response.json();

            if (response.status === 201) {

                toast.success(result.message);
                setformData({
                    category: '',
                    item_name: '',
                    item_price: '',
                    item_description: '',
                    image: null,
                    item_quantity: ''
                })
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
        <div>
            <AdminLayout>

                <div className='row'>
                    <div className='col-md-8'>
                        <div className='p-4 shadow-sm rounded '>
                            <h4 className='mb-4'><i className='fas fa-plus-circle text-primary'></i> Add Food Item</h4>

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
                                    <input name='item_price' type='number' value={formData.item_price} onChange={handleChange} step=".01" className='form-control' placeholder='Enter Food Item Name' required />
                                </div>

                                <div className='mb-3'>
                                    <label className='form-label'> Item Image </label>
                                    <input name='image' type='file' className='form-control' onChange={handleFileChange} accept='image/*' required />
                                </div>

                                <button type='submit' className='btn btn-primary w-100 mt-3'>
                                    <i className='fas fa-plus me-1'></i> Add Food Item
                                </button>

                            </form>
                        </div>
                    </div>
                    <div className='col-md-4 d-flex justify-content-center align-items-center'>
                        <i className='fas fa-utensils' style={{ fontSize: '180px', color: '#e5e5e5' }}></i>
                    </div>
                </div>
            </AdminLayout>
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default AddFood
