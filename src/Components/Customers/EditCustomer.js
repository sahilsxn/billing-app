import {React, useState} from "react";
import { useDispatch } from "react-redux";
import { asyncEditCustomer } from "../../actions/customerActions";

const EditCustomer = (props) => {

    const dispatch = useDispatch()

    const {customer, handleToggle} = props

    const [form, setForm] = useState(
        {customerName:customer.name? customer.name: '',
        customerNumber:customer.mobile? customer.mobile: '',
        customerEmail:customer.email? customer.email: ''}
        )

    const handleChange = (e) =>{
        if (e.target.name==="customerName"){
            setForm({...form, customerName:e.target.value})
        } else if (e.target.name==="customerNumber"){
            setForm({...form, customerNumber:e.target.value})
        }else if (e.target.name==="customerEmail"){
            setForm({...form, customerEmail:e.target.value})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: form.customerName,
            mobile: form.customerNumber,
            email: form.customerEmail
        }
        const id = customer._id
        dispatch(asyncEditCustomer(formData, id))
        handleToggle()
    }

    const handleCancel = () =>{
        handleToggle()
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <label>Customer Name</label> <br/>
                <input
                type="text"
                name="customerName"
                value={form.customerName}
                onChange={handleChange}
                /> <br/>
                <p></p>
                <label>Customer Email</label> <br/>
                <input
                type="email"
                name="customerEmail"
                value={form.customerEmail}
                onChange={handleChange}
                /> <br/>
                <p></p>
                <label>Customer Number</label> <br/>
                <input
                type="text"
                name="customerNumber"
                value={form.customerNumber}
                onChange={handleChange}
                /> <br/>
                <p></p>
                <input
                type="submit"
                value="Save"
                /> 
                <button type='button' onClick={handleCancel}>Cancel</button>
                <p></p>
            </form>
        </div>
    )
}

export default EditCustomer