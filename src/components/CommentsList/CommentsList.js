import React from "react";
import classes from './CommentList.module.css'

const CommentsList = props => {

    return (
        <div className={classes.CommentList}>
            {props.children}
        </div>
    )
};

export default CommentsList