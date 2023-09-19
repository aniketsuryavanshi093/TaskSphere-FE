import React from 'react'
import "./dragdroploadr.scss"
import { Placeholder } from 'reactstrap'
const DragDropLoader = () => {
    return (
        <Placeholder animation='wave' className='dragdroparealoader' tag="div" >
            <Placeholder tag='div' className='taskclumnwrapperloader wrapper flex-wrap gap-2 align-start'></Placeholder>
            <Placeholder tag='div' className='taskclumnwrapperloader wrapper flex-wrap gap-2 align-start'></Placeholder>
            <Placeholder tag='div' className='taskclumnwrapperloader wrapper flex-wrap gap-2 align-start'></Placeholder>
        </Placeholder>
    )
}

export default DragDropLoader