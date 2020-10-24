'use strict';

(() => {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const MAX_NUMBER_ADS = 5;
  const FADED_CLASS = `map--faded`;
  const ACTIVE_PIN_CLASS = `map__pin--active`;

  const MapLimit = {
    TOP: 130,
    BOTTOM: 630,
  };

  const Key = {
    ESCAPE: `Escape`,
    ENTER: `Enter`
  };

  const mapElement = document.querySelector(`.map`);
  const mainPin = mapElement.querySelector(`.map__pin--main`);

  const mainPinWidth = mainPin.offsetWidth;
  const mainPinHeight = mainPin.offsetHeight;

  const pinsListElement = mapElement.querySelector(`.map__pins`);
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

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

    const quantity = Math.min(ads.length, MAX_NUMBER_ADS);
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < quantity; i++) {
      fragment.appendChild(renderPin(ads[i], i));
    }

    pinsListElement.appendChild(fragment);
  };

  const movePin = (evt) => {
    let startСoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      const shift = {
        x: startСoordinates.x - moveEvt.clientX,
        y: startСoordinates.y - moveEvt.clientY
      };

      startСoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      const newPositionX = mainPin.offsetLeft - shift.x;
      const newPositionY = mainPin.offsetTop - shift.y;

      const minLeftPosition = 0 - (mainPinWidth / 2);
      const maxLeftPosition = mapElement.offsetWidth - (mainPinWidth / 2);
      const minTopPosition = MapLimit.TOP - mainPinHeight;
      const maxTopPosition = MapLimit.BOTTOM - mainPinHeight;

      mainPin.style.left = `${Math.max(Math.min(newPositionX, maxLeftPosition), minLeftPosition)}px`;
      mainPin.style.top = `${Math.max(Math.min(newPositionY, maxTopPosition), minTopPosition)}px`;

      window.form.setCustomAddress();
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(window.util.Event.MOUSEMOVE, onMouseMove);
      document.removeEventListener(window.util.Event.MOUSEUP, onMouseUp);
    };

    document.addEventListener(window.util.Event.MOUSEMOVE, onMouseMove);
    document.addEventListener(window.util.Event.MOUSEUP, onMouseUp);
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
    if (evt.key === Key.ENTER && !isPageActive) {
      evt.preventDefault();
      window.page.activatePage();

      isPageActive = true;
    }
  };

  const addListenersForActivatePage = () => {
    mainPin.addEventListener(window.util.Event.MOUSEDOWN, onMainMouseBtn);

    mainPin.addEventListener(window.util.Event.KEYDOWN, onEnterKey);
  };

  const removeListenersForActivatePage = () => {
    mainPin.removeEventListener(window.util.Event.MOUSEDOWN, onMainMouseBtn);

    mainPin.removeEventListener(window.util.Event.KEYDOWN, onEnterKey);
  };

  const setFragmentPlace = (fragment) => {
    mapElement.insertBefore(fragment, mapElement.querySelector(`.map__filters-container`));
  };

  const getPinCoordinates = (isDefault) => {
    const offsetY = isDefault ? Math.round(mainPinHeight / 2) : mainPinHeight;

    return `${parseInt(mainPin.style.left, 10) + Math.round(mainPinWidth / 2)}, ${parseInt(mainPin.style.top, 10) + offsetY}`;
  };

  document.addEventListener(window.util.Event.KEYDOWN, (evt) => {
    if (evt.key === Key.ESCAPE) {
      evt.preventDefault();
      window.card.closeAdCard();
    }
  });

  pinsListElement.addEventListener(window.util.Event.CLICK, window.card.openAdCard);

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
    setFragmentPlace
  };
})();
