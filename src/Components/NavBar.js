import React from "react";
import { Route, Link, withRouter } from "react-router-dom";
import PrivateRoute from "../selectors/PrivateRoute";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Profile from "./User/Profile";
import BillContainer from "./Bills/BillContainer";
import CustomerContainer from "./Customers/CustomerContainer";
import ProductContainer from "./Products/ProductContainer";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../actions/userActions";

const NavBar = (props) => {

    const dispatch = useDispatch()

    const userLoggedIn = useSelector(state=>state.user.isAuthenticated)

    return (
        <div>
            <Link to="/">Home</Link>
            { userLoggedIn ?
            <>
                <Link to="/customers">Customers</Link>
                <Link to="/products">Products</Link>
                <Link to="/bills">Bills</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/" 
                onClick={()=>{
                localStorage.removeItem('token')
                alert('Successfully Logged Out')
                dispatch(login())
                props.history.push('/')
                }}>Logout</Link>

            </>
            :
            <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </>
            }
                <Route path="/" exact render={(props)=>{
                    return <Home {...props}/>
                }}/>
                <Route path="/register" component={Register} exact/>
                <Route path="/login" render={(props)=>{
                    return <Login {...props} />
                }}/>
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/customers" component={CustomerContainer} />
                <PrivateRoute path="/products" component={ProductContainer} />
                <PrivateRoute path="/bills" component={BillContainer} />
        </div>
    )
}

export default withRouter(NavBar)
