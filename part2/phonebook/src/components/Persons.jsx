/* eslint-disable react/prop-types */
const Persons = (props) => {
    const { persons, findPerson, OnDelete } = props;

    const filteredPersons = findPerson.trim() !== '' ? 
        persons.filter(person => person.name.toLowerCase().includes(findPerson.toLowerCase())) : 
        persons;

    return (
        <>
            {filteredPersons.map((person, index) => (
                <p key={index}>
                    {person.name} {person.number}
                    <button onClick={() => OnDelete(person.name)}>delete</button>
                </p>
            ))}
        </>
    );
};

export default Persons;
