const PersonForm=({inputs, handleSubmit}) => {
    let inputList= inputs.map(input => {
        return <span key={input.name}>{input.name}: <input onChange={e=>input.setter(e.target.value)}></input></span>
    })
    return <form>{inputList}
     <button type="submit" onClick={e=>handleSubmit(e)}>add</button>
     </form>
}

export default PersonForm