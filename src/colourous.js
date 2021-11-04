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

  /**
   * Generates random integer within specified range
   * @param {number} min The lower bound of the range
   * @param {number} max The upper bound of the range
   * @returns {number} Random number
   * @author Ben Pinner
   */
  _randomInt(min, max) {
    return Math.floor(Math.random(min, max) * (max - min + 1));
  }

  /**
   * Rounds a value to a specified number of decimal places
   * @param {number} value Value to be rounded
   * @param {number} precision The number of decimal places to round to, defaults to 0
   * @returns {number} The rounded value
   * @author Ben Pinner
   */
  _round(value, precision = 0) {
    var multiplier = Math.pow(10, precision);
    return Math.round(value * multiplier) / multiplier;
  }

  /**
   * Generates a random colour returned in rgb and hex format
   * @returns {string[]} Array containing 2 strings: rgb code and hex code
   * @author Ben Pinner
   */
  generateRandomColour() {
    const colourRGB = `rgb(${this._randomInt(0, 255)},${this._randomInt(
      0,
      255
    )},${this._randomInt(0, 255)})`;
    const colourHex = this.convertRGBToHex(colourRGB);
    return [colourRGB, colourHex];
  }

  /**
   * Takes a decimal number and converts it to hexidecimal
   * @param {number} dec The decimal number to be converted
   * @returns {string} Hexadecimal value equivalent to decimal value passed
   * @author Ben Pinner
   */
  _convertDecimalToHex(dec) {
    let remainder;
    let remainderString = ``;
    while (dec !== 0) {
      remainder = this._round(dec % 16);
      remainderString = `${this.#decToHex[remainder]}${remainderString}`;
      dec = Math.floor(dec / 16);
    }

    return remainderString.padStart(2, `0`);
  }

  /**
   * Takes an rgb colour and breaks it down into its 3 values (i.e red value, green value, and blue value)
   * @param {string | number[]} colour If passed as Array, assume it is already a list of the hue values and simply return this parameter unchanged
   * @returns {number[]} The list of hue values for the rgb string passed in
   * @author Ben Pinner
   */
  getHueList(colour) {
    return colour instanceof Array
      ? colour.map((val) => this._round(val))
      : colour
          .slice(4, -1)
          .split(`,`)
          .map((val) => this._round(Number(val)));
  }

  /**
   * Converts a list of rgb hue values, to a string of format `rgb(redVal, blueVal, greenVal)`
   * @param {string[]} colour The list of hue values to convert to a string
   * @returns {string} The rgb string
   * @author Ben Pinner
   */
  getRGBFromHueList(colour) {
    return `rgb(${colour.map((val) => this._round(val)).join(`,`)})`;
  }

  /**
   * Converts a colour from rgb format to a hex string
   * @param {string | number[]} colour The colour to convert from rgb to hex
   * @returns {string} The hex code generated from the rgb code passed in
   * @author Ben Pinner
   */
  convertRGBToHex(colour) {
    const hueList = this.getHueList(colour);
    const hex = `#${hueList.reduce(
      (hex, cur) => hex + this._convertDecimalToHex(cur),
      ``
    )}`;
    if (hex.includes(`undefined`)) console.error(`💥💥💥 ${hex}, ${hueList}`);
    return hex;
  }

  // Maths
  // Tints - New value = current value + ((255 - current value) x tint factor)
  // Shades - New value = current value x shade factor
  /**
   * Takes a colour and generates a tint of that colour that's brightness is determined by the factor passed
   * @param {number[]} colour List of the rgb values of colour in order
   * @param {number} factor The factor by which you want to lighten the passed in colour
   * @returns {string[]} The rgb and hex code of the tint generated
   * @author Ben Pinner
   */
  _generateTint(colour, factor) {
    const tintList = colour.map((val) => val + (255 - val) * factor);
    const tint = this.getRGBFromHueList(tintList);
    const tintHex = this.convertRGBToHex(tintList);
    return [tint, tintHex];
  }

  /**
   * Takes a colour and generates a tint of that colour that's brightness is determined by the factor passed
   * @param {number[]} colour List of the rgb values of colour in order
   * @param {number} factor The factor by which you want to darken the passed in colour
   * @returns {string[]} The rgb and hex code of the shade generated
   * @author Ben Pinner
   */
  _generateShade(colour, factor) {
    const shadeList = colour.map((val) => val * (1 - factor));
    const shade = this.getRGBFromHueList(shadeList);
    const shadeHex = this.convertRGBToHex(shadeList);
    return [shade, shadeHex];
  }

  // const [backgroundTints, backgroundShades] = generateShadesTints();

  // if R <= 10 then Rg = R/3294, else Rg = (R/269 + 0.0513)^2.4

  // if G <= 10 then Gg = G/3294, else Gg = (G/269 + 0.0513)^2.4

  // if B <= 10 then Bg = B/3294, else Bg = (B/269 + 0.0513)^2.4

  // L = 0.2126 * Rg + 0.7152 * Gg + 0.0722 * Bg

  /**
   * Calculates the relative luminance of any colour passed in
   * @param {string | number[]} colour The colour to calculate the relative luminance of
   * @returns {number} The relative luminance of the colour passed in
   * @author Ben Pinner
   */
  calculateRelativeLuminance(colour) {
    const hueList = this.getHueList(colour);
    const hueValues = hueList.map((val) =>
      val <= 10 ? val / 3294 : (val / 269 + 0.0513) ** 2.4
    );
    return this._round(
      0.2126 * hueValues[0] + 0.7152 * hueValues[1] + 0.0722 * hueValues[2],
      3
    );
  }

  /**
   * Takes a colour and generates a list of tints and a list of shades
   * @param {string | number[]} colour The colour to generate shades and tints for, either in form `rgb(red,greeb,blue)` or [red,green,blue]
   * @returns {(string|number)[][]} The list of shades and list of tints, each colour also has it's luminance returned
   * @author Ben Pinner
   */
  generateShadesTints(colour) {
    const hueList = this.getHueList(colour);
    const tints = [];
    const shades = [];
    for (let i = 0; i < 9; i++) {
      const tint = this._generateTint(hueList, (i + 1) / 10);
      const shade = this._generateShade(hueList, (i + 1) / 10);
      tints.push([tint, this.calculateRelativeLuminance(tint[0])]);
      shades.push([shade, this.calculateRelativeLuminance(shade[0])]);
    }

    return [shades, tints];
  }

  /**
   * Takes two colours and calculates their contrast ratio
   * @param {(string|number[])[]} colours The colours to compare
   * @returns {number} The contrast ratio of the two colours
   * @author Ben Pinner
   */
  calculateContrastRatio(colours, luminances = null) {
    if (!luminances) {
      luminances = [
        this.calculateRelativeLuminance(colours[0]),
        this.calculateRelativeLuminance(colours[1]),
      ];
    }

    return this._round(
      (Math.max(...luminances) + 0.05) / (Math.min(...luminances) + 0.05),
      2
    );
  }

  /**
   * Calculates the opposite hue of the colour passed in
   * @param {string | number[]} colour The colour to calculate the opposite hue for
   * @returns {number[]} The opposite hue calculated
   * @author Ben Pinner
   */
  getOppositeColour(colour) {
    const hueList = this.getHueList(colour);
    if (this.calculateRelativeLuminance(hueList) > 0.5) {
      return hueList.map((val) => Math.abs(225 - val));
    } else
      return hueList.map((val) =>
        Math.abs(275 - val) > 255 ? 255 : Math.abs(275 - val)
      );
  }

  /**
   * Calculates colour variations (tints and shades) and their contrast ratio with the colour passed in
   * @param {string | number[]} colour The colour to calculate variations for
   * @param {number} luminance Value measuring the luminance (brightness) of the passed in hue
   * @returns {Object[][]} A list holding the shades and tints lists, each of the format: [rgbString, hexString, contrast]
   * @author Ben Pinner
   */
  calculateVariationsAndContrasts(colour, luminance = null) {
    const hueList = this.getHueList(colour).map((hue) => Number(hue));

    const [shades, tints] = this.generateShadesTints(hueList);

    const shadeContrasts = shades.map((shade) => {
      return {
        rgb: shade[0][0],
        hex: shade[0][1],
        luminance: shade[1],
        contrast: this.calculateContrastRatio(
          [hueList, shade[0][0]],
          [luminance, shade[1]]
        ),
      };
    });

    const tintContrasts = tints.map((tint) => {
      return {
        rgb: tint[0][0],
        hex: tint[0][1],
        luminance: tint[1],
        contrast: this.calculateContrastRatio(
          [hueList, tint[0][0]],
          [luminance, tint[1]]
        ),
      };
    });

    // const shadeContrasts = shades.map((shade) => [
    //   this.getRGBFromHueList(shade.map((val) => this._round(val))),
    //   this.calculateContrastRatio([
    //     hueList,
    //     shade.map((val) => this._round(val)),
    //   ]),
    // ]);
    // const tintContrasts = tints.map((tint) => [
    //   this.getRGBFromHueList(tint.map((val) => this._round(val))),
    //   this.calculateContrastRatio([
    //     hueList,
    //     tint.map((val) => this._round(val)),
    //   ]),
    // ]);

    return [shadeContrasts, tintContrasts];
  }

  // calculateContrasts(colour, shades, tints) {
  //   const shadeContrasts = shades.map((shade) => [
  //     shade.map((val) => this._round(val)),
  //     this.calculateContrastRatio([
  //       colour,
  //       shade.map((val) => this._round(val)),
  //     ]),
  //   ]);
  //   const tintContrasts = tints.map((tint) => [
  //     tint.map((val) => this._round(val)),
  //     this.calculateContrastRatio([colour, tint.map((val) => this._round(val))]),
  //   ]);

  //   return [shadeContrasts, tintContrasts];
  // }

  getHigherContrastColour(contrasts) {
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

  getLowerContrastColour(contrasts) {
    const selectedColour = contrasts
      .sort((a, b) => a[1] - b[1])
      .find((c) => c[1] > 5);
    if (!selectedColour) return contrasts.find((c) => c[1] > 3.5)[0];

    return selectedColour[0];
  }
}
export default new Colourous();
