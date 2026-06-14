import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';

const SearchOrder = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [orders, setOrders] = useState([]);
    const [submitted, setSubmited] = useState(false);
    const adminUser = localStorage.getItem('adminUser')
    const navigate = useNavigate()

    useEffect(() => {
        if (!adminUser) {
            navigate('/admin-login')
            return
        }
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/search-orders?q=${searchTerm}`);
            const data = await response.json();
            setOrders(data);
            setSubmited(true);
        }
        catch {
            toast.error("Error Connecting to server")
        }

    }
    return (
        <AdminLayout>
            <div className='container mt-4'>
                <h3 className='text-center text-primary mb-4'><i className='fas fa-search me-1'></i>Search Orders</h3>
                <form onSubmit={handleSearch} className='d-flex gap-2 mt-3 ' style={{ maxWidth: "600px", margin: '0 auto' }}>
                    <input style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }} className='form-control' type='text' onChange={(e) => setSearchTerm(e.target.value)} placeholder='Enter Order Number' />
                    <button type='submit' style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} className='btn btn-warning px-4'>Search</button>
                </form>


                {submitted && (
                    <table className=' mt-4 table table-bordered table-hover table-striped'>
                        <thead className='table-dark'>
                            <tr>
                                <th>S.No</th>
                                <th>Order Number</th>
                                <th>Order Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                
                                    orders.map((order, index) => (
                                        <tr key={order.id}>
                                            <td>{index + 1}</td>
                                            <td>{order.order_number}</td>
                                            <td>{new Date(order.order_time).toLocaleString()}</td>
                                            <td>
                                                <a href={`/admin-view-order-detail/${order.order_number}`} className="btn btn-sm btn-info me-2"><i className='fas fa-edit me-1'></i>View Details</a>
                                            </td>
                                        </tr>
                                    ))
                                
                            ) : (
                                <tr colspan ="4" className='text-center text-muted'>No Records Found!</tr>
                            )}

                        </tbody>
                    </table>
                )}

            </div>
            <ToastContainer autoClose={2000} />
        </AdminLayout>
    )
}

export default SearchOrder
