import { useState } from "react";
import { Link } from "react-router";
import { fetchImagesByName } from "../api/realTimeImageSearch";
import ImageCard from "../components/ImageCard";
import { useAuth } from "../lib/AuthContext";

const Home = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [images, setImages] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [showNavbar, setShowNavbar] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const { userLogout } = useAuth()

    const fetchImages = async (name) => {
        setIsLoading(true)
        try {
            const fetchedImages = await fetchImagesByName(name)
            setImages(fetchedImages.data)
            console.log(fetchedImages.data)
        } catch (err) {
            console.error("Error fetching images", err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleOnSubmit = (e) => {
        if (e.key === "Enter") {
            fetchImages(searchQuery)
        }
    }

  return (
    <div className="app">
        <nav>
            <div className="logo-section">
                    <h1> Photo Explorer </h1>
            </div>
            <div className="search-section">
                <input 
                    className="search-input" 
                    type="text" 
                    placeholder="Type something..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={e => handleOnSubmit(e)}
                />
            </div>
            <div className="menu" onClick={() => setShowNavbar(prev => !prev)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={`navigation-section${showNavbar ? " show" : ""}`}>
                <Link className="liked-link"> Liked Images </Link>
                <button className="logout__button" onClick={userLogout}> Log out </button>
            </div> 
        </nav>
        {isLoading ? (
            <div className="loading">
                <div className="spinner" />
                <p> Loading... </p>
            </div>
            ) : (
            <div className="container">
                <div className="filter-container">
                    <h3 onClick={() => setShowFilter(prev => !prev)}> Filter </h3>
                    <div className={`filter-item-container${showFilter ? " show" : ""}`}>
                        <div className="filter-item">
                            <h5> Size: </h5>
                            <select>
                                <option> any </option>
                                <option> large </option>
                                <option> medium </option>
                                <option> icon </option>
                                <option> 400x300 </option>
                                <option> 640x480 </option>
                                <option> 800x600 </option>
                                <option> 1024x768 </option>
                            </select>
                        </div>
                    </div>

                    <div className={`filter-item-container${showFilter ? " show" : ""}`}>
                        <div className="filter-item">
                            <h5> By Limit: </h5>
                            <select>
                                <option> 20 </option>
                                <option> 40 </option>
                                <option> 60 </option>
                                <option> 80 </option>
                                <option> 100 </option>
                            </select>
                        </div>
                    </div>

                    <div className={`filter-item-container${showFilter ? " show" : ""}`}>
                        <div className="filter-item">
                            <h5> By File Type: </h5>
                            <select>
                                <option> any </option>
                                <option> jpg </option>
                                <option> jpeg </option>
                                <option> png </option>
                                <option> gif </option>
                                <option> svg </option>
                                <option> webp </option>
                                <option> ico </option>
                                <option> raw </option>
                            </select>
                        </div>
                    </div>
                </div>
                {images.length !== 0 ? (
                    <div className="images-container">
                        {images.map((image, key) => (
                            <ImageCard key={key} image={image}/>
                        ))}
                    </div>
                ) : (
                    <div className="empty-container">
                        <p> Start exploring images... </p>
                    </div>
                )}
            </div>
        )}    
    </div>
  )
}

export default Home 