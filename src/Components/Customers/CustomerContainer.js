import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { asyncGetCustomers } from "../../actions/customerActions";
import AddCustomer from "./AddCustomer";
import CustomerList from "./CustomerList";

const CustomerContainer = () => {

    const dispatch = useDispatch()

    const customers = useSelector(state=>state.customers.data)

    useEffect(()=>{
        dispatch(asyncGetCustomers())
    },[dispatch])

    return (
        <div>
            <h2>All Customers - {customers.length}</h2>
            <AddCustomer/>
            <CustomerList/>
        </div>
    )
}

export default CustomerContainer
