import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from 'reactstrap'
import { useSession } from 'next-auth/react'
import { Field, Form, Formik } from 'formik'
import CustomDropDownButton, { optionstype } from '@/app/_components/CustomDropDownButton/CustomDropDownButton'
import FilterComponent from '@/app/_components/filtercomponents/FilterComponent'
import { CustomDateInput } from '@/lib/customcomponents/customComponents'
import { CurrentUserObjectType } from '@/commontypes'
import { label, priority, ticketfilter } from '@/constants'
import generateURL from '@/lib/generateUrl'
import useTicketsQueryhook from '@/hooks/UseQuery/ticketmanagementhooks/useTicketsQueryhook'
import useGetProjectUsers from '@/hooks/UseQuery/UsersQueryHook/useGetProjectUsers'
import "./filtertickets.scss"
import { useAppDispatch, useAppSelector } from '@/redux/dashboardstore/hook'
import { setFilterURLValue } from '@/redux/dashboardstore/reducer/managetickets/manageticket'

const ProjectsTicketsFilters: React.FC<{ setloading: (e: boolean) => void, type: string, setTickets: (e: any) => void }> = ({ setloading, setTickets, type }) => {
    const [UsersList, setUsersList] = useState([{ value: "all", label: "all" }])
    const { filterURLValue } = useAppSelector((state) => state.manageticketreducer)
    const { data } = useSession()
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const { data: tickets, isLoading } = useTicketsQueryhook({ id, filterURLValue: `${filterURLValue.string}${type === "project" && data?.user.role !== "organization" ? "&isforUser=true" : ""}`, frompage: true })
    useEffect(() => {
        setloading(isLoading)
        setTickets(tickets)
    }, [isLoading, setloading, tickets, setTickets])
    const options: optionstype[] = type !== "project" ? ticketfilter.filter((elem) => elem.value !== "isforUser") : ticketfilter
    const { data: usersData, } = useGetProjectUsers(data, id, type !== "project")
    useEffect(() => {
        if (usersData?.data?.data?.members?.length) {
            const temp: [{ value: string, img?: string, label: string, name?: string }] = usersData?.data?.data?.members.map((_user: CurrentUserObjectType) => ({
                value: _user._id, label: _user.userName, name: _user.userName, img: _user.profilePic || "/images/icons/userdummy.avif"
            }))
            temp.push({
                value: usersData?.data?.data?.organizationId?._id, img: usersData?.data?.data?.organizationId?.profilePic || "/images/icons/userdummy.avif", label: usersData?.data?.data?.organizationId?.userName, name: usersData?.data?.data?.organizationId?.userName,
            })
            setUsersList(temp)
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
                userIds: "", label: "",
            }
        }))
    }
  const handleFilter = (value: any) => {
    dispatch(
      setFilterURLValue({
        string: generateURL({
          ...filterURLValue?.urlobject,
          orderType:
            type === "project" ? (value === "isforUser" ? "" : value) : value,
        }),
        urlobject: {
          ...filterURLValue?.urlobject,
          orderType:
            type === "project" ? (value === "isforUser" ? "" : value) : value,
        },
      })
    );
  };

    return (
        <div className='wrapper justify-start'>
            <div className='wrapper filterwrapper'>
                <CustomDropDownButton
                    defaultValue={type == 'project' ? 'isforUser' : ""}
                    selectedvalue={filterURLValue?.urlobject.orderType}
                    icon='/images/icons/filter.png'
                    onDropdownSelect={handleFilter}
                    Imptitle='Filter :'
                    options={[{ value: "", label: "All" }, ...options]}
                />
                <div className='mx-3'>
                    <CustomDropDownButton
                        defaultValue=""
                        selectedvalue={filterURLValue?.urlobject.priority}
                        icon='/images/icons/filter.png' onselectIcon
                        onDropdownSelect={value => {
                            dispatch(setFilterURLValue({ string: generateURL({ ...filterURLValue?.urlobject, priority: value }), urlobject: { ...filterURLValue?.urlobject, priority: value } }))
                        }}
                        Imptitle='Priority :'
                        options={[{ value: "", label: "All" }, ...priority]}
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
                {
                    type === "manageticket" && (
                        <CustomDropDownButton
                            selectedvalue={filterURLValue?.urlobject.userIds}
                            defaultValue="all"
                            icon='/images/icons/filter.png'
                            searchable
                            onDropdownSelect={value =>
                                dispatch(setFilterURLValue({ string: generateURL({ ...filterURLValue?.urlobject, userIds: value }), urlobject: { ...filterURLValue?.urlobject, userIds: value } }))
                            }
                            Imptitle='User :' onselectIcon
                            options={UsersList}
                        />
                    )
                }

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