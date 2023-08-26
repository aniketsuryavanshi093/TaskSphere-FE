import DatatableTables from '@/app/_components/UI/Table/Table'
import { adminusercolumn } from '@/constants/tableColumns'
import Image from 'next/image'
import { useQuery } from "@tanstack/react-query"
import React, { ReactNode, useEffect, useState } from 'react'
import { getAllOrganizationsUser } from '@/apiServices/admin/adminservices'
import { useSession } from 'next-auth/react'

type ProjectsType = {
    srNo: number,
    userName: string,
    name: string,
    active: number,
    fullname: ReactNode,
    totaltask: number,
    createdAt: string,
}

const AdminUsers = () => {
    const [Rows, setRows] = useState<ProjectsType[]>([])
    const { data } = useSession()
    const { data: allusers, isLoading } = useQuery({
        queryFn: () => getAllOrganizationsUser(data?.user),
        queryKey: ['orgainzationusers', ""],
        enabled: data?.user.id ? true : false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 60000,
        retry: false,
        refetchOnmount: false,
    })
    useEffect(() => {
        if (allusers?.data?.data?.members?.length as any) {
            const temp = allusers?.data?.data?.members.map((elem: ProjectsType, i) => ({
                srNo: i,
                userName: elem.userName,
                fullname: (
                    <div className='wrapper justify-start'>
                        <Image src="/images/icons/userdummy.avif" alt="projectlogo" width={20} height={20} />
                        <span className='ms-2'>{elem.name}</span>
                    </div>
                ),
                totaltask: 2,
                active: 2,
                createdAt: new Date(elem.createdAt).toDateString(),
            }))
            setRows(temp);
        }
    }, [allusers])
    return (
        <div>
            <DatatableTables
                column={adminusercolumn}
                row={isLoading ? 'loading' : Rows || []}
            />
        </div>
    )
}

export default AdminUsers