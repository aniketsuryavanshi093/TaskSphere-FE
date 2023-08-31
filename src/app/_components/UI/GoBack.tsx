"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { GrFormPreviousLink, } from 'react-icons/gr';
import "./UIcomponentsCss.scss";

const GoBack = () => {
  const router = useRouter()
  return (
    <div className='previous wrapper  justify-start w-100'>
      <GrFormPreviousLink className='cp' onClick={() => router.back()} />
      <span className='cp' onClick={() => router.back()} >Go Back</span>
    </div>
  )
}

export default GoBack