import "../styles/image-details.css";

const ImageDetails = ({ image, extension, onBack }) => {

    const urlToData = async () => {
        const response = await fetch(image.url)
        const blobData = await response.blob()
        const imageUrlData = URL.createObjectURL(blobData)

        return imageUrlData
    }

    const downloadImage = async () => {
        let ext = extension
        if (ext === "any") {
            ext = "jpg"
        }

        const a = document.createElement("a")
        a.href = await urlToData()
        a.download = `${image.title}.${ext}`
        a.click()
        document.body.removeChild(a)
    }

    return (
        <div className='image__info-container'>
            <button id="back" onClick={onBack}> Back </button>
            <h5> { image.title } </h5>
            <img src={ image.url }/>
            <div className="image__details">
                <p> <span> Size: </span> {image.size} </p>
                <p> <span> Dimensions: </span> {image.width}x{image.height} </p>
            </div>
            <button id="download-button" onClick={downloadImage}> Download </button>
        </div>
    )
}

export default ImageDetails
