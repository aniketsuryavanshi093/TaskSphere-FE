import Image from 'next/image';
import React from 'react';

const Avatar: React.FC<{ image?: string, initials?: string, size?: number }> = ({ image, initials, size = 40 }) => {
    const avatarStyle = {
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: image ? "transparent" : "gray",
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


