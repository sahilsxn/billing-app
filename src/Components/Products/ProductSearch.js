import React from "react";
import { useSelector } from "react-redux";

const ProductSearch = () => {

    const {productsList} = useSelector(state=>state.products)

    return (
        <div>
            <h1>{productsList.length}</h1>
        </div>
    )
}

export default ProductSearch