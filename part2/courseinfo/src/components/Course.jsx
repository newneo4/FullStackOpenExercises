import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
    const { name, parts } = course; 
    const values = parts.map(part => part.exercises);

    return (
        <div>
            <Header course={name} />
            <Content part={parts} />
            <Total sumOfExercises={values.reduce((total, aux) => total + aux, 0)} />
        </div>
    );
};

export default Course;
