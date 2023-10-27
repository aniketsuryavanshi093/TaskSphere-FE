"use client"
import Pagination from '@/app/_components/UI/Pagination/Pagination';
import { PaginationConfigType } from '@/commontypes';
import usePaginationHook from '@/hooks/usePaginationHook';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { Col } from 'reactstrap';

const BlogPagination: React.FC<{ total: number, totalPages: number }> = ({ total, totalPages }) => {

    const { PaginationCOnfig, setpaginationConfig, currentPage } = usePaginationHook();
    const params = useSearchParams();
    const router = useRouter()
    console.log(params);
    useEffect(() => {
        if (currentPage > 1) {
            router.push(`/blog?page=${currentPage}`)
        }
    }, [currentPage])
    useEffect(() => {
        setpaginationConfig({
            itemCount: 100,
            pagecount: 10,
            currentpage: 1,
            perpageitemcount: 10,
        });
    }, [totalPages, total])
    return (
        <div className='wrapper w-100'>
            {PaginationCOnfig && (
                <Col className="col-12">
                    <Pagination paginationConfig={PaginationCOnfig as PaginationConfigType} />
                </Col>
            )}
        </div>
    )
}

export default BlogPagination