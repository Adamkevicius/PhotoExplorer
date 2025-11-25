
const BASE_URL = "https://real-time-image-search.p.rapidapi.com"
const options = {
    method: 'GET',
	headers: {
		'x-rapidapi-key': '405eac9366mshb6d4cab5eb13e50p1e88e3jsn3ffb53dd1b39',
		'x-rapidapi-host': 'real-time-image-search.p.rapidapi.com'
	}
}

export const fetchImagesByName = async (name) => {
    const url = `${BASE_URL}/search?query=${name}&limit=20&size=any&color=any&type=any&time=any&usage_rights=any&file_type=any&aspect_ratio=any&safe_search=on&region=us`

    try {
	const response = await fetch(url, options);
	const result = await response.json();

    return result
    } catch (error) {
        console.error(error);
    }
}

export const fetchImagesBySize = async (name, size) => {
    const url = `${BASE_URL}/search?query=${name}&limit=any&size=${size}&color=any&type=any&time=any&usage_rights=any&file_type=any&aspect_ratio=any&safe_search=on&region=us`

    try {
	const response = await fetch(url, options);
	const result = await response.json();

    return result
    } catch (error) {
        console.error(error);
    }
}

export const fetchImagesWithIncreasedLimit = async (name, limit) => {
    const url = `${BASE_URL}/search?query=${name}&limit=${limit}&size=any&color=any&type=any&time=any&usage_rights=any&file_type=any&aspect_ratio=any&safe_search=on&region=us`

    try {
	const response = await fetch(url, options);
	const result = await response.json();

    return result
    } catch (error) {
        console.error(error);
    }
}

export const fetchImagesByFileType = async (name, fileType) => {
    const url = `${BASE_URL}/search?query=${name}&limit=20&size=any&color=any&type=any&time=any&usage_rights=any&file_type=${fileType}&aspect_ratio=any&safe_search=on&region=us`

    try {
	const response = await fetch(url, options);
	const result = await response.json();

    return result
    } catch (error) {
        console.error(error);
    }
}

