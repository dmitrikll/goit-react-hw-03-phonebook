import {
    Component,
    nanoid,
    Report,
    Section,
    ContactForm,
    ContactList,
    Filter,
} from 'utils/allComponents';
import { Message } from './App.styled';

export class App extends Component {
    state = {
        contacts: [],
        filter: '',
    };

    componentDidMount() {
        const contacts = localStorage.getItem('contacts');
        const parsedContacts = JSON.parse(contacts);

        if (parsedContacts) {
            this.setState({ contacts: parsedContacts });
        }
    }

    componentDidUpdate(prevState) {
        const nextContacts = this.state.contacts;
        const prevContacts = prevState.contacts;

        if (nextContacts !== prevContacts) {
            localStorage.setItem('contacts', JSON.stringify(nextContacts));
        }
    }

    addContact = event => {
        event.preventDefault();

        const form = event.target;
        const { name, number } = form.elements;

        const contact = {
            name: name.value,
            number: number.value,
            id: nanoid(),
        };

        if (
            this.state.contacts.find(
                contact =>
                    contact.name.toLowerCase() === name.value.toLowerCase()
            )
        ) {
            Report.info('Contact is present in the list!', ' ', 'Ok');
            form.reset();
            return;
        }

        this.setState(prevState => ({
            contacts: [...prevState.contacts, contact],
        }));
        form.reset();
    };

    deleteContact = id => {
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(contact => contact.id !== id),
        }));
    };

    inputFilter = event => {
        this.setState({ filter: event.currentTarget.value });
    };

    visibleContact = () => {
        const { filter, contacts } = this.state;
        const normalizeFilter = filter.toLowerCase();

        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizeFilter)
        );
    };

    render() {
        const { filter, contacts } = this.state;
        return (
            <>
                <Section title="Phonebook">
                    <ContactForm onSubmit={this.addContact} />
                </Section>
                <Section title="Contacts">
                    {contacts.length > 1 && (
                        <Filter value={filter} onChange={this.inputFilter} />
                    )}
                    {contacts.length > 0 ? (
                        <ContactList
                            contacts={this.visibleContact()}
                            deleteContact={this.deleteContact}
                        />
                    ) : (
                        <Message>Contact list is empty...</Message>
                    )}
                </Section>
            </>
        );
    }
}
