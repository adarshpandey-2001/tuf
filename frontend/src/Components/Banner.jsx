import React, { useState, useEffect } from 'react'
import CountdownElement from './CountdownElement';
import {Link} from 'react-router-dom';

const Banner = (props) => {
    const [timeArray, setTimeArray] = useState([]);

    const countdownNames = ["Days", "Hours", "Minutes", "Seconds"]

    function timeRemaining(targetDate) {
        // Get the current date and time
        const now = new Date();

        // Calculate the difference in milliseconds
        const difference = targetDate - now;

        // Check if the target date is in the past
        if (difference < 0) {
            return [0, 0, 0, 0]; // No time remaining
        }

        // Calculate the remaining time components
        const secondsTotal = Math.floor(difference / 1000);
        const minutesTotal = Math.floor(secondsTotal / 60);
        const hoursTotal = Math.floor(minutesTotal / 60);
        const daysTotal = Math.floor(hoursTotal / 24);

        const seconds = secondsTotal % 60;
        const minutes = minutesTotal % 60;
        const hours = hoursTotal % 24;
        const days = daysTotal;

        // Return the remaining time as an array
        return [days, hours, minutes, seconds];
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const time = timeRemaining(new Date(props.data.target_datetime))
            setTimeArray(time);
        }, 1000);

        return () => {
            clearInterval(interval);
        }

    }, [])
    


    return (
        <>
            <div className="p-4 mb-4 bg-body-tertiary rounded-3">
                <div className="container-fluid py-4">
                    <div className="row">
                        <div className="col-md-6">
                            <h3 className="display-5 fw-bold">{props.data.title}</h3>
                            <p className="col-md-8 fs-4">{props.data.description}</p>
                            <Link className="btn btn-primary btn-lg" to={props.data.banner_link} target="_blank">Go to link</Link>
                        </div>
                        <div className="col-md-6">
                            <h3 className='text-center'>Coming in</h3>
                            <div className="d-flex">
                                {timeArray.map((item, index) => {
                                    return <CountdownElement time={timeArray[index]} name={countdownNames[index]} key={index} />
                                })}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Banner