import { bookService } from "../services/book.service.js";

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {

    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    console.log(params);
    
    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        setBook(null)
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('Cannot load book:', err)
            })
    }

    function onBack() {
        navigate('/book')
       
    }
    
    if (!book) return <div className="loader">Loading...</div>
    return (
        <section className="car-details">
            <h1>Book title: {book.title}</h1>
            <h1>
            Book Price: <span style={{ color: book.listPrice.amount > 150 ? "red" : book.listPrice.amount < 20 ? "green" : "black", marginLeft: "5px" }}>
                    {book.listPrice.amount} {book.listPrice.currencyCode}</span>
                   {book.listPrice.isOnSale && <span style={{ color: "rgba(12, 115, 184, 0.66)", fontWeight: "bold", marginLeft: "10px", textDecoration: "underline" }}> On Sale!</span>}
            </h1>
            {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis quae fuga eveniet, quisquam ducimus modi optio in alias accusantium corrupti veritatis commodi tenetur voluptate deserunt nihil quibusdam. Expedita, architecto omnis?</p> */}
            {/* <img src={`../assets/img/${car.vendor}.png`} alt="car-image" /> */}

            <p>
                page count: {book.pageCount} {book.pageCount < 100 ? "-Light Reading": book.pageCount > 200 && book.pageCount < 500 ? "-Descent Reading":  book.pageCount > 500 ? " -Serious Reading": ""}
            </p>
            <p>
                published Date: {book.publishedDate} {(new Date().getFullYear() - book.publishedDate) > 10 ? "-Vintage": (new Date().getFullYear() - book.publishedDate) <= 1 ? "-New": "" }
            </p>
            <button onClick={onBack}>Back</button>
            <section>
                <button ><Link to={`/book/${book.prevBookId}`}>Prev book</Link></button>
                <button ><Link to={`/book/${book.nextBookId}`}>Next book</Link></button>
            </section>
        </section>
    )
}
