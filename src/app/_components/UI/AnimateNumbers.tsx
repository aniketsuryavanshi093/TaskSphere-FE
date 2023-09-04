import React, { useState, useEffect } from 'react';

type PageProps = {
    start: number, end: number, duration: number
}
const NumberAnimation: React.FC<PageProps> = ({ start, end, duration }) => {
    const [currentValue, setCurrentValue] = useState(start);
    useEffect(() => {
        let startTime: number;
        const animate: (timestamp: number) => void = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / duration;
            if (progress < 1) {
                setCurrentValue(Math.floor(start + (end - start) * progress));
                requestAnimationFrame(animate);
            } else {
                setCurrentValue(end);
            }
        };

        requestAnimationFrame(animate);

        return () => {
            // Clean up any ongoing animations if the component unmounts
            cancelAnimationFrame(animate);
        };
    }, [start, end, duration]);

    return <div className="animated-number">{currentValue}</div>;
};

export default NumberAnimation;
