import React from 'react'
import Header from '../_components/UI/Header/Header'
import "./blogs.scss"

const layout = ({ children }) => {
    return (
        <>
            <Header />
            <div className="container blogsdatawrapper max-w-4xl">
                {children}
            </div>
        </>
    )
}

export default layout