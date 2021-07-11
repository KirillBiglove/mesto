export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.setEventListeners();
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  };

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  };

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleOverlayClickClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }

  }

  setEventListeners() {
    this._closePopupButton = this._popupElement.querySelector('.popup-button-close');
    this._closePopupButton.addEventListener('click', () => this.close());
    this._popupElement.addEventListener('click', this._handleOverlayClickClose.bind(this));
    }
}
