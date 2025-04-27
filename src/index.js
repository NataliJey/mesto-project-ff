import '../pages/index.css';
import {createCard, deleteCard, likeCard} from "./components/card.js";
import {closeModal, initModal, openModal} from "./components/modal";
import {editProfile, getInitialInfo, postNewCard, updateAvatarImage} from "./api";
import {clearValidation, enableValidation} from "./validation";

const cardTemplate = document.getElementById('card-template');
const cardList = document.querySelector('.places__list');

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const ImagePopupCaption = imagePopup.querySelector('.popup__caption');

const editPopup = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditForm = document.querySelector('form[name=edit-profile]');
const profileEditNameInput = profileEditForm.querySelector('.popup__input_type_name');
const profileEditDescriptionInput = profileEditForm.querySelector('.popup__input_type_description');
const profileNameElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');
const editSaveButton = editPopup.querySelector(".popup__button");

const newCardPopup = document.querySelector('.popup_type_new-card');
const cardAddButton = document.querySelector('.profile__add-button');
const cardForm = document.querySelector('form[name=new-place]');
const cardNameInput = cardForm.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardForm.querySelector('.popup__input_type_url');
const cardSaveButton = newCardPopup.querySelector(".popup__button");

const profileImageButton = document.querySelector('.profile__image_cover');
const profileImage = document.querySelector('.profile__image');
const profilePopup = document.querySelector('.popup_type_avatar');
const profileForm = document.forms['avatar_edit'];
const profileLinkInput = profileForm.querySelector('.popup__input_type_url');
const profileSaveButton = profilePopup.querySelector('.popup__button');

const cardOptions = {
  onOpenImage: openImage,
  onDelete: deleteCard,
  onLike: likeCard,
  cardTemplate: cardTemplate,
  selectors: {
    card: '.card',
    image: '.card__image',
    title: '.card__title',
    deleteButton: '.card__delete-button',
    likeButton: '.card__like-button',
    likeCounter: '.card__like-count'
  },
  classes: {
    likeActiveButton: 'card__like-button_is-active',
    deleteInactiveButton: 'card__delete-button-inactive'
  }
};

const popupOptions = {
  selectors: {
    closeButton: '.popup__close'
  }
};

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const showLoadingBtn = (isLoading, button) => {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
};

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  showLoadingBtn(true, newCardPopup.querySelector(".popup__button"));
  cardSaveButton.disabled = true;
  postNewCard(cardNameInput.value.trim(), cardUrlInput.value.trim())
    .then((card) => {
      addCard(card);
      closeModal(newCardPopup, popupOptions);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      cardForm.reset();
      showLoadingBtn(false, newCardPopup.querySelector(".popup__button"));
    });
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  showLoadingBtn(true, editPopup.querySelector(".popup__button"));
  editSaveButton.disabled = true;
  editProfile(profileEditNameInput.value.trim(), profileEditDescriptionInput.value.trim())
    .then((res) => {
      profileNameElement.textContent = res.name;
      profileDescriptionElement.textContent = res.about;
      closeModal(editPopup, popupOptions);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      showLoadingBtn(false, editPopup.querySelector(".popup__button"));
    });
}

function handleProfileForm(evt) {
  evt.preventDefault();

  showLoadingBtn(true, profilePopup.querySelector('.popup__button'));
  profileSaveButton.disabled = true;
  updateAvatarImage(profileLinkInput.value)
    .then((res) => {
      profileImage.style.backgroundImage = `url('${res.avatar}')`;
      closeModal(profilePopup);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      profileForm.reset();
      showLoadingBtn(false, profileForm.querySelector('.popup__button'));
    });
}

function openImage(card) {
  ImagePopupCaption.textContent = card.name;
  imagePopupImage.src = card.link;
  imagePopupImage.alt = card.name;
  openModal(imagePopup, popupOptions);
}

function addCards(cards, profileId) {
  cards.reverse().forEach((card) => {
    addCard(card, profileId);
  });
}

function addCard(card, profileId) {
  const cardElement = createCard(card, cardOptions, profileId);
  cardList.prepend(cardElement);
}

function initPage() {
  getInitialInfo()
    .then(([userInfo, cardsInfo]) => {
      profileNameElement.textContent = userInfo.name;
      profileDescriptionElement.textContent = userInfo.about;
      profileImage.style.backgroundImage = `url('${userInfo.avatar}')`;
      addCards(cardsInfo, userInfo['_id']);
    })
  enableValidation(validationConfig);
}

initPage();
initModal(imagePopup, popupOptions);
initModal(newCardPopup, popupOptions);
initModal(editPopup, popupOptions);
initModal(profilePopup, popupOptions);

profileEditButton.addEventListener('click', () => {
  profileEditNameInput.value = profileNameElement.textContent;
  profileEditDescriptionInput.value = profileDescriptionElement.textContent;
  openModal(editPopup, popupOptions);
  clearValidation(editPopup, validationConfig);
})

cardAddButton.addEventListener('click', () => {
  openModal(newCardPopup, popupOptions);
  clearValidation(newCardPopup, validationConfig);
})

profileImageButton.addEventListener("click", () => {
  openModal(profilePopup);
  profileForm.reset();
  clearValidation(profileForm, validationConfig);
});

profileForm.addEventListener("submit", handleProfileForm);

cardForm.addEventListener('submit', handleCardFormSubmit);

profileEditForm.addEventListener('submit', handleEditFormSubmit);

