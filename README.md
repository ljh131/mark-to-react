# mark-to-react
Fully customizable markdown component in React

* Supports most common markdown specs and other extensions
* Easy to make custom markdown syntax and component

**Note: It uses [mark-to-jsonml](https://github.com/ljh131/mark-to-jsonml) as an internal parser.**

# Live Demo
[Click Here](https://ljh131.github.io/mark-to-react/)

# Installation
```sh
npm install mark-to-react --save
```

# Usage example
## Basic usage
```javascript
import React from 'react';
import Markdown from 'mark-to-react';

const md = `
# hello mark-to-react!
* first things first
* the start is half
`;

class App extends React.Component {
  render() {
    return (
      <Markdown text={md} />
    );
  }
}
```

## Add custom syntax and component
On the example below, Custom `Horizontal Ruler` markdown syntax and component are added.

``` javascript
import React from 'react';
import Markdown from 'mark-to-react';
import { Parser, makeTestResult } from 'mark-to-jsonml';

const md = `
# hello mark-to-react!
@@@
`;

const customParser = new Parser();
                                                      
function parseMyHr(string, isTest) {
  var HR = /^(@){3,}$/gm;                             
  var result = HR.exec(string);                       
                                                      
  // you should return test result on test mode.      
  if(isTest) return makeTestResult(HR, result, -1);   
  if(!result) return null;                            
                                                      
  return ['my_hr'];                                   
}                                                     
                                                      
customParser.addBlockParser(parseMyHr, true);      
                                                      
class MyHr extends React.Component {                  
  render() {                                          
    return (                                          
      <div style={{border: '1px solid #000'}}>        
        I WANNA BE a HORIZONTAL RULER!
      </div>                                          
    );                                                
  }                                                   
}

class App extends React.Component {
  render() {
    const parsed = customParser.parse(md);
    return (
      <Markdown
        parsed={parsed}
        componentMap={{'my_hr': MyHr}} />
    );
  }
}
```

## More example
https://github.com/ljh131/mark-to-react/blob/master/src/demo/App.js

# API
## Component: Markdown
### props
* text {String}: Markdown text to render.
* parsed {Object}: Parsed markdown JsonML. It priors to `text`.
* componentMap {Object}: Object mapped markdown elements to React component.
  * For example, `{'hr': MyHr}` will mapping `hr` markdown element to `MyHr` React component.
* componentProps {Object}: Object mapped markdown elements to React props.
  * For example, If it is set to `{'hr': {...props}}` and corresponding `hr` React component will receive those properties. 
