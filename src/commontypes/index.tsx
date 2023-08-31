export type dataItemsTypes = {
    logo: string,
    name: string,
    link: string
}

export type selectUsers = {
    value: string,
    label: string,
    pic?: string
}


export type CurrentUserObjectType = {
    authToken: string,
    createdAt: string,
    userName: string,
    email: string,
    id: string,
    _id: string,
    name: string
    profilePic: string,
    organizationName: string,
    organizationId: string
    role: string,
    updatedAt: string
}
export interface memberInput {
    name: string
    email: string
    password: string
    role?: string
    userName: string
    ticketAdministrator: boolean
    organizationId: string
}

export interface projectTypes {
    title: string
    _id: string,
    members: memberInput[]
    description: string
    tasks: any
    logoUrl: string
    organizationId: string
}