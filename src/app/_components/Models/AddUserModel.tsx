import React, { useEffect, useState } from 'react'
import makeAnimated from 'react-select/animated';
import Select, { createFilter } from 'react-select';
import CustomModal from './CustomModal'
import Image from 'next/image';
import { Button } from 'reactstrap';
import { CurrentUserObjectType, selectUsers } from '@/commontypes';
import { useAppDispatch, useAppSelector } from '@/redux/dashboardstore/hook';
import { setAddedUsers } from '@/redux/dashboardstore/reducer/user/user';
import useGetAllOrganizationUser from '@/hooks/UseQuery/UsersQueryHook/useGetAllOrganizationUser';
import { useSession } from 'next-auth/react';

const AddUserModel: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    const [userlist, setUsersList] = useState<selectUsers[]>([]);
    const { data } = useSession()
    const { data: usersData, isLoading } = useGetAllOrganizationUser(data)
    const animatedComponents = makeAnimated();
    const dispatch = useAppDispatch()
    const { addedUsers } = useAppSelector((state) => state.userreducer)
    const [value, setValue] = useState<selectUsers[]>([]);
    useEffect(() => {
        if (addedUsers?.length) {
            setValue(addedUsers)
        }
    }, [addedUsers])
    useEffect(() => {
        if (usersData?.data?.data?.members?.length) {
            setUsersList(usersData?.data?.data?.members.map((_user: CurrentUserObjectType) => ({
                value: _user._id, label: _user.name, name: _user.userName
            })))
        }
    }, [usersData])
    const handleChange = (_, action) => {
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
                    setValue(user);
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
                            stringify: option => `${option.label}${option.name}`,
                        })}
                        isMulti
                        placeholder="Select Member"
                        isSearchable
                        classNamePrefix="react-select-multi"
                        isClearable={true}
                        options={userlist}
                        value={value}
                        onChange={handleChange}
                    />
                </div>
                <div className="skills_wrapper w-100 ">
                    <h5 className="mt-2">All Members</h5>
                    <div className=" suggesteeduser ">
                        {userlist.map((elem: selectUsers) => (
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