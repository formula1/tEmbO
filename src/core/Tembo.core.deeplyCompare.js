
module.exports.upCall = upCall;
module.exports.patchAttributes = patchAttributes;
module.exports.patchChildren = patchChildren;
module.exports.patchText = patchText;
module.exports.deeplyCompare = deeplyCompare;

function upCall(lifecycleMethod,instance){
  'use strict';
  if (instance.component){
    if (instance.component.componentWillUnmount){
      instance.component[lifecycleMethod]();
    }else{
      this.upCall(lifecycleMethod,instance.component);
    }
  }else{
    console.log('if your code reach this line, send-me a e-mail gui_souza@me.com . I would love to work with you in my new project');
  }
}

function patchAttributes(instance,newInstance){
  'use strict';

  Array.prototype.forEach.call(newInstance.attributes,function(attr){

    if (attr.localName !== 'data-tamboid'){
      instance.setAttribute(attr.localName,attr.value);
    }

  });
}

function patchChildren(instance,newInstance){
  'use strict';

  var SilentDiff = {};
  Array.prototype.forEach.call(instance.children,function(element){
    if (!SilentDiff[element.getAttribute('data-tamboId')])
      SilentDiff[element.getAttribute('data-tamboId')] = {};

    SilentDiff[element.getAttribute('data-tamboId')].a = element;
  });

  Array.prototype.forEach.call(newInstance.children,function(element){
    if (!SilentDiff[element.getAttribute('data-tamboId')])
      SilentDiff[element.getAttribute('data-tamboId')] = {};

    SilentDiff[element.getAttribute('data-tamboId')].b = element;
  });

  for(var key in SilentDiff){
    var patch = SilentDiff[key];
    if (patch.a === undefined && patch.b !== undefined){
      this.upCall('componentWillUnmount',patch.b);
      instance.appendChild(patch.b);
    }
    if (patch.a !== undefined && patch.b === undefined){
      this.upCall('componentWillUnmount',patch.a);
      instance.removeChild(patch.a);
    }
  }

  // newInstance.attributes,function(attr){
  // instance.setAttribute(attr.localName,attr.value);
  // });
}

function patchText(instance,newInstance){
  'use strict';
  if (!instance.hasChildNodes()){
    instance.textContent = newInstance.textContent;
  }
}

//File : src/Tembo._.deeplyCompare.js

function deeplyCompare(element,reRenderedElement){
  'use strict';

  var instance = element;
  var newInstance = reRenderedElement;

  newInstance.instance = newInstance.render();
  newInstance.instance.component = newInstance;

  this.patchAttributes(instance.instance,newInstance.instance);
  this.patchText(instance.instance,newInstance.instance);
  this.patchChildren(instance.instance,newInstance.instance);

  return false;

}
