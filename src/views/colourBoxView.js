`use strict`;

class VariationsView extends View {
  #generateMarkup() {
    const colour = this.#data.colour;
    return `
      <div class="shade-container">
          <div class="${
            this.#data.type
          }" data-index="${i}" style="background-color: rgb(${colour[0].map(
      Math.trunc
    )})">
              <span class="rgb-text">${colour[0]})
              </span>
              <span class="hex-text">${colourous.convertRGBToHex(colour[0])}
          </div>
      </div>`;
  }
}

export default new VariationView();
