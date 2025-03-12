import { bookService } from '../services/book.service.js'

const { useState, useEffect } = React;
const { useParams, useNavigate } = ReactRouter;

export function BookEdit() {
<<<<<<< HEAD
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
                    navigate('/book')
                })
        }
    }, [bookId])
=======
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
>>>>>>> 91c56d9f990f5cb32f7b684a602a6d6ef61aabe3

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

<<<<<<< HEAD
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
=======
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
>>>>>>> 91c56d9f990f5cb32f7b684a602a6d6ef61aabe3
            <form onSubmit={onSaveBook}>
                <label>
                    Title:
                    <input type="text" name="title" value={book.title} onChange={handleChange} required />
                </label>

                <label>
                    Author:
<<<<<<< HEAD
                    <input type="text" name="author" value={book.author} onChange={handleChange} required />
=======
                    <input type="text"  name="authors" value={book.authors} onChange={handleChange} required />
>>>>>>> 91c56d9f990f5cb32f7b684a602a6d6ef61aabe3
                </label>

                <label>
                    Price:
<<<<<<< HEAD
                    <input type="number" name="price" value={book.price} onChange={handleChangeListPrice} required />
=======
                    <input type="number"  name="amount" value={listPrice.amount} onChange={handleChangeListPrice} required />
>>>>>>> 91c56d9f990f5cb32f7b684a602a6d6ef61aabe3
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
