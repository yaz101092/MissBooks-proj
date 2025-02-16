import { bookService } from "../services/book.service.js"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { BookAdd } from "../cmps/BookAdd.jsx"

const { useEffect, useState } = React
const { Link } = ReactRouterDOM

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        console.log('Loading Books')
        loadBooks()
    }, [filterBy])
 
    async function loadBooks() {
        try {
            const books = await bookService.query(filterBy)
            setBooks(books)
        } catch (err) {
            console.error("Error loading books:", err)
        }
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
            })
            .catch(err => {
                console.log('Cannot remove book:', err)
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    if (!books) return <div className="loader">Loading...</div>
    return (
        <div className='books-container'>
            <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <Link to="/add-book" className="add-book-link">
                <button className="add-book">Add Book</button>
            </Link>

            <h2>Books list:</h2>  
            <BookList
                books={books}
                onRemoveBook={onRemoveBook}
            />
        </div>
    )

}
