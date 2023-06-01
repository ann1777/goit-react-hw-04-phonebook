import { useState, useEffect } from 'react';
import { Section } from './Section/Section';
import { Title } from './Title/Title';
import ContactsForm from './ContactsForm/ContactsForm';
import ContactsFilter from './ContactsFilter/ContactsFilter';
import ContactList from './ContactList/ContactList';
import { GlobalStyle } from './GlobalStyle';
import { nanoid } from 'nanoid';
import { ThemeProvider } from './ThemeProvider/ThemeProvider';
import { theme } from './theme';

function App() {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onSubmitForm = (submitName, submitNumber) => {
    // if (filter) {
    //   contacts.some(
    //     contact =>
    //       contact.name.toLowerCase().trim() ===
    //         submitName.toLowerCase().trim() ||
    //       contact.number.trim() === submitNumber.trim()
    //   );
    //   return alert(`${submitName} is already in contacts.`);
    // }
    setContacts(prevState => [
      ...prevState,
      {
        id: nanoid(),
        name: submitName,
        number: submitNumber,
      },
    ]);
  };

  const onFilteredContacts = () => {
    if (filter) {
      return contacts.filter(contact => {
        return contact.name.toLowerCase().includes(filter.toLowerCase());
      });
    }
    return contacts;
  };

  const onDeleteContact = removedId => {
    setContacts(state => state.filter(contact => contact.id !== removedId));
  };

  const getFilterText = filterText => {
    setFilter(filterText);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Section>
          <Title title="Phonebook" />
          <ContactsForm onSubmit={onSubmitForm} />
          <Title title="Contacts" />
          <ContactsFilter filter={filter} onFilter={getFilterText} />
          <ContactList
            onDelete={onDeleteContact}
            onFilter={onFilteredContacts}
          />
        </Section>
        <GlobalStyle />
      </ThemeProvider>
    </>
  );
}
export default App;
