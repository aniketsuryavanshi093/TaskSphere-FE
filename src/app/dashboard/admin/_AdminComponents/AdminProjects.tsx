import React, { ReactNode, useEffect, useState } from "react";
import DatatableTables from "@/app/_components/UI/Table/Table";
import { adminprojectscolumn } from "@/constants/tableColumns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import useGetAllOrganizationsProjecthook from "@/hooks/UseQuery/ProjectsQueryHooks/usegetAllOrganizationsProjecthook";
import usePaginationHook from "@/hooks/usePaginationHook";

type ProjectsType = {
    activeCount: number;
    createdAt: string;
    membersCount: number;
    ticketsCount: number;
    title: string;
    logoUrl: string
};

const AdminProjects = () => {
    const [Rows, setRows] = useState<ProjectsType[]>([]);
    const { data } = useSession();
    const { PaginationCOnfig, setpaginationConfig, PerpageItemCount, currentPage } = usePaginationHook();
    // passing true for analyutic data
    const { data: orgProjects, isLoading } = useGetAllOrganizationsProjecthook(
        data,
        { PerpageItemCount, currentPage },
        true
    );

    useEffect(() => {
        if (orgProjects?.data?.data?.paginatedResults?.length as any) {
            const temp = orgProjects?.data?.data?.paginatedResults.map((elem: ProjectsType, i) => ({
                srNo: (currentPage === 1 ? 0 : currentPage - 1) * PerpageItemCount + i + 1,
                members: elem.membersCount,
                active: elem.activeCount,
                projecttitle: (
                    <div className="wrapper justify-start">
                        <Image
                            src={elem.logoUrl || "/images/google.png"}
                            alt="projectlogo"
                            width={20}
                            height={20}
                        />
                        <span className="ms-2">{elem.title}</span>
                    </div>
                ),
                totaltask: elem.ticketsCount,
                createdAt: new Date(elem.createdAt).toDateString(),
                logo: elem.logoUrl ? elem.logoUrl : "",
            }));
            setRows(temp)
            setpaginationConfig({
                itemCount: orgProjects?.data.data.totalRequestCount.total,
                pagecount: Math.ceil(orgProjects?.data.data.totalRequestCount.total / PerpageItemCount),
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
    }, [orgProjects]);
    return (
        <div>
            <DatatableTables
                column={adminprojectscolumn}
                paginationConfig={PaginationCOnfig}
                norecordslabel= {!Rows.length ? "No Projects Found" : ""}
                row={isLoading ? "loading" : Rows || []}
            />
        </div>
    );
};

export default AdminProjects;
