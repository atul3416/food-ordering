import React, { useEffect, useState } from 'react'
import { FaHome, FaPlus, FaSignInAlt, FaTruck, FaUserPlus, FaUserShield, FaUtensils } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import PublicLayout from '../components/PublicLayout'
import '../styles/track.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const TrackOrder = () => {
    const [orderNumber, setOrderNumber] = useState('');
    const [trackingData, settrackingData] = useState([]);

    const { paramOrderNumber } = useParams();
    useEffect(() => {
        if (paramOrderNumber) {
            setOrderNumber(paramOrderNumber);
            handelTrack(paramOrderNumber);
        }
    }, [paramOrderNumber]);


    const handelTrack = async (order_number) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/track_order/${order_number}`)
            if (response.ok) {
                const data = await response.json();
                settrackingData(data);

            }
            else {

                toast.error("Order not found or not placed yet.")
            }
        }
        catch (error) {

            toast.error("something went wrong")
        }
    }
    return (
        <PublicLayout>
            <div className='container mt-4'>

                <h3 className='mb-4'><i className='fas fa-map-marker-alt'></i> Track Your Order...</h3>
                <div className='input-group mb-3 shadow-sm'>
                    <span className='input-group-text'><i className='fas fa-receipt text-muted'></i></span>
                    <input type='text'
                        className='form-control'
                        placeholder='Enter Order Number...'
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                    />
                </div>

                <button onClick={() => handelTrack(orderNumber)} className='btn btn-primary mb-4'>
                    <i className='fas fa-truck me-2'></i>Track
                </button>

                {trackingData.length > 0 && (
                    <div className='card p-4 shadow-sm rounded-4 border-0'>
                        <h5 className='mb-4 text-primary'><i className='fas fa-stream me-1'></i>Order Status Timeline</h5>
                        <div className='d-flex justify-content-between align-items-center mb-5 px-2 position-relative'>
                            <div className='timeline-line'>

                            </div>
                            {trackingData.map((entry, index) => (
                                <div key={index} className='text-center timeline-step '>
                                    <div className='icon text-white mx-auto mb-2 '>
                                        <i className='fas fa-check'></i>
                                    </div>
                                    <small className='fw-bold d-block'>
                                        {entry.status}
                                    </small>
                                    <small className='text-muted'>
                                        {new Date(entry.status_date).toLocaleString()}
                                    </small>
                                </div>
                            ))}
                        </div>
                        <h5 className='mb-2'>Detailed History</h5>
                        <ul className='list-group '>
                            {trackingData.map((entry, index) => (
                                <li key={index} className='list-group-item'>
                                    <span className='badge text-dark me-2'>{entry.status}</span>
                                   <small className='text-muted'>
                                     {new Date(entry.status_date).toLocaleString()}
                                    </small>
                                    {entry.order_cancelled_by_user && (
                                        <span className='badge ms-2'>"Cancelled by User"</span>
                                    )}
                                </li>
                            ))}

                        </ul>
                    </div>
                )}


            </div>

            <ToastContainer autoClose={2000} />
        </PublicLayout>
    )
}

export default TrackOrder
