
module.exports.renderTree = renderTree;
module.exports.render = render;

function renderTree(component){
  'use strict';
  if (component.render){
    component.instance = component.render();
    component.instance.component = component;
    return Tembo.renderTree(component.instance);
  }
  return component;
}

//File : src/Tembo.render.js
function render(component,element){
  'use strict';
  component.instance = Tembo.renderTree(component);
  Tembo.appendChild(element,component.instance);
}
