import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import React, { useState } from 'react'
import Link from 'next/link';
const ProfileMenu: React.FC = () => {
    const { data, } = useSession()
    const [Menu, setMenu] = useState<boolean>(false);
    const handleLogout = async () => {
        signOut()
    };
    return (
        <Dropdown
            isOpen={Menu}
            toggle={() => {
                setMenu(!Menu);
            }}
            className="d-inline-block"
        >
            <DropdownToggle
                className="togglebtn header-item pe-0 waves-effect"
                id="page-header-user-dropdown"
                tag="button"
            >
                <div className='wrapper '>
                    <div className='wrapper'>
                        <p className='mb-0 topnavusername text_primary' >{data?.user?.userName}</p>
                    </div>
                    <div className='wrapper'>
                        <Image src={data?.user?.profilePic || "/images/icons/userdummy.avif"} alt='userprofile' height={47} width={47} className='mx-2 rounded-pill' />
                        <Image src={"/images/icons/arrow-down.png"} alt='arrow-=down' height={15} width={15} />
                    </div>
                </div>
            </DropdownToggle>
            <DropdownMenu
                className="dropdown-menu-end second_primary_background"
                id="profile_dropdown_menu"
            >
                <Link prefetch={false} href="/dashboard/profile">
                    <DropdownItem tag="span" className="text_primary profile_dropdown_menu_item">
                        <i className="uil uil-user-circle font-size-18 align-middle me-2" />
                        Profile
                    </DropdownItem>
                </Link>
                <button
                    type="button"
                    onClick={handleLogout}
                    className="dropdown-item text_primary profile_dropdown_menu_item"
                >
                    <i className="uil uil-sign-out-alt font-size-18 align-middle me-2" />
                    Logout
                </button>
            </DropdownMenu>
        </Dropdown>
    )
}
export default ProfileMenu