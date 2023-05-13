const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config()

let Person = require("./models/user")

morgan.token("body", req => {
    if (req.method=="POST") {
        return JSON.stringify(req.body)
    }
})

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("build"))
app.use(morgan(":method :url :status :response-time ms :body"))

const errorHandler=(error, request, response, next)=>{
    console.log(error)
    if (error.name==="CastError") {
        return response.status(400).send({"error": "Malformatted id"})
    }
    else if (error.name==="ValidationError") {
        return response.status(400).send({"error": error.message})
    }
    response.status(500).end()
    next(error)
}

app.use(errorHandler)

app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>")
})

app.get("/api/persons", (req, res, next) => {
    Person.find({}).then(data => {
        return res.json(data)
    }).catch(error => next(error))
}, errorHandler)

app.get("/api/persons/:id", (req, res, next) => {
    console.log(req.params.id)
    Person.findById(req.params.id).then(person => {
        return res.json(person)
    }).catch(error => next(error))
}, errorHandler)

app.post("/api/persons", (req, res, next) => {
    let name = req.body.name
    let number = req.body.number
    console.log(req.body)
    if (name == null || number == null) {
        res.status(400)
        return res.json({ error: "ensure you entered both the name and number of the person." })
    }

    Person.find({"name": name}).then(data => {

        console.log(data, data.length)

        if (data.filter(item => item.name==name).length!=0) {
            res.status(400)
            return res.json({ error: "name must be unique" })
        }

        let person = Person({"name": name, "number": number})
        person.save().then(savedPerson => {
            return res.status(200).json(savedPerson)

        }).catch(error => next(error))
    }).catch(error => next(error))
}, errorHandler)


app.delete("/api/persons/:id", (req, res, next) => {
    console.log(req.params.id)
    Person.findByIdAndRemove(req.params.id).then(personObject => {
        console.log(personObject)
        return res.status(200).end()
    }).catch(error => next(error))
}, errorHandler)

app.put("/api/persons/:id", (req, res, next) => {
    let new_person = {
        "name": req.body.name,
        "number": req.body.number
    }
    Person.findByIdAndUpdate(req.params.id, new_person, {new: true, runValidators: true})
        .then(updatedPerson => {
            return res.json(updatedPerson)
        })
        .catch(error => next(error))
}, errorHandler)

app.get("/info", (req, res, next) => {
    let date = new Date()
    Person.find({}).then(data => {
        res.send(`<p>Phonebook has info for ${data.length} people</p> 
    <h3>${date}</h3>`)
    }).catch(error => next(error))
}, errorHandler)

let PORT=8080

app.listen(PORT, () => {
    console.log("server started")
})
