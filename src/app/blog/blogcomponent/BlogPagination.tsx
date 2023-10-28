"use client"
import Pagination from '@/app/_components/UI/Pagination/Pagination';
import { PaginationConfigType } from '@/commontypes';
import usePaginationHook from '@/hooks/usePaginationHook';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { Col } from 'reactstrap';

const BlogPagination: React.FC<{ total: number, totalPages: number, currentpage: number, }> = ({ total, totalPages, currentpage }) => {

    const { PaginationCOnfig, setpaginationConfig, currentPage, setCurrentPage } = usePaginationHook();
    const router = useRouter()
    const params = useSearchParams()
    useEffect(() => {
        if (currentPage) {
            router.push(`/blog?page=${currentPage}${params.get("search") ? `&search=${params.get("search")}` : ""}`)
        }
    }, [currentPage,])

    useEffect(() => {
        setpaginationConfig({
            itemCount: total,
            pagecount: totalPages,
            currentpage: currentpage,
            perpageitemcount: 10,
        });
        setCurrentPage((currentpage));
    }, [totalPages, total,])
    return (
        <div className='wrapper w-100'>
            {PaginationCOnfig && (
                <Col className="col-12">
                    <Pagination showRowperpage={false} paginationConfig={PaginationCOnfig as PaginationConfigType} />
                </Col>
            )}
        </div>
    )
}

export default BlogPagination