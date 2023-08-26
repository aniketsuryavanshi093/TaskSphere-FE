import React, { ReactNode, useEffect, useState } from 'react'
import { getAllOrganizationsProject } from '@/apiServices/admin/adminservices'
import DatatableTables from '@/app/_components/UI/Table/Table'
import { adminprojectscolumn } from '@/constants/tableColumns'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useQuery } from "@tanstack/react-query"

type ProjectsType = {
    srNo: number,
    members: [],
    title: string,
    projecttitle?: ReactNode,
    active: number,
    totaltask: number,
    createdAt: string,
    updatedAt: string,
    logo: string,
    logoUrl?: string
}


const AdminProjects = () => {
    const [Rows, setRows] = useState<ProjectsType[]>([])
    const { data } = useSession()
    const { data: orgProjects, isLoading } = useQuery({
        queryFn: () => getAllOrganizationsProject(data?.user),
        queryKey: ['orgainzationprojects', ""],
        enabled: data?.user.id ? true : false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 1000 * 60 * 5,
        retry: false,
        refetchOnmount: false,
    })
    useEffect(() => {
        if (orgProjects?.data?.data?.projects?.length as any) {
            const temp = orgProjects?.data?.data?.projects.map((elem: ProjectsType, i) => ({
                srNo: i,
                members: elem.members.length,
                active: 2,
                projecttitle: (
                    <div className='wrapper justify-start'>
                        <Image src="/images/google.png" alt="projectlogo" width={20} height={20} />
                        <span className='ms-2'>{elem.title}</span>
                    </div>
                ),
                totaltask: 2,
                createdAt: new Date(elem.createdAt).toDateString(),
                logo: elem.logoUrl ? elem.logoUrl : ""
            }))
            setRows(temp);
        }
    }, [orgProjects])

    return (
        <div>
            <DatatableTables
                column={adminprojectscolumn}
                row={isLoading ? 'loading' : Rows || []}
            />
        </div>
    )
}

export default AdminProjects