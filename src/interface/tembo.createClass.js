// File : src/Tembo.createClass.js

module.exports.createClass = createClass;

function createClass(structure){
  'use strict';
  return this._.componentFactory(structure);
}
