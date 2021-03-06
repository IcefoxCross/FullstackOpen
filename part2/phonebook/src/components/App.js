/* jshint esversion: 9 */
import React, {useState,useEffect} from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import personService from '../services/persons';
import Notification from './Notification';

const App = () => {
    const [persons, setPersons] = useState([]);

    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [searchName, setSearchName] = useState('');
    const [notifMessage, setNotifMessage] = useState('');
    const [notifType, setNotifType] = useState('');

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons);
            });
    }, []);

    const personsToShow = (searchName === '')
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(searchName));

    const addPerson = (event) => {
        event.preventDefault();
        const personObject = {
            name: newName,
            number: newNumber
        }

        if (!persons.find((person) => person.name === newName)) {
            personService
                .create(personObject)
                .then(returnedPerson => {
                    setNotifMessage(`Added ${returnedPerson.name}`);
                    setNotifType('success');
                    setTimeout(() => {
                        setNotifMessage(null);
                    }, 5000);
                    setPersons(persons.concat(returnedPerson));
                    setNewName('');
                    setNewNumber('');
                });
        }
        else {
            updatePerson(persons.find((person) => person.name === newName).id, personObject.number);
        }
    }

    const updatePerson = (id, number) => {
        const person = persons.find(n => n.id === id)
        const changedPerson = {...person, number: number}

        if (window.confirm(`${changedPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
            const id = changedPerson.id;
            personService
                .update(id, changedPerson)
                .then(returnedPerson => {
                    setNotifMessage(`Updated ${returnedPerson.name}`);
                    setNotifType('success');
                    setTimeout(() => {
                        setNotifMessage(null);
                    }, 5000);
                    setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
                })
                .catch(error => {
                    setNotifMessage(`Information of '${person.name}' has already been removed from server`);
                    setNotifType('error');
                    setTimeout(() => {
                        setNotifMessage(null);
                    }, 5000);
                    setPersons(persons.filter(p => p.id !== person.id))
                })
        };
    }

    const deletePerson = name => {
        const person = persons.find((person) => person.name === name);
        if (window.confirm(`Delete ${name}?`)) {
            personService
                .erase(person.id)
                .then(result => {
                    setPersons(persons.filter(p => p.id !== person.id))
                });
        };
    }

    const handleNewNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handleNewNumberChange = (event) => {
        setNewNumber(event.target.value);
    }

    const handleSearchNameChange = (event) => {
        setSearchName(event.target.value);
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notifMessage} type={notifType} />
            <Filter value={searchName} onChange={handleSearchNameChange} />
            <h3>Add a new</h3>
            <PersonForm addPerson={addPerson} newName={newName} handleNewNameChange={handleNewNameChange}
                newNumber={newNumber} handleNewNumberChange={handleNewNumberChange} />
            <h3>Numbers</h3>
            <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
        </div>
    )
}

export default App