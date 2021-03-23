import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from "./CheckoutSummary.css";

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <div style={{width: '100%', height: '300px', margin: 'auto'}}>
            <h1>We hope it tastes well!</h1>
                <Burger ingredients={props.ingredients} />
            <Button 
                btnType="Danger"
                clicked={props.onCheckoutCancel}>Cancel</Button>
            <Button 
                btnType="Success"
                clicked={props.onCheckoutContinued}>Continue</Button>
            </div>
        </div>
    );
};

export default CheckoutSummary;