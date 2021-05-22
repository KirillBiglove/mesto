const hideInputError = (formElement, inputElement, errorsClass) => {
    const { inputErrorClass, errorClass } = errorsClass;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
}

const showInputError = (formElement, inputElement, errorsClass) => {
    const { inputErrorClass, errorClass } = errorsClass;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = inputElement.validationMessage;
}


const checkInputValidity = (formElement, inputElement, errorsClass) => {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, errorsClass);
    }
    else {
        showInputError(formElement, inputElement, errorsClass);
    }
}

const hazInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
}

const toggleButtonState = (buttonElement, inputList) => {
  if (hazInvalidInput(inputList)) {
    buttonElement.disabled = true;
  }
  else {
    buttonElement.disabled = false;
  }
}

const setEventListeners = (formElement) => {
    const { inputSelector, submitButtonSelector, inactiveButtonClass, ...errorsClass } = config;
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      toggleButtonState(buttonElement, inputList);
    })
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, errorsClass);
            toggleButtonState(buttonElement, inputList)
        });
    })
    toggleButtonState(buttonElement, inputList);
}

const clearInputErrors = (formList) => {
  const {inputSelector} = config;
  formList.forEach(formElement => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    inputList.forEach(inputElement => {
      hideInputError(formElement, inputElement, config);
    })
})
}


const enableValidation = (config) => {
    const { formSelector, ...restConfig } = config;
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        setEventListeners(formElement, restConfig);
    })
}
