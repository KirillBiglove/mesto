let openPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close-btn');
let formElement = document.querySelector('.popup__container');
let saveButton = document.querySelector('.popup__save-btn');

function togglePopup(event) {
  popup.classList.toggle('popup__opened');
}

function openSaveEdit() {
  popup.classList.add('.popup__opened');
  nameValue = nameElemementValue.textContent;
  aboutValue = aboutElemementValue.textContent;
}

function formSubmitHandler(evt) {
	evt.preventDefault();
  let profileName = document.querySelector('.profile__title');
  let profileJob = document.querySelector('.profile__subtitle');
  let nameInput = document.querySelector('.popup__input_change_profile-title');
  let jobInput = document.querySelector('.popup__input_change_profile-subtitle');
  let nameValue = document.querySelector('.popup__input_change_profile-title').value;
  let aboutValue= document.querySelector('.popup__input_change_profile-subtitle').value;
  let nameElemementValue = document.querySelector('h1');
  nameElemementValue.textContent = nameValue;
  let aboutElemementValue = document.querySelector('h3');
  aboutElemementValue.textContent = aboutValue;
}

openPopupButton.addEventListener('click', togglePopup);
closePopupButton.addEventListener('click', togglePopup);
formElement.addEventListener('click', formSubmitHandler);
formElement.addEventListener('submit', formSubmitHandler);
saveButton.addEventListener('click', togglePopup);

