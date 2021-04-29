import React from 'react'

export default props => (
        <ul className='ulHeader'>
            <a className='appNameHeader' href='#'>
                <i className='fa fa-calendar-check-o'></i> App-Ointment</a>
            <li><a href='#/appointments'>Appointments</a></li>
            <li><a href='#/patients'>Patients</a></li>
            <li><a href='#/doctors'>Doctors</a></li>
            <li><a href='#/about'>About</a></li>
        </ul>
)