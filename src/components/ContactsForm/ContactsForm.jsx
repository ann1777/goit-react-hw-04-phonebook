import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Formik } from 'formik';
import { useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';

import {
  Form,
  FormField,
  FieldFormik,
  StyledButton,
  LabelWrapper,
  ErrorMessage,
} from './ContactsForm.styled';

function ContactsForm({ contacts, newContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const { handleSubmit } = useForm({
    defaultValues: { contacts: [], name: '', number: '' },
  });

  const onFormSubmit = ({ name, number }) => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return alert(`${name} is already in contacts.`);
    }
    this.props.addContact(state => [
      ...state,
      {
        id: nanoid(),
        name: name,
        number: number,
      },     
    ]);
    newContact(name, number);
    setName('');
    setNumber('');
  };

  const onNameChange = e => {
    setName(e.target.value);
  };

  const onInputChange = e => {
    setNumber(e.target.value);
  };

  // const onFormSubmit = e => {
  //   e.preventDefault();
  //   if (
  //     contacts.filter(el => el.name.toLowerCase() === name.toLocaleLowerCase())
  //   ) {
  //     return alert(`${name} is already in contacts.`);
  //   }
  //   newContact(name, number);
  //   setName('');
  //   setNumber('');
  // };

  return (
    <Formik>
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <FormField htmlFor="name">
          <LabelWrapper>Name:</LabelWrapper>
          <FieldFormik
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
          <FieldFormik
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
    </Formik>
  );
}

ContactsForm.propType = {
  newContact: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ContactsForm;
