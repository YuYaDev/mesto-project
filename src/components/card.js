import {openPopup, closePopup} from "./modal";
import {imageForm, deleteForm, deleteFormButton} from "./utlis";
import {addLikeCard, deleteCard, deleteLikeCard} from "./api";
import {ownerId} from "./index";

const cardTemplate = document.querySelector('#card-template').content;
const imagePopupTitle = imageForm.querySelector('.image-popup__title');
const imagePopupPhoto = imageForm.querySelector('.image-popup__photo');


function createCard(placeLoadLikes, placeName, placeLink, placeCardId, hasDeleteButton) {
    if (typeof placeName != "string" || typeof placeLink != "string" ){
        console.log("Unexpected type");
        return;
    }
    const cardElement = cardTemplate.querySelector('.place').cloneNode(true);

    const placePhoto = cardElement.querySelector('.place__img');
    const placeTitle = cardElement.querySelector('.place__name');
    const placeLikes = cardElement.querySelector('.place__like-counter');
    const placeLikeButton = cardElement.querySelector('.place__like-button')

    placeLikes.textContent = placeLoadLikes.length;
    placeTitle.textContent = placeName;
    placePhoto.alt = placeName;
    placePhoto.src = placeLink;


    placeLoadLikes.forEach((like) => {
        if (like._id === ownerId) {
            placeLikeButton.classList.add('place__like-button_active');
        }
    })

    placePhoto.addEventListener('click', function() {
        openPopup(imageForm);
        imagePopupTitle.textContent = placeName;
        imagePopupPhoto.alt = placeName;
        imagePopupPhoto.src = placeLink;
    });

    placeLikeButton.addEventListener('click', function(evt) {
        if (evt.target.classList.contains('place__like-button_active')) {
            deleteLikeCard(placeCardId)
                .then((data) => {
                    evt.target.classList.toggle('place__like-button_active');
                    placeLikes.textContent = data.likes.length;
                })
                .catch(() => console.log('Fail deleteLike'))
        }else {
            addLikeCard(placeCardId)
                .then((data) => {
                    evt.target.classList.toggle('place__like-button_active');
                    placeLikes.textContent = data.likes.length;
                })
                .catch(() => console.log('Fail addLike'))
        }
    });

    let cardForDeletion = undefined;
    if(hasDeleteButton){
        cardElement.innerHTML += '<button class="place__delete-button" type="button"></button>';
        cardElement.querySelector('.place__delete-button').addEventListener('click', function() {
            openPopup(deleteForm);
            cardForDeletion = cardElement;
          });

        deleteFormButton.addEventListener('click', function(event) {
            event.preventDefault();
            closePopup(deleteForm);
            if (cardForDeletion){
                deleteCard(placeCardId)
                    .then(() => {
                        cardForDeletion.remove();
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

export {addCard, createCard};