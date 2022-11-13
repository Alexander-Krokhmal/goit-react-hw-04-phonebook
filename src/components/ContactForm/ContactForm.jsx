import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  nameInputId = nanoid();
  telInputId = nanoid();

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const name = e.target.name;

    let presentContact = false;

    this.props.items.map(({ name }) => {
      if (name === this.state.name) {

        this.setState({ name: '', number: '' });

        presentContact = true;
        return alert(`${name} is already in contacts`);
      } else {
        return null;
      }
    });

    if (!presentContact) {
      this.setState({ [e.target.name]: e.target.value });

      this.props.addContactsProps(this.state.name, this.state.number, nanoid());
      console.log('name', name.value);

    this.setState({ name: '', number: '' });
    }
  };

  render() {
    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <label className={css.label} htmlFor={this.nameInputId}>
          Name
          <input
            className={css.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            id={this.nameInputId}
            value={this.state.name}
            placeholder="Alex Krom"
            onChange={this.handleChange}
          />
        </label>

        <label className={css.label} htmlFor={this.telInputId}>
          Number
          <input
            className={css.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            id={this.telInputId}
            value={this.state.number}
            placeholder="227-91-26"
            onChange={this.handleChange}
          />
        </label>

        <button className={css.btn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
