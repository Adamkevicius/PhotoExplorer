import { IoIosHeartDislike } from "react-icons/io";
import { database, DB_ID, IMAGES_COLLECTION_ID } from "../lib/appwrite";
import "../styles/liked-image-card.css";

const LikedImageCard = ({ image }) => {
    const urlToData = async () => {
        const response = await fetch(image.imageURL)
        const blobData = await response.blob()
        const imageUrlData = URL.createObjectURL(blobData)

        return imageUrlData
    }

    const downloadImage = async () => {
        const a = document.createElement("a")
        a.href = await urlToData()
        a.download = `${image.title}.${image.extension}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    const deleteImage = async () => {
        try {
            await database.deleteRow({
                databaseId: DB_ID,
                tableId: IMAGES_COLLECTION_ID,
                rowId: image.$id
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="liked__image-card">
            <h2> { image.title } </h2>
            <img src={ image.imageURL }/>
            <div className="image__info">
                <p id="size"> <span> Size: </span> {image.size} </p>
                <p id="dimensions"> <span> Dimensions: </span> {image.dimensions} </p>
            </div>
            <div className="button__container">
                <button id="download" onClick={downloadImage}> Download </button>
                <button id="delete" onClick={deleteImage}> <IoIosHeartDislike style={{marginTop: 5, background: "none"}} /> </button>
            </div>
        </div>
    )
}

export default LikedImageCard
