import { bookService } from "../services/book.service.js";

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {

    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

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
            <h1>Book price: {book.listPrice}</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis quae fuga eveniet, quisquam ducimus modi optio in alias accusantium corrupti veritatis commodi tenetur voluptate deserunt nihil quibusdam. Expedita, architecto omnis?</p>
            <img src={`../assets/img/${car.vendor}.png`} alt="car-image" />
            <button onClick={onBack}>Back</button>
            <section>
                <button ><Link to={`/book/${book.prevBookId}`}>Prev book</Link></button>
                <button ><Link to={`/book/${book.nextBookId}`}>Next book</Link></button>
            </section>
        </section>
    )
}
