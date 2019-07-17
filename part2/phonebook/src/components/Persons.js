/* jshint esversion: 9 */
import React from 'react';
import Person from './Person';

const Persons = ({personsToShow}) => {
    return (
        <div>
            {personsToShow.map(person => <Person key={person.name} person={person}/>)}
        </div>
    )
}

export default Persons