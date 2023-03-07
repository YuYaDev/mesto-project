import {imageForm, openPopup} from "./utlis";
import {deleteCard} from "./api";

function createCard(placeName, placeLink, placeLikeCount, placeCardId, hasDeleteButton) {
    if (typeof placeName != "string" || typeof placeLink != "string" ){
        console.log("Unexpected type");
        return;
    }
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.place').cloneNode(true);

    const placePhoto = cardElement.querySelector('.place__img');
    const placeTitle = cardElement.querySelector('.place__name');
    const placeLikes = cardElement.querySelector('.place__like-counter');

    placeLikes.textContent = placeLikeCount;
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

    if(hasDeleteButton){
        cardElement.innerHTML += '<button class="place__delete-button" type="button"></button>';
        cardElement.querySelector('.place__delete-button').addEventListener('click', function() {
            cardElement.remove();
            deleteCard(placeCardId)
                .then(res => {
                    if (res.ok) {
                        console.log(`Card ${placeCardId} has successfully deleted!`);
                    }}
                )
                .catch(() => console.log('Fail deleteCard'))
            });
    }

    return cardElement
}

function addCard(card, container) {
    container.prepend(card);
}

export {addCard, createCard};