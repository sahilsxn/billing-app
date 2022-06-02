import {React} from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncDeleteBill, asyncGetAllBills } from "../../actions/billActions";
import ShowBill from './ShowBill';
import { useState } from "react";

const BillItem = (props) => {

    const dispatch = useDispatch()

    const [showBill, setShowBill] = useState(false)

    const {bill} = props

    const customers = useSelector(state=>state.customers.data)

    const handleDelete = () => {
        dispatch(asyncDeleteBill(bill._id))
        dispatch(asyncGetAllBills())
    }

    const dated = (str) => new Date(str)

    const customerInfo = () => {
        const result = customers.find(ele=>ele._id === bill.customer)
        return result
    }

    const handleShow = () => {
        setShowBill(!showBill)
    }

    return (
        <div className="card mb-3">
            <div className="d-flex justify-content-between p-3 align-items-center">
                <b>{customerInfo().email}</b>
                <p>{customerInfo().name}</p>
                <p>{`${dated(bill.createdAt).getDate()}/${dated(bill.createdAt).getMonth()+1}/${dated(bill.createdAt).getFullYear()}`}</p>
                <button className="btn btn-secondary" onClick={handleShow}>Show Details</button>
                <button className="btn btn-danger mx-3" onClick={handleDelete}>Delete</button>
                <p></p>
            </div>
            {showBill && <ShowBill handleShow={handleShow} customerInfo={customerInfo} bill={bill} />}
        </div>
    )
}

export default BillItem