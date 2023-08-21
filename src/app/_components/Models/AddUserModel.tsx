import React, { useEffect, useState } from 'react'
import makeAnimated from 'react-select/animated';
import Select, { createFilter } from 'react-select';
import CustomModal from './CustomModal'
import Image from 'next/image';
import { Button } from 'reactstrap';
import { selectUsers } from '@/commontypes';
import { useAppDispatch, useAppSelector } from '@/redux/dashboardstore/hook';
import { setAddedUsers } from '@/redux/dashboardstore/reducer/user/user';

const skills: selectUsers[] = [
    { value: 'jjrfn', label: 'Aayush' },
    { value: 'akdal', label: 'Saurabh' },
    { value: 'amdnajkn', label: 'Badal' },
    { value: 'oajkdnua', label: 'Shruti' },
    { label: 'Aniket', value: 'addga' },
    { label: 'somya ranjan', value: '78261hj2eu' },
    { label: 'kahan', value: '72ey1uind287' },
    { label: 'shaishav', value: 'a-=wd90iw' },
    { label: 'Parth patel', value: '8dyauihq78' }
];

const AddUserModel: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    const animatedComponents = makeAnimated();
    const dispatch = useAppDispatch()
    const { addedUsers } = useAppSelector((state) => state.userreducer)
    const [value, setValue] = useState<selectUsers[]>([]);
    useEffect(() => {
        if (addedUsers?.length) {
            setValue(addedUsers)
        }
    }, [addedUsers])

    const [skillslist] = useState(skills);
    const handleChange = (_, action) => {
        console.log(action);
        switch (action.action) {
            case 'select-option': {
                setValue([...value, action.option]);
                break;
            }
            case 'clear': {
                setValue([])
                break
            }
            default: {
                if (value) {
                    setValue([...value.filter((o) => o.value !== action?.removedValue?.value)]);
                } else {
                    setValue(skills);
                }
                break;
            }
        }
    };
    const handleSuggestedCLick = (appendee: selectUsers) => {
        if (!value.find(({ value }) => value === appendee.value)) {
            setValue([...value, appendee]);
        }
    };
    const handleAdd = () => {
        dispatch(setAddedUsers(value))
        onClose()
    }
    return (
        <CustomModal isOpen={isOpen} title="Add Users" onClose={onClose}>
            <div className='w-100 p-2'>
                <div className='select-wrapper'>
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        filterOption={createFilter({
                            matchFrom: 'any',
                            ignoreCase: true,
                            stringify: option => `${option.label}`,
                        })}
                        isMulti
                        placeholder="Select Member"
                        isSearchable
                        classNamePrefix="react-select-multi"
                        isClearable={true}
                        options={skillslist}
                        value={value}
                        onChange={handleChange}
                    />
                </div>
                <div className="skills_wrapper w-100 ">
                    <h5 className="mt-2">All Members</h5>
                    <div className=" suggesteeduser ">
                        {skills.map((elem: selectUsers) => (
                            <div
                                key={elem.label}
                                onClick={() => handleSuggestedCLick(elem)}
                                className=" my-2 py-1 no-wrap  userinfo  wrapper justify-content-between w-100">
                                <div className='wrapper justify-start'>
                                    <Image src={"/images/icons/userdummy.avif"} height={30} width={30} alt={elem.label} />
                                    <p className="mx-2">{elem.label}</p>
                                </div>
                                <i className="fa-solid fa-plus me-3 addhoverbtb"></i>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='wrapper justify-end mt-2' >
                    <Button onClick={handleAdd} color='primary' className='btn btn-primary'>Add</Button>
                    <Button onClick={onClose} className='btn btn-secondary ms-3'>Close</Button>
                </div>
            </div>
        </CustomModal >
    )
}

export default AddUserModel