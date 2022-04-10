import axios from '../config/axios'

export const asyncGetProducts = () => {
    return (dispatch) => {
        axios.get('/products',{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                alert(result.message)
            } else {
                dispatch(getProducts(result.reverse()))
            }
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}

export const getProducts = (products) => {
    return {
        type: 'GET_PRODUCTS',
        payload: products
    }
}

export const asyncAddProduct = (formData, formReset) => {

    return (dispatch) => {
        axios.post('/products', formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            if (result.hasOwnProperty('errors')){
                alert(result.message)
            } else {
                dispatch(addProduct(result))
                formReset()
            }
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}

export const addProduct = (product) => {
    return {
        type: 'ADD_PRODUCT',
        payload: product
    }
}

export const asyncDeleteProduct = (id) => {
    return (dispatch) => {
        axios.delete(`/products/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            dispatch(deleteProduct(result._id))
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}

export const deleteProduct = (id) => {
    return {
        type: 'DELETE_PRODUCT',
        payload: id
    }
}

export const asyncEditProduct = (formData, id) => {
    return (dispatch) => {
        axios.put(`/products/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                alert(result.message)
            } else {
                dispatch(editProduct(result))
            }
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}

export const editProduct = (product) => {
    return {
        type: 'EDIT_PRODUCT',
        payload: product
    }
}