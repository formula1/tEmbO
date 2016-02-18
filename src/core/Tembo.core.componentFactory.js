module.exports.componentFactory = componentFactory;

//File : src/Tembo._.componentFactory.js

var TemboComponent;

function componentFactory(structure){
  'use strict';

  var ret = function(){};

  var proto = ret.prototype = Object.create(TemboComponent.prototype);

  for(var key in structure){
    if (key in proto) continue;
    proto[key] = structure[key];
  }

  if (structure.displayName)
    ret.displayName = structure.displayName;

  return ret;
}

TemboComponent = function(){};

var proto = TemboComponent.prototype;

proto.isTemboComponent = true;

// to be used internally
proto.__render__ = function(){
  var renderResult = this.render();

  // if (!this.oldInstance){

  // }
  // this.instance = renderResult;
  renderResult.component = this;

  return renderResult;
};

// to be used internally
proto.__componentWillUnmount__ = function(){
  return this.componentWillUnmount();
};

proto.setState = function(state){
  for(var key in state){
    this.state[key] = state[key];
  }

  this.deeplyCompare(this.instance,this.__render__());
};
