import { CurrentUserObjectType } from "@/commontypes"
import axiosInterceptorInstance from "@/http"
import { createHeader } from "@/lib/apiservice"

export const getAllOrganizationsUser = async ({ authToken, id }: CurrentUserObjectType) => {
    return axiosInterceptorInstance.get(`/members/getAllusers/${id}`, createHeader(authToken))
}

export const getAllOrganizationsProject = async ({ authToken, id }: CurrentUserObjectType) => {
    return axiosInterceptorInstance.get(`/organization/getAllProject`, createHeader(authToken))
}
