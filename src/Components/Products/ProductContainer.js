import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { asyncGetProducts } from "../../actions/ProductActions";
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";

const ProductContainer = () => {

    const dispatch = useDispatch()

    const products = useSelector(state=>state.products.data)

    useEffect(()=>{
        dispatch(asyncGetProducts())
    },[dispatch])

    return (
        <div>
            <h2>All Products - {products.length}</h2>
            <AddProduct/>
            <ProductList/>
        </div>
    )
}

export default ProductContainer
