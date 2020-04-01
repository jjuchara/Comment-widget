import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './App.module.css';
import CommentsList from "./components/CommentsList/CommentsList";
import TextArea from "./components/TextArea/TextArea";
import Input from "./components/Input/Input";
import Button from "./components/Button/Button";
import {onClickBtnHandler, onInputChangeHandler, onTextAreaChangeHandler} from "./redux/actions/actions";

class App extends Component {


    // onClickBtnHandler = () => {
    //Сделать когда все будет перерефакторино добавление в Local storage
    //     this.addToLocalStorage(comments)
    //
    // };

    componentDidMount() {

        const comments = JSON.parse(localStorage.getItem('state'));

        if (comments) {
            this.setState({comments})
        }

    }

    onDelete = (index) => {
        const comments = [...this.props.comments];
        comments.splice(index, 1);

        this.addToLocalStorage(comments);

        this.setState({comments});

    };

    // renderMessage() {
    //     return this.props.comments.map((comment, index) => {
    //
    //         return (
    //             <Comment
    //                 key={index}
    //                 commentText={comment.commentText}
    //                 name={comment.name}
    //                 date={comment.date}
    //                 onDelete={() => this.onDelete(index)}
    //                 id={this.index}
    //             />
    //         )
    //     })
    // }


    render() {
        console.log(this.props)
        return (
            <div className={classes.App}>
                <h1>Виджет Комментариев</h1>
                <CommentsList>
                    {
                        // this.renderMessage()
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
        onTextAreaChangeHandler: (e) => dispatch(onTextAreaChangeHandler(e)),
        onInputChangeHandler: (e) => dispatch(onInputChangeHandler(e)),
        onClickBtnHandler: () => dispatch(onClickBtnHandler()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
