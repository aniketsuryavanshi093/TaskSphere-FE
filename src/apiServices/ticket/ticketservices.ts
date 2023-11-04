import axiosInterceptorInstance from "@/http";
import { createHeader } from "@/lib/apiservice";

export const getAllTickets = async (payload: { id: any; filterURL: any; authToken: any; }) => {
    const { filterURL, id, authToken } = payload;
    return axiosInterceptorInstance.get(
        `ticket/allTickets${id ? `?projectId=${id}&` : "?"}orderBy=createdAt&limit=100&offset=0${filterURL || ''}`, createHeader(authToken)
    );
};

export const getProjectDetail = async (payload: { authToken: string, projectId: string, count: boolean }) => {
    const { authToken, projectId, count = false } = payload;
    return axiosInterceptorInstance.get(
        `project/getprojects/${projectId}${count ? `?count=true` : ''}`, createHeader(authToken)
    );
};


export const getComments = async (payload: { authToken: string, ticketId: string }, pagination: {
    pageNumber: number, pageSize: number
}) => {
    const { authToken, ticketId, } = payload;
    return axiosInterceptorInstance.get(
        `ticket/comments/${ticketId}?pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`, createHeader(authToken)
    );
};
