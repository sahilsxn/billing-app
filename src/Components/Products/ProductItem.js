import {React, useState} from "react";
import { useDispatch } from "react-redux";
import { asyncDeleteProduct } from "../../actions/ProductActions";
import EditProduct from "./EditProduct";

const ProductItem = (props) => {

    const [toggle, setToggle] = useState(false)

    const dispatch = useDispatch()

    const {product} = props

    const handleDelete = () => {
        dispatch(asyncDeleteProduct(product._id))
    }

    const handleToggle = () => {
        const result = !toggle
        setToggle(result)
    }

    return (
        <div className="card mb-3">
            {toggle ?
            <EditProduct product={product} handleToggle={handleToggle}/>
            :
            <div className="d-flex justify-content-between p-3">
                <b>{product.name}</b>
                <p>₹ {product.price}</p>
                <button className="btn btn-secondary" onClick={handleToggle}>Edit Details</button>
                <button className="btn btn-danger mx-3" onClick={handleDelete}>Delete</button>
                <p></p>
            </div>
            }
        </div>
    )
}

export default ProductItem