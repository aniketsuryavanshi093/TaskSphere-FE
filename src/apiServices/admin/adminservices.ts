import { CurrentUserObjectType } from "@/commontypes"
import axiosInterceptorInstance from "@/http"
import { createHeader } from "@/lib/apiservice"
export const getAllOrganizationsUser = async ({ authToken, id, role, organizationId }: CurrentUserObjectType) => {
    return axiosInterceptorInstance.get(`/members/getAllusers/${role === "organization" ? id : organizationId}`, createHeader(authToken))
}

export const getAllOrganizationsProject = async ({ authToken, id, role, istaskstats, organizationId, isanalytic, currentPage, PerpageItemCount }: CurrentUserObjectType) => {
    return axiosInterceptorInstance.get(`/organization/getAllProject/${role === "organization" ? isanalytic ? `${id}?isOrganization=true&orderBy=title&orderType=ASC&page=${currentPage || 1}&perPage=${PerpageItemCount}` : istaskstats ? `${id}?isAnalytics=true` : id : istaskstats ? `${organizationId}?isAnalytics=true` : organizationId}`, createHeader(authToken))
}

export const GetProjectByUser = async ({ authToken, id, istaskstats }: CurrentUserObjectType) => {
    return axiosInterceptorInstance.get(`/project/getprojectsbyuser/${istaskstats ? `${id}?isAnalytics=true` : id}`, createHeader(authToken))
}


export const GetProjectUsers = async ({ authToken, projectId }: CurrentUserObjectType) => {
    return axiosInterceptorInstance.get(`/members/getprojectusers/${projectId}`, createHeader(authToken))
}


export async function getUserActivity({ authToken }: { authToken: string }, isForme: boolean, pagination: { offset: number, limit: number }) {
    return axiosInterceptorInstance.get(`activity/all?offset=${pagination.offset}&limit=${pagination.limit}${isForme ? '&isForme=true' : ""}`, createHeader(authToken))
}