import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import SearchBar from './SearchBar'
import DoctorList from './doctorList'
import DoctorModal from './doctorModal'
import Alert from '../template/alert'

const URL = 'http://localhost:3000/doctor'

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = { list: [], id_doctor: '', nameSearch: '', name: '', expertise: '', cpf: '', rg: '', birth_date: '', password: '' }
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMoreInfo = this.handleMoreInfo.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.closeAlert = this.closeAlert.bind(this)

        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.sendAlert = this.sendAlert.bind(this)
        this.handleCreateDoctor = this.handleCreateDoctor.bind(this)

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
        axios.delete(`${URL}/${register.id_doctor}`)
            .then(resp => {
                // Success
                this.refresh(this.state.nameSearch)
            })
            .catch((error) => {
                // Error
                if (error.response) {
                    var erroResponse = error.response.data.error;
                    if (erroResponse.indexOf("DELETE RESTRICT") >= 0) {
                        this.sendAlert("You can't delete a doctor that has an appointment");
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
        var modal, title, id, name, expertise, cpf, rg, birth_date, password;

        modal = document.getElementById('modalMoreInfo');
        title = document.getElementById('titleModal');
        id = document.getElementById('idMoreInfo');
        name = document.getElementById('nameMoreInfo');
        expertise = document.getElementById('expertiseMoreInfo');
        cpf = document.getElementById('cpfMoreInfo');
        rg = document.getElementById('rgMoreInfo');
        birth_date = document.getElementById('birth_dateMoreInfo');
        password = document.getElementById('passwordMoreInfo');

        id.value = register.id_doctor;
        name.value = register.name;
        expertise.value = register.expertise;
        cpf.value = register.cpf;
        rg.value = register.rg;
        birth_date.value = register.birth_date;
        password.value = register.password;
        title.innerHTML = 'Details';

        modal.style.display = 'flex';

        this.setState({ name: name.value, expertise: expertise.value, cpf: cpf.value, rg: rg.value, birth_date: birth_date.value, password: password.value });

    }

    handleAdd() {
        var modal, title, id, name, expertise, cpf, rg, birth_date, password;

        modal = document.getElementById('modalMoreInfo');
        title = document.getElementById('titleModal');
        id = document.getElementById('idMoreInfo');
        name = document.getElementById('nameMoreInfo');
        expertise = document.getElementById('expertiseMoreInfo');
        cpf = document.getElementById('cpfMoreInfo');
        rg = document.getElementById('rgMoreInfo');
        birth_date = document.getElementById('birth_dateMoreInfo');
        password = document.getElementById('passwordMoreInfo');

        id.value = null;
        name.value = '';
        expertise.value = '';
        cpf.value = '';
        rg.value = '';
        birth_date.value = '';
        password.value = '';
        title.innerHTML = 'Add New Doctor';

        modal.style.display = 'flex';

        // axios.post(URL, { name })
        //     .then(resp => this.refresh())
    }

    handleCreateDoctor(register) {
        var newId, newName, newExpertise, newCpf, newRg, newBirth_date, newPassword;

        if (document.getElementById('idMoreInfo').value) {
            newId = document.getElementById('idMoreInfo').value;
        } else {
            newId = null;
        }
        newName = document.getElementById('nameMoreInfo').value;
        newExpertise = document.getElementById('expertiseMoreInfo').value;
        newCpf = document.getElementById('cpfMoreInfo').value;
        newRg = document.getElementById('rgMoreInfo').value;
        newBirth_date = document.getElementById('birth_dateMoreInfo').value;
        newPassword = document.getElementById('passwordMoreInfo').value;


        // this.setState({ name: name.value, expertise: expertise.value, cpf: cpf.value, rg: rg.value, birth_date: birth_date.value, password: password.value });

        this.setState({
            name: newName,
            expertise: newExpertise,
            cpf: newCpf,
            rg: newRg,
            birth_date: newBirth_date,
            password: newPassword
        });

        var newDoctor = {
            name: newName,
            expertise: newExpertise,
            cpf: newCpf,
            rg: newRg,
            birth_date: newBirth_date,
            password: newPassword
        }

        if (newId == null) {
            if (newDoctor.expertise == ''){
                newDoctor.expertise = 'Clínico Geral';
            }

            axios.post(URL, { ...newDoctor })
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
                            this.sendAlert("You can't delete a doctor that has an appointment");
                        } else if (erroResponse.indexOf("CPF") >= 0) {
                            this.sendAlert('CPF is not valid');
                        } else if (erroResponse.indexOf("RG") >= 0) {
                            this.sendAlert('RG is not valid');
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
            axios.put(`${URL}/${newId}`, { ...newDoctor })
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
                            this.sendAlert("You can't delete a doctor that has an appointment");
                        } else if (erroResponse.indexOf("CPF") >= 0) {
                            this.sendAlert('CPF is not valid');
                        } else if (erroResponse.indexOf("RG") >= 0) {
                            this.sendAlert('RG is not valid');
                        } else if (erroResponse.indexOf("Expertise") >= 0) {
                            this.sendAlert('Expertise is not valid');
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
                <PageHeader name='Doctors' icon='user-md' />
                <SearchBar
                    nameSearch={this.state.nameSearch}
                    handleChange={this.handleChange}
                    handleAdd={this.handleAdd}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear} />
                <DoctorList
                    list={this.state.list}
                    handleMoreInfo={this.handleMoreInfo}
                    handleRemove={this.handleRemove}
                />
                <DoctorModal
                    closeModal={this.closeModal}
                    handleCreateDoctor={this.handleCreateDoctor}
                />
                <Alert
                    sendAlert={this.sendAlert}
                    closeAlert={this.closeAlert}
                />
            </div>
        )
    }
}