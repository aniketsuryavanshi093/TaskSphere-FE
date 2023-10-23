import Image from 'next/image';
import React from 'react';

const Avatar: React.FC<{ image?: string, initials?: string, size?: number }> = ({ image, initials, size = 40 }) => {
    const getRandomColor = () => {
        const colors = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8'];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };
    const avatarStyle = {
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: image ? "transparent" : getRandomColor(),
        color: '#fff',
        fontSize: size * 0.4,
    };
    if (image) {
        return <Image height={40} width={40} src={image} alt="User Avatar" style={avatarStyle} />;
    } else {
        return <div style={avatarStyle}>{initials}</div>;
    }
};



export default Avatar


