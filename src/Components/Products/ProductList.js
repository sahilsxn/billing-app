import {React, useState, useEffect} from "react";
import { useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import sortedData from "../../selectors/sortedData";
import ReactPaginate from 'react-paginate'

const ProductList = (props) => {

    const products = useSelector(state=>state.products.data)

    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const [data, setData] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const productsPerPage = 10
    const pagesVisited = pageNumber * productsPerPage

    useEffect(() => {
        setData([...products])
    },[products])

    const filteredProducts = () => {
        const result = data.filter(ele=>{
            return ele.name.toLowerCase().includes(search.toLowerCase())
        })
        return result
    }

    const handleSortChange = (e) => {
        setSort(e.target.value)
        let sortedProducts = []
        if(e.target.value === 'ascName'){
            sortedProducts = sortedData(data, 'name')
        } else if(e.target.value === 'descName'){
            sortedProducts = sortedData(data, 'name').reverse()
        } else {
            sortedProducts = [...products]
        }
        setData(sortedProducts)   
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const pageCount = filteredProducts().length > 0 ? Math.ceil(filteredProducts().length / productsPerPage) : Math.ceil(data.length / productsPerPage)

    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

    return (
        <div>
            <h3>List of Products</h3>
            <input type="search" placeholder="Search by product name" value={search} onChange={handleSearchChange}/>
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
                {filteredProducts().length>0 ? filteredProducts().slice(pagesVisited, pagesVisited+productsPerPage).map(product=>{
                return <ProductItem key={product._id} product={product}/>
            }): <h3>No Products Added</h3>}
            </div>:
            <div>
            {data.length>0 ? data.slice(pagesVisited, pagesVisited+productsPerPage).map(product=>{
                return <ProductItem key={product._id} product={product}/>
            }): <h3>No Products Added</h3>}
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

export default ProductList