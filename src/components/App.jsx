import React, { Component } from 'react';
import { Section } from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import Filter from './Filter/Filter';

const LS_KEY = 'contact-details';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = (name, number, id) => {
    this.setState(prevState => {
      return {
        contacts: [
          ...prevState.contacts,
          { name: name, number: number, id: id },
        ],
      };
    });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  filterContacts = e => {
    this.setState({ filter: e.target.value });

  };

  renderContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    
    const visibleContact = this.state.contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));

    return visibleContact;
  }

  
  componentDidMount() { 
    const savedData = localStorage.getItem(LS_KEY);
    if (savedData) {
      this.setState({ contacts: JSON.parse(savedData) });
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem(LS_KEY, JSON.stringify(contacts));
    }
  }

  render() {
    // const name = this.state;


    return (
      <div
        style={{
          height: '100vh',
          // display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Section title="Phonebook">
          <ContactForm
            items={this.state.contacts}
            addContactsProps={this.addContact}
          ></ContactForm>
        </Section>

        <Section title="Contacts">
          <Filter
            value={this.state.filter}
            onChangeProps={this.filterContacts}>
          </Filter>

          <ContactList
            items={this.renderContacts()}
            deleteContactProps={this.deleteContact}
          ></ContactList>
        </Section>
      </div>
    );
  }
}

export default App;
