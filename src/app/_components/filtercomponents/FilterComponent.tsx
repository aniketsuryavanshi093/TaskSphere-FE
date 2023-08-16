import React, { ReactNode } from "react";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";

type pageprops = {
  children: ReactNode,
  ToggleComponent: any,
  toggleClassname: string,
  openMenu: { open: boolean },
  menuclassname: string,
  setOpenMenu: (val: any) => void,
  onclickCloseMenu: boolean,
}

const FilterComponent: React.FC<pageprops> = ({
  children,
  ToggleComponent,
  toggleClassname,
  openMenu,
  menuclassname,
  setOpenMenu,
  onclickCloseMenu,
}) => {
  return (
    <Dropdown
      isOpen={openMenu.open}
      style={{ transform: 'none' }}
      toggle={() => setOpenMenu({ ...openMenu, open: !openMenu.open })}
      className="d-inline-block"
    >
      <DropdownToggle className="btn p-0 custom-dropdown" id={`dropdown-basic$}`}>
        <ToggleComponent />
      </DropdownToggle>
      <DropdownMenu
        onClick={() => {
          if (!onclickCloseMenu) {
            setTimeout(() => {
              setOpenMenu({ open: false });
            }, 200);
          }
        }} className='custonmenu'>
        {children}
      </DropdownMenu>
    </Dropdown>
  );
}

export default FilterComponent;
