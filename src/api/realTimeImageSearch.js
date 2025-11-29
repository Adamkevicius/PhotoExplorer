
const BASE_URL = "https://real-time-image-search.p.rapidapi.com"
const options = {
    method: 'GET',
	headers: {
		'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
		'x-rapidapi-host': import.meta.env.VITE_RAPID_API_HOST
	}
}

export const fetchImages = async (name, limit, size, fileType) => {
    const url = `${BASE_URL}/search?query=${name}&limit=${limit}&size=${size}&color=any&type=any&time=any&usage_rights=any&file_type=${fileType}&aspect_ratio=any&safe_search=on&region=us`

    try {
        const response = await fetch(url, options);
        const result = await response.json();
    
        return result
    } catch (error) {
        console.error(error);
    }
}