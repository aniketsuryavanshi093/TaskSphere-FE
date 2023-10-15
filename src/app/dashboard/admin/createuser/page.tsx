"use client"
/* eslint-disable react/no-unescaped-entities */
import React, { useRef, useState, useTransition } from 'react'
import { Field, Form, Formik, FormikState, } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { Button, Col, Label, Row, Spinner } from 'reactstrap';
import { GrFormPreviousLink, } from 'react-icons/gr';
import { createuservalidation } from '@/lib/validations/AuthValidationsForm';
import { CustomInput, CustomPswInput, } from '@/lib/customcomponents/customComponents';
import "./createuser.scss"
import enqueSnackBar from '@/lib/enqueSnackBar';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { createUseraction } from '@/actions/authactions/adminaction';
import { useQueryClient } from '@tanstack/react-query';

type initialType = {
    name: string,
    password: string,
    ticketAdministrator: boolean,
    userName: string,
    email: string
}

const AdminUserProject = () => {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const [PreviewUrl, setPreviewUrl] = useState<{ name: string, preview: string, imgURI: File | null }>({ name: "", preview: "", imgURI: null });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const queryClient = useQueryClient()
    const initialValues: initialType = {
        "name": "",
        "userName": "",
        "ticketAdministrator": false,
        "email": "",
        "password": ""
    }
    const handlCreateUser = async (val: any, resetForm: (nextState?: Partial<FormikState<initialType>> | undefined) => void) => {
        try {
            let profilePic = ""
            if (PreviewUrl?.imgURI) {
                const imageref = ref(storage, `user/${PreviewUrl.name}`);
                const uploadded = await uploadBytes(imageref, PreviewUrl.imgURI, 'data_url');
                profilePic = await getDownloadURL(uploadded?.ref);
            }
            const result = await createUseraction({ ...val, profilePic }) as { status: string, message: string }
            if (result?.status === "fail") {
                queryClient.invalidateQueries({ queryKey: ["orgainzationprojects"] })
                enqueSnackBar({ type: "error", message: result.message, })
                return
            }
            enqueSnackBar({ type: "success", message: "User created Successfully!" })
            resetForm()
        } catch (error) {
            console.log(error)
        }
    }
    const handleSubmit = async (value: initialType, resetForm: (nextState?: Partial<FormikState<initialType>> | undefined) => void) => {
        try {
            startTransition(() => handlCreateUser(value, resetForm))
        } catch (error) {
            console.log(error);
        }
    };
    const onChangepofileImgUpload = (e) => {
        const fileHash: File = e.target.files[0];
        try {
            if (fileHash) {
                const preview = URL.createObjectURL(fileHash);
                setPreviewUrl({ preview, name: fileHash.name, imgURI: fileHash });
            } else {
                enqueSnackBar({ message: 'Please input image of type png , jpeg . ', type: "warning" });
            }
        } catch (error) {
            console.log(error);
        }
    };
    const inputref = useRef<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>(null)
    return (
        <div>
            <div className='previous wrapper  justify-start w-100'>
                <GrFormPreviousLink className='cp' onClick={() => router.back()} />
                <span className='cp' onClick={() => router.back()} >Go Back</span>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={createuservalidation}
                onSubmit={(value: initialType, { resetForm }) => {
                    handleSubmit(value, resetForm)
                }}
            >
                {({ values, setFieldValue }) => (
                    <Form >
                        <Row className='w-100'>
                            <Col lg={7}>
                                <div className="wrapper mx-3 flex-column">
                                    <div className='wrapper justify-between w-100 align-start'>
                                        <div className='w-100 me-3'>
                                            <div className="w-100 ">
                                                <Label className='mb-0 cp' htmlFor="name">Name</Label>
                                                <Field
                                                    type="text"
                                                    component={CustomInput}
                                                    styleData="createprojectinp"
                                                    inputClassName={`my-2  `}
                                                    id="name"
                                                    name="name"
                                                    placeholder="Name"
                                                />
                                            </div>
                                            <div className="w-100 ">
                                                <Label className='mb-0 cp' htmlFor="title">Email</Label>
                                                <Field
                                                    type="text"
                                                    component={CustomInput}
                                                    styleData="createprojectinp"
                                                    inputClassName={`my-2`}
                                                    id="email"
                                                    name="email"
                                                    placeholder="Email"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="position-relative ">
                                                <Image className='userimage' width={100} height={100} src={PreviewUrl?.preview || "/images/icons/userdummy.avif"} alt="dummy" />
                                                <Image
                                                    src={"/images/icons/upload_img.svg"}
                                                    alt='edit'
                                                    width={25}
                                                    onClick={() => inputref?.current?.click()}
                                                    height={25}
                                                    className="edit_icon_profile cp"
                                                />
                                                <input
                                                    ref={inputref}
                                                    type="file"
                                                    name="image"
                                                    id="upload-button"
                                                    style={{ display: 'none' }}
                                                    onChange={onChangepofileImgUpload}
                                                />
                                            </div>
                                            <p className='my-2 useruploadtext' >Upload Profile</p>
                                        </div>

                                    </div>

                                    <div className="w-100 ">
                                        <Label className='mb-0 cp' htmlFor="userName">User name</Label>
                                        <Field
                                            type="text"
                                            component={CustomInput}
                                            styleData="createprojectinp"
                                            inputClassName={`my-2  `}
                                            id="userName"
                                            name="userName"
                                            placeholder="User name"
                                        />
                                    </div>
                                    <div className="w-100 ">
                                        <Label className='mb-0 cp' htmlFor="pass">Password</Label>
                                        <Field
                                            type={showPassword ? "text" : "password"}
                                            id="pass"
                                            component={CustomPswInput}
                                            withIcon
                                            Icon={
                                                <Image
                                                    className="inpicon"
                                                    height={24}
                                                    width={24}
                                                    src="/images/passframe.png"
                                                    alt="passframe"
                                                />
                                            }
                                            name="password"
                                            inputClassName={`my-2  createuserpsw`}
                                            placeholder="password"
                                            show={showPassword}
                                            setShow={setShowPassword}
                                            pswClassName="create_psw_input"
                                        />
                                    </div>
                                    <div className=" mx-3 wrapper mb-3 my-3 justify-between w-100">
                                        <Label className='mb-0 cp' htmlFor="role">User Role (Ticket Administrator)</Label>
                                        <div className="toggle">
                                            <label className="switch">
                                                <input
                                                    id="role"
                                                    checked={values.ticketAdministrator}
                                                    onChange={e => {
                                                        setFieldValue("ticketAdministrator", !values.ticketAdministrator)
                                                    }}
                                                    type="checkbox"
                                                />
                                                <span className={`slider round`} />
                                            </label>
                                        </div>
                                    </div>
                                    <div className=' wrapper w-100  justify-start'>
                                        <Button type='submit' className=' admincreatebtn' >
                                            <div className='wrapper'>
                                                <AiOutlineUserAdd className='addicon' />
                                                <span className='btntext'>{isPending ? <Spinner size="sm" /> : "Add User"} </span>
                                            </div>
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AdminUserProject