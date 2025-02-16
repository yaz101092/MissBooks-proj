import { storageService } from "./async-storage.service.js"
import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import {  books as defaultBooks } from "../assets/data/books.js"
import axios from 'axios';


const BOOK_KEY = 'books'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    getGoogleBooks,
    addGoogleBook,
    addReview,
    getReviews,
    deleteReview,
}

const STORAGE_KEY = 'bookReviews';


function addReview(bookId, review) {
    const reviews = loadFromStorage(STORAGE_KEY) || {};
    if (!reviews[bookId]) reviews[bookId] = [];
    review.id = makeId(); // שימוש ב-makeId מ-utilService
    reviews[bookId].push(review);
    saveToStorage(STORAGE_KEY, reviews); // שימוש ב-saveToStorage מ-utilService
    return Promise.resolve();
}

function getReviews(bookId) {
    const reviews = loadFromStorage(STORAGE_KEY) || {};
    return Promise.resolve(reviews[bookId] || []);
}

function deleteReview(bookId, reviewId) {
    const reviews = loadFromStorage(STORAGE_KEY);
    if (!reviews[bookId]) return Promise.reject('No reviews found for this book');
    reviews[bookId] = reviews[bookId].filter(review => review.id !== reviewId);
    saveToStorage(STORAGE_KEY, reviews);
    return Promise.resolve();
}


function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.minListPrice) {
                books = books.filter(book => book.listPrice.amount >= filterBy.minListPrice)
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


function _createBooks() {
    let booksInStorage = loadFromStorage(BOOK_KEY)
    if (!booksInStorage || booksInStorage.length === 0) {
        const updatedBooks = defaultBooks.map((book, i) => ({
            ...book,
            thumbnail: `/assets/booksImages/${i + 1}.jpg`
        }))
        saveToStorage(BOOK_KEY, updatedBooks)
    }
}



function addGoogleBook(book) {
    return storageService.post(BOOK_KEY, book, false)
}
const gCache = {}
function getGoogleBooks(bookName) {
    if (bookName === '') return Promise.resolve()
    const googleBooks = gCache[bookName]
    if (googleBooks) {
        console.log('data from storage...', googleBooks)
        return Promise.resolve(googleBooks)
    }

    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${bookName}`
    return axios.get(url)
        .then(res => {
            const data = res.data.items
            console.log('data from network...', data)
            const books = _formatGoogleBooks(data)
            gCache[bookName] = books
            utilService.saveToStorage(CACHE_STORAGE_KEY, gCache)
            return books
        })
}


function _formatGoogleBooks(googleBooks) {
    return googleBooks.map(googleBook => {
        const { volumeInfo } = googleBook
        const book = {
            id: googleBook.id,
            title: volumeInfo.title,
            description: volumeInfo.description,
            pageCount: volumeInfo.pageCount,
            authors: volumeInfo.authors,
            categories: volumeInfo.categories,
            publishedDate: volumeInfo.publishedDate,
            language: volumeInfo.language,
            listPrice: {
                amount: utilService.getRandomIntInclusive(80, 500),
                currencyCode: "EUR",
                isOnSale: Math.random() > 0.7
            },
            reviews: []
        }
        if (volumeInfo.imageLinks) book.thumbnail = volumeInfo.imageLinks.thumbnail
        return book
    })
}