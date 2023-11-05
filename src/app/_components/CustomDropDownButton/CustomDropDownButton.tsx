import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import './CustomDropDownButton.css';
import Image from 'next/image';
import Search from '../Search/Search';


export type optionstype = {
  label: string, value: string, img?: string, color?: string
}

type Pageprops = {
  title?: string,
  Imptitle?: string,
  icon?: string,
  options: optionstype[],
  onselectIcon?: boolean
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
  options, selectedvalue, onselectIcon,
  onDropdownSelect, searchable,
  defaultValue,
  reset_value,
}) => {
  const [selectedValue, setSelectedValue] = useState(selectedvalue);
  const [ShowImpLable, setShowImpLable] = useState<string | undefined>("")
  const [StatusCOlor, setStatusCOlor] = useState<string | undefined>("")
  const [_options, setoptions] = useState<optionstype[]>(options)
  useEffect(() => {
    if (selectedvalue === "") {
      setShowImpLable("All");
      setSelectedValue("")
    }
  }, [selectedvalue])
  useEffect(() => {
    if (defaultValue) {
      console.log(_options, defaultValue);

      setShowImpLable(_options.find(({ value }: optionstype) => value === defaultValue)?.label)
      setStatusCOlor(_options.find(({ value }: optionstype) => value === defaultValue)?.color)
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);
  useEffect(() => {
    setoptions(options)
  }, [options])
  const onSelect = (value: string, label: string, color?: string) => {
    setShowImpLable(label)
    if (color) {
      setStatusCOlor(color)
    }
    if (selectedValue !== '' && selectedValue === value) {
      setSelectedValue('');
      onDropdownSelect(value);
    } else {
      setSelectedValue(value);
      onDropdownSelect(value);
    }
    setoptions(options)
  };
  // console.log("ShowImpLable", ShowImpLable);

  const [Menu, setMenu] = useState<boolean>(false);
  const handleSearch = (e: string) => {
    if (e) {
      setoptions(options.filter((elem) => elem.label.includes(e)) || [])
    } else {
      setoptions(options)
    }
  }

  useEffect(() => {
    if (StatusCOlor) {
      let ele = document.getElementById(`dropdown-basic${defaultValue || selectedValue}`)
      if (ele) {
        ele.style.setProperty('background-color', StatusCOlor, 'important')
      }
    }
  }, [StatusCOlor])
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
      <DropdownToggle className={`btn custom-dropdown ${classname || ""} `} id={`dropdown-basic${defaultValue || selectedValue}`}>
        <div className='wrapper justify-between w-100'>
          <div className='wrapper '>
            {icon && (
              <Image
                className={'me-2 darkmode_icon'}
                src={icon}
                alt="Wallet"
                height={14}
                width={14}
              />
            )}
            {Imptitle && <span className="filter_label_imp align-middle me-2">{Imptitle}</span>}
            {reset_value ? (
              <span className="filter_label align-middle">{title}</span>
            ) : (
              <div className='wrapper justify-start'>
                {onselectIcon && options.find((el) => el.value === selectedValue)?.img && <Image src={options.find((el) => el.value === selectedValue)?.img as string} alt="xyz" className='me-2 rounded-pill' height={20} width={20} />}
                <span className="filter_laebl align-middle textcapitilize">
                  {ShowImpLable || title}</span>
              </div>
            )}
          </div>
          <i className=" fa-solid fa-chevron-down" />
        </div>

      </DropdownToggle>
      <DropdownMenu className='custonmenu'>
        {
          searchable && (
            <Search searchiconclass="dropdownsearchicon" inpClassname="dropdownsearch" placeholder="Search user" setValue={handleSearch} minSearchChar={0} waitTime={2}></Search>
          )
        }
        {_options.map(({ label, value, img, color }: optionstype) => (
          <DropdownItem
            active={value === selectedValue}
            key={value}
            onClick={() => { value !== selectedValue && onSelect(value, label, color) }}
          >
            <div className="wrapper text_primary justify-content-between">
              {value === selectedValue && !reset_value ? (
                <>
                  <div className='wrapper justify-start'>
                    {img && <Image src={img || "/images/icons/userdummy.avif"} className='rounded-pill' alt={label} height={25} width={25} />}
                    <p className="check-selected mx-2">{label}</p>
                  </div>
                  <i className="fa-solid check-selected fa-check ms-2" />
                </>
              ) : (
                < div className='wrapper justify-start'>
                  {img && <Image src={img || "/images/icons/userdummy.avif"} className='rounded-pill' alt={label} height={25} width={25} />}
                  <p className="check-selected mx-2">{label}</p></div>
              )}
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default React.memo(CustomDropDownButton);
