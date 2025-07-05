# Minimal Library Management System - Client

A minimal yet functional library management system built using **React**, **Redux** and **TypeScript** and **ShadCN** components. This client-side application allows users to manage books, borrow them and view borrowing summary.

## Project Overview

This application is designed to showcase core CRUD functionalities, responsive design and proper state management using redux.

---

## Features

### Book Management
- **View Books** in a clean, responsive grid layout.
- **Pagination** in book grid for better performance and UX.
- **Add New Book** via form.
- **Edit existing Books** via form.
- **Optimistic Edit Update** after clicking update button which enhances User Experience. Rollbacks if update fails. 
- **Delete Books** with confirmation modal.
- **Business Logic**:
  - If copies is equal to 0, book is marked **unavailable**.
  - If copies is more than 0, book is eligible to be borrowed.

### Borrow Book
- Borrow form takes **Quantity** and **Due Date**
- Borrow quantity can not be more than number of copies available.
- After successful borrow, book is updated with actual available copies.
- Redirects to borrow summary page after successful borrowing

### Borrow Summary
- Desiplays all borrowed books with:
  - Book Title
  - ISBN
  - Total Quantity Borrowed all together (via backend aggregation).

Form validation using **zod** and **React Hook Form**. After successfully doing CRUD operations, success toasts are shown. If something goes wrong, error toast is shown with clear message. **React Hot Toast** is being used.

---

### Navigation

| Route | Description |
|--------|-------------|
| `/books`| Grid of all books with actions|
| `/create-book`| Form to add new book|
| `/books/:id`| View Details of a single book|
| `/edit-book/:id`| Edit an existing book|
| `/borrow/:bookId`| Borrow an existing book|
| `/borrow-summary`| Aggregated summary of borrowed books|

---

## Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | React + TypeScript |
| Backend | Redux Toolkit + RTK Query |
| UI | Tailwind CSS + ShadCN UI |
| Form | React Hook Form + Zod (Type-safe forms) |
| Toast | React Hot Toast |


## Installation & Running

### 1. Clone the Repository

```bash
https://github.com/margubmurshed/nlwd-b5a4-client.git
cd nlwd-b5a4-client
```

### 2. Install Dependencies
```bash
npm install 
# or
yarn
```
### 3. Set Environment Variable
Create a `.env` file in the root with:
```ini
VITE_API_URL=VITE_API_URL=https://your-api-domain.com/api
```

### 4. Run the Development Server
```bash
npm run dev
#or
yarn dev
```

## Project Structure
<pre>
  src
  |-- assets     # images
  |-- components # Reusable UI components
  |-- pages      # Route Pages
  |-- redux      # RTK Queries
  |-- routes     # Browser Router
  types.js       # All the TS types used
</pre>

## Live Demo
- Frontend: [Live Client URL](https://library-management-client-opal.vercel.app/)

## Author
Made by Margub Murshed - Full Stack Developer
