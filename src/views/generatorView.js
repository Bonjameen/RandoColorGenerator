`use strict`;

import icons from "url:../img/icons.svg";
import copyMessageView from "./copyMessageView";
import variationsView from "./variationsView";
import View from "./View";

class GeneratorView extends View {
  _parentEl = document.querySelector(`.container`);

  /**
   * Triggers handler function when the window has loaded
   * @param {func} handler Handler function for rendering the DOM
   * @author Ben Pinner
   */
  addHandlerRender(handler) {
    window.addEventListener(`load`, handler);
  }

  /**
   * Triggers handler function when the generator, colour code, or close button is clicked
   * @param {func} pageClickHandler Handler function for when generator is clicked
   * @param {func} codeClickHandler Handler function for when colour code is clicked
   * @param {func} closeClickHandler Handler function for when close button on message pop-up is clicked
   * @author Ben Pinner
   */
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

  /**
   * Handles event delegation and calls the correct function
   * @param {func} pageClickHandler Handler function for when generator is clicked
   * @param {func} codeClickHandler Handler function for when colour code is clicked
   * @param {func} closeClickHandler Handler function for when close button on message pop-up is clicked
   * @param {Event} e The event that has been caught
   * @author Ben Pinner
   */
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

  /**
   * Generates the html markup for the view
   * @returns {string} The html markup to render or update the view with
   * @author Ben Pinner
   */
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
