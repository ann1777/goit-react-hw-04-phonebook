import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { nanoid } from 'nanoid';

import {
  Form,
  FormField,
  FieldFormik,
  StyledButton,
  LabelWrapper,
  ErrorMessage,
} from './ContactsForm.styled';

const INITIAL_STATE = {
  name: '',
  number: '',
};

class ContactsForm extends Component {
  state = INITIAL_STATE;

  onFormSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;
    this.props.addContact({ id: nanoid(), name: name, number: number });
    this.setState(INITIAL_STATE);
  };

  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
    console.log(name);
    console.log(value);
  };

   formatNumber = ({ target: { name, value, type } }) => {
    this.setState({ [name]: value });
    const formattedValue = value.replace(/(\d{3})(\d{2})(\d{2})/, '$1-$2-$3');
    this.setState({ [name]: formattedValue, [type]: 'phone' });
    return formattedValue;
  }; 

  render () {
    const { name, number } = this.state;

    return (
      <Formik>
        <Form htmlFor='name' onSubmit={this.onFormSubmit}>
          <FormField htmlFor='name'>
            <LabelWrapper>Name:</LabelWrapper>
            <FieldFormik
              type='text'
              name='name'
              placeholder='name'
              onChange={this.onInputChange}
              value={name}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
            <ErrorMessage name='name' component='span' />
          </FormField>
          <FormField htmlFor='number'>
            <LabelWrapper>Number:</LabelWrapper>
            <FieldFormik
              type='tel'
              name='number'
              placeholder='tel number'
              onChange={this.formatNumber}
              value={number}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title='Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
              required
            />
            <ErrorMessage name='number' component='span' />
          </FormField>
          <StyledButton type='submit'>AddContact</StyledButton>
        </Form>
      </Formik>
    );
  }
}

ContactsForm.propType = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  handleForm: PropTypes.func.isRequired,
};

export default ContactsForm;