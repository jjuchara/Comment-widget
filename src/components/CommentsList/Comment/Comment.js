import React from "react";
import classes from './Comment.module.css'

const Comment = props => {
    return (
        <div className={classes.Comment}>
            <div className={classes['Comment__text']}>{props.commentText}</div>
            <button
                className={classes.delete}
                onClick={props.onDelete}
                id={props.id}
            >&times;</button>
            <div className={classes.wrap}>
                <div className={classes.name}>{props.name}</div>
                <div className={classes.date}>{props.date}</div>
            </div>

        </div>
    )
};

export default Comment