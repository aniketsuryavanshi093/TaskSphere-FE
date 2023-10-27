"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from 'reactstrap'

const SeeAllbtn = () => {
    const roiter = useRouter()
    return (
        <div className="position-absolute seeallbtn">
            <Button
                color="primary"
                outline
                onClick={() => roiter.back()}
            >
                <div className="wrapper">
                    <i className="fa-solid fa-arrow-left me-2"></i>
                    <p className="mb-0">See all posts</p>
                </div>
            </Button>
        </div>
    )
}

export default SeeAllbtn