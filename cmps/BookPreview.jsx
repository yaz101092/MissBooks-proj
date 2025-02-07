export function BookPreview({ book }) {

    return (
        <article className="car-preview">
            <h2>title: {book.title}</h2>
            <h4>Book price: {book.listPrice}</h4>
            {/* <img src={`../assets/img/${car.vendor}.png`} alt="car-image" /> */}
        </article>
    )
}