import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../utils/baseapi.js";

export const trainerApi = createApi({

    reducerPath: "trainerApi",

    baseQuery: baseQueryWithReauth,

    tagTypes: ["trainer"],

   endpoints: (builder) => ({

 // Get all trainers
getAllTrainers: builder.query({
  query: () => ({
    url: "/trainers/get-all",
    method: "GET",
  }),
  providesTags: ["trainer"],
}),

// Filter trainers
filterTrainers: builder.query({
  query: ({ gender, shift } = {}) => ({
    url: "/trainers/filter",
    method: "GET",
    params: {
      ...(gender && { gender }),
      ...(shift && { shift }),
    },
  }),
  providesTags: ["trainer"],
}),

// Get trainer by ID
getTrainerById: builder.query({
  query: (id) => ({
    url: `/trainers/get-byId/${id}`,
    method: "GET",
  }),
  providesTags: ["trainer"],
}),

// Create trainer
createTrainer: builder.mutation({
  query: (formData) => ({
    url: "/trainers",
    method: "POST",
    body: formData,
  }),
  invalidatesTags: ["trainer"],
}),

// Update trainer
updateTrainer: builder.mutation({
  query: ({ id, formData }) => ({
    url: `/trainers/update/${id}`,
    method: "PATCH",
    body: formData,
  }),
  invalidatesTags: ["trainer"],
}),

// Delete trainer
deleteTrainer: builder.mutation({
  query: (id) => ({
    url: `/trainers/delete/${id}`,
    method: "DELETE",
  }),
  invalidatesTags: ["trainer"],
}),

    })

});

export const {

   useCreateTrainerMutation,
   useUpdateTrainerMutation,
   useDeleteTrainerMutation,
   useFilterTrainersQuery,
   useGetAllTrainersQuery,
   useGetTrainerByIdQuery

} = trainerApi;