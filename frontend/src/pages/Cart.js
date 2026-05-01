import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PublicLayout from '../components/PublicLayout'
import { useParams, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaMinus, FaPlus, FaShoppingCart, FaTrash } from 'react-icons/fa'


const Cart = () => {
    const userId = localStorage.getItem("userId");
    const [cartItems, setCartItems] = useState([]);
    const [grandTotal, setGrandTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate('/login');
            return;
        }
        fetch(`http://127.0.0.1:8000/api/cart/${userId}`)
            .then(res => res.json())
            .then(data => {
                setCartItems(data)
                const total = data.reduce((sum, item) => {
                    return sum + item.food.price * item.quantity;
                }, 0)
                setGrandTotal(total);
            })

    }, [userId]);

    const updateQuantity = async (orderId, newQty) => {
        if (newQty < 1) return;

        try {
            const response = await fetch('http://127.0.0.1:8000/api/cart/update_quantity/', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId: orderId,
                    quantity: newQty
                })
            });
            if (response.status === 200) {
                const updated = await fetch(`http://127.0.0.1:8000/api/cart/${userId}`);
                const data = await updated.json();
                setCartItems(data);
                const total = data.reduce((sum, item) => {
                    return sum + item.food.price * item.quantity;
                }, 0)
                setGrandTotal(total);
            }
            else{
                console.log("not found");
            }

        } 
        catch(error){
            console.error(error);
        }       
    }

    
 const deleteCartItem = async (orderId) => {
        const confirmDelete = window.confirm("Are you sure you want to remove this item?");
        if(!confirmDelete) return;
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/cart/delete/${orderId}/`, {
                method: 'DELETE',
            });


            if (response.status === 200) {
                const updated = await fetch(`http://127.0.0.1:8000/api/cart/${userId}`);
                const data = await updated.json();
                setCartItems(data);
                const total = data.reduce((sum, item) => {
                    return sum + item.food.price * item.quantity;
                }, 0)
                setGrandTotal(total);
            }
            else{
                console.log("not found");
            }

        } 
        catch(error){
            console.error(error);
        }       
    }
    return (
        <PublicLayout>
            <div className='container py-5'>
                <h2 className='mb-4 text-center'><FaShoppingCart className='me-2' style={{ position: "relative", top: "-3px" }} /> Your Cart</h2>

                {cartItems.length === 0 ? (
                    <p className='text-center text-muted'>Your Cart is empty</p>
                ) : (
                    <>
                        <div className='row'>
                            {cartItems.map((item) => (
                                <div className='col-md-6 mb-4'>
                                    <div className='card shadow-sm'>
                                        <div className='row' style={{ height: '200px' }}>
                                            <div className='col-md-4'>
                                                <img src={`http://127.0.0.1:8000${item.food.image}`} className='img-fluid rounded-start' style={{ minHeight: "200px", width: "300px" }} />
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='card-body'>
                                                    <h5 className='card-title'>{item.food.item_name}</h5>
                                                    <p className='card-text text-muted small'>{item.food.item_description}</p>
                                                    <p className='text-success fw-bold'>{item.food.price}</p>
                                                    <div className='d-flex align-items-center mb-2'>
                                                        <button className='btn btn-sm btn-outline-secondary ' disabled={item.quantity <= 1} onClick={() => updateQuantity(item.id, item.quantity - 1)} >
                                                            <FaMinus />
                                                        </button>
                                                        <span className='fw-bold px-2'>{item.quantity}</span>
                                                        <button className='btn btn-sm btn-outline-secondary me-2' onClick={() => updateQuantity(item.id, item.quantity + 1)} >
                                                            <FaPlus />
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <button className='btn btn-sm btn-outline-danger' onClick={() => deleteCartItem(item.id)}>
                                                            <FaTrash className='me-2' /> Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>


                        <div className='card p-4 mt-4 shadow-sm '>
                            <h4 className='text-end '>
                                Total : ₹ {grandTotal.toFixed(2)}
                            </h4>
                            <div className='text-end'>
                                <button className='btn btn-primary mt-3 px-4 py-2'><FaShoppingCart className='me-2' /> Proceed to Payment</button>

                            </div>


                        </div>
                    </>
                )}

            </div>
            <ToastContainer autoClose={2000} />
        </PublicLayout>

    )
}

export default Cart
