import React from 'react'
import IconButton from '../template/iconButton'

export default props => {

    const renderRows = () => {
        const list = props.list || [] //inserts list in the variable otherwise sets as an empty array
        return list.map(register => (
            <tr key={register.id_appointment}>
                <td>{register.Patient.name}</td>
                <td>{register.Doctor.expertise}</td>
                <td>{register.date_scheduled}</td>
                <td className='tableInfoCell'>
                    <IconButton style='info' icon='info' onClick={() => props.handleMoreInfo(register)} />
                </td>
                <td>
                    <IconButton style='danger' icon='trash' onClick={() => props.handleRemove(register)} />
                </td>
            </tr>
        ))
    }
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Patient</th>
                    <th>Expertise</th>
                    <th>Date</th>
                    <th className='tableMoreInfo'>Details</th>
                    <th className='tableMoreInfo'>Delete</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}