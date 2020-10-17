'use strict';

(() => {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const MAX_NUMBER_ADS = 5;
  const ACTIVE_PIN_CLASS = `map__pin--active`;
  const FADED_CLASS = `map--faded`;

  const Key = {
    ESCAPE: `Escape`,
    ENTER: `Enter`
  };

  const mapElement = document.querySelector(`.map`);
  const mainPin = mapElement.querySelector(`.map__pin--main`);

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
    const getQuantity = ads.length > MAX_NUMBER_ADS ? MAX_NUMBER_ADS : ads.length;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < getQuantity; i++) {
      if (ads[i].offer) {
        fragment.appendChild(renderPin(ads[i], i));
      }
    }

    pinsListElement.appendChild(fragment);
  };

  const closeAdCard = () => {
    const activePin = mapElement.querySelector(`.${ACTIVE_PIN_CLASS}`);

    if (activePin) {
      const adCard = mapElement.querySelector(`.map__card`);

      activePin.classList.remove(ACTIVE_PIN_CLASS);
      adCard.remove();
    }
  };

  const openAdCard = (evt) => {
    const {target} = evt;
    const targetParent = target.closest(`[type="button"]`);

    if (target && targetParent) {
      closeAdCard();

      const renderedAdCard = window.card.insertRenderedCard(Number(targetParent.dataset.pinId));

      targetParent.classList.add(ACTIVE_PIN_CLASS);

      const adCardClose = renderedAdCard.querySelector(`.popup__close`);
      adCardClose.addEventListener(window.util.Event.CLICK, closeAdCard);
    }
  };

  const onMainMouseBtn = (evt) => {
    if (evt.button === 0) {
      window.form.activatePage();
    }
  };

  const onEnterKey = (evt) => {
    if (evt.key === Key.ENTER) {
      evt.preventDefault();
      window.form.activatePage();
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
    if (isDefault) {
      return `${parseInt(mainPin.style.left, 10) + Math.round(mainPin.offsetWidth / 2)}, ${parseInt(mainPin.style.top, 10) + Math.round(mainPin.offsetHeight / 2)}`;
    }

    return `${parseInt(mainPin.style.left, 10) + Math.round(PIN_WIDTH / 2)}, ${parseInt(mainPin.style.top, 10) + PIN_HEIGHT}`;
  };

  document.addEventListener(window.util.Event.KEYDOWN, (evt) => {
    if (evt.key === Key.ESCAPE) {
      evt.preventDefault();
      closeAdCard();
    }
  });

  pinsListElement.addEventListener(window.util.Event.CLICK, openAdCard);

  window.map = {
    renderPinsList,
    getPinCoordinates,
    addFadedClass: () => mapElement.classList.add(FADED_CLASS),
    removeFadedClass: () => mapElement.classList.remove(FADED_CLASS),
    addListenersForActivatePage,
    removeListenersForActivatePage,
    setFragmentPlace,
    width: mapElement.offsetWidth
  };
})();
