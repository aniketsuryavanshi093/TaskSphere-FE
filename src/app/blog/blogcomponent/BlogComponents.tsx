'use client'
import { getSearchkeyword } from '@/apiServices/blog/blogservice'
import LoginPopup from '@/app/_components/Models/LoginPopup'
import Search from '@/app/_components/Search/Search'
import { bloginterface } from '@/commontypes'
import AuthProviders from '@/providers/AuthProviders'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
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
        enabled: !!SearchKey.length,
        staleTime: 5 * 60 * 100
    })
    const onSetvalue = (searchkey: string) => {
        setSearchKey(searchkey)
    }
    const SearchDataComponent = () => {
        return (
            <div className="searchresult">
                {
                    (!isLoading && !!data?.data.data.blogs.length) ? (
                        <>
                            {data?.data.data.blogs?.map((elem: bloginterface) => (
                                <Link prefetch={false} className="my-2" key={elem._id} href={`blog/posts/${elem.slug}`} >
                                    <div className="wrapper my-2 justify-start">
                                        <div className="serachimgwrapper">
                                            <Image src={elem.previewImage} unoptimized width={100} height={60} alt={elem.slug} />
                                        </div>
                                        <p className="mb-0">{elem.title}</p>
                                    </div>
                                </Link>
                            ))}
                            <Link href={`/blog?search=${SearchKey}`}>
                                View more
                            </Link>
                        </>
                    ) :
                        (
                            <div className="w-100 wrapper" style={{ height: "100px" }}>
                                <p className="mb-0"> No Results found 😭 </p>
                            </div>
                        )
                }
            </div>
        )
    }
    return (
        <div className="wrapper my-2 justify-between">
            <Search SearchDataComponent={SearchDataComponent} searchData={data?.data.data.blogs as bloginterface[]} searchLoading={isLoading} searchwrapperclass='blogsearchwrapper' inpClassname='blogsearch' placeholder='Find what you are looking for?' setValue={onSetvalue} waitTime={1000} />
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