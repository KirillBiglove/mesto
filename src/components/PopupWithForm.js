import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._formElement = this._popupElement.querySelector('.popup__form');
        this._inputList = this._formElement.querySelector('.popup__input');
    }

    _getInputValues(){
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
        };

    setEventListeners() {
        this._formElement.addEventListener('submit', evt => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
        });
        super.setEventListeners();
    }

    close() {
        super.close();
        this._formElement.reset();
    }

}