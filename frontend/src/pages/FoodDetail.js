import React, { useEffect, useState } from 'react'
import { FaHome, FaPlus, FaSignInAlt, FaTruck, FaUserPlus, FaUserShield, FaUtensils } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import PublicLayout from '../components/PublicLayout'
import { useParams, useNavigate } from 'react-router-dom'


const FoodDetail = () => {
    const userId = localStorage.getItem("userId");
    const [food, setFood] = useState(null);
    const { id } = useParams();

    useEffect(() => {

        fetch(`http://127.0.0.1:8000/api/food/${id}`)
            .then(res => res.json())
            .then(data => {
                setFood(data)
            })

    }, []);

    if (!food) return <div>Loading...</div>
    return (
        <PublicLayout>
            <div className=' container py-5 '>
                <div className='row'>
                    <div className='col-md-5 text-center'>
                        <img src={`http://127.0.0.1:8000${food.image}`} style={{ height: '300px', width: '450px' }} />

                    </div>
                    <div className='col-md-7 '>
                        <h2>{food.item_name}</h2>
                        <p className='text-muted'>{food.item_description}</p>
                        <p><strong>Category :</strong> {food.category_name}</p>
                        <h4>{food.price}</h4>
                        <p className='mt-3'>Shipping : <strong>Free</strong></p>

                        {food.is_available ? (
                            <button className='btn btn-outline-primary btn-sm'><i className='fas fa-cart-plus me-1'></i> Add to Cart</button>
                        ) : (
                            <div title='This food iteam is not available right now.'>
                                <button className='btn btn-outline-secondary btn-sm'><i className='fas fa-times-circle me-1'></i> Currently Unavailable</button>
                            </div>
                        )}

                    </div>

                </div>

            </div>
        </PublicLayout>
    )
}

export default FoodDetail
