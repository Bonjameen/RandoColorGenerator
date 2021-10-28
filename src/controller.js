`use strict`;
import * as model from "./model.js";
import generatorView from "./views/generatorView.js";
import variationsView from "./views/variationsView.js";
import colourous from "../colourous.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

if (module.hot) module.hot.accept();

const controlGenerator = function () {
  const colour = model.state.colour;
  const type = model.state.type;
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
      colour: colour,
      shades,
      type: `tint`,
      active: tintsActive,
    });
    variationsView.render({
      colour: colour,
      shades,
      type: `shade`,
      active: shadesActive,
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
    variationsView.update({});
  }
};

const controlPanelSlide = function (type) {
  model.toggleVariation(type);
  const data = {
    shades: model.state.tints,
    tints: model.state.tints,
    active: model.state[`${type}sActive`],
    type,
  };
  variationsView.update(data);
  // variationsView.slidePanel(type, model.state[`${type}sActive`]);
};

const init = () => {
  generatorView.addHandlerRender(controlGenerator);
  generatorView.addHandlerClick(controlGenerator);
  variationsView.addHandlerBtnClick(controlPanelSlide);
};
init();
