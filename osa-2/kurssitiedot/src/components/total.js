const Total = (props) => {
    let total = props.parts.reduce((a, b) => a+b.exercises, 0)
    return (
        <p>Number of exercises {total}</p>
    )
}
export default Total