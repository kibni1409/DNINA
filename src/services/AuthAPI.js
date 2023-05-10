import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['AuthData'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.0.11:9096'
  }),
  endpoints: (build) => ({
    login: build.mutation({
      query: (data) => ({
        url: '/v1/clair/login',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['AuthData'],
    }),
  }),
})
export const { useLoginMutation } = authApi;
