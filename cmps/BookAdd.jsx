const { Link, Outlet } = ReactRouterDOM

export function BookAdd() {
    return <section >
        <h2>Add Book:</h2>
        <nav>
            <button><Link to='/add-book/SearchBook'>Search for a book</Link></button>
            <button><Link to='/add-book/alone'>    Add your own book</Link></button>
        </nav>
        <Outlet />
    </section>
}