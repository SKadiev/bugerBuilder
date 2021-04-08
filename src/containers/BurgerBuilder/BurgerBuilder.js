import React, { Component } from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxilary/Auxilairy';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions/actionsTypes';
import {addIngredient, removeIngredient, initIngeredients, purchaseInit} from '../../store/actions/index';


class BurgerBuilder extends Component {
    
    state = {
        purchasing: false,
        loading: false,

    }

    componentDidMount () {
        this.props.onInitIngredients();
    }

    updatePurchasable (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        
       return sum > 0
    }

 
    
    purchaseHandler =  () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler =  () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler =  () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render () {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let burger = this.props.error ? <p style={{textAlign: 'center'}}>Ingredients cant be loaded</p> : <Spinner />;

        let orderSummary = null;

        if (this.props.ings) {
            burger = (
                <Aux>
                     <Burger ingredients={this.props.ings}/>
                <BuildControls 
                    ingredientAdded={this.props.onIngredientAdded} 
                    disabled={disabledInfo}
                    price={this.props.price} 
                    ingredientRemoved={this.props.ingredientRemoved}
                    purchasable={this.updatePurchasable(this.props.ings)}
                    ordered={this.purchaseHandler} />
                </Aux>
            );

             orderSummary =  <OrderSummary
                ingredients={this.props.ings}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                totalPrice={this.props.price}/>;
        }



        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        console.log(this.props)
        return (
            
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchasaCancelHandler}  >
                   {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(addIngredient(ingName)),
        ingredientRemoved: (ingName) => dispatch(removeIngredient(ingName)),
        onInitIngredients : () => dispatch(initIngeredients()),
        onInitPurchase : () => dispatch(purchaseInit()),
        
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));