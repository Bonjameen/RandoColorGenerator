`use strict`;

import View from "./View";

class ColourBoxView extends View {
  _parentEl;

  _generateMarkup() {
    const colour = this._data.colour;
    const index = this._data.index;
    const type = this._data.type;
    const activeClass = this._data.active ? `${type}--active` : ``;
    this._parentEl = [...document.querySelectorAll(`.shade-container`)].find(
      (el) => {
        return +el.dataset.index === index && el.dataset.type === type;
      }
    );
    const markup = `
        <div class="${type} ${activeClass}" data-index="${index}" style="background-color: ${colour.rgb}; color: ${colour.contrastColour}">
            <span class="rgb-text">${colour.rgb}
            </span>
            <span class="hex-text">${colour.hex}
        </div>`;
    return markup;
  }
}

export default new ColourBoxView();
