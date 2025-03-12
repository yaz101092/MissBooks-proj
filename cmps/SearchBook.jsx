import { bookService } from "../services/book.service.js";
import { UserMsg } from "./UserMsg.jsx";
const { useState } = React;
const { Link } = ReactRouterDOM

export function SearchBook( { onBookAdded } ) {
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

    function handleAddBook(book) {
        bookService
          .addGoogleBook(book)
          .then((savedBook) => {
            onBookAdded(savedBook);
            setTimeout(() => alert("Book added successfully!"), 0);
          })
          .catch((err) => console.error("Error adding book:", err));
      }


    return (
        <section className="book-add">
            <h3>Search and Add Books</h3>
            <button>
                <Link to='/book'>Back</Link>
            </button>
            <input
                type="text"
                placeholder="Search for books..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <ul>
                {books.map(book =>
                    <li key={book.id}>
                    {book.title} <button onClick={() => handleAddBook(book)}>+</button>
                    </li>
                )}
            </ul>
        </section>
    )
}