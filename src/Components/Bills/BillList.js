import {React, useState, useEffect} from "react";
import { useSelector } from "react-redux";
import Billtem from "./Billtem";
import sortedData from "../../selectors/sortedData";
import ReactPaginate from 'react-paginate'

const BillList = (props) => {

    const bills = useSelector(state=>state.bills.data)
    const customers = useSelector(state=>state.customers.data)

    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const [data, setData] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const billsPerPage = 10
    const pagesVisited = pageNumber * billsPerPage

    useEffect(() => {
        setData([...bills])
    },[bills])

    const filteredBills = () => {
     let result = []
        const customerDetails = customers.filter(ele=>ele.name.toLowerCase().includes(search.toLowerCase()))
        customerDetails.forEach(customer=>{
            const filteredBill = bills.filter(ele=>ele._id===customer._id)
            return [...result, filteredBill]
        })
        return result
    }

    const handleSortChange = (e) => {
        setSort(e.target.value)
        let sortedBills = []
        if(e.target.value === 'ascName'){
            sortedBills = sortedData(data, 'name')
        } else if(e.target.value === 'descName'){
            sortedBills = sortedData(data, 'name').reverse()
        } else {
            sortedBills = [...bills]
        }
        setData(sortedBills)
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const pageCount = filteredBills().length > 0 ? Math.ceil(filteredBills().length / billsPerPage) : Math.ceil(data.length / billsPerPage)


    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

    return (
        <div>
            <h3>List of Bills</h3>
            <input type="search" placeholder="Search by customer name" value={search} onChange={handleSearchChange}/>
            <p></p>
            <div>
                <select value={sort} onChange={handleSortChange}>
                    <option value="">Sort By: None</option>
                    <option value="ascName">Name A-Z</option>
                    <option value="descName">Name Z-A</option>
                </select>
            </div>
            <p></p>
            {search?
            <div>
                {filteredBills().length>0 ? filteredBills().slice(pagesVisited, pagesVisited+billsPerPage).map(bill=>{
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