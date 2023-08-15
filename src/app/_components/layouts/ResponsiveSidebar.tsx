'use client'
import React, { useEffect, useRef } from 'react';
import { Col, Row } from 'reactstrap';
// // static import
import { dataItemsTypes } from '@/commontypes';
import './style.scss';
import { dataItems } from '@/constants';
import Link from 'next/link';

type pageProps = {
  openMobileSidebar: boolean, setOpenMobileSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const ResponsiveSidebar: React.FC<pageProps> = ({ openMobileSidebar, setOpenMobileSidebar }) => {
  const outsideRef = useRef<any>(null);
  const handelToggle = (e: any) => {
    if (!outsideRef?.current?.contains(e?.target)) {
      setOpenMobileSidebar(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handelToggle, true);
  }, []);
  return (
    <div
      className="d-lg-none responsive_sidebar_hero"
      ref={outsideRef}
      style={{ left: openMobileSidebar ? 0 : '-100%' }}
    >
      {/* <div className="top_bar">
        <div className="profile_pic_container">
          <img
            src='./images/taskpherelogo.png'
            alt="profile pic"
            className="img-fluid"
          />
          <img
            src={EDIT_ICON}
            alt="edit icon"
            className="img-fluid edit_icon"
            onClick={() => {
              navigate('/edit');
              setOpenMobileSidebar(false);
            }}
          />
        </div>
        <div className="me-3">
          <h5 className="fw-bold text-black">
            {UserData?.attributes && UserData?.attributes['custom:first_name']}
            {UserData?.attributes && ` ${UserData?.attributes['custom:last_name']}`}
          </h5>
          <h6 className="text-black text-break">{UserData && UserData?.attributes?.email}</h6>
          <h6 className="text-black">{UserData && UserData?.attributes?.phone_number}</h6>
        </div>
      </div> */}
      <Row>
        <Col>
          <ul className="">
            {dataItems.map((item: dataItemsTypes) => (
              <li className="" key={item.name} onClick={() => setOpenMobileSidebar(false)}>
                <Link href={item.link} className="color-black">
                  <i className={item.logo} />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
            <li className="color-black ">
              <span
                className="cp"
                onClick={() => {
                  localStorage.clear();
                  sessionStorage.clear();
                  window.location.reload();
                }}
              >
                Logout
              </span>
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
}

export default ResponsiveSidebar;
