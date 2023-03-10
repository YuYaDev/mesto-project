import '../styles/index.css';

import {popups, places, link, name, about, avatar, jobInput, buttonAdd, buttonEdit, imageForm, nameInput, placeForm, profileForm,
    deleteForm, title, avatarLink, avatarButton, avatarContainer, updateAvatarForm} from './utlis';
import {openPopup, closePopup, renderSaving} from "./modal";
import {enableValidation} from './validate.js';
import {addCard, createCard} from './card.js';
import {addNewCard, getInitialCards, getUserInfo, updateUserAvatar, updateUserInfo} from "./api";

let ownerId = '';

getUserInfo()
    .then((user_info) => {
        nameInput.textContent = user_info.name;
        jobInput.textContent = user_info.about;
        avatar.setAttribute("src", user_info.avatar);
        ownerId = user_info._id;
    })
    .catch(() => console.log('Fail getUserInfo'))

getInitialCards()
    .then((cardsArray) => {
        cardsArray.forEach((card) => {
            let isMyCard = ownerId === card.owner._id;
            addCard(createCard(card.name, card.link, card.likes.length, card._id, isMyCard), places)
        })
    })
    .catch(() => console.log('Fail getInitialCards'))


buttonAdd.addEventListener('click', function () {
    openPopup(placeForm);
});

buttonEdit.addEventListener('click', function () {
    name.value = nameInput.textContent;
    about.value = jobInput.textContent;
    openPopup(profileForm);
});


placeForm.addEventListener('submit', function(event) {
    event.preventDefault();
    renderSaving(true);
    addNewCard(title.value, link.value)
        .then((card) => {
            addCard(createCard(card.name, card.link, card.likes.length, card._id, true), places)
        })
        .catch(() => console.log('Fail addNewPlace'))
        .finally(() => {
            renderSaving(false);
            closePopup(placeForm);
            document.forms["PlaceForm"].reset();
        })
});


profileForm.addEventListener('submit', function(event) {
    event.preventDefault();
    renderSaving(true);
    updateUserInfo(name.value, about.value)
        .then((data) => {
            nameInput.textContent = data.name;
            jobInput.textContent = data.about;
        })
        .catch(() => console.log('Fail updateUserInfo'))
        .finally(() => {
            renderSaving(false);
            closePopup(profileForm);
        })
    });

updateAvatarForm.addEventListener('submit', function(event) {
    event.preventDefault();
    renderSaving(true);
    updateUserAvatar(avatarLink.value)
        .then((user_info) => {
            avatar.setAttribute("src", user_info.avatar);
        })
        .catch(() => console.log('Fail updateUserAvatar'))
        .finally(() => {
            renderSaving(false);
            closePopup(updateAvatarForm);
        })
});

document.querySelector('.edit-profile-popup__close-button').addEventListener('click', function() {
    closePopup(profileForm);
});

document.querySelector('.add-place-popup__close-button').addEventListener('click', function() {
    closePopup(placeForm);
});

document.querySelector('.image-popup__close-button').addEventListener('click', function() {
    closePopup(imageForm);
});

document.querySelector('.delete-popup__close-button').addEventListener('click', function() {
    closePopup(deleteForm);

});

document.querySelector('.update-avatar__close-button').addEventListener('click', function() {
    closePopup(updateAvatarForm);
});

avatarContainer.addEventListener('mouseover', function () {
    toggleEditAvatarButton();
});
avatarContainer.addEventListener('mouseout', function () {
    toggleEditAvatarButton();
});
function toggleEditAvatarButton(){
    avatarButton.classList.toggle('profile_avatar-edit-button_active');
}
avatarButton.addEventListener('click', function() {
    openPopup(updateAvatarForm);
});

enableValidation({
    formSelector: '.popup__form',
    fieldsetSelector: '.popup__fieldset',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
});

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')){
            closePopup(popup);
        }
    });
});