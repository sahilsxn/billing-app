import React from "react";
import { useSelector } from "react-redux";

const customerSearch = () => {

    const {customersList} = useSelector(state=>state.customers)

    return (
        <div>
            <h1>{customersList.length}</h1>
        </div>
    )
}

export default customerSearch