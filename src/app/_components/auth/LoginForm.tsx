"use client";
import { Field, Form, Formik } from "formik";
import React, { useState, useTransition } from "react";
import {
    CustomInput,
    CustomPswInput,
} from "@/lib/customcomponents/customComponents";
import Image from "next/image";
import {
    loginvalidations,
    namevalidation,
    signupvalidations,
} from "@/lib/validations/AuthValidationsForm";
import CustomModal from "../Models/CustomModal";
import { handleSubmit } from "@/actions/authactions/authactions";
import { signIn } from "next-auth/react";

export type FormSignupvalueType = {
    userName?: string;
    name?: string;
    confirmPassword?: string;
    email?: string;
    password?: string;
}

type PageProps = {
    formtype: string;
    user: any
};
const LoginForm: React.FC<PageProps> = ({ formtype, user }) => {
    const [OpenModal, setOpenModal] = useState<{ open: boolean, openType: string }>({ open: false, openType: "" })
    const [isPending, startTransition] = useTransition()
    console.log(user)
    if (user?._id) {
        window.location.reload()
    }
    const initialValue: FormSignupvalueType =
        formtype === "login"
            ? {
                email: "",
                password: "",
            }
            : {
                email: "",
                password: "",
                userName: "",
                confirmPassword: "",
                name: ""
            };
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPassword1, setShowPassword1] = useState<boolean>(false);
    const validation =
        formtype === "login" ? loginvalidations : signupvalidations;
    const handleServerAction = async (values: FormSignupvalueType | null, type: string) => {
        try {
            if (formtype === "register") {
                if (type === "google" || type === "github") {
                    // const usersession = await signIn(type, { redirect: false, username: values?.userName, password: values?.password })
                    console.log(values, type, formtype);
                } else {
                    console.log("❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤", "STEP!!!!!!!!11111111")
                    const data = await handleSubmit(values, type, formtype)
                    console.log(data)
                    const usersession = await signIn(type, { redirect: true, username: values?.email, password: values?.password })
                }
            }
            else {
                signIn(type, { redirect: false, username: values?.email, password: values?.password })
                    .then((data: any) => {
                        console.log(data);
                    }).catch(er => console.log(er))
            }
        } catch (error: any) {
            console.log("💕💕", "server Error", error)
        }
    }
    const handleOtherClick = (values: FormSignupvalueType, type: string) => {
        if (formtype === "register") {
            if (values.name) {
                startTransition(() => handleServerAction({ name: values.name }, type,))
            } else {
                setOpenModal({ open: true, openType: type })
            }
        } else {
            startTransition(() => handleServerAction(null, type,))
        }
    }
    let forminpclassname = formtype === "login" ? "emailinp" : "emailregiesterinp"
    return (
        <>
            <Formik
                initialValues={initialValue}
                validationSchema={validation}
                onSubmit={(value: FormSignupvalueType) => {
                    console.log("hello")
                    startTransition(() => handleServerAction(value, "credentials"))
                }}
            >
                {({ values }) => (
                    <Form className="wrapper m-3 flex-column">
                        <div className="w-100">
                            <Field
                                type="email"
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
                                inputClassName={`my-2 ${forminpclassname} `}
                                name="email"
                                placeholder="Email"
                            />
                        </div>
                        {
                            formtype !== 'login' && (
                                <div className="w-100 row " >
                                    <div className="col-lg-6 p-0">
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
                                            styleData="me-2"
                                            component={CustomInput}
                                            inputClassName={`my-2  ${forminpclassname} `}
                                            name="userName"
                                            placeholder="Username"
                                        />
                                    </div>
                                    <div className="col-lg-6 p-0">
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
                                            styleData="ms-2"
                                            inputClassName={`my-2  ${forminpclassname} `}
                                            name="name"
                                            placeholder="Organization name"
                                        />
                                    </div>
                                </div>
                            )
                        }
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
                                inputClassName={`my-2 ${forminpclassname} `}
                                placeholder="password"
                                show={showPassword}
                                setShow={setShowPassword}
                                pswClassName="signup_psw_input"
                            />
                        </div>
                        {
                            formtype !== 'login' && (
                                <div className="w-100">
                                    <Field
                                        type={showPassword1 ? "text" : "password"}
                                        component={CustomPswInput}
                                        inputClassName={`my-2 ${forminpclassname} `}
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
                                        name="confirmPassword"
                                        placeholder="Re Enter password"
                                        show={showPassword1}
                                        setShow={setShowPassword1}
                                        pswClassName="signup_psw_input"
                                    />
                                </div>
                            )
                        }

                        <button className="loginbtn  my-2  " type="submit">
                            {formtype === "login" ? "Login" : "Register"}
                        </button>
                        <button
                            type="button"
                            onClick={() => handleOtherClick(values, "google")}
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
                                    {" "}
                                    {formtype === "login" ? "Login" : "Register"} with{" "}
                                    <span className="text-bold">Google</span>
                                </p>
                            </div>{" "}
                        </button>
                        <button
                            type="button"
                            onClick={() => handleOtherClick(values, "github")}
                            className=" guestloginbtn my-2 py-3 "
                        >
                            <div className="wrapper ">
                                <Image
                                    src="/images/github.png"
                                    alt="googleimage"
                                    height={30}
                                    width={30}
                                />
                                <p className="mb-0 ms-2">
                                    {" "}
                                    {formtype === "login" ? "Login" : "Register"} with{" "}
                                    <span className="text-bold">Github</span>
                                </p>
                            </div>
                        </button>
                    </Form>
                )}
            </Formik>
            {
                OpenModal?.open && (
                    <CustomModal isOpen={OpenModal.open} title="Organization Name" onClose={() => setOpenModal({ open: false, openType: "" })}>
                        <div className="wrapper">
                            <Formik
                                initialValues={{ name: "" }}
                                validationSchema={namevalidation}
                                onSubmit={(value: FormSignupvalueType) => {
                                    startTransition(() => handleServerAction(value, OpenModal.openType,))
                                }}
                            >
                                {({ values }) => (
                                    <Form className="wrapper m-3 w-100 flex-column">
                                        <Field
                                            type="text"
                                            component={CustomInput}
                                            inputClassName={`my-2 ${forminpclassname} `}
                                            name="name"
                                            placeholder="Enter Organization Name"
                                        />
                                        <button type="submit" className="text-muted mb-0 my-2 continuebtn cp text-center">  Continue Register <span><i className="fa-solid fa-right-long"></i></span></button>
                                    </Form>)}
                            </Formik>
                        </div>
                    </CustomModal>
                )
            }
        </>
    );
};

export default React.memo(LoginForm);
