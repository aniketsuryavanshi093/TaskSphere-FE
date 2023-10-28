'use client'
import { getSearchkeyword } from '@/apiServices/blog/blogservice'
import LoginPopup from '@/app/_components/Models/LoginPopup'
import Search from '@/app/_components/Search/Search'
import { bloginterface } from '@/commontypes'
import AuthProviders from '@/providers/AuthProviders'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from "reactstrap"

const Blogheader = () => {
    const client = new QueryClient()
    return (
        <AuthProviders>
            <QueryClientProvider client={client}>
                <Component />
            </QueryClientProvider>
        </AuthProviders >
    )
}

const Component = () => {
    const [OpenModal, setOpenModal] = useState(false)
    const { status } = useSession()
    const openLoginpopup = () => {
        setOpenModal(true);
    }
    const [SearchKey, setSearchKey] = useState("")
    const { data, isLoading } = useQuery({
        queryFn: () => getSearchkeyword({ search: SearchKey }),
        queryKey: ['search', `${SearchKey}`],
        enabled: !!SearchKey.length
    })
    const onSetvalue = (searchkey: string) => {
        setSearchKey(searchkey)
    }
    console.log({ data, isLoading })
    return (
        <div className="wrapper my-2 justify-between">
            <Search searchData={data?.data.data.blogs as bloginterface[]} searchLoading={isLoading} searchwrapperclass='blogsearchwrapper' inpClassname='blogsearch' placeholder='Find what you are looking for?' setValue={onSetvalue} waitTime={1000} />
            {
                status === "authenticated" ? (
                    <Link prefetch={false} className='create-blog no-wrap btn' href="/blog/create-blog"> Create Blog </Link>
                )
                    :
                    (
                        <Button onClick={openLoginpopup} className="create-blog nowrap btn" >Create Blog</Button>
                    )
            }
            {OpenModal && (
                <LoginPopup isOpen={OpenModal} onClose={() => setOpenModal(false)} />
            )}
        </div>
    )
}
export default Blogheader