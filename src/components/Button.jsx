import React from 'react';
import styles_btn from '../styles/modules/button.module.scss';
import { getClasses } from '../utils/getClasses';

const buttonTypes = {
    primary: 'primary',
    secondary: 'secondary'
}

function Button({ children, variant, type, ...rest }) {
    return (
        <button
            className={getClasses([
                styles_btn.button,
                styles_btn[`button--${buttonTypes[variant]}`]
            ])}
            type={type === 'submit' ? 'submit' : 'button'}
            {...rest}
        >

            {children}
        </button>
    );
}


export function SelectButton({ children, ...rest }) {
    return (
        <select
            className={getClasses([styles_btn.button, styles_btn.button__select])}
            {...rest}
        >
            {children}
        </select>
    )
}



export default Button;
