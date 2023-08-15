"use client"
import React, { useEffect, useState } from "react";

import "./dashboardlayout.scss";
import Link from "next/link";
import { dataItems } from "@/constants";
import { dataItemsTypes } from "@/commontypes";
import { useParams } from 'next/navigation'
import Image from "next/image";

type pageProps = {
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>,
  openSidebar: boolean,
  MobileSidebar?: boolean,
  setMobileSidebar: React.Dispatch<React.SetStateAction<boolean>>, params?: any
}
type tempproject = {
  name: string,
  color: string,
}
const muyprojects: tempproject[] = [{ name: ' Mobile App', color: '#7AC555' }, { name: 'Website Redesign', color: '#FFA500' }, { name: 'Design System', color: '#E4CCFD' }, { name: 'Wireframes', color: "#76A5EA" }]
const Sidebar: React.FC<pageProps> = ({ openSidebar, setMobileSidebar, params }) => {
  const { pathname } = useParams();
  console.log(params, pathname)
  const [SelectedTab, setSelectedTab] = useState<string>("#7AC555")
  // useEffect(() => {
  //   setMobileSidebar(false);
  // }, [pathname]);
  return (
    <div
      className={`d-none d-lg-block scrollbar sidebarNav ${openSidebar && "hide_sidebar"
        }`}
    >
      <div className="sidebar_wrapper">
        <div className={`${openSidebar ? "ml-3 mr-2" : "ml-3"} mb-1 sidebartopdiv wrapper`}>
          <Link href="/dashboard" className="wrapper  ">
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
        <ul className="list_wrapper">
          {dataItems.map((item: dataItemsTypes) => (
            <li
              className="sidebar-nav-item nonActive position-relative"
              key={item.name}
            >
              <Link href={item.link} className="color-black">
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
          {muyprojects.map((item: tempproject) => (
            <li
              className={` ${item.color === SelectedTab && "tabactive"} sidebar-nav-item px-2 nonActive justify-start wrapper position-relative`}
              key={item.name}
              onClick={
                () => setSelectedTab(item.color)
              }
            >
              <div className="myprojectcolor" style={{ background: item.color }} />
              <span className={`${item.color === SelectedTab && "text_primary"} projecttitle ms-2`}>
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
