import React from "react";
import { useSelector } from 'react-redux'
import Chart from "./Charts";

const Dashboard = (props) => {

    const customers = useSelector(state=>state.customers.data)
    const products = useSelector(state=>state.products.data)
    const bills = useSelector(state=>state.bills.data)

    const result = bills.reduce(function (previousVal, currentVal) {
        return previousVal + currentVal.total
    }, 0)

    const StatsItem = (props) => {

        const {count, text} = props
        return (
            <div className="col-md-3">

                <div className="card bg-grey">
                    <div className="card-header"><h1>{count}</h1></div>
                    <div className="card-body">
                        <div className="card-title">
                            <h3>{text}</h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>

            <div style={{ display: "flex", justifyContent: "center", flexDirection:'column'}} className="mb-5">
                <h2>Dashboard</h2>
                <Chart />
            </div>

            <div className="row mb-5">
                <StatsItem count={bills.length} text="Total Bills" />
                <StatsItem count={products.length} text="Total Products" />
                <StatsItem count={customers.length} text="Total Customers" />
                <StatsItem count={result} text="Total Income" />
            </div>

            <div className="row mt-5 mb-5">
                <div className="col-sm-5">
                    <div className="card border-info">
                        <div className="card-body">
                            <h4 className="card-title">Recent Customers</h4>
                            <ol>
                                {
                                    customers.slice(-5).map((ele) => {
                                        return <li key={ele._id}>{ele.name}</li>
                                    })
                                }
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="col-sm-1">
                    &nbsp;
                </div>
                <div className="col-sm-5">
                    <div className="card border-info">
                        <div className="card-body">
                            <h4 className="card-title">Recent Products</h4>
                            <ol>
                                {
                                    products.slice(-5).map((ele) => {
                                        return <li key={ele._id}>{ele.name}</li>
                                    })
                                }
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard