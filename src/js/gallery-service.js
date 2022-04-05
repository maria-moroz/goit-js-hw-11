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
        const URL = `${BASE_URL}/?image_type=photo&orientation=horizontal&safesearch=true&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&key=${API_KEY}`;
        const response = await axios.get(URL);
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