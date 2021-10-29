`use strict`;
import * as model from "./model.js";
import generatorView from "./views/generatorView.js";
import variationsView from "./views/variationsView.js";
import colourous from "../colourous.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import colourBoxView from "./views/colourBoxView.js";
import btnView from "./views/btnView.js";

if (module.hot) module.hot.accept();

const controlGenerator = function () {
  const colour = model.state.colour;
  const tintsActive = model.state.tintsActive;
  const shadesActive = model.state.shadesActive;
  let tints, shades;
  if (model.state.tints.length === 0) {
    model.setShadesTints();
    tints = model.state.tints;
    shades = model.state.shades;
    generatorView.render({
      colour,
      tints,
      shades,
    });
    variationsView.render({
      colour,
      tints,
      shades,
      tintsActive,
      shadesActive,
    });
  } else {
    model.setNewColour();
    tints = model.state.tints;
    shades = model.state.shades;
    generatorView.update({
      colour,
      tints,
      shades,
    });
    variationsView.update({
      colour,
      tints,
      shades,
      tintsActive,
      shadesActive,
    });
  }
};

const controlPanelSlide = function (type) {
  model.toggleVariation(type);
  const active = model.state[`${type}sActive`];
  console.log("💥💥💥", active);
  const data = { colour: model.state.colour, type, active };
  if (!active) btnView.displayBtnText(type);
  btnView.update(data);
  if (active) btnView.hideBtnText(type);
  model.state[`${type}s`].forEach((colour, i) => {
    const data = {
      colour,
      index: i,
      type,
      active,
    };
    setTimeout(() => colourBoxView.update(data), i * 100);
  });

  // variationsView.slidePanel(type, model.state[`${type}sActive`]);
};

const init = () => {
  generatorView.addHandlerRender(controlGenerator);
  generatorView.addHandlerClick(controlGenerator);
  variationsView.addHandlerBtnClick(controlPanelSlide);
};
init();
