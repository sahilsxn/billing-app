import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { asyncLogin } from "../actions/userActions"

const Login = (props) => {

    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleChange = (e) => {
        if(e.target.name === 'email'){
            setEmail(e.target.value)
        } else if (e.target.name === 'password'){
            setPassword(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email,
            password,
        }

        const formReset = () => {
            setEmail('')
            setPassword('')
            props.history.push('/')
        }

        dispatch(asyncLogin(formData, formReset))
    }

    return (
        <div>
            <h3>Sign in to your account</h3>
            <form onSubmit={handleSubmit}>
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
                <input
                type="submit"
                value="Login"
                />
            </form>
        </div>
    )
}

export default Login

