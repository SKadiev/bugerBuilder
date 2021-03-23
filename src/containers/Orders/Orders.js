import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount () {
        axios.get('orders.json').then(res => {
           const ordersList = Object.values(res.data);
            if (ordersList.length) 
                this.setState({orders: ordersList, loading: false});
            
        })
        .catch((err) => {
            this.setState({loading:false});
        })
        
    }

    render() {
        let orders = <Spinner />

        if (!this.state.loading) {
            orders = this.state.orders.map(order => {
                return ( 
                    <Order 
                        key={order.customer.name} 
                        totalPrice={order.totalPrice}
                        name={order.customer.name}
                        ingerdients={order.ingredients}/>
                );
            });
        }

        return  orders
        
    }
}

export default Orders;