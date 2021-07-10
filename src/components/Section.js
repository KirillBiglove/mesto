export default class Sections {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;

    this._containter = document.querySelector(containerSelector);
  }

  renderAll(items) {
    items.forEach(item => {
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
