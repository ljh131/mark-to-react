# mark-to-react
Fully customizable markdown component in React

* Supports most common markdown specs and other extensions
* Easy to make custom markdown syntax and component

## If you want to find out markdown parser

* [mark-to-jsonml](https://github.com/ljh131/mark-to-jsonml)

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

## How to add custom syntax and component
On the example below, syntax `@@@` and corresponding component are added for `custom horizontal ruler`.

For more information about custom syntax parser, take a look at [mark-to-jsonml](https://github.com/ljh131/mark-to-jsonml)

``` javascript
import React from 'react';
import Markdown from 'mark-to-react';
import { Parser, makeTestResult } from 'mark-to-jsonml';

const md = `
# hello mark-to-react!
@@@
`;

const customParser = new Parser({ parseToc: true });

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
    const { prop1, prop2 } = this.props;
    return (
      <div style={{border: '1px solid #000'}}>
        I WANNA BE a HORIZONTAL RULER! {prop1} {prop2}
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
https://github.com/ljh131/mark-to-react/tree/master/src/demo

# API
## Component: Markdown
### props
* text {String}: Markdown text to render.
* parsed {Object}: Parsed markdown JsonML. It priors to `text`.
* componentMap {Object}: Object mapped markdown elements to React component.
  * For example, `{'hr': MyHr}` will mapping `hr` markdown element to `MyHr` React component.
* componentProps {Object}: Object mapped markdown elements to React props.
  * For example, if it is set to `{'hr': {...props}}` and corresponding `hr` React component will receive those properties. 

