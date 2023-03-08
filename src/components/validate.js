const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !(inputElement.validity.valid || /[^a-zа-яё\s-]+/ig.test(inputElement.value));
    });
};

const showInputError = (formElement, inputElement, errorMessage, settings) => {

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
};

const toggleButtonState = (inputList, submitButton, settings) => {
    if (hasInvalidInput(inputList)) {
        submitButton.disabled = true;
        submitButton.classList.add(settings.inactiveButtonClass);
    } else {
        submitButton.disabled = false;
        submitButton.classList.remove(settings.inactiveButtonClass);
    }
}


const checkInputValidity = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
        if (inputElement.id === 'place-link') {
            inputElement.dataError = "Введите адрес сайта.";
        } else {
            inputElement.dataError = "Вы пропустили это поле.";
        }
        showInputError(formElement, inputElement, inputElement.dataError, settings);
    } else if (/[^a-zа-яё\s-]+/ig.test(inputElement.value)) {
        inputElement.dataError = "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.";

        showInputError(formElement, inputElement, inputElement.dataError, settings);
    }else {
        hideInputError(formElement, inputElement, settings);
    }
};

const setEventListeners = (fieldSet, formElement, settings) => {
    const inputList = Array.from(fieldSet.querySelectorAll(settings.inputSelector));
    const submitButton = formElement.querySelector(settings.submitButtonSelector);

    toggleButtonState(inputList, submitButton, settings);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, settings);
            toggleButtonState(inputList, submitButton, settings);
        });
    });
};


export const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        const fieldsetList = Array.from(formElement.querySelectorAll(settings.fieldsetSelector))

        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet, formElement, settings);
        });
    });
};