import React, {Component} from 'react';
import classes from './App.module.css';
import CommentsList from "./components/CommentsList/CommentsList";
import Comment from "./components/CommentsList/Comment/Comment";
import TextArea from "./components/TextArea/TextArea";
import Input from "./components/Input/Input";
import Button from "./components/Button/Button";

class App extends Component {

    state = {
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

    onTextAreaChangeHandler = e => {
        const comment = {...this.state.comment};
        comment.commentText = e.target.value;

        const textArea = {...this.state.textArea};
        textArea.touched = true;
        textArea.valid = this.validateControl(comment.commentText, textArea.validation);

        let fieldsValid = false;

        if (textArea.valid && this.state.input.valid) {
            fieldsValid = true
        }

        this.setState({comment, textArea, fieldsValid})

    };

    onInputChangeHandler = e => {
        const comment = {...this.state.comment};
        comment.name = e.target.value;
        const input = {...this.state.input};
        input.touched = true;
        input.valid = this.validateControl(comment.name, input.validation);

        let fieldsValid = false;

        if (input.valid && this.state.textArea.valid) {
            fieldsValid = true
        }


        this.setState({comment, input, fieldsValid})

    };

    onClickBtnHandler = () => {

        const comments = [...this.state.comments];
        const comment = {...this.state.comment};

        comments.push(comment);

        this.setState({
            fieldsValid: false,
            comments,
            comment: {
                commentText: '',
                name: '',
                date: new Date().toLocaleString()
            },
            textArea: {
                valid: false,
                validation: {
                    required: true
                }
            },
            input: {
                valid: false,
                validation: {
                    required: true
                }
            }

        });
        this.addToLocalStorage(comments)

    };

    componentDidMount() {

        const comments = JSON.parse(localStorage.getItem('state'));

        if (comments) {
            this.setState({comments})
        }

    }

    onDelete = (index) => {
        const comments = [...this.state.comments];
        comments.splice(index, 1);

        this.addToLocalStorage(comments);

        this.setState({comments});

    };

    renderMessage() {
        return this.state.comments.map((comment, index) => {

            return (
                <Comment
                    key={index}
                    commentText={comment.commentText}
                    name={comment.name}
                    date={comment.date}
                    onDelete={() => this.onDelete(index)}
                    id={this.index}
                />
            )
        })
    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true;
        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        return isValid
    }

    addToLocalStorage(state) {
        localStorage.setItem('state', JSON.stringify(state))
    }


    render() {
        return (
            <div className={classes.App}>
                <h1>Виджет Комментариев</h1>

                <CommentsList>
                    {
                        this.renderMessage()
                    }
                </CommentsList>

                <TextArea
                    placeholder='Введите текст сообщения'
                    value={this.state.comment.commentText}
                    onChangeTextArea={this.onTextAreaChangeHandler}
                    valid={this.state.textArea.valid}
                    touched={this.state.textArea.touched}
                    errorMessage={this.state.textArea.errorMessage}
                />
                <Input
                    placeholder='Введите ваше имя'
                    type="text"
                    value={this.state.comment.name}
                    onInputChange={this.onInputChangeHandler}
                    valid={this.state.input.valid}
                    touched={this.state.input.touched}
                    errorMessage={this.state.input.errorMessage}
                />
                <Button
                    onClickBtn={this.onClickBtnHandler}
                    disabled={!this.state.fieldsValid}
                />

            </div>

        )
    }
}

export default App;
