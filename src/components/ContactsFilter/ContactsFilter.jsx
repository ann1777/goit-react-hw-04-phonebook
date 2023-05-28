import React from 'react';
import { Input, FilterWrapper } from './ContactsFilter.styled';
import PropTypes from 'prop-types';

function ContactsFilter ({ onFilter, filter }) {
  const onFilterChange = e => {
    onFilter(e.target.value);
  };

  return (
    <FilterWrapper>
    <Input
      type='text'
      name="search"
      pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      required
      value={filter}
      onChange={onFilterChange}
      placeholder='Find contacts by name'
    />
  </FilterWrapper>
  );
}


ContactsFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default ContactsFilter;
