import {React, useState} from "react";
import { useDispatch } from "react-redux";
import { asyncDeleteCustomer } from "../../actions/customerActions";
import EditCustomer from "./EditCustomer";

const CustomerItem = (props) => {

    const [toggle, setToggle] = useState(false)

    const dispatch = useDispatch()

    const {customer} = props

    const handleDelete = () => {
        dispatch(asyncDeleteCustomer(customer._id))
    }

    const handleToggle = () => {
        const result = !toggle
        setToggle(result)
    }

    return (
        <div className="card mb-3">
            {toggle ?
            <EditCustomer customer={customer} handleToggle={handleToggle}/>
            :
            <div className="d-flex justify-content-between p-3 align-items-center">
                <b>{customer.name}</b>
                <p>{customer.email}</p>
                <p>{customer.mobile}</p>
                <button className="btn btn-secondary"  onClick={handleToggle}>Edit Details</button>
                <button className="btn btn-danger mx-3" onClick={handleDelete}>Delete</button>
                <p></p>
            </div>
            }
        </div>
    )
}

export default CustomerItem