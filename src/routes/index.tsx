import App from "@/App"
import AddBook from "@/pages/AddBook"
import AllBooks from "@/pages/AllBooks"
import EditBook from "@/pages/EditBook"
import Landing from "@/pages/Landing"
import BorrowBook from "@/pages/BorrowBook"
import {createBrowserRouter} from "react-router"
import BorrowSummary from "@/pages/BorrowSummary"
import ViewBook from "@/pages/ViewBook"

export const router = createBrowserRouter([
    {path: "/", Component: App, children: [
        {index: true, Component: Landing},
        {path:"books", Component: AllBooks},
        {path:"create-book", Component: AddBook},
        {path:"/books/:id", Component: ViewBook},
        {path:"edit-book/:id", Component: EditBook},
        {path:"borrow/:bookId", Component: BorrowBook},
        {path:"borrow-summary", Component: BorrowSummary},
    ]}
])