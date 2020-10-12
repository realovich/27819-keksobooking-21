'use strict';

(() => {
  const Events = {
    CLICK: `click`,
    KEYDOWN: `keydown`,
    MOUSEDOWN: `mousedown`,
    MOUSEUP: `mouseup`,
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

  const setEscapeEvent = (evt, action) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      action();
    }
  };

  const setMainMouseButtonEvent = (evt, action) => {
    if (evt.button === 0) {
      action();
    }
  };

  const setEnterEvent = (evt, action) => {
    if (evt.key === `Enter`) {
      evt.preventDefault();
      action();
    }
  };

  window.util = {
    getRandomInteger,
    declinationOfNumber,
    setEscapeEvent,
    setEnterEvent,
    setMainMouseButtonEvent,
    Events,
  };
})();
