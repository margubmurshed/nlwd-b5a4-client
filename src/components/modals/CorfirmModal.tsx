import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { IBook } from "@/types";
import { Loader } from "lucide-react";

interface CorfirmModalProps {
    modalTitle: string;
    modalDescription: string;
    book: IBook | null
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: (id: string) => void;
    isLoading: boolean;
}

const CorfirmModal = ({ modalTitle, modalDescription, book, open, onOpenChange, onConfirm, isLoading }: CorfirmModalProps) => {
    return (
        <Dialog open={open || isLoading} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{modalTitle}</DialogTitle>
                    <DialogDescription>{modalDescription}</DialogDescription>
                    <div>
                        <p>Book : {book?.title}</p>
                        <h2><b>Author : </b>{book?.author}</h2>
                        <p><b>Genre : </b>{book?.genre}</p>
                        <p><b>ISBN : </b>{book?.isbn}</p>
                        <p><b>Copies : </b>{book?.copies}</p>
                    </div>
                </DialogHeader>
                <DialogFooter>
                    <Button disabled={isLoading} variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button disabled={isLoading} onClick={() => {
                        onConfirm(book?._id || "");
                        onOpenChange(false)
                    }}>{isLoading? <Loader className="animate-spin"/> : "Confirm"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CorfirmModal;