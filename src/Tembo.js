//File : src/Tembo.js

const Tembo = {};

Tembo.components = {};

var cCUtil = require('./interface/tembo.createClass.js');
Tembo.createClass = cCUtil.createClass;

var cEUtil = require('./interface/tembo.createElement.js');
Tembo.append = cEUtil.append;
Tembo.appendChild = cEUtil.appendChild;
Tembo.createElement = cEUtil.createElement;
Tembo.setInitialState = cEUtil.setInitialState;

var rUtil = require('./interface/tembo.render.js');
Tembo.render = rUtil.render;
Tembo.renderTree = rUtil.renderTree;

var elUtil = require('./core/tembo.El.js');
Tembo.attachProps = elUtil.attachProps;
Tembo.El = elUtil.El;

const _ = {};
Tembo._ = _;
_.componentFactory = require('./core/Tembo.core.componentFactory.js').componentFactory;
var deepUtil = require('./core/Tembo.core.deeplyCompare.js');
_.upCall = deepUtil.upCall;
_.patchAttributes = deepUtil.patchAttributes;
_.patchChildren = deepUtil.patchChildren;
_.patchText = deepUtil.patchText;
_.deeplyCompare = deepUtil.deeplyCompare;

module.exports = Tembo;
if (!module.parent && typeof window === 'object'){
  window.Tembo = Tembo;
}
