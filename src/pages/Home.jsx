import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { fetchImages } from "../api/realTimeImageSearch";
import ImageCard from "../components/ImageCard";
import Navbar from "../components/Navbar";
import '../styles/home.css';

const Home = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [images, setImages] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [showFilter, setShowFilter] = useState(false)
    const [limit, setLimit] = useState("50")
    const [size, setSize] = useState("any")
    const [fileType, setFileType] = useState("any")

    const getImages = async () => {
        setIsLoading(true)
        try {
            const fetchedImages = await fetchImages(searchQuery, limit, size, fileType)

            setImages(fetchedImages.data);
        } catch (err) {
            console.error("Error fetching images", err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleOnSubmit = (e) => {
        if (e.key === "Enter") {
            if (searchQuery.length === 0) {
                return
            }
            else {
                getImages()
            }
        }
    }

    const handleOnClick = () => {
        if (searchQuery.length === 0) {
            return
        } else {
            getImages
        }
    }

  return (
    <div className="app">
        <Navbar />
        <div className="search__section">
            <input 
                className="search-input" 
                type="text" 
                placeholder="Type something..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => handleOnSubmit(e)}
            />
            <div className="search__icon">
                <HiOutlineSearch style={{background: "rgba(255, 255, 255, 0.1)", borderRadius: "20px", padding: "4px"}} onClick={handleOnClick}/>
            </div>
        </div>
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
                            <h5> By Limit: </h5>
                            <select value={limit} onChange={e => setLimit(e.target.value)}>
                                <option value={"10"}> 10 </option>
                                <option value={"20"}> 20 </option>
                                <option value={"30"}> 30 </option>
                                <option value={"40"}> 40 </option>
                                <option value={"50"}> 50 </option>
                                <option value={"60"}> 60 </option>
                                <option value={"70"}> 70 </option>
                                <option value={"80"}> 80 </option>
                                <option value={"90"}> 90 </option>
                                <option value={"100"}> 100 </option>
                            </select>
                        </div>
                    </div>

                    <div className={`filter-item-container${showFilter ? " show" : ""}`}>
                        <div className="filter-item">
                            <h5> Size: </h5>
                            <select value={size} onChange={e => setSize(e.target.value)}>
                                <option value={"any"}> any </option>
                                <option value={"large"}> large </option>
                                <option value={"medium"}> medium </option>
                                <option value={"icon"}> icon </option>
                                <option value={"400x300_and_more"}> 400x300 </option>
                                <option value={"640x480_and_more"}> 640x480 </option>
                                <option value={"800x600_and_more"}> 800x600 </option>
                                <option value={"1024x768_and_more"}> 1024x768 </option>
                            </select>
                        </div>
                    </div>

                    <div className={`filter-item-container${showFilter ? " show" : ""}`}>
                        <div className="filter-item">
                            <h5> By File Type: </h5>
                            <select value={fileType} onChange={e => setFileType(e.target.value)}>
                                <option value={"any"}> any </option>
                                <option value={"jpg"}> jpg </option>
                                <option value={"jpeg"}> jpeg </option>
                                <option value={"png"}> png </option>
                                <option value={"gif"}> gif </option>
                                <option value={"svg"}> svg </option>
                                <option value={"webp"}> webp </option>
                                <option value={"ico"}> ico </option>
                                <option value={"raw"}> raw </option>
                            </select>
                        </div>
                    </div>
                </div>
                {images.length !== 0 ? (
                    <div className="images-container">
                        {images.map((image, key) => (
                            <ImageCard key={key} image={image} extension={fileType}/>
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