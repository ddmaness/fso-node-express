const express = require('express')
const app = express()
const port = 3003

app.use(express.json())

let contacts = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (request, response) => {
  console.log('server responding')
})

app.get('/api/persons', (request, response) => {
  response.json(contacts)
})

app.get('/info', (request, response) => {
  const info = `
  <p>Phonebook has info for ${contacts.length} ${contacts.length === 1 ? 'person' : 'people'}</p>
  <p>${new Date(Date.now()).toUTCString()}</p> 
  `
  response.send(info)
})

app.get('/api/persons/:id', (request, response) => {
  const person = contacts.find(contact => contact.id === Number(request.params.id))

  person ? response.send(person) : response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
  contacts = contacts.filter(contact => contact.id !== Number(request.params.id))

  response.send(contacts)
})

app.post('/api/persons', (request, response) => {
  const person = request.body

  if (!person.name) {
    return response.status(400).json({
      error: 'no name provided'
    })
  }
  if (!person.number) {
    return response.status(400).json({
      error: 'no number provided'
    })
  }
  if (contacts.some(contact => contact.name === person.name)) {
    return response.status(400).json({
      error: 'provided name already exists in contacts'
    })
  }

  person.id = Math.floor(Math.random() * 1000)

  contacts = [...contacts, person]

  response.send(contacts)
})



app.listen(port, () => {
  console.log(`listening on port ${port}`)
})