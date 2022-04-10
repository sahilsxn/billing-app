import {React, useState} from "react";
import { useDispatch } from "react-redux";
import { asyncEditProduct } from "../../actions/ProductActions";

const EditProduct = (props) => {

    const dispatch = useDispatch()

    const {product, handleToggle} = props

    const [form, setForm] = useState(
        {productName:product.name? product.name: '',
        productPrice:product.price? product.price: ''}
        )

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
            price: form.productPrice
        }
        const id = product._id
        dispatch(asyncEditProduct(formData, id))
        handleToggle()
    }

    const handleCancel = () =>{
        handleToggle()
    }

    return (
        <div>
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
                value="Save"
                /> 
                <button type='button' onClick={handleCancel}>Cancel</button>
                <p></p>
            </form>
        </div>
    )
}

export default EditProduct