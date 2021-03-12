import React, { Component } from 'react';

import Aux from '../../hoc/Auxilairy';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
        price : 4
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
        console.log(this.state.price)

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
        console.log(this.state.price)
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
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    disabled={disabledInfo} 
                    ingredientRemoved={this.removedInregedientHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;