import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null, refresh: null, group: null },
    reducers: {
        setCredentials: (state, action) => {
            // console.log(action);
            const {username, access, refresh} = action.payload
            state.user = username
            state.token = access
            state.refresh = refresh
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
            state.refresh = null
        },
        setGroup: (state, action) => {
            const {groups} = action.payload
            state.group = groups
        }
    },

})

export const { setCredentials, logOut, setGroup } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken= (state) => state.auth.token
export const selectCurrentRefresh= (state) => state.auth.refresh
