import {ON_CLICK_BTN_HANDLER, ON_INPUT_CHANGE_HANDLER, ON_TEXTAREA_CHANGE_HANDLER, RESET_FORM} from "./actionTypes";


export function onTextAreaChangeHandler(e) {

    return (dispatch, getState) => {
        const currentState = {...getState()};
        const comment = {...getState().comment};
        comment.commentText = e.target.value;

        const textArea = {...getState().textArea};
        textArea.touched = true;
        textArea.valid = validateControl(comment.commentText, textArea.validation);

        let fieldsValid = false;

        if (textArea.valid && currentState.input.valid) {
            fieldsValid = true
        }

        dispatch({
            type: ON_TEXTAREA_CHANGE_HANDLER,
            comment,
            textArea,
            fieldsValid
        })
    };
}

export function onInputChangeHandler(e) {

    return (dispatch, getState) => {
        const currentState = {...getState()};
        const comment = {...getState().comment};
        comment.name = e.target.value;

        const input = {...getState().input};
        input.touched = true;
        input.valid = validateControl(comment.name, input.validation);

        let fieldsValid = false;

        if (input.valid && currentState.textArea.valid) {
            fieldsValid = true
        }

        dispatch({
            type: ON_INPUT_CHANGE_HANDLER,
            comment,
            input,
            fieldsValid
        })
    }
}

export function onClickBtnHandler() {

    return (dispatch, getState) => {
        const comments = [...getState().comments];
        const comment = {...getState().comment};

        comments.push(comment);

        addToLocalStorage(comments);

        dispatch(resetForm());

        dispatch({
            type: ON_CLICK_BTN_HANDLER,
            comments
        })
    };
}

export function resetForm() {
    return {
        type: RESET_FORM
    }
}

function validateControl(value, validation) {

    if (!validation) {
        return true
    }

    let isValid = true;
    if (validation.required) {
        isValid = value.trim() !== '' && isValid
    }

    return isValid

}

function addToLocalStorage(state) {
    localStorage.setItem('state', JSON.stringify(state))
}

