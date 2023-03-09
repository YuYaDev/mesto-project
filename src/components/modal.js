import {openedPopup} from './utlis';

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        closePopup(openedPopup)
    }
}

function openPopup(popup) {
    document.addEventListener('keydown', closeByEscape);
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    document.removeEventListener('keydown', closeByEscape);
    popup.classList.remove('popup_opened');
}

export {openPopup, closePopup};