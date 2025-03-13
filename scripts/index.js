const cardTemplate = document.getElementById('card-template');
const cardList = document.querySelector('.places__list');

function createCard(card, deleteCallback) {
    const cardListItem = cardTemplate.content.cloneNode(true).querySelector('.card');
    const cardImage = cardListItem.querySelector('.card__image');
    const cardTitle = cardListItem.querySelector('.card__title');
    const deleteButton = cardListItem.querySelector('.card__delete-button');

    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardTitle.textContent = card.name;

    deleteButton.addEventListener('click', () => {
        deleteCallback(cardListItem);
    });

    return cardListItem;
}

function deleteCard(card) {
    card.remove();
}

function createCards(cards) {
    cards.forEach((card) => {
        const cardElement = createCard(card, deleteCard);
        cardList.append(cardElement);
    });
}

createCards(initialCards);
