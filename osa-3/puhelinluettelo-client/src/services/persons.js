import axios from 'axios'
let baseUrl="https://puhelinluettelo-server.fly.dev/api/persons"

function addPerson(person) {
    return axios.post(baseUrl, person)
}
function getAll() {
    return axios.get(baseUrl)
}
function remove(id) {
    return axios.delete(baseUrl+"/"+id)
}
function updatePerson(person) {
    console.log(person)
    return axios.put(baseUrl+"/"+person.id, person)
}

export default {
    addPerson, getAll, remove, updatePerson
}