"use client"
import React, { useState } from "react";

import "./dashboardlayout.scss";
import Link from "next/link";
import { dataItems } from "@/constants";
import { dataItemsTypes, projectTypes } from "@/commontypes";
import Image from "next/image";
import { useSession } from "next-auth/react";
import useGetProjectsByUserhook from "@/hooks/UseQuery/ProjectsQueryHooks/useGetProjectsByUserhook";
import useGetAllOrganizationsProjecthook from "@/hooks/UseQuery/ProjectsQueryHooks/usegetAllOrganizationsProjecthook";
import { Placeholder } from "reactstrap";

type pageProps = {
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>,
  openSidebar: boolean,
  MobileSidebar?: boolean,
  setMobileSidebar: React.Dispatch<React.SetStateAction<boolean>>, params?: any
}

const Sidebar: React.FC<pageProps> = ({ openSidebar, setMobileSidebar, params }) => {
  const { data } = useSession()
  const { data: userproject, isLoading: userprojectload } = useGetProjectsByUserhook(data)
  const { data: orgProjects, isLoading: orgprojload } = useGetAllOrganizationsProjecthook(data)
  const [SelectedTab, setSelectedTab] = useState<string>("#7AC555")
  return (
    <div
      className={`d-none d-lg-block scrollbar sidebarNav ${openSidebar && "hide_sidebar"}`}
    >
      <div className="sidebar_wrapper">
        <div className={`${openSidebar ? "ml-3 mr-2" : "ml-3"} mb-1 sidebartopdiv wrapper`}>
          <Link href="/dashboard" prefetch={false} className="wrapper  ">
            <Image
              src='/images/colorfilter.png'
              alt="brandLogo"
              className="img-fluid"
              height={26}
              width={26}
            />
            <p className="projectname mb-0 mx-1">TaskSphere</p>
          </Link>
        </div>
        <div className="scrollbar">
          <ul className="list_wrapper">
            {
              data?.user?.role === "organization" && (
                <li
                  className="sidebar-nav-item nonActive position-relative"
                >
                  <Link prefetch={false} href="/dashboard/admin" className="color-black">
                    <Image src="/images/icons/admins.png" alt="admin" height={24} width={24} />
                    <span className={`${openSidebar && "d-none"} linkname`}>
                      Administration
                    </span>
                  </Link>
                </li>
              )
            }
            {
              (data?.user?.ticketAdministrator || data?.user?.role === "organization") && (
                <li
                  className="sidebar-nav-item nonActive position-relative"
                >
                  <Link prefetch={false} href="/dashboard/manageticket" className="color-black">
                    <i className="fa-solid fa-ticket ticketimg" ></i>
                    <span className={`${openSidebar && "d-none"} linkname`}>
                      Manage Ticket
                    </span>
                  </Link>
                </li>
              )
            }
            {dataItems.map((item: dataItemsTypes) => (
              <li
                className="sidebar-nav-item nonActive position-relative"
                key={item.name}
              >
                <Link prefetch={false} href={item.link} className="color-black">
                  <Image src={item.logo} alt={item.name} height={24} width={24} />
                  <span className={`${openSidebar && "d-none"} linkname`}>
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="sidebardivider"></div>
          <div className="wrapper justify-start mt-4 mb-3 mx-2">
            <p className="mb-0 subtitle ps-2">
              my projects
            </p>
          </div>
          <ul className="list_wrapper">
            {
              (data?.user.role === "member" ? userprojectload : orgprojload) && (
                Array(4).fill(0).map((_, elem) => (
                  <Placeholder key={elem} animation="glow" className="w-100 d-flex my-4">
                    <Placeholder as="p" className=" linkloader projecttitle py-1" ></Placeholder>
                  </Placeholder>
                ))
              )
            }
            {
              (orgProjects || userproject)?.data?.data?.projects?.map((item: projectTypes) => (
                <Link onClick={() => setSelectedTab(item._id)} key={item.title} prefetch={false} href={`/dashboard/project/${item._id}`}>
                  <li
                    className={` ${item._id === SelectedTab && "tabactive"} sidebar-nav-item px-2 nonActive justify-start wrapper position-relative`}
                  >
                    <div className="wrapper" >
                      <div className="myprojectcolor" />
                      <span className={`${item._id === SelectedTab && "text_primary"} projecttitle ms-2`}>
                        {item.title}
                      </span>
                    </div>
                  </li>
                </Link>
              ))
            }
          </ul>
        </div>
      </div>
    </div >
  );
}

export default React.memo(Sidebar);
