import * as Yup from 'yup';


export const loginvalidations = Yup.object({
    email: Yup.string().required('please enter username or email !'),
    password: Yup.string().required('password is required!')
})
export const userformvalidations = Yup.object({
    userName: Yup.string(),
    profilePic: Yup.string(),
    Bio: Yup.string()
})

export const createProjectvalidation = Yup.object({
    title: Yup.string().required('Project Title is required!'),
    description: Yup.string().required('description is required!')
})

export const createuservalidation = Yup.object({
    email: Yup.string().required('please enter email !'),
    name: Yup.string().required('Name is required!'),
    password: Yup.string().min(8, "Password must be minimum 8 chars.").required('password is required!'),
    userName: Yup.string().required('User name is required!')
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

export const createticketvalidation = Yup.object({
    title: Yup.string().required('ticket title is required!'),
    description: Yup.string().required('ticket description is required!'),
    label: Yup.string().required('please select ticket label!'),
    priority: Yup.string().required('please select ticket priority!'),
    assignedTo: Yup.string().required('please select user to assign ticket!'),
    projectId: Yup.string().required('please select project to assign ticket!'),
})