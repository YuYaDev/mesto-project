import {
    places,
    cardTemplate,
    buttonEdit,
    buttonAdd,
    imageForm,
    placeForm,
    profileForm,
    name,
    about,
    title,
    link,
    nameInput,
    jobInput,
    initialCards,
} from './constants.js';

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function createCard(placeName, placeLink) {
    if (typeof placeName != "string" || typeof placeLink != "string" ){
        console.log("Unexpected type");
        return;
    }
    const cardElement = cardTemplate.querySelector('.place').cloneNode(true);

    const placePhoto = cardElement.querySelector('.place__img');
    const placeTitle = cardElement.querySelector('.place__name');


    placeTitle.textContent = placeName;
    placePhoto.setAttribute('alt', placeName);
    placePhoto.setAttribute('src', placeLink);

    placePhoto.addEventListener('click', function() {
        openPopup(imageForm);
        imageForm.querySelector('.image-popup__title').textContent = placeName;
        imageForm.querySelector('.image-popup__photo').setAttribute('alt', placeName);
        imageForm.querySelector('.image-popup__photo').setAttribute('src', placeLink);
    });

    cardElement.querySelector('.place__like-button').addEventListener('click', function(evt) {
        evt.target.classList.toggle('place__like-button_active');
    });
    cardElement.querySelector('.place__delete-button').addEventListener('click', function() {
        cardElement.remove();
    });

    return cardElement
}

function addCard(card, container) {
    container.prepend(card);
}

function addInitialCards() {
    for (let i = initialCards.length - 1; i >= 0; i--) {
        addCard(createCard(initialCards[i].name, initialCards[i].link), places)
    }
}
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
