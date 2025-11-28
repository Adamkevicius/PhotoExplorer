import { Query } from "appwrite"
import { useEffect, useState } from "react"
import LikedImageCard from "../components/LikedImageCard"
import Navbar from "../components/Navbar"
import client, { database, DB_ID, IMAGES_COLLECTION_ID } from "../lib/appwrite"
import { useAuth } from "../lib/AuthContext"
import "../styles/liked-images.css"

const LikedImages = () => {
    const { user } = useAuth()
    const [fetchedImages, setFetchedImages] = useState([])

    useEffect(() => {
        const channel = `databases.${DB_ID}.tables.${IMAGES_COLLECTION_ID}.rows`
        const subscription = client.subscribe(
            channel,
            (response) => {
                if (response.events.includes("databases.*.tables.*.rows")) {
                    fetchImages()
                }
            }
        )

        fetchImages()
        return () => {
            subscription()
        }
    }, [fetchedImages])
    

    const fetchImages = async () => {
        try {
            const images = await database.listRows({
                databaseId: DB_ID,
                tableId: IMAGES_COLLECTION_ID,
                queries: [Query.equal("userId", [user.$id])]
            })

            if (images.total > 0) {
                setFetchedImages(images.rows)
            }
            else {
                setFetchedImages([])
            }
        }
        catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="app">
      <Navbar />
      {fetchedImages.length === 0 ? (
        <p id="no-likes"> Nothing here yet - start liking some images to see them appear. </p>
      ) : (
        <div className="liked__images-container">
            {fetchedImages.map((image, key) => (
                <LikedImageCard key={key} image={image} />
            ))}
        </div>
      )}
    </div>
  )
}

export default LikedImages
