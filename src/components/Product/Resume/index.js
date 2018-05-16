import React, { Component } from 'react'
import './Resume.css';

export default class Resume extends Component {
  render() {
    return (
      <div className="product__resume">
        <h3 className="product__resume__title">resumo</h3>
        <div className="product__resume__value">
          <span className="value__indicator">valor original</span>
          <span className="value__price">R$ {this.props.originalValue}</span>
        </div>
        {this.props.couponValue ? <div className="product__resume__value">
          <span className="value__indicator">cupom</span>
          <span className="value__price value__price--red">-R$ {this.props.couponValue}</span>
        </div> : undefined}
        <div className="product__resume__value">
          <span className="value__indicator">frete</span>
          <span className="value__price">R$ {this.props.shippingValue}</span>
        </div>
        <div className="product__resume__value">
          <span className="value__indicator">total</span>
          <strong className="value__price">R$ { this.props.originalValue - this.props.couponValue + this.props.shippingValue }</strong>
        </div>
      </div>
    )
  }
}
