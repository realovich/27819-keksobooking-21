'use strict';

(() => {
  const FIELD_HOUSING_TYPE_ID = `#housing-type`;

  const filterForm = document.querySelector(`.map__filters`);

  filterForm.addEventListener(window.util.Event.CHANGE, (evt) => {
    const {target} = evt;
    const {value} = target;

    window.card.closeAdCard();

    if (target && target.matches(FIELD_HOUSING_TYPE_ID)) {
      const typeFiltredAds = window.page.getSavedAds().filter((element) => value === `any` || element.offer.type === value);

      window.page.saveFiltredAds(typeFiltredAds);
      window.map.renderPinsList(typeFiltredAds);
    }
  });

  const resetForm = () => {
    filterForm.reset();
  };

  window.filter = {
    getFormChildren: () => filterForm.children,
    resetForm
  };
})();
