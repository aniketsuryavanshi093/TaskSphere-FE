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
    projectId: string
    id: string,
    _id: string,
    name: string
    isDeleted: false,
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
    updatedAt: string,
    ticketsCount: number
    createdAt: string,
    logoUrl: string
    organizationId: string
}
export type comment = {
    repliesData: comment[]
    text: string
    _id: string,
    author: CurrentUserObjectType
    createdAt: string
    replies: comment[]
    orgMember: CurrentUserObjectType
}
export interface TaskType {
    title: string
    label: 'BE' | 'FE' | 'QA'
    priority: 'low' | 'medium' | 'high'
    status: 'pending' | 'progress' | 'readyForQA' | 'done' | 'close'
    projectId: string
    description: string
    project: projectTypes
    updatedAt: string,
    createdAt: string,
    commentsCount: number,
    createdBy: string
    ticketTag: string
    comments: comment[]
    _id: string
    assignedUser: CurrentUserObjectType,
    createdByOrg: string
    assignedTo: string
    updatedBy: string
    attachments: string[]
}

export interface DragDropCOlumnstype {
    [key: string]: {
        title: string;
        color: string;
        items: TaskType[]
    }
}


export type PaginationConfigType = {
    pageCount: number
    itemCount: number,
    currentPage: number,
    onPageChange: (number: number) => void,
    showLabel?: boolean,
    perpageItemCount: number,
    onperpageItemCountchange: (number: number) => void,
    showStartEndPage?: boolean,
}
