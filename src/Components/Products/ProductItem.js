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
        <div>
            {toggle ?
            <EditProduct product={product} handleToggle={handleToggle}/>
            :
            <div>
                <b>{product.name}</b>
                <p>₹ {product.price}</p>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={handleToggle}>Edit Details</button>
                <p></p>
            </div>
            }
        </div>
    )
}

export default ProductItem