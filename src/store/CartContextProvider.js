import React, { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        let updatedItems;
        const updatedTotalAmount = state.totalAmount + (action.item.amount * action.item.price);
        const idx = state.items.findIndex(item => item.id === action.item.id);
        if (idx === -1) { // Not found
            updatedItems = state.items.concat(action.item);
        } else {
            const existingItem = state.items[idx];
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[idx] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    if (action.type === 'REMOVE_ITEM') {
        const idx = state.items.findIndex(item => item.id === action.id);
        const existingItem = state.items[idx];
        const updatedTotalAmount = state.totalAmount - existingItem.price;

        let updatedItems;
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount - 1
            };
            updatedItems = [...state.items];
            updatedItems[idx] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return defaultCartState;
};

const CartContextProvider = (props) => {
    const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

    const addItemHandler = (item) => {
        dispatchCart({
            type: 'ADD_ITEM',
            item: item
        });
    };

    const removeItemHandler = (id) => {
        dispatchCart({
            type: 'REMOVE_ITEM',
            id
        });
    };

    const cartContext = {
        ...cartState,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;

