import {avatar, avatarLink, jobInput, link, nameInput, places, title} from "./utlis";
import {addNewCard, updateUserAvatar, updateUserInfo} from "./api";
import {addCard, createCard} from "./card";

function openPopup(popup) {
    document.addEventListener('keydown', closeByEscape);
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    document.removeEventListener('keydown', closeByEscape);
    popup.classList.remove('popup_opened');
}

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup)
    }
}

function renderSaving(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
    if (isLoading) {
        button.textContent = loadingText
    } else {
        button.textContent = buttonText
    }
}

function handleSubmit(request, event, loadingText = "Сохранение...") {
    event.preventDefault();

    const submitButton = event.submitter;
    const initialText = submitButton.textContent;

    renderSaving(true, submitButton, initialText, loadingText);
    request()
        .then(() => {
            renderSaving(false, submitButton, initialText);
            closePopup(event.target.parentElement.parentElement);
            event.target.parentElement.parentElement.reset();
        })
        .catch((err) => {
            renderSaving(false, submitButton, initialText);
            console.error(`Ошибка: ${err}`);
        })
        .finally(() => {
        });
}

function handlePlaceFormSubmit(event) {
    function makeRequest() {
        return addNewCard(title.value, link.value).then((card) => {
            addCard(createCard(card.likes, card.name, card.link, card._id, true), places);
        });
    }
    handleSubmit(makeRequest, event);
}

function handleProfileFormSubmit(event) {
    function makeRequest() {
        return updateUserInfo(nameInput.value, jobInput.value).then((userData) => {
            nameInput.textContent = userData.name;
            jobInput.textContent = userData.about;
        });
    }
    handleSubmit(makeRequest, event);
}

function handleAvatarFormSubmit(event) {
    function makeRequest() {
        return updateUserAvatar(avatarLink.value).then((userData) => {
            avatar.src = userData.avatar;
        });
    }
    handleSubmit(makeRequest, event);
}

export {openPopup, closePopup, handlePlaceFormSubmit, handleProfileFormSubmit, handleAvatarFormSubmit};