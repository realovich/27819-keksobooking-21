'use strict';

(() => {
  const FIELD_HOUSING_TYPE_ID = `#housing-type`;

  const filterForm = document.querySelector(`.map__filters`);

  filterForm.addEventListener(window.util.Event.CHANGE, (evt) => {
    const {target} = evt;
    const targetValue = target.value;

    window.map.closeAdCard();

    if (target && target.matches(FIELD_HOUSING_TYPE_ID)) {
      if (targetValue !== `any`) {
        const typeFiltredAds = window.form.getSavedAds().filter((element) => element.offer.type === targetValue);
        window.form.saveFiltredAds(typeFiltredAds);
        window.map.renderPinsList(window.form.getFiltredAds());
      } else {
        window.map.renderPinsList(window.form.getSavedAds());
      }
    }
  });

  window.filter = {
    formChildren: filterForm.children,
  };
})();
