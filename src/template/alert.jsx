import React from 'react'

export default props => (
    <div className="alertBox alertBoxWarning" id="alertBox">
        <span id='alertMsg'></span>
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => props.closeAlert()}>
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
)