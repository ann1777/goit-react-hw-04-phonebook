import React from 'react';
import { SectionWrapper } from './Section.styled';
import PropTypes from 'prop-types';


export const Section = ({ children }) => {
    return (
        <SectionWrapper>
            {children}
        </SectionWrapper>
    );
};

Section.propTypes = {
    children: PropTypes.any.isRequired,
  };