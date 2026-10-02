import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PublicLayout from '../components/PublicLayout'
import '../styles/home.css'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
const Foodlist = () => {
    const [foods, setFoods] = useState([]);
    const [filteredFoods, setfilteredFoods] = useState([]);
    const [searchFood, setsearchFood] = useState('');
    const [categories, setCategories] = useState([]);

    const [selectedCategory, setselectedCategory] = useState('All');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(500);

    const [currentPage, setCurrentPage] = useState(1);
    const foodsPerPage = 9;


    useEffect(() => {

        fetch(`http://127.0.0.1:8000/api/foods/`)
            .then(res => res.json())
            .then(data => {
                setFoods(data)
                setfilteredFoods(data);
            })

        fetch(`http://127.0.0.1:8000/api/categories/`)
            .then(res => res.json())
            .then(data => {
                setCategories(data);
            })

    }, []);


    const applyFilters = (searchFood, category) => {
        let result = foods;

        if (searchFood) {
            result = result.filter(food => food.item_name.toLowerCase().includes(searchFood.toLowerCase()))

        }

        if (category != 'All') {
            result = result.filter(food => food.category_name == category);
        }

        result = result.filter(food => food.price >= minPrice && food.price <= maxPrice);

        setfilteredFoods(result);
        setCurrentPage(1);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        applyFilters(searchFood, selectedCategory)
    }



    //pagination logic 
    const indexOfLastFood = currentPage * foodsPerPage;
    const indexOfFirstFood = indexOfLastFood - foodsPerPage;

    const currentFoods = filteredFoods.slice(indexOfFirstFood, indexOfLastFood);

    const totalPages = Math.ceil(filteredFoods.length / foodsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setselectedCategory(category);
        applyFilters(searchFood, category);
    }

    return (
        <PublicLayout>
            <section className='py-5'>
                <div className='container'>
                    <h2 className='text-center mb-4'>Find Your Delicious Foods Here...</h2>
                    <div className='row mt-2'>
                        <div className='col-md-8'>
                            <form onSubmit={handleSearch}>
                                <div className='input-group'>
                                    <input type='text' className='form-control' placeholder='Search your favourite food'
                                        value={searchFood} onChange={(e) => setsearchFood(e.target.value)} />
                                    <button className='btn btn-primary' type='submit'><i className='fa fa-search'></i></button>
                                </div>
                            </form>
                        </div>
                        <div className='col-md-4'>
                            <select className='form-select' value={selectedCategory} onChange={handleCategoryChange}>
                                <option value="All">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.category_name}>{cat.category_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className='row mb-4'>
                        <div className='col-md-12'>
                            <label className='form-label fw-bold my-2'>
                                Filter by Price: Rs. {minPrice} - {maxPrice}
                            </label>
                            <Slider range min={0} max={500} defaultValue={[minPrice, maxPrice]}
                                onChange={(value) => {
                                    setMinPrice(value[0]);
                                    setMaxPrice(value[1]);
                                    applyFilters(searchFood, selectedCategory);
                                }}></Slider>
                        </div>
                    </div>
                    <div className='row mt-4'>
                        {currentFoods.length == 0 ? (<p className='text-center'>No Foods Found!</p>) : (
                            currentFoods.map((food, index) => (

                                <div className='col-md-4 mb-4'>
                                    <div className='card hover-effect'>
                                        <img src={`http://127.0.0.1:8000${food.image}`} className='card-img-top' style={{ height: '180px' }} />
                                        <div className='card-body'>
                                            <h5 className='card-title'>
                                                <Link> {food.item_name} </Link>
                                            </h5>
                                            <p className='card-text text-muted'>{food.item_description?.slice(0, 40)}... </p>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='fw-bold' >Rs. {food.price}</span>
                                                {food.is_available ? (
                                                    <Link to={`/food/${food.id}`} className='btn btn-outline-primary btn-sm'><i className='fas fa-shopping-basket me-1'></i> Order Now</Link>
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
                
                {totalPages > 1 && (
                    <nav className='mt-4 d-flex justify-content-center'>
                        <ul className='pagination'>
                            <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                                <button className='page-link' onClick={()=>paginate(1)}>First</button>
                            </li>
                            <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                                <button className='page-link' onClick={()=>paginate(currentPage-1)}>Prev</button>
                            </li>
                            <li className='page-item disabled'>
                                <button className='page-link'>Page {currentPage} of {totalPages} </button>
                            </li>
                            
                            <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
                                <button className='page-link' onClick={()=>paginate(currentPage+1)}>Next </button>
                            </li>
                            
                            <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
                                <button className='page-link' onClick={()=>paginate(totalPages)}>Last</button>
                            </li>
                            
                        </ul>

                    </nav>
                )}
            </section>
        </PublicLayout>
    )
}

export default Foodlist
