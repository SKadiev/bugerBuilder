import React from 'react';

import classes from './Order.css';

const Order = (props) =>  {

    let ingredients = Object.entries(props.ingerdients);

    ingredients =  ingredients.map(ingredient => {
        return <li key={`${ingredient[0]}_${ingredient[1]}${props.uniqueId}`}>{ingredient[0]}({ingredient[1]})</li>
    })


    return (
        <div className={classes.Order}>
            <p><strong>Ordered by : </strong>{props.name}</p>
            <p>Ingredients: </p>
            <ul>{ingredients}</ul>
            <p>Price: <strong>USD {+props.totalPrice.toFixed(2)}</strong>$ </p>
        </div>
    )
}

export default Order;