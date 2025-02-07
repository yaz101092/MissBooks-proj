import { storageService } from "./async-storage.service.js"
import { loadFromStorage, makeId, saveToStorage } from './util.service.js'


const BOOK_KEY = 'BOOK'
_creatBooks()

export const bookService = {
    getEmptyBook,
    query,
    get,
    remove,
    save,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.listPrice) {
                books = books.filter(book => book.listPrice >= filterBy.minListPrice)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(_setNextPrevBookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', listPrice = '') {
    return { title, listPrice }
}

function getDefaultFilter() {
    return { title: '', minListPrice: '' }
}

function _setNextPrevBookId(book) {
    return query().then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}

function _creatBooks() {
    let books = loadFromStorage(BOOK_KEY)
    if(!books || !books.length) {
        books = [
            _creatBook('metus hendrerit', '109'),
            _creatBook('morbi', '44'),
            _creatBook('at viverra venenatis', '108')
        ]
        saveToStorage(BOOK_KEY, books)
    }
}

function _creatBook(title, listPrice) {
    const book = getEmptyBook(title, listPrice)
    book.id = makeId()
    return book
}