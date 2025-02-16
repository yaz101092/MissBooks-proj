import { bookService } from '../services/book.service.js'

const { useState, useEffect } = React;
const { useParams, useNavigate } = ReactRouter;

export function BookEdit() {
    const [book, setBook] = useState({
        title: '',
        author: '',
        price: '',
        description: '',
        pageCount: '',
        onSale: false
    })
    const { bookId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (bookId) {
            bookService.get(bookId)
                .then(setBook)
                .catch(err => {
                    console.log('Error loading book:', err)
                    navigate('/book') // במקרה של שגיאה חזרה לרשימת הספרים
                })
        }
    }, [bookId])

    // function handleChange({ target }) {
    //     const {name:field, type, checked } = target
    //     const fieldValue = type === 'checkbox' ? checked : value
    //     setBook((prevBook) => ({ ...prevBook, listPrice: {...prevBook.listPrice, [field]: value} }))
    // }

    // const { amount, isOnSale } = listPrice

    function handleChange({ target }) {
        const { type, name: field } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;
        }
        setBook(prevBook => ({ ...prevBook, [field]: value }))
    }

    function handleChangeListPrice({ target }) {
        const { type, name: field } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;
        }

        setBook(prevBook => ({
            ...prevBook,
            listPrice: { ...prevBook.listPrice, [field]: value }
        }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(book)
            .then(() => {
                navigate('/book')
            })
            .catch(err => {
                console.error('Error saving book:', err)
            })
    }

    return (
        <section className="book-edit">
            <h2>{bookId ? 'Edit Book' : 'Add New Book'}</h2>
            <form onSubmit={onSaveBook}>
                <label>
                    Title:
                    <input type="text" name="title" value={book.title} onChange={handleChange} required />
                </label>

                <label>
                    Author:
                    <input type="text" name="author" value={book.author} onChange={handleChange} required />
                </label>

                <label>
                    Price:
                    <input type="number" name="price" value={book.price} onChange={handleChangeListPrice} required />
                </label>

                <label>
                    Description:
                    <textarea name="description" value={book.description} onChange={handleChange} required />
                </label>

                <label>
                    Page Count:
                    <input type="number" name="pageCount" value={book.pageCount} onChange={handleChange} required />
                </label>

                <label>
                    On Sale:
                    <input type="checkbox" name="onSale" checked={book.onSale} onChange={handleChange} />
                </label>

                <button type="submit">Save</button>
                <button type="button" onClick={() => navigate('/book')}>Cancel</button>
            </form>
        </section>
    )
}
