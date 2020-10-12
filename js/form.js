'use strict';

(() => {
  const CHANGE_EVENT = `change`;
  const filterForm = document.querySelector(`.map__filters`);
  const adForm = document.querySelector(`.ad-form`);
  const filterControls = filterForm.children;
  const adControls = adForm.children;
  const fieldAddress = adForm.querySelector(`#address`);
  const fieldRoomNumber = adForm.querySelector(`#room_number`);
  const fieldCapacity = adForm.querySelector(`#capacity`);
  const fieldType = adForm.querySelector(`#type`);
  const fieldPrice = adForm.querySelector(`#price`);
  const fieldTimeIn = adForm.querySelector(`#timein`);
  const fieldTimeOut = adForm.querySelector(`#timeout`);

  const setDefaultAddress = () => {
    fieldAddress.value = `${window.map.getPinDefaultHorizontal()}, ${window.map.getPinDefaultVertical()}`;
  };

  const setCustomAddress = () => {
    fieldAddress.value = `${window.map.getPinCustomHorizontal()}, ${window.map.getPinCustomVertical()}`;
  };

  const disableControls = (controls) => {
    for (let i = 0; i < controls.length; i++) {
      controls[i].setAttribute(`disabled`, ``);
    }
  };

  const enableControls = (controls) => {
    for (let i = 0; i < controls.length; i++) {
      controls[i].removeAttribute(`disabled`, ``);
    }
  };

  const addFormValidation = (evt) => {
    const {target} = evt;

    if (!target) {
      return;
    }

    if (target.matches(`#timein`)) {
      fieldTimeOut.value = fieldTimeIn.value;
    } else if (target.matches(`#timeout`)) {
      fieldTimeIn.value = fieldTimeOut.value;
    } else if (target.matches(`#room_number`) || target.matches(`#capacity`)) {
      synchronizeCapacityRoomNumbersFields();
    } else if (target.matches(`#type`)) {
      synchronizeTypePriceFields();
    }
  };

  const synchronizeCapacityRoomNumbersFields = () => {
    if (fieldRoomNumber.value === `1` && fieldCapacity.value !== `1`) {
      fieldCapacity.setCustomValidity(`1 комната для 1-го гостя`);
    } else if (fieldRoomNumber.value === `2` && (fieldCapacity.value > 2 || fieldCapacity.value === `0`)) {
      fieldCapacity.setCustomValidity(`2 комнаты для 1-го или 2-х гостей`);
    } else if (fieldRoomNumber.value === `3` && fieldCapacity.value < 1) {
      fieldCapacity.setCustomValidity(`3 комнаты для 1-го, 2-х или 3-х гостей`);
    } else if (fieldRoomNumber.value > 3 && fieldCapacity.value !== `0`) {
      fieldCapacity.setCustomValidity(`100 комнат не для гостей`);
    } else {
      fieldCapacity.setCustomValidity(``);
    }
  };

  const synchronizeTypePriceFields = () => {
    const fieldTypeValue = fieldType.value;

    const minPriceType = {
      bungalow: 0,
      flat: 1000,
      house: 5000,
      palace: 10000
    };

    fieldPrice.setAttribute(`placeholder`, minPriceType[fieldTypeValue]);
    fieldPrice.setAttribute(`min`, minPriceType[fieldTypeValue]);
  };

  const activatePage = () => {
    window.map.removeFadedClass();
    adForm.classList.remove(`ad-form--disabled`);
    enableControls(filterControls);
    enableControls(adControls);
    window.map.renderPinsList();
    setCustomAddress();
    adForm.addEventListener(CHANGE_EVENT, (evt) => window.form.addFormValidation(evt));
  };

  const deactivatePage = () => {
    window.map.addFadedClass();
    disableControls(filterControls);
    disableControls(adControls);
    setDefaultAddress();
  };

  window.form = {
    addFormValidation,
    deactivatePage,
    activatePage
  };
})();
