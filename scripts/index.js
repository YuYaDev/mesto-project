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

function addCard(placeName, placeLink) {
    if (typeof placeName != "string" || typeof placeLink != "string" ){
        console.log("Unexpected type");
        return;
    }
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.place').cloneNode(true);

    cardElement.querySelector('.place__name').textContent = placeName;
    cardElement.querySelector('.place__img').setAttribute('src', placeLink);

    cardElement.querySelector('.place__like-button').addEventListener('click', function(evt) {
        evt.target.classList.toggle('place__like-button_active');
    });
    cardElement.querySelector('.place__delete-button').addEventListener('click', function() {
        cardElement.remove();
    });

    places.append(cardElement);
}

for (let i = 0; i < initialCards.length; i++) {
    addCard(initialCards[i].name, initialCards[i].link);
}