import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const tableApi = createApi({
  reducerPath: 'tableApi',
  tagTypes: ['TableData'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.0.11:9096'
  }),
  endpoints: (build) => ({
    CreateTable: build.mutation({
      query: ({CountElements, CountHashFunc, FalsePositiveRate, TableName, TableSize }) => ({
        url: '/v1/clair/create_table',
        method: 'POST',
        body: {
          CountElements: CountElements,
          CountHashFunc: CountHashFunc,
          FalsePositiveRate: FalsePositiveRate,
          TableName: TableName,
          TableSize: TableSize
        }
      }),
      providesTags: ['TableData'],
    }),
    DeleteTable: build.mutation({
      query: (Value) => ({
        url: '/v1/clair/delete_table',
        method: 'POST',
        body: {
          Value: Value
        }
      }),
      providesTags: ['TableData'],
    }),
    // GetTableInfo: build.mutation({
    //   query: (Value) => ({
    //     url: '/v1/clair/get_table_info',
    //     method: 'POST',
    //     body: {
    //       Value
    //     }
    //   }),
    //   providesTags: ['TableData'],
    // }),
    GetAllTables: build.query({
      query: () => ({
        url: '/v1/clair/tables',
      }),
      invalidatesTags: ['TableData'],
    })
  }),
})
export const { useCreateTableMutation, useDeleteTableMutation, useGetTableInfoMutation, useGetAllTablesQuery } = tableApi;
