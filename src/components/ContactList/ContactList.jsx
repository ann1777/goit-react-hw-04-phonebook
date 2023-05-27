import React from 'react';
import PropTypes from 'prop-types';
import { List, ContactItem, DeleteButton } from './ContactList.styled';

export const ContactList = ({ contacts, onDelete }) => {

  return (
    <List>
      {contacts.map(({ name, number, id }) => {
        return (
          <ContactItem key={id}>
          <span>{name}:</span>
          <span>{number}</span>
          <DeleteButton type='button' onClick={() => onDelete(id)}>
            Remove
          </DeleteButton>
        </ContactItem>
        );
      })}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ),
  onDelete: PropTypes.func.isRequired,
};