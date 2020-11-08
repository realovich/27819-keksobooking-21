'use strict';

const FIELD_AVATAR_ID = `#avatar`;
const FIELD_IMAGES_ID = `#images`;
const FIELD_ADDRESS_ID = `#address`;
const FIELD_ROOM_NUMBER_ID = `#room_number`;
const FIELD_CAPACITY_ID = `#capacity`;
const FIELD_TYPE_ID = `#type`;
const FIELD_PRICE_ID = `#price`;
const FIELD_TIMEIN_ID = `#timein`;
const FIELD_TIMEOUT_ID = `#timeout`;
const AD_FORM_DISABLED_CLASS = `ad-form--disabled`;

const ControlAtributte = {
  DISABLED: `disabled`,
  MIN: `min`,
  PLACEHOLDER: `placeholder`
};

const adForm = document.querySelector(`.ad-form`);
const resetButton = adForm.querySelector(`.ad-form__reset`);
const fieldAddress = adForm.querySelector(FIELD_ADDRESS_ID);
const fieldRoomNumber = adForm.querySelector(FIELD_ROOM_NUMBER_ID);
const fieldCapacity = adForm.querySelector(FIELD_CAPACITY_ID);
const fieldType = adForm.querySelector(FIELD_TYPE_ID);
const fieldPrice = adForm.querySelector(FIELD_PRICE_ID);
const fieldTimeIn = adForm.querySelector(FIELD_TIMEIN_ID);
const fieldTimeOut = adForm.querySelector(FIELD_TIMEOUT_ID);

const setDefaultAddress = () => {
  fieldAddress.value = window.map.getPinCoordinates(true);
};

const setCustomAddress = () => {
  fieldAddress.value = window.map.getPinCoordinates();
};

const disableControls = (controls) => {
  for (let i = 0; i < controls.length; i++) {
    controls[i].setAttribute(ControlAtributte.DISABLED, ``);
  }
};

const enableControls = (controls) => {
  for (let i = 0; i < controls.length; i++) {
    controls[i].removeAttribute(ControlAtributte.DISABLED, ``);
  }
};

const addFormValidation = (evt) => {
  const {target} = evt;

  if (!target) {
    return;
  }

  if (target.matches(FIELD_TIMEIN_ID)) {
    fieldTimeOut.value = fieldTimeIn.value;
  } else if (target.matches(FIELD_TIMEOUT_ID)) {
    fieldTimeIn.value = fieldTimeOut.value;
  } else if (target.matches(FIELD_ROOM_NUMBER_ID) || target.matches(FIELD_CAPACITY_ID)) {
    synchronizeCapacityRoomNumbersFields();
  } else if (target.matches(FIELD_TYPE_ID)) {
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

  const typeToMinPrice = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  fieldPrice.setAttribute(ControlAtributte.PLACEHOLDER, typeToMinPrice[fieldTypeValue]);
  fieldPrice.setAttribute(ControlAtributte.MIN, typeToMinPrice[fieldTypeValue]);
};

const successHandler = () => {
  window.page.resetPage();
  window.util.showMessage(`success`);
};

const errorHandler = () => {
  window.util.showMessage(`error`);
};

adForm.addEventListener(window.util.Evt.SUBMIT, (evt) => {
  const formData = new FormData(adForm);

  evt.preventDefault();
  window.backend.save(formData, successHandler, errorHandler);
});

resetButton.addEventListener(window.util.Evt.CLICK, (evt) => {
  evt.preventDefault();
  window.page.resetPage();
});

const addDisabledClass = () => adForm.classList.add(AD_FORM_DISABLED_CLASS);
const removeDisabledClass = () => adForm.classList.remove(AD_FORM_DISABLED_CLASS);

const resetForm = () => {
  adForm.reset();
  synchronizeTypePriceFields();
  setCustomAddress();
  addDisabledClass();
};

const previewAvatar = adForm.querySelector(`.ad-form-header__preview`);
const previewPhoto = adForm.querySelector(`.ad-form__photo`);

const addChangeListener = () => {
  adForm.addEventListener(window.util.Evt.CHANGE, (evt) => {
    addFormValidation(evt);
    const {target} = evt;

    if (!target) {
      return;
    }

    if (target.matches(FIELD_AVATAR_ID)) {
      window.preview(target, previewAvatar);
    } else if (target.matches(FIELD_IMAGES_ID)) {
      window.preview(target, previewPhoto);
    }
  });
};

window.form = {
  addFormValidation,
  enableControls,
  disableControls,
  setDefaultAddress,
  setCustomAddress,
  getFormChildren: () => adForm.children,
  addChangeListener,
  removeDisabledClass,
  resetForm
};
