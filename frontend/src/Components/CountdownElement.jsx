import React from 'react'

const CountdownElement = (props) => {
    return (
        <div className="col">
            <div className="d-flex flex-column">
                <h2 className='text-center'>{props.time}</h2>
                <h6 className='text-center'>{props.name}</h6>
            </div>
        </div>
    )
}

export default CountdownElement