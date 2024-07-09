import {useEffect, useState} from 'react'
import phoneService from "./services/phoneService.js";

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
const Person = ({name, number, onDelete}) => (
    <div style = {{display: 'flex', flexDirection: 'row'}}>
        <div>{name} {number}</div>
        <div style={{width:"30px"}}> </div>
        <button onClick={onDelete}>delete</button>
    </div>
)


const App = () => {
    // States
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    // Effects, get 'persons' from server
    useEffect(() => {
        phoneService.getAll().then(data => {
            setPersons(data)
        })
    }, []);


    // List of persons
    const Persons = () => {
        const personsToShow = (newFilter === '') ? persons : persons.filter(p => (p.name.toUpperCase().includes(newFilter.toUpperCase())))
        return (<div>{personsToShow.map(p => <Person key={p.id} name={p.name} number={p.number} onDelete={() => {
            if (window.confirm("Do you really want to delete?")) {
                phoneService.deletePerson(p.id).then(data => setPersons(persons.filter(p => p.id !== data.id)))
            }
        }}
        ></Person>)}</div>)
    }


    // Handles 'add' button click
    const handleAdd = (e) => {
        e.preventDefault()  // prevent page reload
        let personExists = -1  // -1 if doesn't exist, else ID of the duplicate person

        persons.forEach(p => {if (p.name === newName) {personExists = p.id}});  // check for already-existing person

        if (personExists === -1) {  // add person if does not already exist
            const newPerson = {name: newName, number: newNumber, id: (persons.length+1).toString()}
            phoneService.createPerson(newPerson).then(data => {
                setPersons(persons.concat(data))
            })
        } else {  // if exists, update upon user confirmation
            if (window.confirm(`"${newName}" is already added to the phonebook, replace the old number with the new one?`)) {
                const newPerson = {name: newName, number: newNumber, id: personExists}
                phoneService.updatePerson(personExists, newPerson).then(data => {
                    setPersons(persons.map(p => {if (p.id === data.id) {return data} else {return p}}))
                })
            }
        }

        setNewName(''); setNewNumber('')  // reset fields
    }


    return (
        <div>
            <h1>Phonebook</h1>
            <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
            <h2>Add New Entry</h2>
            <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} handleClick={handleAdd} />
            <h2>Numbers</h2>
            <Persons />
        </div>
    )
}

export default App