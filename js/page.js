'use strict';

(() => {
  let savedAds;

  const successHandler = (data) => {
    savedAds = data.filter((element) => element.offer);
    saveFiltredAds(savedAds);
    window.filter.filterAds();
    window.form.enableControls(window.filter.getFormChildren());
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
    window.form.removeDisabledClass();
    window.form.enableControls(window.form.getFormChildren());
    window.form.setCustomAddress();
    window.form.addChangeListener();
  };

  const deactivatePage = () => {
    window.map.addFadedClass();
    window.form.disableControls(window.filter.getFormChildren());
    window.form.disableControls(window.form.getFormChildren());
    window.form.setDefaultAddress();
  };

  const resetPage = () => {
    window.card.closeAdCard();
    window.map.removePins();
    window.map.resetPinPosition();
    window.filter.resetForm();
    window.form.resetForm();
    deactivatePage();
  };

  window.page = {
    deactivatePage,
    activatePage,
    resetPage,
    saveFiltredAds,
    getSavedAds: () => savedAds,
    getFiltredAds: () => filtredAds,
  };
})();
