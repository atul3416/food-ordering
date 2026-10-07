import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PublicLayout from '../components/PublicLayout'
import '../styles/home.css'
import { useWishlist } from '../context/WishlistContext'

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const userId = localStorage.getItem('userId')
    const { wishlistCount, setWishlistCount } = useWishlist();
    const fetchWishlist = async () => {
        if (userId) {
            const res = await fetch(`http://127.0.0.1:8000/api/wishlist/${userId}/`)
            const data = await res.json();
            setWishlist(data);
        }
    }


    const removeWishlist = async (foodId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/wishlist/remove/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: userId,
                    food_id: foodId
                })
            })

            if (response.ok) {

                const updatedCount = await fetch(`http://127.0.0.1:8000/api/wishlist/${userId}`);
                const wishlistData = await updatedCount.json();
                setWishlistCount(wishlistData.length);
                alert("Removed from wishlist");
                fetchWishlist();
            }

            else {
                alert("Failed to update wishlist")
            }
        }
        catch (error) {
            alert("something went wrong")
        }
    }

    useEffect(() => {
        fetchWishlist();

    }, [userId]);
    return (
        <PublicLayout>


            <div className='container py-5'>
                <h2 className='mb-4'>My Wishlist</h2>
                <div className='row mt-4'>
                    {wishlist.length == 0 ? (<p className='text-center'>No Item in Wishlist!</p>) : (
                        wishlist.map((item, index) => (

                            <div className='col-md-4 mb-4' key={item.index}>
                                <div className='card hover-effect'>
                                    <div className='position-relative'>
                                        <img src={`http://127.0.0.1:8000${item.item_image}`} className='card-img-top' style={{ height: '180px' }} />
                                        <i className={`fas fa-heart wishlist position-absolute top-0 end-0 m-2 text-danger`} onClick={() => removeWishlist(item.food_id)}></i>
                                    </div>
                                    <div className='card-body'>
                                        <h5 className='card-title'>
                                            <Link> {item.item_name} </Link>
                                        </h5>
                                        <p className='card-text text-muted'>{item.item_description?.slice(0, 40)}... </p>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <span className='fw-bold' >Rs. {item.item_price}</span>
                                            {item.is_available ? (
                                                <Link to={`/food/${item.food_id}`} className='btn btn-outline-primary btn-sm'><i className='fas fa-shopping-basket me-1'></i> Order Now</Link>
                                            ) : (
                                                <div title='This food iteam is not available right now.'>
                                                    <button className='btn btn-outline-secondary btn-sm'><i className='fas fa-times-circle me-1'></i> Currently Unavailable</button>
                                                </div>
                                            )}

                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))
                    )}


                </div>

            </div>
        </PublicLayout>
    )
}

export default Wishlist
