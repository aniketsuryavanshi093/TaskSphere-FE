'use client'
import axiosInterceptorInstance from '@/http'
import { createHeader } from '@/lib/apiservice'
import enqueSnackBar from '@/lib/enqueSnackBar'
import { storage } from '@/lib/firebase'
import { userformvalidations } from '@/lib/validations/AuthValidationsForm'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { FormGroup, Input, Label, Spinner } from 'reactstrap'

type FormUservalueType = {
    userName: string,
    Bio: string,
}

const ProfileForm = () => {
    const initialValue: FormUservalueType = {
        userName: "",
        Bio: "",
    }
    const { data, update } = useSession()
    const [Loading, setLoading] = useState(false)
    const checkisExists = async (userName: string) => {
        try {
            const isexists = await axiosInterceptorInstance.post("/auth/isExists", { userName }, createHeader(data?.user?.authToken))
            console.log(isexists.data);
            return isexists.data.isUserExists
        } catch (error) {
            console.log(error)
        }
    }

    const [PreviewUrl, setPreviewUrl] = useState<{ name: string, preview: string, imgURI: File | null }>({ name: "", preview: data?.user?.profilePic || "", imgURI: null });
    const onChangepofileImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileHash: File = e?.target?.files[0];
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
    const handleSubmit = async (values: FormUservalueType) => {
        try {
            setLoading(true)
            let profilePic = ""
            if (PreviewUrl?.imgURI) {
                const imageref = ref(storage, `user/${PreviewUrl.name}`);
                const uploadded = await uploadBytes(imageref, PreviewUrl.imgURI, 'data_url');
                profilePic = await getDownloadURL(uploadded?.ref);
            }
            let isexists = false
            if (values.userName !== data?.user.userName) {
                isexists = await checkisExists(values.userName);
            }
            if (isexists) {
                enqueSnackBar({ message: 'Username already taken!', type: "warning" })
            } else {
                update({
                    profilePic,
                    userName: values.userName
                })
            }
            setLoading(false)
            enqueSnackBar({ message: 'Profile Updated!', type: "success" })

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='w-100'>
            <Formik
                initialValues={initialValue}
                validationSchema={userformvalidations}
                onSubmit={(value: FormUservalueType) => {
                    handleSubmit(value)
                }}
            >
                {({ values, setFieldValue, handleChange }) => (
                    <Form className="wrapper justify-between my-3 flex">
                        <div className='userform me-3'>
                            <FormGroup>
                                <Label for="exampleEmail">
                                    Username
                                </Label>
                                <Input
                                    id="exampleEmail"
                                    name="userName"
                                    value={values.userName}
                                    onChange={handleChange}
                                    placeholder="Enter username! "
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleText">
                                    Bio
                                </Label>
                                <Input
                                    id="exampleText"
                                    name="Bio"
                                    value={values.Bio}
                                    type="textarea"
                                />
                            </FormGroup>
                            <button className='w-100 usersavebtn'>{Loading ? <Spinner size="sm" /> : "Save"}</button>
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
                                    onChange={(e) => onChangepofileImgUpload(e)}
                                />
                            </div>
                            <p className='my-2 useruploadtext' >Upload Profile</p>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ProfileForm