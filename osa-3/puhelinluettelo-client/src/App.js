import { useEffect, useState } from 'react'
import PersonForm from './components/personform'
import Persons from './components/persons'
import Filter from './components/filter'
import personService from './services/persons'
import Notification from './components/notification'

const App = () => {

  const [persons, setPersons] = useState([])
  useEffect(() => {
      personService.getAll()
      .then(response => {
        setPersons(response.data)
      })
    }, [])

  const [filter, setFilter]=useState("")
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage]=useState({message: "", type:null})

  function updateNumber(index, number) {
    let person = persons[index]
    if (window.confirm(
      `${person.name} is already added to the phonebook, replace old number with new one?`)) 
      {
        let newPersons = [...persons]
        newPersons[index].number=newNumber
        personService.updatePerson(newPersons[index])
        .then((res)=> {
          setPersons(newPersons)
          setMessage({"message": `Successfully updated ${person.name}'s number.`, type:"green-notification"})
        })
        .catch(err => {
          return setMessage({"message": `${person.name} has already been removed from the server.`, type:"red-notification"})
        })
      }
  }

  function handleAdd(e) {
    e.preventDefault()
    let index = persons.findIndex(x=>x.name===newName)
    if (index!==-1) {
      return updateNumber(index, newNumber)
    }
    let newPersons=[...persons]
    personService.addPerson({"name": newName, "number": newNumber})
    .then(res => {
      newPersons.push({"name": newName, "number": newNumber, "id": res["data"].id})
    })

    setPersons(newPersons)
    setMessage({message: `Added ${newName}`, type:"green-notification"})
  }

  let inputs = [
    {"name": "name", "setter": setNewName},
    {"name": "number", "setter": setNewNumber}
  ]
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} setMessage={setMessage}></Notification>
      <Filter handler={setFilter}></Filter>
      <PersonForm inputs={inputs} handleSubmit={handleAdd}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} personSetter={setPersons} setNotification={setMessage}></Persons>
    </div>
  )

}

export default App