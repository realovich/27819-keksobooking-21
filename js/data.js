'use strict';

(() => {
  const OFFER_TYPES = [`palace`, `flat`, `house`, `bungalow`];
  const OFFER_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const OFFER_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

  const getRandomArray = (array) => {
    let randomArrayElement;
    let randomArray = [];

    for (let i = 0; i < window.util.getRandomInteger(1, array.length); i++) {
      randomArrayElement = array[window.util.getRandomInteger(0, array.length - 1)];

      if (!randomArray.includes(randomArrayElement)) {
        randomArray.push(randomArrayElement);
      }
    }

    return randomArray;
  };

  const renderAdArray = (length) => {
    let array = [];

    for (let i = 0; i < length; i++) {
      let positionHorizontal = window.util.getRandomInteger(1, window.map.getWidth);
      let positionVertical = window.util.getRandomInteger(130, 630);

      array.push({
        'author': {
          'avatar': `img/avatars/user0${i + 1}.png`,
        },
        'offer': {
          'title': `Заголовок`,
          'address': `${positionHorizontal}, ${positionVertical}`,
          'price': window.util.getRandomInteger(1000, 100000),
          'type': OFFER_TYPES[window.util.getRandomInteger(0, OFFER_TYPES.length - 1)],
          'rooms': window.util.getRandomInteger(1, 9),
          'guests': window.util.getRandomInteger(1, 3),
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

  const renderedAdArray = renderAdArray(8);

  window.data = {
    getAds: renderedAdArray
  };
})();
