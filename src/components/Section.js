export default class Sections {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;

    this._containter = document.querySelector(containerSelector);
  }

  renderer() {
    this._renderedItems.forEach(item => {
      this._renderer(item);

    });
  }

  addItem(item) {
    this._containter.append(item);
  }

  addPrependItem(item) {
    this._containter.prepend(item);
  }
};
