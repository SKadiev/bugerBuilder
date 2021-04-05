import * as actionsTypes from './actionsTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionsTypes.ADD_INGREDIENT,
        ingredientName: name
    }
};


export const removeIngredient = (name) => {
    return {
        type: actionsTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
};

export const setIngredients = ingredients => {
    return {
        type: actionsTypes.SET_INGREDIENT,
        ingredients
    }
}

export const fetchIngredientFailed = ingredients => {
    return {
        type: actionsTypes.FETCH_INGREDIENT_FAILED
    }
}

export const initIngeredients = () => {
    return dispatch => {

        axios.get('/ingredents.json')
        .then(response => {
            if (response.data) {
                dispatch(setIngredients(response.data))
            } else {
                dispatch(fetchIngredientFailed());
            }
        })
       
    }
};