import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useBorrowBookMutation, useGetBookQuery } from "@/redux/api/baseApi";
import toast from "react-hot-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ArrowUpDown, CalendarIcon, LoaderIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Navigate, useNavigate, useParams } from "react-router";
import BookCardWithoutActions from "@/components/book/BookCardWithoutActions";
import { useEffect, useState } from "react";
import type { TRTKError } from "@/types";

const borrowBookSchema = z.object({
    dueDate: z
        .date({
            required_error: "Due date is required",
            invalid_type_error: "Due date must be a valid date"
        })
        .refine((val) => {
            const todayDate = new Date();

            val.setHours(0, 0, 0, 0);
            todayDate.setHours(0, 0, 0, 0);

            return val >= todayDate;
        }, { message: "Due date can't be in the past." }),
    quantity: z.coerce.number({
        required_error: "Copies is required",
        invalid_type_error: "Copies must be a number"
    })
        .int("Copies must be an integer")
        .positive("Quantity must be greater than 0"),
})

type TBorrowBookFormData = z.infer<typeof borrowBookSchema>

const BorrowBook = () => {
    const { bookId } = useParams();
    const [open, setOpen] = useState(false);
    const { data, isLoading } = useGetBookQuery(bookId as string);
    const navigate = useNavigate();
    const form = useForm<TBorrowBookFormData>({
        resolver: zodResolver(borrowBookSchema),
        defaultValues: {
            quantity: 1,
            dueDate: new Date()
        }
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [])

    const [borrowBook, { isLoading: borrowBookLoading }] = useBorrowBookMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            if (bookId) {
                const borrowData = {
                    dueDate: new Date(data.dueDate).toISOString(),
                    book: bookId,
                    quantity: data.quantity
                }
                console.log(data)
                const response = await borrowBook(borrowData).unwrap();
                console.log(response)
                form.reset();
                toast.success("Book borrowed Successfully")
                navigate("/borrow-summary")
            }
        } catch (err) {
            const error = err as TRTKError;
            const message = error?.data?.message || "Something went wrong";
            toast.error(message)
        }
    }

    if (!bookId) {
        return <Navigate to="/" />
    }

    return (
        <div>
            <div className="container mx-auto p-5">
                <h1 className="text-3xl font-bold">Borrow Book</h1>
                <div className="mt-5">
                    {
                        isLoading
                            ? (
                                <div className="flex justify-center">
                                    <LoaderIcon className="animate-spin" size={40} />
                                </div>
                            )
                            : (

                                data ? (
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                        <div>
                                            <BookCardWithoutActions book={data} />
                                        </div>
                                        <div>
                                            <Form {...form}>
                                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="quantity"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Quantity</FormLabel>
                                                                <FormControl>
                                                                    <Input className="bg-white" placeholder="Enter borrow quantity" {...field} value={field.value || ""} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="dueDate"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-col">
                                                                <FormLabel>Due Date</FormLabel>
                                                                <Popover open={open} onOpenChange={setOpen}>
                                                                    <PopoverTrigger asChild>
                                                                        <FormControl>
                                                                            <Button
                                                                                variant={"outline"}
                                                                                className={cn(
                                                                                    "w-full pl-3 text-left font-normal",
                                                                                    !field.value && "text-muted-foreground"
                                                                                )}
                                                                            >
                                                                                {field.value ? (
                                                                                    format(field.value, "PPP")
                                                                                ) : (
                                                                                    <span>Pick a date</span>
                                                                                )}
                                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                            </Button>
                                                                        </FormControl>
                                                                    </PopoverTrigger>
                                                                    <PopoverContent className="w-auto p-0" align="start">
                                                                        <Calendar
                                                                            mode="single"
                                                                            selected={field.value}
                                                                            onSelect={(date) => {
                                                                                field.onChange(date)
                                                                                setOpen(false)
                                                                            }}
                                                                            disabled={(date) => date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
                                                                            }
                                                                            captionLayout="dropdown"
                                                                        />
                                                                    </PopoverContent>
                                                                </Popover>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <Button type="submit">{borrowBookLoading ? <LoaderIcon className="animate-spin" size={40} /> : <><ArrowUpDown />Borrow the book</>}</Button>
                                                </form>
                                            </Form>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <p>No book found to edit</p>
                                    </div>
                                )
                            )
                    }
                </div>
            </div>
        </div >
    );
};

export default BorrowBook;