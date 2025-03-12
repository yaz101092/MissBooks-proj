const { Link, Outlet } = ReactRouterDOM

export function AboutUs() {
    return<section className="AboutUs">
            <h2>About Us Page</h2>
            <p>we are a books application </p>
             <Outlet />
    </section>
        
    
        

}