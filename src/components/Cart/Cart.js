import React, { useContext } from 'react';

import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal/Modal';
import CartItem from './CartItem/CartItem';

import classes from './Cart.module.css';


const Cart = (props) => {
    const cartCtx = useContext(CartContext);

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map(item =>
                <CartItem key={item.id}
                    name={item.name}
                    price={item.price}
                    amount={item.amount}
                    onAdd={cartItemAddHandler.bind(null, item)} // Equivalent to anonymous func: () => cartItemRemoveHandler(item)
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                />)}
        </ul>
    );
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
};

export default Cart;

