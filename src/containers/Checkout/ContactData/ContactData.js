import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from "../../../axios-orders";
import Spinner from '../../../components/UI/Spinner/Spinner';
class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
            loading: false
        }
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        console.log(this.props)
        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
            customer: {
                name : 'Horhe Sampaoli',
                address: {
                    street: 'street1',
                    contry: 'Germany'
                },
                email:'test@test.com'
            },
            deliveryMethod: 'fastest'

        };
        
        axios.post('/orders.json', order)
            .then(response => console.log(response))
            .catch(error => console.log(error))
            .finally(() => {
                this.setState({loading: false, purchasing: false});
                this.props.history.push('/');
            })

    }

    render() {
        let form = (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                    <input  className={classes.Input} type="email" name="email" placeholder="Email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Street" />
                    <input className={classes.Input}  type="text" name="postal" placeholder="Postal Code" />
                    <Button clicked={this.orderHandler} btnType="Success">Order</Button>
                </form>
            </div>
        );

        if (this.state.loading) {
            form = <Spinner />;
        }
        return form;
    }
}

export default ContactData;