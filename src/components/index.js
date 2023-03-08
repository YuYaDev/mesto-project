import '../styles/index.css';

import {places, link, name, about, avatar, jobInput, buttonAdd, buttonEdit, imageForm, nameInput, placeForm, profileForm,
    deleteForm, title, openPopup, closePopup} from './utlis';
import {enableValidation} from './validate.js';
import {addCard, createCard} from './card.js';
import {addNewCard, getInitialCards, getUserInfo, updateUserAvatar, updateUserInfo} from "./api";

let ownerId = '';


getUserInfo()
    .then(res => {
        if (res.ok) {
            return res.json();
        }}
    )
    .then((user_info) => {
        nameInput.textContent = user_info.name;
        jobInput.textContent = user_info.about;
        avatar.setAttribute("src", user_info.avatar);
        ownerId = user_info._id;
    })
    .catch(() => console.log('Fail getUserInfo'))

getInitialCards()
    .then(res => {
        if (res.ok) {
            return res.json();
        }}
    )
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
    openPopup(profileForm);
    name.value = nameInput.textContent;
    about.value = jobInput.textContent;
});


placeForm.addEventListener('submit', function(event) {
    event.preventDefault();
    closePopup(placeForm);
    addNewCard(title.value, link.value)
        .then(res => {
            if (res.ok) {
                return res.json();
            }}
        )
        .then((card) => {
            addCard(createCard(card.name, card.link, card.likes.length, card._id, true), places)
        })

    title.value = '';
    link.value = '';
});


profileForm.addEventListener('submit', function(event) {
    event.preventDefault();
    closePopup(profileForm);

    updateUserInfo(name.value, about.value)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }})
        .then((data) => {
            nameInput.textContent = data.name;
            jobInput.textContent = data.about;
        })
        .catch(() => console.log('Fail updateUserInfo'))
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

avatar.addEventListener('mouseover', function () {
    toggleEditAvatarButton();
});
avatar.addEventListener('mouseout', function () {
    toggleEditAvatarButton();
});

function toggleEditAvatarButton(){
    avatar.classList.toggle('profile_avatar-edit-button_active');
}

enableValidation({
    formSelector: '.popup__form',
    fieldsetSelector: '.popup__fieldset',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
});
