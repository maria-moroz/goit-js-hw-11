import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';

import GalleryApiService from './js/gallery-service'
import LoadMoreBtn from './js/load-more-btn'

import './sass/main.scss';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    searchButton: document.querySelector('.search-form__button'),
    searchInput: document.querySelector('.search-form__input'),
    loadButton: document.querySelector('[data-action="load-more"]'),
}

const notifyOptions = {
    width: '320px',
    showOnlyTheLastOne: true,
    fontSize: '13pt',
};

const galleryApiService = new GalleryApiService();

const loadMoreBtn = new LoadMoreBtn('[data-action="load-more"]');

refs.searchForm.addEventListener('submit', onSearchFormSubmit);
refs.loadButton.addEventListener('click', onLoadButtonClick);

let simpleLightbox = null;

loadMoreBtn.hide();

function onSearchFormSubmit(e) {
    e.preventDefault();
    clearGallery();
    galleryApiService.resetPage();

    galleryApiService.query = refs.searchInput.value.trim();

    e.currentTarget.reset();

    if (galleryApiService.query === '') {
        catchError();
        loadMoreBtn.hide();
        return;
    }

    loadMoreBtn.show();
    createGallery();
    simpleLightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250, captionPosition: 'bottom', });
}

async function createGallery() {
    try {
        loadMoreBtn.disable();

        const cards = await galleryApiService.getImages();

        if (cards.totalHits === 0) {
            loadMoreBtn.hide();
            throw new Error();
        }

        createGalleryMarkup(cards.hits);
        simpleLightbox.refresh();

        loadMoreBtn.enable();

        if (cards.totalHits <= galleryApiService.page * galleryApiService.perPage) {
            Notify.info("We're sorry, but you've reached the end of search results.", notifyOptions);
            loadMoreBtn.hide();
        }

        if (galleryApiService.page === 1) {
            Notify.success(`Hooray! We found ${cards.totalHits} images.`, notifyOptions);
        }

    } catch (error) {
        catchError();
        loadMoreBtn.hide();
        console.log(error);
    }
}

function onLoadButtonClick() {
    galleryApiService.incrementPage();
    createGallery();
}

function createGalleryMarkup(cards) {
    const cardsMarkup = cards.map(createGalleryCardMarkup).join('');
    refs.gallery.insertAdjacentHTML('beforeend', cardsMarkup);
}

function clearGallery() {
    refs.gallery.innerHTML = '';
}

function catchError() {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.', notifyOptions);
}

function createGalleryCardMarkup(card) {
    const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = card;
    return `<a href="${largeImageURL}" class="photo-card">
          <img class="photo-card__image" src=${webformatURL} alt="${tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              ${likes}
            </p>
            <p class="info-item">
              <b>Views</b>
              ${views}
            </p>
            <p class="info-item">
              <b>Comments</b>
              ${comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>
              ${downloads}
            </p>
          </div>
        </a>`;
}


