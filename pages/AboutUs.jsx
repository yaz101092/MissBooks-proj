const { Link, Outlet } = ReactRouterDOM

export function AboutUs() {
    return<section className="AboutUs">
            <h2>About Us Page</h2>
            <p>we are a books application </p>

            {/* <nav>
                <Link to='/about/Team'><i className="fa-solid fa-people-group"></i> Team</Link>
                <Link to='/about/Goal'><i className="fa-brands fa-golang"></i>al</Link>
            </nav> */}
             <Outlet />


    </section>
        
    
        

}