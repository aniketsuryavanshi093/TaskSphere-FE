import axiosInterceptorInstance from "@/http";
import { createHeader } from "@/lib/apiservice";

export const getAllTickets = async payload => {
    const { filterURL, id, authToken } = payload;
    return axiosInterceptorInstance.get(
        `ticket/allTickets?projectId=${id}&orderBy=createdAt&limit=100&offset=0&${filterURL || ''}`, createHeader(authToken)
    );
};


export const getProjectDetail = async (payload: { authToken: string, projectId: string, count: boolean }) => {
    const { authToken, projectId, count = false } = payload;
    return axiosInterceptorInstance.get(
        `project/getprojects/${projectId}${count ? `?count=true` : ''}`, createHeader(authToken)
    );
};