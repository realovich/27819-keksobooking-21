'use strict';

(() => {
  const MAX_FILTERED_ADS = 5;

  const filterForm = document.querySelector(`.map__filters`);

  const housingType = filterForm.querySelector(`#housing-type`);
  const housingPrice = filterForm.querySelector(`#housing-price`);
  const housingRooms = filterForm.querySelector(`#housing-rooms`);
  const housingGuests = filterForm.querySelector(`#housing-guests`);
  const housingFeatures = filterForm.querySelector(`#housing-features`);

  const onFilterFormChange = () => {
    window.card.closeAdCard();

    const housingFeaturesElements = Array.from(housingFeatures.querySelectorAll(`.map__checkbox`));

    const enabledHousingFeatures = housingFeaturesElements
      .filter((featuresValue) => featuresValue.checked)
      .map((featuresValue) => featuresValue.value);

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
        case `any`:
          return true;
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

    const filteredArray = [];
    const ads = window.page.getSavedAds();

    const compareStrigs = (selectedOption, offerValue) => {
      return selectedOption === offerValue.toString();
    };

    const compareValues = (selectedOption, offerValue, comparatorFunction) => {
      return selectedOption === `any` || comparatorFunction(selectedOption, offerValue);
    };

    for (let i = 0; i < ads.length; i++) {
      if (compareValues(housingType.value, ads[i].offer.type, compareStrigs)
      && compareValues(housingRooms.value, ads[i].offer.rooms, compareStrigs)
      && compareValues(housingGuests.value, ads[i].offer.guests, compareStrigs)
      && checkHousingPrice(housingPrice.value, ads[i].offer.price)
      && (enabledHousingFeatures.length === 0 || compareArray(enabledHousingFeatures, ads[i].offer.features))) {
        filteredArray.push(ads[i]);

        if (filteredArray.length === MAX_FILTERED_ADS) {
          break;
        }
      }
    }

    window.page.saveFiltredAds(filteredArray);
    window.map.renderPinsList(filteredArray);
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
