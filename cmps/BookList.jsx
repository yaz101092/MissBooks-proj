import { BookPreview } from "./BookPreview.jsx";
const { Link } = ReactRouterDOM

export function BookList({ books, onRemoveBook }) {

    // const ulAttributes = {
    //     title: 'Some Pop Up',
    //     className: 'book-list'
    // }
    
    return (
        <section className="books-list">
            <ul>
                {books.map(book =>
                    <li key={book.id}>
                        <BookPreview book={book} />
                        <button onClick={() => onRemoveBook(book.id)} className="close">X</button>
                        <nav className="book-nav">
                            <Link to={`/book/${book.id}`}><button>Details</button></Link>
                            <button><Link to={`/book/edit/${book.id}`}>Edit</Link></button>
                        </nav>
                    </li>
                )}
            </ul>
        </section>

    )
}