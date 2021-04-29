import React from 'react'
import IconButton from '../template/iconButton'

export default props => {

    return (
        <div className='modalMoreInfo' id='modalMoreInfo'>
            <header>
                <h3 id='titleModal'>Details</h3>
                <div className='closeModal'>
                    <IconButton style='outline-light' icon='times-circle' onClick={() => props.closeModal()} />
                </div>
            </header>
            <main>
                <table className='table' key={props.id_patient} role='form'>
                    <tbody>
                        <tr>
                            <td>
                                <p>Id:</p>
                            </td>
                            <td>
                                <input type='text' value={props.id_patient} disabled id='idMoreInfo' />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Name:</p>
                            </td>
                            <td>
                                <input type='text' value={props.name} id='nameMoreInfo' />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>E-mail</p>
                            </td>
                            <td>
                                <input type='text' value={props.email} id='emailMoreInfo' />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>CPF</p>
                            </td>
                            <td>
                                <input type='text' value={props.cpf} id='cpfMoreInfo' />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>RG</p>
                            </td>
                            <td>
                                <input type='text' value={props.rg} id='rgMoreInfo' />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Birth Date</p>
                            </td>
                            <td>
                                <input type='text' value={props.birth_date} id='birth_dateMoreInfo' />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Password</p>
                            </td>
                            <td>
                                <input value={props.password} id='passwordMoreInfo' />
                            </td>
                        </tr>
                    </tbody>
                </table>

            </main>
            <footer>
                <IconButton style='info' icon='floppy-o' title='Save' onClick={props.handleCreatePatient} />
                {/* <IconButton style='warning' icon='trash' onClick={() => props.handleRemove(register)} /> */}
            </footer>
        </div>
    )
}