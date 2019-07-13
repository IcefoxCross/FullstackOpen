/* jshint esversion: 6 */
import React, {useState} from 'react';
import ReactDOM from 'react-dom';

/*const Hello = ({name, age}) => {
    const bornYear = () => new Date().getFullYear() - age;
    
    return (
        <div>
            <p>Hello {name}, you are {age} years old</p>
            <p>So you were probably born in {bornYear()}</p>
        </div>
    )
}

const App = () => {
    const name = 'Peter'
    const age = 10
    return (
        <>
            <h1>Greetings</h1>
            <Hello name="Maya" age={26+10} />
            <Hello name={name} age={age} />
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));*/

const Display = ({counter}) => <div>{counter}</div>

const Button = ({onClick, text}) => (
    <button onClick={onClick}>{text}</button>
)

const App = (props) => {
    const [counter, setCounter] = useState(0);

    const setToValue = (value) => setCounter(value);

    return (
        <div>
            <Display counter={counter} />
            <Button
                onClick={() => setToValue(counter+1)}
                text='plus'
            />
            <Button
                onClick={() => setToValue(counter-1)}
                text='minus'
            />
            <Button
                onClick={() => setToValue(0)}
                text='zero'
            />
        </div>
    );
}

let counter = 1

ReactDOM.render(
    <App counter={counter} />,
    document.getElementById('root'));