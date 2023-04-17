import { apiSlice } from "../../../app/api/apiSlice"

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // Users
        listUsers: builder.query({
            query: () => '/listusers',
            keepUnusedDataFor: 5,
            providesTags: ['User']
        }),
        addUser: builder.mutation({
            query: userData => ({
                url: '/register/',
                method: 'POST',
                body: {...userData}
            }),
            invalidatesTags: ['User']
        }),
        updUser: builder.mutation({
            query: userData => ({
                url: '/upduser/'+userData.id,
                method: 'PUT',
                body: {...userData}
            }),
            invalidatesTags: ['User']
        }),
        delUser: builder.mutation({
            query: (id) => ({
                url: '/deluser/'+id,
                method: 'GET'            
            }),
            invalidatesTags: ['User']
        }),
        // Groups
        listGroups: builder.query({
            query: ()=>'/groups',
            keepUnusedDataFor: 5,
            providesTags: ['Group']
        }),
        getPermission: builder.query({
            query: (id)=>'/permissions/'+id,

        }),
        getPermissions: builder.query({
            query: ()=>'/permissions',
            keepUnusedDataFor: 5
        })
    })
})

export const {
    useListUsersQuery,
    useAddUserMutation,
    useUpdUserMutation,
    useDelUserMutation,
    useListGroupsQuery,
    useGetPermissionQuery,
    useGetPermissionsQuery
} = usersApiSlice 