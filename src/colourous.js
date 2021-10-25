`use strict`;

class Colourous {
  #decToHex = [
    `0`,
    `1`,
    `2`,
    `3`,
    `4`,
    `5`,
    `6`,
    `7`,
    `8`,
    `9`,
    `A`,
    `B`,
    `C`,
    `D`,
    `E`,
    `F`,
  ];
  #luminosities;

  _randomInt(min, max) {
    return Math.floor(Math.random(min, max) * (max - min + 1));
  }

  generateRandomColour() {
    const colourRGB = `rgb(${this._randomInt(0, 255)},${this._randomInt(
      0,
      255
    )},${this._randomInt(0, 255)})`;
    const colourHex = this.convertRGBToHex(colourRGB);
    return [colourRGB, colourHex];
  }

  _convertDecimalToHex(dec) {
    let remainder;
    let remainderString = ``;
    while (dec !== 0) {
      remainder = dec % 16;
      remainderString = `${this.#decToHex[remainder]}${remainderString}`;
      dec = Math.floor(dec / 16);
    }

    return remainderString.padStart(2, `0`);
  }

  getHueList(color) {
    return color
      .slice(4, -1)
      .split(`,`)
      .map((val) => Number(val));
  }

  convertRGBToHex(colour) {
    const hueList =
      colour instanceof `Array` ? colour : this.getHueList(colour);
    return `#${hueList.reduce(
      (hex, cur) => hex + this._convertDecimalToHex(cur),
      ``
    )}`;
  }

  // Maths
  // Tints - New value = current value + ((255 - current value) x tint factor)
  // Shades - New value = current value x shade factor
  _generateTint(colour, factor) {
    const tint = colour.map((val) => val + (255 - val) * factor);
    const tintHex = this.convertRGBToHex(tint);
    return [tint, tintHex];
  }

  _generateShade(colour, factor) {
    const shade = colour.map((val) => val * factor);
    const shadeHex = this.convertRGBToHex(shade);
    return [shade, shadeHex];
  }

  generateShadesTints(colour) {
    const hueList = this.getHueList(colour);
    const tints = [];
    const shades = [];
    for (let i = 0; i < 10; i++) {
      tints.push(this._generateTint(hueList, (i + 1) / 10));
      shades.push(this._generateShade(hueList, (i + 1) / 10));
    }

    return [shades, tints];
  }

  // const [backgroundTints, backgroundShades] = generateShadesTints();

  // if R <= 10 then Rg = R/3294, else Rg = (R/269 + 0.0513)^2.4

  // if G <= 10 then Gg = G/3294, else Gg = (G/269 + 0.0513)^2.4

  // if B <= 10 then Bg = B/3294, else Bg = (B/269 + 0.0513)^2.4

  // L = 0.2126 * Rg + 0.7152 * Gg + 0.0722 * Bg

  _calculateRelativeLuminance(colour) {
    const hueValues = colour.map((val) =>
      val <= 10 ? val / 3294 : (val / 269 + 0.0513) ** 2.4
    );
    return (
      0.2126 * hueValues[0] + 0.7152 * hueValues[1] + 0.0722 * hueValues[2]
    );
  }

  calculateContrastRatio(colours) {
    this.#luminosities = [
      this._calculateRelativeLuminance(colours[0]),
      this._calculateRelativeLuminance(colours[1]),
    ];
    if (
      typeof (
        (Math.max(...this.#luminosities) + 0.05) /
        (Math.min(...this.#luminosities) + 0.05)
      ) !== `number`
    )
      console.log(`calcContrast`);
    return (
      (Math.max(...this.#luminosities) + 0.05) /
      (Math.min(...this.#luminosities) + 0.05)
    );
  }

  getOppositeColour(colour) {
    if (this._calculateRelativeLuminance(colour) > 0.5) {
      return colour.map((val) => Math.abs(225 - val));
    } else
      return colour.map((val) =>
        Math.abs(275 - val) > 255 ? 255 : Math.abs(275 - val)
      );
  }

  calculateVariationsAndContrasts(colour) {
    const hueList = this.getHueList(colour).map((hue) => Number(hue));

    const [shades, tints] = this.generateShadesTints(hueList);

    const shadeContrasts = shades.map((shade) => [
      shade.map((val) => Math.round(val)),
      this.calculateContrastRatio([
        hueList,
        shade.map((val) => Math.round(val)),
      ]),
    ]);
    const tintContrasts = tints.map((tint) => [
      tint.map((val) => Math.round(val)),
      this.calculateContrastRatio([
        hueList,
        tint.map((val) => Math.round(val)),
      ]),
    ]);

    return [shadeContrasts, tintContrasts];
  }

  calculateContrasts(colour, shades, tints) {
    const shadeContrasts = shades.map((shade) => [
      shade.map((val) => Math.round(val)),
      this.calculateContrastRatio([
        colour,
        shade.map((val) => Math.round(val)),
      ]),
    ]);
    const tintContrasts = tints.map((tint) => [
      tint.map((val) => Math.round(val)),
      this.calculateContrastRatio([colour, tint.map((val) => Math.round(val))]),
    ]);

    return [shadeContrasts, tintContrasts];
  }

  getDarkestContrastColour(contrasts) {
    const selectedColour = contrasts
      .sort((a, b) => a[1] - b[1])
      .find((c) => c[1] > 7);
    if (!selectedColour)
      return contrasts.reduce(
        (acc, c) => (c[1] > acc[1] ? c : acc),
        [[], 0]
      )[0];

    return selectedColour[0];
  }

  getLightestContrastColour(contrasts) {
    const selectedColour = contrasts
      .sort((a, b) => a[1] + b[1])
      .find((c) => c[1] > 5.5);
    if (!selectedColour)
      return contrasts.reduce(
        (acc, c) => (c[1] > acc[1] ? c : acc),
        [[], 0]
      )[0];

    return selectedColour[0];
  }
}
export default new Colourous();
