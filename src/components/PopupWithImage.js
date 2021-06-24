import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._link = this._popupElement.querySelector('.popup__image-full');
        this._name = this._popupElement.querySelector('.popup__image-text');
    }

    open({link, name}) {
        this._name.textContent = name;
        this._link.alt = name;
        this._link.src = link;
        super.open();
    }

}