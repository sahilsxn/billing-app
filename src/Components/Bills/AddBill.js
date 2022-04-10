import {React, useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetCustomers } from "../../actions/customerActions";
import { asyncGetProducts } from "../../actions/ProductActions";
import BillModal from './BillModal'
import '../../CSS/billModal.css'
import { asyncAddBill } from "../../actions/billActions";

const AddBill = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(asyncGetCustomers())
    },[dispatch])
    useEffect(()=>{
        dispatch(asyncGetProducts())
    },[dispatch])

    const customerData = useSelector(state=>state.customers.data)
    const productData = useSelector(state=>state.products.data)

    const date = new Date()
    const [form, setForm] = useState({customerEmail:'', productName:'', billDate:(date.toISOString().substring(0, 10))})
    const [modal, setModal] = useState(false)
    const [filteredCustomerData, setFilteredCustomerData] = useState([])
    const [filteredProductData, setFilteredProductData] = useState([])
    const [customerInfo, setCustomerInfo] = useState({})
    const [cartItems, setCartItems] = useState([])

    const handleChange = (e) =>{
        if (e.target.name==="customerEmail"){
            setForm({...form, customerEmail:e.target.value})
            const result = customerData.filter(ele=>ele.email.toLowerCase().includes(e.target.value))
            if (e.target.value === ''){
                setFilteredCustomerData([])
            } else {
                setFilteredCustomerData(result)
            }
        } else if (e.target.name==="productName"){
            setForm({...form, productName:e.target.value})
            const result = productData.filter(ele=>ele.name.toLowerCase().includes(e.target.value))
            if (e.target.value === ''){
                setFilteredProductData([])
            } else {
                setFilteredProductData(result)
            }
        } else if (e.target.name==="billDate") {
            setForm({...form, billDate:e.target.value})
        }

    }

    const handleAddBill = () => {
        setModal(!modal)
    }

    const hideModal = () => {
        setModal(!modal)
    }

    const handleCustomerEmail = (id) => {
        const result = filteredCustomerData.find(ele=>ele._id===id)
        setCustomerInfo(result)
        setForm({...form, customerEmail:''})
        setFilteredCustomerData([])
    }

    const handleProductName = (id) => {
        const checkCart = cartItems.filter((ele) => {
            return ele._id === id
        })
        if (checkCart.length>0){
            alert('Item is already present in cart, increasing quantity')
            incQuantity(id)
        } else {
            const result = filteredProductData.find(ele=>ele._id===id)
            result.quantity = 1
            setCartItems(cartItems.concat(result))
            setForm({...form, productName:''})
            setFilteredProductData([])
        }
    }

    const decQuantity = (id) => {
        const result = cartItems.map((ele) => {
            if (ele._id === id) {
                return {...ele, quantity: ele.quantity - 1}
            }
            else {
                return {...ele}
            }
        })
        setCartItems(result)
    }

    const incQuantity = (id) => {
        const result = cartItems.map((ele) => {
            if (ele._id === id) {
                return {...ele, quantity: ele.quantity + 1}
            }
            else {
                return {...ele}
            }
        })
        setCartItems(result)
    }

    const removeItem = (id) => {
        const result = cartItems.filter((ele) => {
            return ele._id !== id
        })
        const response = window.confirm('Remove Item?')
        response && setCartItems(result)
    }

    const totalBill = () => {
        let total = 0
        for (let i = 0; i < cartItems.length; i++) {
            total += (cartItems[i].quantity * cartItems[i].price)
        }
        return total
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const result = cartItems.map(({createdAt, name, price, updatedAt, user, __v, ...rest})=>{
            return {...rest, product:rest._id}
        })
        const finalArr = result.map(({_id,...rest})=>rest)
        const formData = {
            date: form.billDate,
            customer: customerInfo._id,
            lineItems: finalArr
        }
        dispatch(asyncAddBill(formData))
        setModal(!modal)
    }

    return (
        <div>
            <button onClick={handleAddBill}>Add Bill</button>
            <p></p>
            <BillModal modal={modal} hideModal={hideModal}>
            <div>
                <label>Bill Date</label> <br/>
                <input
                type="date"
                name="billDate"
                value={form.billDate}
                onChange={handleChange}
                /> <br/>
                <p></p>
                <label>Customer Email</label> <br/>
                <input
                type="text"
                name="customerEmail"
                value={form.customerEmail}
                onChange={handleChange}
                /> <br/>
                { filteredCustomerData.length > 0 &&
                <div>{filteredCustomerData.map((customer,i)=>{
                    return (
                        <div key={i}>
                        <p onClick={()=>{handleCustomerEmail(customer._id)}}>{customer.email}</p>
                        </div>
                    )
                })}
                </div>}
                <p></p>
                <label>Product Name</label> <br/>
                <input
                type="text"
                name="productName"
                value={form.productName}
                onChange={handleChange}
                /> 
                { filteredProductData.length > 0 &&
                <div>{filteredProductData.map((product,i)=>{
                    return (
                        <div key={i}>
                        <p onClick={()=>{handleProductName(product._id)}}>{product.name} ₹{product.price}</p>
                        </div>
                    )
                })}</div>
                }
                <p></p>
                {<div>
                    <h3>Customer Details</h3>
                    <p><b>{customerInfo.name}</b> {customerInfo.email}</p>
                    {Object.keys(customerInfo).length>0 && <button type='button' onClick={()=>{setCustomerInfo({})}}>Remove</button>}
                </div>
                }
                <div>
                    <h3 className="mb-0 pb-2">Items to be billed</h3>

                    <table className='table border-top border-2 border-dark align-middle'>
                        <thead>
                            <tr>
                                <th>Sno.</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>

                        </thead>
                        <tbody>
                            {cartItems.map((item, i) => {
                                return (
                                    <tr key={item._id}>
                                        <td>
                                            {i + 1}
                                        </td>
                                        <td>
                                            {item.name}
                                        </td>
                                        <td>
                                            {item.price}
                                        </td>
                                        <td><button onClick={() => {decQuantity(item._id)}} disabled={item.quantity === 1}> - </button>{item.quantity}<button onClick={() => {incQuantity(item._id)}}> + </button></td>
                                        <td>{item.price * item.quantity}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => { removeItem(item._id) }} >Remove</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                </div>
                <h3>Total - ₹{totalBill()}</h3>
                <input
                onClick={handleSubmit}
                type="submit"
                value="SUBMIT"
                />
                <p></p>
            </div>
            </BillModal>
        </div>
    )
}

export default AddBill