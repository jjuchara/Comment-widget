import {ON_INPUT_CHANGE_HANDLER, ON_TEXTAREA_CHANGE_HANDLER} from "./actions/actionTypes";

const initialState = {
    fieldsValid: false,
    comments: [],
    comment: {
        commentText: '',
        name: '',
        date: new Date().toLocaleString()
    },
    textArea: {
        errorMessage: 'Поле не должно быть пустым',
        valid: false,
        touched: false,
        validation: {
            required: true
        }
    },
    input: {
        errorMessage: 'Поле не должно быть пустым',
        valid: false,
        touched: false,
        validation: {
            required: true
        }
    }
};

export default function rootReducer(state = initialState, action) {

    switch (action.type) {
        case ON_TEXTAREA_CHANGE_HANDLER:
            return {
                ...state,
                comment: action.comment,
                textArea: action.textArea,
                fieldsValid: action.fieldsValid
            };
        case ON_INPUT_CHANGE_HANDLER:
            return {
                ...state,
                comment: action.comment,
                input: action.input,
                fieldsValid: action.fieldsValid
            };

        default:
            return state
    }

}