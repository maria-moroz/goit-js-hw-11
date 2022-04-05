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
            baseURL: BASE_URL,
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
        //const response = await axios.get('', queryConfig);
        const response = await axios.get(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=40&key=23111484-b23ce212a3b9e3a1a0d03b7eb`);
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