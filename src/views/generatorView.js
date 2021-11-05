`use strict`;

import icons from "url:../img/icons.svg";
import copyMessageView from "./copyMessageView";
import variationsView from "./variationsView";
import View from "./View";

class GeneratorView extends View {
  _parentEl = document.querySelector(`.container`);

  addHandlerRender(handler) {
    window.addEventListener(`load`, handler);
  }

  addHandlerClick(pageClickHandler, codeClickHandler, closeClickHandler) {
    const renderMessage = this.renderMessage;
    this._parentEl.addEventListener(
      `click`,
      this._handleClick.bind(
        this,
        pageClickHandler,
        codeClickHandler,
        closeClickHandler
      )
    );
  }

  _handleClick(pageClickHandler, codeClickHandler, closeClickHandler, e) {
    const textEl = e.target.closest(`.rgb-text, .hex-text`);
    const btnEl = e.target.closest(`.close`);
    if (textEl) {
      e.stopPropagation();
      return codeClickHandler(textEl.innerText);
    }
    if (btnEl) {
      e.stopPropagation();
      return closeClickHandler();
    }
    pageClickHandler();
  }

  _generateMarkup() {
    const colour = this._data.colour;
    const data = { colour, code: null };
    return `
        <div class="generator" style="background-color: ${colour.rgb}">
          <div class="message" style="color: ${
            colour.higherContrastColour
          }">Click the screen to generate a new colour</div>
          <div class="color-text" style="opacity: 0.6, color: ${colour.rgb}">
            <div class="rgb-text" style="color: ${colour.higherContrastColour}">
            ${colour.rgb}</div>
            <div class="hex-text" style="color: ${colour.higherContrastColour}">
            ${colour.hex}</div>
          </div>
          <div class="copy-message-container">
            ${copyMessageView.render(data, false)}
          </div>
        </div>`;
  }
}

export default new GeneratorView();
