import React, { Component } from 'react'
import './CancelConfirm.css';

export default class CancelConfirm extends Component {
  render() {
    return (
      <div className="product__options">
        <button onClick={() => this.props.reject()} className="product__options__button button--cancel">cancelar</button>
        <button onClick={() => this.props.accept()} className="product__options__button button--confirm">confirmar</button>
      </div>
    )
  }
}
