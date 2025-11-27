import { ID, Query } from "appwrite";
import { useEffect, useState } from "react";
import { LuHeart } from "react-icons/lu";
import { Link } from 'react-router';
import { useAuth } from "../lib/AuthContext";
import { database, DB_ID, IMAGES_COLLECTION_ID } from "../lib/appwrite";
import '../styles/image-card.css';

const ImageCard = ({ image }) => {
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)
  const [likedImageRowId, setLikedImageRowId] = useState("")

  useEffect(() => {
    isAlreadyLiked()

    console.log(saved)
  }, [saved])

  const isAlreadyLiked = async () => {
    try {
      const doc = await database.listRows({
        databaseId: DB_ID,
        tableId: IMAGES_COLLECTION_ID,
        queries: [Query.equal("imageId", [image.id]), Query.equal("userId", [user.$id])]
      })

      if (doc.total > 0) {
        setSaved(true)
        setLikedImageRowId(doc.rows[0].$id)
      }
      else {
        setSaved(false)
      }
    }
    catch (error) {
      console.log(error)
    }
  }


  const handleImage = async () => {
    if (saved === true) {
      deleteImage()
    }
    else {
      saveImage()
    }
  }

  const saveImage = async () => {
    const promise = database.createRow({
        databaseId: DB_ID,
        tableId: IMAGES_COLLECTION_ID,
        rowId: ID.unique(),
        data: {
          imageId: image.id,
          title: image.title,
          imageURL: image.url,
          size: image.size,
          dimensions: `${image.width}x${image.height}`,
          userId: user.$id
        }
      }
    )

    promise.then(() => {
      setSaved(true)
    }, (error) => { console.log(error)} )
  }

  const deleteImage = async () => {
    try {
      await database.deleteRow({
        databaseId: DB_ID,
        tableId: IMAGES_COLLECTION_ID,
        rowId: likedImageRowId
      })

      setSaved(false)
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <Link>
        <div className='image-card'>
        <button className={`image__button${saved ? " liked" : ""}`} onClick={handleImage}> <LuHeart style={{marginTop: 5, background: "none"}} /> </button>
            <img src={image.url} alt={image.title}/>
        </div>
    </Link>
  )
}

export default ImageCard
