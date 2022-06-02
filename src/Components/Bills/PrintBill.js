import React from "react";
import { useSelector } from "react-redux";

    const PrintBill = (props) => {
    
    const {products, customerInfo, bill } = props

    const userData = useSelector(state=>state.user.user)

    console.log(userData)
    
    const getTotal = () => {
        
    const result = bill.lineItems.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.subTotal
        }, 0)
        return result
    }

    const getProductinfoById = (id, products) => {
        const result = products.find((product) => {
            return product._id === id
        })
        return result
    }

  return (
    <div id="bill-info">
      <div className="card-body" style={{ textAlign:'center'}}>
        <h5 className="card-title">{userData.businessName}</h5>
        <h6>{userData.address}</h6>
        <h6>Email: {userData.email}</h6>
      </div>
      <hr />
      <div className="d-flex justify-content-between">
        <div style={{ padding: '0px 10px' }}>
          <p>Customer name: {customerInfo().name}</p>
          <p>Mobile: {customerInfo().mobile}</p>
        </div>
        <div style={{ padding: '0px 10px' }}>
          <p>Date: {bill.date.slice(0, 10)}</p>
        </div>
      </div>
      <hr />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sl.No.</th>
            <th>Particulars</th>
            <th>MRP</th>
            <th>Qty</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {

            bill.lineItems.map((lineItem, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{getProductinfoById(lineItem.product, products).name}</td>
                  <td>{lineItem.price}</td>
                  <td>{lineItem.quantity}</td>
                  <td>{lineItem.subTotal}</td>
                </tr>
              )
            })
          }
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <th>Total</th>
            <th>{getTotal()}</th>
          </tr>

        </tbody>
      </table>
    </div>
  )
}

export default PrintBill