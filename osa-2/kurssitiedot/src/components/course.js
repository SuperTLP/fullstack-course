import Title from "./title"
import Content from "./content"
import Total from "./total"

const Course = ({course}) => {
    return (<div>
        <Title course={course.name}></Title>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>)
}
export default Course