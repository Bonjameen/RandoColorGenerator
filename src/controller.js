import * as model from "./model.js";
import generatorView from "./generatorView.js";
import variationsView from "./views/variationsView.js";
import colourous from "../colourous.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

const controlGenerator = function () {
  const [rgb, hex] = colourous.generateRandomColour();
  model.state.colour = { rgb: rgb, hex: hex };
  generatorView.render();
};

const controlVariations = function () {
  const [shades, tints] = colourous.generateShadesTints(model.state.colour);
  model.state.shades = shades;
  model.state.tints = tints;
};

const init = () => {};
init();
