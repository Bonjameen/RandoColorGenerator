`use strict`;

import View from "./View";
import icons from "url:../img/icons.svg";
import colourBoxView from "./colourBoxView";

class LikesView extends View {
  _parentEl;

  /**
   * Close the copied to clipboard message and if a timeout function has been passed in clear it to avoid executing twice
   * @param {NodeJS.Timeout} timeoutFunc The timeout function that was initially set to close the window, defaults to null
   * @author Ben Pinner
   */
  close(timeoutFunc = null) {
    this._parentEl = document.querySelector(`.copy-message-container`);
    const message = this._parentEl.querySelector(`.copy-message`);
    if (timeoutFunc) clearTimeout(timeoutFunc);
    message.classList.toggle(`copy-message--active`);
    message.classList.toggle(`hidden`);
  }

  /**
   * Generates the html markup for the view
   * @returns {string} The html markup to render or update the view with
   * @author Ben Pinner
   */
  _generateMarkup() {
    const mainColour = this._data.colour;
    const colours = this._data.colours;
    const active = this._data.active;
    this._parentEl = document.querySelector(`.likes-container`);

    const likesClass = `likes ${active ? `likes--active` : ``}`;
    const likesStyle = `color: ${mainColour.higherContrastColour}; ${
      colours.length >= 9 ? `height: 100vh` : ``
    }`;

    const markup = `
        <div class="${likesClass}" 
        style="color: ${mainColour.higherContrastColour}">
          <div class="btn btn--likes">
            <div><p>Your likes</p></div>
            <svg style="fill: ${mainColour.higherContrastColour}">
              <use href="${icons}#icon-caret-down"></use>
            </svg>
          </div>
          <div class="colours-container"
              ${
                colours.length >= 8
                  ? `style="height: calc((100vh / 9) * 8)"`
                  : ``
              }>
            <div class="colours">
              ${this._generateLikeBoxes(colours, active)}
            </div>
          </div>
        </div>`;
    return markup;
  }

  _generateLikeBoxes(colours, active) {
    const type = `like`;
    const markup = colours
      .map((colour, i) => {
        const index = i;
        const data = { colour, index, type, active };
        return `
          <div class="like-container">
            ${colourBoxView.render(data, false)}
          </div>`;
      })
      .join(``);
    return markup;
  }
}

export default new LikesView();
