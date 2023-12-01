import DatatableTables from '@/app/_components/UI/Table/Table'
import { adminusercolumn } from '@/constants/tableColumns'
import Image from 'next/image'
import { useQuery } from "@tanstack/react-query"
import React, { ReactNode, useEffect, useState } from 'react'
import { getAllOrganizationsUser } from '@/apiServices/admin/adminservices'
import { useSession } from 'next-auth/react'
import usePaginationHook from '@/hooks/usePaginationHook'

type ProjectsType = {
    srNo: number,
    userName: string,
    name: string,
    profilePic: string,
    totalTasks: number,
    totalActiveTasks: number,
    active: number,
    fullname: ReactNode,
    totaltask: number,
    createdAt: string,
}

const AdminUsers = () => {
    const { PaginationCOnfig, setpaginationConfig, PerpageItemCount, currentPage } = usePaginationHook();
    const [Rows, setRows] = useState<ProjectsType[]>([])
    const { data } = useSession()
    const { data: allusers, isLoading } = useQuery({
        queryFn: () => getAllOrganizationsUser({ PerpageItemCount, currentPage, ...data?.user }),
        queryKey: ['orgainzationusers', `${PerpageItemCount}${currentPage}`],
        enabled: data?.user.id ? true : false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 60000,
        retry: false,
        refetchOnmount: false,
    })
    console.log(allusers);

    useEffect(() => {
        if (allusers?.data?.data?.list?.length as any) {
            const temp = allusers?.data?.data?.list?.map((elem: ProjectsType, i: number) => ({
                srNo: ((currentPage === 1 || currentPage === null) ? 0 : currentPage - 1) * PerpageItemCount + i + 1,
                userName: elem.userName,
                fullname: (
                    <div className='wrapper justify-start'>
                        <Image src={elem.profilePic || "/images/icons/userdummy.avif"} alt="projectlogo" className='rounded-pill' width={25} height={25} />
                        <span className='ms-2'>{elem.name}</span>
                    </div>
                ),
                totaltask: elem.totalTasks,
                active: elem.totalActiveTasks,
                createdAt: new Date(elem.createdAt).toDateString(),
            }))
            console.log(temp, allusers);

            setRows(temp)
            setpaginationConfig({
                itemCount: allusers?.data?.data?.count,
                pagecount: Math.ceil(allusers?.data.data?.count / PerpageItemCount),
                currentpage: currentPage,
                perpageitemcount: PerpageItemCount,
            }
            );
        } else {
            setRows([]);
            setpaginationConfig({
                itemCount: 0,
                pagecount: 0,
                currentpage: 1,
                perpageitemcount: 0,
            });
        }
    }, [allusers])
    return (
        <div>
            <DatatableTables
                norecordslabel={!Rows.length ? "No Users Found" : ""}
                paginationConfig={PaginationCOnfig}
                column={adminusercolumn}
                row={isLoading ? 'loading' : Rows || []}
            />
        </div>
    )
}

export default AdminUsers