import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import './CustomDropDownButton.css';
import Image from 'next/image';


export type optionstype = {
  label: string, value: string, img?: string
}

type Pageprops = {
  title?: string,
  Imptitle?: string,
  icon?: string,
  options: optionstype[],
  onDropdownSelect: (val: string) => void,
  defaultValue?: string,
  reset_value?: boolean
}

const CustomDropDownButton: React.FC<Pageprops> = ({
  title,
  Imptitle,
  icon,
  options,
  onDropdownSelect,
  defaultValue,
  reset_value,
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [ShowImpLable, setShowImpLable] = useState(defaultValue)
  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);
  const onSelect = (value: string, label: string) => {
    setShowImpLable(label)
    if (selectedValue !== '' && selectedValue === value) {
      setSelectedValue('');
      onDropdownSelect(value);
    } else {
      setSelectedValue(value);
      onDropdownSelect(value);
    }
  };
  const [Menu, setMenu] = useState<boolean>(false);
  return (
    <Dropdown
      isOpen={Menu}
      toggle={() => {
        setMenu(!Menu);
      }}
      style={{ transform: 'none' }}
      className={title === 'Filter' ? 'filterbox' : 'align-self-center dropdownwrapper px-0'}
    >
      <DropdownToggle className="btn custom-dropdown" id={`dropdown-basic${title}`}>
        {icon && (
          <Image
            className={title && 'mr-2 darkmode_icon'}
            src={icon}
            alt="Wallet"
            height={14}
            width={14}
          />
        )}
        {Imptitle && <span className="filter_label_imp align-middle">{Imptitle}</span>}
        {reset_value ? (
          <span className="filter_label align-middle">{title}</span>
        ) : (
          <span className="filter_label align-middle textcapitilize">{ShowImpLable || title}</span>
        )}
        <i className="fa-solid fa-chevron-down" />
      </DropdownToggle>
      <DropdownMenu className='custonmenu'>
        {options.map(({ label, value, img }: optionstype) => (
          <DropdownItem
            active={value === selectedValue}
            key={value}
            onClick={() => { value !== selectedValue && onSelect(value, label) }}
          >
            <div className="wrapper text_primary justify-content-between">
              {value === selectedValue && !reset_value ? (
                <>
                  {img && <Image src={img} alt={label} height={25} width={25} />}
                  <p className="check-selected">{label}</p>
                  <i className="fa-solid check-selected fa-check ms-2" />
                </>
              ) : (
                <>
                  {img && <Image src={img} alt={label} height={25} width={25} />}
                  <p className="check-selected">{label}</p></>
              )}
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default CustomDropDownButton;
