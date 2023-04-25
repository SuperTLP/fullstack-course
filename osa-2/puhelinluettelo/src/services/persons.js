import axios from 'axios'
let baseUrl="http://localhost:3001/persons"

function addPerson(person) {
    return axios.post("http://localhost:3001/persons", person)
}
function getAll() {
    return axios.get("http://localhost:3001/persons")
}
function remove(id) {
    return axios.delete(baseUrl+"/"+id)
}
function updatePerson(person) {
    return axios.put(baseUrl+"/"+person.id, person)
}

export default {
    addPerson, getAll, remove, updatePerson
}