let popupOpenButton = document.querySelector('.profile__edit-button'); // открыть попап
let popupCloseButton = document.querySelector('.popup__close-btn'); // закрыть попап
let popup = document.querySelector('.popup'); // переменная самого попапа
let formElement = document.querySelector('.popup__container'); // переменная формы
let profileName = document.querySelector('.profile__title'); // переменные куда будет записана информация из попапа
let profileAbout = document.querySelector('.profile__subtitle'); // аналогичная переменная для записи информации
let nameInput = document.querySelector('.popup__input_change_profile-title'); // переменная откуда информация будет записана в profileName
let aboutInput = document.querySelector('.popup__input_change_profile-subtitle'); //переменная откуда информация будет записана в profileAbout


// функция открытия Popup //
function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

// функция закрытия Popup //
function closePopup() {
  popup.classList.remove('popup_opened');
}

// функция отправки формы + замена значений profileName и profileAbout при сохранении в Popup //
function SubmitFormHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup();
}

formElement.addEventListener('submit', SubmitFormHandler);
popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

// JS - из проектной работы № 4 - FINISH //

//JS - из проектной работы № 5 - START //

// addCards

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

const elementCardsTemplate = document.querySelector('#element-cards-template'); // задаем template
const addSectionCardsTemplate = document.querySelector('.elements'); // секция куда будут записаны карточки
const editCardsButton = document.querySelector('.profile__add-button');
const closeCardsPopup = document.querySelector('.popup__close-cards-btn');
const cardsPopup = document.querySelector('.popup__cards');

// функция загрузки карточек из массива на основную страницу //

function addCard(image, title) {
  const addNewCard = elementCardsTemplate.content.querySelector('.element').cloneNode(true); // клонируем карточки
  const cardImage = addNewCard.querySelector('.element__main-image'); // место для картинки
  const cardText = addNewCard.querySelector('.element__text'); // место для текста

  cardImage.src = image;
  cardText.textContent = title;
  cardImage.alt = title;
  return addNewCard;
}

// берем и назначаем методом перебора нужные нам селекторы для функции загрузки карточек //

initialCards.forEach(function(item){
  const arrValues = addCard(item.link, item.name);
  addSectionCardsTemplate.append(arrValues);
})

// функция открытия и закрытия popup редактирования карточек //

function openEditCardsButton() {
  cardsPopup.classList.add('popup_opened');
};

function closeEditCardsButton() {
  cardsPopup.classList.remove('popup_opened');
};

// назначение слушателей //
editCardsButton.addEventListener('click', openEditCardsButton);
closeCardsPopup.addEventListener('click', closeEditCardsButton);
