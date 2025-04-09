export function openModal(popup) {
  popup.classList.add('popup_is-opened');

  document.addEventListener('keydown', closeByEsc)
}

export function closeModal(popup, options) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEsc);
}

const closeByEsc = (evt, options) => {
  if (evt.key !== 'Escape') return;

  const openPopup = document.querySelector('.popup_is-opened');
  if (openPopup) {
    closeModal(openPopup);
  }
}

export function initModal(popup, options) {
  const popupCloseButton = popup.querySelector(options.selectors.closeButton);

  popupCloseButton.addEventListener('click', () => {
    closeModal(popup);
  });

  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  })
}