import React from "react";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";

const Home = (props) => {

    const userLoggedIn = useSelector(state=>state.user.isAuthenticated)

    return (
        <div>
            {userLoggedIn?
            <Dashboard/>
            :
            <div>
                <h3>Please Login</h3>
            </div>
        }
        </div>
    )
}

export default Home
