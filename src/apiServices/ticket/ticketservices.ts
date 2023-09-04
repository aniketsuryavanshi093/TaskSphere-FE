import axiosInterceptorInstance from "@/http";

export const getAllTickets = async payload => {
    const { filterURL, id } = payload;
    return axiosInterceptorInstance.get(
        `ticket/allTickets?projectId=${id}&orderBy=createdAt&limit=100&offset=0&${filterURL || ''}`,
    );
};