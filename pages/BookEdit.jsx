import { bookService } from '../services/book.service.js'

const { useState, useEffect } = React;
const { useParams, useNavigate } = ReactRouter;

export function BookEdit() {
    const [book, setBook] = useState(bookService.getEmptyBook())
    const params = useParams()
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (params.bookId) {
    //         bookService.get(bookId)
    //             .then(setBook)
    //             .catch(err => {
    //                 console.log('Error loading book:', err)
    //                 navigate('/book') 
    //             })
    //     }
    // }, [bookId])

    useEffect(() => {
        if (params.bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(book)
            .then(() => console.log('Book has successfully saved!'))
            .catch((err) => console.log(`couldn't save book -`, err))
            .finally(() => navigate('/book'))
    }

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

    // function onSaveBook(ev) {
    //     ev.preventDefault()
    //     bookService.save(book)
    //         .then(() => {
    //             navigate('/book')
    //         })
    //         .catch(err => {
    //             console.error('Error saving book:', err)
    //         })
    // }

    const {
        title,
        authors,
        listPrice,
        description,
        pageCount,
    } = book


    return (
        <section className="book-edit">
            <h2>{params ? 'Edit Book' : 'Add New Book'}</h2>
            <form onSubmit={onSaveBook}>
                <label>
                    Title:
                    <input type="text" name="title" value={book.title} onChange={handleChange} required />
                </label>

                <label>
                    Author:
                    <input type="text"  name="authors" value={book.authors} onChange={handleChange} required />
                </label>

                <label>
                    Price:
                    <input type="number"  name="amount" value={listPrice.amount} onChange={handleChangeListPrice} required />
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
