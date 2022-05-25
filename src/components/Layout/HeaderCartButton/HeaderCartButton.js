import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../../store/cart-context";
import CartIcon from "../../Cart/CartIcon/CartIcon";

import classes from './HeaderCartButton.module.css'


const HeaderCartButton = (props) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

    const cartCtx = useContext(CartContext);
    const { items } = cartCtx;

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [items])


    const numOfCartItems = items.reduce((curTotal, item) => {
        return curTotal + item.amount;
    }, 0);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your cart</span>
            <span className={classes.badge}>{numOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;
