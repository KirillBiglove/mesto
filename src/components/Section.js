export default class Sections {
  constructor({ item, renderer }, containerSelector) {
    this._renderedItems = item;
    this._renderer = renderer;

    this._containterSelector = document.querySelector(containerSelector);
  }

  renderer(data) {
    data.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._containterSelector.append(item);
  }
};
