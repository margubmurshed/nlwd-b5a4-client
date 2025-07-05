import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils";
import type { TPaginationMeta } from "@/types";

interface PaginationElementProps {
    setCurrentPage: (pageNumber: number) => void,
    currentPage: number,
    meta: TPaginationMeta
}

const PaginationElement = ({setCurrentPage, currentPage, meta}: PaginationElementProps) => {
    return (
        <Pagination className="mt-5">
            <PaginationContent>
                <PaginationItem className={cn({
                    "cursor-pointer": currentPage > 1,
                    "text-gray-400 select-none": currentPage === 1
                })}>
                    <PaginationPrevious onClick={() => {
                        if(currentPage > 1){
                            setCurrentPage(currentPage - 1)
                        }
                    }} />
                </PaginationItem>
                {Array.from({length: meta.totalPages}, (_,i) => {
                    const page = i + 1;
                    return (
                    <PaginationItem className="cursor-pointer">
                    <PaginationLink onClick={() => setCurrentPage(page)} isActive={currentPage === page}>{page}</PaginationLink>
                </PaginationItem>
                )
                })}
                <PaginationItem className="cursor-pointer">
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem className={cn({
                    "cursor-pointer": currentPage < meta.totalPages,
                    "text-gray-400 select-none": currentPage === meta.totalPages
                })}>
                    <PaginationNext onClick={() => {
                        if(!(meta.totalPages === currentPage)){
                            setCurrentPage(currentPage + 1)
                        }
                    }} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationElement;