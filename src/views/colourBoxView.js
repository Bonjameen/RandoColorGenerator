`use strict`;

import View from "./View";

class ColourBoxView extends View {
  _generateMarkup() {
    const colour = this._data.colour;
    const index = this._data.index;
    const type = this._data.type;
    const activeClass = this._data.active ? `${type}--active` : ``;
    return `
      <div class="shade-container">
          <div class="${type} ${activeClass}" data-index="${index}" style="background-color: ${colour.rgb}">
              <span class="rgb-text">${colour.rgb}
              </span>
              <span class="hex-text">${colour.hex}
          </div>
      </div>`;
  }
}

export default new ColourBoxView();
