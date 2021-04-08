import * as actionsTypes from '../actions/actionsTypes';
import axios from './../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionsTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionsTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}


export const purchaseBurgerStart = () => {
    return {
        type: actionsTypes.PURCHASE_BURGER_START,
    }
}

export const purchaseInit = () => {
    return {
        type: actionsTypes.PURCHASE_INIT,
    }
}

export const purchaseBurger = (orderData) => {
   return dispatch => {
       dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error))
        })
        
   }
}

export const fetchOrdersSuccess = orders => {
    return {
        type: actionsTypes.FETCH_ORDERS_SUCCESS,
        orders
    }
}


export const fetchOrdersFail = error => {
    return {
        type: actionsTypes.FETCH_ORDERS_FAIL,
        error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionsTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = dispatch => {
    return dispatch => {
        axios.get('orders.json').then(res => {
        
            const ordersList = [];
 
            for (const key in res.data) {
                ordersList.push({
                    id: key,
                    ...res.data[key]
 
                })
            }
            dispatch(fetchOrdersSuccess(ordersList));
           
             
         })
         .catch((err) => {
            dispatch(fetchOrdersFail(err));
         })
    }

}