import {createStore, combineReducers, applyMiddleware} from 'redux'
import userReducer from '../reducer/userReducer'
import customersReducer from '../reducer/customersReducer'
import productsReducer from '../reducer/productsReducer'
import billsReducer from '../reducer/billsReducer'
import thunk from 'redux-thunk'

const configureStore = () => {
    const store = createStore(combineReducers({
        user: userReducer,
        customers: customersReducer,
        products: productsReducer,
        bills: billsReducer
    }), applyMiddleware(thunk))
    return store
}

export default configureStore

