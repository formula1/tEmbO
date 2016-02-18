module.exports.append = append;
module.exports.appendChild = appendChild;
module.exports.createElement = createElement;
module.exports.setInitialState = setInitialState;

function append(element,content){
  'use strict';
  if (content)
  if (Array.isArray(content)){
    content.forEach(function(child){
      this.appendChild(element,child);
    });
  }else{
    this.appendChild(element,content);
  }

  return element;

}

function appendChild(element,content){
  'use strict';
  content.parent = element;
  if (element.getAttribute('data-tamboId') === null){
    element.setAttribute('data-tamboId','$0');
  }
  if (element.childIndex === undefined){
    element.childIndex = 0;
  }else{
    element.childIndex = element.childIndex + 1;
  }

  if (content){

    if (content.render){
      content = Tembo.renderTree(content);
      content.parent = element;
      content.setAttribute('data-tamboId',content.parent.getAttribute('data-tamboId') + '.$' + content.parent.childIndex);
      element.appendChild(content);
      return element;
    }

    if (content.tagName){
      content.setAttribute('data-tamboId',content.parent.getAttribute('data-tamboId') + '.$' + content.parent.childIndex);
      element.appendChild(content);
      return element;
    }

    // if (content.instance){
    //   if (content.componentDidMount)
    //     content.componentDidMount();
    //   content.parent = element;
    //   element.appendChild(content.instance);
    //   return element;
    // }
    if (typeof content === 'string'){

      element.appendChild(document.createTextNode(content));
      return element;
    }
  }
}

function setInitialState(element){
  'use strict';
  if (element.isTemboComponent){
    if (element.getInitialState){
      if (!element.state)
        element.state = {};
      element.state = element.getInitialState();
    }
  }

  return element;
}

// File : src/Tembo.createElement.js

function createElement(element,props,content){
  'use strict';
  if (!props)
    props = {};

  if (arguments.length > 3){
    content = [];
    var index = 2;
    while(index < arguments.length){
      content.push(arguments[index]);
      index++;
    }
  }

  if (element.prototype)
  if (element.prototype.isTemboComponent){
    var Element = element;
    element = new Element();
    element.isTemboComponent = true;
  }

  return new this.El(element,props,content);

}
