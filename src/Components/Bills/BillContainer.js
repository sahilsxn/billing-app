import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { asyncGetAllBills } from "../../actions/billActions";
import AddBill from "./AddBill";
import BillsList from "./BillList";

const BillContainer = () => {

    const dispatch = useDispatch()

    const bills = useSelector(state=>state.bills.data)

    useEffect(()=>{
        dispatch(asyncGetAllBills())
    },[dispatch])

    return (
        <div>
            <h2>All Bills - {bills.length}</h2>
            <AddBill/>
            <BillsList/>
        </div>
    )
}

export default BillContainer
