import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../utils/baseapi.js";

export const exerciseApi = createApi({

    reducerPath: "exerciseApi",

    baseQuery: baseQueryWithReauth,

    tagTypes: ["exercise"],

    endpoints: (builder) => ({

        getAllExercises: builder.query({
  query: ({ search } = {}) => ({
    url: "/exercises",
    method: "GET",
    params:{
      ...(search && {search})
    }
  }),
  providesTags: ["exercise"],
}),

filterExercises: builder.query({
  query: ({ bodyPart, equipment, difficulty } = {}) => ({
    url: "/exercises/filter",
    method: "GET",
    params: {
      ...(bodyPart && { bodyPart }),
      ...(equipment && { equipment }),
      ...(difficulty && { difficulty }),
    },
  }),
  providesTags: ["exercise"],
}),

getExerciseById: builder.query({
  query: (id) => ({
    url: `/exercises/${id}`,
    method: "GET",
  }),
  providesTags: ["exercise"],
}),

createExercise: builder.mutation({
  query: (formData) => ({
    url: "/exercises",
    method: "POST",
    body: formData,
  }),
  invalidatesTags: ["exercise"],
}),

updateExercise: builder.mutation({
  query: ({ id, formData }) => ({
    url: `/exercises/${id}`,
    method: "PATCH",
    body: formData,
  }),
  invalidatesTags: ["exercise"],
}),

deleteExercise: builder.mutation({
  query: (id) => ({
    url: `/exercises/${id}`,
    method: "DELETE",
  }),
  invalidatesTags: ["exercise"],
}),

getExerciseFilterFields: builder.query({
  query: () => ({
    url: "/exercises/filter-fields",
    method: "GET",
  }),
  providesTags: ["exercise"],
}),

       
}),


});

export const {

   useCreateExerciseMutation,
   useUpdateExerciseMutation,
   useDeleteExerciseMutation,
   useGetAllExercisesQuery,
   useGetExerciseByIdQuery,
   useFilterExercisesQuery,
   useGetExerciseFilterFieldsQuery

} = exerciseApi;