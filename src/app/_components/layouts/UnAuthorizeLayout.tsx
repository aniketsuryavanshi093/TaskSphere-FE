import React from 'react'
import "./layout.scss"

const UnAuthorizeLayout = ({ children }: { children: React.JSX.Element }) => {
  return (
    <div className='p-3 loginwrapper' >
      <div className='wrapper loginwrapperlayout  w-100'>
        {children}
      </div>
    </div>
  )
}

export default UnAuthorizeLayout