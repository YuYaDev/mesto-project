import {places, imageForm, initialCards} from "./utlis";
import {openPopup} from "./modal";

function createCard(placeName, placeLink) {
    if (typeof placeName != "string" || typeof placeLink != "string" ){
        console.log("Unexpected type");
        return;
    }
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.place').cloneNode(true);

    const placePhoto = cardElement.querySelector('.place__img');
    const placeTitle = cardElement.querySelector('.place__name');


    placeTitle.textContent = placeName;
    placePhoto.alt = placeName;
    placePhoto.src = placeLink;


    placePhoto.addEventListener('click', function() {
        openPopup(imageForm);
        imageForm.querySelector('.image-popup__title').textContent = placeName;
        imageForm.querySelector('.image-popup__photo').alt = placeName;
        imageForm.querySelector('.image-popup__photo').src = placeLink;
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
    initialCards.forEach((initialCard) => {
        addCard(createCard(initialCard.name, initialCard.link), places)
    })
}

export {addCard, addInitialCards, createCard};