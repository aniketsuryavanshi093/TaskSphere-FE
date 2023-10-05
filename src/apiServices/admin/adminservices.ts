import { CurrentUserObjectType } from "@/commontypes"
import axiosInterceptorInstance from "@/http"
import { createHeader } from "@/lib/apiservice"

export const getAllOrganizationsUser = async ({ authToken, id, role, organizationId }: CurrentUserObjectType) => {
    return axiosInterceptorInstance.get(`/members/getAllusers/${role === "organization" ? id : organizationId}`, createHeader(authToken))
}

export const getAllOrganizationsProject = async ({ authToken, id, role, organizationId, isanalytic, currentPage, PerpageItemCount }: CurrentUserObjectType) => {
    return axiosInterceptorInstance.get(`/organization/getAllProject/${role === "organization" ? isanalytic ? `${id}?isOrganization=true&orderBy=title&orderType=ASC&page=${currentPage}&perPage=${PerpageItemCount}` : id : organizationId}`, createHeader(authToken))
}

export const GetProjectByUser = async ({ authToken, id }: CurrentUserObjectType) => {
    return axiosInterceptorInstance.get(`/project/getprojectsbyuser/${id}`, createHeader(authToken))
}

export const GetProjectUsers = async ({ authToken, projectId }: CurrentUserObjectType) => {
    return axiosInterceptorInstance.get(`/members/getprojectusers/${projectId}`, createHeader(authToken))
}
