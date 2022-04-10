import {React, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncDeleteBill, asyncGetAllBills } from "../../actions/billActions";

const BillItem = (props) => {

    const dispatch = useDispatch()

    const {bill} = props

    const customers = useSelector(state=>state.customers.data)

    const handleDelete = () => {
        dispatch(asyncDeleteBill(bill._id))
        dispatch(asyncGetAllBills())
    }

    const dated = (str) => new Date(str)

    const customerInfo = () => {
        const result = customers.find(ele=>ele._id===bill.customer)
        return result
    }

    return (
        <div>
            <div>
                <b>{customerInfo().name}</b>
                <p>{`${dated(bill.createdAt).getDate()}/${dated(bill.createdAt).getMonth()+1}/${dated(bill.createdAt).getFullYear()}`}</p>
                <button>Show</button>
                <button onClick={handleDelete}>Delete</button>
                <p></p>
            </div>
        </div>
    )
}

export default BillItem