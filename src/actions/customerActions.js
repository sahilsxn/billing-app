import axios from '../config/axios'

export const asyncGetCustomers = () => {
    return (dispatch) => {
        axios.get('/customers',{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                alert(result.message)
            } else {
                dispatch(getCustomers(result.reverse()))
            }
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}

export const getCustomers = (customers) => {
    return {
        type: 'GET_CUSTOMERS',
        payload: customers
    }
}

export const asyncAddCustomer = (formData, formReset) => {

    return (dispatch) => {
        axios.post('/customers', formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            if (result.hasOwnProperty('errors')){
                alert(result.message)
            } else {
                dispatch(addCustomer(result))
                formReset()
            }
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}

export const addCustomer = (customer) => {
    return {
        type: 'ADD_CUSTOMER',
        payload: customer
    }
}

export const asyncDeleteCustomer = (id) => {
    return (dispatch) => {
        axios.delete(`/customers/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            dispatch(deleteCustomer(result._id))
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}

export const deleteCustomer = (id) => {
    return {
        type: 'DELETE_CUSTOMER',
        payload: id
    }
}

export const asyncEditCustomer = (formData, id) => {
    return (dispatch) => {
        axios.put(`/customers/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                alert(result.message)
            } else {
                dispatch(editCustomer(result))
            }
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}

export const editCustomer = (customer) => {
    return {
        type: 'EDIT_CUSTOMER',
        payload: customer
    }
}