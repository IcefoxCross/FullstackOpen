/* jshint esversion: 9 */
import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({onClick, text}) => (
    <button onClick={onClick}>{text}</button>
)

const Statistic = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({good, neutral, bad}) => {
    const total = good + neutral + bad;

    if (total === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }

    return (
        <div>
            <table>
                <Statistic text='good' value={good} />
                <Statistic text='neutral' value={neutral}/>
                <Statistic text='bad' value={bad}/>
                <Statistic text='all' value={total}/>
                <Statistic text='average' value={(good - bad) / total}/>
                <Statistic text='positive' value={[(good / total * 100), '%'].join(' ')}/>
            </table>
        </div>
    )
}

const App = () => {
    // Save clicks of each button to own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleGoodClick = () => setGood(good+1)
    const handleNeutralClick = () => setNeutral(neutral+1)
    const handleBadClick = () => setBad(bad+1)

    return (
        <div>
            <h1>give feedback</h1>
            <div>
                <Button onClick={handleGoodClick} text='good' />
                <Button onClick={handleNeutralClick} text='neutral' />
                <Button onClick={handleBadClick} text='bad' />
            </div>
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
};

ReactDOM.render(<App />, document.getElementById('root'));