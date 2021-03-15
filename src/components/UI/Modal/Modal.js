import React from 'react';
import classes from "./Modal.css"
import Aux from '../../../hoc/Auxilairy'
import BackDrop from '../BackDrop/BackDrop'

function Modal(props) {
    return (
        <Aux>
            <BackDrop show={props.show} clicked={props.modalClosed} />
            <div className ={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'tranlateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
                {props.children}
            </div>
        </Aux>
    );
}

export default Modal;

