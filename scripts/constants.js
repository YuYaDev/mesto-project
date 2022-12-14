export const places = document.querySelector('.places');
export const cardTemplate = document.querySelector('#card-template').content;

export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');

export const imageForm = document.querySelector('.image-popup');
export const placeForm = document.querySelector('.add-place-popup');
export const profileForm = document.querySelector('.edit-profile-popup');

export const name = document.querySelector('.popup__input_type_name');
export const about = document.querySelector('.popup__input_type_about');
export const title = document.querySelector('.popup__input_type_title');
export const link = document.querySelector('.popup__input_type_link');

export const nameInput = document.querySelector('.profile__name');
export const jobInput = document.querySelector('.profile__status');

export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];