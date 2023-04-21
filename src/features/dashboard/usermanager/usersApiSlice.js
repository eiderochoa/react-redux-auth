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
        userProfile: builder.query({
            query: ()=> '/profile/',
            keepUnusedDataFor: 5,
        }),
        getUserGroups: builder.query({
            query: ()=>'/getusergroups/',
            keepUnusedDataFor: 5
            
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
        }),
        addGroup: builder.mutation({
            query: groupData => ({
                url: '/addgroup/',
                method: 'POST',
                body: {...groupData}
            }),
            invalidatesTags: ['Group']
        }),
        updGroup: builder.mutation({
            query: groupData => ({
                url: `/updgroup/${groupData.id}/`,
                method: 'PUT',
                body: {...groupData}
            }),
            invalidatesTags: ['Group']
        }),
        delGroup: builder.mutation({
            query: groupData => ({
                url: `/delgroup/${groupData.id}`,
                method: 'DELETE'
            }),
            invalidatesTags:['Group']
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
    useGetPermissionsQuery,
    useAddGroupMutation,
    useUpdGroupMutation,
    useDelGroupMutation,
    useUserProfileQuery,
    useGetUserGroupsQuery
} = usersApiSlice 