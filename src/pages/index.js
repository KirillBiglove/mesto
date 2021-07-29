import './index.css';
import Sections from '../components/Section.js';
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
  avatarForm

} from '../utils/constants';

import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api.js';
import PopupWithSubmit from '../components/popupWithSubmit.js';


// АПИ //
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: 'ad833f77-198c-45de-941f-7b297c4a16d2',
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

const formPhotoSubmit = (inputs) => {
  addCardPopup.onLoadingButton();

  api.addCard(inputs.name, inputs.link)
    .then((data) => {
      cardSection.addPrependItem(createCard(data, userId, '#element-cards-template'));
      addCardPopup.close();
    })
    .catch(err => showError(err))
}

const addCardPopup = new PopupWithForm({
  popupSelector: electors.popupAddCard
}, formPhotoSubmit);

const cardAddForm = new FormValidator(config, cardsForm); // проверка валидации попапа добавления новых карточек
cardAddForm.enableValidation();

editProfileButton.addEventListener('click', () => {
  cardAddForm.clearInputErrors();
  addCardPopup.open();
})

//////////////// PROFILE POPUP ////////////////

// форма изменения и получения с сервера данных в профиль //
const formEditSubmit = (inputs) => {
  editProfilePopup.onLoadingButton();

  api.editProfile(inputs.name, inputs.about)
    .then(() => {
      userInfo.setUserInfo(inputs);
      editProfilePopup.close();
    })
    .catch(err => showError(err))
    .finally (() => {
      editProfilePopup.offLoadingButton();
    });
}

// редактирование профиля с функцией изменения и получения с сервера данных в профиль //
const editProfilePopup = new PopupWithForm({
  popupSelector: electors.popupProfile
}, formEditSubmit);

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

const formChangeAvatar = (inputs) => {
  popupEditAvatar.onLoadingButton();

  api.changeAvatar(inputs['link'])
    .then(() => {
      userInfo.setAvatar(inputs['link']);
      popupEditAvatar.close();
    })
    .catch(err => showError(err))
    .finally(() => {
      popupEditAvatar.offLoadingButton();
    })
}

const popupEditAvatar = new PopupWithForm({
  popupSelector: electors.popupAvatar
}, formChangeAvatar)

const popupAvatarEditForm = new FormValidator(config, avatarForm)
popupAvatarEditForm.enableValidation();

profileAvatarContainer.addEventListener('click', function () {
  popupAvatarEditForm.clearInputErrors();
  popupEditAvatar.open()
})

const formDeleteCard = (evt, card) => {
  evt.preventDefault();

  api.deleteCard(card.getCardId())
      .then(res => {
          card.removeCard();
          popupWithDelete.close();
      })
      .catch(err => showError(err))
}

const popupWithDelete = new PopupWithSubmit({
  popupSelector: electors.popupDeleteCard
}, (evt, card) => {
  formDeleteCard(evt, card)
});

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

popupWithDelete.setEventListeners();


