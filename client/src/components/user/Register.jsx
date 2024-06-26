/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, register } from '../../actions/userActions';
import MetaData from '../layout/MetaData';

const Register = () => {
    const [user,setUser]=useState({
    name:'',
    email:'',
    passWord:'',
    });
    
    const {name,email,passWord}=user;

    const [avatar,setAvatar]=useState('');
    const [avatarPreview,setAvatarPreview]=useState('/images/default.jpg');
    

    const alert=useAlert();
    const dispatch=useDispatch();
    const navigate=useNavigate()

    const {isAuthenticated,error,loading}=useSelector(state=>state.auth);

    useEffect(()=>{
        if(isAuthenticated){
          alert.success('Registration successful! You are now logged in.');  
          navigate('/')
        }

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
    },[dispatch,alert,isAuthenticated,error])

const submitHandler=(e)=>{
    e.preventDefault()
    const formData=new FormData()
    formData.set('name',name);
    formData.set('email',email);
    formData.set('passWord',passWord);
    formData.set('avatar',avatar);
    dispatch(register(formData))
}

const onChange=e=>{
    if(e.target.name==='avatar'){
        // const file = e.target.files[0];
        // setAvatar(file);
        const reader=new FileReader();
        reader.onload=()=>{
            if(reader.readyState===2){
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
            
            console.log("hiiii",reader.result)

        }
        reader.readAsDataURL(e.target.files[0])
    }
    else{ 
            setUser({...user,[e.target.name]:e.target.value})
    }
}
  return (
    <Fragment>
        <MetaData title={'Register User'}/>
        <div className="row wrapper">
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
            <h1 className="mb-3">Register</h1>

          <div className="form-group">
            <label htmlFor="email_field">Name</label>
            <input type="name" id="name_field" className="form-control" name='name' value={name} onChange={onChange} />
          </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name='email' value={email} onChange={onChange}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name='passWord' value={passWord} onChange={onChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='avatar_upload'>Avatar</label>
              <div className='d-flex align-items-center'>
                  <div>
                      <figure className='avatar mr-3 item-rtl'>
                          <img
                              src={avatarPreview}
                              className='rounded-circle'
                              alt='avatar preview'
                          />
                      </figure>
                  </div>
                  <div className='custom-file'>
                      <input
                          type='file'
                          name='avatar'
                          className='custom-file-input'
                          id='customFile'
                          accept='images/*'
                          onChange={onChange}
                      />
                      <label className='custom-file-label' htmlFor='customFile'>
                          Choose Avatar
                      </label>
                  </div>
              </div>
          </div>
  
            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading?true:false}
            >
              REGISTER
            </button>
          </form>
		  </div>
    </div>

    </Fragment>
  )
}

export default Register