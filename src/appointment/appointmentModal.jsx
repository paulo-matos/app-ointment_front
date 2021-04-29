import React from 'react'
import IconButton from '../template/iconButton'

import axios from 'axios';

export default props => {

    const renderPatientsDropdown = () => {
        const list = props.listPatients || [] //inserts list in the variable otherwise sets as an empty array
        return list.map(register => (
            <option
                key={register.id_patient}
                value={register.id_patient}
            >
                {register.name}
            </option>
        ))
    }

    const renderDoctorsDropdown = () => {
        //console.log(props.listDoctors);
        const list = props.listDoctors || [] //inserts list in the variable otherwise sets as an empty array
        return list.map(register => (
            <option
                key={register.id_doctor}
                value={register.id_doctor}
            >
                {register.expertise} | {register.name} 
            </option>
        ))
    }


    return (
        <div className='modalMoreInfo' id='modalMoreInfo'>
            <header>
                <h3 id='titleModal'>Details</h3>
                <div className='closeModal'>
                    <IconButton style='outline-light' icon='times-circle' onClick={() => props.closeModal()} />
                </div>
            </header>
            <main>
                <table className='table' key={props.id_appointment} role='form'>
                    <tbody>
                        <tr>
                            <td>
                                <p>Id:</p>
                            </td>
                            <td>
                                <input type='text' value={props.id_appointment} disabled id='idMoreInfo' />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Patient:</p>
                            </td>
                            <td>
                                {/* <input type='text' value={props.patientName} id='patientNameMoreInfo' /> */}
                                <select
                                    name='patientsDropdown'
                                    id='patientsDropdown'
                                    onClick={() => props.optionsDropdownPatients()}
                                    onChange={props.selectDropdownPatient}
                                >
                                    <option value={null}>Select Patient</option>
                                    {renderPatientsDropdown(props.listPatients)}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Doctor</p>
                            </td>
                            <td>
                                {/* <input type='text' value={props.doctorName} id='doctorNameMoreInfo' /> */}
                                <select
                                    name='doctorsDropdown'
                                    id='doctorsDropdown'
                                    onClick={() => props.optionsDropdownDoctors()}
                                    onChange={props.selectDropdownDoctor}
                                >
                                    <option value={null}>Select Doctor</option>
                                    {renderDoctorsDropdown(props.listDoctors)}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Date</p>
                            </td>
                            <td>
                                <input type='text' value={props.date_scheduled} id='date_scheduledMoreInfo' />
                            </td>
                        </tr>
                    </tbody>
                </table>

            </main>
            <footer>
                <IconButton style='info' icon='floppy-o' title='Save' onClick={props.handleCreateAppointment} />
            </footer>
        </div>
    )
}