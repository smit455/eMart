/* eslint-disable jsx-a11y/alt-text */
import React,{Fragment} from 'react'
import '../../App.css'
import {Link, Route,Routes} from 'react-router-dom'
import Search from './Search'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/userActions'

const Header = () => {
  const alert=useAlert();
  const dispatch=useDispatch()

  const logoutHandler=()=>{
    dispatch(logout());
    alert.success('Logged Out Successfully')
  }
  const {user,loading}=useSelector(state=>state.auth)
  const {cartItems}=useSelector(state=>state.cart)
  return (
    <Fragment>
        <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
          <img className="img" src="/images/Emart_Logo.svg.png" />
          </Link>
        </div>  
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Routes>
        <Route path='*' element={<Search />}/>
        </Routes>
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <Link to="/cart" style={{textDecoration:'none'}}>
      <span id="cart" className="ml-3">Cart</span>
        <span className="ml-1" id="cart_count">{cartItems.length}</span>
        </Link>
        {user?(
          <div className="ml-4 dropdown d-inline">
            <Link to="#!" className='btn dropdown-toggle text-white mr-4' type='button' id='dropDownMenuButton' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <figure className='avatar avatar-nav'>
              <img src={user.avatar && user.avatar.url} alt={user && user.name} className='rounded-circle' />
            </figure>
            <span>{user && user.name}</span>
            </Link>
            <div className="dropdown-menu" aria-labelledby='dropDownMenuButton'>
              {user && user.role==='admin' && (
                 <Link className='dropdown-item' to="/dashboard">Dashboard</Link>
              )}
              <Link className='dropdown-item' to="/orders/profile">Orders</Link>
              <Link className='dropdown-item' to="/profile">Profile</Link>
              <Link className='dropdown-item text-danger' to='/' onClick={logoutHandler}>
              Logout
              </Link>
            </div>
          </div>
        ): !loading && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>}
        

      </div>
    </nav>  
    </Fragment>
  )
}

export default Header