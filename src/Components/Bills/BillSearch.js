import React from "react";
import { useSelector } from "react-redux";

const BillSearch = () => {

    const {billsList} = useSelector(state=>state.bills)

    return (
        <div>
            <h1>{billsList.length}</h1>
        </div>
    )
}

export default BillSearch