import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './App.module.css';
import CommentsList from "./components/CommentsList/CommentsList";
import TextArea from "./components/TextArea/TextArea";
import Input from "./components/Input/Input";
import Button from "./components/Button/Button";
import {
    fetchLocalStorage,
    onClickBtnHandler,
    onDelete,
    onInputChangeHandler,
    onTextAreaChangeHandler
} from "./redux/actions/actions";
import Comment from "./components/CommentsList/Comment/Comment";

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
        textArea.valid = this.validateControl(this.state.comment.commentText, textArea.validation);

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
        input.valid = this.validateControl(this.state.comment.name, input.validation);

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
            },
            input: {
                valid: false,
            }

        });
        this.addToLocalStorage(comments)

    };

    componentDidMount() {

        this.props.fetchLocalStorage()
    }

    renderMessage() {
        return this.props.comments.map((comment, index) => {

            return (
                <Comment
                    key={index}
                    commentText={comment.commentText}
                    name={comment.name}
                    date={comment.date}
                    onDelete={() => this.props.onDelete(index)}
                    id={this.index}
                />
            )
        })
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
                    value={this.props.comment.commentText}
                    onChangeTextArea={this.props.onTextAreaChangeHandler}
                    valid={this.props.textArea.valid}
                    touched={this.props.textArea.touched}
                    errorMessage={this.props.textArea.errorMessage}
                />
                <Input
                    placeholder='Введите ваше имя'
                    type="text"
                    value={this.props.comment.name}
                    onInputChange={this.props.onInputChangeHandler}
                    valid={this.props.input.valid}
                    touched={this.props.input.touched}
                    errorMessage={this.props.input.errorMessage}
                />
                <Button
                    onClickBtn={this.props.onClickBtnHandler}
                    disabled={!this.props.fieldsValid}
                />
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        fieldsValid: state.fieldsValid,
        comments: state.comments,
        comment: state.comment,
        textArea: state.textArea,
        input: state.input
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onTextAreaChangeHandler: e => dispatch(onTextAreaChangeHandler(e)),
        onInputChangeHandler: e => dispatch(onInputChangeHandler(e)),
        onClickBtnHandler: () => dispatch(onClickBtnHandler()),
        onDelete: index => dispatch(onDelete(index)),
        fetchLocalStorage: () => dispatch(fetchLocalStorage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
