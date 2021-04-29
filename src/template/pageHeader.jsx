import React from 'react'

export default props => (
    <div className='page-header'>
        <h2><i className={`fa fa-${props.icon}`}></i> {props.name}</h2>
    </div>
)