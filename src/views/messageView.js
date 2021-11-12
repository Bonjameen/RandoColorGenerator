`use strict`;

import View from "./View";
import icons from "url:../img/icons.svg";

class MessageView extends View {
  _parentEl;

  /**
   * Close the copied to clipboard message and if a timeout function has been passed in clear it to avoid executing twice
   * @param {NodeJS.Timeout} timeoutFunc The timeout function that was initially set to close the window, defaults to null
   * @author Ben Pinner
   */
  close(timeoutFunc = null) {
    this._parentEl = document.querySelector(`.message-container`);
    const message = this._parentEl.querySelector(`.message-body`);
    if (timeoutFunc) clearTimeout(timeoutFunc);
    message.classList.contains(`message-body--active`)
      ? message.classList.remove(`message-body--active`)
      : message.classList.remove(`message-body--error`);
    message.classList.toggle(`hidden`);
  }

  /**
   * Generates the html markup for the view
   * @returns {string} The html markup to render or update the view with
   * @author Ben Pinner
   */
  _generateMarkup() {
    const colour = this._data.colour;
    const code = this._data.code;
    const isError = this._data.isError;
    this._parentEl = document.querySelector(`.message-container`);

    const iconId = isError ? `icon-close` : `icon-double-check`;

    const markup = `
        <div 
          class="
          message-body 
          ${
            code
              ? `message-body--active`
              : isError
              ? `message-body--error`
              : `hidden`
          }" 
          style="
          background-color: ${colour.lowerContrastColour.rgb}; 
          color: ${colour.lowerContrastColour.contrastColour};
          border-top-color: ${colour.lowerContrastColour.contrastColour}">
            <svg>
                <use href="${icons}#${iconId}"></use>
            </svg>
            <p>${code} copied to clipboard</p>
            <p class="close">close</p>
        </div>`;
    return markup;
  }
}

export default new MessageView();
