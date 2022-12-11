'use strict';

const initialCards = [
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

const page = document.querySelector('.page');
const content = page.querySelector('.content');
const places = content.querySelector('.places');
const addButton = content.querySelector('.profile__add-button');

const placeForm = document.querySelector('.add-place-popup');


function addCard(placeName, placeLink) {
    if (typeof placeName != "string" || typeof placeLink != "string" ){
        console.log("Unexpected type");
        return;
    }
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.place').cloneNode(true);

    cardElement.querySelector('.place__name').textContent = placeName;
    cardElement.querySelector('.place__img').setAttribute('alt', placeName);
    cardElement.querySelector('.place__img').setAttribute('src', placeLink);

    let place_photo = cardElement.querySelector('.place__img');
    place_photo.setAttribute('src', placeLink);

    place_photo.addEventListener('click', function() {
        let popup = document.querySelector('.image-popup');
        popup.classList.add('popup_opened');
        popup.querySelector('.image-popup__title').textContent = placeName;
        popup.querySelector('.image-popup__photo').setAttribute('src', placeLink);
    });

    document.querySelector('.image-close').addEventListener('click', function() {
        document.querySelector('.image-popup').classList.remove('popup_opened');
    });

    cardElement.querySelector('.place__like-button').addEventListener('click', function(evt) {
        evt.target.classList.toggle('place__like-button_active');
    });
    cardElement.querySelector('.place__delete-button').addEventListener('click', function() {
        cardElement.remove();
    });


    places.prepend(cardElement);
}

for (let i = initialCards.length - 1; i >= 0; i--) {
    addCard(initialCards[i].name, initialCards[i].link);
}

addButton.addEventListener('click', function () {
    document.querySelector('.add-place-popup').classList.add('popup_opened');
});


placeForm.addEventListener('submit', function(event) {
    event.preventDefault();

    document.querySelector('.add-place-popup').classList.remove('popup_opened');

    const title = document.querySelector('.popup__input_type_title');
    const link = document.querySelector('.popup__input_type_link');

    addCard(title.value, link.value);

    title.value = '';
    link.value = '';
});