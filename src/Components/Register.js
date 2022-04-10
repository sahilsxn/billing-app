import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { asyncRegister } from "../actions/userActions";

const Register = (props) => {

    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [businessName, setBusinessName] = useState('')
    const [address, setAddress] = useState('')

    const handleChange = (e) => {
        if(e.target.name === 'username'){
            setUsername(e.target.value)
        } else if (e.target.name === 'email'){
            setEmail(e.target.value)
        } else if (e.target.name === 'password'){
            setPassword(e.target.value)
        } else if (e.target.name === 'businessName'){
            setBusinessName(e.target.value)
        } else if (e.target.name === 'address'){
            setAddress(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            username,
            email,
            password,
            businessName,
            address
        }

        const formReset = () => {
            setUsername('')
            setEmail('')
            setPassword('')
            setBusinessName('')
            setAddress('')
            props.history.push('/login')
        }

        dispatch(asyncRegister(formData, formReset))
    }

    return (
        <div>
            <h3>Create a new account</h3>
            <form onSubmit={handleSubmit}>
                <label>Username</label> <br/>
                <input
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
                /> <br/>
                <label>Email Address</label> <br/>
                <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                /> <br/>
                <label>Password</label> <br/>
                <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                /> <br/>
                <label>Business Name (Optional)</label> <br/>
                <input
                type="text"
                name="businessName"
                value={businessName}
                onChange={handleChange}
                /> <br/>
                <label>Address (Optional)</label> <br/>
                <input
                type="text"
                name="address"
                value={address}
                onChange={handleChange}
                /> <br/>
                <input
                type="submit"
                value="Login"
                />
            </form>
        </div>
    )
}

export default Register
