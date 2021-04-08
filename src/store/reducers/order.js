import * as actionTypes from '../actions/actionsTypes';
import { fetchOrdersFail, purchaseBurgerSuccess } from '../actions/order';
import {updateObject} from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}


const purchaseBurgerStart = (state, action) => {
    return updateObject(state, {loading: true})
}

const purchaseBurgerSuccessH = (state, action) => {
    const newOrder = updateObject(action.orderData, {id: action.orderId});
    return  updateObject(state, {
        loading: false,
        purchased: true,
        orders : state.orders.concat(newOrder)
    });

}

const purchaseBurgerFail = (state, action) => {
    return updateObject(state, {loading: false})
}

const purchaseBurgerInit = (state, action) => {
    return updateObject(state, {purchased: false})
}

const fetchOrdersStart = (state, action) => {
    return updateObject(state, {purchased: true})
}

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {orders: action.orders, loading: false})
}

const fetchOrdersFailH = (state, action) => {
    return updateObject(state, {orders: action.orders, loading: false})
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_START : return purchaseBurgerStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS : return purchaseBurgerSuccessH(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL :  return purchaseBurgerFail(state, action);
        case actionTypes.PURCHASE_INIT :return purchaseBurgerInit(state, action);
        case actionTypes.FETCH_ORDERS_START : return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFailH(state, action);

        default : 
            return state

    }
}

export default reducer;