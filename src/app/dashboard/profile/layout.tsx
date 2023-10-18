import React, { ReactNode } from 'react'
import "./profile.scss"
import ProfileTabs from "./components/ProfileTabs";

const Profilelayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className='w-100 my-2'>
            <ProfileTabs />
            <div className='w-100 my-2'>
                {
                    children
                }
            </div>
        </div>
    )
}

export default Profilelayout