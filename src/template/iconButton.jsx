import React from 'react'
import If from './if'

export default props => (
    <If test={!props.test}>
        <button className={'btn btn-' + props.style} onClick={props.onClick}>
            <i className={'fa fa-' + props.icon}></i>
            <span className={props.title ? 'btnTitle' : ''}>{props.title}</span>
        </button>
    </If >
)