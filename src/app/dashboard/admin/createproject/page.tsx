"use client"
/* eslint-disable react/no-unescaped-entities */
import React, { useCallback, useState } from 'react'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Field, Form, Formik, FormikProps } from 'formik';
import { useDropzone } from 'react-dropzone';
import { createProjectvalidation } from '@/lib/validations/AuthValidationsForm';
import { CustomInput, CustomTextArea } from '@/lib/customcomponents/customComponents';
import { storage } from '@/lib/firebase';
import "./createproject.scss"
import { GrFormPreviousLink } from 'react-icons/gr';
import { useRouter } from 'next/navigation';
import { Button, Label } from 'reactstrap';
import Image from 'next/image';
import { AiOutlineUserAdd } from 'react-icons/ai';
import AddUserModel from '@/app/_components/Models/AddUserModel';

type initialType = { title: string, description: string }

const AdminCreateProject = () => {
    const [AdduserModal, setAddUserModal] = useState<{ open: boolean }>({ open: false })
    const router = useRouter()
    const [attachments, setAttachments] = useState<FileList | File | any>([]);
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
    const initialValues: initialType = {
        title: '',
        description: '',
    }
    const handleRemove = (id: any) => {
        setAttachments(attachments.filter((elem: File) => elem.size !== id));
    };
    const handleSubmit = async (value: initialType) => {
        try {
            let attachmenturl = [];
            if (attachments) {
                for await (const i of attachments) {
                    const imageref = ref(storage, `user/${i.name}`);
                    const uploadded = await uploadBytes(imageref, i, 'data_url');
                    const imaeurl = await getDownloadURL(uploadded?.ref);
                    attachmenturl.push({ name: i?.name, ext: i?.type, url: imaeurl });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className='previous wrapper  justify-start w-100'>
                <GrFormPreviousLink className='cp' onClick={() => router.back()} />
                <span className='cp' onClick={() => router.back()} >Go Back</span>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={createProjectvalidation}
                onSubmit={(value: initialType) => {
                    handleSubmit(value)
                }}
            >
                {({ values }) => (
                    <Form className="wrapper m-3 flex-column">
                        <div className="w-100">
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
                            <div
                                className={`dropCOntainer ${isDragActive && 'draging'} px-3 py-5`}
                                {...getRootProps()}>
                                <input multiple {...getInputProps()} />
                                {isDragActive ? (
                                    <p className="text_muted text-center w-100 mb-0 text-bold no-wrap">
                                        Drop the logo here ...
                                    </p>
                                ) : (
                                    <p className="text_muted text-center w-100 mb-0 text-bold no-wrap">
                                        Drag 'n' drop Project logo here, or click to select files
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
                        <div className='w-100 wrapper justify-start'>
                            <Button type='button' onClick={() => setAddUserModal({ open: true })} className=' admincreatebtn' >
                                <div className='wrapper'>
                                    <AiOutlineUserAdd className='addicon' />
                                    <span className='btntext'>Add User</span>
                                </div>
                            </Button>
                        </div>
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