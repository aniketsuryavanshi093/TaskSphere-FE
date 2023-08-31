import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const Circularbar = ({ value, textColor, pathColor }: { value: number, textColor: string, pathColor: string }) => {
    return (
        <CircularProgressbar className='circularbar' styles={buildStyles({
            textColor,
            pathColor,
        })} value={value} text={`${value}%`} />
    )
}

export default Circularbar