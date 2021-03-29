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
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {
    salad : 0.5, 
    bacon: 1.7,
    cheese: 0.4, 
    meat: 1.3
}

class BurgerBuilder extends Component {
    
    state = {
        price : 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error:false
    }

    componentDidMount () {
        axios.get('/ingredients.json')
        .then(response => this.setState({ingredients: response.data}))
        .catch(error => this.setState({error: true}))
    }

    updatePurchasable (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        
        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldTypeCount = this.state.ingredients[type];
        const newTypeCount = oldTypeCount + 1 ;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = newTypeCount;
       
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.price;
        const newPrice = oldPrice + priceAddition;
        
        this.setState({ingredients: updatedIngredients, price: newPrice});

        this.updatePurchasable(updatedIngredients);
    }

    removedInregedientHandler = (type) => {
        const oldTypeCount = this.state.ingredients[type];
        if (oldTypeCount <= 0 ) return;
        const newTypeCount =  oldTypeCount - 1 ;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = newTypeCount;
       
        const priceReduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.price;
        const newPrice = oldPrice - priceReduction;
        this.setState({ingredients: updatedIngredients, price: newPrice});
        this.updatePurchasable(updatedIngredients);

    }
    
    purchaseHandler =  () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler =  () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler =  () => {
        const queryParams = [];

        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))

        }
        
        queryParams.push('price=' + this.state.price)

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render () {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients cant be loaded</p> : <Spinner />;

        let orderSummary = null;

        if (this.props.ings) {
            burger = (
                <Aux>
                     <Burger ingredients={this.props.ings}/>
                <BuildControls 
                    ingredientAdded={this.props.onIngredientAdded} 
                    disabled={disabledInfo}
                    price={this.state.price} 
                    ingredientRemoved={this.removedInregedientHandler}
                    purchasable={!this.state.purchasable}
                    ordered={this.purchaseHandler} />
                </Aux>
            );

             orderSummary =  <OrderSummary
                ingredients={this.props.ings}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                totalPrice={this.state.price}/>;
        }



        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

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
        ings: state.ingredients
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => {
            dispatch({type: actionTypes.ADD_INGREDIENT,ingredientName: ingName})
        },

        onIngeredientRemoved: (ingName) => {    
            dispatch({type: actionTypes.REMOVE_INGREDIENT,ingredientName: ingName})
        }
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));