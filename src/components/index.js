import '../styles/index.css';

import {
    places, name, about, avatar, jobInput, buttonAdd, buttonEdit, nameInput, placeForm, profileForm, avatarButton,
    avatarContainer, updateAvatarForm, popups
} from './utlis';
import {openPopup, closePopup, handleProfileFormSubmit, handleAvatarFormSubmit, handlePlaceFormSubmit} from "./modal";
import {enableValidation} from './validate.js';
import {addCard, createCard} from './card.js';
import {getInitialCards, getUserInfo} from "./api";

export let ownerId = '';


Promise.all([getUserInfo(), getInitialCards()])
    .then(([user_info, cardsArray]) => {
        nameInput.textContent = user_info.name;
        jobInput.textContent = user_info.about;
        avatar.setAttribute("src", user_info.avatar);
        ownerId = user_info._id;


        cardsArray.forEach((card) => {
                const isMyCard = ownerId === card.owner._id;
                addCard(createCard(card.likes, card.name, card.link, card._id, isMyCard), places)
            })
        }
    )
    .catch(() => {
        console.log('Fail getUserInfo, getInitialCards')
    });


buttonAdd.addEventListener('click', function () {
    openPopup(placeForm);
});

buttonEdit.addEventListener('click', function () {
    name.value = nameInput.textContent;
    about.value = jobInput.textContent;
    openPopup(profileForm);
});


placeForm.addEventListener('submit', function(event) {
    handlePlaceFormSubmit(event);
});


profileForm.addEventListener('submit', function(event) {
    handleProfileFormSubmit(event);
});


updateAvatarForm.addEventListener('submit', function(event) {
    handleAvatarFormSubmit(event);
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