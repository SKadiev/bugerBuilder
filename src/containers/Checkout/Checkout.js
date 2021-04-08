import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import * as actionsTypes from './../../store/actions/index';
class Checkout extends Component {
    

    componentWillMount() {
        this.props.onInitPurchase();
    }
    
    checkoutCancel = () => {
        this.props.history.goBack();
    }


    checkoutContinue = () => {
        this.props.history.replace('/checkout/contact-data');

    }
    

  
    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to ='/'/> : null;
            console.log(purchasedRedirect)
            summary = ( <div>
            {purchasedRedirect}
            <CheckoutSummary 
                onCheckoutCancel={this.checkoutCancel}
                onCheckoutContinued={this.checkoutContinue}
                ingredients={this.props.ings}/> 
                <Route path={this.props.match.path + '/contact-data'}  component={ContactData} />
             </div>)
        }
        return summary;
    }
} 


const mapStateToProps = state => {
    return {
        ings:state.burgerBuilder.ingredients,
        purchased: state.order.purchased

    }
};


export default connect(mapStateToProps)(Checkout);