import React from 'react'
import PageHeader from '../template/pageHeader'

export default props => (
    <div>
        <PageHeader name='About' />
        <div>
            <h2>App-Ointment
                <img src='favicon.ico' className='aboutIcon' />
            </h2>
        </div>
        <p>This is a Doctor's Appointment application (hence App+ointment), made with React, NodeJS, Express and MySQL (with Sequelize).</p>
        <hr></hr>
        <h3>About the Dev</h3>
        <p><strong>Developer:</strong> Paulo Matos is a 30yo Brazilian Dev focused on Front-End application development, using ReactJs as his main framework. Recently graduated from Fatec Franca - System Analysis and Development.</p>
        <p>Check out the github repositories for both the <a href='https://github.com/paulo-matos/app-ointment_back' target='_blank'>Back</a> and <a href='https://github.com/paulo-matos/app-ointment_front' target='_blank'>Front-End</a> at <a href='https://github.com/paulo-matos'>My Github</a>.</p>
        <br />
        <p><small><i>Thanks for stopping by!</i></small></p>
    </div>
)