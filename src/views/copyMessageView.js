`use strict`;

import View from "./View";
import icons from "url:../img/icons.svg";

class CopyMessageView extends View {
  _parentEl;

  /**
   * Close the copied to clipboard message and if a timeout function has been passed in clear it to avoid executing twice
   * @param {NodeJS.Timeout} timeoutFunc The timeout function that was initially set to close the window, defaults to null
   * @author Ben Pinner
   */
  close(timeoutFunc = null) {
    this._parentEl = document.querySelector(`.popup`);
    const message = this._parentEl.querySelector(`.popup__aside`);
    if (timeoutFunc) clearTimeout(timeoutFunc);
    message.classList.toggle(`popup__aside--active`);
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
    this._parentEl = document.querySelector(`.popup`);

    const markup = `
        <aside 
          class="
          popup__aside 
          ${code ? `popup__aside--active` : `hidden`}" 
          style="
          background-color: ${colour.lowerContrastColour.rgb}; 
          color: ${colour.lowerContrastColour.contrastColour};
          border-top-color: ${colour.lowerContrastColour.contrastColour}">
            <svg>
                <use href="${icons}#icon-double-check"></use>
            </svg>
            <p>${code} copied to clipboard</p>
            <p class="popup__close">close</p>
        </aside>`;
    return markup;
  }
}

export default new CopyMessageView();
