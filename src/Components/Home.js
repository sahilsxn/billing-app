import React from "react";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";

const Home = (props) => {

    const userLoggedIn = useSelector(state=>state.user.isAuthenticated)

    const handleCopy = (e) => {
        navigator.clipboard.writeText(e.target.value)
    }

    return (
        <div>
            {userLoggedIn?
            <Dashboard/>
            :
            <div>
                <h3>Please Login</h3>
                    <div style={{textAlign:'center', marginTop:'32px', background:'#F5F5F5', padding:'16px', borderRadius:'12px'}}>
                    <h4>Credentials</h4>
                    <p><b>Email</b>: sahil@dctacademy.com </p>
                    <button style={{marginBottom:'24px'}} class="btn btn-outline-primary" value="dct6543@gmail.com" onClick={handleCopy}>Copy</button>
                    <p><b>Password</b>: secret123</p>
                    </div>
            </div>
        }
        </div>
    )
}

export default Home
