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
                    <Route path="/add-book" element={<BookAdd />} />
                    <Route path="/book/edit/:bookId" element={<BookEdit />} />
                    <Route path="/book/edit" element={<BookEdit/>} />
                </Routes>
            </main>
            <UserMsg />
        </Router>
    )
}