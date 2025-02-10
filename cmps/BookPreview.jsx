export function BookPreview({ book }) {
    const { title, listPrice } = book
    const { amount, currencyCode, isOnSale } = listPrice
    return (
        <article className="car-preview">
            <h2>title: {book.title}</h2>
            <p>
               price: {amount} {currencyCode} {isOnSale ? "(On Sale)": ""} 
            </p>
            {/* <img src={book.thumbnail} alt={book.title} /> */}
            {/* <img src={`../assets/img/${car.vendor}.png`} alt="car-image" /> */}
        </article>
    )
}