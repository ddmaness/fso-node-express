import { useState, useEffect } from 'react'
import SearchFilter from './components/search-filter'
import NewContactForm from './components/new-contact-form'
import FormInput from './components/form-input'
import ContactList from './components/contact-list'
import SuccessMessage from './components/success-message'
import { getAll, create, remove } from './services/contacts'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState('')


  useEffect(() => {
    getAll()
      .then((persons) => setPersons(persons))
  }, [])
  

  const uniqueCheck = () => !persons.find(person => person.name === newName)

  const addName = () => {
    const person = {
      name: newName,
      number: newNumber,
    }
    create(person)
      .then(person => {
        setPersons(persons.concat(person))
        clearInputs()
        setSuccessMessage(`Added ${person.name}`)
        setTimeout(() => {
          setSuccessMessage('')
        }, 5000);
      })
  }

  const deleteName = (person) => {
    remove(person)
      .then(response => {
        setPersons(persons.filter(person => person.id !== response.id))
      })
  }

  const clearInputs = () => {
    setNewName('')
    setNewNumber('')
  }

  const handleNameAdd = (event) => {
    event.preventDefault()
    if (uniqueCheck()) {
      addName()
    }
    else {
      alert(`${newName} already added`)
    }
  }

  const handleInput = setterFunction => event => setterFunction(event.target.value)

  return (
    <div>
      <h1>Phonebook</h1>
      <SuccessMessage message={successMessage}></SuccessMessage>
      <SearchFilter label="Filter by Name: " onChange={handleInput(setNameFilter)} value={nameFilter}></SearchFilter>
      <NewContactForm onSubmit={handleNameAdd}>
        <FormInput label="name:" onChange={handleInput(setNewName)} value={newName}></FormInput>
        <FormInput label="number:" onChange={handleInput(setNewNumber)} value={newNumber}></FormInput>
      </NewContactForm>
      <ContactList persons={persons} filter={nameFilter} onClick={deleteName}></ContactList>
    </div>
  )
}

export default App  