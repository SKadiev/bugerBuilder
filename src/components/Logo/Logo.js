import React from 'react';

import burgerLogo from '../../assets/burger-logo.png';
import classes from './Logo.css';

const Logo = (props) => {
    return (
       <div className={classes.Logo}>
           <img src={burgerLogo} alt="logo"/>
       </div>
    );
};

export default Logo;