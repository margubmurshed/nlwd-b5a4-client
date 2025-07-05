import type { IBook } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BadgeCheckIcon, BadgeX } from "lucide-react";

interface BookCardWithoutActionsProps {
    book: IBook
}
const BookCardWithoutActions = ({ book }: BookCardWithoutActionsProps) => {
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
        </Card>
    );
};

export default BookCardWithoutActions;