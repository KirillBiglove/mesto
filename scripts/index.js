import Card from './Card.js';
import FormValidator from './FormValidator.js';

/////// вводные :))) ////////

// addCards массив //
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

////// ПЕРЕМЕННЫЕ //////////
const profilePopup = document.querySelector('.popup-profile'); // переменная самого попапа
const popupOpenButton = document.querySelector('.profile__edit-button'); // открыть попап
const popupCloseButton = document.querySelector('.popup__close-btn'); // закрыть попап

const formElement = document.querySelector('.popup__container'); // форма попапа

const profileName = document.querySelector('.profile__title'); // переменные куда будет записана информация из попапа
const profileAbout = document.querySelector('.profile__subtitle'); // аналогичная переменная для записи информации


const nameInput = document.querySelector('.popup__input_change_profile-title'); // переменная откуда информация будет записана в profileName
const aboutInput = document.querySelector('.popup__input_change_profile-subtitle'); //переменная откуда информация будет записана в profileAbout

const elementCardsTemplate = document.querySelector('#element-cards-template'); // задаем template
const addSectionCardsTemplate = document.querySelector('.elements'); // секция куда будут записаны карточки
const cardsTemplateContent = elementCardsTemplate.content.querySelector('.element'); // переменная содержимого tamplate

const cardsPopup = document.querySelector('.popup-add-cards'); // сам попап с карточками
const editProfileButton = document.querySelector('.profile__add-button'); // кнопка открытия редактирования карточек с картинками и тектом
const closeCardsPopup = cardsPopup.querySelector('.popup__close-btn'); // кнопка закрытия попапа с карточками
const cardsForm = document.querySelector('.popup__cards-container'); // форма popup на создание карточек
const inputMainImageCards = document.querySelector('.popup__input_change-image'); // переменные куда будет записанна ссылка на картинку
const inputTextCards = document.querySelector('.popup__input_change-text'); // переменная куда будет записан город в карточке с картинкой


const popupOpenImage = document.querySelector('.popup-full-image'); // сам попап с открытием большой картинки
const popupFullImageCloseButton = document.querySelector('.popup__image-full-close-btn'); // кнопка закрытия большой картинки

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


const profileEditForm = new FormValidator(config, formElement); // проверка валидации попапа редактирования профиля
profileEditForm.enableValidation();

const cardAddForm = new FormValidator(config, cardsForm); // проверка валидации попапа добавления новых карточек
cardAddForm.enableValidation();


///////// ФУНКЦИИ //////////

// функция открытия Popup //
function openPopup(openedPopup) {
  openedPopup.classList.add('popup_opened');
  document.addEventListener('keydown', closeKeydownEsc);
  formElement.reset();
}

// функция закрытия Popup //
function closePopup(closedPopup) {
  closedPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeKeydownEsc);
}

// фцнция закрытия popup на кнопку esc //
function closeKeydownEsc (evt) {
  if ( evt.key === "Escape") {
    const closeKeyPopup = document.querySelector('.popup_opened');
    closePopup(closeKeyPopup);
  }
}

// функция закрытия popup при клике на overlay вокруг попапов //
function closeOverlayMouseClick (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

// функция отправки формы + замена значений profileName и profileAbout при сохранении в Popup //
function submitFormHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(profilePopup);
}

function addCard(name, link, templateSelector, openFullPhoto) {
  const card = new Card(name, link, templateSelector, openFullPhoto);
  return card.generateCard();
}

initialCards.forEach((data) => {
  addSectionCardsTemplate.append(addCard(data.name, data.link, '#element-cards-template', openPopup));
})

// функция открытия попапа добавления карточек
function handleClickAddButton() {
  cardAddForm.clearInputErrors();
  cardAddForm.toggleButtonState();
  cardsForm.reset();
  openPopup(cardsPopup)
};

///////// СЛУШАТЕЛИ ////////

// слушатель на открытие редактирования профиля //
popupOpenButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  profileEditForm.clearInputErrors();
  profileEditForm.toggleButtonState();
  openPopup(profilePopup);
});

 //слушатель на закрытие редактирования //
popupCloseButton.addEventListener('click', () => {
  closePopup(profilePopup);
});


// слушатель на открытие формы добавления карточки //
editProfileButton.addEventListener('click', handleClickAddButton);

// функция добавления карточки после нажатия на кнопку сохранить //
cardsForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addSectionCardsTemplate.prepend(addCard(inputMainImageCards.value, inputTextCards.value, '#element-cards-template', openPopup))
  cardsForm.reset();
  closePopup(cardsPopup);
});

 // слушатель на закрытие формы добавления карточки //
closeCardsPopup.addEventListener('click', () => {
  cardAddForm.clearInputErrors();
  cardAddForm.toggleButtonState();
  cardsForm.reset();
  closePopup(cardsPopup);
});

// слушатель на закрытие full image //
popupFullImageCloseButton.addEventListener('click', () => {
  closePopup(popupOpenImage);
});

// слушатели на закрытие попапов кликом на overlay //
cardsPopup.addEventListener('mousedown', closeOverlayMouseClick);
profilePopup.addEventListener('mousedown', closeOverlayMouseClick);
popupOpenImage.addEventListener('mousedown', closeOverlayMouseClick);

// слушатель на отправку данных в редактировании формы //
formElement.addEventListener('submit', submitFormHandler);


