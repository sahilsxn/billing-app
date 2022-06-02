import {React, useState, useEffect} from "react";
import { useSelector } from "react-redux";
import Billtem from "./Billtem";
import ReactPaginate from 'react-paginate'

const BillList = (props) => {

    const bills = useSelector(state=>state.bills.data)
    const customers = useSelector(state=>state.customers.data)

    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const billsPerPage = 10
    const pagesVisited = pageNumber * billsPerPage

    useEffect(() => {
        setData([...bills])
    },[bills])

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const filteredBills = () => {
        let arr = []
        const customerDetails = customers.filter(ele=>{
            return ele.email.toLowerCase().includes(search.toLowerCase()) || ele.name.toLowerCase().includes(search.toLowerCase())
        })
        customerDetails.forEach(customer=>{
            const result = bills.filter(bill=>customer._id===bill.customer)
            arr =  arr.concat(result)
        })
        return arr
       }

    const pageCount = filteredBills().length > 0 ? Math.ceil(filteredBills().length / billsPerPage) : Math.ceil(data.length / billsPerPage)

    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

    return (
        <div>
            <h3>List of Bills</h3>
            <input type="search" placeholder="Search by customer email" value={search} onChange={handleSearchChange}/>
            <p></p>
            <p></p>
            {search?
            <div>
                {filteredBills().length> 0 ? filteredBills().slice(pagesVisited, pagesVisited+billsPerPage).map(bill=>{
                return <Billtem key={bill._id} bill={bill}/>
            }): <h3>No Bills Added</h3>}
            </div>:
            <div>
                {data.length>0 ? data.slice(pagesVisited, pagesVisited+billsPerPage).map(bill=>{
                return <Billtem key={bill._id} bill={bill}/>
            }): <h3>No Bills Added</h3>}
            </div>
            }
            <ReactPaginate
            previousLabel={"Previous"}
            pageCount={pageCount}
            nextLabel={"Next"}
            onPageChange={changePage}
            />
        </div>
    )
}

export default BillList