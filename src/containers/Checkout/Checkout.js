import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
    

    
    checkoutCancel = () => {
        this.props.history.goBack();
    }


    checkoutContinue = () => {
        this.props.history.replace('/checkout/contact-data');

    }

  
    render() {
        return (
            <div>
                <CheckoutSummary 
                    onCheckoutCancel={this.checkoutCancel}
                    onCheckoutContinued={this.checkoutContinue}
                    ingredients={this.props.ings}/> 
                    <Route path={this.props.match.path + '/contact-data'}  component={ContactData} />
            </div>
        );
    }
} 


const mapStateToProps = state => {
    return {
        ings:state.ingredients

    }
};

export default connect(mapStateToProps)(Checkout);