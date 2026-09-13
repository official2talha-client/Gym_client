import {createApi} from '@reduxjs/toolkit/query/react'
import {baseQueryWithReauth} from '../utils/baseapi.js'

export const planApi = createApi({

reducerPath:"planApi",
baseQuery:baseQueryWithReauth,
    tagTypes: ["plan"],


  endpoints: (builder) => ({

        // Create plan

        createPlan: builder.mutation({

            query: (formData) => ({

                url: "/plans/",
                method: "POST",
                body: formData

            }),

            invalidatesTags: ["plan"]

        }),

        // Update plan

        updatePlan: builder.mutation({

            query: ({ id, formData }) => (
            {

                url: `/plans/update/${id}`,
                method: "PATCH",
                body: formData

            }),

            invalidatesTags: ["plan"]

        }),

        // Delete plan

        deletePlan: builder.mutation({

            query: (id) => ({

                url: `/plans/delete/${id}`,
                method: "DELETE"

            }),

            invalidatesTags: ["plan"]

        }),

        // Get All plan

        getAllPlan: builder.query({

            query: () => ({

                url: "/plans/get-all",
                method: "GET"

            }),

            providesTags: ["plan"]

        }),

        // Get plan By Id

        getPlanById: builder.query({

            query: (id) => ({

                url: `/plans/get-byId/${id}`,
                method: "GET"

            }),

            providesTags: ["plan"]

        }),

        // filter 

        filterPlans: builder.query({
  query: ({ gender, type, duration } = {}) => ({
    url: "/plans/filter",
    method: "GET",
    params: {
      ...(gender && { gender }),
      ...(type && { type }),
      ...(duration && { duration }),
    },
  }),
  providesTags: ["plan"],
}),

    })

});

export const {useCreatePlanMutation,useUpdatePlanMutation,useDeletePlanMutation,useFilterPlansQuery,useGetAllPlanQuery,useGetPlanByIdQuery} = planApi;