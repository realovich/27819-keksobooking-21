'use strict';

const MAX_FILTERED_ADS = 5;

const filterForm = document.querySelector(`.map__filters`);

const housingType = filterForm.querySelector(`#housing-type`);
const housingPrice = filterForm.querySelector(`#housing-price`);
const housingRooms = filterForm.querySelector(`#housing-rooms`);
const housingGuests = filterForm.querySelector(`#housing-guests`);
const housingFeatures = filterForm.querySelector(`#housing-features`);

const filterAds = () => {
  const filteredArray = [];

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

  const compareStrings = (selectedOption, offerValue) => selectedOption === offerValue.toString();

  const compareValues = (selectedOption, offerValue, comparatorFunction) => {
    return selectedOption === `any` || comparatorFunction(selectedOption, offerValue);
  };

  for (const ad of window.page.getSavedAds()) {
    if (
      compareValues(housingType.value, ad.offer.type, compareStrings) &&
      compareValues(housingRooms.value, ad.offer.rooms, compareStrings) &&
      compareValues(housingGuests.value, ad.offer.guests, compareStrings) &&
      checkHousingPrice(housingPrice.value, ad.offer.price) &&
      (enabledHousingFeatures.length === 0 || compareArray(enabledHousingFeatures, ad.offer.features))
    ) {
      filteredArray.push(ad);

      if (filteredArray.length === MAX_FILTERED_ADS) {
        break;
      }
    }
  }

  window.page.saveFilteredAds(filteredArray);
  window.map.renderPinsList(filteredArray);
};

const onFilterFormChange = () => {
  window.card.closeAdCard();

  filterAds();
};

filterForm.addEventListener(window.util.Evt.CHANGE, window.debounce(onFilterFormChange));

const resetForm = () => {
  filterForm.reset();
};

window.filter = {
  getFormChildren: () => filterForm.children,
  filterAds,
  resetForm
};
