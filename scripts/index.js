let popupOpenButton = document.querySelector('.profile__edit-button'); // открыть попап
let popupCloseButton = document.querySelector('.popup__close-btn'); // закрыть попап
let popup = document.querySelector('.popup'); // переменная самого попапа
let formElement = document.querySelector('.popup__container'); // переменная формы
let profileName = document.querySelector('.profile__title'); // переменные куда будет записана информация из попапа
let profileAbout = document.querySelector('.profile__subtitle'); // аналогичная переменная для записи информации
let nameInput = document.querySelector('.popup__input_change_profile-title'); // переменная откуда информация будет записана в profileName
let aboutInput = document.querySelector('.popup__input_change_profile-subtitle'); //переменная откуда информация будет записана в profileAbout

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function SubmitFormHandler(evt) {
  evt.preventDefault(); // попробуйте посмотреть в файле, у меня сделано везде одинаково с одинаковым количеством отступов.
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup();
}

formElement.addEventListener('submit', SubmitFormHandler);
popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
