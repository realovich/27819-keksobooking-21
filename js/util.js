'use strict';

(() => {
  const mainElement = document.querySelector(`main`);
  const errorMessageTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const successMessageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);

  const Event = {
    CLICK: `click`,
    KEYDOWN: `keydown`,
    MOUSEDOWN: `mousedown`,
    MOUSEMOVE: `mousemove`,
    MOUSEUP: `mouseup`,
    CHANGE: `change`,
    SUBMIT: `submit`
  };

  const Key = {
    ESCAPE: `Escape`,
    ENTER: `Enter`
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

  const renderErrorMessage = (message) => {
    const node = document.createElement(`div`);
    node.style = `position: absoluet; left: 0; right: 0; background-color: tomato; padding: 4px; text-align: center;`;

    node.textContent = message;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  let messageElement;

  const removeMessage = () => {
    messageElement.remove();
  };

  const onClick = (evt) => {
    evt.preventDefault();
    removeMessage();
    removeListenersForMessage();
  };

  const onEscapeKeydown = (evt) => {
    if (evt.key === Key.ESCAPE) {
      evt.preventDefault();
      removeMessage();
      removeListenersForMessage();
    }
  };

  const addListenersForMessage = () => {
    document.addEventListener(Event.CLICK, onClick);
    document.addEventListener(Event.KEYDOWN, onEscapeKeydown);
  };

  const removeListenersForMessage = () => {
    document.removeEventListener(Event.CLICK, onClick);
    document.removeEventListener(Event.KEYDOWN, onEscapeKeydown);
  };

  const showMessage = (type) => {
    switch (type) {
      case `success`:
        messageElement = successMessageTemplate.cloneNode(true);
        break;
      case `error`:
        messageElement = errorMessageTemplate.cloneNode(true);
        break;
      default:
        break;
    }

    mainElement.appendChild(messageElement);

    addListenersForMessage();
  };

  window.util = {
    declinationOfNumber,
    renderErrorMessage,
    showMessage,
    Event,
    Key
  };
})();
