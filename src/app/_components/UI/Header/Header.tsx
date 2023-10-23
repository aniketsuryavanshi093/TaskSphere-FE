import Link from 'next/link'
import React from 'react'
import "./header.scss"
import HeaderProfile from './HeaderProfile'

const Header = () => {
    return (
        <header className="header_section p-0">
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg custom_nav-container ">
                    <Link className="navbar-brand" href="/">
                        <span>
                            TaskSphere
                        </span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className=""> </span>
                    </button>
                    <div className="collapse navbar-collapse wrapper justify-between" id="navbarSupportedContent">
                        <ul className="navbar-nav wrapper justify-start">
                            <li className="nav-item mx-3">
                                <Link prefetch={false} className="nav-link" href="/blog"> Blog</Link>
                            </li>
                        </ul>
                        <HeaderProfile />
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header