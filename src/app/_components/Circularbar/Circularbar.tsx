import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const Circularbar = ({ value, textColor, pathColor, background }: { value: number, textColor: string, pathColor: string, background: string }) => {
    return (
        <CircularProgressbar className='circularbar' styles={buildStyles({
            textColor,
            pathColor,
            backgroundColor: background,

        })} background value={value} text={`${value}%`} />
    )
}

export default React.memo(Circularbar)