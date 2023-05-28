import React from 'react';
import PropTypes from 'prop-types';
import { List, ContactItem, DeleteButton } from './ContactList.styled';

function ContactList ({  onFilter, onDelete }) {
  const filteredContacts = onFilter();

  return (
    <List>
      {filteredContacts.map(({ name, number, id }) => {
        return (
          <ContactItem key={id}>
          <span>{name}:</span>
          <span>{number}</span>
          <DeleteButton 
          type='button' 
          onClick={() => onDelete(id)}>
            Remove
          </DeleteButton>
        </ContactItem>
        );
      })}
    </List>
  );
};

ContactList.propTypes = {
  onFilter: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactList;