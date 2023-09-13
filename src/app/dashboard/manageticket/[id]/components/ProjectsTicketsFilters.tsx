import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from 'reactstrap'
import { useSession } from 'next-auth/react'
import { Field, Form, Formik } from 'formik'
import CustomDropDownButton, { optionstype } from '@/app/_components/CustomDropDownButton/CustomDropDownButton'
import FilterComponent from '@/app/_components/filtercomponents/FilterComponent'
import { CustomDateInput } from '@/lib/customcomponents/customComponents'
import { CurrentUserObjectType } from '@/commontypes'
import { label, priority } from '@/constants'
import generateURL from '@/lib/generateUrl'
import useTicketsQueryhook from '@/hooks/UseQuery/ticketmanagementhooks/useTicketsQueryhook'
import useGetProjectUsers from '@/hooks/UseQuery/UsersQueryHook/useGetProjectUsers'
import "./filtertickets.scss"
import { useAppDispatch, useAppSelector } from '@/redux/dashboardstore/hook'
import { setFilterURLValue } from '@/redux/dashboardstore/reducer/managetickets/manageticket'

const ProjectsTicketsFilters: React.FC<{ setloading: (e: boolean) => void, setTickets: (e: any) => void }> = ({ setloading, setTickets }) => {
    const [UsersList, setUsersList] = useState([{ value: "all", label: "all" }])
    const { filterURLValue } = useAppSelector((state) => state.manageticketreducer)
    const { data } = useSession()
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const { data: tickets, isLoading } = useTicketsQueryhook({ id, filterURLValue, frompage: true })
    useEffect(() => {
        setloading(isLoading)
        setTickets(tickets)
    }, [isLoading, setloading, tickets, setTickets])
    const options: optionstype[] = [{
        value: "myissue",
        label: "Only My Issue"
    }, {
        value: "allissue",
        label: "All Tasks"
    }, {
        value: "-1",
        label: "Latest issued"
    }, {
        value: "1",
        label: "Old issued"
    }]
    const { data: usersData, } = useGetProjectUsers(data, id)
    useEffect(() => {
        if (usersData?.data?.data?.members?.length) {
            setUsersList(usersData?.data?.data?.members.map((_user: CurrentUserObjectType) => ({
                value: _user._id, label: _user.name, name: _user.userName, img: _user.profilePic
            })))
        }
    }, [usersData])

    const [openFilter, setOpenFilter] = useState<{ open: boolean, data: { updatedDateTo: string, updatedDateFrom: string } }>({ open: false, data: { updatedDateTo: "", updatedDateFrom: "" } });
    const initialValueForFilter = {
        updatedDateFrom: openFilter?.data?.updatedDateFrom || '',
        updatedDateTo: openFilter?.data?.updatedDateTo || '',
    };
    const handleReset = () => {
        dispatch(setFilterURLValue({
            string: "", urlobject: {
                orderType: "", priority: "",
                userIds: "", label: ""
            }
        }))
    }
    return (
        <div className='wrapper justify-start'>
            <div className='wrapper filterwrapper'>
                <CustomDropDownButton
                    defaultValue="all"
                    selectedvalue={filterURLValue?.urlobject.orderType}
                    icon='/images/icons/filter.png'
                    onDropdownSelect={value => {
                        dispatch(setFilterURLValue({ string: generateURL({ ...filterURLValue?.urlobject, orderType: value }), urlobject: { ...filterURLValue?.urlobject, orderType: value } }))
                    }}
                    Imptitle='Filter :'
                    options={options}
                />
                <div className='mx-3'>
                    <CustomDropDownButton
                        defaultValue="all"
                        selectedvalue={filterURLValue?.urlobject.priority}
                        icon='/images/icons/filter.png'
                        onDropdownSelect={value => {
                            dispatch(setFilterURLValue({ string: generateURL({ ...filterURLValue?.urlobject, priority: value }), urlobject: { ...filterURLValue?.urlobject, priority: value } }))
                        }}
                        Imptitle='Priority :'
                        options={priority}
                    />
                </div>
                <div className='me-3'>
                    <CustomDropDownButton
                        selectedvalue={filterURLValue?.urlobject.label}
                        defaultValue=""
                        icon='/images/icons/filter.png'
                        onDropdownSelect={value =>
                            dispatch(setFilterURLValue({ string: generateURL({ ...filterURLValue?.urlobject, label: value }), urlobject: { ...filterURLValue?.urlobject, label: value } }))
                        }
                        Imptitle='Label :'
                        options={[{ value: "", label: "All" }, ...label]}
                    />
                </div>
                <CustomDropDownButton
                    selectedvalue={filterURLValue?.urlobject.userIds}
                    defaultValue="all"
                    icon='/images/icons/filter.png'
                    searchable
                    onDropdownSelect={value =>
                        dispatch(setFilterURLValue({ string: generateURL({ ...filterURLValue?.urlobject, userIds: value }), urlobject: { ...filterURLValue?.urlobject, userIds: value } }))
                    }
                    Imptitle='User :'
                    options={UsersList}
                />

                <div className='mx-3'>
                    <FilterComponent
                        ToggleComponent={ToggleComponent}
                        openMenu={openFilter}
                        menuclassname="sitesmenu"
                        toggleClassname="filtertogglebtn"
                        setOpenMenu={setOpenFilter}
                        onclickCloseMenu
                    >
                        <div className="p-2 sitesfilter text_primary">
                            <Formik
                                initialValues={initialValueForFilter}
                                enableReinitialize
                                onSubmit={(values, { resetForm }) => {
                                    console.log(values)
                                }}
                            >
                                {({ handleChange, values }) => (
                                    <Form>
                                        <label className="text_primary mb-1">Last Updated Range</label>
                                        <div className="d-flex align-items-center update_date_cont">
                                            <Field
                                                component={CustomDateInput}
                                                name="updatedDateFrom"
                                                withOutLabel
                                                max={values.updatedDateTo || new Date().toISOString().slice(0, -14)}
                                                placeholder="From"
                                                styleData="me-2"
                                            />
                                            <Field
                                                component={CustomDateInput}
                                                name="updatedDateTo"
                                                withOutLabel
                                                max={new Date().toISOString().slice(0, -14)}
                                                min={values.updatedDateFrom}
                                                placeholder="To"
                                            />
                                        </div>
                                        <div className=" d-flex mt-2">
                                            <Button type="button" className="cancel_btn px-5" onClick={handleReset}>
                                                Reset
                                            </Button>
                                            <Button color="primary" type="submit" className="btn-background px-5 ms-2">
                                                Apply
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </FilterComponent>
                </div>
                <div onClick={handleReset} className='wrapper hover-border-button cp'>
                    <i className="fa-solid fa-eraser"></i>
                    <p className='mb-0 mx-2'> clear </p>
                </div>
            </div>
        </div>
    )
}

export default ProjectsTicketsFilters

const ToggleComponent = () => (
    <div className="wrapper toggle_filter text_primary">
        <span className="mx-1">Filters</span>
        <i className="fa-solid fa-chevron-down" />
    </div>
);