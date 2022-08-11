import {useState} from 'react';

function Header({course}){
  return (
      <h1>{course}</h1> 
  )
}
function Content ({parts}){
  return (
      <div>
          <Part part={parts[0]} />
          <Part part={parts[1]} />
          <Part part={parts[2]} />
      </div>
  )
}

function Part({part}){
  return (
      <div>
          {part.name} {part.exercises}
      </div>
  )
}
// function Total({total}){
//   return(
//       <div>
//          <p>Number of exercises {total}</p>
//       </div>
//   )
// }

const Course = ({course}) => {
  return (
    <div>
      <Header course = {course.name} />
      <Content parts={course.parts} />
      {/* <Total total={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} /> */}
    </div>
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }

  return <Course course={course} />
}

export default App