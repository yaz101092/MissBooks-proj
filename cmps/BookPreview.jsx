export function BookPreview({ book }) {
    const {  listPrice } = book
<<<<<<< HEAD
=======
    // const { amount, currencyCode, isOnSale } = listPrice
>>>>>>> 91c56d9f990f5cb32f7b684a602a6d6ef61aabe3
    return <article className="book-preview">
            <h3>{book.title}</h3> 
            <img src={book.thumbnail} alt={book.title} />
            <p> <span className="bold-txt">Price: </span>{listPrice.amount}</p>
            <p> <span className="bold-txt">Currency: </span>{listPrice.currencyCode} </p>    
            {listPrice.isOnSale && <img className="on-sale-icon" src="../assets/booksImages/sale-icon.png" alt="on sale icon" />}    
    </article>
}