'use strict';

(() => {
  let savedAds;

  const successHandler = (data) => {
    savedAds = data.filter((element) => element.offer);
    window.map.renderPinsList(savedAds);
    saveFiltredAds(savedAds);
    window.form.enableControls(window.filter.getFormChildren);
  };

  let filtredAds;

  const saveFiltredAds = (data) => {
    filtredAds = data;
  };

  const errorHandler = (errorMessage) => {
    window.util.renderErrorMessage(errorMessage);
  };

  const activatePage = () => {
    window.backend.load(successHandler, errorHandler);
    window.map.removeFadedClass();
    window.map.removeListenersForActivatePage();
    window.form.toggleDisabledClass();
    window.form.enableControls(window.form.getFormChildren);
    window.form.setCustomAddress();
    window.form.addChangeListener();
  };

  const deactivatePage = () => {
    window.map.addFadedClass();
    window.form.disableControls(window.filter.getFormChildren);
    window.form.disableControls(window.form.getFormChildren);
    window.form.setDefaultAddress();
  };

  window.page = {
    deactivatePage,
    activatePage,
    saveFiltredAds,
    getSavedAds: () => savedAds,
    getFiltredAds: () => filtredAds,
  };
})();
