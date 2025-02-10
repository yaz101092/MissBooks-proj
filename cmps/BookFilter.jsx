import { bookService } from "../services/book.service.js"
const { useState, useEffect } = React


export function BookFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

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
                value = target.checked
                break
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    const { title, minListPrice } = filterByToEdit
    return (
        <section className="car-filter">
            <h2>Filter Our Books</h2>
            <form>
                <label htmlFor="title">Title</label>
                <input onChange={handleChange} value={title} type="text" name="title" id="title" />

                <label htmlFor="minListPrice">Min Price</label>
                <input onChange={handleChange} value={minListPrice || ''} type="number" name="minListPrice" id="minListPrice" />

                <button>Submit</button>
            </form>
        </section>
    )
}