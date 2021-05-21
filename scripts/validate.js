const hideInputError = (formElement, inputElement) => {
    const { inputErrorClass, errorClass } = config;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
}

const showInputError = (formELement, inputElement) => {
    const { inputErrorClass, errorClass } = config;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
}


const checkInputValidity = (inputElement, formElement) => {
    console.log(inputElement);
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement);
    }
    else {
        showInputError(formElement, inputElement);
    }
}

const setEventListeners = (formElement) => {
    const { inputSelector, ...restConfig } = config;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(inputElement);
        })
    })
}

const enableValidation = (config) => {
    const { formSelector, ...restConfig } = config;
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        setEventListeners(formElement);
    })
}
