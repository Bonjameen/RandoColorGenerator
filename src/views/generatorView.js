`use strict`;

import icons from "url:../img/icons.svg";
import variationsView from "./variationsView";
import View from "./View";

class GeneratorView extends View {
  _parentEl = document.body;

  addHandlerRender(handler) {
    window.addEventListener(`load`, handler);
  }

  addHandlerClick(handler) {
    this._parentEl.addEventListener(`click`, handler);
  }

  _generateMarkup() {
    const colour = this._data.colour;
    const tints = this._data.tints;
    const shades = this._data.shades;
    const tintsActive = this._data.tintsActive;
    const shadesActive = this._data.shadesActive;
    return `
      <div class="container" style="background-color: ${colour.rgb}">
        <div class="message" style="color: ${
          colour.contrastColour
        }">Click the screen to generate a new colour</div>
        <div class="variations">
          ${variationsView.render(
            { colour: colour, tints, type: `tint`, active: tintsActive },
            false
          )}
          ${variationsView.render(
            { colour: colour, shades, type: `shade`, active: shadesActive },
            false
          )}
          </div>
          <div class="color-text" style="opacity: 0.6, color: ${colour.rgb}">
            <div class="rgb-text" style="color: ${colour.contrastColour}">${
      colour.rgb
    }</div>
            <div class="hex-text" style="color: ${colour.contrastColour}">${
      colour.hex
    }</div>
          </div>
        </div>
      </div>`;
  }
}

export default new GeneratorView();
