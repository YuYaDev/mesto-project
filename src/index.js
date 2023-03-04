import './styles/index.css';

import {places, link, name, about, jobInput, buttonAdd, buttonEdit, imageForm, nameInput, placeForm, profileForm,
    title, openPopup, closePopup} from './components/utlis';
import {enableValidation} from './components/validate.js';
import {addCard, addInitialCards, createCard} from './components/card.js';


addInitialCards()

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

    nameInput.textContent = name.value;
    jobInput.textContent = about.value;
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
