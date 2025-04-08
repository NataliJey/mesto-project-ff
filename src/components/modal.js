const escapeListeners = new Map();

export function openModal(popup, options) {
  popup.classList.add(options.classes.opened);
  const escapeListener = (evt) => {
    if (evt.key === 'Escape' && popup.classList.contains(options.classes.opened)) {
      closeModal(popup, options);
    }
  }

  escapeListeners.set(popup, escapeListener);

  document.addEventListener('keydown', escapeListener);
}

export function closeModal(popup, options) {
  popup.classList.remove(options.classes.opened);
  document.removeEventListener('keydown', escapeListeners.get(popup));
}

export function initModal(popup, options) {
  const popupCloseButton = popup.querySelector(options.selectors.closeButton);

  popupCloseButton.addEventListener('click', () => {
    closeModal(popup, options);
  });

  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closeModal(popup, options);
    }
  })
}