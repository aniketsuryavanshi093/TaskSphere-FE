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
import useGetAllOrganizationUser from '@/hooks/UseQuery/UsersQueryHook/useGetAllOrganizationUser'
import { useSession } from 'next-auth/react'
import { CurrentUserObjectType, projectTypes } from '@/commontypes'
import useGetAllOrganizationsProjecthook from '@/hooks/UseQuery/ProjectsQueryHooks/usegetAllOrganizationsProjecthook'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/lib/firebase'
import enqueSnackBar from '@/lib/enqueSnackBar'
import { createTicketAction } from '@/actions/authactions/ticketadminactions'

type initialType = {
    "title": string,
    "description": string,
    "priority": string,
    "label": string
    assignedTo: string,
    projectId: '',
    attachments?: { ext: string; name: string; url: string; }[],
}

const CreateTicket: React.FC = () => {
    const { data } = useSession()
    const { data: usersData, } = useGetAllOrganizationUser(data)
    const { data: orgProjects, } = useGetAllOrganizationsProjecthook(data)
    const [isPending, startTransition] = useTransition()
    const [Loading, setLoading] = useState(false)
    const editor = useRef(null);
    const [UsersList, setUsersList] = useState([])
    const [projectsList, setprojectsList] = useState([])
    const [attachments, setAttachments] = useState<FileList | File | any>([]);
    const initialValues: initialType = {
        "title": "",
        "description": "",
        "priority": "",
        "label": "",
        assignedTo: "", projectId: ""
    }
    useEffect(() => {
        if (usersData?.data?.data?.members?.length) {
            setUsersList(usersData?.data?.data?.members.map((_user: CurrentUserObjectType) => ({
                value: _user._id, label: _user.name, name: _user.userName, profilePic: _user.profilePic
            })))
        }
    }, [usersData])
    useEffect(() => {
        if (orgProjects?.data?.data?.projects?.length as any) {
            setprojectsList(orgProjects?.data?.data?.projects.map((_project: projectTypes) => ({
                value: _project._id, label: _project.title as string,
            })))
        }
    }, [orgProjects])

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
            console.log(attachmenturl);
            setLoading(false)
            startTransition(() => handlCreateTicket({
                ...values,
                "attachments": attachmenturl?.length ? attachmenturl : undefined,
            }, resetForm))
        } catch (error) {

        }
    }
    const handleChange = (data: { value: string }, action: ActionMeta<undefined>, setFieldValue: any, type: string) => {
        switch (action.action) {
            case 'select-option': {
                setFieldValue(type, data.value)
                break;
            }
            case 'clear': {
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
                                            <Field
                                                type="select"
                                                component={CustomSelect}
                                                styleData="selecttabtciket"
                                                inputClassName={`my-2 selectticket`}
                                                id="priority"
                                                data={priority}
                                                name="priority"
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
                                    <Label className='mb-2' >Assign To</Label>
                                    <Select
                                        closeMenuOnSelect={false}
                                        filterOption={createFilter({
                                            matchFrom: 'any',
                                            ignoreCase: true,
                                            stringify: option => `${option.label}${option.name}`,
                                        })}
                                        placeholder="Select Member"
                                        isSearchable
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
                                <div className='w-100 p-2'>
                                    <Label className='mb-2' >Project</Label>
                                    <Select
                                        closeMenuOnSelect={false}
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
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CreateTicket