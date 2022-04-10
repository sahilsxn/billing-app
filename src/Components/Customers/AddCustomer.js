import {React, useState} from "react";
import { useDispatch } from "react-redux";
import { asyncAddCustomer } from "../../actions/customerActions";

const AddCustomer = () => {

    const dispatch = useDispatch()

    const [form, setForm] = useState({customerName:'', customerNumber:'', customerEmail:''})

    const handleChange = (e) =>{
        if (e.target.name==="customerName"){
            setForm({...form, customerName:e.target.value})
        } else if (e.target.name==="customerNumber"){
            setForm({...form, customerNumber:e.target.value})
        } else if (e.target.name==="customerEmail"){
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
        const formReset = () => {
            setForm({...form, customerName:'', customerNumber:'', customerEmail:''})
        }
        dispatch(asyncAddCustomer(formData, formReset))
    }

    return (
        <div>
            <h3>Add Customers</h3>
            <form onSubmit={handleSubmit} >
                <label>Customer Name</label> <br/>
                <input
                type="text"
                name="customerName"
                value={form.customerName}
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
                <label>Customer Email</label> <br/>
                <input
                type="email"
                name="customerEmail"
                value={form.customerEmail}
                onChange={handleChange}
                /> <br/>
                <p></p>
                <input
                type="submit"
                value="SUBMIT"
                />
            </form>
        </div>
    )
}

export default AddCustomer