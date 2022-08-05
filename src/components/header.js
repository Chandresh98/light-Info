import React from 'react';
import '../App.css';
import { Link , useNavigate} from 'react-router-dom'


let Header = function () {
    const auth = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.clear()
        navigate('/login')
    }
    return (
        <header id="home">
            <nav>
                <div className="navbar">
                    <div className="logo">
                        Lets<span>Blog</span>
                    </div>
                    <div className="menu">
                        <div className='links'>    
                        <Link to="/">Home</Link>
                        <Link to="/service">Service</Link>
                        <Link to="/about">About</Link>
                        <Link to="/contactUs">Contact-Us</Link>
                        </div>

                        <div className="login">
                        
                        
                       { auth ?<>
                       <Link to="/getUser">Profile</Link>
                       <Link onClick={logout} to="/logout">(Hi {JSON.parse(user).name})LogOut</Link>
                       </>:<>
                       <Link to="/registration">Sign-Up</Link>
                        <Link to="/login">Login</Link>
                        </>}
                        
                        </div>
                    </div>
                </div>
            </nav>

            <section className="h-text">
                <h1 data-aos="zoom-in-down" data-aos-delay="100">Publish your passions,your way</h1>
                <h3 data-aos="zoom-in-down" data-aos-delay="100">Create a unique and beautiful blog easily.</h3>
                <button type="button" className="createblog">CREATE-BLOG</button>
                <div className="input-group">
                    <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                        aria-describedby="search-addon" />
                    <button type="button" className="btn btn-outline-primary">Search</button>
                </div>
            </section>
        </header>

    )
}

export default Header;


