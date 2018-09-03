import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import cssClasses from './UserData.css';
import axios from '../../../axiosOrders';

class UserData extends Component {
  State = {
    username: 'David',
    mail: 'david@test.fr',
    phone: '07.87.53.47.28',
    address: {
      street: '15 rue Moquet',
      postalCode: '75013',
      city: 'Paris'
    }
  }

  orderHandler = (event) => {
    event.preventDefault();
       const order = {
        ingredients: this.props.ingredients,
        price: this.props.totalPrice,
        customer: {
          name: 'David',
          address: {
            street: '15 rue Moquet',
            codePostal: '75013',
            city: 'Paris'
          },
          phone: '07.87.53.47.28',
          mail: 'david@test.fr'
        }
      }

      this.setState({loading: true});

      axios.post('/orders.json', order)
        .then(response => {
          this.setState({
            loading: false
          })
          this.props.history.push('/');
        })
        .catch(error => {
          this.setState({
            loading: false
          })
        });
  }
  
  render() {
    return (
      <div className={cssClasses.UserData}>
        <h4>Entry your user data</h4>
          <form>
            <input className={cssClasses.Input} type='text'name='name' placeholder='Your name' />
            <input className={cssClasses.Input} type='email'name='mail' placeholder='Your mail'/>
            <input className={cssClasses.Input} type='tel'name='phone' placeholder='Your phone number'/>
            <input className={cssClasses.Input} type='text'name='street' placeholder='Street'/>
            <input className={cssClasses.Input} type='text'name='postalCode' placeholder='postalCode'/>
            <Button buttonType="Success" click={this.orderHandler}>ORDER</Button>
          </form>
      </div>
    );
  }
}

export default UserData;