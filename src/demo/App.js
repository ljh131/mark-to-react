import React from 'react';
import Reboot from 'material-ui/Reboot';
import Input from 'material-ui/Input';
import Typography from 'material-ui/Typography';

import Markdown from '../lib';

import './index.css';

const DEFAULT_TEXT = `
# default text here!
`;

class Toc extends React.Component {
  render() {
    return (
      <div className='Toc' id='toc'>
        <div>
          <Typography gutterBottom align="left">
            Table of Content
          </Typography>
        </div>
        { this.props.children }
      </div>
    );
  }
}

class TocItem extends React.Component {
  render() {
    const INDENT_UNIT = 10;
    const indent = (this.props.level - 1) * INDENT_UNIT + 'px';

    return (
      <div className='Toc-item' style={{marginLeft: indent}}>
        {this.props.number}
        <a href={`#`}> {this.props.children}</a>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: DEFAULT_TEXT};
  }

  render() {
    return (
      <div className="Demo">
        <Reboot />
        <div className="Demo-head">
          <Typography variant="headline" gutterBottom>
            mark-to-react Live Demo
          </Typography>
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
            <Markdown 
              className="Markdown"
              text={this.state.text}
							replace={{'toc': Toc, 'toc-item': TocItem}} />
          </div>
        </div>
      </div>
    );
  }

  handleChangeText = (e) => {
    this.setState({text: e.target.value});
  }
}

export default App;
