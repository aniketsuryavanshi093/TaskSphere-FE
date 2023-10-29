"use client"
/* eslint-disable react/no-unescaped-entities */

import React, { useRef, useState, useCallback, useTransition, useEffect } from 'react'
import "../manageticket.scss"
import { Formik, Form, Field, FormikState } from 'formik'
import { createticketvalidation } from '@/lib/validations/AuthValidationsForm'
import { Button, Col, Label, Row, Spinner } from 'reactstrap'
import Select, { ActionMeta, createFilter } from 'react-select';
import JoditEditor from 'jodit-react';
import { CustomInput, CustomSelect } from '@/lib/customcomponents/customComponents'
import { useDropzone } from 'react-dropzone'
import { label, priority } from '@/constants'
import { GrProjects } from 'react-icons/gr'
import { useSession } from 'next-auth/react'
import { CurrentUserObjectType, projectTypes } from '@/commontypes'
import useGetAllOrganizationsProjecthook from '@/hooks/UseQuery/ProjectsQueryHooks/usegetAllOrganizationsProjecthook'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/lib/firebase'
import enqueSnackBar from '@/lib/enqueSnackBar'
import { createTicketAction } from '@/actions/authactions/ticketadminactions'
import CustomDropDownButton from '@/app/_components/CustomDropDownButton/CustomDropDownButton'
import useGetProjectsByUserhook from '@/hooks/UseQuery/ProjectsQueryHooks/useGetProjectsByUserhook'
import useGetProjectUsers from '@/hooks/UseQuery/UsersQueryHook/useGetProjectUsers'
import useGetProjectDetails from "@/hooks/UseQuery/ProjectsQueryHooks/useGetProjectDetails"
import { useSearchParams } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

type initialType = {
    "title": string,
    "description": string,
    "priority": string,
    "label": string
    ticketTag?: string,
    assignedTo: string,
    projectId: string | null,
    attachments?: { ext: string; name: string; url: string; }[],
}

