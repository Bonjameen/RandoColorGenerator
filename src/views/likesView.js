`use strict`;

import View from "./View";
import icons from "url:../img/icons.svg";
import colourBoxView from "./colourBoxView";

class LikesView extends View {
  _parentEl = document.querySelector(`.likes-container`);

  /**
   * Triggers handler function when the generator, colour code, or close button is clicked
   * @param {func} pageClickHandler Handler function for when generator is clicked
   * @param {func} codeClickHandler Handler function for when colour code is clicked
   * @param {func} closeClickHandler Handler function for when close button on message pop-up is clicked
   * @author Ben Pinner
   */
  addHandlerClick(likesBtnClickHandler, colourClickHandler) {
    const renderMessage = this.renderMessage;
    this._parentEl.addEventListener(
      `click`,
      this._handleClick.bind(this, likesBtnClickHandler, colourClickHandler)
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
  _handleClick(likesBtnClickHandler, colourClickHandler, e) {
    const likesBtnEl = e.target.closest(`.btn--likes`);

    const colourBoxEl = e.target.closest(`.like`);

    e.stopPropagation();
    if (likesBtnEl) return likesBtnClickHandler();
    if (colourBoxEl)
      return colourClickHandler(colourBoxEl.firstElementChild.textContent);
  }

  setScrollbar() {
    var coloursEl = document.querySelector(".colours-container");
    coloursEl.scrollTop = coloursEl.scrollHeight;
  }

  slideBtnIn() {
    const textEl = document.querySelector(`.likes-text`);

    // After a second, delete the content of textEl
    setTimeout(() => {
      textEl.textContent = "";
    }, 1000);
  }

  slideBtnOut() {
    const textEl = document.querySelector(`.likes-text`);
    textEl.textContent = "Likes";
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
    const searchFocused = this._data.searchFocused;
    this._parentEl = document.querySelector(`.likes-container`);

    const likesClass = `likes ${active ? `likes--active` : ``}`;

    const btnDirection = active ? `up` : `down`;

    const markup = `
        <div class="${likesClass}" 
        style="color: ${mainColour.higherContrastColour}">
          <div class="btn btn--likes ${searchFocused ? `hidden` : ``}">
            <svg style="fill: ${mainColour.higherContrastColour}">
              <use href="${icons}#icon-caret-${btnDirection}"></use>
            </svg>
            <span class="likes-text ${active ? `hidden` : ``}">Likes</span>
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
          <div class="shade-container" data-index="${index}" data-type="like">
            ${colourBoxView.render(data, false)}
          </div>`;
      })
      .join(``);
    return markup;
  }
}

export default new LikesView();
