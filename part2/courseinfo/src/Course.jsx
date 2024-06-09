const Header = ({course}) => {
    return <h2>{course}</h2>
}

const Total = ({numExercisesList}) => {
    return <p><strong>total of {numExercisesList.reduce(((currSum, i) => currSum + i), 0)} exercises</strong></p>
}

const Part = (props) => {
    return (
        <p>
            {props.part} {props.exercises}
        </p>
    )
}

const Content = ({parts}) => {
    return (
        <div>
            {parts.map(p => <Part key={p.id} part={p.name} exercises={p.exercises}></Part>)}
        </div>
    )
}

const Course = ({courses}) => {
    return (<div>
        {courses.map(course =>
        <div key={course.id}>
            <Header course={course.name}></Header>
            <Content parts={course.parts}></Content>
            <Total numExercisesList={course.parts.map(p => p.exercises)}></Total>
        </div>)}
    </div>)
}

export default Course