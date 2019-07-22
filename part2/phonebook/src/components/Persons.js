/* jshint esversion: 9 */
import React from 'react';
import Person from './Person';

const Persons = ({personsToShow,deletePerson}) => {
    return (
        <div>
            {personsToShow.map(person => <Person key={person.name} person={person} deletePerson={() => deletePerson(person.name)} />)}
        </div>
    )
}

export default Persons