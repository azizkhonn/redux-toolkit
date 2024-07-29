import {api} from "./index";

const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        authLogin: build.mutation({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body
            })
        })
    })
})

export const {useAuthLoginMutation} = authApi