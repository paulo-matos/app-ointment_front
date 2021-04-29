import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import SearchBar from './SearchBar'
import PatientList from './patientList'
import PatientModal from './patientModal'
import Alert from '../template/alert'

const URL = 'http://localhost:3000/patient'

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = { list: [], id_patient: '', nameSearch: '', name: '', email: '', cpf: '', rg: '', birth_date: '', password: '' }
        this.handleAdd = this.handleAdd.bind(this) //bind to handle otherwise it gets an error
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMoreInfo = this.handleMoreInfo.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.closeAlert = this.closeAlert.bind(this)

        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.sendAlert = this.sendAlert.bind(this)
        this.handleCreatePatient = this.handleCreatePatient.bind(this)

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
        axios.delete(`${URL}/${register.id_patient}`)
            .then(resp => {
                // Success
                this.refresh(this.state.nameSearch)
            })
            .catch((error) => {
                // Error
                if (error.response) {
                    var erroResponse = error.response.data.error;
                    if (erroResponse.indexOf("DELETE RESTRICT") >= 0) {
                        this.sendAlert("You can't delete a patient that has an appointment");
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
        var modal, title, id, name, email, cpf, rg, birth_date, password;

        modal = document.getElementById('modalMoreInfo');
        title = document.getElementById('titleModal');
        id = document.getElementById('idMoreInfo');
        name = document.getElementById('nameMoreInfo');
        email = document.getElementById('emailMoreInfo');
        cpf = document.getElementById('cpfMoreInfo');
        rg = document.getElementById('rgMoreInfo');
        birth_date = document.getElementById('birth_dateMoreInfo');
        password = document.getElementById('passwordMoreInfo');

        id.value = register.id_patient;
        name.value = register.name;
        email.value = register.email;
        cpf.value = register.cpf;
        rg.value = register.rg;
        birth_date.value = register.birth_date;
        password.value = register.password;
        title.innerHTML = 'Details';

        modal.style.display = 'flex';

        this.setState({ name: name.value, email: email.value, cpf: cpf.value, rg: rg.value, birth_date: birth_date.value, password: password.value });

    }

    handleAdd() {
        var modal, title, id, name, email, cpf, rg, birth_date, password;

        modal = document.getElementById('modalMoreInfo');
        title = document.getElementById('titleModal');
        id = document.getElementById('idMoreInfo');
        name = document.getElementById('nameMoreInfo');
        email = document.getElementById('emailMoreInfo');
        cpf = document.getElementById('cpfMoreInfo');
        rg = document.getElementById('rgMoreInfo');
        birth_date = document.getElementById('birth_dateMoreInfo');
        password = document.getElementById('passwordMoreInfo');

        id.value = null;
        name.value = '';
        email.value = '';
        cpf.value = '';
        rg.value = '';
        birth_date.value = '';
        password.value = '';
        title.innerHTML = 'Add New Patient';

        modal.style.display = 'flex';

        // axios.post(URL, { name })
        //     .then(resp => this.refresh())
    }

    handleCreatePatient(register) {
        var newId, newName, newEmail, newCpf, newRg, newBirth_date, newPassword;

        if (document.getElementById('idMoreInfo').value) {
            newId = document.getElementById('idMoreInfo').value;
        } else {
            newId = null;
        }
        newName = document.getElementById('nameMoreInfo').value;
        newEmail = document.getElementById('emailMoreInfo').value;
        newCpf = document.getElementById('cpfMoreInfo').value;
        newRg = document.getElementById('rgMoreInfo').value;
        newBirth_date = document.getElementById('birth_dateMoreInfo').value;
        newPassword = document.getElementById('passwordMoreInfo').value;

        this.setState({
            name: newName,
            email: newEmail,
            cpf: newCpf,
            rg: newRg,
            birth_date: newBirth_date,
            password: newPassword
        });

        var newPatient = {
            name: newName,
            email: newEmail,
            cpf: newCpf,
            rg: newRg,
            birth_date: newBirth_date,
            password: newPassword
        }

        if (newId == null) {
            axios.post(URL, { ...newPatient })
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
                            this.sendAlert("You can't delete a patient that has an appointment");
                        } else if (erroResponse.indexOf("CPF") >= 0) {
                            this.sendAlert('CPF is not valid');
                        } else if (erroResponse.indexOf("RG") >= 0) {
                            this.sendAlert('RG is not valid');
                        } else if (erroResponse.indexOf("Email") >= 0) {
                            this.sendAlert('E-mail is not valid');
                        } else if (erroResponse.indexOf("birth_date") >= 0) {
                            this.sendAlert('Birth Date is not valid. Use YYYY-MM-DD');
                        } else if (erroResponse.indexOf("Password") >= 0) {
                            this.sendAlert('Password required');
                        } else if (erroResponse.indexOf("Name") >= 0) {
                            this.sendAlert('Name required');
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
            axios.put(`${URL}/${newId}`, { ...newPatient })
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
                            this.sendAlert("You can't delete a patient that has an appointment");
                        } else if (erroResponse.indexOf("CPF") >= 0) {
                            this.sendAlert('CPF is not valid');
                        } else if (erroResponse.indexOf("RG") >= 0) {
                            this.sendAlert('RG is not valid');
                        } else if (erroResponse.indexOf("Email") >= 0) {
                            this.sendAlert('E-mail is not valid');
                        } else if (erroResponse.indexOf("birth_date") >= 0) {
                            this.sendAlert('Birth Date is not valid. Use YYYY-MM-DD');
                        } else if (erroResponse.indexOf("Password") >= 0) {
                            this.sendAlert('Password required');
                        } else if (erroResponse.indexOf("Name") >= 0) {
                            this.sendAlert('Name required');
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
    }

    closeAlert() {
        var alertBox = document.getElementById('alertBox');
        alertBox.style.display = "none";
    }



    render() {
        return (
            <div>
                <PageHeader name='Patients' icon='hospital-o' />
                <SearchBar
                    nameSearch={this.state.nameSearch}
                    handleChange={this.handleChange}
                    handleAdd={this.handleAdd}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear} />
                <PatientList
                    list={this.state.list}
                    handleMoreInfo={this.handleMoreInfo}
                    handleRemove={this.handleRemove}
                />
                <PatientModal
                    closeModal={this.closeModal}
                    handleCreatePatient={this.handleCreatePatient}
                />
                <Alert
                    sendAlert={this.sendAlert}
                    closeAlert={this.closeAlert}
                />
            </div>
        )
    }
}