<<<<<<< HEAD
const { Link, Outlet } = ReactRouterDOM

export function BookAdd() {
    return <section >
        <h2>Add Book:</h2>
        <nav>
            <button><Link to='/add-book/SearchBook'>Search for a book</Link></button>
            <button><Link to='/add-book/alone'>    Add your own book</Link></button>
        </nav>
        <Outlet />
    </section>
=======
import { bookService } from "../services/book.service.js";
import { UserMsg } from "./UserMsg.jsx";
const { useState } = React;

export function BookAdd ( { onBookAdded } ) {
    const [searchTerm, setSearchTerm] = useState("");
    const [books, setBooks] = useState([]);

    function handleSearch({ target }) {
        const { value } = target;
        setSearchTerm(value);

        if (!value) {
            setBooks([]); 
            return;
        }

        bookService.getGoogleBooks(value) 
            .then(setBooks)
            .catch(err => console.error("Error fetching books:", err));
    }




    return (
        <section className="book-add">
            <h2>Search and Add Books</h2>
            <input
                type="text"
                placeholder="Search for books..."
                value={searchTerm}
                onChange={handleSearch}
            />
            {/* <button><i class="fa-duotone fa-solid fa-magnifying-glass"></i></button> */}
            <ul>
                {books.map(book =>
                    <li key={book.id}>
                    {book.title} <button>+</button>
                    </li>
                )}
            </ul>
        </section>
    )
>>>>>>> 91c56d9f990f5cb32f7b684a602a6d6ef61aabe3
}