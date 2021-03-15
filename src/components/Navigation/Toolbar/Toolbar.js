import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import DrawerToogle from '../SideDrawer/DrawerToogle/DrawerToogle';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToogle toogleMenu={props.toogleMenu}/>
            <div className={classes.Logo}>
                <Logo />
            </div>
           <nav className={classes.DesktopOnly}>
             <NavigationItems />
           </nav>

        </header>
    );
};

export default Toolbar;