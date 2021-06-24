export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;

    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
  }
// класс принимающий на вход конфиг

  _setEventListeners() {
    this._inputList.forEach((inputELement) => {
      inputELement.addEventListener('input', () => {
        this._checkInputValidity(inputELement);
        this.toggleButtonState();
      })
    })
  }

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }
// убрать ошибки валидации инпутов

  _showInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = inputElement.validationMessage;

  }
// показать ошибку валидации инпутов

  _checkInputValidity = (inputElement) => {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
  }
  else {
      this._showInputError(inputElement);
  }
  }
// проверка валидации инпутов

  _hazInvalidInput = () => {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }
// проверка валидации формы

  _activeButton = () => {
    this._buttonElement.disabled = false;
    this._buttonElement.classList.remove(this._inactiveButtonclass);
  }
// активная кнопка при валидации
  _disableButton = () => {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._inactiveButtonclass);
  }
//выключенная кнопка при ошибках

  toggleButtonState() {
    if (this._hazInvalidInput()) {
      this._disableButton(this._buttonElement);
    }
    else {
      this._activeButton(this._buttonElement);
    }
  }
// переключение кнопки в зависимости от валидности или не валидности инпутов

  clearInputErrors = () => {
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
      this.toggleButtonState();
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}





