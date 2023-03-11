import {openPopup, closePopup} from "./modal";
import {imageForm, deleteForm, deleteFormButton} from "./utlis";
import {addLikeCard, deleteCard, deleteLikeCard} from "./api";

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
    placePhoto.alt = placeName;
    placePhoto.src = placeLink;


    placePhoto.addEventListener('click', function() {
        openPopup(imageForm);
        imageForm.querySelector('.image-popup__title').textContent = placeName;
        imageForm.querySelector('.image-popup__photo').alt = placeName;
        imageForm.querySelector('.image-popup__photo').src = placeLink;
    });

    cardElement.querySelector('.place__like-button').addEventListener('click', function(evt) {
        if (evt.target.classList.contains('place__like-button_active')) {
            deleteLikeCard(placeCardId)
                .then((data) => {
                    placeLikes.textContent = data.likes.length;
                })
                .catch(() => console.log('Fail deleteLike'))
        }else {
            addLikeCard(placeCardId)
                .then((data) => {
                    placeLikes.textContent = data.likes.length;
                })
                .catch(() => console.log('Fail addLike'))
        }
        evt.target.classList.toggle('place__like-button_active');
    });

    let cardForDeletion = undefined;
    if(hasDeleteButton){
        cardElement.innerHTML += '<button class="place__delete-button" type="button"></button>';
        cardElement.querySelector('.place__delete-button').addEventListener('click', function() {
            openPopup(deleteForm);
            cardForDeletion = cardElement;
          });

        deleteFormButton.addEventListener('click', function(event) {
            console.log('inside');
            event.preventDefault();
            closePopup(deleteForm);
            if (cardForDeletion){
                cardForDeletion.remove();
                deleteCard(placeCardId)
                    .then(() => {
                        console.log(`Card ${placeCardId} has successfully deleted!`);
                    })
                    .catch(() => console.log('Fail deleteCard'))
            }
        });
    }
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