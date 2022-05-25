import React from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

const portalElement = document.getElementById('overlays');

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClick} />;
};

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

const Modal = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onClick={props.onClose} />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </React.Fragment>
    );
};

export default Modal;

