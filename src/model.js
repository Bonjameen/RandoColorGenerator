`use strict`;
import colourous from "./colourous";

/**
 * The app state, stores the colour generated, all tints and shades, and also contrast colours for each individual colour
 */
export const state = {
  colour: {
    rgb: `rgb(52, 58, 64)`,
    hex: `#343a40`,
    contrastColour: ``,
    luminance: ``,
  },
  tints: [],
  shades: [],
  tintsActive: false,
  shadesActive: false,
};

export const setNewColour = function () {
  [state.colour.rgb, state.colour.hex] = colourous.generateRandomColour();
  setShadesTints();
};

/**
 * Gets and sets the shade and tint values for state.colour
 * @author Ben Pinner
 */
export const setShadesTints = function () {
  // Calculate and set luminance of current colour
  state.colour.luminance = colourous.calculateRelativeLuminance(
    state.colour.rgb
  );

  // Calculate variations and contrasts of main colour
  [state.shades, state.tints] = calculateShadesTints();
  const contrasts = getRGBContrastValues(state.tints, state.shades);
  state.colour.contrastColour = colourous.getDarkestContrastColour(contrasts);
  const [tintTextColours, shadeTextColours] = calculateShadesTintsContrasts(
    state.tints,
    state.shades
  );
  tintTextColours.forEach(
    (colour, i) => (state.tints[i].contrastColour = colour)
  );

  shadeTextColours.forEach(
    (colour, i) => (state.shades[i].contrastColour = colour)
  );
};

export const toggleVariation = function (type) {
  state[`${type}sActive`] = !state[`${type}sActive`];
};

const calculateShadesTints = function (colour) {
  if (!colour)
    return colourous.calculateVariationsAndContrasts(state.colour.rgb);
  return colourous.calculateVariationsAndContrasts(colour);
};

const calculateShadesTintsContrasts = function (tints, shades) {
  const tintTextColours = tints.map((tint) => {
    const [shadeVariations, tintVariations] = calculateShadesTints(tint.rgb);
    const contrasts = getRGBContrastValues(tintVariations, shadeVariations);
    return colourous.getDarkestContrastColour(contrasts);
  });
  const shadeTextColours = shades.map((shade) => {
    const [shadeVariations, tintVariations] = calculateShadesTints(shade.rgb);
    const contrasts = getRGBContrastValues(tintVariations, shadeVariations);
    return colourous.getDarkestContrastColour(contrasts);
  });
  return [tintTextColours, shadeTextColours];
};

/**
 * Gets the rgb values for all tints and shades in the state
 * @returns {string[][]} A list containing a tint rgb value list and a shade rgb value list
 * @author Ben Pinner
 */
const getTintsShadesRGB = function () {
  const tints = state.tints.map((val) => val.rgb);
  const shades = state.shades.map((val) => val.rgb);

  return [tints, shades];
};

const getRGBContrastValues = (tints, shades) =>
  [...tints, ...shades].map((colour) => [colour.rgb, colour.contrast]);
