const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { AppHeader } from "./cmps/AppHeader.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { AboutUs } from "./cmps/AboutUs.jsx";
import { BooksIndex } from "./pages/BookIndex.jsx";
import { BookDetails } from "./pages/BookDetails.jsx"


export function App() {
    return (
        <Router>
            <section className="app">
                <AppHeader />
                <main className="main-layout">
                    <Routes>
                        <Route path="/" element={<Navigate to="/HomePage" />} />
                        <Route path="/HomePage" element={<HomePage />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/book" element={<BooksIndex />} />
                        <Route path="/book/:bookId " element={<BookDetails />} />
                    </Routes>
                </main>
            </section>
        </Router>
    )
}