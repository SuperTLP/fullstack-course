import Person from "./person"
import personService from '../services/persons'

const Persons = ({persons, filter, personSetter, setNotification}) => {
    function removePerson(person) {
        if (window.confirm("Delete " + person.name + " ?")) {
            let newPersons = persons.filter(function(p) {return p.id!==person.id})
            personService.remove(person.id)
            .then((res)=> {
                personSetter(newPersons)
                setNotification({"message": `Successfully removed ${person.name}.`, type:"green-notification"})
            })
        }
    }
    return persons.map(person => {
        if (person.name.toLowerCase().includes(filter)) {
            return <Person key={person.name} person={person} remove={removePerson}></Person>
        }
        return ""
    })
}

export default Persons