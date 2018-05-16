import React, { Component } from 'react'
import './Coupon.css';

export default class Coupon extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: 0
    }
  }

  render() {
    const coupons = this.props.coupons.coupons;
    return (
      <div className="product__coupons">
        <h3 className="product__coupons__title">cupons</h3>
        {
        coupons.length > 0 ?
        <form>
          <label htmlFor="0">
            <input onChange={ e => this.selectCoupon(e.target.id) } defaultChecked={true} className="product__coupons__item" type="radio" name="coupon" id="0" value="empty"/>não usar cupom
            <span className="product__coupons__selector"></span>
          </label>
          {
            coupons.map(c => (
              <label key={c.id} htmlFor={c.id}>
                <input onChange={ e => this.selectCoupon(e.target.id) } id={c.id} className="product__coupons__item" type="radio" name="coupon" value={c.id}/>{c.title}
                <span className="product__coupons__selector"></span>
                <span className="product__coupons__discount">-R$ {c.discount}</span>
              </label>
              ))
          }
        </form>
        : undefined
        }
      </div>
    )
  }

  /* custom */
  selectCoupon = id => {
    const coupons = this.props.coupons.coupons;
    if (coupons) {
      this.setState({selected: id}, () => {
        const discount = coupons.find(c => c.id == id);
        if(discount)
          this.props.couponValue(discount.discount)
        else
          this.props.couponValue(0)
      })
    }
  }
}
