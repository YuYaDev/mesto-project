const popups = document.querySelectorAll('.popup')

const placeForm = document.querySelector('.add-place-popup');
const profileForm = document.querySelector('.edit-profile-popup');
const imageForm = document.querySelector('.image-popup');
const deleteForm = document.querySelector('.delete-popup');
const deleteFormButton = document.querySelector('.delete-popup').querySelector('.popup__save-button');
const updateAvatarForm = document.querySelector('.update-avatar-popup');

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const name = document.querySelector('.popup__input_type_name');
const about = document.querySelector('.popup__input_type_about');
const title = document.querySelector('.popup__input_type_title');
const link = document.querySelector('.popup__input_type_link');
const avatarLink = document.querySelector('.popup__input_type_avatar_link');


const nameInput = document.querySelector('.profile__name');
const jobInput = document.querySelector('.profile__status');
const avatar = document.querySelector('.profile__avatar');
const avatarButton = document.querySelector('.profile__avatar-edit-button');
const avatarContainer = document.querySelector('.profile__avatar-container');

const places = document.querySelector('.places');


const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}


const request = (url, options) => {
    return fetch(url, options).then(checkResponse);
}


export {places, link, name, about, avatar, avatarButton, avatarContainer, jobInput, buttonAdd, buttonEdit, imageForm,
nameInput, placeForm, profileForm,updateAvatarForm, deleteForm, deleteFormButton, title, avatarLink, popups, request}