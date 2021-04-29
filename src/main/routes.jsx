import React from 'react'
import { Router, Route, Redirect, hashHistory } from 'react-router'

import Appointment from '../appointment/appointment'
import Patient from '../patient/patient'
import Doctor from '../doctor/doctor'
import About from '../about/about'
import NotFound from '../404/notFound'


export default props => (
    <Router history={hashHistory}>
        <Route path='/appointments' component={Appointment} />
        <Route path='/patients' component={Patient} />
        <Route path='/doctors' component={Doctor} />
        <Route path='/about' component={About} />
        <Route path='/404' component={NotFound} />
        <Redirect from='/' to='/appointments' />
        <Redirect from='*' to='/404' />
    </Router>
)