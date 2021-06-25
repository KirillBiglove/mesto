import Popup from "./Popup.js";

export default class Card {
  constructor(data, templateSelector, handleFullPhotoOpen){
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
    this._handleFullPhotoOpen = handleFullPhotoOpen;

    this._getTemplate();

    this._cardImage = this._cardElement.querySelector('.element__main-image');
    this._cardTitle = this._cardElement.querySelector('.element__text');
    this._likeButton = this._cardElement.querySelector('.element__button-like');
    this._trashButton = this._cardElement.querySelector('.element__delete-btn');

    this._fullPhoto = document.querySelector('.popup__image-full');
    this._fullPhotoTitle = document.querySelector('.popup__image-text');

  }
  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.element');
    this._cardElement = cardTemplate.cloneNode(true);
  }
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handleSetLike());
    this._trashButton.addEventListener('click', () => this._handleDelCard());
    this._fullPhoto.addEventListener('click', () => this._handleFullPhotoOpen());
  }

  _handleSetLike() {
    this._likeButton.classList.toggle('element__button-like_active');
  }

  _handleDelCard() {
    this._cardElement.remove();
  }

  generateCard() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
