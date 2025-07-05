import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useGetBookQuery } from "@/redux/api/baseApi";
import type { TRTKError } from "@/types";
import { BadgeCheckIcon, BadgeX, Key, LoaderIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useParams } from "react-router";

const ViewBook = () => {
    const { id } = useParams();
    const { isLoading, data, error, isError } = useGetBookQuery(id as string);

    if(isError && error){
        const err =  error as TRTKError;
        const message = err?.data?.message || "Something went wrong";
        toast.error(message);
    }

    return (
        <div>
            <div className="container mx-auto p-5">
                <h1 className="text-3xl font-bold">Book Details</h1>
                <div className="mt-5">
                    {
                        isLoading ? (
                            <div className="flex justify-center">
                                <LoaderIcon className="animate-spin" size={40} />
                            </div>
                        ) : (
                            data ? (
                                <div>
                                    <h1 className="text-4xl font-semibold">{data.title}</h1>
                                    <h2 className="text-xl mt-3 font-semibold">by: {data.author}</h2>
                                    <p className="md:text-xl mt-5 leading-10">{data.description}</p>
                                    <div className="mt-10">
                                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-3"><Key /> <span>Key Information</span></h3>
                                        <div className="space-y-3">
                                            <p className="text-xl"><b>Genre: </b> {data.genre}</p>
                                            <p className="text-xl"><b>ISBN :</b> {data.isbn}</p>
                                            <p className="text-xl"><b>Copies left :</b> <span className={cn({
                                                "text-green-600": data.copies > 0,
                                                "text-red-500": data.copies === 0
                                            })}>{data.copies}</span></p>
                                            <p className="text-xl"><b>Availability Status: </b>
                                                {data.available ? (
                                                    <Badge
                                                        variant="secondary"
                                                        className="bg-green-500 text-white dark:bg-green-600"
                                                    >
                                                        <BadgeCheckIcon />
                                                        Available
                                                    </Badge>
                                                ) : (
                                                    <Badge
                                                        variant="secondary"
                                                        className="bg-red-500 text-white dark:bg-red-600"
                                                    >
                                                        <BadgeX />
                                                        Unavailable
                                                    </Badge>
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            ) : (
                                <div className="text-center">
                                    <p>No book found</p>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default ViewBook;