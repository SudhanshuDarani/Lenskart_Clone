import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../Pages/AdminDashboard';
import Home from '../Pages/Homepage/Home';
import SinglePage from '../Components/Products/SingleCArd';
import { Product } from '../Pages/Product';
import AdminProducts from '../Pages/AdminProducts';
import AdminProductEdit from '../Pages/AdminProductEdit';
import AllUsers from '../AdminPage/AllUsers';
import Payment from '../Components/Products/Payment';
import Cart from '../Components/Products/cart';
import AdminLogin from '../Pages/AdminLogin';
import AdminOrders from '../Pages/AdminOrders';
import ForgotPassword from '../Pages/ForgotPassword/ForgotPassword';
import AdminSignup from '../Pages/AdminSignup';
import UserProfilePage from '../Pages/UserProfilePage/UserProfilePage';

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/admindashboard' element={<AdminDashboard />} />
            <Route path="/eyeglasses/:id" element={<SinglePage />} />
            <Route path='/eyeglasses' element={<Product />} />
            <Route path='/eyeglasses?:params' element={<Product />} />
            <Route path='/adminproducts' element={<AdminProducts />} />
            <Route path="/allusers" element={<AllUsers />}></Route>
            <Route path='/adminproducts/update/:id' element={<AdminProductEdit />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/adminlogin' element={<AdminLogin />} />
            <Route path='/adminorders' element={<AdminOrders />} />
            <Route path='/adminsignup' element={<AdminSignup />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
            <Route path='/userprofilepage' element={<UserProfilePage />} />
        </Routes>
    )
};

export default AllRoutes;