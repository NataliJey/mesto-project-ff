export function createCard(card, options) {
  const cardTemplate = options.cardTemplate;
  const cardListItem = cardTemplate.content.cloneNode(true).querySelector(options.selectors.card);
  const cardImage = cardListItem.querySelector(options.selectors.image);
  const cardTitle = cardListItem.querySelector(options.selectors.title);
  const deleteButton = cardListItem.querySelector(options.selectors.deleteButton);
  const likeButton = cardListItem.querySelector(options.selectors.likeButton);

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  deleteButton.addEventListener('click', () => {
    options.onDelete(cardListItem);
  });

  likeButton.addEventListener('click', () => {
    options.onLike(likeButton, options);
  });

  cardImage.addEventListener('click', () => {
    options.onOpenImage(card);
  })

  return cardListItem;
}

export function likeCard(likeButton, options) {
  likeButton.classList.toggle(options.classes.likeActiveButton);
}

export function deleteCard(card) {
  card.remove();
}