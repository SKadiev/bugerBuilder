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

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice  + INGREDIENT_PRICES[action.ingredientName]
    };
    return updateObject(state,updatedState);
}

const removeIngredient = (state, action) => {

    const updatedIngredientRemove = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const updatedIngredientsRemove = updateObject(state.ingredients, updatedIngredientRemove);
    const updatedStateRemove = {
        ingredients: updatedIngredientsRemove,
        totalPrice: state.totalPrice  - INGREDIENT_PRICES[action.ingredientName]
    };
    return updateObject(state,updatedStateRemove);
}

const setIngredient = (state, action) => {

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

    
}

const fetchIngredient = (state, action) => {
    return updateObject(state,{
        error: true
    })
}


const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT : return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT : return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENT : return setIngredient(state, action);
        case actionTypes.FETCH_INGREDIENT_FAILED : return fetchIngredient(state, action);
        default:
            return state;
    }

};

export default reducer;