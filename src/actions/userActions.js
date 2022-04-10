import axios from '../config/axios'

export const asyncRegister = (formData, formReset) => {
    return (dispatch) => {
        axios.post('/users/register', formData)
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                alert(result.message)
            } else {
                dispatch(register(result))
                alert('Account successfully created')
                formReset()
            }
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}

export const register = (formData) => {
    return {
        type: 'REGISTER',
        payload: formData
    }
}

export const asyncLogin = (formData, formReset) => {
    return (dispatch) => {
        axios.post('users/login', formData)
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                alert(result.message)
            } else {
                dispatch(login())
                alert("Successfully Logged In")
                localStorage.setItem('token', result.token)
                formReset()
            }
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}

export const login = () => {
    return {
        type: 'LOGIN',
    }
}

export const asyncGetUser = () => {
    return (dispatch) => {
        axios.get('/users/account',{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                alert(result.message)
            } else {
                dispatch(getUser(result))
            }
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}

export const getUser = (user) => {
    return {
        type: 'GET_USER',
        payload: user
    }
}