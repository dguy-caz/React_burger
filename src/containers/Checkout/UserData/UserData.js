import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import cssClasses from './UserData.css';

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
            <Button buttonType="Success" >ORDER</Button>
          </form>
      </div>
    );
  }
}

export default UserData;