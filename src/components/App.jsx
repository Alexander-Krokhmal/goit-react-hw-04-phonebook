import { useState, useEffect } from 'react';
import { Section } from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import Filter from './Filter/Filter';

const LS_KEY = 'contact-details';
const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const App = () => {
  const [contacts, setContacts] = useState(() => JSON.parse(localStorage.getItem(LS_KEY)) ?? initialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (contacts.length > 0) {
      window.localStorage.setItem(LS_KEY, JSON.stringify(contacts));
    }
  }, [contacts]);

  const addContact = (name, number, id) => {
    setContacts(prevState => 
      [...prevState,
      { name: name, number: number, id: id },]
    )
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId),
    )
  };

  const filterContacts = e => {
    setFilter(e.target.value);

  };

  const renderContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const visibleContact = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));

    return visibleContact;
  };


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
            items={contacts}
            addContactsProps={addContact}
          ></ContactForm>
        </Section>

        <Section title="Contacts">
          <Filter
            value={filter}
            onChangeProps={filterContacts}>
          </Filter>

          <ContactList
            items={renderContacts()}
            deleteContactProps={deleteContact}
          ></ContactList>
        </Section>
      </div>
    );
}

export default App;
