/* jshint esversion: 9 */
import React from 'react';

const Header = ({courseName}) => {
    return (
        <h2>{courseName}</h2>
    )
}

const Content = ({parts}) => {
    return (
        <>
            {parts.map((part,i) => <Part key={i} part={part} />)}
        </>
    )
}

const Part = ({part}) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Total = ({parts}) => {

    const total = parts.reduce((acc,curr) => acc + curr.exercises, 0)

    return (
        <div>
            <b>total of {total} exercises</b>
        </div>
    )
}

const Course = ({course}) => {

    return (
        <div>
            <Header courseName={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course