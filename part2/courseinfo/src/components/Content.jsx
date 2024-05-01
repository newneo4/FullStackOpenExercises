import Part from "./Part"

const Content = ({part}) => {

    console.log(part)

    return (
      <div>
        {
          part.map(part=> <Part key ={part.id} part={part.name} exercises={part.exercises}/>)
        }
      </div>
    )
  }

  export default Content