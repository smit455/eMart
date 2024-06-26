/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate ,useLocation } from 'react-router-dom';
import { clearErrors, login } from '../../actions/userActions';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';

const Login = () => {

    const [email,setEmail]=useState('');
    const [passWord,setPassWord]=useState('');

    const alert=useAlert();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const location = useLocation(); 

    const {isAuthenticated,error,loading}=useSelector(state=>state.auth);

    const redirect=location.search ? location.search.split('=')[1] : '/';
    console.log(redirect)

    useEffect(()=>{
        if(isAuthenticated){
          alert.success('Login successful!');
            navigate(redirect)
        }

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
    },[dispatch,alert,isAuthenticated,error,redirect,navigate])

const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(login(email,passWord))
}
  return (
    <Fragment>
        {loading ? <Loader/>:(
            <Fragment> 
                <MetaData title={'Login'} />
                <div className="row wrapper"> 
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={passWord}
                onChange={(e)=>setPassWord(e.target.value)}
                
              />
            </div>

            <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>
  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              LOGIN
            </button>

            <Link to="/register" className="float-right mt-3">New User?</Link>
          </form>
		  </div>
    </div>
            </Fragment>
        )}
    </Fragment>
  )
}

export default Login