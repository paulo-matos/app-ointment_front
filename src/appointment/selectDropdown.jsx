import React from 'react'


export default props => {
    console.log('chegou dentro do select pelo menos');

    const renderOptions = () => {
        const list = props.listPatients || [] //inserts list in the variable otherwise sets as an empty array
        return list.map(register => (
            <option value={register.name}>
                {register.name}
            </option>
        ))
    }
    return (
        <select name='patientsDropdown' id='patientsDropdown'>
            <label for="patientsDropdown">Choose a Patient:</label>
            {renderOptions()}
        </select>
    )

}