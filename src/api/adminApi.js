import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../utils/baseapi.js";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["admin", "user", "business", "purchase"],

  endpoints: (builder) => ({
    // ============================================
    // BUSINESS
    // ============================================

    // Create business
    createBusiness: builder.mutation({
      query: (formData) => ({
        url: "/admin/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["business"],
    }),

    // Get my business
    getMyBusiness: builder.query({
      query: () => ({
        url: "/admin/my",
        method: "GET",
      }),
      providesTags: ["business"],
    }),

    // get business for user 

    getBusinessForUser: builder.query({
      query: () => ({
        url: "/admin/businessfor-user",
        method: "GET",
      }),
      providesTags: ["business"],
    }),

    // Update business
    updateBusiness: builder.mutation({
      query: (formData) => ({
        url: "/admin/",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["business"],
    }),

    // ============================================
    // USERS
    // ============================================

    // Get all users
    getAllUsers: builder.query({
  query: ({
    page = 1,
    limit = 10,
    status = "",
    search = "",
    phone = "",
  } = {}) => ({
    url: "/admin/users",
    method: "GET",
    params: {
      page,
      limit,
      ...(status && { status }),
      ...(search && { search }),
      ...(phone && { phone }),
    },
  }),
}),

    // Get user by ID
    getUserById: builder.query({
      query: (id) => ({
        url: `/admin/usersbyId/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    // Change user status
    changeUserStatus: builder.mutation({
      query: (id) => ({
        url: `/admin/change-userStatus/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),

    // ============================================
    // PURCHASE
    // ============================================

    // Purchase statistics
    getPurchaseStatistics: builder.query({
      query: () => ({
        url: "/admin/statistics",
        method: "GET",
      }),
      providesTags: ["purchase"],
    }),

    // ============================================
    // DASHBOARD
    // ============================================

    // Total revenue
    getTotalRevenue: builder.query({
      query: () => ({
        url: "/admin/revenue",
        method: "GET",
      }),
      providesTags: ["admin"],
    }),

    // New users / user statistics
    getNewUsers: builder.query({
      query: () => ({
        url: "/admin/newUser",
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    // action records 
    getAdminActionRecords: builder.query({
      query: () => ({
        url: "/admin/action-records",
        method: "GET",
      }),
      providesTags: ["adminActionRecords"],
    }),
  }),
});

export const {
  useCreateBusinessMutation,
  useGetMyBusinessQuery,
  useUpdateBusinessMutation,
  useGetBusinessForUserQuery,

  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useChangeUserStatusMutation,

  useGetPurchaseStatisticsQuery,

  useGetTotalRevenueQuery,
  useGetNewUsersQuery,
  useGetAdminActionRecordsQuery

} = adminApi;