import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    open(data) {
      super.open();

      this._link = this._popupElement.querySelector('.popup__image-full');
      this._name = this._popupElement.querySelector('.popup__image-text');

      this._name.textContent = data.name;
        this._link.alt = data.name;
        this._link.src = data.link;
        super.open();
    }

}
