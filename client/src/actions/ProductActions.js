import axios from 'axios';
import {ALL_PRODUCT_FAIL,ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS,PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,CLEAR_ERRORS, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ADMIN_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, GET_REVIEWS_REQUEST, GET_REVIEWS_SUCCESS, GET_REVIEWS_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL} from '../constants/productConstants'
import { UPDATE_PROFILE_FAIL } from '../constants/userConstants';

export const getProducts=(keyword='',currentPage = 1,price,category,rating=0)=>async(dispatch)=>{
    try {
        dispatch({
            type:ALL_PRODUCT_REQUEST
        })

        //in this price is pass as a array in usestate like[1,1000] so we use index of this
        let link=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`
        if(category){
             link=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`
        }
        const {data} = await axios.get(link)

        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message
        })
    }
}

export const getProductDetails=(id)=>async(dispatch)=>{
    try {
        dispatch({type:PRODUCT_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/v1/product/${id}`)

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product
        })
    } catch (error) {
        dispatch({ 
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
}

export const getAdminProduct=()=>async(dispatch)=>{
    try {
        dispatch({type:ADMIN_PRODUCT_REQUEST})

        const {data} = await axios.get(`/api/v1/admin/products`)
        // console.log(data)
        dispatch({
            type:ADMIN_PRODUCT_SUCCESS,
            payload:data.products
        })
    } catch (error) {
        dispatch({ 
            type:ADMIN_PRODUCT_FAIL,
            payload:error.response.data.message
        })
    }
}

export const getProductReviews=(id)=>async(dispatch)=>{
    try {
        dispatch({type:GET_REVIEWS_REQUEST})

        const {data} = await axios.get(`/api/v1/reviews?id=${id}`)
        // console.log(data)
        dispatch({
            type:GET_REVIEWS_SUCCESS,
            payload:data.reviews
        })
    } catch (error) {
        dispatch({ 
            type:GET_REVIEWS_FAIL,
            payload:error.response.data.message
        })
    }
}

export const deleteReview=(id,productId)=>async(dispatch)=>{
    try {
        dispatch({type:DELETE_REVIEW_REQUEST})

        const {data} = await axios.delete(`/api/v1/reviews/?id=${id}&productId=${productId}`)
        // console.log(data)
        dispatch({
            type:DELETE_REVIEW_SUCCESS,
            payload:data.success
        })
    } catch (error) {
        dispatch({ 
            type:DELETE_REVIEW_FAIL,
            payload:error.response.data.message
        })
    }
}

export const newReview=(reviewData)=>async(dispatch)=>{
    try {
        dispatch({type:NEW_REVIEW_REQUEST})
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        const {data} = await axios.put(`/api/v1/review`,reviewData,config)
        // console.log(data)
        dispatch({
            type:NEW_REVIEW_SUCCESS,
            payload:data.success
        })
    } catch (error) {
        dispatch({ 
            type:NEW_REVIEW_FAIL,
            payload:error.response.data.message
        })
    }
}

export const deleteProduct=(id)=>async(dispatch)=>{
    try {
        dispatch({type:DELETE_PRODUCT_REQUEST})

        const {data} = await axios.delete(`/api/v1/admin/product/${id}`)
        // console.log(data)
        dispatch({
            type:DELETE_PRODUCT_SUCCESS,
            payload:data.success
        })
    } catch (error) {
        dispatch({ 
            type:DELETE_PRODUCT_FAIL,
            payload:error.response.data.message
        })
    }
}


export const newProduct=(productData)=>async(dispatch)=>{
    try {
        dispatch({type:NEW_PRODUCT_REQUEST})
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        const {data} = await axios.post(`/api/v1/admin/product/new`,productData,config)
        // console.log(data)
        dispatch({
            type:NEW_PRODUCT_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({ 
            type:NEW_PRODUCT_FAIL,
            payload:error.response.data.message
        })
    }
}

export const updateProduct=(id,productData)=>async(dispatch)=>{
    try {
        dispatch({type:UPDATE_PRODUCT_REQUEST})
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        const {data} = await axios.put(`/api/v1/admin/product/${id}`,productData,config)
        // console.log(data)
        dispatch({
            type:UPDATE_PRODUCT_SUCCESS,
            payload:data.success
        })
    } catch (error) {
        dispatch({ 
            type:UPDATE_PROFILE_FAIL,
            payload:error.response.data.message
        })
    }
}

export const clearErrors=()=>async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}
