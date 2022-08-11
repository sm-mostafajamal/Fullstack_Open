import {useState} from 'react';

const Header = ({course}) => <h3>{course}</h3>

const Content = ({parts}) => <div>{parts.map(el =>  <Part key={el.id} part={el} /> )}</div>

const Part = ({part}) => <div> {part.name} {part.exercises}</div>
 
const Total = ({total}) =><strong><p>total of {total} exercises</p></strong>

const Course = ({courses}) => {
  return  (<div>
            <h1>Web development curriculum</h1>
            {courses.map((course) => (
                <div key={course.id}>
                  <Header  course = {course.name} />
                  <Content  parts={course.parts} />
                  <Total  total={course.parts.reduce((prev, curr) => prev + curr.exercises ,0)} />
                </div>
            ))}

        </div>)
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course courses={courses} />
}

export default App