/* jshint esversion: 9 */
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const morgan = require('morgan');
const customTiny = (tokens, request, response) => {
    console.log('----------')
    console.log('Method: ',tokens.method(request, response))
    console.log('URL: ',tokens.url(request, response))
    console.log('Status: ',tokens.status(request, response))
    console.log('Content Length: ',tokens.res(request, response, 'content-length'))
    console.log('Response Time: ',tokens['response-time'](request, response),' ms')
    if (tokens.method(request, response) === 'POST') {
        console.log('---')
        console.log('Person Name: ',request.body.name);
        console.log('Person Number: ',request.body.number);
    }
}
app.use(morgan(customTiny));

let persons = [
    {
        "name": "Arto Hellas",
        "number": "555-999",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
    {
        "name": "Mark",
        "number": "333-456",
        "id": 5
    }
];

const generateId = () => {
    return Math.floor(Math.random() * Math.floor(52000));
}

app.get('/api/persons', (request,response) => {
    response.json(persons);
});

app.get('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.delete('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);

    response.status(204).end();
});

app.post('/api/persons', (request,response) => {
    const body = request.body;
    const personFound = persons.find(person => person.name === body.name);
    console.log(personFound);

    if (!body.name && !body.number) {
        return response.status(400).json({
            error: 'content missing'
        });
    }

    if (personFound) {
        return response.status(400).json({
            error: 'name must be unique'
        });
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person);

    response.json(person);
});

app.get('/info', (request,response) => {
    const number = persons.length;
    response.send(`<p>Phonebook has info for ${number} people</p><p>${new Date}</p>`);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});