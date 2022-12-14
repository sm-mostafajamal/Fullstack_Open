import {useState} from 'react';

const App = () => {
  const [counter, setCounter] = useState(6)
  console.log(setCounter)
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course = {course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

function Header(props){
  return (
      <div>{props.course}</div> 
  )
}
function Content (props){
  return (
      <div>
  
          <Part part1={props.parts[0].name} exercises1={props.parts[0].exercises} />
          <Part part2={props.parts[1].name} exercises2={props.parts[1].exercises} />
          <Part part3={props.parts[2].name} exercises3={props.parts[2].exercises} />
      </div>
  )
}
function Part(props){
  return (
      <div>
          {props.part1} {props.exercises1}
          {props.part2} {props.exercises2}
          {props.part3} {props.exercises3}
      </div>
  )
}
function Total(props){
  return(
      <div>
         <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
      </div>
  )
} 



export default App