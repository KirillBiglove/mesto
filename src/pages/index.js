import './index.css';
import Sections from '../components/Section';
import Card from '../components/Card.js';


import {
    initialCards,
    profilePopup,
    profileName,
    profileAbout,
    formElement,
    cardsForm,
    config,
    popupOpenButton,
    editProfileButton,
    nameInput,
    aboutInput,

} from '../utils/constants';

import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';


// массив карточек
const cardSection = new Sections({
    renderer: (initialCards) => {
        cardSection.addItem(createCard(initialCards));
    }
}, '.elements');

// создание и отрисовка карточек в DOM
const createCard = (cardData) => {
    const card = new Card(cardData, '#element-cards-template', () => {
        PopupWithImage.open({ link: cardData.link, name: cardData.name })
    });
    return card.generateCard();
}

cardSection.renderer(initialCards);

const userInfo = new UserInfo({
    nameSelector: '.profile__title',
    infoSelector: '.profile__subtitle'
})

const editProfilePopup = new PopupWithForm('.popup-profile', (evt) => {
    evt.preventDefault();
    const { name, title } = editProfilePopup._getInputValues();
    userInfo.setUserInfo(name, title);
    editProfilePopup.close();
});

popupOpenButton.addEventListener('click', () => {
    const newUserInfo = userInfo.getUserinfo();
    profileName.value = newUserInfo.textContent;
    profileAbout.value = newUserInfo.textContent;
    editProfilePopup.open();

})

popupOpenButton.addEventListener('click', () => {
    const newUserInfo = userInfo.getUserinfo();
    nameInput.value = newUserInfo.textContent;
    aboutInput.value = newUserInfo.textContent;
    editProfilePopup.open();
})