import React, { Component } from 'react';

import Aux from '../../hoc/Auxilairy';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
const INGREDIENT_PRICES = {
    salad : 0.5, 
    bacon: 1.7,
    cheese: 0.4, 
    meat: 1.3
}

class BurgerBuilder extends Component {
    
    state = {
        ingredients : {
            salad : 0, 
            bacon: 0,
            cheese: 0, 
            meat: 0

        }, 
        price : 4,
        purchasable: false,
        purchasing: false,
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
    
    purchasaHandler =  () => {
        this.setState({purchasing: true});
    }

    purchasaCancelHandler =  () => {
        this.setState({purchasing: false});
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchasaCancelHandler}  ><OrderSummary ingredients={this.state.ingredients}/></Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    disabled={disabledInfo}
                    price={this.state.price} 
                    ingredientRemoved={this.removedInregedientHandler}
                    purchasable={!this.state.purchasable}
                    ordered={this.purchasaHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;