import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useBorrowSummaryQuery } from '@/redux/api/baseApi';
import type { IBookSummary, TRTKError } from '@/types';
import { LoaderIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const BorrowSummary = () => {
    const { data, isLoading, error, isError } = useBorrowSummaryQuery(undefined);
    console.log(data)
    if (isError && error) {
        const err = error as TRTKError;
        const message = err?.data?.message || "Something went wrong";
        toast.error(message);
    }
    return (
        <div>
            <div className="container mx-auto p-5">
                <h1 className="text-3xl font-bold">Borrow Summary</h1>
                <div className="mt-5">
                    {
                        isLoading
                            ? (
                                <div className="flex justify-center">
                                    <LoaderIcon className="animate-spin" size={40} />
                                </div>
                            )
                            : (

                                data?.length ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                        {data.map((bookSummary: IBookSummary) => (
                                            <Card className="w-full h-fit" key={bookSummary.book.isbn}>
                                                <CardHeader>
                                                    <CardTitle className="text-xl">{bookSummary.book.title}</CardTitle>
                                                    <CardDescription>
                                                        <p><b>ISBN : </b>{bookSummary.book.isbn}</p>
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <p><b>Total Quantity Borrowed : </b>{bookSummary.totalQuantity}</p>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <p>Borrow Summary found</p>
                                    </div>
                                )
                            )
                    }
                </div>
            </div>
        </div >
    );
};

export default BorrowSummary;