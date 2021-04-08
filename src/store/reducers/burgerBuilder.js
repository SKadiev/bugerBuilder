import * as actionTypes from '../actions/actionsTypes';
import {updateObject} from '../utility';

const INGREDIENT_PRICES = {
    salad : 0.5, 
    bacon: 1.7,
    cheese: 0.4, 
    meat: 1.3
};

const initalState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT :
            const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1}
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice  + INGREDIENT_PRICES[action.ingredientName]
            };
            return updateObject(state,updatedState);
             
        case actionTypes.REMOVE_INGREDIENT : 
        
            const updatedIngredientRemove = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1};
            const updatedIngredientsRemove = updateObject(state.ingredients, updatedIngredientRemove);
            const updatedStateRemove = {
                ingredients: updatedIngredientsRemove,
                totalPrice: state.totalPrice  - INGREDIENT_PRICES[action.ingredientName]
            };
            return updateObject(state,updatedStateRemove);

        case actionTypes.SET_INGREDIENT : 
        return updateObject(state, {
            ingredients: {
                salad: action.ingredients.salad,
                bacon: action.ingredients.bacon,
                cheese: action.ingredients.cheese,
                meat: action.ingredients.meat,
            },
            error: false,
            totalPrice: 4
            
        })

        case actionTypes.FETCH_INGREDIENT_FAILED : 
        return updateObject(state,{
            error: true
        })
        default:
            return state;
    }

};

export default reducer;