import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';

const ViewFoodOrder = () => {
    const { orderNumber } = useParams();
    const naviage = useNavigate();
    const adminUser = localStorage.getItem('adminUser')
    const [data, setData] = useState(null)
    useEffect(() => {
        if (!adminUser) {
            naviage('/admin-login');
            return;
        }
        fetch(`http://127.0.0.1:8000/api/view-order-detail/${orderNumber}/`)
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
    }, [orderNumber])

    if (!data) return <AdminLayout><p className='text-center mt-5'>Loading.....</p></AdminLayout>

    const { order, food, tracking } = data;

    return (
        <AdminLayout>
            <div className='container mt-4'>

                <h3 className='text-center text-primary mb-4>'>Order Details #{order.order_number}</h3>
                <div className='row '>
                    <div className='col-md-6'>
                        <h5>User Info</h5>
                        <table className='table table-bordered'>
                            <tbody>
                                <tr><th>First Name</th><td>{order.user_first_name}</td></tr>
                                <tr><th>Last Name</th><td>{order.user_last_name}</td></tr>
                                <tr><th>Email</th><td>{order.user_email}</td></tr>
                                <tr><th>Mobile</th><td>{order.user_mobile}</td></tr>
                                <tr><th>Address</th><td>{order.address}</td></tr>
                                <tr><th>Order Time</th><td>{new Date(order.order_time).toLocaleString()}</td></tr>
                                <tr><th>Final Status</th><td>{order.order_final_status || "Pending"}</td></tr>
                            </tbody>

                        </table>
                    </div>
                    <div className='col-md-6'>
                        <h5>Ordered Foods</h5>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>

                                </tr>
                            </thead>
                            <tbody>
                                {food.map((fo, index) => (
                                    <tr key={index}>
                                        <td className='text-center'><img src={`http://127.0.0.1:8000${fo.image}`} style={{ height: '50px', width: '50px', borderRadius: '8px' }} /></td>
                                        <td>{fo.item_name}</td>
                                        <td>{fo.item_price}</td>
                                        <td>{fo.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h5 className='mt-4' >Tracking History</h5>

                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>SrNo</th>
                                <th>Status</th>
                                <th>Remark</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tracking.length == 0 ? (
                                <tr><td colSpan="4" className='text-center'> No tracking history yet</td></tr>
                            ) : (
                                
                                    tracking.map((track, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{track.status}</td>
                                            <td>{track.remark}</td>
                                            <td>{track.status_date}</td>
                                        </tr>
                                    ))
                                
                            )}

                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    )
}

export default ViewFoodOrder
