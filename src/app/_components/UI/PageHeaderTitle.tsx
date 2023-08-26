import React from 'react'
import "./UIcomponentsCss.scss";
import Link from 'next/link';

const PageHeaderTitle: React.FC<{ classname?: string, title: string, isRedirectto?: string }> = ({ classname, title, isRedirectto }) => {
    return (
        <div>
            {
                isRedirectto ? (
                    <Link href={isRedirectto}>
                        <h5 className={`pageheadertitle text_primary mb-0 ${classname}`} >
                            {title}
                        </h5>
                    </Link>
                )
                    :
                    (

                        <h5 className={`pageheadertitle text_primary mb-0 ${classname}`} >
                            {title}
                        </h5>
                    )
            }
        </div>
    )
}

export default PageHeaderTitle