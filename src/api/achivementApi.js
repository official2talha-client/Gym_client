import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../utils/baseapi.js";

export const achievementApi = createApi({
  reducerPath: "achievementApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["achievement"],

  endpoints: (builder) => ({

    // Create Achievement
    createAchievement: builder.mutation({
      query: (formData) => ({
        url: "/achievements/",
        method: "POST",
        body: formData,
      }),

      invalidatesTags: ["achievement"],
    }),

    // Get All Achievements
    getAchievements: builder.query({
      query: () => ({
        url: "/achievements/",
        method: "GET",
      }),

      providesTags: ["achievement"],
    }),

    // Get Achievement By ID
    getAchievementById: builder.query({
      query: (id) => ({
        url: `/achievements/${id}`,
        method: "GET",
      }),

      providesTags: ["achievement"],
    }),

    // Delete Achievement
    deleteAchievement: builder.mutation({
      query: (id) => ({
        url: `/achievements/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["achievement"],
    }),
  }),
});

export const {
  useCreateAchievementMutation,
  useGetAchievementsQuery,
  useGetAchievementByIdQuery,
  useDeleteAchievementMutation,
} = achievementApi;