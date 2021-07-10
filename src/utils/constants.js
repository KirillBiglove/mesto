////// ПЕРЕМЕННЫЕ //////////

export const popupOpenButton = document.querySelector('.profile__edit-button'); // открыть попап
export const popupCloseButton = document.querySelector('.popup__close-btn'); // закрыть попап

export const formElement = document.querySelector('.popup__container'); // форма попапа
export const nameInput = document.querySelector('.popup__input_change_profile-title'); // переменная откуда информация будет записана в profileName
export const aboutInput = document.querySelector('.popup__input_change_profile-subtitle'); //переменная откуда информация будет записана в profileAbout

export const elementCardsTemplate = document.querySelector('#element-cards-template'); // задаем template
export const addSectionCardsTemplate = document.querySelector('.elements'); // секция куда будут записаны карточки

export const cardsPopup = document.querySelector('.popup-add-cards'); // сам попап с карточками
export const editProfileButton = document.querySelector('.profile__add-button'); // кнопка открытия редактирования карточек с картинками и тектом
export const closeCardsPopup = cardsPopup.querySelector('.popup__close-btn'); // кнопка закрытия попапа с карточками
export const cardsForm = document.querySelector('.popup__cards-container'); // форма popup на создание карточек
export const inputMainImageCards = document.querySelector('.popup__input_change-image'); // переменные куда будет записанна ссылка на картинку
export const inputTextCards = document.querySelector('.popup__input_change-text'); // переменная куда будет записан город в карточке с картинкой

export const popupOpenImage = document.querySelector('.popup-full-image'); // сам попап с открытием большой картинки
export const popupFullImageCloseButton = document.querySelector('.popup__image-full-close-btn'); // кнопка закрытия большой картинки

export const profileAvatarContainer = document.querySelector('.profile__avatar-change-icon');

export const config = { // конфиг для валидации
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// addCards массив //
export const initialCards = [
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


export const electors = {
  imageSelector: '.elements',
  popupProfile: '.popup-profile',
  popupAddCard: '.popup-add-cards',
  popupFullImage: '.popup-full-image',
  profileTitle: '.profile__title',
  profileSubtitle: '.profile__subtitle',
  popupAvatar: '.root__popup-profile-image',
  userAvatar: '.profile__avatar'

}
