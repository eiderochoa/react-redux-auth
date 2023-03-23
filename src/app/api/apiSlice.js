import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../features/auth/authSlice'
import axios from 'axios';
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api',
    // credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        headers.set("Content-Type", "application/json");
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 401) {
        console.log('sending refresh token')
        // send refresh token to get new access token 
        const refreshResult = await axios.post('http://localhost:8000/api/token/refresh/',{'refresh':api.getState().auth.refresh})
        // const refreshResult = await baseQuery('/token/refresh/', api, extraOptions)
        // console.log(refreshResult)
        if (refreshResult?.data) {
            const user = api.getState().auth.user
            // store the new token 
            api.dispatch(setCredentials({ ...refreshResult.data, user }))
            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User', 'Group'],
    endpoints: builder => ({}),
    
})