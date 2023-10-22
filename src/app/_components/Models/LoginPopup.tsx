"use client"
import React, { useState, useTransition } from 'react'
import CustomModal from './CustomModal'
import { Field, Form, Formik } from 'formik'
import Image from 'next/image'
import { CustomInput, CustomPswInput } from '@/lib/customcomponents/customComponents'
import { loginvalidations } from '@/lib/validations/AuthValidationsForm'
import { signIn } from 'next-auth/react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '@/lib/firebase'
type FormSignupvalueType = {
    email: string,
    password: string
}
const LoginPopup: React.FC<{ isOpen: boolean, onClose: () => void, }> = ({ isOpen, onClose, }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition()
    const [Error, setError] = useState("")
    const initialValue = {
        email: "",
        password: ""
    }
    const handleServerAction = async (values, type) => {
        try {
            if (type === "google") {
                const provider = new GoogleAuthProvider();
                const googleresponse = await signInWithPopup(auth, provider);
                signIn("credentials", { redirect: false, username: googleresponse.user.email, password: "" }).then((data: any) => {
                    if (data?.error !== null || data?.error) {
                        setError(data.error)
                    } else {
                        onClose()
                    }
                }).catch(er => console.log(er))
            } else {
                signIn(type, { redirect: false, username: values?.email?.trim(), password: values?.password?.trim() })
                    .then((data: any) => {
                        if (data?.error) {
                            setError(data.error)
                        }
                        else {
                            onClose()
                        }
                    }).catch(er => console.log(er))
            }
        } catch (error) {

        }
    }
    return (
        <CustomModal isOpen={isOpen} title="Add Users" onClose={onClose}>
            <div className='w-100 p-2'>
                <Formik
                    initialValues={initialValue}
                    validationSchema={loginvalidations}
                    onSubmit={(value: FormSignupvalueType) => {
                        startTransition(() => handleServerAction(value, "credentials"))
                    }}
                >
                    {({ values }) => (
                        <Form className="wrapper m-3 flex-column">
                            {Error && (
                                <div className="w-100">
                                    <p className="erorindicatior">{Error}</p>
                                </div>
                            )}
                            <div className="w-100">
                                <Field
                                    type="text"
                                    withIcon
                                    Icon={
                                        <Image
                                            className="inpicon"
                                            height={24}
                                            width={24}
                                            src="/images/userframe.png"
                                            alt="userframe"
                                        />
                                    }
                                    component={CustomInput}
                                    inputClassName='my-2 emailinpopup'
                                    name="email"
                                    placeholder="Email"
                                />
                            </div>
                            <div className="w-100">
                                <Field
                                    type={showPassword ? "text" : "password"}
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
                                    inputClassName={`my-2 emailinpopup `}
                                    placeholder="password"
                                    show={showPassword}
                                    setShow={setShowPassword}
                                    pswClassName="signup_psw_input"
                                />
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        startTransition(() => handleServerAction(null, "google",))
                                    }}
                                    className=" guestloginbtn my-2 py-3"
                                >
                                    <div className="wrapper ">
                                        <Image
                                            src="/images/google.png"
                                            alt="googleimage"
                                            height={30}
                                            width={30}
                                        />
                                        <p className="mb-0 ms-2">
                                            Login with
                                            <span className="text-bold ms-2">Google</span>
                                        </p>
                                    </div>
                                </button>
                            </div>
                        </Form>

                    )
                    }
                </Formik>
            </div>
        </CustomModal >
    )
}

export default LoginPopup