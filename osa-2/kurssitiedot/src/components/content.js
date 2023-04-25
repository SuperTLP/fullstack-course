import Part from "./part"

const Content = ({parts}) => {
    return (
        <div>
            {parts.map(part => <Part key={part.name} part={part}></Part>)}
      </div>
    )
}

export default Content

