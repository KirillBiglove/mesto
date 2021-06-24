import Card from './Card.js';
import { addSectionCardsTemplate } from '../utils/constants.js';

export default class Sections {
  constructor( { item, renderer }, containerSelector ) {
    this._renderedItems = item;
    this._renderer =

    this._containterSelector = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._containterSelector.apppend(element);
    };

  renderer(name, link, templateSelector, openFullPhoto) {
    this._renderedItems(() => {
      const card = new Card(name, link, templateSelector, openFullPhoto);
      return card.generateCard();
    })

  };
}
