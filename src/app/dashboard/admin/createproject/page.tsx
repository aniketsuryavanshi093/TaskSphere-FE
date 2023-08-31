"use client"
/* eslint-disable react/no-unescaped-entities */
import React, { useCallback, useState, useTransition } from 'react'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Field, Form, Formik, FormikState } from 'formik';
import { useDropzone } from 'react-dropzone';
import { createProjectvalidation } from '@/lib/validations/AuthValidationsForm';
import { CustomInput, CustomTextArea } from '@/lib/customcomponents/customComponents';
import { storage } from '@/lib/firebase';
import "./createproject.scss"
import { GrProjects } from 'react-icons/gr';
import { Button, Col, Label, Row, Spinner } from 'reactstrap';
import Image from 'next/image';
import { AiOutlineUserAdd } from 'react-icons/ai';
import AddUserModel from '@/app/_components/Models/AddUserModel';
import { selectUsers } from '@/commontypes';
import { useAppSelector } from '@/redux/dashboardstore/hook';
import { useSession } from 'next-auth/react';
import enqueSnackBar from '@/lib/enqueSnackBar';
import GoBack from '@/app/_components/UI/GoBack';
import { createProjectaction } from '@/actions/authactions/adminaction';

type initialType = { title: string, description: string }

const AdminCreateProject = () => {
    const [isPending, startTransition] = useTransition()
    const [Loading, setLoading] = useState(false)
    const [AdduserModal, setAddUserModal] = useState<{ open: boolean }>({ open: false })
    const [PreviewUrl, setPreviewUrl] = useState<string>("")
    const { addedUsers } = useAppSelector((state) => state.userreducer)
    const [attachments, setAttachments] = useState<FileList | File | any>([]);
    const onDrop = useCallback(
        (acceptedFiles: FileList) => {
            if (acceptedFiles) {
                const objurl = URL.createObjectURL(acceptedFiles[0] as unknown as Blob);
                setPreviewUrl(objurl);
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
    const initialValues: initialType = {
        title: '',
        description: '',
    }
    const handleRemove = (id: any) => {
        setAttachments(attachments.filter((elem: File) => elem.size !== id));
    };
    const handlCreateProject = async (val: any, resetForm: (nextState?: Partial<FormikState<initialType>> | undefined) => void) => {
        try {
            const result = await createProjectaction(val) as { status: string, message: string }
            if (result?.status === "fail") {
                enqueSnackBar({ type: "error", message: result.message, })
                return
            }
            enqueSnackBar({ type: "success", message: "Project created Successfully!" })
            resetForm()
        } catch (error) {
            console.log(error)
        }
    }
    const handleSubmit = async (value: initialType, resetForm: (nextState?: Partial<FormikState<initialType>> | undefined) => void) => {
        try {
            let attachmenturl: { url: string }[] = [];
            setLoading(true)
            if (attachments) {
                for await (const i of attachments) {
                    const imageref = ref(storage, `user/${i.name}`);
                    const uploadded = await uploadBytes(imageref, i, 'data_url');
                    const imaeurl = await getDownloadURL(uploadded?.ref);
                    console.log(imaeurl);
                    attachmenturl.push({ url: imaeurl });
                }
            }
            setLoading(false)
            startTransition(() => handlCreateProject({
                "title": value.title,
                "logoUrl": attachmenturl[0]?.url || undefined,
                "members": addedUsers?.length ? addedUsers.map((elem) => elem.value) : undefined,
                "description": value.description
            }, resetForm))
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <GoBack />
            <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={createProjectvalidation}
                onSubmit={(value: initialType, { resetForm }) => {
                    handleSubmit(value, resetForm)
                }}
            >
                {({ values }) => (
                    <Form >
                        <Row className='w-100'>
                            <Col lg={7}>
                                <div className="wrapper mx-3 flex-column">
                                    <div className="w-100 ">
                                        <Label className='mb-0' htmlFor="title">Project Title</Label>
                                        <Field
                                            type="text"
                                            component={CustomInput}
                                            styleData="createprojectinp"
                                            inputClassName={`my-2  `}
                                            id="title"
                                            name="title"
                                            placeholder="Project title"
                                        />
                                    </div>
                                    <div className="w-100">
                                        <Label className='mb-0' htmlFor="description">Project Description</Label>
                                        <Field
                                            type="text"
                                            component={CustomTextArea}
                                            styleData="createprojectinp"
                                            inputClassName={`my-2  `}
                                            id="description"
                                            name="description"
                                            placeholder="Project description"
                                        />
                                    </div>
                                    <div className="my-3 w-100">
                                        <Label className='mb-2' >Project Logo</Label>
                                        <div className='w-100 wrapper justify-between'>
                                            <div className='wrapper justify-start align-start w-100 flex-column'>
                                                <div
                                                    className={`dropCOntainer ${isDragActive && 'draging'} `}
                                                    {...getRootProps()}>
                                                    <input  {...getInputProps()} />
                                                    {isDragActive ? (
                                                        <p className="text_muted text-center dragtext w-100 mb-0 text-bold ">
                                                            Drop the logo here ...
                                                        </p>
                                                    ) : (
                                                        <p className="text_muted text-center dragtext w-100 mb-0 text-bold ">
                                                            Drag 'n' drop Project logo here!
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
                                            <div>
                                                {
                                                    PreviewUrl && (

                                                        <Image alt='preview' src={PreviewUrl} height={100} width={100} className='rounded-pill p-2' />
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className=' wrapper w-100  justify-start'>
                                        <Button type='button' onClick={() => setAddUserModal({ open: true })} className=' admincreatebtn' >
                                            <div className='wrapper'>
                                                <AiOutlineUserAdd className='addicon' />
                                                <span className='btntext'>Add User</span>
                                            </div>
                                        </Button>
                                        <Button type='submit' className=' ms-5 admincreatebtn ' >
                                            <div className='wrapper'>
                                                <GrProjects className='addicon' />
                                                <span className='btntext'>{isPending || Loading ? <Spinner size="sm" /> : "Create"}</span>
                                            </div>
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={5}>
                                {
                                    addedUsers?.length > 0 && (
                                        <div className='w-100 px-2'>
                                            <p className='mb-0 addedusertiotle text-left w-100 mb-3'>Added User</p>
                                            {
                                                addedUsers?.map((elem: selectUsers) => (
                                                    <div key={elem.label} className='w-100 px-2 wrapper my-2 justify-start'>
                                                        <Image src={"/images/icons/userdummy.avif"} height={30} width={30} alt={elem.label} />
                                                        <p className="mx-2 mb-0">{elem.label}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </Col>
                        </Row>

                    </Form>
                )}
            </Formik>
            {
                AdduserModal?.open && (
                    <AddUserModel isOpen={AdduserModal.open} onClose={() => setAddUserModal({ open: false, })} />
                )
            }
        </div>
    )
}

export default AdminCreateProject