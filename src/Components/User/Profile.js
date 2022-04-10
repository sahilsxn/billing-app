import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { asyncGetUser } from '../../actions/userActions'

const Profile = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(asyncGetUser())
    }, [dispatch])

    const userData = useSelector(state=>state.user.user)

    const dated = (str) => new Date(str)

    return (
        <div>
            <h3>Profile Component</h3>
            <p></p>
            <label>Name</label> <b>{userData.username}</b>
            <p></p>
            <label>Email</label> <b>{userData.email}</b>
            <p></p>
            <label>Business Name</label> <b>{userData.businessName}</b>
            <p></p>
            <label>Address</label> <b>{userData.address}</b>
            <p></p>
            <label>Created on</label> <b>{`${dated(userData.createdAt).getDate()}/${dated(userData.createdAt).getMonth()+1}/${dated(userData.createdAt).getFullYear()}`}</b>
        </div>
    )
}

export default Profile