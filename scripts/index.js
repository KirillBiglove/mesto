let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-btn');
let popup = document.querySelector('.popup');


popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}
