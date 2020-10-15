'use strict';

(() => {
  const Event = {
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

  const renderErrorMessage = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `position: absoluet; left: 0; right: 0; background-color: tomato; padding: 4px; text-align: center;`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.util = {
    getRandomInteger,
    declinationOfNumber,
    renderErrorMessage,
    Event
  };
})();
