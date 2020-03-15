import React from "react";
import classes from "./Input.module.css"

function isInvalid({valid, touched}) {
    return !valid && touched
}

const Input = props => {
    const cls = [classes.Input];

    if (isInvalid(props)) {
        cls.push(classes.invalid)
    }

    return (
        <input
            className={cls.join(' ')}
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onInputChange}
            required={props.required}
        />
    )
};

export default Input