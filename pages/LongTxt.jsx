import { bookService } from "../services/book.service.js"
const { useState } = React

export function LongTxt(txt, length=100) {

    const [isExpanded, setIsExpanded] = useState(false)
    const [book, setBook] = useState(null)
    loadBook()
    function loadBook() {
        setBook(null)
        bookService.get()
            .then(setBook)
            .catch(err => {
                console.log('Cannot load book:', err)
            })
    }
    if(!isExpanded) {
        (book.description + "...")
    } else {
        book.description
    }

    return (
        <sapn className='book-long-txt'>
            {!isExpanded ? `${book.description} + '...'`: `${book.description}`}
            {book.description < length ? "": <button onClick={!isExpanded}>read more</button>}
        </sapn>

        
    )
}

