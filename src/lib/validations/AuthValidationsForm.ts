import * as Yup from 'yup';



export const loginvalidations = Yup.object({
    email: Yup.string().required('please enter username or email !'),
    password: Yup.string().required('password is required!')
})

export const createProjectvalidation = Yup.object({
    title: Yup.string().required('Project Title is required!'),
    description: Yup.string().required('description is required!')
})

export const signupvalidations = Yup.object({
    email: Yup.string().email("Email format does not match!").required('please enter email !'),
    userName: Yup.string().max(15, "Username character limit is 15 char!").required('please enter username !'),
    password: Yup.string().matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/, 'At least 8 characters, max 32 characters,  one uppercase letter, one lowercase letter, one number and one special case character').required('password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Confirm password does not match with password')
        .required("this field is required"),
})

export const namevalidation = Yup.object({
    name: Yup.string().max(20, "Organization name should less than 20 characters!").required('please enter organization name !'),
})