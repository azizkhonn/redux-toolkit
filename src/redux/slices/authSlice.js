import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token") || null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            localStorage.setItem("token", action.payload)
            state.token = action.payload
        },
        logOut: (state) => {
            localStorage.removeItem("token")
            state.token = null
        }
    }
})

export const {loginUser, logOut} = authSlice.actions
export const { reducer } = authSlice;