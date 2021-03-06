'use strict';

const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const FADED_CLASS = `map--faded`;
const PIN_CLASS = `map__pin`;
const ACTIVE_PIN_CLASS = `map__pin--active`;
const MAIN_PIN_CLASS = `map__pin--main`;

const MapLimit = {
  TOP: 130,
  BOTTOM: 630,
};

const mapElement = document.querySelector(`.map`);
const mainPin = mapElement.querySelector(`.${MAIN_PIN_CLASS}`);
const mainPinDefaultPositionLeft = mainPin.offsetLeft;
const mainPinDefaultPositionTop = mainPin.offsetTop;

const mainPinWidth = mainPin.offsetWidth;
const mainPinHeight = mainPin.offsetHeight;

const minLeftPosition = 0 - (mainPinWidth / 2);
const maxLeftPosition = mapElement.offsetWidth - (mainPinWidth / 2);
const minTopPosition = MapLimit.TOP - mainPinHeight;
const maxTopPosition = MapLimit.BOTTOM - mainPinHeight;

const pinsListElement = mapElement.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.${PIN_CLASS}`);

const renderPin = (ad, index) => {
  const pinElement = pinTemplate.cloneNode(true);
  const pinElementImage = pinElement.querySelector(`img`);

  pinElement.setAttribute(`style`, `left: ${ad.location.x - (PIN_WIDTH / 2)}px; top: ${ad.location.y - PIN_HEIGHT}px`);
  pinElement.dataset.pinId = index;
  pinElementImage.src = ad.author.avatar;
  pinElementImage.alt = ad.offer.title;

  return pinElement;
};

const renderPinsList = (ads) => {
  const existingPins = pinsListElement.querySelectorAll(`[type="button"]`);

  if (existingPins) {
    for (let existingPin of existingPins) {
      existingPin.remove();
    }
  }

  const fragment = document.createDocumentFragment();

  ads.forEach((ad, index) => fragment.appendChild(renderPin(ad, index)));

  pinsListElement.appendChild(fragment);
};

const movePin = (evt) => {
  let startCoordinates = {
    x: evt.clientX,
    y: evt.clientY
  };

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    const shift = {
      x: startCoordinates.x - moveEvt.clientX,
      y: startCoordinates.y - moveEvt.clientY
    };

    startCoordinates = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    const newPositionX = mainPin.offsetLeft - shift.x;
    const newPositionY = mainPin.offsetTop - shift.y;

    mainPin.style.left = `${Math.max(Math.min(newPositionX, maxLeftPosition), minLeftPosition)}px`;
    mainPin.style.top = `${Math.max(Math.min(newPositionY, maxTopPosition), minTopPosition)}px`;

    window.form.setCustomAddress();
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(window.util.Evt.MOUSEMOVE, onMouseMove);
    document.removeEventListener(window.util.Evt.MOUSEUP, onMouseUp);
  };

  document.addEventListener(window.util.Evt.MOUSEMOVE, onMouseMove);
  document.addEventListener(window.util.Evt.MOUSEUP, onMouseUp);
};

let isPageActive;

const onMainMouseBtn = (evt) => {
  if (evt.button === 0) {
    evt.preventDefault();

    if (!isPageActive) {
      window.page.activatePage();
      isPageActive = true;
    }

    movePin(evt);
  }
};

const onEnterKey = (evt) => {
  if (evt.key === window.util.Key.ENTER && !isPageActive) {
    evt.preventDefault();
    window.page.activatePage();

    isPageActive = true;
  }
};

const resetPinPosition = () => {
  mainPin.style.left = `${mainPinDefaultPositionLeft}px`;
  mainPin.style.top = `${mainPinDefaultPositionTop}px`;
  isPageActive = false;
};

const addListenersForActivatePage = () => {
  mainPin.addEventListener(window.util.Evt.MOUSEDOWN, onMainMouseBtn);

  mainPin.addEventListener(window.util.Evt.KEYDOWN, onEnterKey);
};

const removeListenersForActivatePage = () => {
  mainPin.removeEventListener(window.util.Evt.MOUSEDOWN, onMainMouseBtn);

  mainPin.removeEventListener(window.util.Evt.KEYDOWN, onEnterKey);
};

const setFragmentPlace = (fragment) => {
  mapElement.insertBefore(fragment, mapElement.querySelector(`.map__filters-container`));
};

const getPinCoordinates = (isDefault) => {
  const offsetY = isDefault ? Math.round(mainPinHeight / 2) : mainPinHeight;

  return `${parseInt(mainPin.style.left, 10) + Math.round(mainPinWidth / 2)}, ${parseInt(mainPin.style.top, 10) + offsetY}`;
};

const removePins = () => {
  const pins = mapElement.querySelectorAll(`.${PIN_CLASS}`);

  for (let i = 1; i < pins.length; i++) {
    pins[i].remove();
  }
};

document.addEventListener(window.util.Evt.KEYDOWN, (evt) => {
  if (evt.key === window.util.Key.ESCAPE) {
    evt.preventDefault();
    window.card.closeAdCard();
  }
});

pinsListElement.addEventListener(window.util.Evt.CLICK, window.card.openAdCard);

window.map = {
  renderPinsList,
  getPinCoordinates,
  addFadedClass: () => mapElement.classList.add(FADED_CLASS),
  removeFadedClass: () => mapElement.classList.remove(FADED_CLASS),
  getActiveCard: () => mapElement.querySelector(`.map__card`),
  getActivePin: () => mapElement.querySelector(`.${ACTIVE_PIN_CLASS}`),
  toggleActivePinClass: (element) => element.classList.toggle(ACTIVE_PIN_CLASS),
  addListenersForActivatePage,
  removeListenersForActivatePage,
  setFragmentPlace,
  resetPinPosition,
  removePins
};
