import React from "react";
import classes from "./Button.module.css"

const Button = props => {
    return (
        <button
            className={classes.Button}
            onClick={props.onClickBtn}
            disabled={props.disabled}
        >
            Отправить сообщение
        </button>
    )
};

export default Button