import {
    ON_CLICK_BTN_HANDLER,
    ON_INPUT_CHANGE_HANDLER,
    ON_TEXTAREA_CHANGE_HANDLER,
    RESET_FORM
} from "./actions/actionTypes";

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
        case ON_CLICK_BTN_HANDLER:
            return {
                ...state,
                comments: action.comments,
            };
        case RESET_FORM:
            return {
                ...state,
                fieldsValid: false,
                comment: {
                    commentText: '',
                    name: '',
                    date: new Date().toLocaleString()
                },
                textArea: {
                    valid: false,
                    touched: false,
                },
                input: {
                    valid: false,
                    touched: false,
                }
            };

        default:
            return state
    }

}