import React from 'react';
import { Input, FilterWrapper } from './ContactsFilter.styled';
import PropTypes from 'prop-types';

export const ContactsFilter = ({ value, onChange }) => (
  <FilterWrapper>
    <Input
      type='text'
      value={value}
      onChange={onChange}
      placeholder='Find contacts by name'
    />
  </FilterWrapper>
);

ContactsFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
