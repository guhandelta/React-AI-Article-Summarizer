import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const articleApi = createApi({
    reducerPath: 'articleApi',
     /* Endpoints = A fn(), where a builder is available as the 1st param, which is fn() that returns an obj, within which the names of the-
    enpoints can be mentioned/specified */
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: (params) => `test`
        })
    })
})