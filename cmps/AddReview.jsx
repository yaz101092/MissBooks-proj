const {useState} = React

<<<<<<< HEAD
=======
// import React from 'react';
>>>>>>> 91c56d9f990f5cb32f7b684a602a6d6ef61aabe3
import { bookService } from '../services/book.service.js'

export function AddReview({ bookId, onAddReview }) {
    const [review, setReview] = useState({
        fullname: "",
        rating: 1,
        readAt: "",
    });

    const [isReviewOpen, setIsReviewOpen] = useState(false)

    function handleChange({ target }) {
        const { name, value } = target;
        setReview((prevReview) => ({ ...prevReview, [name]: value }));
    }

    function handleSubmit(ev) {
        ev.preventDefault();
        if (!review.fullname || !review.readAt) return;

        bookService.addReview(bookId, review)
            .then(() => {
                onAddReview();
                setIsReviewOpen(false);
                setReview({ fullname: "", rating: 1, readAt: "" });
            })
            .catch(err => console.error("Error adding review:", err));
    }

    function closeModal() {
        setIsReviewOpen(false);
    }

    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }


    return (
        <section className="add-review">
            <button onClick={() => setIsReviewOpen(true)}>Add Review</button>

            {isReviewOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button onClick={closeModal} className="close-btn">X</button>
                        <h3>Add Review:</h3>
                        <br />
                        <form onSubmit={handleSubmit}>
                            <label>
                                Full Name: 
                                <input
                                    type="text"
                                    name="fullname"
                                    value={review.fullname}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            <label>
                                Rating:
                                <select name="rating" value={review.rating} onChange={handleChange}>
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <option key={num} value={num}>
                                            {num} ⭐
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Read At:
                                <input
                                    type="date"
                                    name="readAt"
                                    value={review.readAt}
                                    onChange={handleChange}
                                    max={getCurrentDate()}
                                    required
                                />
                            </label>

                            <button type="submit">Submit Review</button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}

<<<<<<< HEAD

=======
    // return (
    //     <section className="Add-Review">
    //         <button>Add a Review</button>
    //         <form onSubmit={handleSubmit}>
    //             <label>
    //                 Full Name:
    //                 <input
    //                     type="text"
    //                     name="fullname"
    //                     value={review.fullname}
    //                     onChange={handleChange}
    //                     required
    //                 />
    //             </label>

    //             <label>
    //                 Rating:
    //                 <select name="rating" value={review.rating} onChange={handleChange}>
    //                     {[1, 2, 3, 4, 5].map((num) => (
    //                         <option key={num} value={num}>
    //                             {num} ⭐
    //                         </option>
    //                     ))}
    //                 </select>
    //             </label>

    //             <label>
    //                 Read At:
    //                 <input type="date" name="readAt" value={review.readAt} onChange={handleChange} required />
    //             </label>

    //             <button type="submit">Submit Review</button>
    //         </form>
    //     </section>
    // );

//     return (
//         <section className="Add-Review">
//             <button onClick={() => setIsReviewOpen(true)}>Add a Review</button>

//             {isReviewOpen && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <button onClick={() => setIsReviewOpen(false)} className="close-btn">X</button>
//                         <h3>Add a Review</h3>
//                         <form onSubmit={handleSubmit}>
//                             <label>
//                                 Full Name:
//                                 <input
//                                     type="text"
//                                     name="fullname"
//                                     value={review.fullname}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </label>

//                             <label>
//                                 Rating:
//                                 <select name="rating" value={review.rating} onChange={handleChange}>
//                                     {[1, 2, 3, 4, 5].map((num) => (
//                                         <option key={num} value={num}>
//                                             {num} ⭐
//                                         </option>
//                                     ))}
//                                 </select>
//                             </label>

//                             <label>
//                                 Read At:
//                                 <input
//                                     type="date"
//                                     name="readAt"
//                                     value={review.readAt}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </label>

//                             <button type="submit">Submit Review</button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </section>
//     );
// }
>>>>>>> 91c56d9f990f5cb32f7b684a602a6d6ef61aabe3
