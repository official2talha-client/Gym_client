import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../utils/baseapi.js";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["purchase"],

  endpoints: (builder) => ({
    // ============================================
    // USER
    // ============================================

    // Create purchase request
    createPurchase: builder.mutation({
      query: (plan) => ({
        url: "/purchases/",
        method: "POST",
        body: {
          plan
        },
      }),
      invalidatesTags: ["purchase"],
    }),

    // Get logged-in user's purchases
    getMyPurchases: builder.query({
      query: () => ({
        url: "/purchases/my",
        method: "GET",
      }),
      providesTags: ["purchase"],
    }),

    // Get purchase by ID
    getPurchaseById: builder.query({
      query: (id) => ({
        url: `/purchases/${id}`,
        method: "GET",
      }),
      providesTags: ["purchase"],
    }),

    // Delete purchase
    deletePurchase: builder.mutation({
      query: (id) => ({
        url: `/purchases/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["purchase"],
    }),

    // ============================================
    // ADMIN
    // ============================================

    // Get all purchases
    getAllPurchases: builder.query({
  query: ({ status, startDate, endDate ,phone} = {}) => ({
    url: "/purchases/",
    method: "GET",
    params: {
      ...(status && { status }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(phone && {phone})
    },
  }),
  providesTags: ["purchase"],
}),

    // Get purchases of a specific user
    getUserPurchases: builder.query({
      query: (userId) => ({
        url: `/purchases/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["purchase"],
    }),

    // Reject purchase
    changePurchaseStatus: builder.mutation({
      query: ({ id, status }) => (console.log(status),{
        url: `/purchases/${id}/status`,
        method: "PATCH",
        body:{status},
      }),
      invalidatesTags: ["purchase"],
    }),
  }),
});

export const {
  useCreatePurchaseMutation,
  useGetMyPurchasesQuery,
  useGetPurchaseByIdQuery,
  useDeletePurchaseMutation,
  useGetAllPurchasesQuery,
  useGetUserPurchasesQuery,
  useChangePurchaseStatusMutation,
} = purchaseApi;