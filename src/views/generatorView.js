`use strict`;

import icons from "url:../img/icons.svg";
import copyMessageView from "./copyMessageView";
import likesView from "./likesView";
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
  addHandlerClick(
    pageClickHandler,
    codeClickHandler,
    closeClickHandler,
    likeClickHandler
  ) {
    const renderMessage = this.renderMessage;
    this._parentEl.addEventListener(
      `click`,
      this._handleClick.bind(
        this,
        pageClickHandler,
        codeClickHandler,
        closeClickHandler,
        likeClickHandler
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
  _handleClick(
    pageClickHandler,
    codeClickHandler,
    closeClickHandler,
    likeClickHandler,
    e
  ) {
    const textEl = e.target.closest(`.rgb-text, .hex-text`);
    const btnEl = e.target.closest(`.close`);
    const likeBtnEl = e.target.closest(`.heart`);
    const likesBtnEl = e.target.closest(`.btn--likes`);

    e.stopPropagation();
    if (textEl) {
      return codeClickHandler(textEl.innerText);
    }
    if (btnEl) {
      return closeClickHandler();
    }
    if (likeBtnEl) {
      return likeClickHandler();
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
    const likes = this._data.likes;
    const copyData = { colour, code: null };
    return `
        <div class="generator" style="background-color: ${colour.rgb}">
          <div class="message" style="color: ${
            colour.higherContrastColour
          }">Click the screen to generate a new colour</div>
          ${this._generateLikeButtonMarkup(likes, colour)}
          <div class="color-text" style="opacity: 0.6, color: ${colour.rgb}">
            <div class="rgb-text" style="color: ${colour.higherContrastColour}">
            ${colour.rgb}</div>
            <div class="hex-text" style="color: ${colour.higherContrastColour}">
            ${colour.hex}</div>
          </div>
          <div class="copy-message-container">
            ${copyMessageView.render(copyData, false)}
          </div>
        </div>`;
  }

  _generateLikeButtonMarkup(likes, colour) {
    const markup = likes?.some((like) => like.rgb === colour.rgb)
      ? `<svg class="heart heart--full" viewBox="0 0 32 32" style="fill: 
          ${colour.higherContrastColour}">
          <use href="${icons}#icon-heart-filled"></use>
        </svg>`
      : `<svg class="heart heart--outline" viewBox="0 0 32 32" style="color: 
        ${colour.higherContrastColour}">
        <use href="${icons}#icon-heart-outline"></use>
      </svg>`;
    return markup;
  }
}

export default new GeneratorView();
