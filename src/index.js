import '../pages/index.css';
import {initialCards} from './cards.js';
import {createCard} from "./components/card.js";
import {closeModal, initModal, openModal} from "./components/modal";

const cardTemplate = document.getElementById('card-template');
const cardList = document.querySelector('.places__list');

const imagePopup = document.querySelector('.popup_type_image');

const editPopup = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditForm = document.querySelector('form[name=edit-profile]');
const profileEditNameInput = profileEditForm.querySelector('.popup__input_type_name');
const profileEditDescriptionInput = profileEditForm.querySelector('.popup__input_type_description');
const profileNameElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');

const newCardPopup = document.querySelector('.popup_type_new-card');
const cardAddButton = document.querySelector('.profile__add-button');
const cardForm = document.querySelector('form[name=new-place]');
const cardNameInput = cardForm.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardForm.querySelector('.popup__input_type_url');

const cardOptions = {
    onDelete: deleteCard,
    onLike: likeCard,
    onOpenImage: openImage,
    cardTemplate: cardTemplate,
    selectors: {
        card: '.card',
        image: '.card__image',
        title: '.card__title',
        deleteButton: '.card__delete-button',
        likeButton: '.card__like-button'
    }
};

const popupOptions = {
    classes: {
        opened: 'popup_is-opened'
    },
    selectors: {
        closeButton: '.popup__close'
    }
};

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const card = {
        name: cardNameInput.value.trim(),
        link: cardUrlInput.value.trim()
    }

    addCard(card);
    closeModal(newCardPopup, popupOptions);
    cardForm.reset();
}

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileNameElement.textContent = profileEditNameInput.value.trim();
    profileDescriptionElement.textContent = profileEditDescriptionInput.value.trim();
    closeModal(editPopup, popupOptions);
}

function openImage(card) {
    const image = imagePopup.querySelector('.popup__image');
    const caption = imagePopup.querySelector('.popup__caption');

    caption.textContent = card.name;
    image.src = card.link;
    image.alt = card.name;
    openModal(imagePopup, popupOptions);
}

function addCards(cards) {
    cards.reverse().forEach(addCard);
}

function addCard(card) {
    const cardElement = createCard(card, cardOptions);
    cardList.prepend(cardElement);
}

function likeCard (likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}

function deleteCard(card) {
    card.remove();
}

initModal(imagePopup, popupOptions);
initModal(newCardPopup, popupOptions);
initModal(editPopup, popupOptions);
addCards(initialCards);

profileEditButton.addEventListener('click', () => {
    profileEditNameInput.value = profileNameElement.textContent;
    profileEditDescriptionInput.value = profileDescriptionElement.textContent;
    openModal(editPopup, popupOptions);
})

cardAddButton.addEventListener('click', () => {
    openModal(newCardPopup, popupOptions);
})

cardForm.addEventListener('submit', handleCardFormSubmit);

profileEditForm.addEventListener('submit', handleEditFormSubmit);

