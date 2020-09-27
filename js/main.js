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
  let positionHorizontal;
  let positionVertical;

  for (let i = 0; i < length; i++) {
    positionHorizontal = getRandomInteger(1, mapWidth);
    positionVertical = getRandomInteger(130, 630);

    array.push({
      'author': {
        'avatar': `0${i + 1}`,
      },
      'offer': {
        'title': `Заголовок`,
        'address': `${positionHorizontal}, ${positionVertical}`,
        'price': getRandomInteger(1000, 100000),
        'type': OFFER_TYPES[getRandomInteger(0, OFFER_TYPES.length - 1)],
        'rooms': getRandomInteger(1, 3),
        'guests': getRandomInteger(0, 3),
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
