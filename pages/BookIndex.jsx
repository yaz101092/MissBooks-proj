import { bookService } from "../services/book.service.js"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"

const { useEffect, useState } = React
const { Link } = ReactRouterDOM

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    // function loadBooks() {
    //     bookService.query(filterBy)
    //         .then(setBooks)
    //         .catch(err => {
    //             console.log('Cannot get books:', err)
    //         })
    // }
    // async function loadBooks() {
    //     let books = await bookService.query(filterBy) // מביא את הספרים מהשירות
    //     if (!books || books.length === 0) {
            
    //     }
    //     setBooks(books)
    // }
 
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
        <section className="car-index">
            <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            {/* <Link to="/book/edit">Add Book</Link> */}
            <BookList
                books={books}
                onRemoveBook={onRemoveBook}
            />
        </section>
    )

}
