import React from 'react'
import "./UIcomponentsCss.scss";

const PageHeaderTitle: React.FC<{ classname?: string }> = ({ classname }) => {
    return (
        <div>
            <h5 className={`pageheadertitle text_primary mb-0 ${classname}`}>
                Mobile App
            </h5>
        </div>
    )
}

export default PageHeaderTitle