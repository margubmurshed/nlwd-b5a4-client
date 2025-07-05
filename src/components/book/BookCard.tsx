import type { IBook } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDownUp, BadgeCheckIcon, BadgeX, Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

interface BookCardProps {
    book: IBook;
    setOpenDeleteModal: (open: boolean) => void;
    setBookToBeDeleted: (book: IBook) => void;
}
const BookCard = ({ book, setOpenDeleteModal, setBookToBeDeleted }: BookCardProps) => {
    const navigate = useNavigate();
    return (
        <Card className="w-full h-fit">
            <CardHeader>
                <CardTitle className="text-xl">{book.title}</CardTitle>
                <CardDescription>
                    <h2><b>Written by : </b>{book.author}</h2>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p><b>Genre : </b>{book.genre}</p>
                <p><b>ISBN : </b>{book.isbn}</p>
                <p><b>Copies : </b>{book.copies}</p>
                <p><b>Availability Status: </b>
                    {book.available ? (
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
            </CardContent>
            <CardFooter className="grid grid-cols-2 gap-2">
                <Button onClick={() => navigate(`/edit-book/${book._id}`)} className="cursor-pointer">
                    <Pencil /><span>Edit</span>
                </Button>
                <Button variant="destructive" onClick={() => {
                    setBookToBeDeleted(book)
                    setOpenDeleteModal(true)
                }}>
                    <Trash2 />Delete
                </Button>
                <Button  onClick={() => navigate(`/books/${book._id}`)} className="cursor-pointer">
                    <Eye />View
                </Button>
                <Button className="bg-[#3E2C20] hover:bg-[#3e2c20d0] cursor-pointer" onClick={() => navigate(`/borrow/${book._id}`)} disabled={!book.available && book.copies === 0}>
                    <ArrowDownUp /> Borrow
                </Button>

            </CardFooter>
        </Card>
    );
};

export default BookCard;