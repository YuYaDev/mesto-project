import '../styles/index.css';

import {places, link, name, about, avatar, jobInput, buttonAdd, buttonEdit, imageForm, nameInput, placeForm, profileForm,
    title, openPopup, closePopup} from './utlis';
import {enableValidation} from './validate.js';
import {addCard, createCard} from './card.js';
import {getInitialCards, getUserInfo, updateUserInfo} from "./api";


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
            addCard(createCard(card.name, card.link), places)
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
    addCard(createCard(title.value, link.value), places);

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


enableValidation({
    formSelector: '.popup__form',
    fieldsetSelector: '.popup__fieldset',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
});
