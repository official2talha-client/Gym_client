import {createApi} from '@reduxjs/toolkit/query/react'
import {baseQueryWithReauth} from '../utils/baseapi.js'

export const userApi = createApi({

reducerPath:"userApi",
baseQuery:baseQueryWithReauth,

 endpoints:(builder)=>({

        registerUser:builder.mutation({
            query:(formdata)=>({
                url:'/users/register',
                method:'POST',
                body:formdata
            })
        }),

        loginUser:builder.mutation({
            query:(body)=>({
                url:'/users/login',
                method:'POST',
                body,
            })
        }),

        refreshAccessToken: builder.mutation({
            query:(body)=>({
                url:'/users/refreshAccessToken',
                method:'POST',
                ...(body?{body}:{}),
                Credential:"include"
            })
        }),

        logoutUser:builder.mutation({
            query:()=>({
                url:"/users/logout",
                method:'DELETE',
            })
        }),

        chnagePassword:builder.mutation({
            query:(body)=>({
                url:"/users/change-password",
                method:'POST',
                body,
            })
        }),

        getCurrentUser:builder.query({
            query:()=> '/users/current-user'
        }),
        


    })

});

export const {useChnagePasswordMutation,useGetCurrentUserQuery,useLoginUserMutation,useLogoutUserMutation,useRegisterUserMutation,useRefreshAccessTokenMutation} = userApi;