import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const itemApi = createApi({
  reducerPath: 'itemApi',
  tagTypes: ['ItemData'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.0.11:9096'
  }),
  endpoints: (build) => ({
    AddItem: build.mutation({
      query: ({tableName, value}) => ({
        url: '/v1/clair/add_item',
        method: 'POST',
        body: {
          TableName: tableName,
          Value: value
        }
      }),
      invalidatesTags: ['ItemData'],
    }),
    RemoveItem: build.mutation({
      query: ({tableName, value}) => ({
        url: '/v1/clair/remove_item',
        method: 'POST',
        body: {
          TableName: tableName,
          Value: value
        }
      }),
      invalidatesTags: ['ItemData'],
    }),
    CheckItem: build.mutation({
      query: ({tableName, value}) => ({
        url: '/v1/clair/check_item',
        method: 'POST',
        body: {
          TableName: tableName,
          Value: value
        }
      }),
      providesTags: ['ItemData'],
    })
  }),
})
export const { useAddItemMutation, useRemoveItemMutation, useCheckItemMutation } = itemApi;
