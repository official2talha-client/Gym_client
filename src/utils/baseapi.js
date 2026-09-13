import conf from '../conf.js'
import {fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import toast from 'react-hot-toast';


const baseQuery = fetchBaseQuery({

   baseUrl:conf.backendUrl,

   credentials:"include",

    prepareHeaders:(headers,{endpoint})=>{

        const token = localStorage.getItem('token');



        const noAuthEndpoints = ['registerUser','loginUser','refreshAccessToken'];

        if(!noAuthEndpoints.includes(endpoint) && token){
            headers.set('Authorization',`Bearer ${token}`);
        }

        return headers;

    }

});


export const baseQueryWithReauth =async(args,api,extraOptions)=>{

   let result = await baseQuery(
      args,
      api,
      extraOptions
   );

   if(result?.error?.status === 401){

      const refreshResult =
         await baseQuery(
            {
               url:"/users/refreshAccessToken",
               method:"POST"
            },
            api,
            extraOptions
         );

      if(refreshResult?.data){

         // save new access token

         localStorage.setItem(
            "token",
            refreshResult.data?.data?.accessToken
         );

         // retry original request

         result = await baseQuery(
            args,
            api,
            extraOptions
         );

      } else {
        toast.error("Login please")

      //   window.location.href = "/login";   
         }

   }

   return result;
};