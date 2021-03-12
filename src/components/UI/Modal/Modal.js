import React from 'react';
import classes from "./Modal.css"

function Modal(props) {
    return (
        <div className ={classes.Modal}
        style={{
            transform: props.show ? 'translateY(0)' : 'tranlateY(-100vh)',
            opacity: props.show ? '1' : '0'
         }}>
            {props.children}
        </div>
    );
}

export default Modal;