import React from 'react';

import classes from './DrawerToogle.css';


const DrawerToogle = (props) => {
    return (
        <div  className={classes.DrawerToggle} onClick={props.toogleMenu} >
            <div></div>
            <div></div>
            <div></div> 
        </div>
    );
};

export default DrawerToogle;