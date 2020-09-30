'use strict';

const OFFER_TYPES = [`palace`, `flat`, `house`, `bungalow`];
const OFFER_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const OFFER_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const mapElement = document.querySelector(`.map`);
const mapWidth = mapElement.offsetWidth;

const pinsListElement = mapElement.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const getRandomArray = (array) => {
  let randomArrayElement;
  let randomArray = [];

  for (let i = 0; i < getRandomInteger(1, array.length); i++) {
    randomArrayElement = array[getRandomInteger(0, array.length - 1)];

    if (!randomArray.includes(randomArrayElement)) {
      randomArray.push(randomArrayElement);
    }
  }

  return randomArray;
};

const renderAdArray = (length) => {
  let array = [];

  for (let i = 0; i < length; i++) {
    let positionHorizontal = getRandomInteger(1, mapWidth);
    let positionVertical = getRandomInteger(130, 630);

    array.push({
      'author': {
        'avatar': `0${i + 1}`,
      },
      'offer': {
        'title': `Заголовок`,
        'address': `${positionHorizontal}, ${positionVertical}`,
        'price': getRandomInteger(1000, 100000),
        'type': OFFER_TYPES[getRandomInteger(0, OFFER_TYPES.length - 1)],
        'rooms': getRandomInteger(1, 9),
        'guests': getRandomInteger(1, 3),
        'checkin': `12:00`,
        'checkout': `13:00`,
        'features': getRandomArray(OFFER_FEATURES),
        'description': `Описание объявления`,
        'photos': getRandomArray(OFFER_PHOTOS),
      },
      'location': {
        'x': positionHorizontal,
        'y': positionVertical,
      }
    });
  }

  return array;
};

const ads = renderAdArray(8);

const renderPin = (ad) => {
  let pinElement = pinTemplate.cloneNode(true);
  let pinElementImage = pinElement.querySelector(`img`);
  const pinWidth = 50;
  const pinHeight = 70;

  pinElement.setAttribute(`style`, `left: ${ad.location.x - (pinWidth / 2)}px; top: ${ad.location.y - pinHeight}px`);
  pinElementImage.src = `img/avatars/user${ad.author.avatar}.png`;
  pinElementImage.alt = ad.offer.title;

  return pinElement;
};

const renderPinsList = () => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < ads.length; i++) {
    fragment.appendChild(renderPin(ads[i]));
  }

  pinsListElement.appendChild(fragment);
};

mapElement.classList.remove(`map--faded`);

renderPinsList();

const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

const showConditions = (data) => (data === null || data === undefined || data === ``);

const hideElement = (cardElement, element) => {
  cardElement.querySelector(element).classList.add(`hidden`);
};

const declinationOfNumber = (number, words) => {
  number = Math.abs(number) % 100;

  if (number > 10 && number < 20) {
    return words[2];
  } else if (number % 10 > 1 && number % 10 < 5) {
    return words[1];
  } else if (number % 10 === 1) {
    return words[0];
  }

  return words[2];
};

const fillElement = (cardElement, element, data) => {
  if (showConditions(data)) {
    hideElement(cardElement, element);
  } else {
    cardElement.querySelector(element).textContent = data;
  }
};

const fillPrice = (cardElement, element, data) => {
  if (showConditions(data)) {
    hideElement(cardElement, element);
  } else {
    cardElement.querySelector(element).textContent = `${data}₽/ночь`;
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
    cardElement.querySelector(element).textContent = `${dataRooms} ${declinationOfNumber(dataRooms, [`комната`, `комнаты`, `комнат`])} для ${dataGuests} ${declinationOfNumber(dataGuests, [`гостя`, `гостей`, `гостей`])}`;
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
    cardElement.querySelector(element).src = `img/avatars/user${data}.png`;
  }
};

const renderCard = (ad) => {
  let cardElement = cardTemplate.cloneNode(true);

  let offerType;

  switch (ad.offer.type) {
    case `flat`:
      offerType = `Квартира`;
      break;
    case `bungalow`:
      offerType = `Бунгало`;
      break;
    case `house`:
      offerType = `Дом`;
      break;
    case `palace`:
      offerType = `Дворец`;
      break;
  }

  fillElement(cardElement, `.popup__title`, ad.offer.title);
  fillElement(cardElement, `.popup__text--address`, ad.offer.address);
  fillPrice(cardElement, `.popup__text--price`, ad.offer.price);
  fillElement(cardElement, `.popup__type`, offerType);
  fillCapacity(cardElement, `.popup__text--capacity`, ad.offer.rooms, ad.offer.guests);
  fillTime(cardElement, `.popup__text--time`, ad.offer.checkin, ad.offer.checkout);
  fillFeatures(cardElement, `.popup__features`, ad.offer.features);
  fillElement(cardElement, `.popup__description`, ad.offer.description);
  fillPhotos(cardElement, `.popup__photos`, ad.offer.photos);
  fillAvatar(cardElement, `.popup__avatar`, ad.author.avatar);

  return cardElement;
};

const insertRenderedCard = () => {
  const fragment = document.createDocumentFragment();

  fragment.appendChild(renderCard(ads[0]));

  mapElement.insertBefore(fragment, mapElement.querySelector(`.map__filters-container`));
};

insertRenderedCard();
