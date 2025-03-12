const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { AppHeader } from "./cmps/AppHeader.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { BookAdd } from "./cmps/BookAdd.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"
<<<<<<< HEAD
import { SearchBook } from "./cmps/SearchBook.jsx"
import { AddAlone } from "./cmps/AddAlone.jsx"
=======
>>>>>>> 91c56d9f990f5cb32f7b684a602a6d6ef61aabe3



export function RootCmp() {
    return (
        <Router>
            <AppHeader />
            <main className="content-grid">
                <Routes>
                    <Route path="/" element={<Navigate to="/HomePage" />} />
                    <Route path="/HomePage" element={<HomePage />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/book" element={<BookIndex />} />
                    <Route path="/book/:bookId" element={<BookDetails />} />
<<<<<<< HEAD
                    <Route path="/add-book" element={<BookAdd />} >
                        <Route path='/add-book/SearchBook' element={<SearchBook />} />
                        <Route path='/add-book/alone' element={<AddAlone />} />
                    </Route>
=======
                    <Route path="/add-book" element={<BookAdd />} />
>>>>>>> 91c56d9f990f5cb32f7b684a602a6d6ef61aabe3
                    <Route path="/book/edit/:bookId" element={<BookEdit />} />
                    <Route path="/book/edit" element={<BookEdit/>} />
                </Routes>
            </main>
            <UserMsg />
        </Router>
    )
}