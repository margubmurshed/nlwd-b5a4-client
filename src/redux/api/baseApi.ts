import type { IBook, IBookSummary, IBorrow, IBorrowResponse, TApiResponse, TApiResponseWithMeta, TPaginationMeta } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api"
    }),
    tagTypes: ["Book", "BorrowSummary"],
    endpoints: (builder) => ({
        getBooks: builder.query<
            {data: IBook[]; meta: TPaginationMeta},
            {page?: number; limit?:number}
        >({
            query: ({page=1, limit=10}) => `/books?page=${page}&limit=${limit}`,
            transformResponse: (response: TApiResponseWithMeta<IBook[]>) => ({
                data: response.data,
                meta: response.meta
            }),
            providesTags: ["Book"]
        }),
        getBook: builder.query<IBook, string>({
            query: (id:string) => `/books/${id}`,
            transformResponse: (response: TApiResponse<IBook>) => response.data,
            providesTags: (_result, _error, id) => [{type: "Book", id}] 
        }),
        addBook: builder.mutation<IBook, Partial<IBook>>({
            query: (bookData) => ({
                url: "/books",
                method: "POST",
                body: bookData
            }),
            transformResponse: (response: TApiResponse<IBook>) => response.data,
            invalidatesTags: ["Book"]
        }),
        updateBook: builder.mutation<IBook, {id:string; updatedBookData:Partial<IBook>}>({
            query: ({id, updatedBookData}) => ({
                url: `/books/${id}`,
                method: "PUT",
                body: updatedBookData
            }),
            async onQueryStarted({id, updatedBookData}, {dispatch, queryFulfilled}){
                const patchBook = dispatch(
                    baseApi.util.updateQueryData("getBook", id, draft => {
                        Object.assign(draft, updatedBookData)
                    })
                );
                const patchBookList = dispatch(
                    baseApi.util.updateQueryData("getBooks", {page:1, limit: 10}, draft => {
                        const index = draft.data.findIndex(book => book._id === id);
                        if(index !== -1) {
                            Object.assign(draft.data[index], updatedBookData)
                        }
                    })
                );

                try{
                    await queryFulfilled;
                } catch{
                    patchBook.undo();
                    patchBookList.undo()
                }
            },
            transformResponse: (response: TApiResponse<IBook>) => response.data,
            invalidatesTags: (_result, _error, {id}) => [{type: "Book", id}, "Book"]
        }),
        deleteBook: builder.mutation<TApiResponse<null>, {id: string}>({
            query: ({id}) => ({
                url: `/books/${id}`,
                method:"DELETE"
            }),
            invalidatesTags: (_result, _error, {id}) => [{type: "Book", id}, "Book"]
        }),
        borrowBook: builder.mutation<IBorrowResponse, IBorrow>({
            query: (borrowData) => ({
                url: "/borrow",
                method: "POST",
                body: borrowData
            }),
            transformResponse: (response: TApiResponse<IBorrowResponse>) => response.data,
            invalidatesTags: (_result, _error, borrowData) => [{type: "Book", id:borrowData.book}, "Book", "BorrowSummary"]
        }),
        borrowSummary: builder.query<IBookSummary[], void>({
            query: () => "/borrow",
            providesTags: ["BorrowSummary"],
            transformResponse: (response: TApiResponse<IBookSummary[]>) => response.data,
        })
    })
})

export const {
    useGetBooksQuery, 
    useAddBookMutation, 
    useGetBookQuery, 
    useUpdateBookMutation, 
    useDeleteBookMutation, 
    useBorrowBookMutation,
    useBorrowSummaryQuery
} = baseApi;