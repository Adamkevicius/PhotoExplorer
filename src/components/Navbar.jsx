import { useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../lib/AuthContext'
import '../styles/navbar.css'

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState()
    const { userLogout } = useAuth()
    
  return (
    <nav>
        <div className="logo__section">
            <h1> Photo Explorer </h1>
        </div>
        <div className="menu" onClick={() => setShowNavbar(prev => !prev)}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div className={`navigation__section${showNavbar ? " show" : ""}`}>
            <Link className="liked__link"> Liked Images </Link>
            <button className="logout__button" onClick={userLogout}> Log out </button>
        </div> 
    </nav>
  )
}

export default Navbar
