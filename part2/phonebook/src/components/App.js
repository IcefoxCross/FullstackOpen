/* jshint esversion: 9 */
import React, {useState,useEffect} from 'react';
import axios from 'axios';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
    const [persons, setPersons] = useState([]);

    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [searchName, setSearchName] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data);
            });
    },[]);

    const personsToShow = (searchName === '')
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(searchName));

    const addPerson = (event) => {
        event.preventDefault();

        if (!persons.find((person) => person.name === newName)) {
            const personObject = {
                name: newName,
                number: newNumber
            }
            setPersons(persons.concat(personObject));
            setNewName('');
            setNewNumber('');
        }
        else {
            window.alert(`${newName} is already added to phonebook`);
        }
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
            <Filter value={searchName} onChange={handleSearchNameChange} />
            <h3>Add a new</h3>
            <PersonForm addPerson={addPerson} newName={newName} handleNewNameChange={handleNewNameChange}
                newNumber={newNumber} handleNewNumberChange={handleNewNumberChange} />
            <h3>Numbers</h3>
            <Persons personsToShow={personsToShow} />
        </div>
    )
}

export default App