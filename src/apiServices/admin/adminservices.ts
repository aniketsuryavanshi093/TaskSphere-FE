import { CurrentUserObjectType } from "@/commontypes"
import axiosInterceptorInstance from "@/http"
import { createHeader } from "@/lib/apiservice"

export const getAllOrganizationsUser = async ({ authToken, id, role, organizationId }: CurrentUserObjectType) => {
    return axiosInterceptorInstance.get(`/members/getAllusers/${role === "organization" ? id : organizationId}`, createHeader(authToken))
}

export const getAllOrganizationsProject = async ({ authToken, id, role, organizationId }: CurrentUserObjectType) => {
    return axiosInterceptorInstance.get(`/organization/getAllProject/${role === "organization" ? id : organizationId}`, createHeader(authToken))
}
