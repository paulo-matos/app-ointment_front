import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import SearchBar from './SearchBar'
import AppointmentList from './appointmentList'
import AppointmentModal from './appointmentModal'
import Alert from '../template/alert'

const URL = 'http://localhost:3000/appointment'

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            nameSearch: '',
            id_appointment: '',
            id_patient: '',
            id_doctor: '',
            date_scheduled: '',
            listPatients: [],
            listDoctors: [],
            currentPatient: ''
        }
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMoreInfo = this.handleMoreInfo.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.closeAlert = this.closeAlert.bind(this)

        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.sendAlert = this.sendAlert.bind(this)
        this.handleCreateAppointment = this.handleCreateAppointment.bind(this)

        this.selectDropdownPatient = this.selectDropdownPatient.bind(this)
        this.selectDropdownDoctor = this.selectDropdownDoctor.bind(this)
        this.optionsDropdownPatients = this.optionsDropdownPatients.bind(this)
        this.optionsDropdownDoctors = this.optionsDropdownDoctors.bind(this)

        this.refresh()
    }

    handleClear() {
        this.refresh()
    }

    handleSearch(register) {
        this.refresh(this.state.nameSearch)
    }

    sendAlert(message) {
        var alertBox = document.getElementById('alertBox');
        var alertMsg = document.getElementById('alertMsg');
        alertMsg.innerHTML = message;
        alertBox.style.display = "block";
    }

    handleRemove(register) {
        axios.delete(`${URL}/${register.id_appointment}`)
            .then(resp => {
                // Success
                this.refresh(this.state.nameSearch)
            })
            .catch((error) => {
                // Error
                if (error.response) {
                    var erroResponse = error.response.data.error;
                    if (erroResponse.indexOf("DELETE RESTRICT") >= 0) {
                        this.sendAlert("You can't delete a appointment that has an appointment");
                    }
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            });
    }

    refresh(nameSearch = '') {
        const search = nameSearch ? `${nameSearch}/` : ''
        axios.get(`${URL}/${search}`)
            .then(resp => this.setState({ ...this.state, list: resp.data, nameSearch }))
    }

    handleChange(e) {
        this.setState({ ...this.state, nameSearch: e.target.value })
    }

    handleMoreInfo(register) {
        var modal, title, id_appointment, id_patientHandle, id_doctorHandle, date_scheduled, namePatient, nameDoctor;

        modal = document.getElementById('modalMoreInfo');
        title = document.getElementById('titleModal');
        id_appointment = document.getElementById('idMoreInfo');
        date_scheduled = document.getElementById('date_scheduledMoreInfo');
        namePatient = document.getElementById('patientsDropdown');
        nameDoctor = document.getElementById('doctorsDropdown');


        id_appointment.value = register.id_appointment;
        date_scheduled.value = register.date_scheduled;
        id_patientHandle = register.id_patient;
        id_doctorHandle = register.id_doctor;
        namePatient.value = register.Patient.name;
        nameDoctor.value = register.Doctor.name;


        title.innerHTML = 'Appointment';

        modal.style.display = 'flex';

        this.setState({
            id_appointment: id_appointment.value,
            id_patient: id_patientHandle,
            id_doctor: id_doctorHandle,
            date_scheduled: date_scheduled.value,
            currentPatient: register.Patient.name
        });

        console.log(this.state.currentPatient);


    }

    handleAdd() {
        var modal, title, id_appointment, id_patientHandle, id_doctorHandle, date_scheduled;

        modal = document.getElementById('modalMoreInfo');
        title = document.getElementById('titleModal');
        id_appointment = document.getElementById('idMoreInfo');
        date_scheduled = document.getElementById('date_scheduledMoreInfo');

        id_appointment.value = null;
        id_patientHandle = null;
        id_doctorHandle = null;
        date_scheduled.value = '';

        title.innerHTML = 'Add New Appointment';

        modal.style.display = 'flex';
    }

    handleCreateAppointment(register) {
        var newId_appointment, newId_patient, newId_doctor, newDate_scheduled;

        if (document.getElementById('idMoreInfo').value) {
            newId_appointment = document.getElementById('idMoreInfo').value;
        } else {
            newId_appointment = null;
        }
        newId_patient = this.state.id_patient;
        newId_doctor = this.state.id_doctor;
        newDate_scheduled = document.getElementById('date_scheduledMoreInfo').value;

        this.setState({
            id_appointment: newId_appointment,
            id_patient: newId_patient,
            id_doctor: newId_doctor,
            date_scheduled: newDate_scheduled
        });

        var newAppointment = {
            id_patient: newId_patient,
            id_doctor: newId_doctor,
            date_scheduled: newDate_scheduled
        }

        if (newId_appointment == null) {
            axios.post(URL, { ...newAppointment })
                .then(resp => {
                    // Success
                    this.closeModal()
                    this.refresh()
                }).catch((error) => {
                    // Error
                    console.log(error.response)
                    if (error.response) {
                        var erroResponse = error.response.data.error;
                        if (erroResponse.indexOf("DELETE RESTRICT") >= 0) {
                            this.sendAlert("Appointment could not be deleted");
                        } else if (erroResponse.indexOf("date_scheduled") >= 0) {
                            this.sendAlert('Date Scheduled is not valid. Use YYYY-MM-DD');
                        } else if (erroResponse.indexOf("id_patient") >= 0) {
                            this.sendAlert('Patient required');
                        } else if (erroResponse.indexOf("id_doctor") >= 0) {
                            this.sendAlert('Doctor required');
                        } else {
                            this.sendAlert(erroResponse);
                        }
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                });
        } else {
            axios.put(`${URL}/${newId_appointment}`, { ...newAppointment })
                .then(resp => {
                    // Success
                    this.closeModal()
                    this.refresh()
                }).catch((error) => {
                    // Error
                    console.log(error.response)
                    if (error.response) {
                        var erroResponse = error.response.data.error;
                        if (erroResponse.indexOf("DELETE RESTRICT") >= 0) {
                            this.sendAlert("Appointment could not be deleted");
                        } else if (erroResponse.indexOf("date_scheduled") >= 0) {
                            this.sendAlert('Date Scheduled is not valid. Use YYYY-MM-DD');
                        } else if (erroResponse.indexOf("id_patient") >= 0) {
                            this.sendAlert('Patient required');
                        } else if (erroResponse.indexOf("id_doctor") >= 0) {
                            this.sendAlert('Doctor required');
                        } else {
                            this.sendAlert(erroResponse);
                        }
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                });
        }


    }

    closeModal() {
        var modal = document.getElementById('modalMoreInfo');
        modal.style.display = "none";
        // fechar modal e limpar campos
        var selectedPatient, selectedDoctor;
        selectedPatient = document.getElementById('patientsDropdown');
        selectedDoctor = document.getElementById('doctorsDropdown');
        selectedPatient.value = '';
        selectedDoctor.value = '';
    }

    closeAlert() {
        var alertBox = document.getElementById('alertBox');
        alertBox.style.display = "none";
    }

    selectDropdownPatient(e) {
        this.setState({ id_patient: e.target.value });
    }
    selectDropdownDoctor(e) {
        this.setState({ id_doctor: e.target.value });
    }

    optionsDropdownPatients() {
        axios.get('http://localhost:3000/patient')
            .then(resp => this.setState({ ...this.state, listPatients: resp.data }))
    }

    optionsDropdownDoctors() {
        axios.get('http://localhost:3000/doctor')
            .then(resp => this.setState({ ...this.state, listDoctors: resp.data }))
    }


    render() {
        return (
            <div>
                <PageHeader name='Appointments' icon='calendar-check-o' />
                <SearchBar
                    nameSearch={this.state.nameSearch}
                    handleChange={this.handleChange}
                    handleAdd={this.handleAdd}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear} />
                <AppointmentList
                    list={this.state.list}
                    handleMoreInfo={this.handleMoreInfo}
                    handleRemove={this.handleRemove}
                />
                <AppointmentModal
                    closeModal={this.closeModal}
                    handleCreateAppointment={this.handleCreateAppointment}
                    selectDropdownPatient={this.selectDropdownPatient}
                    selectDropdownDoctor={this.selectDropdownDoctor}
                    optionsDropdownPatients={this.optionsDropdownPatients}
                    optionsDropdownDoctors={this.optionsDropdownDoctors}
                    listPatients={this.state.listPatients}
                    listDoctors={this.state.listDoctors}
                    currentPatient={this.state.currentPatient}
                />
                <Alert
                    sendAlert={this.sendAlert}
                    closeAlert={this.closeAlert}
                />
            </div>
        )
    }
}