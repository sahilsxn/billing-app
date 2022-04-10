import {React, useState} from "react";
import { useDispatch } from "react-redux";
import { asyncAddProduct } from "../../actions/ProductActions";

const AddProduct = () => {

    const dispatch = useDispatch()

    const [form, setForm] = useState({productName:'', productPrice:''})

    const handleChange = (e) =>{
        if (e.target.name==="productName"){
            setForm({...form, productName:e.target.value})
        } else if (e.target.name==="productPrice"){
            setForm({...form, productPrice:e.target.value})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: form.productName,
            price: form.productPrice,
        }
        const formReset = () => {
            setForm({...form, productName:'', productPrice:''})
        }
        dispatch(asyncAddProduct(formData, formReset))
    }

    return (
        <div>
            <h3>Add Products</h3>
            <form onSubmit={handleSubmit} >
                <label>Product Name</label> <br/>
                <input
                type="text"
                name="productName"
                value={form.productName}
                onChange={handleChange}
                /> <br/>
                <p></p>
                <label>Product Price</label> <br/>
                <input
                type="text"
                name="productPrice"
                value={form.productPrice}
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

export default AddProduct