import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";

import { loadUser } from "./actions/userActions";
import store from "./store";
import { useEffect, useState } from "react";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";
import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/ProductList";
import NewProduct from "./components/admin/NewProduct";
import { useSelector } from "react-redux";
import OrderList from "./components/admin/OrderList";
import UpdateProduct from "./components/admin/UpdateProduct";
import ProcessOrder from "./components/admin/ProcessOrder";
import UserList from "./components/admin/UserList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";

function App() { 

  const [stripeApiKey,setStripeApiKey]=useState('')

  useEffect(()=>{
    store.dispatch(loadUser())

    async function getStripeApiKey() {
      try {
        const { data } = await axios.get('/api/v1/stripeapi');
        setStripeApiKey(data.stripeApiKey);
      } catch (error) {
        console.error('Error fetching Stripe API key:', error);
      }
    }
    getStripeApiKey();
  }, []); 

  const {loading,user,isAuthenticated}=useSelector(state=>state.auth)
  // console.log("hi,",user)
  // console.log("fdsssssssssss",user?.role)
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
        <Route path="/" element={<Home />} exact/>
        <Route path="/search/:keyword" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} exact/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password/forgot" element={<ForgotPassword />} exact/>
        <Route path="/password/reset/:token" element={<NewPassword />} exact/>
        <Route path='/cart' element={<Cart/>} exact/>

  
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/profile/update" element={<UpdateProfile />} exact />
          <Route path="/password/update" element={<UpdatePassword />} exact />
          <Route path="/shipping" element={<Shipping />} exact />
          <Route path="/order/confirm" element={<ConfirmOrder />} exact />
          <Route path="/success" element={<OrderSuccess />} exact />
          <Route path="/orders/profile" element={<ListOrders />} exact />
          <Route path="/orders/:id" element={<OrderDetails />} exact />
          <Route path="/dashboard" isAdmin={true} element={<Dashboard />} exact />
          <Route path="/admin/products" isAdmin={true} element={<ProductList />} exact />
          <Route path="/admin/product" isAdmin={true} element={<NewProduct />} exact />
          <Route path="/admin/orders" isAdmin={true} element={<OrderList />} exact />
          <Route path="/admin/product/:id" isAdmin={true} element={<UpdateProduct />} exact />
          <Route path="/admin/order/:id" isAdmin={true} element={<ProcessOrder />} exact />
          <Route path="/admin/users" isAdmin={true} element={<UserList />} exact />
          <Route path="/admin/user/:id" isAdmin={true} element={<UpdateUser />} exact />
          <Route path="/admin/reviews" isAdmin={true} element={<ProductReviews />} exact />
          
          
          {stripeApiKey && (
            <Route 
              path="/payment" 
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              } 
              exact 
            />
          )}
        </Route>
        </Routes>
        {!loading && (!isAuthenticated || user?.role!=='admin') && (
          <Footer/>
        )}
    
  </BrowserRouter> 
    
    
  );
}

export default App;
