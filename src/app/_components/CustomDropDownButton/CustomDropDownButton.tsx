import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import './CustomDropDownButton.css';
import Image from 'next/image';
import Search from '../Search/Search';


export type optionstype = {
  label: string, value: string, img?: string
}

type Pageprops = {
  title?: string,
  Imptitle?: string,
  icon?: string,
  options: optionstype[],
  selectedvalue?: string,
  classname?: string,
  searchable?: boolean,
  onDropdownSelect: (val: string) => void,
  defaultValue?: string,
  reset_value?: boolean
}
const CustomDropDownButton: React.FC<Pageprops> = ({
  title,
  Imptitle,
  icon, classname,
  options, selectedvalue,
  onDropdownSelect, searchable,
  defaultValue,
  reset_value,
}) => {
  const [selectedValue, setSelectedValue] = useState(selectedvalue);
  const [ShowImpLable, setShowImpLable] = useState("All")
  const [_options, setoptions] = useState<optionstype[]>(options)
  useEffect(() => {
    if (selectedvalue === "") {
      setShowImpLable("All");
    }
  }, [selectedvalue])
  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);
  useEffect(() => {
    setoptions(options)
  }, [options])
  const onSelect = (value: string, label: string) => {
    setShowImpLable(label)
    if (selectedValue !== '' && selectedValue === value) {
      setSelectedValue('');
      onDropdownSelect(value);
    } else {
      setSelectedValue(value);
      onDropdownSelect(value);
    }
    setoptions(options)
  };
  const [Menu, setMenu] = useState<boolean>(false);
  const handleSearch = (e: string) => {
    if (e) {
      setoptions(options.filter((elem) => elem.label.includes(e)) || [])
    } else {
      setoptions(options)
    }
  }
  return (
    <Dropdown
      isOpen={Menu}
      toggle={() => {
        setoptions(options)
        setMenu(!Menu);
      }}
      style={{ transform: 'none' }}
      className={title === 'Filter' ? 'filterbox' : 'align-self-center dropdownwrapper px-0'}
    >
      <DropdownToggle className={`btn custom-dropdown ${classname || ""} `} id={`dropdown-basic${title}`}>

        <div className='wrapper justify-between w-100'>
          <div className='wrapper '>
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
          </div>
          <i className="fa-solid fa-chevron-down" />
        </div>

      </DropdownToggle>
      <DropdownMenu className='custonmenu'>
        {
          searchable && (
            <Search searchiconclass="dropdownsearchicon" inpClassname="dropdownsearch" placeholder="Search user" setValue={handleSearch} minSearchChar={0} waitTime={2}></Search>
          )
        }
        {_options.map(({ label, value, img }: optionstype) => (
          <DropdownItem
            active={value === selectedValue}
            key={value}
            onClick={() => { value !== selectedValue && onSelect(value, label) }}
          >
            <div className="wrapper text_primary justify-content-between">
              {value === selectedValue && !reset_value ? (
                <>
                  <div className='wrapper justify-start'>
                    {img && <Image src={img} alt={label} height={25} width={25} />}
                    <p className="check-selected mx-2">{label}</p>
                  </div>
                  <i className="fa-solid check-selected fa-check ms-2" />
                </>
              ) : (
                < div className='wrapper justify-start'>
                  {img && <Image src={img} alt={label} height={25} width={25} />}
                  <p className="check-selected mx-2">{label}</p></div>
              )}
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default CustomDropDownButton;
