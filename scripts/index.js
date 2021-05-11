const popupOpenButton = document.querySelector('.profile__edit-button'); // открыть попап
const profilePopup = document.querySelector('.popup__profile'); // переменная самого попапа
const formElement = document.querySelector('.popup__container'); // переменная формы
const profileName = document.querySelector('.profile__title'); // переменные куда будет записана информация из попапа
const profileAbout = document.querySelector('.profile__subtitle'); // аналогичная переменная для записи информации
const nameInput = document.querySelector('.popup__input_change_profile-title'); // переменная откуда информация будет записана в profileName
const aboutInput = document.querySelector('.popup__input_change_profile-subtitle'); //переменная откуда информация будет записана в profileAbout
const popupCloseButton = document.querySelector('.popup__close-btn');
const elementCardsTemplate = document.querySelector('#element-cards-template'); // задаем template
const addSectionCardsTemplate = document.querySelector('.elements'); // секция куда будут записаны карточки
const cardsTemplateContent = elementCardsTemplate.content.querySelector('.element'); // переменная содержимого tamplate
const editProfileButton = document.querySelector('.profile__add-button'); // кнопка открытия редактирования карточек с картинками и тектом
const cardsForm = document.querySelector('.popup__cards-container'); // форма popup на создание карточек
const cardsPopup = document.querySelector('.popup-add-cards'); // сам попап с карточками
const closeCardsPopup = cardsPopup.querySelector('.popup__close-btn'); // кнопка закрытия попапа с карточками
const inputMainImageCards = document.querySelector('.popup__cards-input_image'); // переменные куда будет записанна ссылка на картинку
const inputTextCards = document.querySelector('.popup__cards-input_text'); // переменная куда будет записан город в карточке с картинкой
const popupOpenImage = document.querySelector('.popup-full-image'); // сам попап с открытием большой картинки
const openImageValue = document.querySelector('.popup__image-full'); // переменные куда будут записаны данные с клика для картинки
const imageTextValue = document.querySelector('.popup__image-text'); // переменные куда будут записаны данные с клика для текста
const popupFullImageCloseButton = document.querySelector('.popup__image-full-close-btn'); // кнопка закрытия большой картинки
const likeButton = (evt) => {
  evt.target.classList.toggle('element__button-like_active'); // лайк
}

const deleteCard = (evt) => {
  evt.target.closest('.element').remove(); // удаление карточки
}


// функция открытия Popup //
function openPopup(openedPopup) {
  openedPopup.classList.add('popup_opened');
}

// функция закрытия Popup //
function closePopup(closedPopup) {
  closedPopup.classList.remove('popup_opened');
}

// функция отправки формы + замена значений profileName и profileAbout при сохранении в Popup //
function submitFormHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(profilePopup);
}

formElement.addEventListener('submit', submitFormHandler);

 // слушатель на открытие редактирования //
popupOpenButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  openPopup(profilePopup);
});
 //слушатель на закрытие редактирования //
popupCloseButton.addEventListener('click', () => {
  closePopup(profilePopup);
});

// JS - из проектной работы № 4 - FINISH //
//////////////////////////////////////////////////////////////////////////////////////////////////////
//JS - из проектной работы № 5 - START //

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

function addCard(image, title) {
  const cloneNewCard = cardsTemplateContent.cloneNode(true);
  const cardImage = cloneNewCard.querySelector('.element__main-image');
  const cardText = cloneNewCard.querySelector('.element__text');
  cardImage.src = image;
  cardText.textContent = title;
  cardImage.alt = title;

  //  назначение слушателя кнопке like на положение active
    cloneNewCard.querySelector('.element__button-like').addEventListener('click', likeButton);

  // назначение слушателя на удаление карточки по нажатию на кнопку с мусоркой
  cloneNewCard.querySelector('.element__delete-btn').addEventListener('click', deleteCard)

  // открытие большой картинки по нажатию мыши //
  cardImage.addEventListener('click', openEditCardsButton);
  return cloneNewCard;
}

// берем и назначаем методом перебора нужные нам селекторы для функции загрузки карточек //
initialCards.forEach((item) => {
  const newCard = addCard(item.link, item.name);
  addSectionCardsTemplate.append(newCard);
})

// функция открытия full image //
function openEditCardsButton(evt) {
  openImageValue.src = evt.target.src;
  imageTextValue.textContent = evt.target.alt;
  popupOpenImage.alt = evt.target.alt;
  openPopup(popupOpenImage);
};

// слушатель на закрытие full image //
popupFullImageCloseButton.addEventListener('click', () => {
  closePopup(popupOpenImage);
});

function handleClickEditProfileButton() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  openPopup(cardsPopup)
};

// слушатель на открытие формы добавления карточки //
editProfileButton.addEventListener('click', handleClickEditProfileButton);


// функция добавления карточки после нажатия на кнопку сохранить //
cardsForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const image = inputMainImageCards.value;
  const title = inputTextCards.value;
  const addNewCard = addCard(image, title);
  addSectionCardsTemplate.prepend(addNewCard);
  cardsForm.reset();
  closePopup(cardsPopup);
});

 // слушатель на закрытие формы добавления карточки //
closeCardsPopup.addEventListener('click', () => {
  closePopup(cardsPopup);
});

