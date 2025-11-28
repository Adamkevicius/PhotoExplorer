import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { useAuth } from '../lib/AuthContext'
import '../styles/navbar.css'

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState()
    const { userLogout } = useAuth()
    
  return (
    <nav>
        <Link to={"/"} className="logo__section">
            <h1> Photo Explorer </h1>
        </Link>
        <div className="menu" onClick={() => setShowNavbar(prev => !prev)}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div className={`navigation__section${showNavbar ? " show" : ""}`}>
            <NavLink to={"/liked-images"} className="liked__link"> Liked Images </NavLink>
            <button className="logout__button" onClick={userLogout}> Log out </button>
        </div> 
    </nav>
  )
}

export default Navbar
