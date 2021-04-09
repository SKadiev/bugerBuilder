import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem'
import classes from "./NavigationItems.css";

const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem exact link="/" >BurgerBuilder</NavigationItem>
        <NavigationItem link="/orders" >Orders</NavigationItem>
        {props.isAuthenticated ? 
             <NavigationItem link="/logout" >Logout</NavigationItem> :
             <NavigationItem link="/auth" >Authenticate</NavigationItem> }
      
    </ul>
)

export default NavigationItems;