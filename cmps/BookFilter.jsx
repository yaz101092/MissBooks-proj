import { bookService } from "../services/book.service.js"
const { useState, useEffect } = React


export function BookFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field } = target
         switch (target.type) {
            case 'range':
            case 'number':
                value = +target.value
                break
            case 'checkbox':
                value = target.value
                break
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }


    function reset() {
        setFilterByToEdit(bookService.getDefaultFilter())
    }

    const { title, minListPrice } = filterByToEdit
    return (
        <section className="book-filter">
            <h3>Filter Our Books:</h3>
            <form>
                <label htmlFor="title">Title:</label>
                <input onChange={handleChange} value={title} type="text" name="title" id="title" />
                <label htmlFor="minListPrice">Min Price:</label>
                <input onChange={handleChange} value={minListPrice || ''} type="number" name="minListPrice" id="minListPrice" />
                <button onClick={reset}>Reset</button>
            </form>
        </section>
    )
}