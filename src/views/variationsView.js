import colourBoxView from "./colourBoxView";
import View from "./View";
import variationView from "./variationView";

`use strict`;

class VariationsView extends View {
  _parentEl = document.querySelector(`.variations`);

  addHandlerClick(handler) {
    this._parentEl.addEventListener(
      `click`,
      this._handleClick.bind(this, handler)
    );
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

    // Sliding colours
    if (type === `tint`) {
      tintEls.forEach((_, i) => slideIndividualColour(type, i));
    } else if (type === `shade`) {
      shadeEls.forEach((_, i) => slideIndividualColour(type, i));
    }
  };

  _handleClick(handler, e) {
    const target = e.target;
    const btn = target.closest(`.btn`);
    const textEl = target.closest(`.rgb-text, .hex-text`);
    if (btn) {
      e.stopPropagation();
      const type = [...btn.classList]
        .find(
          (className) =>
            className.includes(`tint`) || className.includes(`shade`)
        )
        .split(`--`)[1]
        .slice(0, -1);
      handler(type);
    }
    if (textEl) {
      this._handleColourTextClick(textEl, e);
    }
  }

  _generateMarkup() {
    const tintsActive = this._data.tintsActive;
    const shadesActive = this._data.shadesActive;
    const tints = this._data.tints;
    const shades = this._data.shades;
    const colour = this._data.colour;
    const markup = `
                  ${variationView.render(
                    {
                      colour,
                      type: `tint`,
                      tints,
                      active: tintsActive,
                    },
                    false
                  )}
                  ${variationView.render(
                    {
                      colour,
                      type: `shade`,
                      shades,
                      active: shadesActive,
                    },
                    false
                  )}`;
    return markup;
  }
}

export default new VariationsView();
