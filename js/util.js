'use strict';

(() => {
  const Events = {
    CLICK: `click`,
    KEYDOWN: `keydown`,
    MOUSEDOWN: `mousedown`,
    MOUSEUP: `mouseup`,
    CHANGE: `change`
  };

  const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

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

  window.util = {
    getRandomInteger,
    declinationOfNumber,
    Events
  };
})();
