import React, { useRef } from 'react';

import Input from '../../UI/Input/Input';
import classes from './MealItemForm.module.css';


const MealItemForm = (props) => {
    const amountInputRef = useRef();

    const onAddHandler = () => {
        const amountStr = amountInputRef.current.value;
        const amount = +amountStr;
        if (amountStr.trim().length === 0 ||
            amount < 1 ||
            amount > 5) {
            return;
        }
        props.onAddToCart(amount);
    };

    return (
        <form className={classes.form}>
            <Input label="Amount"
                ref={amountInputRef}
                input={{
                    id: `amount_${props.id}`,
                    type: 'number',
                    min: '0',
                    max: '5',
                    step: '1',
                    defaultValue: '0'
                }}
            />
            <button type='button' onClick={onAddHandler}>+ Add</button>
        </form>
    );
};

export default MealItemForm;
