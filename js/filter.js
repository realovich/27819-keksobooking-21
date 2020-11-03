'use strict';

(() => {
  const filterForm = document.querySelector(`.map__filters`);

  const housingType = filterForm.querySelector(`#housing-type`);
  const housingPrice = filterForm.querySelector(`#housing-price`);
  const housingRooms = filterForm.querySelector(`#housing-rooms`);
  const housingGuests = filterForm.querySelector(`#housing-guests`);
  const housingFeatures = filterForm.querySelector(`#housing-features`);

  const onFilterFormChange = () => {
    window.card.closeAdCard();

    const housingFeaturesElements = Array.from(housingFeatures.querySelectorAll(`.map__checkbox`));

    const enabledHousingFeatures = housingFeaturesElements.filter((featuresValue) => {
      return featuresValue.checked;
    }).map((featuresValue) => {
      return featuresValue.value;
    });

    const compareArray = (firstArray, secondArray) => {
      for (let i = 0; i < firstArray.length; i++) {
        if (!secondArray.includes(firstArray[i])) {
          return false;
        }
      }

      return true;
    };

    const priceTypeToValue = {
      low: 10000,
      high: 50000
    };

    const checkHousingPrice = (selectedOption, dataOption) => {
      switch (selectedOption) {
        case `low`:
          return dataOption < priceTypeToValue.low;
        case `middle`:
          return dataOption >= priceTypeToValue.low && dataOption < priceTypeToValue.high;
        case `high`:
          return dataOption >= priceTypeToValue.high;
        default:
          return false;
      }
    };

    const filteredAds = window.page.getSavedAds().filter((ad) => {
      return housingType.value === `any` || ad.offer.type === housingType.value;
    }).filter((ad) => {
      return housingPrice.value === `any` || checkHousingPrice(housingPrice.value, ad.offer.price);
    }).filter((ad) => {
      return housingRooms.value === `any` || ad.offer.rooms === parseInt(housingRooms.value, 10);
    }).filter((ad) => {
      return housingGuests.value === `any` || ad.offer.guests === parseInt(housingGuests.value, 10);
    }).filter((ad) => {
      return enabledHousingFeatures.length === 0 || compareArray(enabledHousingFeatures, ad.offer.features);
    });

    window.page.saveFiltredAds(filteredAds);
    window.map.renderPinsList(filteredAds);
  };

  filterForm.addEventListener(window.util.Event.CHANGE, window.debounce(onFilterFormChange));

  const resetForm = () => {
    filterForm.reset();
  };

  window.filter = {
    getFormChildren: () => filterForm.children,
    resetForm
  };
})();
