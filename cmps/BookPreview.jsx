export function BookPreview({ book }) {
    const {  listPrice } = book
    return <article className="book-preview">
            <h3>{book.title}</h3> 
            <img src={book.thumbnail} alt={book.title} />
            <p> <span className="bold-txt">Price: </span>{listPrice.amount}</p>
            <p> <span className="bold-txt">Currency: </span>{listPrice.currencyCode} </p>    
            {listPrice.isOnSale && <img className="on-sale-icon" src="../assets/booksImages/sale-icon.png" alt="on sale icon" />}    
    </article>
}