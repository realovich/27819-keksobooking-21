'use strict';

const FILE_TYPES = [`jpg`, `jpeg`, `png`];

window.preview = (target, previewBox) => {
  const file = target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

  if (matches) {
    const reader = new FileReader();
    const previewImg = document.createElement(`img`);
    previewImg.style = `width: 100%; height: 100%; min-width: 40px; object-fit: contain;`;

    while (previewBox.firstChild) {
      previewBox.removeChild(previewBox.firstChild);
    }

    reader.addEventListener(window.util.Evt.LOAD, () => {
      previewImg.src = reader.result;
    });

    reader.readAsDataURL(file);

    previewBox.append(previewImg);
  }
};
