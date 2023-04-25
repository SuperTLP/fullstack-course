const Filter = ({handler}) => {
    return <p>filter shown with <input onChange={(e)=>handler(e.target.value.toLowerCase())}></input></p>
}
export default Filter
