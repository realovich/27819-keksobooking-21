'use strict';

(() => {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const ACTIVE_PIN_CLASS = `map__pin--active`;
  const FADED_CLASS = `map--faded`;

  const Keys = {
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

  const renderPinsList = () => {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < window.data.renderedAdArray.length; i++) {
      fragment.appendChild(renderPin(window.data.renderedAdArray[i], i));
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
      adCardClose.addEventListener(window.util.Events.CLICK, closeAdCard);
    }
  };

  const addListenersForActivatePage = () => {
    mainPin.addEventListener(window.util.Events.MOUSEDOWN, (evt) => {
      if (evt.button === 0) {
        window.form.activatePage();
      }
    });

    mainPin.addEventListener(window.util.Events.KEYDOWN, (evt) => {
      if (evt.key === Keys.ENTER) {
        evt.preventDefault();
        window.form.activatePage();
      }
    });
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

  document.addEventListener(window.util.Events.KEYDOWN, (evt) => {
    if (evt.key === Keys.ESCAPE) {
      evt.preventDefault();
      closeAdCard();
    }
  });

  pinsListElement.addEventListener(window.util.Events.CLICK, openAdCard);

  window.map = {
    renderPinsList,
    getPinCoordinates,
    addFadedClass: () => mapElement.classList.add(FADED_CLASS),
    removeFadedClass: () => mapElement.classList.remove(FADED_CLASS),
    addListenersForActivatePage,
    setFragmentPlace,
    width: mapElement.offsetWidth
  };
})();
