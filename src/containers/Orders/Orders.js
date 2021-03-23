import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount () {
        axios.get('orders.json').then(res => {
        
           const ordersList = [];

           for (const key in res.data) {
               ordersList.push({
                   id: key,
                   ...res.data[key]

               })
           }

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
                        key={order.id} 
                        uniqueId={order.id}
                        totalPrice={order.totalPrice}
                        name={order.customer.name}
                        ingerdients={order.ingredients}/>
                );
            });
        }

        return  orders
        
    }
}

export default withErrorHandler(Orders,axios);