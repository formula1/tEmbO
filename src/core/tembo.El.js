module.exports.attachProps = attachProps;
module.exports.El = El;

function attachProps(element,props,content){
  'use strict';
  var prop;
  if (element.isTemboComponent && element.isTemboComponent !== undefined){
    if (!element.props) element.props = {};
    if (props !== undefined && props !== null)
      for(prop in props) element.props[prop] = props[prop];
    element.props.children = content;
  }else{
    element = document.createElement(element);
    element = Tembo.append(element,content);
    for(var attr in props){
      if (attr.indexOf('on') === 0){
        var event = attr.replace('on','').toLowerCase();
        element.addEventListener(event,props[attr],false);
      }else{
        if (attr !== 'children')
        element.setAttribute(attr,props[attr]);
      }
    }
  }
  return element;
}

//File : src/Tembo.El.js

function El(type,props,content){
  this.type = type;
  this.props = {};
  if (props) this.props = props;
  this.props.children = content;
}

var proto = El.prototype;
proto.render = function(){
  var element = Tembo.attachProps(this.type,this.props,this.props.children);
  element = Tembo.setInitialState(element);
  element.component = this;
  return element;

};
