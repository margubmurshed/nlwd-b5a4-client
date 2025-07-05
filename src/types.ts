export interface IDataInfo {
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export interface IBook extends IDataInfo{
    title: string;
    author: string;
    genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY";
    isbn: string;
    description?: string;
    copies: number;
    available: boolean;
}

export interface IBorrow{
    book: string;
    dueDate: string;
    quantity: number;
}

export interface IBookSummary{
    totalQuantity: number;
    book: {
        title: string;
        isbn: string;
    }
}

export interface IBorrowResponse extends IBorrow, IDataInfo{}


export interface TRTKError {
    status: number,
    data: {
        message: string
    }
}

export interface TPaginationMeta{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface TApiResponse<T>{
    success: boolean;
    message: string;
    data: T;
}

export interface TApiResponseWithMeta<T>{
    success: boolean;
    message: string;
    data: T;
    meta: TPaginationMeta
}