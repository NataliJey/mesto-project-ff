import {deleteLike, putLike, deleteMyCard} from "../api";

export function createCard(card, options, profileId) {
  const cardTemplate = options.cardTemplate;
  const cardListItem = cardTemplate.content.cloneNode(true).querySelector(options.selectors.card);
  const cardImage = cardListItem.querySelector(options.selectors.image);
  const cardTitle = cardListItem.querySelector(options.selectors.title);
  const deleteButton = cardListItem.querySelector(options.selectors.deleteButton);
  const likeButton = cardListItem.querySelector(options.selectors.likeButton);
  const likeCounter = cardListItem.querySelector(options.selectors.likeCounter)
  const cardId = card['_id'];

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  likeCounter.textContent = card.likes.length;

  const isLiked = card.likes.some((like) => like._id === profileId);
  if (isLiked) {
    likeButton.classList.add(options.classes.likeActiveButton);
  }

  if (card.owner['_id'] !== profileId) {
    deleteButton.classList.add(options.classes.deleteInactiveButton);
  }

  deleteButton.addEventListener('click', () => {
    options.onDelete(cardListItem, cardId);
  });

  likeButton.addEventListener('click', () => {
    options.onLike(likeButton, likeCounter, cardId, options);
  });

  cardImage.addEventListener('click', () => {
    options.onOpenImage(card);
  })

  return cardListItem;
}

export function likeCard(likeButton, likeCounter, cardId, options) {
  const isLiked = likeButton.classList.contains(options.classes.likeActiveButton);

  const changeLikeStatus = isLiked ? deleteLike : putLike;

  changeLikeStatus(cardId)
    .then((updatedCard) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCounter.textContent = updatedCard.likes.length;
    })
    .catch((error) => {
      console.error("Ошибка при изменении лайка:", error);
    });
}

export function deleteCard(card, cardId) {
  deleteMyCard (cardId)
    .then(() => {
      card.remove();
    })
    .catch((error) => {
      console.log(error);
    });
}