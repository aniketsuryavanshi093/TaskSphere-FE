import React from 'react'
import "./UIcomponentsCss.scss";

const PageHeaderTitle: React.FC<{ classname?: string, title: string }> = ({ classname, title }) => {
    return (
        <div>
            <h5 className={`pageheadertitle text_primary mb-0 ${classname}`}>
                {title}
            </h5>
        </div>
    )
}

export default PageHeaderTitle