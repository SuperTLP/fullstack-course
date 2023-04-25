const Person = ({person, remove}) => {
    return (
        <p key={person.id}>{person.name} {person.number} 
        <button onClick={()=>remove(person)}>Delete</button>
        </p> 
    )
}
export default Person

