import React, { Component } from 'react';
import ListContacts from './ListContact';
import * as ContactAPI from "./utils/ContactsAPI"
import CreateContact from "./CreateContact"
import { Route } from 'react-router-dom'


class App extends Component {

  state={
    contacts:[]
  }

componentDidMount(){
  ContactAPI.getAll()
  .then(contacts=>{
    this.setState(()=>({contacts}))
  })
}



removeContact=(contact)=>{
 this.setState(prevState=>({
   contacts : prevState.contacts.filter(e=>{
     return e.id !== contact.id
    })
 }))
 ContactAPI.remove(contact)
}

createContact=(contact)=>{
 ContactAPI.create(contact)
 .then(contact=>{
   this.setState((prevState)=>({
     contacts:prevState.contacts.concat(contact)
   }))
 })
}

  render() {
    return (
      <div>
      <Route exact path="/" render={()=>(
        <ListContacts clickFxn={this.removeContact} contacts={this.state.contacts}/>
      )} />

      <Route path="/create" render={({history})=>(
        <CreateContact onCreateContact={(contact)=>{
          this.createContact(contact);
          history.push('/');
        }}/>
      )} />
      </div>
    );
  }
}

export default App;
