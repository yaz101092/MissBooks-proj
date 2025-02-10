import { storageService } from "./async-storage.service.js"
import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { books, books as defaultBooks } from "../assets/data/books.js"


const BOOK_KEY = 'books'
_creatBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter
}

// async function query(filterBy = {}) {
//     let books = loadFromStorage(BOOK_KEY) || [] 
//     if (!Array.isArray(books)) {  
//         books = []
//     }

//     if (filterBy.title) {
//         const regExp = new RegExp(filterBy.title, 'i')
//         books = books.filter(book => regExp.test(book.title))
//     }
//     if (filterBy.minListPrice) {
//         books = books.filter(book => book.listPrice.amount >= filterBy.minListPrice)
//     }

//     return Promise.resolve(books)
// }

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.minListPrice) {
                books = books.filter(book => book.listPrice.amount >= filterBy.minListPrice)
            }
            return books
        })
}

// async function get(bookId) {
//     const book = books.find(book => book.id === bookId)
//     if (!book) return Promise.reject('Book not found') 
//     return Promise.resolve(_setNextPrevBookId(book))
// }

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(_setNextPrevBookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return saveToStorage.put(BOOK_KEY, book)
    } else {
        return saveToStorage.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', listPrice = '') {
    return { title, listPrice }
}

function getDefaultFilter() {
    return { title: '', minListPrice: '' }
}

async function _setNextPrevBookId(book) {
    const books = await query()
    const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
    const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
    const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
    book.nextBookId = nextBook.id
    book.prevBookId = prevBook.id
    return book
}

function _creatBooks() {
    let booksInStorage = loadFromStorage(BOOK_KEY)
    if (!booksInStorage || booksInStorage.length === 0) {
        saveToStorage(BOOK_KEY, defaultBooks)
    }
}


// function _creatBooks() {
//     let books = loadFromStorage(BOOK_KEY)
//     if(!books || !books.length) {
//         books = [
//             _creatBook('metus hendrerit', '109'),
//             _creatBook('morbi', '44'),
//             _creatBook('at viverra venenatis', '108')
//         ]
//         saveToStorage(BOOK_KEY, books)
//     }
// }

// function _creatBook(title, listPrice) {
//     const book = getEmptyBook(title, listPrice)
//     book.id = makeId()
//     return book
// }