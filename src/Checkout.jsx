import React, { Component, Fragment } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import FaShoppingCart from 'react-icons/lib/md/shopping-cart';
import './Checkout.css';

import Header from './components/Header';
import Product from './components/Product';
import CancelConfirm from './components/CancelConfirm';
import Loading from './components/Loading';

const customStyles = {
  content : {
    width       : '300px',
    height      : '180px',
    top         : '50%',
    left        : '50%',
    right       : 'auto',
    bottom      : 'auto',
    marginRight : '-50%',
    zIndex      : '3',
    transform   : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')
Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, .6)';

class Checkout extends Component {
  constructor() {
    super();    
    this.state = {
      checkoutData: undefined,
      modalIsOpen: false,
      checkoutMessage: {
        status: undefined,
        title: undefined,
        subtitle: undefined
      }
    }
  }

  render() {
    return (
      <div className="checkout">
        <Header />
        {
          this.state.checkoutData ?
          <Fragment>
            <Product image={this.state.checkoutData.product.image} coupons={this.state.checkoutData.checkout.availableCoupons}
                      totalPrice={this.state.checkoutData.checkout.totalPrice} productPrice={this.state.checkoutData.product.price}
                      shippingValue={this.state.checkoutData.checkout.shippingPrice} />
            <CancelConfirm accept={ () => this.openModal('success') } reject={ () => this.openModal('failure') }/>
          </Fragment>
          :
          <Loading />
        }
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles} contentLabel="Example Modal">
          {
            this.state.checkoutMessage !== undefined ?
            <div className="modal-content">
              <FaShoppingCart style={{
                          display: 'block',
                          width: '32px',
                          height: '32px',
                          margin: '0 auto',
                          color: `${this.state.checkoutMessage.status === 'success' ? 'green' : 'red'}` }} />

              <h2 className="checkout__modal__title">{this.state.checkoutMessage.title}</h2>
              <h2 className="checkout__modal__subtitle">{this.state.checkoutMessage.subtitle}</h2>
            </div> : this.closeModal()
          }
        </Modal>
      </div>
    );
  }

  componentDidMount() {
    this.getCheckoutData();
  }

  /* custom */
  getCheckoutData = () => {
    axios.get('http://localhost:3001/api/checkouts/1').then(res => {
      this.setState({checkoutData: res.data})
    })
  }

  openModal = type => {
    let checkoutMessage = undefined;
    this.setState({modalIsOpen: true}, () => {
      switch (type) {
        case 'success':
          checkoutMessage = {
            status: 'success',
            title: 'compra confirmada',
            subtitle: 'enviaremos atualizações sobre o pedido para o seu email'
          }
          this.setState({checkoutMessage})
          break;
          
          case 'failure':
          checkoutMessage = {
            status: 'failure',
            title: 'compra cancelada',
            subtitle: 'o pedido não foi enviado e você não será cobrado'
          }
          this.setState({checkoutMessage})
          break;
      
        default:
          break;
      }
    });
  }
  
  closeModal = () => {
    this.setState({modalIsOpen: false});
  }
}

export default Checkout;
