import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../utils/baseapi.js";

export const membershipApi = createApi({
  reducerPath: "membershipApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["membership"],

  endpoints: (builder) => ({
    // ============================================
    // USER
    // ============================================

    // Get logged-in user's membership
    getMyMembership: builder.query({
      query: () => ({
        url: "/memberships/my",
        method: "GET",
      }),
      providesTags: ["membership"],
    }),

        // get expired soon
        

    getMyExpiringMemberships: builder.query({
  query: () => ({
    url: "/memberships/my/expiring",
    method: "GET",
  }),
  providesTags: ["membership"],
}),


    // Get membership by ID
    getMembershipById: builder.query({
      query: (id) => ({
        url: `/memberships/${id}`,
        method: "GET",
      }),
      providesTags: ["membership"],
    }),

    // ============================================
    // ADMIN
    // ============================================

    // Create membership from purchase
    createMembership: builder.mutation({
      query: (formData) => ({
        url: "/memberships/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["membership"],
    }),

    // Create manual/offline membership
    createManualMembership: builder.mutation({
      query: (formData) => ({
        url: "/memberships/manual",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["membership"],
    }),

    // Get all memberships
   getAllMemberships: builder.query({
  query: ({ status, membershipCard } = {}) => ({
    url: "/memberships/",
    method: "GET",
    params: {
      ...(status && { status }),
      ...(membershipCard && { membershipCard }),
    },
  }),
  providesTags: ["membership"],
}),

    // Get memberships of a specific user
    getUserMemberships: builder.query({
      query: (userId) => ({
        url: `/memberships/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["membership"],
    }),

    // Update membership
    updateMembership: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/memberships/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["membership"],
    }),

    // Delete membership
    deleteMembership: builder.mutation({
      query: (id) => ({
        url: `/memberships/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["membership"],
    }),



  }),
});

export const {
  useGetMyMembershipQuery,
  useGetMembershipByIdQuery,

  useCreateMembershipMutation,
  useCreateManualMembershipMutation,

  useGetAllMembershipsQuery,
  useGetUserMembershipsQuery,

  useUpdateMembershipMutation,
  useDeleteMembershipMutation,
  useGetMyExpiringMembershipsQuery
} = membershipApi;