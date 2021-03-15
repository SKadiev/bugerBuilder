import React from 'react';

import burgerLogo from '../../assets/burger-logo.png';
import classes from './Logo.css';

console.log(burgerLogo);

const Logo = (props) => {
    return (
       <div className={classes.Logo}>
           <img src={burgerLogo}/>
       </div>
    );
};

export default Logo;