import Popup from "./Popup.js";

export default class Card {
  constructor({ name, link, likes, owner }, userId, templateSelector, { handleCardClick, handleCardLike, handleCardDelete }, cardId) {
    this._link = link;
    this._name = name;
    this._likeCount = likes;
    this._ownerId = owner._id;
    this._templateSelector = templateSelector;
    this._userId = userId;
    this._cardId = cardId;
    this._handleCardClick = handleCardClick;
    this._handleCardlike = handleCardLike;
    this._handleCardDelete = handleCardDelete;

    //this._fullPhoto = document.querySelector('.popup__image-full');
    //this._fullPhotoTitle = document.querySelector('.popup__image-text');

  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.element')
    this._cardElement = cardTemplate.cloneNode(true);
  }

  getCardId() {
    return this._cardId;
  }

  likesCounter() {
    return this._likeCount.some(like => {
      return like._id === this._userId;
    });
  }

  showLike() {
    if (this.likesCounter(this._userId)) {
      this._likeButton.classList.add('element__button-like_active');
    } else {
      this._likeButton.classList.remove('element__button-like_active');
    }
  }

  renderLikes() {
    this._likes.textContent = this._likeCount.length;
    this.showLike(this._userId);
  }

  setLike(list) {
    this._likeCount = list;
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handleCardlike());
    this._trashButton.addEventListener('click', () => this._handleCardDelete());
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }



  generateCard() {
    this._getTemplate();

    this._likeButton = this._cardElement.querySelector('.element__button-like');
    this._likes = this._cardElement.querySelector('.element__like-counter');
    this._trashButton = this._cardElement.querySelector('.element__delete-btn');
    this._cardImage = this._cardElement.querySelector('.element__main-image');
    this._cardTitle = this._cardElement.querySelector('.element__text');

    if (this._ownerId !== this._userId) {
      this._trashButton.remove();
    }

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();
    this.renderLikes();

    return this._cardElement;
  }
}
