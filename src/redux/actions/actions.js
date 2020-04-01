import {ON_INPUT_CHANGE_HANDLER, ON_TEXTAREA_CHANGE_HANDLER} from "./actionTypes";


export function onTextAreaChangeHandler(e) {

    return (dispatch, getState) => {

        const comment = {...getState().comment};
        comment.commentText = e.target.value;

        const textArea = {...getState().textArea};
        textArea.touched = true;

        let fieldsValid = false;

        if (textArea.valid && this.props.input.valid) {
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
        const comment = {...getState().comment};
        comment.name = e.target.value;

        const input = {...getState().input};
        input.touched = true;

        let fieldsValid = false;

        if (input.valid && this.props.textArea.valid) {
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
