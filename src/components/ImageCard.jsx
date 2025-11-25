import { LuHeart } from "react-icons/lu";
import { Link } from 'react-router';

const ImageCard = ({ image }) => {
  return (
    <Link>
        <div className='image-card'>
        <button> <LuHeart style={{marginTop: 5, background: "none"}} /> </button>
            <img src={image.url} alt={image.title}/>
        </div>
    </Link>
  )
}

export default ImageCard
