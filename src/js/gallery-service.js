import axios from 'axios';
const API_KEY = '26514629-430be561a74f355a42f6b7f19';
const BASE_URL = 'http://pixabay.com/api';

export default class GalleryApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.perPage = 40;
    }
    
    async getImages() {
        const queryConfig = {
            params: {
                key: API_KEY,
                q: this.searchQuery,
                image_type: "photo",
                orientation: 'horizontal',
                safesearch: 'true',
                per_page: this.perPage,
                page: this.page,
            }
        };
        const response = await axios.get(`${BASE_URL}/`, queryConfig);
        return await response.data;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}