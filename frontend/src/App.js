import {BrowserRouter, Routes, Route} from 'react-router-dom' 
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AddCategory from './pages/AddCategory';
import ManageCategory from './pages/ManageCategory';
import AddFood from './pages/AddFood';
import ManageFood from './pages/ManageFood';
import SearchPage from './pages/SearchPage';
import Register from './components/Register';
import Login from './components/Login';
import FoodDetail from './pages/FoodDetail';
import Cart from './pages/Cart';
import PaymentPage from './pages/PaymentPage';
import MyOrders from './pages/MyOrders';
import OrderDetails from './pages/OrderDetails';
import Profile from './pages/Profile';
import ChangePass from './pages/ChangePass';
import OrderNotConfirmed from './pages/OrderNotConfirmed';
import OrderConfirmed from './pages/OrderConfirmed';
import OrderPickup from './pages/OrderPickup';
import OrderDelivered from './pages/OrderDelivered';
import OrderCancelled from './pages/OrderCancelled';
import OrderPrepared from './pages/OrderPrepared';
import OrderReport from './pages/OrderReport';
import ViewFoodOrder from './pages/ViewFoodOrder';
import SearchOrder from './pages/SearchOrder';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='admin-login/' element={<AdminLogin/>}></Route>
        <Route path='admin-dashboard/' element={<AdminDashboard/>}></Route>
        <Route path='add-category/' element={<AddCategory/>}></Route>
        <Route path='manage-category/' element={<ManageCategory/>}></Route>
        <Route path='order-not-confirmed/' element={<OrderNotConfirmed/>}></Route>
        <Route path='orders-confirmed/' element={<OrderConfirmed/>}></Route>
        <Route path='orders-pickup/' element={<OrderPickup/>}></Route>
        <Route path='orders-cancelled/' element={<OrderCancelled/>}></Route>
        <Route path='orders-prepared/' element={<OrderPrepared/>}></Route>
        <Route path='orders-delivered/' element={<OrderDelivered/>}></Route>
        <Route path='orders-report/' element={<OrderReport/>}></Route>
        <Route path='admin-view-order-detail/:orderNumber/' element={<ViewFoodOrder/>}></Route>
        <Route path='search-order/' element={<SearchOrder/>}></Route>
        <Route path='add-food/' element={<AddFood/>}></Route>
        <Route path='manage-food/' element={<ManageFood/>}></Route>
        <Route path='search/' element={<SearchPage/>}></Route>
        <Route path='register/' element={<Register/>}></Route>
        <Route path='login/' element={<Login/>}></Route>
        <Route path='food/:id' element={<FoodDetail/>}></Route>
        <Route path='cart/' element={<Cart/>}></Route>
        <Route path='payment/' element={<PaymentPage/>}></Route>
        <Route path='my-orders/' element={<MyOrders/>}></Route>
        <Route path='order-details/:order_number/' element={<OrderDetails/>}></Route>
        <Route path='profile/' element={<Profile/>}></Route>
        <Route path='change-password/' element={<ChangePass/>}></Route>
       
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
