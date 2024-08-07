import React, { useContext } from 'react';

import CartContext from '../../../store/cart-context';
import MealItemForm from '../MealItemForm/MealItemForm';

import classes from './MealItem.module.css';


const MealItem = (props) => {
    const cartCtx = useContext(CartContext);

    const price = `$${props.price.toFixed(2)}`;

    const onAddToCartHandler = (amount) => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            price: props.price,
            amount: amount
        });
    };

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm id={props.id}
                    onAddToCart={onAddToCartHandler} />
            </div>
        </li>
    );
};

export default MealItem;
