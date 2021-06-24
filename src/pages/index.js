import './index.css';
import Sections from '../components/Section';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';


import {
    initialCards,
    profilePopup,
    profileName,
    profileAbout,
    formElement,
    cardsForm,
    config,
    electors,
    popupOpenButton,
    editProfileButton,
    nameInput,
    aboutInput,

} from '../utils/constants';

import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';


// массив карточек //
const cardSection = new Sections({
    item: initialCards,
    renderer: (item) => {
        cardSection.addItem(createCard(item));
    }
}, electors.imageSelector);

// создание и отрисовка карточек в DOM //
const createCard = (item) => {
    const card = new Card(item, '#element-cards-template', () => {
        popupWithImage.open(item);
    });
    return card.generateCard();
}

cardSection.renderer(initialCards);

// full image //
const popupWithImage = new PopupWithImage ({
  popupSelector: electors.popupFullImage
});

popupWithImage.setEventListeners();

// получение данных в редактировании профиля //

const userInfo = new UserInfo({
    nameSelector: electors.profileTitle,
    infoSelector: electors.profileSubtitle
});
//////////////// ADD CARD POPUP ////////////////
const addCardPopup = new PopupWithForm ({
  popupSelector: electors.popupAddCard },
  item => cardSection.addPrependItem(createCard(item)));

  const cardAddForm = new FormValidator(config, cardsForm); // проверка валидации попапа добавления новых карточек
  cardAddForm.enableValidation();

  editProfileButton.addEventListener('click', () => {
    addCardPopup.open();
})

//////////////// PROFILE POPUP ////////////////

// часть отвечающая за редактирование профиля //
const editProfilePopup = new PopupWithForm ({
  popupSelector: electors.popupProfile},
  inputs => userInfo.setUserInfo(inputs));

// часть отвечающая за валидацию редактирования профиля//
  const profileEditForm = new FormValidator(config, formElement); // проверка валидации попапа редактирования профиля
  profileEditForm.enableValidation();

// слушатель на открытие редактирования профиля
popupOpenButton.addEventListener('click', () => {
    const newUserInfo = userInfo.getUserinfo();
    profileName.value = newUserInfo.textContent;
    profileAbout.value = newUserInfo.textContent;
    editProfilePopup.open();
})
