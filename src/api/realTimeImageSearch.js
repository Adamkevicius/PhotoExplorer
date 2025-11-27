
const BASE_URL = "https://real-time-image-search.p.rapidapi.com"
const options = {
    method: 'GET',
	headers: {
		'x-rapidapi-key': 'e2a058d304msh9d0a4a435534e52p19c164jsn5e1fbcb6803a',
		'x-rapidapi-host': 'real-time-image-search.p.rapidapi.com'
	}
}

export const fetchImages = async (name, limit, size, fileType) => {
    const url = `${BASE_URL}/search?query=${name}&limit=${limit}&size=${size}&color=any&type=any&time=any&usage_rights=any&file_type=${fileType}&aspect_ratio=any&safe_search=on&region=us`

    try {
	const response = await fetch(url, options);
	const result = await response.json();
    
    console.log(result)
    return result
    } catch (error) {
        console.error(error);
    }
}