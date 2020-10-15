'use strict';

(() => {
  const REQUEST_TIMEOUT = 1000;

  const RequestUrl = {
    LOAD: `https://21.javascript.pages.academy/keksobooking/data`
  };

  const StatusCode = {
    OK: 200
  };

  const Method = {
    GET: `GET`,
    POST: `POST`
  };

  const executeRequest = (method, {url, onLoad, onError, data}) => {
    const xhr = new XMLHttpRequest();

    if (method === Method.GET) {
      xhr.responseType = `json`;
    }

    xhr.open(method, url);
    xhr.timeout = REQUEST_TIMEOUT;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.send(data);
  };

  const load = (onLoad, onError) => {
    executeRequest(Method.GET, {
      url: RequestUrl.LOAD,
      onLoad,
      onError
    });
  };

  const save = (data, onLoad, onError) => {
    executeRequest(Method.POST, {
      url: RequestUrl.SAVE,
      onLoad,
      onError,
      data
    });
  };

  window.backend = {
    load,
    save
  };
})();
