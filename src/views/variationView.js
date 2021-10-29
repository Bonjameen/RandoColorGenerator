import colourBoxView from "./colourBoxView";
import View from "./View";
import btnView from "./btnView";

`use strict`;

class VariationView extends View {
  _generateMarkup() {
    const type = this._data.type;
    const active = this._data.active;
    const colour = this._data.colour;
    const colours = this._data[`${type}s`];

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
