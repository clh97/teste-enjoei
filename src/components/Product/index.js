import React, { Component } from 'react'
import Coupon from './Coupon'; 
import Resume from './Resume'; 

import './Product.css';

export default class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      couponValue: 0
    }
  }

  render() {
    return (
      <div className="product">
        <img src={this.props.image} alt="blusa" className="product__image"/>
        <Coupon coupons={this.props} totalPrice={this.props.totalPrice} couponValue={v => this.setState({couponValue: v})} />
        <Resume originalValue={this.props.productPrice} couponValue={this.state.couponValue} shippingValue={this.props.shippingValue} totalValue={'asda'} />
      </div>
    )
  }
}