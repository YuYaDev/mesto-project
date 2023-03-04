const places = document.querySelector('.places');


const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const imageForm = document.querySelector('.image-popup');
const placeForm = document.querySelector('.add-place-popup');
const profileForm = document.querySelector('.edit-profile-popup');

const name = document.querySelector('.popup__input_type_name');
const about = document.querySelector('.popup__input_type_about');
const title = document.querySelector('.popup__input_type_title');
const link = document.querySelector('.popup__input_type_link');

const nameInput = document.querySelector('.profile__name');
const jobInput = document.querySelector('.profile__status');

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

export {places, title, imageForm, link, name, about, jobInput, buttonAdd, buttonEdit, nameInput, placeForm, profileForm, closePopup, openPopup}