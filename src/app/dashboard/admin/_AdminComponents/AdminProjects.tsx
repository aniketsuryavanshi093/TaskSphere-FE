import DatatableTables from '@/app/_components/UI/Table/Table'
import { adminprojectscolumn } from '@/constants/tableColumns'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type ProjectsType = {
    srNo: number,
    users: number,
    title: string,
    active: number,
    totaltask: number,
    createdat: string,
    updatedAt: string,
}

const dummy: ProjectsType[] = [
    {
        srNo: 1,
        users: 34,
        title: 'Mercor',
        active: 3
        , totaltask: 1,
        createdat: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
    }
    ,
    {
        srNo: 2,
        users: 7,
        title: 'Continuity',
        active: 3
        , totaltask: 1,
        createdat: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
    },
    {
        srNo: 3,
        users: 41,
        title: 'AbdelGhafour',
        active: 3
        , totaltask: 1,
        createdat: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
    },
    {
        srNo: 4,
        users: 3,
        title: 'XR',
        active: 3
        , totaltask: 1,
        createdat: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
    },
    {
        srNo: 5,
        users: 4,
        title: '3Verse',
        active: 3
        , totaltask: 1,
        createdat: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
    }
]

const AdminProjects = () => {
    const [Rows, setRows] = useState<ProjectsType[]>([])
    useEffect(() => {
        if (dummy.length) {
            let temp: ProjectsType[] = dummy.map((elem: ProjectsType,) => ({
                ...elem,
                title: (
                    <div className='wrapper justify-start'>
                        <Image src="/images/google.png" alt="projectlogo" width={20} height={20} />
                        <span className='ms-2'>{elem.title}</span>
                    </div>
                )
            }))
            setRows(temp)
        }
    }, [])

    return (
        <div>
            <DatatableTables
                column={adminprojectscolumn}
                // row={getSiteLoading ? 'loading' : Rows || []}
                row={Rows || []}
            />
        </div>
    )
}

export default AdminProjects