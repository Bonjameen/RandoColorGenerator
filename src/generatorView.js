class generatorView {
  #parentElement = document.body;
  #colours = {};

  constructor() {
    this.#colours.colour = `#343a40`;
  }

  render() {
    const markup = `
        <div class="message">Click the screen to generate a new colour</div>
        <div class="tints">
            <div class="btn btn--tints" data-type="tint">
            <ion-icon
                name="chevron-forward-outline"
                class="arrow arrow__tints"
            ></ion-icon
            ><span class="tints-text">Tints</span>
            </div>
        </div>
        <div class="shades">
            <div class="btn btn--shades" data-type="shade">
            <span class="shades-text">Shades</span>
            <ion-icon
                name="chevron-back-outline"
                class="arrow arrow__shades"
            ></ion-icon>
            </div>
        </div>`;
    this.#parentElement.innerHTML = ``;
    this.#parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }

  renderNewColour(colour, tints, shades) {
    this.#colour = colour;
  }
}
