import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetBookQuery, useUpdateBookMutation } from "@/redux/api/baseApi";
import toast from "react-hot-toast";
import { Navigate, useNavigate, useParams } from "react-router";
import { LoaderIcon, CircleCheckBig } from "lucide-react";
import { useEffect } from "react";
import type { TRTKError } from "@/types";

const bookSchema = z.object({
    title: z.string().trim().min(1, "Title is required").refine(val => !/\d/.test(val), {
        message: "Title should not contain numbers"
    }),
    author: z.string().min(1, "Author is required").trim(),
    genre: z.enum(["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]),
    isbn: z.string().regex(/^\d{13}$/, "ISBN must be a 13-digit numeric string"),
    description: z.string().optional(),
    copies: z.coerce.number({
        required_error: "Copies is required",
        invalid_type_error: "Copies must be a number"
    }).int("Copies must be an integer").min(0, "Copies must be a non-negative number"),
    available: z.boolean().optional()
}).refine(data => {
    if (data.copies === 0 && data.available === true) return false;
    if (data.copies > 0 && data.available === false) return false;
    else return true
}, { message: "If copies > 0, availability must be true. If copies = 0, availability must be false", path: ["available"] })

type TBookFormData = z.infer<typeof bookSchema>

const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useGetBookQuery(id as string);
    const [updateBook, { isLoading: updateBookLoading }] = useUpdateBookMutation();

    const form = useForm<TBookFormData>({
        resolver: zodResolver(bookSchema),
    });

    const copies = form.watch("copies");

    useEffect(() => {
        if (data) {
            form.reset(data)
        }
    }, [data, form])

    useEffect(() => {
        if (copies !== undefined) {
            if (Number(copies) === 0 && form.getValues("available") === true) {
                form.setValue("available", false);
            } else if (copies > 0 && form.getValues("available") === false) {
                form.setValue("available", true);
            }
        }
    }, [copies, form]);


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            if (id) {
                await updateBook({ id, updatedBookData: data }).unwrap();
                toast.success("Book Updated Successfully");
                navigate("/")
            }
        } catch (err) {
            const error = err as TRTKError;
            const message = error?.data?.message || "Something went wrong";
            toast.error(message)
        }
    }

    if (!id) {
        return <Navigate to="/" />
    }

    return (
        <div>
            <div className="container mx-auto p-5">
                <h1 className="text-3xl font-bold">Edit Book</h1>
                <div className="mt-5">
                    {isLoading ? (
                        <div className="flex justify-center">
                            <LoaderIcon className="animate-spin" size={40} />
                        </div>
                    ) : (
                        data ? (
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                    <Input className="bg-white" placeholder="Enter book title" {...field} value={field.value || ""} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea className="bg-white" placeholder="Enter book description" {...field} value={field.value || ""} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="author"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Author</FormLabel>
                                                <FormControl>
                                                    <Input className="bg-white" placeholder="Enter author name" {...field} value={field.value || ""} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="genre"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Genre</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value || data.genre}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full bg-white">
                                                            <SelectValue placeholder="Select a genre" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"].map(value => <SelectItem value={value} key={value}>{value}</SelectItem>)}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )
                                        }
                                    />
                                    <FormField
                                        control={form.control}
                                        name="isbn"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>ISBN</FormLabel>
                                                <FormControl>
                                                    <Input className="bg-white" placeholder="Enter book's 13 digit ISBN number" {...field} value={field.value || ""} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="copies"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Copies</FormLabel>
                                                <FormControl>
                                                    <Input className="bg-white" type="number" placeholder="Enter available book copies" {...field} value={field.value || 0} min={0} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="available"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Availability</FormLabel>
                                                <Select onValueChange={val => field.onChange(val === "true")} value={field.value?.toString() || "true"}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full bg-white">
                                                            <SelectValue placeholder="Select book availability" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="true">True</SelectItem>
                                                        <SelectItem value="false">False</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="text-center"><Button type="submit">{updateBookLoading ? <LoaderIcon className="animate-spin" size={40} /> : <><CircleCheckBig /> Update Book</>}</Button></div>
                                </form>
                            </Form>
                        ) : (
                            <div className="text-center">
                                <p>No book found to edit</p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div >
    );
};

export default EditBook;