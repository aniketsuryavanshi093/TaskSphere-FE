'use client'
import { PaginationConfigType } from '@/app/_components/UI/Pagination/Pagination';
import { useState } from 'react';

const usePaginationHook = () => {
  const [PerpageItemCount, setPerpageItemCount] = useState<number>(5);
  const [PaginationCOnfig, setsetPaginationCOnfig] = useState<PaginationConfigType>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  const onperpageItemCountchange = (e: any) => {
    setPerpageItemCount(e.target.value);
    setCurrentPage(1);
  };
  const setpaginationConfig = ({ itemCount, pagecount, currentpage, perpageitemcount }: { itemCount: number, pagecount: number, currentpage: number, perpageitemcount: number }) => {
    setsetPaginationCOnfig({
      currentPage: currentpage,
      pageCount: pagecount,
      perpageItemCount: perpageitemcount,
      itemCount,
      onperpageItemCountchange,
      onPageChange,
    });
  };

  return { PaginationCOnfig, setpaginationConfig, PerpageItemCount, currentPage, setCurrentPage, onPageChange };
};

export default usePaginationHook;
