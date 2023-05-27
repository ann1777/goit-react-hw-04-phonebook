import { Component } from 'react';
import { Section } from './Section/Section';
import { Title } from './Title/Title';
import ContactsForm from './ContactsForm/ContactsForm';
import { ContactsFilter } from './ContactsFilter/ContactsFilter';
import { ContactList } from './ContactList/ContactList';
import { GlobalStyle } from './GlobalStyle';
import PropTypes from 'prop-types';
import data from './contacts.json';
import { ThemeProvider } from './ThemeProvider/ThemeProvider';
import { theme } from './theme';

const notifyOptions = {
  position: 'bottom-left',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

export default class App extends Component {
  state = {
    contacts: data,
    filter: '',
  };

  static propTypes = {
    addNewContact: PropTypes.func.isRequired,
  };

  onSubmitForm = e => {
    e.preventDefault();
    this.props.addNewContact(this.state);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

   onAddContact = (newContact) => {
    const { contacts } = this.state;
    contacts.some(
      contact =>
      contact.name.toLowerCase().trim() ===
      newContact.name.toLowerCase().trim() ||
      contact.number.trim() === newContact.number.trim()
    )
     ? ContactList.error(`${newContact.name}: has already present in contacts`, notifyOptions)
    : this.setState(prevState => {
      return {
        contacts: [newContact, ...prevState.contacts],
      };
    });
  };
 
  onDeleteContact = id => {
    this.setState(prevState => {     
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  onInputChange = e => {
    this.setState({ filter: e.target.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().trim().includes(normalizedFilter)
    );
  };

  render () {
    const { contacts, filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <>
        <ThemeProvider theme={theme}>
          <Section>
          <Title title='Phonebook' />
            <ContactsForm addContact={this.onAddContact} newContact={contacts} />
            <Title title='Contacts' />
            <ContactsFilter value={filter} onChange={this.onInputChange} />
          <ContactList
            contacts={visibleContacts}
            onDelete={this.onDeleteContact}
          />
          </Section>
          <GlobalStyle />
        </ThemeProvider>
      </>
    );
  }
}