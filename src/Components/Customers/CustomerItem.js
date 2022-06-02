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
        <div>
            {toggle ?
            <EditCustomer customer={customer} handleToggle={handleToggle}/>
            :
            <div>
                <b>{customer.name}</b>
                <p>{customer.email}</p>
                <p>{customer.mobile}</p>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={handleToggle}>Edit Details</button>
                <p></p>
            </div>
            }
        </div>
    )
}

export default CustomerItem