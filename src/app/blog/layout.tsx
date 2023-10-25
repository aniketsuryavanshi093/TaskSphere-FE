import React from 'react'
import Header from '../_components/UI/Header/Header'
import "./blogs.scss"

const layout = ({ children }) => {
    return (
        <>
            <Header />
            <div className="container max-w-4xl py-1 px-0">
                {children}
            </div>
        </>
    )
}

export default layout