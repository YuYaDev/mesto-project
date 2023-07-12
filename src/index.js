import './pages/index.css'
import Api from './components/Api.js';
import UserInfo from './components/UserInfo.js';
import Section from './components/Section.js';
import Card from './components/Сard';
import {
  BASE_URL,
  TOKEN,
  profileName,
  profileProfession,
  profileButton,
  cardSection,
  avatar,
  addCardButton,
  editAvatarButton,
  validatorOptions,
  submitCardButton,
  submitUserButton,
  submitAvatarButton,
  profileNameHolder,
  profileProfessionHolder
} from './utils/constants';
import PopupWithImage from "./components/PopupWithImage";
import PopupWithForm from "./components/PopupWithForm";
import FormValidator from "./components/FormValidator"


const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    authorization: TOKEN,
    'Content-Type': 'application/json'
  }
});

// открытие попапа картинки
const popupWithImage = new PopupWithImage('.popup__image')

// Обработчики событий карточки
const cardHandlers = {
  apiDeleteLikeCard: api.deleteLikeCard.bind(api),
  apiAddLikeCard: api.addLikeCard.bind(api),
  apiDeleteCard: api.deleteCard.bind(api)
}

// Обработчики событий профиля
const userProfileHandlers = {
  getUserInfo: api.getUserInfo.bind(api),
  setUserInfo: api.editUserProfile.bind(api),
  updateAvatar: api.editUserAvatar.bind(api)
}

// функция для создания экземпляра класса валидации
function addValidation(form) {
  new FormValidator(validatorOptions, form).enableValidation()
}

function createCard(cardData) {
  const card = new Card(cardData, '.template__element', cardHandlers,
    () => popupWithImage.open(event), userId)
  return card.generate();
}


const userInfo = new UserInfo({ userName: profileName, userData: profileProfession, userAvatar: avatar },
  userProfileHandlers);
let userId = -1;

//вспомогательная переменная для создания экземпляра класса Section
let cardsList

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    // Загрузка данных пользователя
    userId = userData._id;
    userInfo.setUserInfo(userData);
    // Отрисовка карточек с сервера
    cardsList = new Section({
      items: cards,
      renderer: (data) => {
        cardsList.appendItem(createCard(data));
      },
    },
      cardSection
    );
    cardsList.renderItems();
  })
  .catch(err => console.log('Fail to load profile or cards: ', err))


// Создаём класс формы и передаём коллбэк-обработчик отправки формы с данными
const popupProfile = new PopupWithForm('.popup__profile', function (userData) {
  api.editUserProfile(userData) // отправляем новые имя и статус на сервер
    .then((data) => {
      userInfo.setUserInfo(data) // обновляем данные у себя на странице
      popupProfile.close()
    })
    .catch((e) => console.log('Что-то пошло не так. Код ответа сервера:', e))
    .finally(() => {
      submitUserButton.textContent = "Сохранить";
    })
})

popupProfile.setEventListeners();
//добавляем валидацию формы
addValidation(popupProfile._form);

// форма редактирования профиля
profileButton.addEventListener('click', () => {
  popupProfile.open();
  api.getUserInfo()
    .then((userData) => {
      profileNameHolder.value = userData.name
      profileProfessionHolder.value = userData.about
    })
    .catch((e) => console.log('Что-то пошло не так. Код ответа сервера:', e))
})

// Создаём класс формы и передаём коллбэк-обработчик отправки формы с данными
const popupAvatar = new PopupWithForm('.popup__avatar', function (userData) {
  api.editUserAvatar(userData) // получаем данные пользователя с новым аватаром
    .then((data) => {
      userInfo.setUserInfo(data); // обновляем данные у себя на странице
      popupAvatar.close()
    })
    .catch((e) => console.log('Что-то пошло не так. Код ответа сервера:', e))
    .finally(() => {
      submitAvatarButton.textContent = "Сохранить";
    })
})
popupAvatar.setEventListeners();
//добавляем валидацию формы
addValidation(popupAvatar._form);

// форма редактирования аватара пользователя
editAvatarButton.addEventListener('click', () => {
  popupAvatar.open();
})

// Создаём класс формы и передаём коллбэк-обработчик отправки формы с данными
const popupAddCard = new PopupWithForm('.popup__mesto', function (cardInput) {
  api.addCard(cardInput) // отправляем имя и картинку карточки на сервер
    .then((serverCardData) => {
      // получили от сервера полные данные карточки (id и тд)
      // теперь создаем карточку на странице
      const newCard = createCard(serverCardData)
      // добавляем карточку в блок карточек
      cardsList.prependItem(newCard)

      popupAddCard.close()
    })
    .catch((e) => console.log('Что-то пошло не так. Код ответа сервера:', e))
    .finally(() => {
      submitCardButton.textContent = "Сохранить";
    }
    )
})
popupAddCard.setEventListeners();
//добавляем валидацию формы
addValidation(popupAddCard._form);

// форма добавления карточки
addCardButton.addEventListener('click', () => {
  popupAddCard.open();
})


