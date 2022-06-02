import {React, useState, useEffect} from "react";
import { useSelector } from "react-redux";
import CustomerItem from "./CustomerItem";
import sortedData from "../../selectors/sortedData";
import ReactPaginate from 'react-paginate'

const CustomerList = (props) => {

    const customers = useSelector(state=>state.customers.data)

    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const [data, setData] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const customersPerPage = 10
    const pagesVisited = pageNumber * customersPerPage

    useEffect(() => {
        setData([...customers])
    },[customers])

    const filteredCustomers = () => {
        const result = data.filter(ele=>{
            return ele.name.toLowerCase().includes(search.toLowerCase()) ||
            ele.email.toLowerCase().includes(search.toLowerCase()) ||
            (ele.mobile === Number(search))
        })
        return result
    }

    const handleSortChange = (e) => {
        setSort(e.target.value)
        let sortedCustomers = []
        if(e.target.value === 'ascName'){
            sortedCustomers = sortedData(data, 'name')
        } else if(e.target.value === 'descName'){
            sortedCustomers = sortedData(data, 'name').reverse()
        } else {
            sortedCustomers = [...customers]
        }
        setData(sortedCustomers)
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const pageCount = filteredCustomers().length > 0 ? Math.ceil(filteredCustomers().length / customersPerPage) : Math.ceil(data.length / customersPerPage)


    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

    return (
        <div className="row mb-5 mt-5">
            <h3>List of Customers</h3>
            <div className="col-md-4">
            <input type="search" placeholder="Search by phone or mobile" value={search} onChange={handleSearchChange}/>
            </div>
            <p></p>
            <div className="col-md-4">
                <select value={sort} onChange={handleSortChange}>
                    <option value="">Sort By: None</option>
                    <option value="ascName">Name A-Z</option>
                    <option value="descName">Name Z-A</option>
                </select>
            </div>
            <p></p>
            {search?
            <div>
                {filteredCustomers().length>0 ? filteredCustomers().slice(pagesVisited, pagesVisited+customersPerPage).map(customer=>{
                return <CustomerItem key={customer._id} customer={customer}/>
            }): <h3>No Customers Added</h3>}
            </div>:
            <div>
                {data.length>0 ? data.slice(pagesVisited, pagesVisited+customersPerPage).map(customer=>{
                return <CustomerItem key={customer._id} customer={customer}/>
            }): <h3>No Customers Added</h3>}
            </div>
            }
            <div className="col-md-4">
            <ReactPaginate
            previousLabel={"Previous"}
            pageCount={pageCount}
            nextLabel={"Next"}
            onPageChange={changePage}
            />
            </div>
        </div>
    )
}

export default CustomerList