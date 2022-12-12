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

const editButton = content.querySelector('.profile__edit-button');
const addButton = content.querySelector('.profile__add-button');

const imageForm = document.querySelector('.image-popup');
const placeForm = document.querySelector('.add-place-popup');
const profileForm = document.querySelector('.edit-profile-popup');


function addCard(placeName, placeLink) {
    if (typeof placeName != "string" || typeof placeLink != "string" ){
        console.log("Unexpected type");
        return;
    }
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.place').cloneNode(true);

    const popup = document.querySelector('.image-popup');

    const placePhoto = cardElement.querySelector('.place__img');
    const placeTitle = cardElement.querySelector('.place__name');


    placeTitle.textContent = placeName;
    placePhoto.setAttribute('alt', placeName);
    placePhoto.setAttribute('src', placeLink);

    placePhoto.addEventListener('click', function() {
        popup.classList.add('popup_opened');
        popup.querySelector('.image-popup__title').textContent = placeName;
        popup.querySelector('.image-popup__photo').setAttribute('src', placeLink);
    });

    cardElement.querySelector('.place__like-button').addEventListener('click', function(evt) {
        evt.target.classList.toggle('place__like-button_active');
    });
    cardElement.querySelector('.place__delete-button').addEventListener('click', function() {
        cardElement.remove();
    });

    places.prepend(cardElement);
}

function addInitialCards() {
    for (let i = initialCards.length - 1; i >= 0; i--) {
        addCard(initialCards[i].name, initialCards[i].link);
    }
}
addInitialCards()


addButton.addEventListener('click', function () {
    placeForm.classList.add('popup_opened');
});

editButton.addEventListener('click', function () {
    profileForm.classList.add('popup_opened');
});


placeForm.addEventListener('submit', function(event) {
    event.preventDefault();

    placeForm.classList.remove('popup_opened');

    const title = document.querySelector('.popup__input_type_title');
    const link = document.querySelector('.popup__input_type_link');

    addCard(title.value, link.value);

    title.value = '';
    link.value = '';
});


profileForm.addEventListener('submit', function(event) {
    event.preventDefault();

    profileForm.classList.remove('popup_opened');

    const name = document.querySelector('.popup__input_type_name');
    const about = document.querySelector('.popup__input_type_about');

    const nameInput = document.querySelector('.profile__name');
    const jobInput = document.querySelector('.profile__status');

    nameInput.textContent = name.value;
    jobInput.textContent = about.value;
});

document.querySelector('.edit-profile-popup__close-button').addEventListener('click', function() {
    profileForm.classList.remove('popup_opened');
});

document.querySelector('.add-place-popup__close-button').addEventListener('click', function() {
    placeForm.classList.remove('popup_opened');
});

document.querySelector('.image-popup__close-button').addEventListener('click', function() {
    imageForm.classList.remove('popup_opened');
});
