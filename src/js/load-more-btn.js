export default class LoadMoreBtn {
    constructor(selector) {
        this.refButton = document.querySelector(selector);
    }

    enable() {
        this.refButton.disabled = false;
        this.refButton.textContent = 'Load more';
    }

    disable() {
        this.refButton.disabled = true;
        this.refButton.textContent = 'Loading...';
    }

    show() {
        this.refButton.classList.remove('hidden');
    }

    hide() {
        this.refButton.classList.add('hidden');
    }
}