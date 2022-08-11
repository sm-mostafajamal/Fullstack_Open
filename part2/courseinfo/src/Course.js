
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

export default Course