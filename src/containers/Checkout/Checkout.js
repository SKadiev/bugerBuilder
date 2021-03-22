import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    
    state = {
        ingredients: null,
        totalPrice: 0
    }
    
    checkoutCancel = () => {
        this.props.history.goBack();
    }


    checkoutContinue = () => {
        this.props.history.replace('/checkout/contact-data');

    }

    componentWillMount () {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (const param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            } else {

                ingredients[param[0]] = +param[1];
            }
        }

        this.setState({ingredients, totalPrice: price})
    }

    render() {
        console.log(this.props.match.path)
        return (
            <div>
                <CheckoutSummary 
                    onCheckoutCancel={this.checkoutCancel}
                    onCheckoutContinued={this.checkoutContinue}
                    ingredients={this.state.ingredients}/> 
                    <Route path={this.props.match.path + '/contact-data'}  render={
                        (props) => {
                            return <ContactData ingredients={this.state.ingredients} {...props} />
                        }
                    }/>
            </div>
        );
    }
} 

export default Checkout;