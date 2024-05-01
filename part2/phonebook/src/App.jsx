/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import phones from './services/phones'
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [findPerson, setFindPerson] = useState('');
  const [notification, setNotification] = useState(null);
  const [color, setColor] = useState('');

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);

  function handleSubmit(e) {
		e.preventDefault();
		if (!persons.some((person) => person.name === newName)) {
			phones
				.create({
					name: newName,
					number: newNumber,
          id : (persons.length+1).toString()
				})
				.then((response) => {
					setPersons([...persons, response]);
          setNotification(`Added ${newName}`)
          setColor('green')
				})
				.catch((err) => {
					setNotification(`Error adding ${newName}. ${err}`);
          setColor('red')
				});
        setTimeout(() => {
          setNotification(null)
        }, 5000)

			setNewName("");
			setNewNumber("");
    }
    else{
      if (window.confirm(`${newName} is already added, do you want to replace the old number with a new one?`)){
        const personUp = persons.find((person) => person.name == newName)
        const change = {...personUp, number:newNumber}

        phones.updatePerson(personUp.id, change)
        .then((response) =>{
          setPersons((prevState) => {
            return prevState.map((person) =>
              person.id !== personUp.id ? person : response
            );
          });
          setNotification(`Update the number of ${newName}`)
          setColor('green')
        })
        .catch((error) =>{
          setNotification(`Information of ${newName} has already been removed from the server`)
          setColor('red')
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
    }
  }

  const handleDelete = (name)=>{
    if(window.confirm(`Delete ${name}`)){
      const personDel = persons.find(person => person.name == name)

      phones.deletePerson(personDel.id, personDel)
      .then(response =>{
        setPersons((prevState) => {
          return prevState.filter((person) => person.id !== personDel.id);
        });
        setNotification(`Sucessfull deleting ${personDel.name} from the server`)
        setColor('green')
      })
      .catch((error) =>{
        setNotification(`Failure deleting ${personDel.name} from the server`)
        setColor('red')
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }


  useEffect(() => {
    phones.getAll()
      .then(newPersons => {
        setPersons(newPersons);
      });
  }, []);

  console.log(color)
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} messageColor={color} />
      <Filter value={findPerson} onChange={setFindPerson} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} findPerson={findPerson} OnDelete={handleDelete}/>
    </div>
  );
};

export default App;
