import React from "react";
import classes from './TextArea.module.css'

function isInvalid({valid, touched}) {
    return !valid && touched
}

const TextArea = props => {
    const cls = [classes.TextArea];
    if (isInvalid(props)) {
        cls.push(classes.invalid)
    }
    return (
        <textarea
            className={cls.join(' ')}
            placeholder={props.placeholder}
            onChange={props.onChangeTextArea}
            value={props.value}
            required={props.required}
        />
    )
};

export default TextArea