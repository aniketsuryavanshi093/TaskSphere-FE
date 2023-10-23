"use client"
import React from 'react'
import "../profile.scss"
import Avatar from '@/app/_components/UI/Avatar'
import moment from 'moment'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { getUserActivity } from '@/apiServices/admin/adminservices'

const ProfileActivity = () => {
    const { data } = useSession()
    const { data: activitydata, isLoading, isError, error } = useQuery({
        queryKey: ["activity"],
        enabled: data?.user?.id ? true : false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 1000 * 60 * 5,
        retry: false,
        refetchOnmount: false,
        queryFn: () => getUserActivity(data?.user)
    })
    console.log(activitydata, isError, error);

    return (
        <div className="activitywrapper px-3 py-2">
            <div className='wrapper mt-3 justify-start'>
                <i className="fa-solid fa-list-ul"></i>
                <p className='header-title mx-3'>Activity</p>
            </div>
            <div className='w-100 mb-3 mt-4'>
                <div key={"234"} className='wrapper mb-3 justify-start'>
                    <Avatar initials='AS' />
                    <div className='ms-3 wrapper flex-column align-start'>
                        <p className='activitytext mb-0'><span className='assignename'>Aniket Suryavanshi</span> moved <a href='#' >Create NFT integration, and should work like highvibe.</a> from todo to in progress </p>
                        <p className='activity-date mb-0'>{moment().format('MMMM Do YYYY, h:mm:ss a')}. on board <span className='activityproject'>MarketPlace</span> </p>
                    </div>
                </div>
                <div key={"222"} className='wrapper  justify-start'>
                    <Avatar initials='AS' />
                    <div className='ms-3 wrapper flex-column align-start'>
                        <p className='activitytext mb-0'><span className='assignename'>Aniket Suryavanshi</span> joined <a href='#' >Create NFT integration, and should work like highvibe.</a> </p>
                        <p className='activity-date mb-0'>{moment().format('MMMM Do YYYY, h:mm:ss a')}. on board <span className='activityproject'>MarketPlace</span> </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileActivity