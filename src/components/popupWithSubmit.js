import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor({ popupSelector }, submit) {
    super({ popupSelector })
    this._submit = submit;
  }

  setEventListeners() {
    this._form = this._popupElement.querySelector('.popup__form');
    this._form.addEventListener('submit', (evt) => {
        this._submit(evt, this._card);
    });
    super.setEventListeners();
}
  open(card) {
    this._card = card;
    super.open();
  }
}
