import colourBoxView from "./colourBoxView";
import View from "./View";
import icons from "../img/icons.svg";

`use strict`;

class VariationsView extends View {
  _parentEl = document.querySelector(`.variations`);

  addHandlerBtnClick(handler) {
    this._parentEl.addEventListener(`click`, function (e) {
      const btn = e.target.closest(`.btn`);
      if (!btn) return;
      e.stopPropagation();
      const type = btn.classList
        .find(
          (className) =>
            className.contains(`tint`) || className.contains(`shade`)
        )
        .split(`--`)[1];
      handler(type);
    });
  }

  slidePanel = (type, active) => {
    // Button
    const button = document.querySelector(`.btn--${type}s`);
    // const children = [...button.children];
    // const buttonName = children
    //   .find((child) => child.classList.contains(`arrow`))
    //   .name.split(`-`)[1];
    button.classList.toggle(`btn--${type}s__active`);
    children.find((child) =>
      child.classList.contains(`arrow`)
    ).name = `chevron-${buttonName === `forward` ? `back` : `forward`}-outline`;
    console.log(
      children
        .find((child) => child.tagName.toLowerCase() === `span`)
        .classList.toggle(`hidden`)
    );

    // Sliding colours
    if (type === `tint`) {
      tintEls.forEach((_, i) => slideIndividualColour(type, i));
    } else if (type === `shade`) {
      shadeEls.forEach((_, i) => slideIndividualColour(type, i));
    }
  };

  _generateMarkup() {
    const type = this._data.type;
    const active = this._data.active;
    return `
        <div class="${type}s">
            <div class="btn btn--${type}s" data-type="${type}">
                ${
                  type === `tint`
                    ? `${this._generateButtonTextMarkup()}${this._generateButtonIconMarkup()}`
                    : `${this._generateButtonIconMarkup()}${this._generateButtonTextMarkup()}`
                }
            </div>
            ${this._data[`${type}s`]
              .map((colour, i) =>
                colourBoxView.render({ colour, type, index: i, active }, false)
              )
              .join(``)}
        </div>`;
  }

  _generateButtonIconMarkup() {
    const type = this._data.type;
    const colour = this._data.colour;
    const active = this._data[`${type}sActive`];
    console.log();
    let arrowDir;
    if (active) arrowDir = type === `tint` ? `left` : `right`;
    else arrowDir = type === `tint` ? `right` : `left`;
    return `
        <svg class="arrow arrow__${type}s" viewBox="0 0 32 32" style="stroke: ${colour.contrastColour}">
          <use href="${icons}#icon-arrow-${arrowDir}"></use>
        </svg>`;
  }

  _generateButtonTextMarkup() {
    const type = this._data.type;
    const colour = this._data.colour;
    return `
        <span class="${type}s-text" style="color: ${colour.contrastColour}">
          ${type[0].toUpperCase()}${type.slice(1)}s
        </span>`;
  }
}

export default new VariationsView();
