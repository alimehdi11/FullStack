import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../models/User";
import { Product } from "./../types/interfaces";

export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://65f77aaab4f842e80885a255.mockapi.io",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/users",
      providesTags: ["User"],
    }),
    getUser: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: ["User"],
    }),
    addUser: builder.mutation<void, User>({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<void, Partial<User>>({
      query: ({ id, ...user }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    getProducts:builder.query<Product[] ,void>({
      query:()=>"https://65f77aaab4f842e80885a255.mockapi.io/products",
    })
  })
  });

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useGetProductsQuery
} = userApi;

export default userApi;
