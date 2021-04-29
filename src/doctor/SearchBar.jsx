import React from 'react'
import Grid from '../template/grid'
import IconButton from '../template/iconButton'

export default props => {
    const keyHandler = (e) => {
        if (e.key === 'Escape') {
            props.handleClear()
        } else{
            props.handleSearch()
        }
    }

    return (
        <div role='form' className='searchBar'>
            <Grid cols='12 9 10'>
                <input id='searchNameBar' className='form-control' placeholder='Search Doctor'
                    onChange={props.handleChange}
                    onKeyUp={keyHandler}
                    value={props.nameSearch}></input>
            </Grid>

            <Grid cols='12 3 2'>
                <IconButton icon='plus' style='warning' title='Add Doctor'
                    onClick={props.handleAdd}></IconButton>
            </Grid>
        </div>
    )
}