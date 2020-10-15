'use strict';

(() => {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const showConditions = (data) => (data === null || data === undefined || data === ``);

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
      cardElement.querySelector(element).textContent = `${dataRooms} ${window.util.declinationOfNumber(dataRooms, [`комната`, `комнаты`, `комнат`])} для ${dataGuests} ${window.util.declinationOfNumber(dataGuests, [`гостя`, `гостей`, `гостей`])}`;
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

    const offerTypeToName = {
      bungalow: `Бунгало`,
      flat: `Квартира`,
      house: `Дом`,
      palace: `Дворец`
    };

    fillElement(cardElement, `.popup__title`, ad.offer.title);
    fillElement(cardElement, `.popup__text--address`, ad.offer.address);
    fillPrice(cardElement, `.popup__text--price`, ad.offer.price);
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
    const renderedCard = renderCard(window.form.getSavedAds()[cardNumber]);

    fragment.appendChild(renderedCard);
    window.map.setFragmentPlace(fragment);

    return renderedCard;
  };

  window.card = {
    insertRenderedCard
  };
})();
