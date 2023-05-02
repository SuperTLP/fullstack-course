const express = require("express")
const morgan = require("morgan")
const cors = require("cors")


morgan.token('body', req => {
    if (req.method=="POST") {
        return JSON.stringify(req.body)
    }
})


const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan(":method :url :status :response-time ms :body"))


let data=[
    {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
    },

    {name: "Ada Lovelace",
    number: "39-44-5323523",
     id: 2
    },

    {name: "Dan Abramov",
    number: "12-43-234345", 
    id: 3
    },
    {name: "Mary Poppendick",
    number:"39-23-6 423122",
    id:4
    }
]

app.get("/", (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get("/api/persons", (req, res) => {
    return res.json(data)
})

app.get("/api/persons/:id", (req, res) => {
    person = data.filter(person=>person.id==req.params.id)
    if (person.length==0){
        return res.status(404).end()
    }
    return res.json(person)

})

app.post("/api/persons", (req, res) => {
    let name = req.body.name
    let number = req.body.number
    console.log(req.body)
    if (name == null || number == null) {
        res.status(400)
        return res.json({ error: 'ensure you entered both the name and number of the person.' })
    }
    if (data.filter(item => item.name==name).length!=0) {
        res.status(400)
        return res.json({ error: 'name must be unique' })
    }
    let new_id = Math.floor(Math.random()*10**10)
    data.push({"name": name, "number": number, "id": new_id})
    return res.status(200).json({"id": new_id})
})

app.delete("/api/persons/:id", (req, res) => {
    data = data.filter(x=>x.id!=req.params.id)
    return res.status(200).end()
})



app.get("/info", (req, res) => {
    date = new Date()
    res.send(`<p>Phonebook has info for ${data.length} people</p> 
    <h3>${date}</h3>`)
})

let PORT=8080

app.listen(PORT, () => {
    console.log("server started")
})
