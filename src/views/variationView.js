import colourBoxView from "./colourBoxView";
import View from "./View";
import btnView from "./btnView";

`use strict`;

class VariationView extends View {
  _generateMarkup() {
    const type = this._data.type;
    const colour = this._data.colour;
    const colours = type === `tint` ? this._data.tints : this._data.shades;
    const active = this._data.active;

    const markup = `
    <div class="${type}s">
        <div class="btn--${type}s__container">
        ${btnView.render({ colour, type, active }, false)}
        </div>
        ${colours
          .map(
            (colour, i) => `
            <div class="shade-container" data-index="${i}" data-type="${type}">
                ${colourBoxView.render(
                  { colour, type, index: i, active },
                  false
                )}
            </div>
            `
          )
          .join(``)}
    </div>`;
    return markup;
  }
}

export default new VariationView();
