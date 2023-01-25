import { Component } from "react";
import css from "./Modal.module.css"
import PropTypes from 'prop-types';

import { createPortal } from "react-dom";


const modalRoot = document.querySelector("#modal-root");

export class Modal extends Component{

    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeyDown)
    }

    handleKeyDown = e => {
            if (e.code === "Escape") {
                this.props.onClose();
            }
    }

    handleBackdropClick = (e) => {
        if (e.currentTarget === e.target) {
            this.props.onClose();
        }
    }


    render() {
        return (
            createPortal(
            <div className={css.Overlay} onClick={this.handleBackdropClick}>
                <div className={css.Modal}>
                    <img src={this.props.img} alt="" />
                </div>
            </div>, modalRoot,)
        )
        
    }
}

Modal.propTypes = {
    onClose: PropTypes.func,
    img: PropTypes.string,
}