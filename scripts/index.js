const openPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close-btn');

function togglePopup(event) {
  popup.classList.toggle('popup__open');
}

openPopupButton.addEventListener('click', togglePopup)
closePopupButton.addEventListener('click', togglePopup);
