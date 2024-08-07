import React from 'react';

import mealsImg from '../../assets/main-banner.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton/HeaderCartButton';


const Header = (props) => {

    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>React Meals</h1>
                <HeaderCartButton onClick={props.onShowCart} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImg} alt='Meals-banner' />
            </div>
        </React.Fragment>
    );
};

export default Header;
