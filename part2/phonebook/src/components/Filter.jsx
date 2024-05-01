/* eslint-disable react/prop-types */
const Filter = (props) => {
    const { value, onChange } = props;

    const handleFind = (event) => {
        onChange(event.target.value);
    };

    return (
        <input type='text' value={value} onChange={handleFind} />
    );
};

export default Filter;
