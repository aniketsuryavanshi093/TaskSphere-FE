"use client"
import React, { useState } from 'react'
import "./projectpage.scss"
import Image from 'next/image'
import CustomDropDownButton, { optionstype } from '@/app/_components/CustomDropDownButton/CustomDropDownButton'
import FilterComponent from '@/app/_components/filtercomponents/FilterComponent'
import { Formik, Form, Field } from 'formik'
import { Button } from 'reactstrap'
import { CustomDateInput } from '@/lib/customcomponents/customComponents'
import { useSession } from 'next-auth/react'
import { Administratortype } from '@/constants'

const ProjectPage = () => {
    const options: optionstype[] = [{
        value: "myissue",
        label: "Only My Issue"
    }, {
        value: "allissue",
        label: "All Tasks"
    }]
    const { data } = useSession()
    const [openFilter, setOpenFilter] = useState<{ open: boolean, data: { updatedDateTo: string, updatedDateFrom: string } }>({ open: false, data: { updatedDateTo: "", updatedDateFrom: "" } });
    const initialValueForFilter = {
        updatedDateFrom: openFilter?.data?.updatedDateFrom || '',
        updatedDateTo: openFilter?.data?.updatedDateTo || '',
    };
    const handleReset = () => {

    }
    return (
        <div>
            <div className='wrapper justify-between w-100'>
                <h4 className='projecttitlep mb-0'>
                    Mobile App
                </h4>
                <div className='wrapper'>
                    {
                        Administratortype.includes(data?.user?.role) && (
                            <div className='invitebtn me-3'>
                                <Image height={18} width={18} alt="invitentn" className='me-2' src="/images/icons/add-square.svg" />
                                <span>Invite</span>
                            </div>
                        )
                    }
                    <div className='wrapper position-relative'>
                        {
                            Array(4).fill(0).map((_, index) => (
                                <div key={index} className='userimagediv  position-relative' style={{ right: index > 0 ? `${5 * index}px` : "" }}>
                                    <Image src="/images/icons/userdummy.avif" height={38} width={38} alt='users' />
                                </div>
                            ))
                        }
                        <div className='userimagediv wrapper position-relative' style={{ right: `20px` }}>
                            <span>+2</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='wrapper justify-start'>
                <div className='wrapper filterwrapper'>
                    <CustomDropDownButton
                        defaultValue="all"
                        icon='/images/icons/filter.png'
                        onDropdownSelect={value =>
                            console.log(value)
                        }
                        Imptitle='Filter :'
                        options={options}
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
                </div>
            </div>
        </div>
    )
}

export default ProjectPage

const ToggleComponent = () => (
    <div className="wrapper toggle_filter text_primary">
        <span className="mx-1">Filters</span>
        <i className="fa-solid fa-chevron-down" />
    </div>
);