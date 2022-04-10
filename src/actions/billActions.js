import axios from '../config/axios'

export const asyncGetAllBills = () => {
    return (dispatch) => {
        axios.get('/bills',{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                alert(result.message)
            } else {
                dispatch(getAllBills(result.reverse()))
            }
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}

export const getAllBills = (bills) => {
    return {
        type: 'GET_ALL_BILLS',
        payload: bills
    }
}

export const asyncGetBill = (id) => {
    return (dispatch) => {
        axios.get(`/bills/${id}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                alert(result.message)
            } else {
                dispatch(getBill(result))
            }
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}

export const getBill = (bill) => {
    return {
        type: 'GET_BILL',
        payload: bill
    }
}

export const asyncAddBill = (formData) => {

    return (dispatch) => {
        axios.post('/bills', formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            if (result.hasOwnProperty('errors')){
                alert(result.message)
            } else {
                dispatch(addBill(result))
            }
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}

export const addBill = (bill) => {
    return {
        type: 'ADD_BILL',
        payload: bill
    }
}

export const asyncDeleteBill = (id) => {
    return (dispatch) => {
        axios.delete(`/bills/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            dispatch(deleteBill(result._id))
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}

export const deleteBill = (id) => {
    return {
        type: 'DELETE_PRODUCT',
        payload: id
    }
}