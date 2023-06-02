import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
  Form,
  FormField,
  InputField,
  StyledButton,
  LabelWrapper,
  ErrorMessage,
} from './ContactsForm.styled';

function ContactsForm({ contacts, onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onNameChange = e => {
    console.log(e.target.value)
    setName(e.target.value);
  };

  const onInputChange = e => {
    console.log(e.target.value)
    setNumber(e.target.value);
  };

  const handleSubmit = () => {
    if (
      contacts.find(el => el.name.toLowerCase() === name.toLowerCase())
    ) {
      return alert(`${name} is already in contacts.`);
    }
    onSubmit(name, number);
    setName('');
    setNumber('');
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormField htmlFor="name">
          <LabelWrapper>Name:</LabelWrapper>
          <InputField
            type="text"
            name="name"
            placeholder="name"
            onChange={onNameChange}
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <ErrorMessage name="name" component="span" />
        </FormField>
        <FormField htmlFor="number">
          <LabelWrapper>Number:</LabelWrapper>
          <InputField
            type="phone"
            name="number"
            placeholder="tel number"
            onChange={onInputChange}
            value={number.replace(/(\d{3})(\d{2})(\d{2})/, '$1-$2-$3')}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <ErrorMessage name="number" component="span" />
        </FormField>
        <StyledButton type="submit">AddContact</StyledButton>
      </Form>
    </>
  );
}

ContactsForm.propType = {
  newContact: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ContactsForm;
