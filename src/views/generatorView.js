`use strict`;

import icons from "url:../img/icons.svg";
import variationsView from "./variationsView";
import View from "./View";

class GeneratorView extends View {
  _parentEl = document.querySelector(`.container`);

  addHandlerRender(handler) {
    window.addEventListener(`load`, handler);
  }

  addHandlerClick(handler) {
    const renderMessage = this.renderMessage;
    this._parentEl.addEventListener(
      `click`,
      this._handleClick.bind(this, handler)
    );
  }

  _handleClick(handler, e) {
    const textEl = e.target.closest(`.rgb-text, .hex-text`);
    if (!textEl) return handler();
    this._handleColourTextClick(textEl, e);
  }

  _generateMarkup() {
    const colour = this._data.colour;
    return `
        <div class="generator" style="background-color: ${colour.rgb}">
          <div class="message" style="color: ${colour.contrastColour}">Click the screen to generate a new colour</div>
          <div class="color-text" style="opacity: 0.6, color: ${colour.rgb}">
            <div class="rgb-text" style="color: ${colour.contrastColour}">${colour.rgb}</div>
            <div class="hex-text" style="color: ${colour.contrastColour}">${colour.hex}</div>
          </div>
          </div>
        </div>`;
  }
}

export default new GeneratorView();