const CreateTicket: React.FC = () => {
    const { data } = useSession()
    const searchParams = useSearchParams();
    const _project = searchParams.get('projectId')
    const [ProjectId, setProjectId] = useState(_project)
    const { data: projectusersData, } = useGetProjectUsers(data, ProjectId, true)
    const { data: projectDetail } = useGetProjectDetails(data, ProjectId || _project, true)
    const queryClient = useQueryClient()
    const { data: userproject } = useGetProjectsByUserhook(data)
    const { data: orgProjects, } = useGetAllOrganizationsProjecthook(data)
    const [isPending, startTransition] = useTransition()
    const [Loading, setLoading] = useState(false)
    const editor = useRef(null);
    const [UsersList, setUsersList] = useState<[{ value: string, label: string, name: string, img: string }]>();
    const [projectsList, setprojectsList] = useState([])
    const [attachments, setAttachments] = useState<FileList | File | any>([]);
    const initialValues: initialType = {
        "title": "",
        "description": "",
        "priority": "",
        "label": "",
        assignedTo: "", projectId: _project || ""
    }
    useEffect(() => {
        if (projectusersData?.data?.data?.members?.length) {
            const temp: [{ value: string, img?: string, label: string, name?: string }] = projectusersData?.data?.data?.members.map((_user: CurrentUserObjectType) => ({
                value: _user._id, label: _user.userName, name: _user.userName, img: _user.profilePic || "/images/icons/userdummy.avif"
            }))
            temp.push({
                value: projectusersData?.data?.data?.organizationId?._id, img: projectusersData?.data?.data?.organizationId?.profilePic || "/images/icons/userdummy.avif", label: projectusersData?.data?.data?.organizationId?.userName, name: projectusersData?.data?.data?.organizationId?.userName,
            })
            setUsersList(temp)
        }
    }, [projectusersData, ProjectId])

    useEffect(() => {
        if ((orgProjects || userproject)?.data?.data?.projects?.length as any) {
            setprojectsList((orgProjects || userproject)?.data?.data?.projects.map((_project: projectTypes) => ({
                value: _project._id, label: _project.title as string,
            })))
        }
    }, [orgProjects, userproject])
    const onDrop = useCallback(
        (acceptedFiles: FileList) => {
            if (acceptedFiles) {
                let tempdata: FileList | never | any = [...attachments];
                for (const i of Array.from(acceptedFiles)) {
                    if (!tempdata?.find((img: File) => img.size === i.size)) {
                        tempdata.push(i);
                    }
                }
                if (!attachments.length) {
                    tempdata = Array.from(acceptedFiles);
                }
                setAttachments(tempdata);
            }
        },
        [attachments]
    );
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    const handleRemove = (id: any) => {
        setAttachments(attachments.filter((elem: File) => elem.size !== id));
    };
    const handlCreateTicket = async (data: initialType, resetForm: (nextState?: Partial<FormikState<initialType>> | undefined) => void) => {
        try {
            const result = await createTicketAction(data) as { status: string, message: string }
            if (result?.status === "fail") {
                enqueSnackBar({ type: "error", message: result.message, })
                return
            }
            enqueSnackBar({ type: "success", message: "Ticket created Successfully!" })
            queryClient.invalidateQueries({ queryKey: ["tickets", ProjectId] })
            // queryClient.invalidateQueries({ queryKey: ["projectdetail", ProjectId] })
            resetForm()
        } catch (error) {
            console.log(error)
        }
    }
    const handleSubmit = async (values: initialType, resetForm: (nextState?: Partial<FormikState<initialType>> | undefined) => void) => {
        try {
            let attachmenturl: {
                ext: string,
                name: string,
                url: string,
            }[] = [];
            setLoading(true)
            if (attachments) {
                for await (const i of attachments) {
                    const imageref = ref(storage, `user/${i.name}`);
                    const uploadded = await uploadBytes(imageref, i, 'data_url');
                    const imaeurl = await getDownloadURL(uploadded?.ref);
                    attachmenturl.push({ name: i?.name, ext: i?.type, url: imaeurl });
                }
            }
            setLoading(false)
            const ticketTag = (orgProjects || userproject)?.data?.data?.projects?.find((el) => el._id === values.projectId)?.title?.substring(0, 3)?.toUpperCase() + "-" + projectDetail?.data?.data?.project?.ticketsCount
            startTransition(() => handlCreateTicket({
                ...values,
                ticketTag,
                "attachments": attachmenturl?.length ? attachmenturl : undefined,
            }, resetForm))
        } catch (error) {

        }
    }
    const handleChange = (data: { value: string }, action: ActionMeta<undefined>, setFieldValue: any, type: string) => {
        switch (action.action) {
            case 'select-option': {
                if (type === "projectId") {
                    setFieldValue("assignedTo", "")
                    setProjectId(data.value)
                }
                setFieldValue(type, data.value)
                break;
            }
            case 'clear': {
                if (type === "projectId") {
                    setFieldValue("assignedTo", "")
                    setUsersList([])
                    setProjectId("")
                }
                setFieldValue(type, "")
                break
            }
        }
    };
    return (
        <div>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={createticketvalidation}
                onSubmit={(value: initialType, { resetForm }) => {
                    handleSubmit(value, resetForm)
                }}
            >
                {({ values, setFieldValue, errors, touched }) => (
                    <Form className='mt-2' >
                        <Row className='w-100'>
                            <Col lg={8} sm={12}>
                                <div className="w-100 ">
                                    <Label className='mb-0' htmlFor="title">Ticket Title</Label>
                                    <Field
                                        type="text"
                                        component={CustomInput}
                                        styleData="w-100"
                                        inputClassName={`my-2`}
                                        id="title"
                                        name="title"
                                        placeholder="Ticket title"
                                    />
                                </div>
                                <div className="w-100 ">
                                    <Label className='mb-0' htmlFor="title">Ticket Description</Label>
                                    <JoditEditor
                                        ref={editor}
                                        value={values?.description}
                                        tabIndex={1} // tabIndex of textarea
                                        onBlur={(newContent) => setFieldValue('description', newContent)}
                                    />
                                    {
                                        errors.description && touched.description && (
                                            <div className="invalid-feedback d-block mb-1">{errors.description}</div>
                                        )
                                    }
                                </div>
                                <div className='wrapper align-items-end justify-between'>
                                    <Row className='wrapper justify-start w-100'>
                                        <Col lg={4} className=" mt-4">
                                            <Label className='mb-0' htmlFor="priority">Priority</Label>
                                            <CustomDropDownButton
                                                onselectIcon
                                                classname='selectticket' Imptitle="Priority"
                                                onDropdownSelect={value =>
                                                    setFieldValue('priority', value)
                                                }
                                                options={priority}
                                            />
                                        </Col>
                                        <Col lg={4} className="  mx-2 mt-4">
                                            <Label className='mb-0' htmlFor="priority">Label</Label>
                                            <Field
                                                type="select"
                                                component={CustomSelect}
                                                styleData="selecttabtciket"
                                                inputClassName={`my-2 selectticket`}
                                                id="label"
                                                data={label}
                                                name="label"
                                            />
                                        </Col>
                                    </Row>
                                    <Button type='submit' className=' ticktcreatebtn mb-2 ' >
                                        <div className='wrapper'>
                                            <GrProjects className='addicon' />
                                            <span className='btntext ms-3'>{isPending || Loading ? <Spinner size="sm" /> : "Create"}</span>
                                        </div>
                                    </Button>
                                </div>
                            </Col>
                            <Col lg={4}>
                                <div className=" w-100">
                                    <Label className='mb-2'>Attachments</Label>
                                    <div className='w-100 wrapper justify-between'>
                                        <div className='wrapper justify-start align-start w-100 flex-column'>
                                            <div
                                                className={`dropCOntainer ${isDragActive && 'draging'} `}
                                                {...getRootProps()}>
                                                <input multiple  {...getInputProps()} />
                                                {isDragActive ? (
                                                    <p className="text_muted text-center dragtext w-100 mb-0 text-bold ">
                                                        Drop the Attachments here ...
                                                    </p>
                                                ) : (
                                                    <p className="text_muted text-center dragtext w-100 mb-0 text-bold ">
                                                        Drag 'n' drop Ticket attachments here!
                                                    </p>
                                                )}
                                            </div>
                                            <div className="wrapper ms-2 flex-wrap justify-content-start">
                                                {attachments?.map((elem: File) => (
                                                    <div key={elem.name} className="wrapper">
                                                        <p className="text_primary  mb-0">{elem.name}</p>
                                                        <i
                                                            onClick={() => handleRemove(elem.size)}
                                                            className="fa-solid fa-xmark mx-2 closemarkx cp"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-100 p-2'>
                                    <Label className='mb-2' >Project</Label>
                                    <Select
                                        closeMenuOnSelect={true}
                                        filterOption={createFilter({
                                            matchFrom: 'any',
                                            ignoreCase: true,
                                            stringify: option => `${option.label}`,
                                        })}
                                        placeholder="Select Project"
                                        isSearchable
                                        classNamePrefix="react-select-multi"
                                        isClearable={true}
                                        options={projectsList}
                                        value={projectsList?.find((elem) => elem.value === ProjectId)}
                                        name='projectId'
                                        onChange={(e, action) => {
                                            handleChange(e, action, setFieldValue, "projectId")
                                        }}
                                    />
                                    {
                                        errors.projectId && touched.projectId && (
                                            <div className="invalid-feedback d-block mb-1">{errors.projectId}</div>
                                        )
                                    }
                                </div>
                                <div className='w-100 p-2 mt-4'>
                                    {values.assignedTo ? null : <p className='infotext mb-0'>Please select project first to assign user!</p>}
                                    <Label className='mb-2' >Assign To</Label>
                                    <Select
                                        closeMenuOnSelect={true}
                                        filterOption={createFilter({
                                            matchFrom: 'any',
                                            ignoreCase: true,
                                            stringify: option => `${option.label}${option.name}`,
                                        })}
                                        placeholder="Select Member"
                                        value={UsersList?.find(elem => elem.value === values.assignedTo) || {}}
                                        isSearchable
                                        isDisabled={!values.projectId}
                                        classNamePrefix="react-select-multi"
                                        isClearable={true}
                                        options={UsersList}
                                        name='assignedTo'
                                        onChange={(e, action) => {
                                            handleChange(e, action, setFieldValue, "assignedTo")
                                        }}
                                    />
                                    {
                                        errors.assignedTo && touched.assignedTo && (
                                            <div className="invalid-feedback d-block mb-1">{errors.assignedTo}</div>
                                        )
                                    }
                                </div>

                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CreateTicket