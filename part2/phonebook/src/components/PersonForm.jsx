/* eslint-disable react/prop-types */
const PersonForm = (props) => {
  const { newName, newNumber, onNameChange, onNumberChange, onSubmit } = props;

  return (
      <form onSubmit={onSubmit}>
          <div>
              name: <input value={newName} onChange={onNameChange} />
          </div>
          <div>
              number: <input value={newNumber} onChange={onNumberChange} pattern='^\d+-\d+-\d+$' />
          </div>
          <div>
              <button type="submit">add</button>
          </div>
      </form>
  );
};

export default PersonForm;
