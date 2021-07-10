import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    open(name, link) {
      super.open();

      this._link = this._popupElement.querySelector('.popup__image-full');
      this._name = this._popupElement.querySelector('.popup__image-text');

      this._name.textContent = name;
        this._link.alt = name;
        this._link.src = link;
    }

}
