export default class Popup {
  constructor(popupSelector) {
    this._popupOpenButton = popupOpenButton;

    this.open(popupOpenButton);

  }

  open(popupOpenButton) {
    popupOpenButton.classList.add('popup_opened');
  };

  close(popupSelector) {
    popupSelector.classList.remove('popup_opened');
  };

  _handleEscClose(evt) {
    if ( evt.key === "Escape") {
      const closeKeyPopup = document.querySelector('.popup_opened');
      closePopup(closeKeyPopup);
    }
  };

  setEventListeners() {
    popupSelector.addEventListener('click', () => {
      this.close(popupSelector);
    })
  }
}
