/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, updatePassword} from '../../actions/userActions';
import MetaData from '../layout/MetaData';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';

const UpdatePassword = () => {
    const [oldPassword,setOldPassword]=useState('');
    const [password,setPassword]=useState('');
    

    const alert=useAlert();
    const dispatch=useDispatch();
    const navigate=useNavigate()

    const {error ,isUpdated,loading}=useSelector(state=>state.user)

    useEffect(()=>{
        
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(isUpdated){
            alert.success('Password update successfully')
            navigate('/profile')
            dispatch({type:UPDATE_PASSWORD_RESET})
        }
    },[dispatch,alert,error,isUpdated,navigate])

const submitHandler=(e)=>{
    e.preventDefault()
    const formData=new FormData()
    formData.set('oldPassword',oldPassword);
    formData.set('password',password);
    dispatch(updatePassword(formData))
}

  return (
    <Fragment>
        <MetaData title={'Update passWord'}/>
        <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                            <label htmlFor="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e)=>setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={loading?true:false}>Update Password</button>
                    </form>
                </div>
            </div>
        
    </Fragment>
  )
}

export default UpdatePassword