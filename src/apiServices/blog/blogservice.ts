import axiosInterceptorInstance from "@/http"

export const getSearchkeyword = async ({ search }: { search: string }) => {
    return axiosInterceptorInstance.get(`/blog/search?search=${search}`)
}