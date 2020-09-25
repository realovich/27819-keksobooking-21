'use strict';

const mapElement = document.querySelector(`.map`);
const mapWidth = mapElement.offsetWidth;

const pinsListElement = mapElement.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const offerTypes = [`palace`, `flat`, `house`, `bungalow`];
const offerFeatures = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const renderAdArray = (length) => {
  const array = new Array(length);

  for (let i = 0; i < length; i++) {
    array[i] = {
      'author': {
        'avatar': `0${i + 1}`
      },
      'offer': {
        'title': `Заголовок`,
        'address': `600, 350`,
        'price': getRandomInteger(1000, 100000),
        'type': offerTypes[getRandomInteger(0, offerTypes.length)],
        'rooms': getRandomInteger(1, 4),
        'guests': getRandomInteger(0, 3),
        'checkin': `12:00`,
        'checkout': `13:00`,
        'features': offerFeatures,
        'description': `Описание объявления`,
        'photos': [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`],
      },
      'location': {
        'x': getRandomInteger(1, mapWidth),
        'y': getRandomInteger(130, 630)
      }
    };
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

  return pinsListElement.appendChild(fragment);
};

mapElement.classList.remove(`map--faded`);

renderPinsList();
