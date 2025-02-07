const { NavLink } = ReactRouterDOM


export function AppHeader() {

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>Miss Books App</h1>
                <nav className="app-nav">
                    <NavLink to="/HomePage">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/book">Books</NavLink>
                </nav>
            </section>
        </header>
    )
}
