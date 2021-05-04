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

// функция отправки формы + замена значений profileName и profileAbout при сохранении в Popup//
function SubmitFormHandler(evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup();
}

formElement.addEventListener('submit', SubmitFormHandler);
popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);


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


function addCard(image, title) {
  const addNewCard = elementCardsTemplate.content.cloneNode(true);
  const addImage = elementCardsTemplate.content.querySelector('.element__main-image');
  const addText = elementCardsTemplate.content.querySelector('.element__text');
  
  
}

initialCards.forEach(function(item){
  const arrValue = addCard(item.link, item.name);
  addSectionCardsTemplate.append(arrValue);
})
