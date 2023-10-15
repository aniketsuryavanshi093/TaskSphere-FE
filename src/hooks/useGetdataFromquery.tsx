'use client'
import { useQueryClient } from '@tanstack/react-query';

export const useGetFetchQuery = (name) => {
  const queryClient = useQueryClient();

  return queryClient.getQueryData(name);
};

export default useGetFetchQuery;
