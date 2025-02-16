import { bookService } from "../services/book.service.js";
import { BookLongTxt } from "../cmps/BookLongTxt.jsx";
import { AddReview } from "../cmps/AddReview.jsx";

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

export function BookDetails() {

    const [book, setBook] = useState(null)
    const [reviews, setReviews] = useState([]);
    
    const params = useParams()
    const navigate = useNavigate()
    
    
    useEffect(() => {
        loadBook();
        loadReviews();
    }, [params.bookId])

    function loadBook() {
        setBook(null)
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('Cannot load book:', err)
            })
    }

    function loadReviews() {
        bookService.getReviews(params.bookId)
            .then(reviews => setReviews(reviews))
            .catch(err => console.error("Error fetching reviews:", err));
    }

    function handleAddReview() {
        loadReviews();
    }

    function handleDeleteReview(reviewId) {
        bookService.deleteReview(params.bookId, reviewId)
            .then(() => loadReviews())
            .catch(err => console.error("Error deleting review:", err));
    }

    function getStars(rating) {
    return '⭐'.repeat(rating);
}

    
    if (!book) return <div className="loader">Loading...</div>
    const priceClass = book.listPrice.amount > 150 ? 'high-price' : book.listPrice.amount < 20 ? 'low-price' : 'mid-price';
    const publishedDateClass = book.publishedDate >= 10 ? 'vintage' : book.publishedDate <= 1 ? 'new' : '';
    const pageCountClass = book.pageCount < 100 ? 'light': book.pageCount > 200 && book.pageCount < 500 ? 'descent':  book.pageCount > 500 ? 'serious': '';

    return (
        <article className='book-details'>
            {<nav className='book-details-nav'>
                <Link to={`/book/${book.prevBookId}`}><button><i className="fa-solid fa-arrow-left"></i></button></Link>
                <Link to={`/book/${book.nextBookId}`}><button><i class="fa-solid fa-arrow-right"></i></button></Link>   
            </nav> }

            <h2>{book.title}</h2>

            <p className={priceClass}>
             <span className='bold-txt'>Price: </span>
                {book.listPrice.amount} {book.listPrice.currencyCode}
            </p>

            <h3>Author: {book.authors}</h3>

            <h3>Categoric: <span>{book.categories}</span></h3>

            <img className="book-img" src={book.thumbnail} alt="" />

            <h3>
                Published Date: {book.publishedDate}
                <span className={publishedDateClass}> {(new Date().getFullYear() - book.publishedDate) > 10 ? "-Vintage": (new Date().getFullYear() - book.publishedDate) <= 1 ? "-New": "" }</span>
            </h3>
            <h3>
                Page Count: {book.pageCount} 
                <span className={pageCountClass}>{book.pageCount < 100 ? " -Light Reading": book.pageCount > 200 && book.pageCount < 500 ? " -Descent Reading":  book.pageCount > 500 ? " -Serious Reading": ""}</span>
            </h3>

            <h3>Language: {book.language}</h3>

            <h3 className="description-title">Description: </h3>
            <p><BookLongTxt txt = {book.description}/></p>

            {book.listPrice.isOnSale && <img className="on-sale-icon" src="/assets/booksImages/sale-icon.png.png" alt="on sale icon" /> }

            <AddReview bookId={params.bookId} onAddReview={handleAddReview} />

            <h3>Reviews:</h3>
            {reviews.length > 0 ? (
                <ul>
                    {reviews.map((review) => (
                        <li key={review.id}>
                            <p>Full Name: <strong>{review.fullname}</strong></p>
                            <p>Read At: <strong>({review.readAt})</strong></p>
                            <p>Rating: {getStars(review.rating)}</p>

                            <button className="delete-btn" onClick={() => handleDeleteReview(review.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ): (<p> No reviews yet.. </p>)}

            <button className='close'>
                <Link to='/book'>X</Link>
            </button>
        </article>
    )
}
