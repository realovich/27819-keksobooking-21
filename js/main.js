'use strict';

const OFFER_TYPES = [`palace`, `flat`, `house`, `bungalow`];
const OFFER_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const OFFER_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;

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
        'avatar': `img/avatars/user0${i + 1}.png`,
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

const renderPin = (ad, index) => {
  let pinElement = pinTemplate.cloneNode(true);
  let pinElementImage = pinElement.querySelector(`img`);

  pinElement.setAttribute(`style`, `left: ${ad.location.x - (PIN_WIDTH / 2)}px; top: ${ad.location.y - PIN_HEIGHT}px`);
  pinElement.dataset.pinId = index;
  pinElementImage.src = ad.author.avatar;
  pinElementImage.alt = ad.offer.title;

  return pinElement;
};

const renderPinsList = () => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < ads.length; i++) {
    fragment.appendChild(renderPin(ads[i], i));
  }

  pinsListElement.appendChild(fragment);
};

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
    cardElement.querySelector(element).src = data;
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

const insertRenderedCard = (cardNumber) => {
  const fragment = document.createDocumentFragment();

  fragment.appendChild(renderCard(ads[cardNumber]));

  mapElement.insertBefore(fragment, mapElement.querySelector(`.map__filters-container`));
};

const filterForm = document.querySelector(`.map__filters`);
const adForm = document.querySelector(`.ad-form`);
const filterFormControls = filterForm.children;
const adFormControls = adForm.children;
const mainPin = mapElement.querySelector(`.map__pin--main`);
const fieldAddress = adForm.querySelector(`#address`);
const fieldRoomNumber = adForm.querySelector(`#room_number`);
const fieldCapacity = adForm.querySelector(`#capacity`);
const fieldType = adForm.querySelector(`#type`);
const fieldPrice = adForm.querySelector(`#price`);
const fieldTimeIn = adForm.querySelector(`#timein`);
const fieldTimeOut = adForm.querySelector(`#timeout`);

const setDefaultAddress = () => {
  const horizontalPosition = parseInt(mainPin.style.left, 10) + Math.round(mainPin.offsetWidth / 2);
  const verticalPosition = parseInt(mainPin.style.top, 10) + Math.round(mainPin.offsetHeight / 2);

  fieldAddress.value = `${horizontalPosition}, ${verticalPosition}`;
};

const setCustomAddress = () => {
  const horizontalPosition = parseInt(mainPin.style.left, 10) + Math.round(PIN_WIDTH / 2);
  const verticalPosition = parseInt(mainPin.style.top, 10) + PIN_HEIGHT;

  fieldAddress.value = `${horizontalPosition}, ${verticalPosition}`;
};

const disableControls = (controls) => {
  for (let i = 0; i < controls.length; i++) {
    controls[i].setAttribute(`disabled`, ``);
  }
};

const enableControls = (controls) => {
  for (let i = 0; i < controls.length; i++) {
    controls[i].removeAttribute(`disabled`, ``);
  }
};

const deactivatePage = () => {
  mapElement.classList.add(`map--faded`);
  disableControls(filterFormControls);
  disableControls(adFormControls);
  setDefaultAddress();
};

const activatePage = () => {
  mapElement.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  enableControls(filterFormControls);
  enableControls(adFormControls);
  renderPinsList();
  setCustomAddress();
  addChangeListener(adForm, (evt) => addFormValidation(evt));
};

const addChangeListener = (element, cb) => {
  element.addEventListener(`change`, cb);
};

const addFormValidation = (evt) => {
  if (evt.target) {
    if (evt.target.matches(`#timein`)) {
      fieldTimeOut.value = fieldTimeIn.value;
    } else if (evt.target.matches(`#timeout`)) {
      fieldTimeIn.value = fieldTimeOut.value;
    } else if (evt.target.matches(`#room_number`) || evt.target.matches(`#capacity`)) {
      synchronizeCapacityRoomNumbersFields();
    } else if (evt.target.matches(`#type`)) {
      synchronizeTypePriceFields();
    }
  }
};

const synchronizeCapacityRoomNumbersFields = () => {
  if (fieldRoomNumber.value === `1` && fieldCapacity.value !== `1`) {
    fieldCapacity.setCustomValidity(`1 комната для 1-го гостя`);
  } else if (fieldRoomNumber.value === `2` && (fieldCapacity.value > 2 || fieldCapacity.value === `0`)) {
    fieldCapacity.setCustomValidity(`2 комнаты для 1-го или 2-х гостей`);
  } else if (fieldRoomNumber.value === `3` && fieldCapacity.value < 1) {
    fieldCapacity.setCustomValidity(`3 комнаты для 1-го, 2-х или 3-х гостей`);
  } else if (fieldRoomNumber.value > 3 && fieldCapacity.value !== `0`) {
    fieldCapacity.setCustomValidity(`100 комнат не для гостей`);
  } else {
    fieldCapacity.setCustomValidity(``);
  }
};

const synchronizeTypePriceFields = () => {
  let minPrice;

  switch (fieldType.value) {
    case `bungalow`:
      minPrice = 0;
      break;
    case `flat`:
      minPrice = 1000;
      break;
    case `house`:
      minPrice = 5000;
      break;
    case `palace`:
      minPrice = 10000;
      break;
  }

  fieldPrice.setAttribute(`placeholder`, minPrice);
  fieldPrice.setAttribute(`min`, minPrice);
};

mainPin.addEventListener(`mousedown`, (evt) => {
  if (evt.button === 0) {
    activatePage();
  }
});

mainPin.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    activatePage();
  }
});

deactivatePage();

const addClickListener = (element, cb) => {
  element.addEventListener(`click`, cb);
};

const removeClickListener = (element, cb) => {
  element.removeEventListener(`click`, cb);
};

const addKeyDownListener = (element, cb) => {
  element.addEventListener(`keydown`, cb);
};

const setEscapeEvent = (evt, action) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    action();
  }
};

const openAdCard = (evt) => {
  const {target} = evt;
  const targetParent = target.closest(`[type="button"]`);

  if (target && targetParent) {
    insertRenderedCard(Number(targetParent.dataset.pinId));
    targetParent.classList.add(`map__pin--active`);

    const adCard = document.querySelector(`.popup`);
    const adCardClose = adCard.querySelector(`.popup__close`);

    const closeAdCard = () => {
      adCard.remove();
      targetParent.classList.remove(`map__pin--active`);
      addClickListener(pinsListElement, openAdCard);
    };

    addClickListener(adCardClose, closeAdCard);

    addKeyDownListener(document, (keyEvt) => {
      setEscapeEvent(keyEvt, closeAdCard);
    });

    removeClickListener(pinsListElement, openAdCard);
  }
};

addClickListener(pinsListElement, openAdCard);
