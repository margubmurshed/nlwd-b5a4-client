import BookCard from "@/components/book/BookCard";
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/baseApi";
import type { IBook, TRTKError } from "@/types";
import { LoaderIcon } from "lucide-react";
import ConfirmModal from "@/components/modals/CorfirmModal";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PaginationElement from "@/components/pagination/PaginationElement";

const Landing = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const { data, isLoading, error, isError } = useGetBooksQuery({page:currentPage, limit: 9});
    const [openDeleteModal, setOpenDeleteModal] = useState(false); 
    const [bookToBeDeleted, setBookToBeDeleted] = useState<IBook | null>(null); 

    const [deleteBook, {isLoading: deleteLoading}] = useDeleteBookMutation();

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"})
    }, [currentPage])

    const onDeleteConfirm = async(id: string) => {
        try{
            await deleteBook({id});
            toast.success("Book deleted successfully")
        } catch (err) {
            const error = err as TRTKError;
            const message = error?.data?.message || "Something went wrong";
            toast.error(message)
        }
    }

    if(isError && error){
        const err =  error as TRTKError;
        const message = err?.data?.message || "Something went wrong";
        toast.error(message);
    }

    return (
        <div>
            <div className="container mx-auto p-5">
                <h1 className="text-3xl font-bold">My Books</h1>
                <div className="mt-5">
                    {
                    isLoading ? (
                        <div className="flex justify-center">
                            <LoaderIcon className="animate-spin" size={40} />
                        </div>
                    ) : (
                        data?.data?.length ? (
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {data.data.map((book: IBook) => <BookCard book={book} setOpenDeleteModal={setOpenDeleteModal} setBookToBeDeleted={setBookToBeDeleted} key={book._id}/>)}
                            </div>
                            <PaginationElement setCurrentPage={setCurrentPage} currentPage={currentPage} meta={data.meta}/>
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
            <ConfirmModal 
                modalTitle="Are you sure?"
                modalDescription="All your information will be deleted"
                open={openDeleteModal}
                onOpenChange={setOpenDeleteModal}
                book={bookToBeDeleted}
                onConfirm={onDeleteConfirm}
                isLoading={deleteLoading}
            />
        </div >
    );
};

export default Landing;