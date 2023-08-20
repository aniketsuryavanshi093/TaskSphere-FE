import DatatableTables from '@/app/_components/UI/Table/Table'
import { adminusercolumn } from '@/constants/tableColumns'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
type ProjectsType = {
    srNo: number,
    username: string,
    name: string,
    active: number,
    totaltask: number,
    createdat: string,
}

const dummy: ProjectsType[] = [
    {
        srNo: 1,
        username: "aniket@solulab.co",
        name: 'Aniket',
        active: 3
        , totaltask: 1,
        createdat: new Date().toDateString(),
    }
    ,
    {
        srNo: 2,
        username: "shruti@solulab.co",
        name: 'Shruti',
        active: 3
        , totaltask: 1,
        createdat: new Date().toDateString(),
    },
    {
        srNo: 3,
        username: "somya@solulab.co",
        name: 'Somya',
        active: 3
        , totaltask: 1,
        createdat: new Date().toDateString(),
    },
    {
        srNo: 4,
        username: "mukesh@solulab.co",
        name: 'Mukesh',
        active: 3
        , totaltask: 1,
        createdat: new Date().toDateString(),
    },
    {
        srNo: 5,
        username: "sparsh@solulab.co",
        name: 'Sparsh',
        active: 3
        , totaltask: 1,
        createdat: new Date().toDateString(),
    }
]
const AdminUsers = () => {
    const [Rows, setRows] = useState<ProjectsType[]>([])
    useEffect(() => {
        if (dummy.length) {
            let temp: ProjectsType[] = dummy.map((elem: ProjectsType,) => ({
                ...elem,
                name: (
                    <div className='wrapper justify-start'>
                        <Image src="/images/icons/userdummy.avif" alt="projectlogo" width={20} height={20} />
                        <span className='ms-2'>{elem.name}</span>
                    </div>
                )
            }))
            setRows(temp)
        }
    }, [])
    return (
        <div>
            <DatatableTables
                column={adminusercolumn}
                // row={getSiteLoading ? 'loading' : Rows || []}
                row={Rows || []}
            />
        </div>
    )
}

export default AdminUsers