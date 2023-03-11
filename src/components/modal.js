function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup)
    }
}
function openPopup(popup) {
    document.addEventListener('keydown', closeByEscape);
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    document.removeEventListener('keydown', closeByEscape);
    popup.classList.remove('popup_opened');
}

function renderSaving(isSaving){
    const currentForm = document.querySelector('.popup_opened');
    const saveButton = currentForm.querySelector('.popup__save-button');
    if (isSaving) {
        saveButton.textContent = "Сохранение...";
    }else {
        saveButton.textContent = "Сохранить";
    }
}

export {openPopup, closePopup, renderSaving};