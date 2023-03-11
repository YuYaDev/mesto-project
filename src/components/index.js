import '../styles/index.css';

import {
    places, link, name, about, avatar, jobInput, buttonAdd, buttonEdit, nameInput, placeForm, profileForm,
    title, avatarLink, avatarButton, avatarContainer, updateAvatarForm, popups
} from './utlis';
import {openPopup, closePopup, renderSaving} from "./modal";
import {enableValidation} from './validate.js';
import {addCard, createCard} from './card.js';
import {addNewCard, getInitialCards, getUserInfo, updateUserAvatar, updateUserInfo} from "./api";

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
    event.preventDefault();
    renderSaving(true);
    addNewCard(title.value, link.value)
        .then((card) => {
            addCard(createCard(card.likes, card.name, card.link, card._id, true), places);
            renderSaving(false);
            closePopup(placeForm);
            document.forms["PlaceForm"].reset();
        })
        .catch(() => console.log('Fail addNewPlace'))
        .finally(() => {
            renderSaving(false);
        })
});


profileForm.addEventListener('submit', function(event) {
    event.preventDefault();
    renderSaving(true);
    updateUserInfo(name.value, about.value)
        .then((data) => {
            nameInput.textContent = data.name;
            jobInput.textContent = data.about;
            renderSaving(false);
            closePopup(profileForm);
        })
        .catch(() => console.log('Fail updateUserInfo'))
        .finally(() => {
            renderSaving(false);
        })
    });

updateAvatarForm.addEventListener('submit', function(event) {
    event.preventDefault();
    renderSaving(true);
    updateUserAvatar(avatarLink.value)
        .then((user_info) => {
            avatar.setAttribute("src", user_info.avatar);
            renderSaving(false);
            closePopup(updateAvatarForm);
        })
        .catch(() => console.log('Fail updateUserAvatar'))
        .finally(() => {
            renderSaving(false);
        })
});

// let cardForDeletion = undefined;
//
// document.querySelectorAll('.place').forEach((place) => {
//     if (place.querySelector('.place__delete-button')) {
//         place.querySelector('.place__delete-button').addEventListener('click', function(event) {
//             event.preventDefault();
//             cardForDeletion = event.parentElement;
//             openPopup(deleteForm);
//
//         })
//     }
// })
//
// deleteFormButton.addEventListener('click', function(event) {
//         event.preventDefault();
//         closePopup(deleteForm);
//         deleteCard(cardForDeletion._id)
//             .then(() => {
//                 cardForDeletion.remove();
//                 console.log(`Card ${cardForDeletion._id} has successfully deleted!`);
//                 })
//             .catch(() => console.log('Fail deleteCard'))
//         }
// );

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