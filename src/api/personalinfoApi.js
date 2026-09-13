import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../utils/baseapi.js";

export const personalInfoApi = createApi({
  reducerPath: "personalInfoApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["personalInfo"],

  endpoints: (builder) => ({
    // ============================================
    // CREATE PERSONAL INFO
    // ============================================

    createPersonalInfo: builder.mutation({
      query: (formData) => ({
        url: "/userInfo/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["personalInfo"],
    }),

    // ============================================
    // GET PERSONAL INFO
    // ============================================

    getUserInfo: builder.query({
      query: () => ({
        url: "/userInfo/",
        method: "GET",
      }),
      providesTags: ["personalInfo"],
    }),

    // ============================================
    // UPDATE PERSONAL INFO
    // ============================================

    updateUserInfo: builder.mutation({
      query: (formData) => ({
        url: "/userInfo/",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["personalInfo"],
    }),
  }),
});

export const {
  useCreatePersonalInfoMutation,
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
} = personalInfoApi;