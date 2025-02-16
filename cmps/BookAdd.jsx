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
}