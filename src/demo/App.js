import React from 'react';
import Reboot from 'material-ui/Reboot';
import Input from 'material-ui/Input';
import Typography from 'material-ui/Typography';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';

import { Parser, makeTestResult } from 'mark-to-jsonml';
import Markdown from '../lib';
import { A, Codeblock, Toc, TocItem } from './CustomMarkdown';

import './index.css';

const DEFAULT_TEXT = `
**Introducing fully customizable markdown component in React!**

**NOTE:** Belows are enabled only in the *custom render* mode (So, you need to choose custom in the Renderer option to see everything):

* Table of content
* Auto link
* Auto Image from url
* Syntax highlight

{toc}

# Ordered list and Unordered list
* first things
* first
  1. you can use unordered list 
  1. inside ordered list!
  * and 
  * mixing it!
    * wow!

# Inline styles and mixing
* **bold**
* *italic*
* _underline_
* ~strike~

These four style can be mixed in ONE PLACE: **bold *and italic _and underline ~and strike~_*  **

# Quote, Code and highlight
> Here is the code block!

\`\`\` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`

# Tables
> You can use inline style inside table!

| Option | Description |
| ------ | ----------- |
| data   | _path to data files to supply the data that will be passed into templates._ |
| engine | **engine to be used for processing templates. Handlebars is the default.** |
| ext    | ~extension to be used for dest files.~ |

## What if I didn't specify a header?
| Head1 | Head2 |
| Content1 | Content2 |
| Content1 | Content2 |

# Links And Image
* Basic link
  * [mark-to-react](https://github.com/ljh131/mark-to-react)
* **Auto link (starts with http or https)**
  * https://github.com/ljh131/mark-to-jsonml
    * *Url is used as a title in this case*

> Url ends with image extension will be rendered as an image!
https://octodex.github.com/images/minion.png

*Note that this rule also applied on mp4 :)*

# Custom markdown syntax

The belows are added as a custom syntax. So, those will be rendered as something customized component *only in custom renderer*

@@@

@@@@
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
  state = {
    renderer: 'default',
    text: DEFAULT_TEXT
  };

  render() {
    const useCustomRenderer = this.state.renderer === 'custom';

    return (
      <div className="Demo">
        <Reboot />
        <div className="Demo-head">
          <Typography variant="headline" gutterBottom>
            mark-to-react Live Demo
          </Typography>

          <FormControl component="fieldset" required>
            <FormLabel component="legend">Renderer</FormLabel>
            <RadioGroup
              name="renderer"
              value={this.state.renderer}
              onChange={this.handleChangeRenderer} >
              <FormControlLabel value="default" control={<Radio />} label="Default" />
              <FormControlLabel value="custom" control={<Radio />} label="Custom" />
            </RadioGroup>
          </FormControl>
        </div>

        <div className="Demo-input">
          <Typography variant="title" gutterBottom>
            MARKDOWN TEXT:
          </Typography>
          <Input 
            className="Demo-input-text"
            multiline={true}
            fullWidth={true}
            type="text" 
            value={this.state.text} 
            onChange={this.handleChangeText}/>
        </div>

        <div className="Demo-output">
          <Typography variant="title" gutterBottom>
            RENDERED:
          </Typography>
          <div className="Demo-output-markdown">
            { useCustomRenderer ? this.renderCustom() : this.renderDefault() }
          </div>
        </div>
      </div>
    );
  }

  renderDefault = () => {
    return (
      <Markdown 
        className="Markdown"
        text={this.state.text} />
    );
  }

  renderCustom = () => {
    const parsed = customParser.parse(this.state.text);
    const componentMap = {
      'a': A, 
      'codeblock': Codeblock,
      'toc': Toc, 
      'toc-item': TocItem, 
      'my_hr': MyHr
    };
    const componentProps = {
      'my_hr': {prop1: 'wow', prop2: '!!!'}
    };

    return (
      <Markdown 
        className="Markdown"
        parsed={parsed}
        componentMap={componentMap} 
        componentProps={componentProps} />
    );
  }

  handleChangeRenderer = (e, v) => {
    this.setState({renderer: v});
  };

  handleChangeText = (e) => {
    this.setState({text: e.target.value});
  }
}

export default App;
