import {api} from "./index";

const productApi = api.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query({
            query: () => ({
                url: "/product/all",
                method: "GET"
            }),
            providesTags: ["PRODUCTS"]
        }),
        deleteProduct: build.mutation({
            query: (id) => ({
                url: `/product/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["PRODUCTS"]
        })
    })
})

export const {useGetProductsQuery, useDeleteProductMutation} = productApi