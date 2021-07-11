import './index.css';
import Sections from '../components/Section';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';


import {
  initialCards,
  formElement,
  cardsForm,
  config,
  electors,
  popupOpenButton,
  editProfileButton,
  nameInput,
  aboutInput,
  profileAvatarContainer,
  userAvatar,

} from '../utils/constants';

import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api';


// АПИ //
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
  headers: {
    authorization: 'a80944c1-0d90-4430-89e2-87c35ed0d099',
    'Content-Type': 'application/json'
  }
});

let userId;

// данные с АПИ //

api.getData()
  .then((arg) => {
    const [dataUser, dataCards] = arg;
    userInfo.setUserInfo(dataUser);
    userInfo.setAvatar(dataUser.avatar);
    userId = dataUser._id;
    cardSection.renderAll(dataCards);
  })
  .catch(data => { showError(data) });

function showError(err) {
  console.log(err);
}


// массив карточек //
const cardSection = new Sections({
  renderer: (cardData) => {
    cardSection.addItem(createCard(cardData, userId, '#element-cards-template'));
  }
}, electors.imageSelector);


// функция создания карточки и функционала //
function createCard(item, userId, templateSelector) {
  const card = new Card(item, userId, templateSelector, {
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    },
    handleCardLike: () => {
      const likesCounter = card.likesCounter();
      const result = likesCounter ? api.deleteLike(card.getCardId()) : api.setLike(card.getCardId());

      result
        .then(data => {
          card.setLike(data.likes);
          card.renderLikes();
        })
        .catch(err => showError(err));
    },
    handleCardDelete: () => {
      popupWithDelete.open(card);
    }
  }, item._id);
  const newCard = card.generateCard();
  return newCard;
}

// full image //
const popupWithImage = new PopupWithImage({
  popupSelector: electors.popupFullImage
});
popupWithImage.setEventListeners();


// получение данных в редактировании профиля //
const userInfo = new UserInfo({
  nameSelector: electors.profileTitle,
  infoSelector: electors.profileSubtitle,
  avatarSelector: electors.userAvatar
});
//////////////// ADD CARD POPUP ////////////////
const addCardPopup = new PopupWithForm({
  popupSelector: electors.popupAddCard
}, formPhotoSubmit);

const formPhotoSubmit = (inputs) => {
  
  api.addCard(inputs.name, inputs.link)
    .then((data => {
      cardSection.addPrependItem(createCard(data, userId, '#element-cards-template'));
      addCardPopup.close();
    })
    .catch(err => showError(err))
    .finally(() => {}))
}

const cardAddForm = new FormValidator(config, cardsForm); // проверка валидации попапа добавления новых карточек
cardAddForm.enableValidation();

editProfileButton.addEventListener('click', () => {
  cardAddForm.clearInputErrors();
  addCardPopup.open();
})

//////////////// PROFILE POPUP ////////////////

// часть отвечающая за редактирование профиля //
const editProfilePopup = new PopupWithForm({
  popupSelector: electors.popupProfile
},
  inputs => userInfo.setUserInfo(inputs));

// часть отвечающая за валидацию редактирования профиля//
const profileEditForm = new FormValidator(config, formElement); // проверка валидации попапа редактирования профиля
profileEditForm.enableValidation();

// слушатель на открытие редактирования профиля
popupOpenButton.addEventListener('click', () => {
  const { name, about } = userInfo.getUserinfo();
  nameInput.value = name;
  aboutInput.value = about;
  profileEditForm.clearInputErrors();
  editProfilePopup.open();
})


////////////////////// POPUP EDIT PROFILE AVATAR /////////////////////

const popupEditAvatar = new PopupWithForm({
  popupSelector: electors.popupAvatar
})

profileAvatarContainer.addEventListener('click', function () {
  popupEditAvatar.open()
})
