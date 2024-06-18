import { useState } from 'react'

// Filter component
const Filter = ({newFilter, setNewFilter}) => (
    <div> filter shown with
        <input value={newFilter} onChange={(e) => {setNewFilter(e.target.value)}}></input>
    </div>
)

//  Add new person form
const PersonForm = ({newName, setNewName, newNumber, setNewNumber, handleClick}) => (
    <form>
        <div> name: <input value={newName} onChange={(e) => {setNewName(e.target.value)}}></input></div>
        <div> number: <input value={newNumber} onChange={(e) => {setNewNumber(e.target.value)}}></input></div>
        <div> <button type="submit" onClick={handleClick}>add</button> </div>
    </form>
)

// A single person
const Person = ({name, number}) => (
    <li>{name} {number}</li>
)


// List of persons
const Persons = ({filter, persons}) => {
    const personsToShow = (filter === '') ? persons : persons.filter(p => (p.name.toUpperCase().includes(filter.toUpperCase())))
    return (<div>{personsToShow.map(p => <Person key={p.id} name={p.name} number={p.number}></Person>)}</div>)
}


const App = () => {
    // States
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-1234567', id: 1}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    // Handles 'add' button click
    const handleClick = (e) => {
        e.preventDefault()  // prevent page reload
        let addPerson = true
        persons.forEach(p=> {if (p.name === newName) {alert(`${p.name} is already added to phonebook`); addPerson = false}});  // check for already-existing person
        if (addPerson) {setPersons(persons.concat({name: newName, number: newNumber, id: persons.length+1}))}  // add person if does not already exist
        setNewName(''); setNewNumber('')  // reset fields
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
            <h2>add a new</h2>
            <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} handleClick={handleClick} />
            <h2>Numbers</h2>
            <Persons filter = {newFilter} persons = {persons}></Persons>
        </div>
    )
}

export default App