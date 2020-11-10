'use strict';

const ROOM_ENDINGS = [`комната`, `комнаты`, `комнат`];
const FOR_GUEST_ENDING = [`гостя`, `гостей`, `гостей`];

const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

// просто if (data) не подходит, так как '0' и также приводит к false
const showConditions = (data) => (data === null || data === undefined || data === `` || data.length === 0);

const hideElement = (cardElement, element) => {
  cardElement.querySelector(element).classList.add(`hidden`);
};

const fillElement = (cardElement, element, data) => {
  if (showConditions(data)) {
    hideElement(cardElement, element);
  } else {
    cardElement.querySelector(element).textContent = data;
  }
};

const fillFeatures = (cardElement, element, data) => {
  if (showConditions(data)) {
    hideElement(cardElement, element);
  } else {
    data.forEach((item) => {
      cardElement.querySelector(`.popup__feature--${item}`).classList.remove(`hidden`);
    });
  }
};

const fillPhotos = (cardElement, element, data) => {
  if (showConditions(data)) {
    hideElement(cardElement, element);
  } else {
    const photosContainer = cardElement.querySelector(element);
    const photoItem = photosContainer.removeChild(photosContainer.querySelector(`.popup__photo`));

    data.forEach((photoSource) => {
      const photo = photoItem.cloneNode(true);
      photo.src = photoSource;
      photosContainer.appendChild(photo);
    });
  }
};

const fillCapacity = (cardElement, element, dataRooms, dataGuests) => {
  if (showConditions(dataRooms) || showConditions(dataGuests)) {
    hideElement(cardElement, element);
  } else {
    const roomsPartText = `${dataRooms} ${window.util.declinationOfNumber(dataRooms, ROOM_ENDINGS)}`;
    const guestPartText = `${dataGuests} ${window.util.declinationOfNumber(dataGuests, FOR_GUEST_ENDING)}`;
    cardElement.querySelector(element).textContent = `${roomsPartText} для ${guestPartText}`;
  }
};

const fillTime = (cardElement, element, dataCheckin, dataCheckout) => {
  if (showConditions(dataCheckin) || showConditions(dataCheckout)) {
    hideElement(cardElement, element);
  } else {
    cardElement.querySelector(element).textContent = `Заезд после ${dataCheckin}, выезд до ${dataCheckout}`;
  }
};

const fillAvatar = (cardElement, element, data) => {
  if (showConditions(data)) {
    hideElement(cardElement, element);
  } else {
    cardElement.querySelector(element).src = data;
  }
};

const offerTypeToName = {
  bungalow: `Бунгало`,
  flat: `Квартира`,
  house: `Дом`,
  palace: `Дворец`
};

const renderCard = (ad) => {
  let cardElement = cardTemplate.cloneNode(true);

  fillElement(cardElement, `.popup__title`, ad.offer.title);
  fillElement(cardElement, `.popup__text--address`, ad.offer.address);
  fillElement(cardElement, `.popup__text--price`, `${ad.offer.price}₽/ночь`);
  fillElement(cardElement, `.popup__type`, offerTypeToName[ad.offer.type]);
  fillCapacity(cardElement, `.popup__text--capacity`, ad.offer.rooms, ad.offer.guests);
  fillTime(cardElement, `.popup__text--time`, ad.offer.checkin, ad.offer.checkout);
  fillFeatures(cardElement, `.popup__features`, ad.offer.features);
  fillElement(cardElement, `.popup__description`, ad.offer.description);
  fillPhotos(cardElement, `.popup__photos`, ad.offer.photos);
  fillAvatar(cardElement, `.popup__avatar`, ad.author.avatar);

  return cardElement;
};

const insertRenderedCard = (cardNumber) => {
  const fragment = document.createDocumentFragment();
  const renderedCard = renderCard(window.page.getFiltredAds()[cardNumber]);

  fragment.appendChild(renderedCard);
  window.map.setFragmentPlace(fragment);

  return renderedCard;
};

const openAdCard = (evt) => {
  const {target} = evt;
  const targetParent = target.closest(`[type="button"]`);

  if (target && targetParent) {
    closeAdCard();

    const renderedAdCard = insertRenderedCard(Number(targetParent.dataset.pinId));

    window.map.toggleActivePinClass(targetParent);

    const adCardClose = renderedAdCard.querySelector(`.popup__close`);
    adCardClose.addEventListener(window.util.Evt.CLICK, closeAdCard);
  }
};

const closeAdCard = () => {
  const activePin = window.map.getActivePin();

  if (activePin) {
    const adCard = window.map.getActiveCard();

    window.map.toggleActivePinClass(activePin);
    adCard.remove();
  }
};

window.card = {
  openAdCard,
  closeAdCard
};
